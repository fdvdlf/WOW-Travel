"use client";

import { useMemo, useState } from "react";
import { Layout } from "@/layouts/Layout";

const expedienteBase = {
  propietario: "Carolina Vega",
  documento: "DNI 70521458",
  direccion: "Calle Los Cipreses 234, Surco (al lado del parque)",
  telefonos: "+51 999 888 777, +51 944 321 567",
  correo: "carolina.vega@mail.com",
  mascota: {
    nombre: "Kira",
    raza: "Border Collie",
    sexo: "Hembra",
    nacimiento: "2021-03-02",
    vacunacion: "2024-05-20",
    pelaje: "Blanco y negro",
    alimento: "Royal Canin Medium Adult",
    esterilizado: "Sí",
    alergias: "Ninguna conocida",
    foto: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=200&q=60",
    peso: "16.3 kg",
    chip: "985141003228990",
  },
  viaje: {
    fecha: "2024-09-15",
    destino: "Toronto, Canadá",
    jaula: "90x60x65 cm (plástico rígido)",
    necesitaCertificado: "Sí",
    requiereTitulacion: "Depende del destino",
  },
};

const statusStyles = {
  completo: "bg-success-subtle text-success",
  "en-progreso": "bg-warning-subtle text-warning",
  pendiente: "bg-light text-muted border",
};

const statusLabel = {
  completo: "Completo",
  "en-progreso": "En progreso",
  pendiente: "Pendiente",
};

const initialDocs = [
  {
    titulo: "Documento de identidad del propietario",
    descripcion: "DNI/CE legible y vigente",
    status: "completo",
    evidencia: "dni_carolina.pdf",
  },
  {
    titulo: "Vacunación, desparasitación y antipulgas",
    descripcion: "Foto de la tarjeta o certificado",
    status: "en-progreso",
    evidencia: "tarjeta_vacunacion.jpg",
  },
  {
    titulo: "Certificado de salud y microchip",
    descripcion: "Incluye código de chip y firma del veterinario",
    status: "pendiente",
  },
  {
    titulo: "Certificado de desinfección y desinsectación",
    descripcion: "Adjuntar medidas y material de la jaula",
    status: "pendiente",
  },
  {
    titulo: "Titulación de anticuerpos rabia",
    descripcion: "Solo si el país de destino lo exige",
    status: "pendiente",
  },
  {
    titulo: "Otros documentos del país de origen/destino",
    descripcion: "Permisos especiales o cartas consulares",
    status: "pendiente",
  },
];

const etapas = [
  {
    titulo: "Creación del expediente",
    descripcion: "Captura de datos del propietario y la mascota",
    owner: "Comercial",
    status: "completo",
  },
  {
    titulo: "Validación documental",
    descripcion: "Revisión de vacunas, microchip y certificados",
    owner: "Operaciones",
    status: "en-progreso",
  },
  {
    titulo: "Reserva y pagos",
    descripcion: "Cuotas, AWB y confirmación de servicio",
    owner: "Finanzas",
    status: "pendiente",
  },
  {
    titulo: "Logística y entrega",
    descripcion: "Jaula, transporte y coordinación de vuelo",
    owner: "Operaciones",
    status: "pendiente",
  },
  {
    titulo: "Cierre del proceso",
    descripcion: "Entrega final y encuesta de satisfacción",
    owner: "CX",
    status: "pendiente",
  },
];

const tareas = [
  "Confirmar fecha probable de viaje con aerolínea",
  "Registrar código de microchip y adjuntar evidencia",
  "Solicitar certificado de desinfección y desinsectación",
  "Subir fotos de jaula con medidas y material",
  "Validar si el destino requiere titulación de anticuerpos rabia",
];

const camposFormulario = [
  {
    grupo: "Propietario y contacto",
    campos: [
      { name: "propietario", label: "Nombre del propietario", placeholder: "Ej. Carolina Vega" },
      { name: "documento", label: "DNI/CE", placeholder: "Ej. 70521458" },
      { name: "direccion", label: "Dirección + referencias", placeholder: "Calle, número, referencia" },
      { name: "telefonos", label: "Teléfonos (2 contactos de preferencia)", placeholder: "Números separados por coma" },
      { name: "correo", label: "Correo electrónico", placeholder: "nombre@correo.com" },
    ],
  },
  {
    grupo: "Mascota",
    campos: [
      { name: "mascota.nombre", label: "Nombre de la mascotita", placeholder: "Ej. Kira" },
      { name: "mascota.raza", label: "Raza", placeholder: "Ej. Border Collie" },
      { name: "mascota.sexo", label: "Sexo", placeholder: "Hembra/Macho" },
      { name: "mascota.nacimiento", label: "Fecha de nacimiento de la mascota", type: "date" },
      {
        name: "mascota.vacunacion",
        label: "Fecha de la última vacunación, desparasitación y antipulgas",
        type: "date",
      },
      { name: "mascota.pelaje", label: "Color de pelaje", placeholder: "Ej. Blanco y negro" },
      { name: "mascota.alimento", label: "Alimento (marca)", placeholder: "Ej. Royal Canin" },
      { name: "mascota.esterilizado", label: "Indicar si está esterilizado/a", placeholder: "Sí/No" },
      { name: "mascota.alergias", label: "Alérgic@ a alguna medicina o comida", placeholder: "Especificar" },
      { name: "mascota.foto", label: "Fotito actualizada de su mascota (URL o adjunto)", placeholder: "URL o usar adjunto" },
      { name: "mascota.peso", label: "Peso de la mascota", placeholder: "Ej. 16.3 kg" },
      { name: "mascota.chip", label: "Código de chip (o colocar al llegar)", placeholder: "Ej. 985141003228990" },
    ],
  },
  {
    grupo: "Viaje y requerimientos",
    campos: [
      { name: "viaje.fecha", label: "Fecha probable de viaje", type: "date" },
      { name: "viaje.destino", label: "Destino", placeholder: "Ciudad y país" },
      {
        name: "viaje.jaula",
        label: "Medidas de jaula (profundidad x altura x ancho) y material",
        placeholder: "Ej. 90x60x65 cm – plástico",
      },
      {
        name: "viaje.necesitaCertificado",
        label: "¿Necesita certificado de desinfección y desinsectación?",
        placeholder: "Sí/No",
      },
      {
        name: "viaje.requiereTitulacion",
        label: "¿Requiere certificado de titulación de anticuerpos rabia?",
        placeholder: "Sí/No/Depende del destino",
      },
      { name: "viaje.otros", label: "Otros documentos solicitados por el país", placeholder: "Listar requisitos" },
    ],
  },
];

function useFormState() {
  const [data, setData] = useState(expedienteBase);
  const [lastSaved, setLastSaved] = useState(null);

  const readValue = (path) => path.split(".").reduce((acc, key) => acc?.[key], data);

  const updateField = (path, value) => {
    const keys = path.split(".");
    setData((prev) => {
      const clone = { ...prev };
      let current = clone;
      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          current[key] = value;
        } else {
          current[key] = { ...current[key] };
          current = current[key];
        }
      });
      return clone;
    });
  };

  const saveNow = () => setLastSaved(new Date());

  return { data, updateField, readValue, lastSaved, saveNow };
}

function Badge({ value }) {
  const style = statusStyles[value] || statusStyles.pendiente;
  return <span className={`badge rounded-pill ${style}`}>{statusLabel[value] || value}</span>;
}

export default function TrackingDemo() {
  const { data, updateField, readValue, lastSaved, saveNow } = useFormState();
  const [docs, setDocs] = useState(initialDocs);
  const [selectedFile, setSelectedFile] = useState(null);
  const [acciones, setAcciones] = useState(
    tareas.map((tarea) => ({ titulo: tarea, completada: false }))
  );

  const completados = useMemo(
    () => docs.filter((doc) => doc.status === "completo").length,
    [docs]
  );

  const camposRequeridos = useMemo(
    () =>
      camposFormulario.flatMap((grupo) =>
        grupo.campos.map((campo) => ({ name: campo.name, label: campo.label }))
      ),
    []
  );

  const camposCompletos = useMemo(
    () =>
      camposRequeridos.filter(({ name }) => {
        const value = readValue(name);
        return typeof value === "string" ? value.trim().length > 0 : Boolean(value);
      }).length,
    [camposRequeridos, readValue]
  );

  const camposPendientes = camposRequeridos
    .filter(({ name }) => {
      const value = readValue(name);
      return !(typeof value === "string" ? value.trim() : value);
    })
    .map(({ label }) => label);

  const progress = Math.round((camposCompletos / camposRequeridos.length) * 100);

  const handleDocUpload = (index, file) => {
    setDocs((prev) => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        status: "completo",
        evidencia: file?.name || "Evidencia cargada",
      };
      return next;
    });
  };

  const toggleAccion = (index) => {
    setAcciones((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], completada: !next[index].completada };
      return next;
    });
  };

  return (
    <Layout header={3} footer={1} breadcrumbTitle="Tracking" breadcrumbSubtitle="Demo end-to-end">
      <section className="py-5" style={{ background: "#f5f6f9" }}>
        <div className="container">
          <div className="row align-items-center mb-4">
            <div className="col-lg-8">
              <p className="text-uppercase text-primary fw-semibold mb-2">Demo interno</p>
              <h1 className="mb-2">Tracking operativo: de lead a cierre</h1>
              <p className="text-muted mb-0">
                Crea, valida y cierra expedientes de viaje de mascotas en una sola vista. Captura todos los datos
                solicitados, sube documentos y sigue el estado del pipeline.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
              <button className="btn btn-primary me-2">+ Nuevo expediente</button>
              <button className="btn btn-outline-secondary">Exportar PDF</button>
            </div>
          </div>

          <div className="row g-4 mb-4">
            <div className="col-md-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <p className="text-muted small mb-1">Documentos completos</p>
                  <h3 className="mb-0">{completados} / {docs.length}</h3>
                  <small className="text-success">Actualizado en vivo</small>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <p className="text-muted small mb-1">Propietario</p>
                  <h5 className="mb-1">{data.propietario}</h5>
                  <small className="text-muted">{data.documento}</small>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <p className="text-muted small mb-1">Mascota</p>
                  <h5 className="mb-1">{data.mascota.nombre}</h5>
                  <small className="text-muted">{data.mascota.raza} · {data.mascota.peso}</small>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <p className="text-muted small mb-1">Destino</p>
                  <h5 className="mb-1">{data.viaje.destino}</h5>
                  <small className="text-muted">Fecha probable: {data.viaje.fecha}</small>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4 mb-4">
            <div className="col-lg-7">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <p className="text-muted small mb-1">Avance del expediente</p>
                      <h4 className="mb-0">{progress}% completo</h4>
                    </div>
                    <div className="w-50">
                      <div className="progress" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                        <div className="progress-bar bg-success" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    <span className="badge bg-success-subtle text-success">{camposCompletos} campos completos</span>
                    <span className="badge bg-warning-subtle text-warning">{camposRequeridos.length - camposCompletos} pendientes</span>
                    <span className="badge bg-info-subtle text-info">{docs.length} requisitos documentales</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="mb-0">Alertas de calidad</h6>
                    <Badge value={camposPendientes.length ? "en-progreso" : "completo"} />
                  </div>
                  {camposPendientes.length ? (
                    <ul className="mb-0 small text-muted">
                      {camposPendientes.slice(0, 6).map((campo) => (
                        <li key={campo}>{campo}</li>
                      ))}
                      {camposPendientes.length > 6 && (
                        <li className="text-primary">+ {camposPendientes.length - 6} campos adicionales pendientes</li>
                      )}
                    </ul>
                  ) : (
                    <p className="mb-0 text-success">Todos los campos obligatorios están completos.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-lg-7">
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h4 className="mb-1">Ficha completa del cliente</h4>
                      <p className="text-muted mb-0">Incluye los 21 campos obligatorios</p>
                    </div>
                    <span className="badge bg-primary-subtle text-primary">Editable en vivo</span>
                  </div>
                  <div className="row g-4">
                    {camposFormulario.map((grupo) => (
                      <div key={grupo.grupo} className="col-12">
                        <h6 className="text-uppercase text-muted small mb-2">{grupo.grupo}</h6>
                        <div className="row g-3">
                          {grupo.campos.map((campo) => (
                            <div key={campo.name} className="col-md-6">
                              <label className="form-label small fw-semibold">{campo.label}</label>
                              <input
                                type={campo.type || "text"}
                                className="form-control"
                                placeholder={campo.placeholder}
                                value={readValue(campo.name) || ""}
                                onChange={(e) => updateField(campo.name, e.target.value)}
                              />
                            </div>
                          ))}
                          <div className="col-md-6">
                            <label className="form-label small fw-semibold">Adjuntar foto o tarjeta</label>
                            <input
                              type="file"
                              className="form-control"
                              onChange={(e) => setSelectedFile(e.target.files?.[0])}
                            />
                            {selectedFile && <small className="text-success">Cargado: {selectedFile.name}</small>}
                          </div>
                          <div className="col-md-6">
                            <label className="form-label small fw-semibold">Referencia visual de la mascota</label>
                            <div className="d-flex align-items-center gap-3 border rounded p-2 bg-light">
                              <img
                                src={data.mascota.foto}
                                alt="Mascota"
                                style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 8 }}
                              />
                              <div>
                                <div className="fw-semibold">{data.mascota.nombre}</div>
                                <small className="text-muted">Peso {data.mascota.peso} · Chip {data.mascota.chip}</small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h4 className="mb-1">Timeline del expediente</h4>
                      <p className="text-muted mb-0">Del lead al cierre con el cliente</p>
                    </div>
                    <span className="badge bg-secondary-subtle text-secondary">Seguimiento</span>
                  </div>
                  <ul className="list-unstyled mb-0">
                    {etapas.map((etapa) => (
                      <li key={etapa.titulo} className="d-flex gap-3 align-items-start mb-3">
                        <div className="text-center">
                          <Badge value={etapa.status} />
                          <div className="small text-muted mt-1">{etapa.owner}</div>
                        </div>
                        <div>
                          <h6 className="mb-1">{etapa.titulo}</h6>
                          <p className="text-muted small mb-0">{etapa.descripcion}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h4 className="mb-1">Documentos y evidencias</h4>
                      <p className="text-muted mb-0">Carga, valida y marca cada requisito</p>
                    </div>
                    <span className="badge bg-primary-subtle text-primary">Subida directa</span>
                  </div>
                  <div className="d-flex flex-column gap-3">
                    {docs.map((doc, idx) => (
                      <div key={doc.titulo} className="border rounded p-3" style={{ background: "#fdfdfd" }}>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <h6 className="mb-0">{doc.titulo}</h6>
                            <small className="text-muted">{doc.descripcion}</small>
                            {doc.evidencia && (
                              <div className="small text-success">Evidencia: {doc.evidencia}</div>
                            )}
                          </div>
                          <Badge value={doc.status} />
                        </div>
                        <div className="d-flex gap-2">
                          <input
                            type="file"
                            className="form-control form-control-sm"
                            onChange={(e) => handleDocUpload(idx, e.target.files?.[0])}
                          />
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => handleDocUpload(idx, { name: "Validación manual" })}
                          >
                            Validar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h4 className="mb-1">Centro de acciones</h4>
                      <p className="text-muted mb-0">Próximos pasos con el cliente</p>
                    </div>
                    <span className="badge bg-success-subtle text-success">Coordina</span>
                  </div>
                  <ul className="list-unstyled mb-3">
                    {acciones.map((accion, index) => (
                      <li key={accion.titulo} className="d-flex align-items-center justify-content-between mb-2">
                        <div className="d-flex align-items-center">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            checked={accion.completada}
                            onChange={() => toggleAccion(index)}
                            id={`accion-${index}`}
                          />
                          <label className={`mb-0 ${accion.completada ? "text-success" : ""}`} htmlFor={`accion-${index}`}>
                            {accion.titulo}
                          </label>
                        </div>
                        <Badge value={accion.completada ? "completo" : "en-progreso"} />
                      </li>
                    ))}
                  </ul>
                  <div className="d-flex gap-2 align-items-center flex-wrap">
                    <button className="btn btn-primary" onClick={saveNow}>Guardar borrador</button>
                    <button className="btn btn-outline-secondary">Notificar al cliente</button>
                    {lastSaved && (
                      <small className="text-muted">Último guardado: {lastSaved.toLocaleString()}</small>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
