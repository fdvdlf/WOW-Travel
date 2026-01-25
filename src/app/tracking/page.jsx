"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Layout } from "@/layouts/Layout";
import { APP_VERSION, TRACKING_CODE } from "@/lib/appVersion";
import paisesRequisitos from "@/data/paises_requisitos.json";

const ROLE = "ADMINISTRADOR";

const ESTADOS_EXPEDIENTE = ["CREADO", "EN_PROCESO", "DOCUMENTACION_COMPLETA", "CERRADO"];

const ESTADOS_REQUISITO = ["PENDIENTE", "ENTREGADO", "OBSERVADO", "VALIDADO"];

const STATUS_ICONS = {
  PENDIENTE: "⏳ Pendiente",
  ENTREGADO: "📤 Entregado",
  OBSERVADO: "⚠️ Observado",
  VALIDADO: "✅ Validado",
};

const CHECKLIST_STATUS_COLORS = {
  VALIDADO: "bg-success",
  OBSERVADO: "bg-warning",
  ENTREGADO: "bg-info",
  PENDIENTE: "bg-secondary",
};

const normalizePais = (value = "") =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^A-Za-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();

const REQUISITO_HEADERS = paisesRequisitos.headers;
const REQUISITOS_POR_PAIS = Object.entries(paisesRequisitos.countries).reduce(
  (acc, [key, data]) => {
    acc[normalizePais(key)] = data;
    return acc;
  },
  {}
);

const COUNTRY_NAMES = Object.keys(REQUISITOS_POR_PAIS);
const COUNTRY_PRETTY = Object.entries(REQUISITOS_POR_PAIS).reduce((acc, [key, data]) => {
  acc[key] = data.nombre;
  return acc;
}, {});

const DEFAULT_COUNTRY = normalizePais("CANADA");

const formatCountryLabel = (value) =>
  value
    .toLowerCase()
    .split(" ")
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(" ");

const PAISES = COUNTRY_NAMES.map((name) => ({
  value: name,
  label: COUNTRY_PRETTY[name] || formatCountryLabel(name),
}));
const REQUISITOS_BASE = [
  ...REQUISITO_HEADERS.map((nombre) => ({ nombre, obligatorio: true })),
  { nombre: "Ticket de vuelo (opcional)", obligatorio: false },
];

const DESTINOS_RAW = {
  "ALEMANIA": ["Frankfurt (FRA)", "Munich (MUC)", "Berlin (BER)"],
  "ARGENTINA": ["Buenos Aires EZE (EZE)", "Cordoba (COR)"],
  "AUSTRALIA": ["Sydney (SYD)", "Melbourne (MEL)", "Brisbane (BNE)"],
  "AUSTRIA": ["Vienna (VIE)"],
  "BELGICA": ["Brussels (BRU)"],
  "BOLIVIA": ["Santa Cruz (VVI)"],
  "BRASIL": ["Sao Paulo GRU (GRU)", "Rio de Janeiro GIG (GIG)"],
  "BULGARIA": ["Sofia (SOF)"],
  "CANADA": ["Toronto (YYZ)", "Vancouver (YVR)", "Montreal (YUL)"],
  "CHILE": ["Santiago (SCL)"],
  "CHINA": ["Beijing (PEK)", "Shanghai (PVG)"],
  "CHIPRE": ["Larnaca (LCA)"],
  "COLOMBIA": ["Bogota (BOG)", "Medellin (MDE)"],
  "COREA DEL SUR": ["Seoul Incheon (ICN)"],
  "COSTA RICA": ["San Jose (SJO)"],
  "CROACIA": ["Zagreb (ZAG)"],
  "CUBA": ["La Habana (HAV)"],
  "DINAMARCA": ["Copenhagen (CPH)"],
  "ECUADOR": ["Quito (UIO)", "Guayaquil (GYE)"],
  "EEUU": ["Miami (MIA)", "New York JFK (JFK)", "Los Angeles (LAX)"],
  "EGIPTO": ["Cairo (CAI)"],
  "EL SALVADOR": ["San Salvador (SAL)"],
  "EMIRATOS ARABES UNIDOS": ["Dubai (DXB)", "Abu Dhabi (AUH)", "Sharjah (SHJ)"],
  "ESLOVAQUIA": ["Bratislava (BTS)"],
  "ESLOVENIA": ["Ljubljana (LJU)"],
  "ESPANA": ["Madrid (MAD)", "Barcelona (BCN)"],
  "ESTONIA": ["Tallinn (TLL)"],
  "FILIPINAS": ["Manila (MNL)"],
  "FINLANDIA": ["Helsinki (HEL)"],
  "FRANCIA": ["Paris CDG (CDG)"],
  "GRECIA": ["Athens (ATH)"],
  "GUATEMALA": ["Guatemala City (GUA)"],
  "HONDURAS": ["Tegucigalpa (TGU)"],
  "HUNGRIA": ["Budapest (BUD)"],
  "INDIA": ["Delhi (DEL)", "Mumbai (BOM)"],
  "INDONESIA": ["Jakarta (CGK)", "Bali (DPS)"],
  "IRLANDA": ["Dublin (DUB)"],
  "ISRAEL": ["Tel Aviv (TLV)"],
  "ITALIA": ["Rome FCO (FCO)", "Milan (MXP)"],
  "JAPON": ["Tokyo Narita (NRT)", "Tokyo Haneda (HND)"],
  "LETONIA": ["Riga (RIX)"],
  "LITUANIA": ["Vilnius (VNO)"],
  "LUXEMBURGO": ["Luxembourg (LUX)"],
  "MALASIA": ["Kuala Lumpur (KUL)"],
  "MALTA": ["Malta (MLA)"],
  "MARRUECOS": ["Casablanca (CMN)", "Marrakech (RAK)"],
  "MEXICO": ["Mexico City (MEX)", "Cancun (CUN)"],
  "NICARAGUA": ["Managua (MGA)"],
  "NORUEGA": ["Oslo (OSL)"],
  "PAISES BAJOS": ["Amsterdam (AMS)", "Eindhoven (EIN)", "Aruba (AUA)"],
  "PANAMA": ["Panama Tocumen (PTY)"],
  "PARAGUAY": ["Asuncion (ASU)"],
  "POLONIA": ["Warsaw (WAW)"],
  "PORTUGAL": ["Lisbon (LIS)", "Porto (OPO)"],
  "QATAR": ["Doha (DOH)"],
  "REINO DE ARABIA SAUDITA": ["Riyadh (RUH)", "Jeddah (JED)"],
  "REINO UNIDO": ["London Heathrow (LHR)", "Gatwick (LGW)", "Manchester (MAN)", "Edinburgh (EDI)", "Glasgow (GLA)", "Cardiff (CWL)", "Belfast (BFS)"],
  "REPUBLICA CHECA": ["Prague (PRG)"],
  "REPUBLICA DOMINICANA": ["Santo Domingo (SDQ)", "Punta Cana (PUJ)"],
  "RUMANIA": ["Bucharest (OTP)"],
  "RUSIA": ["Moscow SVO (SVO)"],
  "SERBIA": ["Belgrade (BEG)"],
  "SUDAFRICA": ["Johannesburg (JNB)", "Cape Town (CPT)"],
  "SUECIA": ["Stockholm (ARN)"],
  "SUIZA": ["Zurich (ZRH)"],
  "TAILANDIA": ["Bangkok (BKK)"],
  "TAIWAN": ["Taipei Taoyuan (TPE)"],
  "TRINIDAD Y TOBAGO": ["Port of Spain (POS)"],
  "URUGUAY": ["Montevideo (MVD)"],
  "VENEZUELA": ["Caracas (CCS)"],
  "VIETNAM": ["Ho Chi Minh (SGN)", "Hanoi (HAN)"],
  "ZAMBIA": ["Lusaka (LUN)"],
};

const DESTINOS_POR_PAIS = Object.entries(DESTINOS_RAW).reduce((acc, [key, value]) => {
  acc[normalizePais(key)] = value;
  return acc;
}, {});

const DESTINOS_ALIASES = {
  "ESTADOS UNIDOS": normalizePais("EEUU"),
  "PAISES BAJOS HOLANDA": normalizePais("PAISES BAJOS"),
};

const buildRequisitosPorPais = (pais, seed = {}) => {
  const paisKey = normalizePais(pais || DEFAULT_COUNTRY);
  const data = REQUISITOS_POR_PAIS[paisKey];
  const source =
    data?.requisitos?.map((flag, idx) => ({
      nombre: REQUISITO_HEADERS[idx] || `Requisito ${idx + 1}`,
      obligatorio: Boolean(flag),
    })) || REQUISITOS_BASE;

  const requisitos = source.map((req, index) => {
    const baseReq =
      typeof req === "string"
        ? { nombre: req, obligatorio: !req.toLowerCase().includes("opcional") }
        : req;
    return {
      id: `req-${paisKey}-${index + 1}`,
      nombre: baseReq.nombre,
      obligatorio: baseReq.obligatorio !== false,
      estado: "PENDIENTE",
      evidencia_url: "",
      fecha: "",
      notas: "",
      ...seed[index],
    };
  });

  return { requisitos, nota: data?.nota || "" };
};

const getPaisLabel = (value) => COUNTRY_PRETTY[normalizePais(value)] || formatCountryLabel(value);
const getDestinosPorPais = (pais) =>
  DESTINOS_POR_PAIS[DESTINOS_ALIASES[normalizePais(pais)] || normalizePais(pais)] ||
  ["Aeropuerto principal", "Destino por definir"];

const TAB_DEFINITIONS = [
  { key: "datos", label: "Datos generales" },
  { key: "pagos", label: "Pagos 70/30" },
  { key: "checklist", label: "Checklist documentario" },
  { key: "notas", label: "Notas / Historial" },
  { key: "archivos", label: "Archivos" },
];

const BASE_PRICE = 1500;
const PRICE_STEP = 30;
const COUNTRY_PRICING = COUNTRY_NAMES.reduce((acc, name, index) => {
  acc[name] = BASE_PRICE + PRICE_STEP * (index % 10);
  return acc;
}, {});

const getPriceForCountry = (pais) => COUNTRY_PRICING[normalizePais(pais)] ?? BASE_PRICE;
const getPriceReason = (pais) => `Precio estandar ${getPaisLabel(pais)}`;

const LEAD_NAMES = [
  "Carolina Vega",
  "Marco Díaz",
  "Lucía Rojas",
  "Santiago Paredes",
  "Valeria Torres",
  "José Salas",
  "Ana Navarro",
  "Diego Ruiz",
  "Fernanda Salazar",
  "Diego Castillo",
];
const LEAD_SOURCES = ["Whatsapp", "Meta Ads", "Web", "Referido", "Email", "Evento"];
const LEAD_SPECIES = ["Perro", "Gato"];
const LEAD_STATUSES = ["NUEVO", "CONTACTADO", "CONVERTIDO"];
const LEAD_BREEDS = ["Border Collie", "Labrador", "Golden", "Sphynx", "Persa", "Bulldog", "Beagle", "Husky"];

const SAMPLE_LEADS = Array.from({ length: 50 }, (_, index) => {
  const name = LEAD_NAMES[index % LEAD_NAMES.length];
  const species = LEAD_SPECIES[index % LEAD_SPECIES.length];
  const notes = species === "Perro" ? "Viaje con crate especial" : "Requiere receta veterinaria";
  return {
    id: `lead-${index + 1}`,
    name,
    phone: `+51991${String(100000 + index).slice(-6)}`,
    source: LEAD_SOURCES[index % LEAD_SOURCES.length],
    notes,
    created_at: "2024-06-01",
    species,
    breed: LEAD_BREEDS[index % LEAD_BREEDS.length],
    age: `${2 + (index % 7)} años`,
    weight: `${6 + (index % 15)} kg`,
    status: LEAD_STATUSES[index % LEAD_STATUSES.length],
  };
});

const sampleChecklist = buildRequisitosPorPais(DEFAULT_COUNTRY, {
  0: { estado: "VALIDADO", evidencia_url: "archivo.pdf", fecha: "2024-06-10" },
  1: { estado: "VALIDADO", evidencia_url: "archivo.pdf", fecha: "2024-06-10" },
  2: { estado: "OBSERVADO", notas: "Repetir examen, fecha vencida" },
});

const SAMPLE_EXPEDIENTES = [
  {
    id: "exp-1",
    codigo: "EXP-001",
    lead_id: "lead-1",
    owner_name: "Carolina Vega",
    phone: "+51 999 888 777",
    mascota_name: "Kira",
    raza: "Border Collie",
    destino: getDestinosPorPais(DEFAULT_COUNTRY)[0] || "Destino por definir",
    pais: DEFAULT_COUNTRY,
    fecha_probable: "2024-09-15",
    tipo_mascota: "Perro",
    edad: "3 anos",
    peso: "16.3 kg",
    precio: getPriceForCountry(DEFAULT_COUNTRY),
    priceReason: getPriceReason(DEFAULT_COUNTRY),
    estado: "EN_PROCESO",
    responsable: { comercial: "Fernando", operaciones: "Gabriel" },
    pagos: {
      pago70: { tipo: 70, comprobante_url: "voucher_70.pdf", fecha: "2024-06-02", aprobado: true },
      pago30: { tipo: 30, comprobante_url: "", fecha: "", aprobado: false },
    },
    requisitos: sampleChecklist.requisitos,
    nota_requisitos: sampleChecklist.nota,
    historial: [
      { id: "h1", usuario: "Gabriel", fecha: "2024-06-05", descripcion: "Se cargan vacunas y microchip." },
      { id: "h2", usuario: "Fernando", fecha: "2024-06-08", descripcion: "Pago 70% aprobado por Gerencia." },
    ],
  },
];


function SectionTitle({ title, subtitle, badge }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <div>
        <h3 className="h5 mb-1">{title}</h3>
        {subtitle ? <p className="text-muted small mb-0">{subtitle}</p> : null}
      </div>
      {badge ? <span className="badge bg-secondary-subtle text-secondary">{badge}</span> : null}
    </div>
  );
}

function EstadoPill({ value }) {
  const colors = {
    CREADO: "bg-primary-subtle text-primary border",
    EN_PROCESO: "bg-warning-subtle text-warning border",
    VALIDADO: "bg-success-subtle text-success border",
    OBSERVADO: "bg-warning-subtle text-warning border",
    DOCUMENTACION_COMPLETA: "bg-purple-subtle text-purple border",
    CERRADO: "bg-secondary-subtle text-secondary border",
  };
  return (
    <span className={`badge rounded-pill px-3 py-2 fw-semibold ${colors[value] || "bg-light text-muted"}`}>
      {value}
    </span>
  );
}

function CountryFlag({ pais }) {
  const label = getPaisLabel(pais || DEFAULT_COUNTRY);
  return (
    <span className="d-inline-flex align-items-center gap-1">
      <i className="bi bi-flag-fill text-danger" aria-hidden="true"></i>
      <span>{label}</span>
    </span>
  );
}

function RequisitoRow({ requisito, onUpdate }) {
  const fileInputRef = useRef(null);
  const [expanded, setExpanded] = useState(false);

  const handleDownload = () => {
    if (!requisito.evidencia_url) return;
    window.open(requisito.evidencia_url, "_blank");
  };

  return (
    <>
      <tr className={`align-middle ${expanded ? "table-active" : ""}`}>
        <td className="fw-semibold text-dark">{requisito.nombre}</td>
        <td>
          <div className="d-flex align-items-center gap-2">
            <span className="small">{STATUS_ICONS[requisito.estado] || requisito.estado}</span>
          </div>
        </td>
        <td className="text-end">
          <button
            className={`btn btn-sm rounded-circle ${expanded ? "btn-secondary" : "btn-primary-subtle text-primary"}`}
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            aria-label={expanded ? "Contraer" : "Expandir"}
            style={{ width: "32px", height: "32px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
          >
            <i className={`bi ${expanded ? "bi-dash" : "bi-plus-lg"}`} aria-hidden="true"></i>
          </button>
        </td>
      </tr>
      {expanded ? (
        <tr>
          <td colSpan="3" className="p-0 border-0">
            <div className="p-3 bg-light border-bottom">
              <div className="card border-0 shadow-sm rounded-3">
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-6 col-lg-3">
                      <label className="form-label small text-muted fw-bold">Estado</label>
                      <select
                        className="form-select form-select-sm"
                        value={requisito.estado}
                        onChange={(e) => onUpdate({ ...requisito, estado: e.target.value })}
                      >
                        {ESTADOS_REQUISITO.map((estado) => (
                          <option key={estado} value={estado}>
                            {STATUS_ICONS[estado] || estado}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6 col-lg-3">
                      <label className="form-label small text-muted fw-bold">Fecha</label>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        value={requisito.fecha}
                        onChange={(e) => onUpdate({ ...requisito, fecha: e.target.value })}
                      />
                    </div>
                    <div className="col-md-12 col-lg-6">
                      <label className="form-label small text-muted fw-bold">Evidencia</label>
                      <div className="input-group input-group-sm">
                        <input
                          className="form-control"
                          placeholder="URL o nombre de archivo"
                          value={requisito.evidencia_url}
                          onChange={(e) => onUpdate({ ...requisito, evidencia_url: e.target.value })}
                        />
                        <input
                          ref={fileInputRef}
                          type="file"
                          className="d-none"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              onUpdate({ ...requisito, evidencia_url: file.name });
                            }
                          }}
                        />
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <i className="bi bi-upload me-1"></i> Cargar
                        </button>
                        {requisito.evidencia_url && (
                          <button
                            className="btn btn-outline-primary"
                            type="button"
                            onClick={handleDownload}
                            title="Descargar evidencia"
                          >
                            <i className="bi bi-download"></i>
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="col-12">
                      <label className="form-label small text-muted fw-bold">Notas</label>
                      <textarea
                        className="form-control form-control-sm"
                        placeholder="Notas internas..."
                        rows="2"
                        value={requisito.notas}
                        onChange={(e) => onUpdate({ ...requisito, notas: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      ) : null}
    </>
  );
}
export default function TrackingPage() {
  const role = ROLE;
  const [leads, setLeads] = useState(SAMPLE_LEADS);
  const [expedientes, setExpedientes] = useState(SAMPLE_EXPEDIENTES);
  const [selectedExpedienteId, setSelectedExpedienteId] = useState(null);
  const [selectedLeadId, setSelectedLeadId] = useState(SAMPLE_LEADS[0]?.id);
  const [leadForm, setLeadForm] = useState({
    name: "",
    phone: "",
    source: "",
    notes: "",
    species: "Perro",
    breed: "",
    age: "",
    weight: "",
  });
  const [notaInterna, setNotaInterna] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [precioDraft, setPrecioDraft] = useState("0");
  const [razonPrecio, setRazonPrecio] = useState("");
  const [currentTab, setCurrentTab] = useState("pagos");
  const [checklistFilter, setChecklistFilter] = useState("TODOS");
  const [notesExpanded, setNotesExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sourceFilter, setSourceFilter] = useState("TODOS");
  const [speciesFilter, setSpeciesFilter] = useState("TODOS");
  const [statusFilter, setStatusFilter] = useState("TODOS");
  const importRef = useRef(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const isSearching = searchTerm.trim().length > 0;

  const selectedExpediente = useMemo(
    () => expedientes.find((exp) => exp.id === selectedExpedienteId),
    [expedientes, selectedExpedienteId]
  );
  const selectedLead = useMemo(() => leads.find((lead) => lead.id === selectedLeadId), [leads, selectedLeadId]);

  useEffect(() => {
    if (!selectedExpediente) return;
    setPrecioDraft(String(selectedExpediente.precio ?? 0));
    setRazonPrecio(selectedExpediente.priceReason || "");
  }, [selectedExpediente, selectedExpediente?.id, selectedExpediente?.precio, selectedExpediente?.priceReason]);

  useEffect(() => {
    setChecklistFilter("TODOS");
    setNotesExpanded(false);
  }, [selectedExpediente, selectedExpediente?.id]);

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
    setLeadForm({ name: "", phone: "", source: "", notes: "", species: "Perro", breed: "", age: "", weight: "" });
    setMensaje("Lead creado y listo para calificación.");
    setShowLeadForm(false);
  };

  const handleConvertLead = (lead) => {
    if (role !== ROLE) {
      setMensaje("Solo el rol administrador convierte leads a expedientes.");
      return;
    }
    const paisInicial = DEFAULT_COUNTRY;
    const destinoInicial = getDestinosPorPais(paisInicial)[0] || "Destino por definir";
    const checklistInicial = buildRequisitosPorPais(paisInicial);
    const nuevo = {
      id: `exp-${Date.now()}`,
      codigo: `EXP-${String(expedientes.length + 1).padStart(3, "0")}`,
      lead_id: lead.id,
      owner_name: lead.name,
      phone: lead.phone,
      mascota_name: lead.name.includes(" ") ? lead.name.split(" ")[0] : "Mascota",
      raza: lead.breed || "Por definir",
      tipo_mascota: lead.species || "Perro",
      edad: lead.age || "",
      peso: lead.weight || "",
      destino: lead.notes || destinoInicial,
      pais: paisInicial,
      fecha_probable: "",
      precio: getPriceForCountry(paisInicial),
      priceReason: getPriceReason(paisInicial),
      estado: "CREADO",
      pagos: {
        pago70: { tipo: 70, comprobante_url: "", fecha: "", aprobado: false },
        pago30: { tipo: 30, comprobante_url: "", fecha: "", aprobado: false },
      },
      requisitos: checklistInicial.requisitos,
      nota_requisitos: checklistInicial.nota,
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
    setCurrentTab("datos");
    setSelectedLeadId(lead.id);
    setMensaje("Expediente creado desde el lead.");
  };

  const handlePaisChange = (paisValue) => {
  if (!selectedExpediente) return;
  const paisNormalizado = normalizePais(paisValue);
  const destinos = getDestinosPorPais(paisNormalizado);
  const checklist = buildRequisitosPorPais(paisNormalizado);
  updateExpediente(selectedExpediente.id, (exp) => ({
    ...exp,
    pais: paisNormalizado,
    destino: destinos.includes(exp.destino) ? exp.destino : destinos[0] || "Destino por definir",
    requisitos: checklist.requisitos,
    nota_requisitos: checklist.nota,
    precio: getPriceForCountry(paisNormalizado),
    priceReason: getPriceReason(paisNormalizado),
  }));
  addHistorial(`Pais actualizado a ${getPaisLabel(paisNormalizado)} y checklist regenerado.`);
  setMensaje("Checklist y precio estandar actualizados.");
  setPrecioDraft(String(getPriceForCountry(paisNormalizado)));
  setRazonPrecio(getPriceReason(paisNormalizado));
};

const handleDestinoChange = (destino) => {
    if (!selectedExpediente) return;
    updateExpediente(selectedExpediente.id, (exp) => ({ ...exp, destino }));
    addHistorial(`Destino actualizado a ${destino}.`);
  };

  const handleTipoMascotaChange = (tipo) => {
    if (!selectedExpediente) return;
    updateExpediente(selectedExpediente.id, (exp) => ({ ...exp, tipo_mascota: tipo }));
    addHistorial(`Tipo de mascota actualizado a ${tipo}.`);
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
  };

  const handleDownloadCotizacion = () => {
    if (!selectedExpediente) return;
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
    if (role !== "COMERCIAL") {
      setMensaje("Solo Comercial registra pagos.");
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
        },
      },
    }));
    addHistorial(`Pago ${tipo}% registrado.`);
  };

  const handleAprobarPago = (tipo) => {
    if (!selectedExpediente) return;
    if (role !== "GERENCIA") {
      setMensaje("Solo Gerencia aprueba pagos.");
      return;
    }
    updateExpediente(selectedExpediente.id, (exp) => ({
      ...exp,
      pagos: {
        ...exp.pagos,
        [`pago${tipo}`]: { ...exp.pagos[`pago${tipo}`], aprobado: true },
      },
    }));
    addHistorial(`Gerencia aprueba pago ${tipo}%.`);
  };

  const handleRequisitoUpdate = (reqActualizado) => {
    if (!selectedExpediente) return;
    updateExpediente(selectedExpediente.id, (exp) => ({
      ...exp,
      requisitos: exp.requisitos.map((req) => (req.id === reqActualizado.id ? reqActualizado : req)),
    }));
  };

  const handleDocumentacionCompleta = () => {
  if (!selectedExpediente) return;
  if (role !== "OPERACIONES") {
    setMensaje("Solo Operaciones marca documentacion completa.");
    return;
  }
  const pendientesObligatorios = selectedExpediente.requisitos.some(
    (req) => req.obligatorio !== false && req.estado !== "VALIDADO"
  );
  if (pendientesObligatorios) {
    setMensaje("Todos los requisitos obligatorios deben estar validados.");
    return;
  }
  updateExpediente(selectedExpediente.id, (exp) => ({ ...exp, estado: "DOCUMENTACION_COMPLETA" }));
  addHistorial("Operaciones marca documentacion completa.");
  setMensaje("Documentacion completa. Listo para cierre.");
};

const handleEstadoChange = (nextEstado) => {
    if (!selectedExpediente) return;
    updateExpediente(selectedExpediente.id, (exp) => ({ ...exp, estado: nextEstado }));
    addHistorial(`Estado cambiado a ${nextEstado}.`);
  };

  const handleAgregarNota = () => {
    if (!notaInterna.trim()) return;
    addHistorial(notaInterna.trim());
    setNotaInterna("");
    setMensaje("Nota interna registrada.");
  };

  const handleImportClick = () => {
    importRef.current?.click();
  };

  const handleImportLeads = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (Array.isArray(parsed)) {
          const imported = parsed.map((item, index) => ({
            id: `imported-${Date.now()}-${index}`,
            name: item.name || `Lead importado ${index + 1}`,
            phone: item.phone || "",
            source: item.source || "Importado",
            notes: item.notes || "",
            species: item.species || "Perro",
            breed: item.breed || "Por definir",
            age: item.age || "",
            weight: item.weight || "",
            created_at: new Date().toISOString().slice(0, 10),
          }));
          setLeads((prev) => [...imported, ...prev]);
          setMensaje(`Se importaron ${imported.length} leads.`);
        } else {
          setMensaje("El archivo debe contener un arreglo JSON de leads.");
        }
      } catch (error) {
        setMensaje("No se pudo parsear el archivo.");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  };

  const requisitosPendientes =
    selectedExpediente?.requisitos.filter((req) => req.obligatorio !== false && req.estado !== "VALIDADO").length ?? 0;
  const requiredRequisitos = (selectedExpediente?.requisitos ?? []).filter((req) => req.obligatorio !== false);
  const optionalRequisitos = (selectedExpediente?.requisitos ?? []).filter((req) => req.obligatorio === false);
  const filterRequisitos = (items) =>
    checklistFilter === "TODOS" ? items : items.filter((req) => req.estado === checklistFilter);
  const filteredRequired = filterRequisitos(requiredRequisitos);
  const filteredOptional = filterRequisitos(optionalRequisitos);
  const completedCount = selectedExpediente?.requisitos.filter((req) => req.estado === "VALIDADO").length ?? 0;
  const totalRequisitos = selectedExpediente?.requisitos.length ?? 0;
  const checklistProgressText = `${completedCount}/${totalRequisitos} completados`;


  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm);
      const matchesSource = sourceFilter === "TODOS" || lead.source === sourceFilter;
      const matchesSpecies = speciesFilter === "TODOS" || lead.species === speciesFilter;
      const matchesStatus = statusFilter === "TODOS" || lead.status === statusFilter;
      return matchesSearch && matchesSource && matchesSpecies && matchesStatus;
    });
  }, [leads, searchTerm, sourceFilter, speciesFilter, statusFilter]);

  const displayedLeads = useMemo(() => {
    return [...filteredLeads].sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  }, [filteredLeads]);
  const activeExpedientes = useMemo(() => [...expedientes].slice(0, 5), [expedientes]);

  const checklistStatusCounts = (selectedExpediente?.requisitos ?? []).reduce((acc, req) => {
    acc[req.estado] = (acc[req.estado] || 0) + 1;
    return acc;
  }, {});
  const totalChecklist = selectedExpediente?.requisitos.length ?? 0;
  const progressSegments = Object.entries(checklistStatusCounts).map(([estado, valor]) => ({
    estado,
    valor,
    porcentaje: totalChecklist ? (valor / totalChecklist) * 100 : 0,
  }));
  const whatsappNumber = (selectedExpediente?.phone || selectedLead?.phone || "").replace(/\D/g, "");
  const whatsappHref = whatsappNumber ? `https://wa.me/${whatsappNumber}` : "#";
  return (
    <Layout header={3} footer={1} breadcrumbTitle="WOW Tracking" breadcrumbSubtitle="Sistema interno MVP">
      <style>{`
        .tracking-page-wrapper .btn {
          background: initial !important;
          border-radius: 0.375rem !important;
          padding: 0.375rem 0.75rem !important;
          font-size: 0.875rem !important;
          font-weight: 500 !important;
          line-height: 1.5 !important;
          border: 1px solid transparent !important;
          text-transform: none !important;
          letter-spacing: normal !important;
          position: static !important;
          overflow: visible !important;
          box-shadow: none !important;
        }
        .tracking-page-wrapper .btn::before {
          display: none !important;
        }
        .tracking-page-wrapper .btn-primary {
          background-color: #894b8d !important;
          color: white !important;
          border-color: #894b8d !important;
        }
        .tracking-page-wrapper .btn-primary:hover {
          background-color: #6d3b70 !important;
          border-color: #6d3b70 !important;
        }
        .tracking-page-wrapper .btn-outline-primary {
          color: #894b8d !important;
          border-color: #894b8d !important;
          background-color: transparent !important;
        }
        .tracking-page-wrapper .btn-outline-primary:hover {
          color: white !important;
          background-color: #894b8d !important;
        }
        .tracking-page-wrapper .btn-outline-secondary {
          color: #6c757d !important;
          border-color: #6c757d !important;
          background-color: transparent !important;
        }
        .tracking-page-wrapper .btn-outline-secondary:hover {
          color: white !important;
          background-color: #6c757d !important;
        }
        .tracking-page-wrapper .btn-link {
          background: transparent !important;
          border: none !important;
          padding: 0 !important;
          color: #894b8d !important;
          text-decoration: none !important;
          width: auto !important;
          height: auto !important;
        }
        .tracking-page-wrapper .btn-link:hover {
          text-decoration: underline !important;
          color: #6d3b70 !important;
        }
        .tracking-page-wrapper .btn-sm {
          padding: 0.25rem 0.5rem !important;
          font-size: 0.75rem !important;
        }
        .tracking-page-wrapper .btn-lg {
          padding: 0.5rem 1rem !important;
          font-size: 1.1rem !important;
        }
        .tracking-page-wrapper .rounded-circle {
          border-radius: 50% !important;
          padding: 0 !important;
          width: 32px !important;
          height: 32px !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        .tracking-page-wrapper .form-control {
          border-radius: 0.375rem !important;
          padding: 0.375rem 0.75rem !important;
          font-size: 0.875rem !important;
          border-color: #dee2e6 !important;
        }
        .tracking-page-wrapper .form-select {
          border-radius: 0.375rem !important;
          padding: 0.375rem 2.25rem 0.375rem 0.75rem !important; /* Extra padding-right for arrow */
          font-size: 0.875rem !important;
          border-color: #dee2e6 !important;
          background-position: right 0.75rem center !important;
        }
        .tracking-page-wrapper .input-group-text {
          border-radius: 0.375rem !important;
        }
        .tracking-page-wrapper .card {
          border: 1px solid #e9ecef !important;
          box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
          border-radius: 0.5rem !important;
        }
        .tracking-page-wrapper .nav-pills .nav-link.active {
          background-color: #894b8d !important;
          color: white !important;
        }
        .tracking-page-wrapper .nav-pills .nav-link {
          color: #495057 !important;
          border-radius: 0.375rem !important;
        }
        .tracking-page-wrapper .list-group-item {
          border-color: #e9ecef !important;
        }
        .tracking-page-wrapper .list-group-item.bg-primary-subtle {
          background-color: #f3e5f5 !important;
          border-color: #e1bee7 !important;
        }
        .tracking-page-wrapper .bg-purple-subtle {
          background-color: #e0cffc !important;
          border-color: #d6bcfa !important;
        }
        .tracking-page-wrapper .text-purple {
          color: #6f42c1 !important;
        }
        .tracking-page-wrapper .text-primary {
          color: #894b8d !important;
        }
        .tracking-page-wrapper .btn-primary-subtle {
          background-color: #f3e5f5 !important;
          color: #894b8d !important;
          border: none !important;
        }
        .tracking-page-wrapper .btn-primary-subtle:hover {
          background-color: #e1bee7 !important;
          color: #6d3b70 !important;
        }
        .tracking-page-wrapper .btn-secondary {
          background-color: #6c757d !important;
          color: white !important;
          border-color: #6c757d !important;
        }
        .tracking-page-wrapper .btn-secondary:hover {
          background-color: #5a6268 !important;
          border-color: #545b62 !important;
        }
        .tracking-page-wrapper .btn-whatsapp {
          background-color: #25D366 !important;
          color: white !important;
          border-color: #25D366 !important;
        }
        .tracking-page-wrapper .btn-whatsapp:hover {
          background-color: #128C7E !important;
          border-color: #128C7E !important;
        }
        .tracking-page-wrapper .glass-card {
          background: rgba(255, 255, 255, 0.7) !important;
          backdrop-filter: blur(10px) !important;
          -webkit-backdrop-filter: blur(10px) !important;
          border: 1px solid rgba(255, 255, 255, 0.5) !important;
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1) !important;
          border-radius: 1rem !important;
        }
      `}</style>
      <section className="py-5 bg-light tracking-page-wrapper">
        <div className="container">
          <div className="card glass-card mb-4">
            <div className="card-body d-flex flex-wrap justify-content-between align-items-start gap-3">
              <div>
                <p className="text-uppercase text-primary fw-semibold mb-2">Panel interno · WOW Tracking</p>
                <h1 className="mb-1">
                  Expediente {selectedExpediente ? selectedExpediente.codigo : "sin seleccionar"}
                </h1>
                <div className="d-flex flex-wrap align-items-center gap-2 text-muted small">
                  <EstadoPill value={selectedExpediente?.estado || "CREADO"} />
                  <CountryFlag pais={selectedExpediente?.pais || DEFAULT_COUNTRY} />
                  <span>Rol activo: {role}</span>
                </div>
              </div>
              <div className="text-end">
                <div className="text-muted small">Versión {APP_VERSION}</div>
                <div className="text-uppercase text-muted fs-7">{TRACKING_CODE}</div>
              </div>
            </div>
          </div>

          {mensaje ? (
            <div className="alert alert-info d-flex align-items-center" role="alert">
              <i className="bi bi-info-circle me-2" aria-hidden="true"></i>
              <span>{mensaje}</span>
            </div>
          ) : null}

          <div className="row g-4">
            <div className="col-12">
              <div className="card glass-card w-100">
                <div className="card-body">
                  <SectionTitle title="Leads y búsqueda" badge="ETAPA 0" />
                  <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between">
                    <div className="d-flex flex-wrap gap-2 align-items-center flex-grow-1">
                      <div className="input-group flex-grow-1 min-w-0">
                        <span className="input-group-text">Buscar</span>
                        <input className="form-control" placeholder="Nombre, teléfono o nota" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                      </div>
                      <select className="form-select w-auto" value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)}>
                        <option value="TODOS">Todas las fuentes</option>
                        {LEAD_SOURCES.map((source) => (
                          <option key={source} value={source}>{source}</option>
                        ))}
                      </select>
                      <select className="form-select w-auto" value={speciesFilter} onChange={(e) => setSpeciesFilter(e.target.value)}>
                        <option value="TODOS">Todas las especies</option>
                        {LEAD_SPECIES.map((species) => (
                          <option key={species} value={species}>{species}</option>
                        ))}
                      </select>
                      <select className="form-select w-auto" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="TODOS">Todos los estados</option>
                        {LEAD_STATUSES.map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>
                    <div className="d-flex gap-2">
                      <button className="btn btn-primary btn-lg" type="button" onClick={() => setShowLeadForm((prev) => !prev)}>{showLeadForm ? "Cerrar" : "+ Nuevo lead"}</button>
                      <button className="btn btn-primary btn-lg" type="button" onClick={handleImportClick}>Importar</button>
                      <input ref={importRef} type="file" accept="application/json" className="d-none" onChange={handleImportLeads} />
                    </div>
                  </div>
                  {showLeadForm ? (
                    <form className="mt-3 border rounded-2 p-3 bg-light" onSubmit={handleLeadSubmit}>
                      <div className="row g-2">
                        <div className="col-md-6"><input className="form-control" placeholder="Nombre del cliente" value={leadForm.name} onChange={(e) => setLeadForm((prev) => ({ ...prev, name: e.target.value }))} required /></div>
                        <div className="col-md-6"><input className="form-control" placeholder="Tel?fono / WhatsApp" value={leadForm.phone} onChange={(e) => setLeadForm((prev) => ({ ...prev, phone: e.target.value }))} required /></div>
                        <div className="col-md-6"><select className="form-select" value={leadForm.source} onChange={(e) => setLeadForm((prev) => ({ ...prev, source: e.target.value }))} required><option value="">Canal de origen</option>{LEAD_SOURCES.map((source) => (<option key={source} value={source}>{source}</option>))}</select></div>
                        <div className="col-md-6"><select className="form-select" value={leadForm.species} onChange={(e) => setLeadForm((prev) => ({ ...prev, species: e.target.value }))}>{LEAD_SPECIES.map((species) => (<option key={species} value={species}>{species}</option>))}</select></div>
                        <div className="col-md-6"><input className="form-control" placeholder="Raza (opcional)" value={leadForm.breed} onChange={(e) => setLeadForm((prev) => ({ ...prev, breed: e.target.value }))} /></div>
                        <div className="col-md-6"><input className="form-control" placeholder="Edad" value={leadForm.age} onChange={(e) => setLeadForm((prev) => ({ ...prev, age: e.target.value }))} /></div>
                        <div className="col-md-6"><input className="form-control" placeholder="Peso" value={leadForm.weight} onChange={(e) => setLeadForm((prev) => ({ ...prev, weight: e.target.value }))} /></div>
                        <div className="col-12"><textarea className="form-control" placeholder="Notas o destino" value={leadForm.notes} onChange={(e) => setLeadForm((prev) => ({ ...prev, notes: e.target.value }))} /></div>
                      </div>
                      <div className="mt-3 text-end"><button className="btn btn-primary btn-sm" type="submit">Guardar lead</button></div>
                    </form>
                  ) : null}
                  <div className="mt-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="fw-semibold">{isSearching ? "Resultados de búsqueda" : "Expedientes activos"}</span>
                      <small className="text-muted">{isSearching ? `${displayedLeads.length} resultados` : "Máximo 5 recientes"}</small>
                    </div>
                    <div className="list-group list-group-flush">
                      {(isSearching ? displayedLeads : activeExpedientes).slice(0, 10).map((item) => {
                        const isLead = Boolean(item.source);
                        return (
                          <div
                            key={item.id}
                            role="button"
                            className={`list-group-item d-flex flex-column gap-1 ${selectedLeadId === item.id || selectedExpedienteId === item.id ? "bg-primary-subtle border border-primary" : ""}`}
                            onClick={() => {
                              if (isLead) {
                                setSelectedLeadId(item.id);
                              } else {
                                setSelectedExpedienteId(item.id);
                              }
                            }}
                          >
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="fw-semibold">{item.name || item.owner_name}</div>
                              {!isLead ? <EstadoPill value={item.estado} /> : null}
                            </div>
                            <div className="small text-muted d-flex flex-wrap gap-2">
                              <span>{item.phone}</span>
                              {isLead ? <span>{item.source}</span> : <span>{item.destino}</span>}
                            </div>
                          </div>
                        );
                      })}
                      {isSearching && !displayedLeads.length ? (
                        <p className="text-muted small mb-0">No se encontraron leads con esos filtros.</p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row g-4">
              <div className="col-lg-4 d-flex flex-column gap-3">
                <div className="card bg-white border border-secondary-subtle shadow-sm">
                  <div className="card-body">
                    <SectionTitle title="Datos generales" badge="Expediente" />
                    {selectedExpediente ? (
                      <>
                        <div className="row g-3">
                          <div className="col-md-6"><label className="form-label small fw-semibold">Propietario</label><input className="form-control" value={selectedExpediente.owner_name} readOnly /></div>
                          <div className="col-md-6"><label className="form-label small fw-semibold">Contacto</label><input className="form-control" value={`${selectedExpediente.phone}`} readOnly /></div>
                          <div className="col-md-6"><label className="form-label small fw-semibold">Mascota</label><input className="form-control" value={`${selectedExpediente.mascota_name} · ${selectedExpediente.raza}`} readOnly /></div>
                          <div className="col-md-6">
                            <label className="form-label small fw-semibold">Destino (ciudad/aeropuerto)</label>
                            <select className="form-select" value={selectedExpediente.destino} onChange={(e) => handleDestinoChange(e.target.value)}>
                              {getDestinosPorPais(selectedExpediente.pais || DEFAULT_COUNTRY).map((dest) => (
                                <option key={dest} value={dest}>{dest}</option>
                              ))}
                            </select>
                          </div>
                          <div className="col-md-6"><label className="form-label small fw-semibold d-flex align-items-center gap-2">Pais destino<CountryFlag pais={selectedExpediente.pais || DEFAULT_COUNTRY} /></label><select className="form-select" value={selectedExpediente.pais || DEFAULT_COUNTRY} onChange={(e) => { setCurrentTab("datos"); handlePaisChange(e.target.value); }}>{PAISES.map((pais) => (<option key={pais.value} value={pais.value}>{pais.label}</option>))}</select></div>
                          <div className="col-md-6"><label className="form-label small fw-semibold">Estado</label><div className="d-flex align-items-center gap-2"><EstadoPill value={selectedExpediente.estado} />{selectedExpediente.estado !== "CERRADO" && (<select className="form-select" value={selectedExpediente.estado} onChange={(e) => handleEstadoChange(e.target.value)}>{ESTADOS_EXPEDIENTE.filter((est) => est !== selectedExpediente.estado).map((estado) => (<option key={estado}>{estado}</option>))}</select>)}</div></div>
                          <div className="col-12"><small className="text-muted">Requisitos pendientes: {requisitosPendientes}</small></div>
                          <div className="col-12"><label className="form-label small fw-semibold mb-2">Tipo de mascota</label><div className="d-flex gap-3">{["Perro", "Gato"].map((tipo) => (<label key={tipo} className="form-check form-check-inline mb-0"><input className="form-check-input" type="radio" name="tipoMascota" value={tipo} checked={selectedExpediente.tipo_mascota === tipo} onChange={() => handleTipoMascotaChange(tipo)} /><span className="form-check-label">{tipo}</span></label>))}</div></div>
                          <div className="col-md-4"><label className="form-label small fw-semibold">Edad</label><input className="form-control" value={selectedExpediente.edad || "Por definir"} readOnly /></div>
                          <div className="col-md-4"><label className="form-label small fw-semibold">Peso</label><input className="form-control" value={selectedExpediente.peso || "Pendiente"} readOnly /></div>
                        </div>
                        <div className="mt-3">
                          <p className="small text-muted mb-1">Progreso del checklist</p>
                          <div className="progress" style={{ height: 12 }}>
                            {progressSegments.map((segment) => (
                              <div key={segment.estado} className={`progress-bar ${CHECKLIST_STATUS_COLORS[segment.estado] || "bg-secondary"}`} role="progressbar" style={{ width: `${segment.porcentaje}%` }} />
                            ))}
                          </div>
                          <div className="d-flex justify-content-between mt-2 small text-muted">
                            {Object.entries(checklistStatusCounts).map(([estado, valor]) => (
                              <span key={estado}>{estado}: {valor}</span>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <p className="text-muted small mb-0">Selecciona un expediente para ver sus datos.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-lg-8 d-flex flex-column gap-3">
                {selectedExpediente ? (
                  <div className="card glass-card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
                        <div>
                          <h2 className="h5 mb-1">Expediente {selectedExpediente.codigo}</h2>
                          <p className="text-muted mb-0">{selectedExpediente.destino}</p>
                          <div className="d-flex align-items-center gap-2 small text-muted">
                            <CountryFlag pais={selectedExpediente.pais || DEFAULT_COUNTRY} />
                          </div>
                        </div>
                        <div className="text-end">
                          <EstadoPill value={selectedExpediente.estado} />
                          <p className="text-muted small mb-0">Rol activo: {role}</p>
                        </div>
                      </div>
                      <div className="d-flex flex-wrap gap-2 mt-3">
                        <a className={`btn btn-whatsapp btn-lg ${!whatsappNumber ? "disabled" : ""}`} href={whatsappHref} target="_blank" rel="noreferrer noopener">
                          WhatsApp
                        </a>
                        <button className="btn btn-primary btn-lg" type="button" disabled={!selectedExpediente && !selectedLead} onClick={() => { if (selectedExpediente) { setCurrentTab("datos"); } else if (selectedLead) { handleConvertLead(selectedLead); } }}>
                          {selectedExpediente ? "Ver expediente" : "Abrir expediente"}
                        </button>
                      </div>
                      <div className="nav nav-pills nav-underline small mt-3 gap-2 flex-wrap">
                        {TAB_DEFINITIONS.map((tab) => (
                          <button
                            key={tab.key}
                            className={`nav-link py-1 px-2 ${currentTab === tab.key ? "active" : ""}`}
                            type="button"
                            onClick={() => setCurrentTab(tab.key)}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>
                      <div className="mt-4">
                        <div className="bg-light border border-secondary-subtle rounded-3 p-3">
                          <div className="row g-3">
                            <div className="col-md-6"><p className="small text-muted mb-1">Propietario</p><p className="fw-semibold mb-0">{selectedExpediente.owner_name}</p></div>
                            <div className="col-md-6"><p className="small text-muted mb-1">Contacto</p><p className="fw-semibold mb-0">{selectedExpediente.phone}</p></div>
                            <div className="col-md-6"><p className="small text-muted mb-1">Mascota</p><p className="fw-semibold mb-0">{selectedExpediente.mascota_name} · {selectedExpediente.raza}</p></div>
                            <div className="col-md-6"><p className="small text-muted mb-1">Destino</p><p className="fw-semibold mb-0">{selectedExpediente.destino}</p></div>
                            <div className="col-md-6"><p className="small text-muted mb-1">País</p><CountryFlag pais={selectedExpediente.pais || DEFAULT_COUNTRY} /></div>
                            <div className="col-md-6"><p className="small text-muted mb-1">Fecha probable</p><p className="fw-semibold mb-0">{selectedExpediente.fecha_probable || "Pendiente"}</p></div>
                            <div className="col-md-6"><p className="small text-muted mb-1">Precio actual</p><p className="fw-semibold mb-0">USD {selectedExpediente.precio}</p></div>
                            <div className="col-md-6"><p className="small text-muted mb-1">Motivo del precio</p><p className="fw-semibold mb-0">{selectedExpediente.priceReason || "Estándar"}</p></div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3">
                        {currentTab === "pagos" && (
                          <div className="row g-4">
                            <div className="col-lg-6">
                              <div className="bg-light border border-secondary-subtle rounded-3 p-3 h-100">
                                <p className="fw-semibold mb-3">Ajuste de precios</p>

                                <div className="mb-3">
                                  <label className="form-label small text-muted mb-1">Precio (USD)</label>
                                  <input type="number" min="0" step="10" className="form-control" value={precioDraft} onChange={(e) => setPrecioDraft(e.target.value)} />
                                </div>

                                <div className="mb-3">
                                  <label className="form-label small text-muted mb-1">Motivo del ajuste</label>
                                  <input type="text" className="form-control" value={razonPrecio} onChange={(e) => setRazonPrecio(e.target.value)} placeholder="Razón del cambio" />
                                </div>

                                <button className="btn btn-primary w-100 mb-3" type="button" onClick={handleGuardarPrecio}>
                                  Confirmar cambio
                                </button>

                                <div className="border-top pt-2">
                                  <small className="text-muted d-block">Precio actual: <strong>USD {selectedExpediente.precio}</strong></small>
                                  <small className="text-muted d-block">Motivo: {selectedExpediente.priceReason || "Estándar"}</small>
                                </div>

                                <div className="mt-3">
                                  <button className="btn btn-link btn-sm p-0" type="button" onClick={handleDownloadCotizacion}>
                                    <i className="bi bi-download me-1" aria-hidden="true"></i>Descargar cotización
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="bg-light border border-secondary-subtle rounded-3 p-3">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <div>
                                    <p className="small text-muted mb-1">Pago 70%</p>
                                    <p className="fw-semibold mb-0">{selectedExpediente.pagos.pago70.comprobante_url ? "Voucher cargado" : "Pendiente"}</p>
                                  </div>
                                  <EstadoPill value={selectedExpediente.pagos.pago70.aprobado ? "DOCUMENTACION_COMPLETA" : "EN_PROCESO"} />
                                </div>
                                <ul className="list-unstyled small mb-0">
                                  <li className="d-flex justify-content-between align-items-center">
                                    <span>Voucher cargado</span>
                                    <button className="btn btn-link btn-sm p-0" onClick={() => handlePago(70)}>Cargar</button>
                                  </li>
                                  <li className="d-flex justify-content-between align-items-center">
                                    <span>Pago registrado</span>
                                    <button className="btn btn-link btn-sm p-0" onClick={() => handlePago(70)}>Registrar</button>
                                  </li>
                                  <li className="d-flex justify-content-between align-items-center">
                                    <span>Pago aprobado</span>
                                    <button className="btn btn-link btn-sm p-0" onClick={() => handleAprobarPago(70)}>Aprobar</button>
                                  </li>
                                </ul>
                                <small className="text-muted d-block mt-2">Comprobante: {selectedExpediente.pagos.pago70.comprobante_url || "No cargado"}</small>
                              </div>
                              <div className="bg-light border border-secondary-subtle rounded-3 p-3 mt-3">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <div>
                                    <p className="small text-muted mb-1">Pago 30%</p>
                                    <p className="fw-semibold mb-0">{selectedExpediente.pagos.pago30.comprobante_url ? "Voucher cargado" : "Pendiente"}</p>
                                  </div>
                                  <EstadoPill value={selectedExpediente.pagos.pago30.aprobado ? "DOCUMENTACION_COMPLETA" : "EN_PROCESO"} />
                                </div>
                                <ul className="list-unstyled small mb-0">
                                  <li className="d-flex justify-content-between align-items-center">
                                    <span>Voucher cargado</span>
                                    <button className="btn btn-link btn-sm p-0" onClick={() => handlePago(30)}>Cargar</button>
                                  </li>
                                  <li className="d-flex justify-content-between align-items-center">
                                    <span>Pago registrado</span>
                                    <button className="btn btn-link btn-sm p-0" onClick={() => handlePago(30)}>Registrar</button>
                                  </li>
                                  <li className="d-flex justify-content-between align-items-center">
                                    <span>Pago aprobado</span>
                                    <button className="btn btn-link btn-sm p-0" onClick={() => handleAprobarPago(30)}>Aprobar</button>
                                  </li>
                                </ul>
                                <small className="text-muted d-block mt-2">Comprobante: {selectedExpediente.pagos.pago30.comprobante_url || "No cargado"}</small>
                              </div>
                            </div>
                          </div>
                        )}
                        {currentTab === "checklist" && (
                          <div className="border border-secondary-subtle rounded-3 p-3">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <div className="fw-semibold">Checklist documentario</div>
                              <span className="badge bg-primary-subtle text-primary">{checklistProgressText}</span>
                            </div>
                            <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
                              <span className="small text-muted">Filtrar por estado:</span>
                              <select className="form-select form-select-sm w-auto" value={checklistFilter} onChange={(e) => setChecklistFilter(e.target.value)}>
                                {["TODOS", ...ESTADOS_REQUISITO].map((estado) => (<option key={estado} value={estado}>{STATUS_ICONS[estado] || estado}</option>))}
                              </select>
                              <span className="small text-muted">Obligatorios arriba / opcionales abajo</span>
                            </div>
                            <div className="table-responsive">
                              <table className="table table-borderless mb-0">
                                <thead className="table-light">
                                  <tr>
                                    <th>Requisito</th>
                                    <th>Estado</th>
                                    <th className="text-end" style={{ width: "60px" }}></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {filteredRequired.length ? (<><tr className="table-secondary small text-uppercase"><td colSpan="3">Requisitos obligatorios</td></tr>{filteredRequired.map((req) => (<RequisitoRow key={req.id} requisito={req} onUpdate={handleRequisitoUpdate} />))}</>) : null}
                                  {filteredOptional.length ? (<><tr className="table-secondary small text-uppercase"><td colSpan="3">Requisitos opcionales</td></tr>{filteredOptional.map((req) => (<RequisitoRow key={req.id} requisito={req} onUpdate={handleRequisitoUpdate} />))}</>) : null}
                                  {!filteredRequired.length && !filteredOptional.length ? (<tr><td colSpan="3" className="text-center text-muted">No hay requisitos para este filtro.</td></tr>) : null}
                                </tbody>
                              </table>
                            </div>
                            {selectedExpediente.nota_requisitos ? (
                              <div className="alert alert-warning bg-warning-subtle border-warning-subtle text-dark small mt-3 mb-0">
                                <strong>Nota del pais:</strong> {selectedExpediente.nota_requisitos}
                              </div>
                            ) : null}
                            <div className="d-flex flex-wrap gap-2 justify-content-end mt-3">
                              <button className="btn btn-link btn-sm p-0" onClick={handleDocumentacionCompleta} type="button">Marcar documentacion completa</button>
                              <button className="btn btn-link btn-sm p-0" type="button" onClick={() => setCurrentTab("archivos")}>Ver archivos</button>
                            </div>
                          </div>
                        )}
                        {currentTab === "notas" && (
                          <div>
                            <div className="d-flex justify-content-between align-items-center"><h5 className="h6 mb-0">Notas internas</h5><button className="btn btn-link btn-sm" type="button" onClick={() => setNotesExpanded((prev) => !prev)}>{notesExpanded ? "Contraer notas" : "Mostrar notas"}</button></div>
                            {notesExpanded ? (
                              <div className="row g-3 my-3">
                                <div className="col-12"><textarea className="form-control" placeholder="Agregar nota visible para el equipo" value={notaInterna} onChange={(e) => setNotaInterna(e.target.value)} rows={3} /></div>
                                <div className="col-12"><button className="btn btn-primary btn-sm" type="button" onClick={handleAgregarNota}>Guardar nota</button></div>
                              </div>
                            ) : (
                              <p className="text-muted small mt-3">Las notas se mantienen ocultas hasta expandir.</p>
                            )}
                            <div className="border-top pt-3 mt-3" style={{ maxHeight: 220, overflowY: "auto" }}>
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
                        )}
                        {currentTab === "archivos" && (
                          <div className="border border-secondary-subtle rounded-3 p-4 text-center text-muted">
                            <p className="mb-2">Aquí podrás ver los archivos cargados al expediente.</p>
                            <button className="btn btn-outline-secondary btn-sm" type="button">Adjuntar archivo</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="card border border-secondary-subtle shadow-sm">
                    <div className="card-body">
                      <p className="mb-0">Selecciona o crea un expediente para ver el detalle.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
