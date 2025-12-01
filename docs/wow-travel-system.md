# Diseño integral del sistema interno de WoW Travel

## Propósito
Proveer un sistema único donde todas las áreas gestionen de punta a punta el ciclo de vida de un viaje de mascota: desde la captación del lead, creación del expediente, coordinación operativa y documentación, hasta la confirmación de un viaje exitoso.

## Roles y permisos
- **Ventas**: crea lead, valida datos iniciales, genera cotización, coordina adelantos y cierre de venta.
- **Documentación**: revisa y adjunta certificados veterinarios, vacunaciones, microchip, permisos, seguros y requisitos específicos del país.
- **Operaciones/Logística**: define itinerario, reservas de vuelo, jaulas y handling; coordina transporte terrestre y controles previos.
- **Finanzas**: controla pagos, facturación, devoluciones y retenciones; libera hitos cuando hay conformidad.
- **Atención al cliente**: comunicación con el cliente, confirmaciones, recordatorios, evidencias de entrega/recepción.
- **Veterinaria**: revisa antecedentes de salud, emite certificados y coordina exámenes/servicios adicionales.
- **Administrador**: configura catálogos (países, aerolíneas, requisitos), define SLA y gestiona usuarios/permisos.

## Entidades clave y campos
### Lead / Expediente de viaje
Incluye todos los datos requeridos antes de programar un viaje:
1. Nombre del propietario
2. DNI/CE
3. Dirección + referencias
4. Teléfonos (2 contactos de preferencia)
5. Correo electrónico
6. Nombre de la mascotita
7. Raza
8. Sexo
9. Fecha de nacimiento de la mascota
10. Fecha de la última vacunación, desparasitación y antipulgas (adjuntar foto de tarjeta o certificado)
11. Color de pelaje
12. Alimento (marca)
13. Indicar si está esterilizad@ o no
14. Alergic@ a alguna medicina o comida
15. Fotografía actualizada de la mascota
16. Peso de la mascota
17. Fecha probable de viaje
18. Código de chip (si no tiene, marcar pendiente de colocación)
19. Certificado de desinfección y desinsectación; medidas de jaula (profundidad, altura, ancho, material)
20. Si el país de destino requiere certificado de titulación de anticuerpos rabia
21. Otros documentos solicitados por el país de origen

### Operaciones
- Itinerario y aerolíneas preferidas
- Puertos/aeropuertos de origen y destino
- Modalidad (cabina, bodega, cargo)
- Transportista terrestre asignado (pickup y entrega)
- Confirmaciones de reserva de vuelo y PNR
- Jaula asignada (código, material, medidas) y estado de sanitización
- Checklists de entrega/recogida

### Financiero
- Cotización base y adicionales (jaula, trámites, vet, transporte)
- Pagos registrados, estado (pendiente, parcial, completo)
- Facturas/recibos adjuntos
- Retenciones o notas de crédito
- Devoluciones y motivos

### Comunicación
- Historial de interacciones (correo, WhatsApp, llamadas)
- Recordatorios y notificaciones programadas
- Encuesta de satisfacción post-viaje

## Flujo de estados (macro)
1. **Lead captado**: registro mínimo de contacto y mascota.
2. **Calificación**: validación de requisitos básicos, viabilidad de fechas y destino.
3. **Cotización enviada**: detalle de servicios y costos; vence con SLA configurable.
4. **Aprobado y pagado (parcial/completo)**: se crea el **Expediente activo**.
5. **Preparación documental**: checklist por país; captura de certificados y fotos; validación veterinaria.
6. **Operación planificada**: itinerario confirmado, jaula asignada, reservas y transporte terrestre programado.
7. **Pre-chequeo**: verificación de salud, peso, crate, documentos impresos y copias digitales.
8. **En tránsito**: seguimiento en tiempo real; eventos (check-in, salida, escala, llegada).
9. **Entrega y cierre**: confirmación de recepción; encuesta; facturación final; cierre de expediente.
10. **Post-mortem**: retroalimentación interna y métricas de desempeño.

## Checklists y tareas
- **Ventas**: datos mínimos (campos 1–5, 6–9, 17), consentimiento de datos, envío de cotización.
- **Documentación**: completar campos 10–21; validar vigencias y traducciones; sello y firma digital.
- **Veterinaria**: revisión de salud, microchip, certificados y vacunas; coordinar visita si falta.
- **Operaciones**: reservar vuelos, emitir etiquetas IATA, validar crate conforme IATA 01/02, agendar transporte.
- **Finanzas**: hitos de pago (reserva, saldo); bloqueo de hitos operativos si no hay pago.
- **Atención**: comunicaciones programadas (T-14, T-7, T-3, T-1, día de viaje, post-viaje).

## Automatizaciones clave
- **SLA y recordatorios**: alertas si cotización expira, documentos vencen o falta microchip.
- **Validaciones**: formatos obligatorios (PDF/JPG), tamaño de archivo, fechas mínimas de vacunación según destino.
- **Bloqueos**: no se permite pasar a “Operación planificada” sin checklist documental completo ni pagos mínimos.
- **Notificaciones**: email/SMS/WhatsApp al cliente en hitos; alertas internas en Slack/Teams.
- **Integraciones externas**: pasarela de pagos, firma digital, APIs de aerolíneas/cargo, sistemas de tracking, agenda veterinaria.

## Modelo de datos (alto nivel)
- **Cliente** (propietario): datos de contacto, identificaciones, consentimientos.
- **Mascota**: datos biométricos, salud, microchip, fotos, peso histórico.
- **Expediente**: estado, país de destino, país de origen, fecha probable de viaje, checklist documental, responsables.
- **Documento**: tipo, país aplicable, archivo, vigencia, verificador.
- **Operación**: itinerario, reservas, jaula, transportistas, hitos operativos, eventos de tracking.
- **Finanza**: cotización, factura, pago, medio de pago, estado.
- **Comunicación**: canal, fecha, contenido, adjuntos, receptor.

## Paneles y reportes
- **Embudo de ventas**: leads por etapa, tasas de conversión, tiempos de respuesta.
- **Salud de expedientes**: checklist documental, pagos vs. hitos, riesgos (vacunas vencidas, sin microchip).
- **Operación diaria**: tablero con vuelos del día, pickups, entregas, estado de jaulas y transportistas.
- **Calidad**: incidencias, SLA cumplidos/incumplidos, NPS post-viaje.
- **Finanzas**: ingresos proyectados, cobranzas pendientes, devoluciones y retenciones.

## Seguridad y cumplimiento
- Control de acceso por rol y por expediente.
- Registro de auditoría (quién cambió qué y cuándo).
- Encriptación de datos sensibles en tránsito y reposo.
- Gestión de consentimientos y políticas de retención de datos.

## Arquitectura sugerida
- **Frontend**: SPA/SSR (Next.js) con módulos de lead, expediente, documentos, operaciones y finanzas.
- **Backend**: servicios con API modular (Auth, Expedientes, Documentos, Operaciones, Pagos, Notificaciones).
- **Integraciones**: conectores a pagos, mensajería, aerolíneas y firmas.
- **Almacenamiento**: base relacional para entidades principales; almacenamiento de archivos en bucket con antivirus.
- **Observabilidad**: logs centralizados, métricas (SLA), alertas y trazabilidad de eventos.

## Plan de ejecución (qué hacer ahora)

### Objetivo de las próximas 2–3 semanas (MVP interno)
- **Captura y gestión de leads/expedientes** con los 21 campos obligatorios y subida de adjuntos.
- **Checklists documentales** por destino, con bloqueos para pasar a Operación planificada.
- **Control de pagos** con hitos (reserva, saldo) y desbloqueo de operaciones solo si corresponde.
- **Tablero diario de operaciones** con vuelos del día, pickups y entregas, y estado de jaulas.

### Fases y responsables
1) **Semana 1 — Setup y modelos básicos** (Equipo Tech + Admin)
   - Definir catálogo inicial: países, aerolíneas, tipos de documento, requisitos por país.
   - Modelar entidades principales (Cliente, Mascota, Expediente, Documento, Pago, Operación) y permisos por rol.
   - Habilitar autenticación y control de acceso; configurar storage seguro para archivos.

2) **Semana 2 — Workflows críticos** (Tech + Documentación + Finanzas)
   - Implementar formularios guiados para lead/expediente con validaciones de formato y vigencias.
   - Configurar checklist documental por país/destino y bloqueos de avance si falta: microchip, vacunas vigentes, pagos mínimos.
   - Registrar pagos y facturas; automatizar alertas de SLA (cotización próxima a vencer, vacunas próximas a vencer).

3) **Semana 3 — Operación y comunicación** (Tech + Operaciones + Atención)
   - Crear tablero operativo diario con vuelos, transportistas y jaulas asignadas.
   - Registrar eventos en tránsito (check-in, salida, escala, llegada) y generar notificaciones al cliente.
   - Habilitar encuesta post-viaje y reporte de incidencias.

### Checklist de arranque (día 0)
- Nombrar **product owner** y un **squad** con referentes de Ventas, Documentación, Operaciones y Finanzas.
- Definir entorno de trabajo (repo, rama principal, ambientes dev/stage/prod) y credenciales iniciales.
- Cargar 3–5 expedientes reales o simulados para probar el flujo end-to-end.
- Acordar **SLA** internos por etapa (respuesta a leads, validación documental, confirmación de reservas).

### Métricas de éxito del MVP
- % de expedientes con checklist completo antes de T-3 días del vuelo.
- Tiempo medio desde lead captado hasta cotización enviada y aceptada.
- Cero vuelos bloqueados por falta de pago o documento al momento de emitir PNR.
- NPS/CSAT post-viaje y número de incidencias críticas.

## Experiencia de usuario
- Formularios guiados por país/destino con checklists dinámicos.
- Línea de tiempo del expediente con responsables y tiempos estimados.
- Vistas por rol: ventas (pipeline), documentación (checklists), operaciones (tablero diario), finanzas (cobros/pagos), atención (historial y notificaciones).
- Buscador global por propietario, mascota, expediente o código de microchip.

## Criterios de éxito
- 0 bloqueos operativos por falta de documento en día de vuelo.
- Tiempos de respuesta medidos y alertados por SLA.
- Visibilidad total del estado del expediente para todas las áreas.
- Experiencia del cliente con notificaciones claras y sin sorpresas en requisitos.
