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

const STATUS_ICONS = {
  PENDIENTE: "⏱️",
  ENTREGADO: "📦",
  OBSERVADO: "⚠️",
  VALIDADO: "✅",
};

const TAB_DEFINITIONS = [
  { key: "datos", label: "Datos generales" },
  { key: "pagos", label: "Pagos 70/30" },
  { key: "checklist", label: "Checklist documentario" },
  { key: "notas", label: "Notas / Historial" },
  { key: "archivos", label: "Archivos" },
];

const REQUIRED_THRESHOLD = 5;

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
﻿  return (
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

          <div className="row g-4">
            <div className="col-lg-4 d-flex flex-column gap-4">
              <div className="card bg-white border border-secondary-subtle shadow-sm">
                <div className="card-body">
                  <SectionTitle title="Leads" subtitle="Captura y conversión rápida" badge="ETAPA 0" />
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
                            className="btn btn-sm btn-outline-secondary"
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
              <div className="card bg-white border border-secondary-subtle shadow-sm">
                <div className="card-body">
                  <h3 className="h5 fw-semibold mb-3">Datos generales del expediente</h3>
                  {selectedExpediente ? (
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Propietario</label>
                        <input className="form-control" value={selectedExpediente.owner_name} readOnly />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Contacto</label>
                        <input className="form-control" value={`${selectedExpediente.phone}`} readOnly />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Mascota</label>
                        <input
                          className="form-control"
                          value={`${selectedExpediente.mascota_name} · ${selectedExpediente.raza}`}
                          readOnly
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Destino</label>
                        <input className="form-control" value={selectedExpediente.destino} readOnly />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">País destino</label>
                        <select
                          className="form-select"
                          value={selectedExpediente.pais || PAISES[0]?.value}
                          onChange={(e) => {
                            setCurrentTab("datos");
                            handlePaisChange(e.target.value);
                          }}
                        >
                          {PAISES.map((pais) => (
                            <option key={pais.value} value={pais.value}>
                              {pais.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
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
                      <div className="col-12">
                        <small className="text-muted d-block">Requisitos pendientes: {requisitosPendientes}</small>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted small mb-0">Selecciona un expediente para ver sus datos.</p>
                  )}
                  <div className="d-flex justify-content-end mt-3">
                    <button className="btn btn-outline-secondary btn-sm" type="button" onClick={() => setCurrentTab("datos")}>
                      Ver pestaña de datos
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              {selectedExpediente ? (
                <div className="card bg-white border border-secondary-subtle shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
                      <div>
                        <p className="text-uppercase text-muted small mb-1">Expediente</p>
                        <h3 className="mb-1">Expediente {selectedExpediente.codigo}</h3>
                        <p className="text-muted mb-0">{selectedExpediente.destino}</p>
                      </div>
                      <div className="text-end">
                        <EstadoPill value={selectedExpediente.estado} />
                        <p className="text-muted small mt-2 mb-0">Rol activo: {role}</p>
                      </div>
                    </div>
                    <div className="d-flex flex-wrap gap-2 mt-3">
                      {TAB_DEFINITIONS.map((tab) => (
                        <button
                          key={tab.key}
                          className={`btn btn-sm ${currentTab === tab.key ? "btn-primary" : "btn-outline-secondary"}`}
                          type="button"
                          onClick={() => setCurrentTab(tab.key)}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                    <div className="mt-4">
                      {currentTab === "datos" && (
                        <div className="bg-light border border-1 border-secondary-subtle rounded-3 p-3">
                          <div className="row g-3">
                            <div className="col-md-6">
                              <p className="small text-muted mb-1">Propietario</p>
                              <p className="fw-semibold mb-0">{selectedExpediente.owner_name}</p>
                            </div>
                            <div className="col-md-6">
                              <p className="small text-muted mb-1">Contacto</p>
                              <p className="fw-semibold mb-0">{selectedExpediente.phone}</p>
                            </div>
                            <div className="col-md-6">
                              <p className="small text-muted mb-1">Mascota</p>
                              <p className="fw-semibold mb-0">
                                {selectedExpediente.mascota_name} · {selectedExpediente.raza}
                              </p>
                            </div>
                            <div className="col-md-6">
                              <p className="small text-muted mb-1">Destino</p>
                              <p className="fw-semibold mb-0">{selectedExpediente.destino}</p>
                            </div>
                            <div className="col-md-6">
                              <p className="small text-muted mb-1">País</p>
                              <p className="fw-semibold mb-0">{getPaisLabel(selectedExpediente.pais || DEFAULT_COUNTRY)}</p>
                            </div>
                            <div className="col-md-6">
                              <p className="small text-muted mb-1">Fecha probable</p>
                              <p className="fw-semibold mb-0">{selectedExpediente.fecha_probable || "Pendiente"}</p>
                            </div>
                            <div className="col-md-6">
                              <p className="small text-muted mb-1">Precio actual</p>
                              <p className="fw-semibold mb-0">USD {selectedExpediente.precio}</p>
                            </div>
                            <div className="col-md-6">
                              <p className="small text-muted mb-1">Motivo del precio</p>
                              <p className="fw-semibold mb-0">{selectedExpediente.priceReason || "Estándar"}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      {currentTab === "pagos" && (
                        <div className="row g-4">
                          <div className="col-12 col-lg-6">
                            <div className="bg-light border border-1 border-secondary-subtle rounded-3 p-3 h-100">
                              <p className="fw-semibold mb-2">Ajuste de precios</p>
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
                              <small className="text-muted d-block mt-2">Precio actual: USD {selectedExpediente.precio}</small>
                              <small className="text-muted d-block">
                                Motivo: {selectedExpediente.priceReason || "Estándar"}
                              </small>
                              <div className="mt-3 d-flex flex-wrap gap-2">
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
                          </div>
                          <div className="col-12 col-lg-6">
                            <div className="bg-light border border-1 border-secondary-subtle rounded-3 p-3">
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <div>
                                  <p className="small text-muted mb-1">Pago 70%</p>
                                  <p className="fw-semibold mb-0">
                                    {selectedExpediente.pagos.pago70.comprobante_url ? "Voucher cargado" : "Pendiente"}
                                  </p>
                                </div>
                                <EstadoPill
                                  value={selectedExpediente.pagos.pago70.aprobado ? "DOCUMENTACION_COMPLETA" : "EN_PROCESO"}
                                />
                              </div>
                              <div className="d-flex flex-wrap gap-2">
                                <button className="btn btn-outline-secondary btn-sm" onClick={() => handlePago(70)}>
                                  Registrar 70%
                                </button>
                                <button className="btn btn-outline-secondary btn-sm" onClick={() => handleAprobarPago(70)}>
                                  Aprobar 70%
                                </button>
                              </div>
                              <small className="text-muted d-block mt-2">
                                Comprobante: {selectedExpediente.pagos.pago70.comprobante_url || "No cargado"}
                              </small>
                            </div>
                            <div className="bg-light border border-1 border-secondary-subtle rounded-3 p-3 mt-3">
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <div>
                                  <p className="small text-muted mb-1">Pago 30%</p>
                                  <p className="fw-semibold mb-0">
                                    {selectedExpediente.pagos.pago30.comprobante_url ? "Voucher cargado" : "Pendiente"}
                                  </p>
                                </div>
                                <EstadoPill
                                  value={selectedExpediente.pagos.pago30.aprobado ? "DOCUMENTACION_COMPLETA" : "EN_PROCESO"}
                                />
                              </div>
                              <div className="d-flex flex-wrap gap-2">
                                <button className="btn btn-outline-secondary btn-sm" onClick={() => handlePago(30)}>
                                  Registrar 30%
                                </button>
                                <button className="btn btn-outline-secondary btn-sm" onClick={() => handleAprobarPago(30)}>
                                  Validar 30%
                                </button>
                              </div>
                              <small className="text-muted d-block mt-2">
                                Comprobante: {selectedExpediente.pagos.pago30.comprobante_url || "No cargado"}
                              </small>
                            </div>
                          </div>
                        </div>
                      )}
                      {currentTab === "checklist" && (
                        <div className="border border-1 border-secondary-subtle rounded-3 p-3">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="fw-semibold">Checklist documentario</div>
                            <span className="badge bg-primary-subtle text-primary">{checklistProgressText}</span>
                          </div>
                          <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
                            <span className="small text-muted">Filtrar por estado:</span>
                            <select
                              className="form-select form-select-sm w-auto"
                              value={checklistFilter}
                              onChange={(e) => setChecklistFilter(e.target.value)}
                            >
                              {['TODOS', ...ESTADOS_REQUISITO].map((estado) => (
                                <option key={estado} value={estado}>
                                  {estado}
                                </option>
                              ))}
                            </select>
                            <span className="small text-muted">Obligatorios arriba · opcionales abajo</span>
                          </div>
                          <div className="table-responsive">
                            <table className="table table-borderless mb-0">
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
                                {filteredRequired.length ? (
                                  <>
                                    <tr className="table-secondary small text-uppercase">
                                      <td colSpan="5">Requisitos obligatorios</td>
                                    </tr>
                                    {filteredRequired.map((req) => (
                                      <RequisitoRow key={req.id} requisito={req} onUpdate={handleRequisitoUpdate} />
                                    ))}
                                  </>
                                ) : null}
                                {filteredOptional.length ? (
                                  <>
                                    <tr className="table-secondary small text-uppercase">
                                      <td colSpan="5">Requisitos opcionales</td>
                                    </tr>
                                    {filteredOptional.map((req) => (
                                      <RequisitoRow key={req.id} requisito={req} onUpdate={handleRequisitoUpdate} />
                                    ))}
                                  </>
                                ) : null}
                                {!filteredRequired.length && !filteredOptional.length ? (
                                  <tr>
                                    <td colSpan="5" className="text-center text-muted">
                                      No hay requisitos para este filtro.
                                    </td>
                                  </tr>
                                ) : null}
                              </tbody>
                            </table>
                          </div>
                          <div className="d-flex flex-wrap gap-2 justify-content-end mt-3">
                            <button className="btn btn-primary btn-sm" type="button" onClick={handleDocumentacionCompleta}>
                              Marcar documentación completa
                            </button>
                            <button className="btn btn-outline-secondary btn-sm" type="button" onClick={() => setCurrentTab("archivos")}>
                              Ver archivos
                            </button>
                          </div>
                        </div>
                      )}
                      {currentTab === "notas" && (
                        <div>
                          <div className="d-flex justify-content-between align-items-center">
                            <h5 className="h6 mb-0">Notas internas</h5>
                            <button
                              className="btn btn-link btn-sm"
                              type="button"
                              onClick={() => setNotesExpanded((prev) => !prev)}
                            >
                              {notesExpanded ? "Contraer notas" : "Mostrar notas"}
                            </button>
                          </div>
                          {notesExpanded ? (
                            <div className="row g-3 my-3">
                              <div className="col-12">
                                <textarea
                                  className="form-control"
                                  placeholder="Agregar nota visible para el equipo"
                                  value={notaInterna}
                                  onChange={(e) => setNotaInterna(e.target.value)}
                                  rows={3}
                                />
                              </div>
                              <div className="col-12">
                                <button className="btn btn-primary btn-sm" type="button" onClick={handleAgregarNota}>
                                  Guardar nota
                                </button>
                              </div>
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
                        <div className="border border-1 border-secondary-subtle rounded-3 p-4 text-center text-muted">
                          <p className="mb-2">Aquí podrás ver los archivos vinculados al expediente.</p>
                          <button className="btn btn-outline-secondary btn-sm" type="button">
                            Adjuntar archivo
                          </button>
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
      </section>
    </Layout>
  );
;
}
