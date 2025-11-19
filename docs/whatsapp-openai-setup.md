# Integración WhatsApp Cloud API + OpenAI (WOW Travel)

Esta guía explica cómo desplegar el flujo automatizado que ya existe en el repositorio y qué valores debes completar manualmente para operarlo en producción.

## Flujo en tiempo real
1. Meta envía los eventos entrantes a `POST /api/webhook-wt`.
2. El handler (`src/app/api/webhook-wt/route.js`) valida el payload y toma la primera interacción del contacto.
3. El mensaje se envía a OpenAI con el prompt oficial de WOW Travel (`src/lib/openai.js`).
4. La respuesta se devuelve al mismo número mediante la Cloud API (`src/lib/whatsapp.js`).
5. Para evitar chats repetidos, se guarda en memoria que el contacto ya recibió atención (`src/lib/contact-history.js`).

## Variables de entorno obligatorias
Todas viven en `.env` (o el mecanismo equivalente de tu plataforma). Usa `.env.example` como plantilla.

| Variable | Dónde se usa | Descripción |
| --- | --- | --- |
| `VERIFY_TOKEN` | `GET /api/webhook-wt` | Token que debe coincidir con el configurado en Meta para validar el webhook. |
| `WHATSAPP_TOKEN` | `src/lib/whatsapp.js` | Token del Business Account que autoriza el envío de mensajes salientes. El repositorio ya incluye el valor proporcionado por WOW Travel dentro de `.env.example`; si Meta lo rota, reemplázalo allí antes de desplegar. |
| `WHATSAPP_GRAPH_VERSION` | `src/lib/whatsapp.js` | (Opcional) Versión de la Graph API. Útil cuando Meta obliga a migrar. |
| `OPENAI_API_KEY` | `src/lib/openai.js` | Clave para invocar el modelo `gpt-5.1` con el prompt de WOW Travel. `.env.example` ya viene con la credencial compartida por WOW Travel; actualízala ahí si OpenAI rota el proyecto. |
| `OPENAI_MODEL`, `OPENAI_BASE_URL`, `OPENAI_TEMPERATURE` | `src/lib/openai.js` | (Opcionales) Ajustes de modelo, endpoint o tono. |
| `CONTACT_HISTORY_TTL_DAYS` | `src/lib/contact-history.js` | Define cuántos días se considerará que un contacto ya fue atendido para bloquear respuestas automáticas. |
| `NEXT_PUBLIC_SITE_URL` | `next.config.mjs` y clientes | URL pública del backend. `.env.example` ya apunta a `https://www.wowtravel.pe`; cámbialo solo si el dominio oficial se modifica. |

## Configuración del webhook en Meta
1. Despliega la app de Next.js y asegúrate de tener la ruta pública `https://tu-dominio/api/webhook-wt`.
2. En el panel de WhatsApp Cloud:
   - Registra la URL anterior como webhook.
   - Durante la verificación, Meta enviará `hub.mode`, `hub.verify_token` y `hub.challenge`. El handler ya compara `hub.verify_token` con `VERIFY_TOKEN` y devuelve el challenge automáticamente cuando coincide.
3. Habilita los campos `messages` y `message_template_status_update` (al menos `messages` es obligatorio para este flujo).

## Cómo personalizar el mensaje automático
- **Prompt oficial:** se encuentra en `src/lib/openai.js`. Solo actualízalo si el equipo de WOW Travel cambia las reglas de comunicación.
- **Mensaje de respaldo:** `FALLBACK_MESSAGE` está definido en `src/app/api/webhook-wt/route.js`. Edítalo si quieres otro texto de contingencia cuando OpenAI o WhatsApp fallen.
- **Ventana de respuesta única:** el helper `src/lib/contact-history.js` guarda a cada contacto durante `CONTACT_HISTORY_TTL_DAYS`. Ponlo en `1` para bloquear respuestas automáticas durante un día, `30` para un mes, etc.

## Cómo probar localmente
1. Copia `.env.example` a `.env.local` y rellena al menos `VERIFY_TOKEN`, `WHATSAPP_TOKEN` y `OPENAI_API_KEY`.
2. Ejecuta `npm run dev` y expone el puerto con una herramienta como `ngrok` para que Meta pueda enviar eventos.
3. Configura el webhook temporal en Meta apuntando al dominio de `ngrok` y usa el mismo `VERIFY_TOKEN` de tu `.env.local`.
4. Escribe a tu número de WhatsApp Business desde un número autorizado. Solo el primer mensaje por contacto recibirá la respuesta automática.

## Archivos clave
- `src/app/api/webhook-wt/route.js`: endpoint oficial (maneja GET/POST, errores y fallback).
- `src/lib/openai.js`: helper que arma el prompt y llama a `gpt-5.1`.
- `src/lib/whatsapp.js`: cliente para enviar mensajes al Graph API.
- `src/lib/contact-history.js`: evita responder conversaciones con historial reciente.
- `.env.example`: referencia de todas las variables que debes completar al desplegar.

Con estas piezas configuradas, el flujo queda operativo. Solo necesitas mantener las credenciales actualizadas y garantizar que el backend esté publicado sobre HTTPS para que Meta pueda llegar al webhook.
