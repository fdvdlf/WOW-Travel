import { Layout } from "@/layouts/Layout";

const leadProfile = {
  expedienteId: "EXP-2024-187",
  propietario: "Valeria Soto",
  documento: "DNI 49392922",
  contacto: ["+51 987 456 321", "valeria.soto@mail.com"],
  direccion: "Av. Arequipa 1234, Lince (frente a parque Castilla)",
  mascota: {
    nombre: "Milo",
    raza: "Beagle",
    sexo: "Macho",
    nacimiento: "12/04/2021",
    peso: "11.2 kg",
    color: "Tricolor",
    esterilizado: "Sí",
    microchip: "985141003118765",
  },
  viaje: {
    destino: "Madrid, España",
    fecha: "08/09/2024",
    aerolinea: "Iberia",
    jaula: "Vari Kennel mediana (81x58x61 cm, plástico rígido)",
  },
};

const pipeline = [
  {
    titulo: "1. Lead y calificación",
    owner: "Comercial",
    estado: "completo",
    fecha: "05/07/2024",
    tareas: [
      "Lead ingresado y validado",
      "Datos de propietario y mascota capturados",
      "Consentimiento de uso de datos",
    ],
  },
  {
    titulo: "2. Documentación",
    owner: "Ops",
    estado: "en-progreso",
    fecha: "06/07/2024",
    tareas: [
      "Vacunas y antipulgas al día",
      "Certificado de salud (DR Ricardo Rojas)",
      "Microchip registrado",
      "Titulación de anticuerpos rabia: NO requerido",
    ],
  },
  {
    titulo: "3. Reserva y pagos",
    owner: "Comercial",
    estado: "en-progreso",
    fecha: "07/07/2024",
    tareas: [
      "Cotización enviada",
      "Seña 30% recibida",
      "Boleto y AWB en hold",
    ],
  },
  {
    titulo: "4. Logística",
    owner: "Ops",
    estado: "pendiente",
    fecha: "10/07/2024",
    tareas: [
      "Jaula inspeccionada e higienizada",
      "Desinfección y desinsectación: requerido",
      "Entrega y recojo coordinados",
    ],
  },
  {
    titulo: "5. Viaje y cierre",
    owner: "Ops",
    estado: "pendiente",
    fecha: "08/09/2024",
    tareas: [
      "Check-in pet completed",
      "Seguimiento de vuelo",
      "Entrega final y encuesta NPS",
    ],
  },
];

const checklist = [
  {
    area: "Comercial",
    responsable: "Fiorella Obando",
    items: [
      { label: "Expediente creado y asignado", status: "ok" },
      { label: "Propuesta económica enviada", status: "ok" },
      { label: "Contrato y seña", status: "atencion" },
    ],
  },
  {
    area: "Operaciones",
    responsable: "Gianfranco Matta",
    items: [
      { label: "Certificado de salud", status: "ok" },
      { label: "Vacunas / antipulgas / desparasitación", status: "ok" },
      { label: "Jaula IATA y desinfección", status: "pendiente" },
      { label: "Guía aérea / AWB", status: "pendiente" },
    ],
  },
  {
    area: "Veterinaria",
    responsable: "Dr. Ricardo Rojas",
    items: [
      { label: "Chequeo pre-vuelo", status: "ok" },
      { label: "Microchip validado", status: "ok" },
      { label: "Certificado SENASA", status: "pendiente" },
    ],
  },
  {
    area: "Finanzas",
    responsable: "Adriana Sullca",
    items: [
      { label: "Seña 30%", status: "ok" },
      { label: "Saldo 70%", status: "pendiente" },
      { label: "Factura y recibos", status: "pendiente" },
    ],
  },
];

const documentos = [
  { titulo: "Identificación propietario", estado: "completo", detalle: "DNI y correo validados" },
  { titulo: "Pasaporte sanitario / certificado de salud", estado: "en-progreso", detalle: "Agendado 06/07" },
  {
    titulo: "Vacunas, desparasitación y antipulgas",
    estado: "completo",
    detalle: "Tarjeta veterinaria adjunta (junio 2024)",
  },
  { titulo: "Microchip", estado: "completo", detalle: "Código 985141003118765" },
  { titulo: "Certificado desinfección y desinsectación", estado: "pendiente", detalle: "Programar 20/08" },
  { titulo: "Titulación anticuerpos rabia", estado: "no-aplica", detalle: "Destino no lo exige" },
];

const timeline = [
  {
    fecha: "05/07/2024",
    titulo: "Lead ingresado y calificado",
    detalle: "Checklist de campos completos y consentimiento aceptado",
  },
  {
    fecha: "06/07/2024",
    titulo: "Certificado de salud agendado",
    detalle: "Clínica San Fernando – 3:00 pm",
  },
  {
    fecha: "07/07/2024",
    titulo: "Seña recibida",
    detalle: "Depósito BCP – Voucher adjunto",
  },
  {
    fecha: "20/08/2024",
    titulo: "Desinfección jaula",
    detalle: "Servicio programado, requiere foto de jaula",
  },
  {
    fecha: "08/09/2024",
    titulo: "Vuelo LIM > MAD",
    detalle: "IB6656 – Check-in 4h antes",
  },
];

const statusColors = {
  completo: "bg-success text-white",
  "en-progreso": "bg-warning text-dark",
  pendiente: "bg-light text-dark border",
  atencion: "bg-danger text-white",
  "no-aplica": "bg-secondary text-white",
};

const statusLabels = {
  completo: "Completo",
  "en-progreso": "En progreso",
  pendiente: "Pendiente",
  atencion: "Revisar",
  "no-aplica": "No aplica",
};

const Pill = ({ value }) => {
  const cls = statusColors[value] || "bg-light text-dark border";
  return (
    <span className={`badge rounded-pill ${cls}`} style={{ fontSize: "0.9rem" }}>
      {statusLabels[value] || value}
    </span>
  );
};

const SectionCard = ({ title, children, subtitle }) => (
  <div className="card shadow-sm border-0 h-100">
    <div className="card-body p-4">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h4 className="mb-1">{title}</h4>
          {subtitle && <p className="text-muted mb-0">{subtitle}</p>}
        </div>
        <span className="badge bg-primary-subtle text-primary">Actualizado hoy</span>
      </div>
      {children}
    </div>
  </div>
);

export default function TrackerPage() {
  return (
    <Layout header={3} footer={1} breadcrumbTitle="Tracker operativo" breadcrumbSubtitle="www.wowtravel.pe/tracker">
      <section className="py-5" style={{ background: "#f7f8fb" }}>
        <div className="container">
          <div className="row align-items-center mb-4">
            <div className="col-lg-8">
              <p className="text-uppercase text-primary fw-semibold mb-2">Control end-to-end</p>
              <h1 className="mb-3">Expediente vivo para viajes internacionales de mascotas</h1>
              <p className="text-muted mb-0">
                Visualiza en un solo lugar el estado del lead, checklist por área, documentación y hitos de viaje.
                Lista para usar internamente en WOW Travel.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
              <button className="btn btn-primary me-2">+ Nuevo expediente</button>
              <button className="btn btn-outline-secondary">Exportar PDF</button>
            </div>
          </div>

          <div className="row g-4 mb-4">
            <div className="col-md-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <p className="text-muted mb-1">Expedientes activos</p>
                  <h3 className="mb-0">12</h3>
                  <small className="text-success">+3 esta semana</small>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <p className="text-muted mb-1">Tiempo medio a vuelo</p>
                  <h3 className="mb-0">43 días</h3>
                  <small className="text-muted">Métrica objetivo: 30 días</small>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <p className="text-muted mb-1">Checklists al día</p>
                  <h3 className="mb-0">82%</h3>
                  <small className="text-success">+6% vs semana anterior</small>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <p className="text-muted mb-1">NPS post viaje</p>
                  <h3 className="mb-0">93</h3>
                  <small className="text-muted">Últimos 30 días</small>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4 mb-4">
            <div className="col-lg-6">
              <SectionCard
                title={`Expediente ${leadProfile.expedienteId}`}
                subtitle="Datos clave capturados desde lead"
              >
                <div className="row">
                  <div className="col-sm-6 mb-3">
                    <p className="text-muted small mb-1">Propietario</p>
                    <h6 className="mb-0">{leadProfile.propietario}</h6>
                    <small className="text-muted">{leadProfile.documento}</small>
                  </div>
                  <div className="col-sm-6 mb-3">
                    <p className="text-muted small mb-1">Contacto</p>
                    <h6 className="mb-0">{leadProfile.contacto[0]}</h6>
                    <small className="text-muted">{leadProfile.contacto[1]}</small>
                  </div>
                  <div className="col-sm-12 mb-3">
                    <p className="text-muted small mb-1">Dirección y referencia</p>
                    <h6 className="mb-0">{leadProfile.direccion}</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6 mb-3">
                    <p className="text-muted small mb-1">Mascota</p>
                    <h6 className="mb-0">{leadProfile.mascota.nombre}</h6>
                    <small className="text-muted">
                      {leadProfile.mascota.raza} · {leadProfile.mascota.sexo} · {leadProfile.mascota.peso}
                    </small>
                    <div className="mt-1 text-muted small">
                      Color {leadProfile.mascota.color} · Chip {leadProfile.mascota.microchip}
                    </div>
                  </div>
                  <div className="col-sm-6 mb-3">
                    <p className="text-muted small mb-1">Viaje</p>
                    <h6 className="mb-0">{leadProfile.viaje.destino}</h6>
                    <small className="text-muted">
                      Fecha {leadProfile.viaje.fecha} · {leadProfile.viaje.aerolinea}
                    </small>
                    <div className="mt-1 text-muted small">{leadProfile.viaje.jaula}</div>
                  </div>
                </div>
              </SectionCard>
            </div>

            <div className="col-lg-6">
              <SectionCard title="Pipeline operativo" subtitle="Estados y responsables">
                <div className="d-flex flex-column gap-3">
                  {pipeline.map((stage) => (
                    <div key={stage.titulo} className="p-3 rounded border position-relative" style={{ background: "#fdfdfd" }}>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <div>
                          <h6 className="mb-0">{stage.titulo}</h6>
                          <small className="text-muted">Owner: {stage.owner}</small>
                        </div>
                        <Pill value={stage.estado} />
                      </div>
                      <ul className="list-unstyled mb-1 small text-muted">
                        {stage.tareas.map((item) => (
                          <li key={item} className="d-flex align-items-start">
                            <i className="fas fa-check-circle text-success me-2" aria-hidden></i>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="text-end small text-muted">Hito: {stage.fecha}</div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>
          </div>

          <div className="row g-4 mb-4">
            <div className="col-lg-6">
              <SectionCard title="Checklist por área" subtitle="Dueños claros y SLA visibles">
                <div className="d-flex flex-column gap-3">
                  {checklist.map((block) => (
                    <div key={block.area} className="border rounded p-3" style={{ background: "#fdfdfd" }}>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <div>
                          <h6 className="mb-0">{block.area}</h6>
                          <small className="text-muted">Responsable: {block.responsable}</small>
                        </div>
                        <span className="badge bg-secondary-subtle text-secondary">SLA: 48h</span>
                      </div>
                      <ul className="list-unstyled mb-0">
                        {block.items.map((item) => (
                          <li key={item.label} className="d-flex align-items-center py-1">
                            <Pill value={item.status} />
                            <span className="ms-2">{item.label}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>

            <div className="col-lg-6">
              <SectionCard title="Documentos y evidencias" subtitle="Adjuntos mínimos por país de destino">
                <div className="d-flex flex-column gap-3">
                  {documentos.map((doc) => (
                    <div key={doc.titulo} className="d-flex justify-content-between align-items-center border rounded p-3" style={{ background: "#fdfdfd" }}>
                      <div>
                        <h6 className="mb-0">{doc.titulo}</h6>
                        <small className="text-muted">{doc.detalle}</small>
                      </div>
                      <Pill value={doc.estado} />
                    </div>
                  ))}
                </div>
                <div className="mt-3 d-flex gap-2">
                  <button className="btn btn-outline-primary btn-sm">+ Adjuntar evidencia</button>
                  <button className="btn btn-outline-secondary btn-sm">Ver plantilla de país</button>
                </div>
              </SectionCard>
            </div>
          </div>

          <div className="row g-4 mb-4">
            <div className="col-lg-7">
              <SectionCard title="Timeline del viaje" subtitle="Comunicación proactiva con el cliente">
                <ul className="list-unstyled mb-0">
                  {timeline.map((item, idx) => (
                    <li key={`${item.fecha}-${idx}`} className="d-flex gap-3 align-items-start mb-3">
                      <div className="text-center">
                        <div className="fw-semibold">{item.fecha}</div>
                        <span className="text-primary">●</span>
                      </div>
                      <div>
                        <h6 className="mb-1">{item.titulo}</h6>
                        <p className="text-muted small mb-0">{item.detalle}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </SectionCard>
            </div>

            <div className="col-lg-5">
              <SectionCard title="Centro de acciones" subtitle="Lo siguiente para cerrar en verde">
                <ul className="list-unstyled mb-3">
                  <li className="d-flex align-items-center mb-2">
                    <Pill value="en-progreso" />
                    <span className="ms-2">Enviar contrato y recolectar firma digital</span>
                  </li>
                  <li className="d-flex align-items-center mb-2">
                    <Pill value="pendiente" />
                    <span className="ms-2">Subir fotos de jaula y comprobante de desinfección</span>
                  </li>
                  <li className="d-flex align-items-center mb-2">
                    <Pill value="pendiente" />
                    <span className="ms-2">Confirmar pago de saldo 70% (02/09)</span>
                  </li>
                  <li className="d-flex align-items-center">
                    <Pill value="pendiente" />
                    <span className="ms-2">Agendar recordatorio de check-in 24h antes</span>
                  </li>
                </ul>
                <div className="d-flex gap-2">
                  <button className="btn btn-primary w-50">Marcar completado</button>
                  <button className="btn btn-outline-secondary w-50">Notificar al cliente</button>
                </div>
              </SectionCard>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
