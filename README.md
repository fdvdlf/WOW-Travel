# WOW Travel – WhatsApp Helpdesk interno

Sistema de atención interno que convive con el bot actual de WhatsApp/OpenAI. Permite guardar el historial completo de conversaciones, responder manualmente desde un panel interno y consultar el contexto de cada contacto sin desactivar el webhook existente.

## Arquitectura general
- **Webhook `/api/webhook-wt`**: sigue respondiendo con OpenAI, ahora además crea contactos, conversaciones y mensajes en base de datos.
- **Capa de datos en memoria (Prisma en pausa)**: modelos `Contact`, `Conversation`, `Message` y `AgentUser` se resuelven con un almacén en memoria para evitar dependencias externas mientras Prisma permanece desactivado.
- **API interna `/api/admin/*`**: autenticada por cookie de sesión, expone endpoints para listar conversaciones, cambiar estado y enviar respuestas manuales.
- **Panel `/admin/chat`**: inbox estilo helpdesk para ver conversaciones, estado y enviar mensajes.

Diagrama de flujo: `WhatsApp → Webhook → DB → OpenAI → DB → WhatsApp`, y `Panel interno → API /admin → DB → WhatsApp`.

## Endpoints principales
- `POST /api/webhook-wt`: maneja eventos de WhatsApp, guarda mensajes entrantes/salientes y envía respuesta automática con OpenAI.
- `POST /api/admin/send-message`: envía respuesta manual y guarda el mensaje como `agent`.
- `GET /api/admin/conversations`: lista conversaciones (filtro por estado opcional).
- `GET /api/admin/conversations/:id`: devuelve conversación con historial.
- `PATCH /api/admin/conversations/:id/status`: actualiza estado.
- `POST /api/admin/login` / `POST /api/admin/logout`: gestiona sesión del panel.

## Configuración y variables de entorno
Copia `.env.example` a `.env` y completa:
- `WHATSAPP_TOKEN`, `WHATSAPP_GRAPH_VERSION`, `VERIFY_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`.
- `OPENAI_API_KEY`, `OPENAI_MODEL`, `OPENAI_BASE_URL`, `OPENAI_TEMPERATURE`.
- Panel interno: `ADMIN_USER`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `ADMIN_SESSION_TTL_DAYS`.

## Instalación (sin Prisma)
1. Instala dependencias:
   ```bash
   npm install
   ```
   > Prisma está deshabilitado temporalmente para evitar bloqueos de descarga; no se requiere ninguna generación de cliente ni conexión a base de datos para probar el panel.

## Ejecución local
```bash
npm run dev
```
Abrir `http://localhost:3000/admin/login` para acceder al panel.

## Cómo probar el flujo completo
Sigue estos pasos si quieres validar el sistema sin depender todavía de WhatsApp en producción:

1. **Arranca la app** con `npm run dev` y abre `http://localhost:3000/admin/login`.
2. **Inicia sesión** con las credenciales de las variables `ADMIN_USER` / `ADMIN_PASSWORD`.
3. **Simula el webhook** enviando un payload de Cloud API desde otra terminal:
   ```bash
   curl -X POST http://localhost:3000/api/webhook-wt \
     -H "Content-Type: application/json" \
     -d '{
       "entry": [{
         "changes": [{
           "value": {
             "contacts": [{"wa_id": "5491122334455", "profile": {"name": "Cliente Demo"}}],
             "messages": [{"from": "5491122334455", "id": "wamid.HBgM...", "timestamp": "1714588800", "type": "text", "text": {"body": "Hola"}, "context": {}}],
             "metadata": {"phone_number_id": "YOUR_PHONE_ID"}
           }
         }]
       }]
     }'
   ```
   - Esto crea/actualiza el **Contact**, abre la **Conversation** y guarda el mensaje entrante.
   - El bot responde usando OpenAI (verás la salida en consola) y el mensaje generado se guarda como `bot`.
4. **Revisa el panel** en `/admin/chat`: deberías ver la conversación con dos burbujas (cliente y bot).
5. **Envía un mensaje manual** desde la caja de texto. El endpoint `/api/admin/send-message` reutiliza el helper de WhatsApp; en local sin credenciales válidas verás el intento en logs y el mensaje quedará almacenado como `agent`.
6. **Cambia el estado** (open/pending/closed) con los botones de la derecha y comprueba que se refleja en la lista.

### Consejos de depuración
- Puedes inspeccionar la base de datos en vivo con `npx prisma studio` (se conectará al Postgres Neon configurado en `DATABASE_URL`).
- Si el endpoint de WhatsApp Cloud API falla en local, el webhook no se detiene; revisa la consola para logs detallados.
- Para limpiar el entorno local, ejecuta `npx prisma migrate reset` (esto reprocesa el esquema sobre la base Neon).

## Uso del panel `/admin/chat`
- Inicia sesión con las credenciales configuradas en variables de entorno.
- Columna izquierda: lista de conversaciones con filtro por estado y snippet del último mensaje.
- Columna central: historial completo diferenciado por origen (cliente, bot, agente) y caja de envío manual.
- Columna derecha: detalles del contacto, estado actual (botones open/pending/closed) y acción para cerrar sesión.

## Consideraciones
- El webhook mantiene la lógica original del bot; si falla el guardado en DB se registra el error pero se intenta responder al cliente.
- Todos los mensajes (inbound, bot y agentes) quedan registrados con su payload crudo para auditoría.
- Para envíos manuales se usa `WHATSAPP_PHONE_NUMBER_ID` o el último `phone_number_id` recibido para el contacto.
