"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Layout } from "@/layouts/Layout";
import { APP_VERSION, TRACKING_CODE } from "@/lib/appVersion";

const ROLES = ["COMERCIAL", "OPERACIONES", "GERENCIA"];

const ESTADOS_EXPEDIENTE = [
  "CREADO",
  "EN_PROCESO",
  "DOCUMENTACION_COMPLETA",
  "CERRADO",
];

const ESTADOS_REQUISITO = ["PENDIENTE", "ENTREGADO", "OBSERVADO", "VALIDADO"];

const REQUISITOS_BASE = [
  "Microchip",
  "Vacuna antirrábica",
  "Certificado de salud veterinario",
  "Certificado de SENASA",
  "Tratamiento antiparasitario",
  "Documento país destino",
  "Permisos adicionales",
  "Ticket de vuelo (opcional)",
];

const COUNTRY_NAMES = [
  "ALEMANIA",
  "ARGENTINA",
  "ARUBA",
  "AUSTRALIA",
  "AUSTRIA",
  "BELGICA",
  "BOLIVIA",
  "BRASIL",
  "BULGARIA",
  "CANADA",
  "CHILE",
  "CHINA",
  "CHIPRE",
  "COLOMBIA",
  "COREA DEL NORTE",
  "COREA DEL SUR",
  "COSTA RICA",
  "CROACIA",
  "CUBA",
  "DINAMARCA",
  "DUBAI",
  "ECUADOR",
  "EEUU",
  "EGIPTO",
  "EL SALVADOR",
  "ESCOCIA",
  "ESLOVAQUIA",
  "ESLOVENIA",
  "ESPAÑA",
  "ESTONIA",
  "FILIPINAS",
  "FINLANDIA",
  "FRANCIA",
  "GRECIA",
  "GUATEMALA",
  "HONDURAS",
  "HUNGRIA",
  "INDIA",
  "INDONESIA",
  "INGLATERRA",
  "IRLANDA",
  "ISRAEL",
  "ITALIA",
  "JAPON",
  "LETONIA",
  "LITUANIA",
  "LUXEMBURGO",
  "MALASIA",
  "MALTA",
  "MARRUECOS",
  "MEXICO",
  "NICARAGUA",
  "NORUEGA",
  "PAISES BAJOS",
  "PANAMA",
  "PARAGUAY",
  "POLONIA",
  "PORTUGAL",
  "QATAR",
  "REINO DE ARABIA SAUDITA",
  "REINO UNIDO",
  "REPUBLICA CHECA",
  "REPUBLICA DOMINICANA",
  "RUMANIA",
  "RUSIA",
  "SERBIA",
  "SUDAFRICA",
  "SUECIA",
  "SUIZA",
  "TAILANDIA",
  "TAIWAN",
  "TRINIDAD Y TOBAGO",
  "URUGUAY",
  "VENEZUELA",
  "VIETNAM",
  "ZAMBIA",
];

const DEFAULT_COUNTRY = "CANADA";

const COUNTRY_PRETTY_LABELS = {
  CANADA: "Canadá",
  ESPAÑA: "España",
  MEXICO: "México",
  "PAISES BAJOS": "Países Bajos",
  "REINO DE ARABIA SAUDITA": "Reino de Arabia Saudita",
  "REINO UNIDO": "Reino Unido",
  "REPUBLICA CHECA": "República Checa",
  "REPUBLICA DOMINICANA": "República Dominicana",
  SUDAFRICA: "Sudáfrica",
  "TRINIDAD Y TOBAGO": "Trinidad y Tobago",
};

const formatCountryLabel = (value) =>
  value
    .toLowerCase()
    .split(" ")
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(" ");

const PAISES = COUNTRY_NAMES.map((name) => ({
  value: name,
  label: COUNTRY_PRETTY_LABELS[name] || formatCountryLabel(name),
}));

const REQUISITOS_POR_PAIS = {
  CANADA: [
    "Microchip ISO",
    "Vacuna antirrábica vigente",
    "Certificado veterinario bilingüe",
    "Permiso de importación CFIA/SFIA",
    "Tratamiento antiparasitario",
    "Formato aduana / aerolínea",
    "Ticket de vuelo (opcional)",
  ],
  EEUU: [
    "Microchip ISO",
    "Vacuna antirrábica (21 días)",
    "Certificado APHIS 7001",
    "Formulario CDC (si aplica)",
    "Certificado de salud",
    "Serología si país de riesgo",
    "Ticket de vuelo (opcional)",
  ],
  MEXICO: [
    "Microchip ISO",
    "Vacuna antirrábica vigente",
    "Certificado zoosanitario",
    "Tratamiento antiparasitario",
    "Constancia libre de enfermedades",
    "Formato SENASICA",
    "Ticket de vuelo (opcional)",
  ],
  UE: [
    "Microchip ISO",
    "Vacuna antirrábica con espera",
    "Pasaporte o certificado UE",
    "Títulos de anticuerpos",
    "Tratamiento antiparasitario",
    "Notificación TRACES/ADNS",
    "Ticket de vuelo (opcional)",
  ],
};

const buildRequisitosPorPais = (pais, seed = {}) => {
  const source = REQUISITOS_POR_PAIS[pais] || REQUISITOS_BASE;
  return source.map((nombre, index) => {
    const preset = seed[index] || {};
    return {
      id: `req-${pais}-${index + 1}`,
      nombre,
      estado: "PENDIENTE",
      evidencia_url: "",
      fecha: "",
      notas: "",
      ...preset,
    };
  });
};

const getPaisLabel = (value) => PAISES.find((p) => p.value === value)?.label || value;

const BASE_PRICE = 1500;
const PRICE_STEP = 30;
const COUNTRY_PRICING = COUNTRY_NAMES.reduce((acc, name, index) => {
  acc[name] = BASE_PRICE + PRICE_STEP * (index % 10);
  return acc;
}, {});

const getPriceForCountry = (pais) => COUNTRY_PRICING[pais] ?? BASE_PRICE;

const getPriceReason = (pais) => `Precio estándar ${getPaisLabel(pais)}`;

const SAMPLE_LEADS = [
  {
    id: "lead-1",
    name: "Carolina Vega",
    phone: "+51 999 888 777",
    source: "Whatsapp",
    notes: "Viaje con mascota a Toronto",
    created_at: "2024-06-01",
  },
  {
    id: "lead-2",
    name: "Marco Díaz",
    phone: "+51 988 222 444",
    source: "Web",
    notes: "Consulta puerta a puerta Madrid",
    created_at: "2024-06-03",
  },
  {
    id: "lead-3",
    name: "Lucía Rojas",
    phone: "+51 977 111 333",
    source: "Referido",
    notes: "Traslado VIP a Buenos Aires con visado al día",
    created_at: "2024-06-04",
  },
  {
    id: "lead-4",
    name: "Santiago Paredes",
    phone: "+51 955 000 121",
    source: "Landing campaña",
    notes: "Ruta combinada Lima → Miami → Toronto, requiere crate especial",
    created_at: "2024-06-05",
  },
];

const SAMPLE_EXPEDIENTES = [
  {
    id: "exp-1",
    codigo: "EXP-001",
    lead_id: "lead-1",
    owner_name: "Carolina Vega",
    owner_doc: "DNI 70521458",
    phone: "+51 999 888 777",
    email: "carolina.vega@mail.com",
    mascota_name: "Kira",
    especie: "Perro",
    raza: "Border Collie",
    peso: "16.3 kg",
    color: "Blanco y negro",
    destino: "Toronto, Canadá",
    pais: DEFAULT_COUNTRY,
    origen: "Lima, Perú",
    fecha_probable: "2024-09-15",
    precio: getPriceForCountry(DEFAULT_COUNTRY),
    priceReason: getPriceReason(DEFAULT_COUNTRY),
    estado: "EN_PROCESO",
    responsable: { comercial: "Fernando", operaciones: "Gabriel" },
    riesgo: "En control",
    pagos: {
      pago70: { tipo: 70, comprobante_url: "voucher_70.pdf", fecha: "2024-06-02", aprobado: true },
      pago30: { tipo: 30, comprobante_url: "", fecha: "", aprobado: false },
    },
    requisitos: buildRequisitosPorPais(DEFAULT_COUNTRY, {
      0: { estado: "VALIDADO", evidencia_url: "archivo.pdf", fecha: "2024-06-10" },
      1: { estado: "VALIDADO", evidencia_url: "archivo.pdf", fecha: "2024-06-10" },
      2: { estado: "OBSERVADO", notas: "Repetir examen, fecha vencida" },
    }),
    historial: [
      { id: "h1", usuario: "Gabriel", fecha: "2024-06-05", descripcion: "Se cargan vacunas y microchip." },
      { id: "h2", usuario: "Fernando", fecha: "2024-06-08", descripcion: "Pago 70% aprobado por Gerencia." },
    ],
  },
];

function SectionTitle({ title, subtitle, badge }) {
  return (
    <div className="d-flex justify-content-between align-items-start mb-3">
      <div>
        <h4 className="mb-1">{title}</h4>
        {subtitle ? <p className="text-muted mb-0">{subtitle}</p> : null}
      </div>
      {badge ? <span className="badge bg-primary-subtle text-primary">{badge}</span> : null}
    </div>
  );
}

function EstadoPill({ value }) {
  const colors = {
    CREADO: "bg-light text-muted border",
    EN_PROCESO: "bg-warning-subtle text-warning",
    DOCUMENTACION_COMPLETA: "bg-success-subtle text-success",
    CERRADO: "bg-secondary-subtle text-secondary",
  };
  return <span className={`badge rounded-pill ${colors[value] || "bg-light"}`}>{value}</span>;
}

function ExpedienteCard({ expediente, onSelect, isActive }) {
  return (
    <div
      className={`border rounded p-3 mb-2 ${isActive ? "border-primary shadow-sm" : "border-light bg-light"}`}
      role="button"
      onClick={onSelect}
    >
      <div className="d-flex justify-content-between align-items-center mb-1">
        <div className="fw-semibold">{expediente.codigo}</div>
        <EstadoPill value={expediente.estado} />
      </div>
      <p className="mb-0 small text-muted">
        {expediente.mascota_name} · {expediente.owner_name} · {expediente.destino}
      </p>
      <small className="text-muted d-block">Responsable: {expediente.responsable?.comercial}</small>
      <small className="text-muted">Checklist país: {getPaisLabel(expediente.pais || "CANADA")}</small>
    </div>
  );
}

function RequisitoRow({ requisito, onUpdate }) {
  const fileInputRef = useRef(null);

  const handleAdjuntarEvidencia = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpdate({ ...requisito, evidencia_url: file.name });
    }
  };

  return (
    <tr>
      <td className="fw-semibold">{requisito.nombre}</td>
      <td>
        <select
          className="form-select form-select-sm"
          value={requisito.estado}
          onChange={(e) => onUpdate({ ...requisito, estado: e.target.value })}
        >
          {ESTADOS_REQUISITO.map((estado) => (
            <option key={estado} value={estado}>
              {estado}
            </option>
          ))}
        </select>
      </td>
      <td>
        <div className="d-flex align-items-center gap-2">
          <input
            className="form-control form-control-sm"
            placeholder="URL o nombre de evidencia"
            value={requisito.evidencia_url}
            onChange={(e) => onUpdate({ ...requisito, evidencia_url: e.target.value })}
          />
          <input ref={fileInputRef} type="file" className="d-none" onChange={handleFileChange} />
          <button className="btn btn-link btn-sm p-0" type="button" onClick={handleAdjuntarEvidencia}>
            Adjuntar evidencia
          </button>
        </div>
      </td>
      <td>
        <input
          type="date"
          className="form-control form-control-sm"
          value={requisito.fecha || ""}
          onChange={(e) => onUpdate({ ...requisito, fecha: e.target.value })}
        />
      </td>
      <td>
        <input
          className="form-control form-control-sm"
          placeholder="Notas internas"
          value={requisito.notas}
          onChange={(e) => onUpdate({ ...requisito, notas: e.target.value })}
        />
      </td>
    </tr>
  );
}

export default function TrackingPage() {
  const [role, setRole] = useState("COMERCIAL");
  const [leads, setLeads] = useState(SAMPLE_LEADS);
  const [expedientes, setExpedientes] = useState(SAMPLE_EXPEDIENTES);
  const [selectedExpedienteId, setSelectedExpedienteId] = useState(SAMPLE_EXPEDIENTES[0]?.id);
  const [leadForm, setLeadForm] = useState({ name: "", phone: "", source: "", notes: "" });
  const [notaInterna, setNotaInterna] = useState("");
  const selectedExpediente = useMemo(
    () => expedientes.find((exp) => exp.id === selectedExpedienteId),
    [expedientes, selectedExpedienteId]
  );

  const [mensaje, setMensaje] = useState("");
  const [precioDraft, setPrecioDraft] = useState("0");
  const [razonPrecio, setRazonPrecio] = useState("");

  useEffect(() => {
    if (!selectedExpediente) return;
    setPrecioDraft(String(selectedExpediente.precio ?? 0));
    setRazonPrecio(selectedExpediente.priceReason || "");
  }, [selectedExpediente?.id, selectedExpediente?.precio, selectedExpediente?.priceReason]);

  const updateExpediente = (id, updater) => {
    setExpedientes((prev) => prev.map((exp) => (exp.id === id ? updater(exp) : exp)));
  };

  const addHistorial = (descripcion) => {
    if (!selectedExpediente) return;
    updateExpediente(selectedExpediente.id, (exp) => ({
      ...exp,
      historial: [
        {
          id: `h-${Date.now()}`,
          usuario: role,
          fecha: new Date().toISOString().slice(0, 10),
          descripcion,
        },
        ...exp.historial,
      ],
    }));
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    const newLead = {
      id: `lead-${Date.now()}`,
      ...leadForm,
      created_at: new Date().toISOString().slice(0, 10),
    };
    setLeads((prev) => [newLead, ...prev]);
    setLeadForm({ name: "", phone: "", source: "", notes: "" });
    setMensaje("Lead creado y listo para calificación.");
  };

  const handleConvertLead = (lead) => {
    if (role !== "COMERCIAL") {
      setMensaje("Solo Comercial convierte leads a expedientes.");
      return;
    }
    const paisInicial =
      PAISES.find((p) => p.value === DEFAULT_COUNTRY)?.value || PAISES[0]?.value || DEFAULT_COUNTRY;
    const nuevo = {
      id: `exp-${Date.now()}`,
      codigo: `EXP-${String(expedientes.length + 1).padStart(3, "0")}`,
      lead_id: lead.id,
      owner_name: lead.name,
      owner_doc: "Pendiente",
      phone: lead.phone,
      email: "",
      mascota_name: "Mascota sin nombre",
      especie: "Perro",
      raza: "Por definir",
      peso: "",
      color: "",
      destino: lead.notes || "Destino por definir",
      pais: paisInicial,
      origen: "",
      fecha_probable: "",
      precio: getPriceForCountry(paisInicial),
      priceReason: getPriceReason(paisInicial),
      estado: "CREADO",
      responsable: { comercial: "", operaciones: "" },
      riesgo: "",
      pagos: { pago70: { tipo: 70, comprobante_url: "", fecha: "", aprobado: false }, pago30: { tipo: 30, comprobante_url: "", fecha: "", aprobado: false } },
      requisitos: buildRequisitosPorPais(paisInicial),
      historial: [
        {
          id: `h-${Date.now()}`,
          usuario: "COMERCIAL",
          fecha: new Date().toISOString().slice(0, 10),
          descripcion: "Lead convertido a expediente",
        },
      ],
    };
    setExpedientes((prev) => [nuevo, ...prev]);
    setSelectedExpedienteId(nuevo.id);
    setMensaje("Expediente creado desde el lead.");
  };

  const handlePaisChange = (paisValue) => {
    if (!selectedExpediente) return;
    const defaultPrice = getPriceForCountry(paisValue);
    const defaultReason = getPriceReason(paisValue);
    updateExpediente(selectedExpediente.id, (exp) => ({
      ...exp,
      pais: paisValue,
      requisitos: buildRequisitosPorPais(paisValue),
      precio: defaultPrice,
      priceReason: defaultReason,
    }));
    addHistorial(
      `País de destino actualizado a ${getPaisLabel(paisValue)}. Checklist regenerado y precio ajustado.`
    );
    setMensaje("Checklist y precio estándar actualizados según país seleccionado.");
    setPrecioDraft(String(defaultPrice));
    setRazonPrecio(defaultReason);
  };

  const handleGuardarPrecio = () => {
    if (!selectedExpediente) return;
    const parsedPrice = Number(precioDraft);
    if (Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      setMensaje("Ingresa un precio válido mayor a cero.");
      return;
    }
    if (!razonPrecio.trim()) {
      setMensaje("Debes indicar la razón del ajuste manual.");
      return;
    }
    updateExpediente(selectedExpediente.id, (exp) => ({
      ...exp,
      precio: parsedPrice,
      priceReason: razonPrecio.trim(),
    }));
    addHistorial(`Precio ajustado a USD ${parsedPrice} (${razonPrecio.trim()}).`);
    setMensaje(`Precio actualizado a USD ${parsedPrice}.`);
    setPrecioDraft(String(parsedPrice));
    setRazonPrecio(razonPrecio.trim());
  };

  const handleDownloadCotizacion = () => {
    if (!selectedExpediente) return;
    if (typeof document === "undefined") {
      setMensaje("La descarga solo está disponible desde el navegador.");
      return;
    }
    const rows = [
      ["Campo", "Valor"],
      ["Expediente", selectedExpediente.codigo],
      ["Cliente", selectedExpediente.owner_name],
      ["Mascota", `${selectedExpediente.mascota_name} (${selectedExpediente.raza})`],
      ["Destino", selectedExpediente.destino],
      ["País", getPaisLabel(selectedExpediente.pais || DEFAULT_COUNTRY)],
      ["Precio (USD)", selectedExpediente.precio],
      ["Motivo precio", selectedExpediente.priceReason || "Estándar"],
      ["", ""],
      ["Requisito", "Estado"],
      ...selectedExpediente.requisitos.map((req) => [req.nombre, req.estado]),
    ];
    const csvContent = rows
      .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","))
      .join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `cotizacion-${selectedExpediente.codigo}.csv`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
    setMensaje(`Cotización ${selectedExpediente.codigo} descargada.`);
  };

  const handlePago = (tipo) => {
    if (!selectedExpediente) return;
    if (tipo === 70 && role !== "COMERCIAL") {
      setMensaje("Solo Comercial registra el pago 70%.");
      return;
    }
    if (tipo === 30 && role !== "COMERCIAL") {
      setMensaje("Solo Comercial registra el pago 30%.");
      return;
    }
    updateExpediente(selectedExpediente.id, (exp) => ({
      ...exp,
      pagos: {
        ...exp.pagos,
        [`pago${tipo}`]: {
          ...exp.pagos[`pago${tipo}`],
          comprobante_url: `voucher_${tipo}.pdf`,
          fecha: new Date().toISOString().slice(0, 10),
          aprobado: tipo === 70 ? exp.pagos.pago70.aprobado : exp.pagos.pago30.aprobado,
        },
      },
    }));
    addHistorial(`Comprobante ${tipo}% cargado.`);
    setMensaje(`Pago ${tipo}% registrado, pendiente aprobación de Gerencia.`);
  };

  const handleAprobarPago = (tipo) => {
    if (!selectedExpediente) return;
    if (role !== "GERENCIA") {
      setMensaje("Solo Gerencia aprueba o valida pagos.");
      return;
    }
    updateExpediente(selectedExpediente.id, (exp) => ({
      ...exp,
      pagos: {
        ...exp.pagos,
        [`pago${tipo}`]: { ...exp.pagos[`pago${tipo}`], aprobado: true },
      },
      estado: tipo === 70 ? "EN_PROCESO" : exp.estado,
    }));
    addHistorial(`Gerencia aprueba pago ${tipo}%.`);
    setMensaje(`Pago ${tipo}% aprobado/validado.`);
  };

  const handleRequisitoUpdate = (reqActualizado) => {
    if (!selectedExpediente) return;
    if (!["OPERACIONES", "COMERCIAL", "GERENCIA"].includes(role)) {
      setMensaje("Acción no permitida para este rol.");
      return;
    }
    updateExpediente(selectedExpediente.id, (exp) => ({
      ...exp,
      requisitos: exp.requisitos.map((req) => (req.id === reqActualizado.id ? reqActualizado : req)),
    }));
  };

  const handleDocumentacionCompleta = () => {
    if (!selectedExpediente) return;
    if (role !== "OPERACIONES") {
      setMensaje("Solo Operaciones marca documentación completa.");
      return;
    }
    if (selectedExpediente.requisitos.some((req) => req.estado !== "VALIDADO")) {
      setMensaje("Todos los requisitos deben estar en VALIDADO.");
      return;
    }
    updateExpediente(selectedExpediente.id, (exp) => ({ ...exp, estado: "DOCUMENTACION_COMPLETA" }));
    addHistorial("Operaciones marca documentación completa.");
    setMensaje("Documentación completa. Listo para cierre.");
  };

  const handleEstadoChange = (nextEstado) => {
    if (!selectedExpediente) return;
    const actual = selectedExpediente.estado;
    const allowedTransitions = {
      CREADO: ["EN_PROCESO"],
      EN_PROCESO: ["DOCUMENTACION_COMPLETA"],
      DOCUMENTACION_COMPLETA: ["CERRADO"],
      CERRADO: [],
    };
    if (!allowedTransitions[actual].includes(nextEstado)) {
      setMensaje("Transición no permitida según la regla del flujo.");
      return;
    }
    if (nextEstado === "EN_PROCESO" && !selectedExpediente.pagos.pago70.aprobado) {
      setMensaje("Gerencia debe aprobar el 70% antes de EN_PROCESO.");
      return;
    }
    if (
      nextEstado === "DOCUMENTACION_COMPLETA" &&
      selectedExpediente.requisitos.some((req) => req.estado !== "VALIDADO")
    ) {
      setMensaje("Faltan requisitos por validar.");
      return;
    }
    if (nextEstado === "CERRADO" && role !== "GERENCIA") {
      setMensaje("Solo Gerencia puede cerrar el expediente.");
      return;
    }
    updateExpediente(selectedExpediente.id, (exp) => ({ ...exp, estado: nextEstado }));
    addHistorial(`Estado actualizado a ${nextEstado}.`);
    setMensaje(`Expediente en estado ${nextEstado}.`);
  };

  const handleAgregarNota = () => {
    if (!notaInterna.trim()) return;
    addHistorial(notaInterna.trim());
    setNotaInterna("");
    setMensaje("Nota interna registrada en historial.");
  };

  const requisitosPendientes = selectedExpediente?.requisitos.filter((req) => req.estado !== "VALIDADO").length;

  return (
    <Layout header={3} footer={1} breadcrumbTitle="WOW Tracking" breadcrumbSubtitle="Sistema interno MVP">
      <section className="py-5" style={{ background: "#f7f8fb" }}>
        <div className="container">
          <div className="row align-items-center mb-4">
            <div className="col-lg-8">
              <p className="text-uppercase text-primary fw-semibold mb-2">MVP interno · Roles protegidos</p>
              <h1 className="mb-2">Gestión de Leads, Expedientes y Documentos</h1>
              <p className="text-muted mb-0">
                Flujo completo de WOW Travel: captura de lead, creación de expediente, pagos 70/30, checklist de
                requisitos y cierre con control de roles COMERCIAL, OPERACIONES y GERENCIA.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
              <div className="d-inline-flex align-items-center gap-2">
                <label className="small fw-semibold text-muted mb-0">Rol activo</label>
                <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                  {ROLES.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div className="text-muted small mt-2">
                Tracking versión {APP_VERSION} <span className="text-uppercase">({TRACKING_CODE})</span>
              </div>
            </div>
          </div>

          {mensaje ? (
            <div className="alert alert-info d-flex align-items-center" role="alert">
              <i className="bi bi-info-circle me-2" aria-hidden="true"></i>
              <span>{mensaje}</span>
            </div>
          ) : null}

          <div className="row g-4 mb-4">
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                  <SectionTitle
                    title="Módulo de Leads"
                    subtitle="Captura, calificación y conversión"
                    badge="ETAPA 0"
                  />
                  <form className="mb-3" onSubmit={handleLeadSubmit}>
                    <div className="row g-2">
                      <div className="col-12">
                        <input
                          className="form-control"
                          placeholder="Nombre del cliente"
                          value={leadForm.name}
                          onChange={(e) => setLeadForm((prev) => ({ ...prev, name: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="col-6">
                        <input
                          className="form-control"
                          placeholder="Teléfono / WhatsApp"
                          value={leadForm.phone}
                          onChange={(e) => setLeadForm((prev) => ({ ...prev, phone: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="col-6">
                        <input
                          className="form-control"
                          placeholder="Canal de origen (web/WhatsApp/referido)"
                          value={leadForm.source}
                          onChange={(e) => setLeadForm((prev) => ({ ...prev, source: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <textarea
                          className="form-control"
                          placeholder="Destino deseado o notas"
                          value={leadForm.notes}
                          onChange={(e) => setLeadForm((prev) => ({ ...prev, notes: e.target.value }))}
                        />
                      </div>
                    </div>
                    <button className="btn btn-primary mt-3 w-100" type="submit">
                      Crear lead
                    </button>
                  </form>
                  <div className="border-top pt-3">
                    <p className="fw-semibold mb-2">Leads recientes</p>
                    {leads.length ? (
                      leads.map((lead) => (
                        <div key={lead.id} className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <div className="fw-semibold">{lead.name}</div>
                            <small className="text-muted">
                              {lead.phone} · {lead.source}
                            </small>
                          </div>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleConvertLead(lead)}
                            type="button"
                          >
                            Convertir
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted">No hay leads cargados.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <SectionTitle title="Tablero de Expedientes" subtitle="Pipeline CREADO → CERRADO" badge="Kanban" />
                  {expedientes.map((exp) => (
                    <ExpedienteCard
                      key={exp.id}
                      expediente={exp}
                      onSelect={() => setSelectedExpedienteId(exp.id)}
                      isActive={exp.id === selectedExpedienteId}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              {selectedExpediente ? (
                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-body p-4">
                    <SectionTitle
                      title={`Expediente ${selectedExpediente.codigo}`}
                      subtitle="Datos generales"
                      badge="Vista principal"
                    />
                    <div className="row g-3 mb-3">
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Propietario</label>
                        <input className="form-control" value={selectedExpediente.owner_name} readOnly />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Contacto</label>
                        <input className="form-control" value={`${selectedExpediente.phone}`} readOnly />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label small fw-semibold">Mascota</label>
                        <input
                          className="form-control"
                          value={`${selectedExpediente.mascota_name} · ${selectedExpediente.raza}`}
                          readOnly
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label small fw-semibold">Destino (ciudad)</label>
                        <input className="form-control" value={selectedExpediente.destino} readOnly />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label small fw-semibold">País destino</label>
                        <select
                          className="form-select"
                          value={selectedExpediente.pais || PAISES[0]?.value}
                          onChange={(e) => handlePaisChange(e.target.value)}
                        >
                          {PAISES.map((pais) => (
                            <option key={pais.value} value={pais.value}>
                              {pais.label}
                            </option>
                          ))}
                        </select>
                        <small className="text-muted small">
                          Al cambiar país se recarga el checklist, ajusta el precio y obliga a justificar manualmente.
                        </small>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label small fw-semibold">Fecha probable</label>
                        <input className="form-control" value={selectedExpediente.fecha_probable} readOnly />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label small fw-semibold">Precio del servicio</label>
                        <div className="input-group">
                          <span className="input-group-text">USD</span>
                          <input
                            type="number"
                            min="0"
                            step="10"
                            className="form-control"
                            value={precioDraft}
                            onChange={(e) => setPrecioDraft(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label small fw-semibold">Estado</label>
                        <div className="d-flex align-items-center gap-2">
                          <EstadoPill value={selectedExpediente.estado} />
                          {selectedExpediente.estado !== "CERRADO" && (
                            <select
                              className="form-select"
                              value={selectedExpediente.estado}
                              onChange={(e) => handleEstadoChange(e.target.value)}
                            >
                              {ESTADOS_EXPEDIENTE.filter((est) => est !== selectedExpediente.estado).map((estado) => (
                                <option key={estado}>{estado}</option>
                              ))}
                            </select>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row g-3 mb-3">
                      <div className="col-12">
                        <label className="form-label small fw-semibold">Razón del ajuste</label>
                        <textarea
                          className="form-control"
                          placeholder="Describe por qué modificas el precio"
                          value={razonPrecio}
                          onChange={(e) => setRazonPrecio(e.target.value)}
                          rows={2}
                        />
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mt-2 gap-2">
                          <small className="text-muted">
                            Completar esta razón cada vez que modifiques el precio manualmente.
                          </small>
                          <div className="d-flex flex-wrap gap-2">
                            <button className="btn btn-primary btn-sm" type="button" onClick={handleGuardarPrecio}>
                              Guardar precio
                            </button>
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              type="button"
                              onClick={handleDownloadCotizacion}
                            >
                              Descargar cotización
                            </button>
                          </div>
                        </div>
                        {selectedExpediente.priceReason ? (
                          <small className="text-muted d-block mt-2">
                            Último motivo guardado: {selectedExpediente.priceReason}
                          </small>
                        ) : null}
                      </div>
                    </div>
                    <div className="alert alert-secondary d-flex justify-content-between align-items-center">
                      <div>
                        <strong>Reglas clave:</strong> 70% aprobado → EN_PROCESO. Todos los requisitos VALIDADO →
                        DOCUMENTACION_COMPLETA. Solo GERENCIA → CERRADO.
                      </div>
                      <div className="text-end">
                        <div className="small mb-1">Requisitos pendientes: {requisitosPendientes}</div>
                        <div className="small">Rol activo: {role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

                {selectedExpediente ? (
                  <>
                    <div className="row g-4">
                      <div className="col-lg-6">
                        <div className="card border-0 shadow-sm mb-4">
                          <div className="card-body p-4">
                            <SectionTitle title="Pagos" subtitle="70% y 30% con aprobación de Gerencia" badge="Finanzas" />
                            <div className="mb-3">
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <div>
                                  <div className="fw-semibold">Pago 70%</div>
                                  <small className="text-muted">Registro: Comercial · Aprobación: Gerencia</small>
                                </div>
                                <EstadoPill
                                  value={selectedExpediente.pagos.pago70.aprobado ? "DOCUMENTACION_COMPLETA" : "CREADO"}
                                />
                              </div>
                              <div className="d-flex gap-2">
                                <button className="btn btn-outline-primary btn-sm" onClick={() => handlePago(70)}>
                                  Registrar 70%
                                </button>
                                <button className="btn btn-primary btn-sm" onClick={() => handleAprobarPago(70)}>
                                  Aprobar 70% (Gerencia)
                                </button>
                              </div>
                              <small className="text-muted d-block mt-1">
                                Comprobante: {selectedExpediente.pagos.pago70.comprobante_url || "No cargado"}
                              </small>
                            </div>
                            <div className="border-top pt-3">
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <div>
                                  <div className="fw-semibold">Pago 30%</div>
                                  <small className="text-muted">Registro: Comercial · Validación: Gerencia</small>
                                </div>
                                <EstadoPill
                                  value={selectedExpediente.pagos.pago30.aprobado ? "DOCUMENTACION_COMPLETA" : "EN_PROCESO"}
                                />
                              </div>
                              <div className="d-flex gap-2">
                                <button className="btn btn-outline-secondary btn-sm" onClick={() => handlePago(30)}>
                                  Registrar 30%
                                </button>
                                <button className="btn btn-secondary btn-sm" onClick={() => handleAprobarPago(30)}>
                                  Validar 30% (Gerencia)
                                </button>
                              </div>
                              <small className="text-muted d-block mt-1">
                                Comprobante: {selectedExpediente.pagos.pago30.comprobante_url || "No cargado"}
                              </small>
                            </div>
                          </div>
                        </div>

                        <div className="card border-0 shadow-sm">
                          <div className="card-body p-4">
                            <SectionTitle title="Notas internas e historial" subtitle="Conversaciones internas" badge="Log" />
                            <div className="mb-3">
                              <textarea
                                className="form-control"
                                placeholder="Agregar nota visible para el equipo"
                                value={notaInterna}
                                onChange={(e) => setNotaInterna(e.target.value)}
                              />
                              <button className="btn btn-primary btn-sm mt-2" onClick={handleAgregarNota} type="button">
                                Guardar nota
                              </button>
                            </div>
                            <div className="border-top pt-2" style={{ maxHeight: 220, overflowY: "auto" }}>
                              {selectedExpediente.historial.map((item) => (
                                <div key={item.id} className="d-flex justify-content-between align-items-start mb-2">
                                  <div>
                                    <div className="fw-semibold">{item.usuario}</div>
                                    <small className="text-muted">{item.descripcion}</small>
                                  </div>
                                  <small className="text-muted">{item.fecha}</small>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="card border-0 shadow-sm">
                          <div className="card-body p-4">
                            <SectionTitle
                              title="API y roles requeridos"
                              subtitle="Endpoints protegidos por rol"
                              badge="Backend"
                            />
                            <div className="row g-3">
                              <div className="col-6">
                                <p className="fw-semibold mb-1">Auth y usuarios</p>
                                <ul className="small text-muted mb-0">
                                  <li>POST /auth/login</li>
                                  <li>GET /users/me</li>
                                  <li>Roles: COMERCIAL, OPERACIONES, GERENCIA</li>
                                </ul>
                              </div>
                              <div className="col-6">
                                <p className="fw-semibold mb-1">Leads</p>
                                <ul className="small text-muted mb-0">
                                  <li>POST /leads</li>
                                  <li>GET /leads</li>
                                  <li>POST /leads/:id/convertir</li>
                                </ul>
                              </div>
                              <div className="col-6">
                                <p className="fw-semibold mb-1">Expedientes</p>
                                <ul className="small text-muted mb-0">
                                  <li>POST /expedientes</li>
                                  <li>GET /expedientes/:id</li>
                                  <li>PUT /expedientes/:id/estado</li>
                                </ul>
                              </div>
                              <div className="col-6">
                                <p className="fw-semibold mb-1">Pagos</p>
                                <ul className="small text-muted mb-0">
                                  <li>POST /pagos (70/30)</li>
                                  <li>PUT /pagos/:id/aprobar</li>
                                  <li>PUT /pagos/:id/validar</li>
                                </ul>
                              </div>
                              <div className="col-6">
                                <p className="fw-semibold mb-1">Requisitos</p>
                                <ul className="small text-muted mb-0">
                                  <li>POST /requisitos</li>
                                  <li>PUT /requisitos/:id</li>
                                  <li>POST /requisitos/:id/evidencia</li>
                                </ul>
                              </div>
                              <div className="col-6">
                                <p className="fw-semibold mb-1">Historial</p>
                                <ul className="small text-muted mb-0">
                                  <li>POST /historial</li>
                                  <li>GET /historial/:expediente_id</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card border-0 shadow-sm mt-4">
                      <div className="card-body p-4">
                        <SectionTitle
                          title="Gestión documentaria"
                          subtitle={`Checklist según país: ${getPaisLabel(
                            selectedExpediente.pais || PAISES[0]?.value
                          )}`}
                          badge="Operaciones"
                        />
                        <p className="text-muted small mb-3">
                          Controla todo el checklist en un solo panel y adjunta evidencia directamente desde aquí. El país
                          de destino define los requisitos visibles.
                        </p>
                        <div className="alert alert-light border d-flex justify-content-between align-items-center py-2">
                          <span className="small">
                            País seleccionado: <strong>{getPaisLabel(selectedExpediente.pais || PAISES[0]?.value)}</strong>
                            . Cambia el país en Datos generales para regenerar la lista con sus requisitos oficiales.
                          </span>
                          <span className="badge bg-primary-subtle text-primary">
                            Pendientes: {requisitosPendientes}
                          </span>
                        </div>
                        <div className="table-responsive">
                          <table className="table align-middle">
                            <thead className="table-light">
                              <tr>
                                <th>Requisito</th>
                                <th>Estado</th>
                                <th>Evidencia</th>
                                <th>Fecha</th>
                                <th>Notas</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedExpediente.requisitos.map((req) => (
                                <RequisitoRow key={req.id} requisito={req} onUpdate={handleRequisitoUpdate} />
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2 mt-2">
                          <div className="text-muted small">
                            Estados: PENDIENTE → ENTREGADO → OBSERVADO/VALIDADO.
                          </div>
                          <div className="d-flex gap-2">
                            <button className="btn btn-outline-secondary btn-sm" type="button">
                              Exportar checklist
                            </button>
                            <button className="btn btn-success btn-sm" onClick={handleDocumentacionCompleta}>
                              Marcar documentación completa
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="card border-0 shadow-sm">
                    <div className="card-body">
                      <p className="mb-0">Selecciona o crea un expediente para ver el detalle.</p>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
