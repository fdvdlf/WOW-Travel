"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Layout } from "@/layouts/Layout";
import { APP_VERSION, TRACKING_CODE } from "@/lib/appVersion";

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

const COUNTRY_PRETTY = {
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
  label: COUNTRY_PRETTY[name] || formatCountryLabel(name),
}));
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

const REQUISITOS_POR_PAIS = {
  CANADA: [
    "Microchip ISO",
    "Vacuna antirrábica vigente",
    "Certificado veterinario bilingüe",
    "Permiso de importación CFIA / SFIA",
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
    "Constancia sanitaria",
    "Formato SENASICA",
    "Ticket de vuelo (opcional)",
  ],
};

const buildRequisitosPorPais = (pais, seed = {}) => {
  const source = REQUISITOS_POR_PAIS[pais] || REQUISITOS_BASE;
  return source.map((nombre, index) => ({
    id: `req-${pais}-${index + 1}`,
    nombre,
    estado: "PENDIENTE",
    evidencia_url: "",
    fecha: "",
    notas: "",
    ...seed[index],
  }));
};

const getPaisLabel = (value) => PAISES.find((p) => p.value === value)?.label || value;

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

const getPriceForCountry = (pais) => COUNTRY_PRICING[pais] ?? BASE_PRICE;
const getPriceReason = (pais) => `Precio estándar ${getPaisLabel(pais)}`;

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

const SAMPLE_EXPEDIENTES = [
  {
    id: "exp-1",
    codigo: "EXP-001",
    lead_id: "lead-1",
    owner_name: "Carolina Vega",
    phone: "+51 999 888 777",
    mascota_name: "Kira",
    raza: "Border Collie",
    destino: "Toronto, Canadá",
    pais: DEFAULT_COUNTRY,
    fecha_probable: "2024-09-15",
    tipo_mascota: "Perro",
    edad: "3 años",
    peso: "16.3 kg",
    precio: getPriceForCountry(DEFAULT_COUNTRY),
    priceReason: getPriceReason(DEFAULT_COUNTRY),
    estado: "EN_PROCESO",
    responsable: { comercial: "Fernando", operaciones: "Gabriel" },
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
  return (
    <tr>
      <td className="fw-semibold">{requisito.nombre}</td>
      <td>
        <div className="d-flex align-items-center gap-2">
          <span className="fs-5">{STATUS_ICONS[requisito.estado] || "ℹ️"}</span>
          <select
            className="form-select form-select-sm flex-grow-1"
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
      </td>
      <td>
        <div className="d-flex align-items-center gap-2">
          <input
            className="form-control form-control-sm"
            placeholder="URL o nombre"
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
          <button className="btn btn-link btn-sm p-0" type="button" onClick={() => fileInputRef.current?.click()}>
            Adjuntar
          </button>
        </div>
      </td>
      <td>
        <input
          type="date"
          className="form-control form-control-sm"
          value={requisito.fecha}
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
    const paisInicial = PAISES.find((p) => p.value === DEFAULT_COUNTRY)?.value || DEFAULT_COUNTRY;
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
      destino: lead.notes || "Destino por definir",
      pais: paisInicial,
      fecha_probable: "",
      precio: getPriceForCountry(paisInicial),
      priceReason: getPriceReason(paisInicial),
      estado: "CREADO",
      pagos: {
        pago70: { tipo: 70, comprobante_url: "", fecha: "", aprobado: false },
        pago30: { tipo: 30, comprobante_url: "", fecha: "", aprobado: false },
      },
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
    setCurrentTab("datos");
    setSelectedLeadId(lead.id);
    setMensaje("Expediente creado desde el lead.");
  };

  const handlePaisChange = (paisValue) => {
    if (!selectedExpediente) return;
    updateExpediente(selectedExpediente.id, (exp) => ({
      ...exp,
      pais: paisValue,
      requisitos: buildRequisitosPorPais(paisValue),
      precio: getPriceForCountry(paisValue),
      priceReason: getPriceReason(paisValue),
    }));
    addHistorial(`País actualizado a ${getPaisLabel(paisValue)} y checklist regenerado.`);
    setMensaje("Checklist y precio estándar actualizados.");
    setPrecioDraft(String(getPriceForCountry(paisValue)));
    setRazonPrecio(getPriceReason(paisValue));
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
      setMensaje("Solo Operaciones marca documentación completa.");
      return;
    }
    if (selectedExpediente.requisitos.some((req) => req.estado !== "VALIDADO")) {
      setMensaje("Todos los requisitos deben estar validados.");
      return;
    }
    updateExpediente(selectedExpediente.id, (exp) => ({ ...exp, estado: "DOCUMENTACION_COMPLETA" }));
    addHistorial("Operaciones marca documentación completa.");
    setMensaje("Documentación completa. Listo para cierre.");
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
    selectedExpediente?.requisitos.filter((req) => req.estado !== "VALIDADO").length ?? 0;
  const requiredRequisitos = selectedExpediente?.requisitos.slice(0, 5) ?? [];
  const optionalRequisitos = selectedExpediente?.requisitos.slice(5) ?? [];
  const filterRequisitos = (items) =>
    checklistFilter === "TODOS" ? items : items.filter((req) => req.estado === checklistFilter);
  const filteredRequired = filterRequisitos(requiredRequisitos);
  const filteredOptional = filterRequisitos(optionalRequisitos);
  const completedCount = selectedExpediente?.requisitos.filter((req) => req.estado === "VALIDADO").length ?? 0;
  const checklistProgressText = `${completedCount}/${selectedExpediente?.requisitos.length ?? 0} completados`;


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
      <section className="py-5 bg-light">
        <div className="container">
          <div className="card bg-white border border-secondary-subtle shadow-sm mb-4">
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
              <div className="card bg-white border border-secondary-subtle shadow-sm w-100">
                <div className="card-body">
                  <SectionTitle title="Leads y b?squeda" badge="ETAPA 0" />
                  <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between">
                    <div className="d-flex flex-wrap gap-2 align-items-center flex-grow-1">
                      <div className="input-group flex-grow-1 min-w-0">
                        <span className="input-group-text">Buscar</span>
                        <input className="form-control" placeholder="Nombre, tel?fono o nota" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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
                      <button className="btn btn-primary btn-sm" type="button" onClick={() => setShowLeadForm((prev) => !prev)}>{showLeadForm ? "Cerrar" : "+ Nuevo lead"}</button>
                      <button className="btn btn-outline-secondary btn-sm" type="button" onClick={handleImportClick}>Importar</button>
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
                      <span className="fw-semibold">{isSearching ? "Resultados de b?squeda" : "Expedientes activos"}</span>
                      <small className="text-muted">{isSearching ? `${displayedLeads.length} resultados` : "M?ximo 5 recientes"}</small>
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
              <div className="col-lg-7 d-flex flex-column gap-3">
                <div className="card bg-white border border-secondary-subtle shadow-sm">
                  <div className="card-body">
                    <SectionTitle title="Datos generales" badge="Expediente" />
                    {selectedExpediente ? (
                      <>
                        <div className="row g-3">
                          <div className="col-md-6"><label className="form-label small fw-semibold">Propietario</label><input className="form-control" value={selectedExpediente.owner_name} readOnly /></div>
                          <div className="col-md-6"><label className="form-label small fw-semibold">Contacto</label><input className="form-control" value={`${selectedExpediente.phone}`} readOnly /></div>
                          <div className="col-md-6"><label className="form-label small fw-semibold">Mascota</label><input className="form-control" value={`${selectedExpediente.mascota_name} ? ${selectedExpediente.raza}`} readOnly /></div>
                          <div className="col-md-6"><label className="form-label small fw-semibold">Destino</label><input className="form-control" value={selectedExpediente.destino} readOnly /></div>
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

              <div className="col-lg-5 d-flex flex-column gap-3">
                {selectedExpediente ? (
                  <div className="card bg-white border border-secondary-subtle shadow-sm">
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
                        <button className="btn btn-primary btn-sm" type="button" disabled={!selectedExpediente && !selectedLead} onClick={() => { if (selectedExpediente) { setCurrentTab("datos"); } else if (selectedLead) { handleConvertLead(selectedLead); } }}>
                          {selectedExpediente ? "Ir al expediente" : "Abrir expediente"}
                        </button>
                        <a className={`btn btn-outline-secondary btn-sm ${!whatsappNumber ? "disabled" : ""}`} href={whatsappHref} target="_blank" rel="noreferrer noopener">
                          WhatsApp
                        </a>
                      </div>
                      <div className="d-flex flex-wrap gap-2 mt-3">
                        {TAB_DEFINITIONS.map((tab) => (
                          <button key={tab.key} className={`btn btn-sm ${currentTab === tab.key ? "btn-primary" : "btn-outline-secondary"}`} type="button" onClick={() => setCurrentTab(tab.key)}>
                            {tab.label}
                          </button>
                        ))}
                      </div>
                      <div className="mt-4">
                        <div className="bg-light border border-secondary-subtle rounded-3 p-3">
                          <div className="row g-3">
                            <div className="col-md-6"><p className="small text-muted mb-1">Propietario</p><p className="fw-semibold mb-0">{selectedExpediente.owner_name}</p></div>
                            <div className="col-md-6"><p className="small text-muted mb-1">Contacto</p><p className="fw-semibold mb-0">{selectedExpediente.phone}</p></div>
                            <div className="col-md-6"><p className="small text-muted mb-1">Mascota</p><p className="fw-semibold mb-0">{selectedExpediente.mascota_name} ? {selectedExpediente.raza}</p></div>
                            <div className="col-md-6"><p className="small text-muted mb-1">Destino</p><p className="fw-semibold mb-0">{selectedExpediente.destino}</p></div>
                            <div className="col-md-6"><p className="small text-muted mb-1">Pa?s</p><CountryFlag pais={selectedExpediente.pais || DEFAULT_COUNTRY} /></div>
                            <div className="col-md-6"><p className="small text-muted mb-1">Fecha probable</p><p className="fw-semibold mb-0">{selectedExpediente.fecha_probable || "Pendiente"}</p></div>
                            <div className="col-md-6"><p className="small text-muted mb-1">Precio actual</p><p className="fw-semibold mb-0">USD {selectedExpediente.precio}</p></div>
                            <div className="col-md-6"><p className="small text-muted mb-1">Motivo del precio</p><p className="fw-semibold mb-0">{selectedExpediente.priceReason || "Est?ndar"}</p></div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3">
                        {currentTab === "pagos" && (
                          <div className="row g-4">
                            <div className="col-lg-6">
                              <div className="bg-light border border-secondary-subtle rounded-3 p-3 h-100">
                                <p className="fw-semibold mb-2">Ajuste de precios</p>
                                <div className="input-group">
                                  <span className="input-group-text">USD</span>
                                  <input type="number" min="0" step="10" className="form-control" value={precioDraft} onChange={(e) => setPrecioDraft(e.target.value)} />
                                </div>
                                <small className="text-muted d-block mt-2">Precio actual: USD {selectedExpediente.precio}</small>
                                <small className="text-muted d-block">Motivo: {selectedExpediente.priceReason || "Est?ndar"}</small>
                                <div className="mt-3 d-flex flex-wrap gap-2">
                                  <button className="btn btn-primary btn-sm" type="button" onClick={handleGuardarPrecio}>Guardar precio</button>
                                  <button className="btn btn-outline-secondary btn-sm" type="button" onClick={handleDownloadCotizacion}>Descargar cotizaci?n</button>
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
                                <div className="d-flex flex-wrap gap-2">
                                  <button className="btn btn-outline-secondary btn-sm" onClick={() => handlePago(70)}>Registrar 70%</button>
                                  <button className="btn btn-outline-secondary btn-sm" onClick={() => handleAprobarPago(70)}>Aprobar 70%</button>
                                </div>
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
                                <div className="d-flex flex-wrap gap-2">
                                  <button className="btn btn-outline-secondary btn-sm" onClick={() => handlePago(30)}>Registrar 30%</button>
                                  <button className="btn btn-outline-secondary btn-sm" onClick={() => handleAprobarPago(30)}>Validar 30%</button>
                                </div>
                                <small className="text-muted d-block mt-2">Comprobante: {selectedExpediente.pagos.pago30.comprobante_url || "No cargado"}</small>
                              </div>
                            </div>
                          </div>
                        )}
                        {currentTab === "checklist" && (
                          <div className="border border-secondary-subtle rounded-3 p-3">
                            <div className="d-flex justify-content-between align-items-center mb-3"><div className="fw-semibold">Checklist documentario</div><span className="badge bg-primary-subtle text-primary">{checklistProgressText}</span></div>
                            <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
                              <span className="small text-muted">Filtrar por estado:</span>
                              <select className="form-select form-select-sm w-auto" value={checklistFilter} onChange={(e) => setChecklistFilter(e.target.value)}>
                                {["TODOS", ...ESTADOS_REQUISITO].map((estado) => (<option key={estado} value={estado}>{STATUS_ICONS[estado] || estado}</option>))}
                              </select>
                              <span className="small text-muted">Obligatorios arriba ? opcionales abajo</span>
                            </div>
                            <div className="table-responsive">
                              <table className="table table-borderless mb-0">
                                <thead className="table-light">
                                  <tr><th>Requisito</th><th>Estado</th><th>Evidencia</th><th>Fecha (plan/real)</th><th>Notas</th></tr>
                                </thead>
                                <tbody>
                                  {filteredRequired.length ? (<><tr className="table-secondary small text-uppercase"><td colSpan="5">Requisitos obligatorios</td></tr>{filteredRequired.map((req) => (<RequisitoRow key={req.id} requisito={req} onUpdate={handleRequisitoUpdate} />))}</>) : null}
                                  {filteredOptional.length ? (<><tr className="table-secondary small text-uppercase"><td colSpan="5">Requisitos opcionales</td></tr>{filteredOptional.map((req) => (<RequisitoRow key={req.id} requisito={req} onUpdate={handleRequisitoUpdate} />))}</>) : null}
                                  {!filteredRequired.length && !filteredOptional.length ? (<tr><td colSpan="5" className="text-center text-muted">No hay requisitos para este filtro.</td></tr>) : null}
                                </tbody>
                              </table>
                            </div>
                            <div className="d-flex flex-wrap gap-2 justify-content-end mt-3">
                              <button className="btn btn-primary btn-sm" onClick={handleDocumentacionCompleta} type="button">Marcar documentaci?n completa</button>
                              <button className="btn btn-outline-secondary btn-sm" type="button" onClick={() => setCurrentTab("archivos")}>Ver archivos</button>
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
                            <p className="mb-2">Aqu? podr?s ver los archivos cargados al expediente.</p>
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
