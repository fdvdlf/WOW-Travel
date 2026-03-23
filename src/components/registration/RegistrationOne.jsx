"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

const registrationShape = "/images/registration_shape.svg";
const rightArrow = "/icon/right_arrow.svg";
const whatsappNumber = "51941482291";
const travelMonthOptions = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Oct",
  "Nov",
  "Dic",
];
const destinationOptions = [
  "ALEMANIA",
  "ARGENTINA",
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
  "COREA DEL SUR",
  "COSTA RICA",
  "CROACIA",
  "CUBA",
  "DINAMARCA",
  "ECUADOR",
  "EEUU",
  "EGIPTO",
  "EL SALVADOR",
  "EMIRATOS ARABES UNIDOS",
  "ESLOVAQUIA",
  "ESLOVENIA",
  "ESPANA",
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

function formatTravelMonth(value) {
  if (!value) {
    return "";
  }

  const date = new Date(`${value}-01T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("es-PE", {
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatCountryLabel(country) {
  return country
    .toLowerCase()
    .split(" ")
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(" ");
}

function buildTravelMonthValue(year, monthIndex) {
  return `${year}-${String(monthIndex + 1).padStart(2, "0")}`;
}

function parseTravelMonthValue(value) {
  if (!value) {
    return null;
  }

  const [year, month] = value.split("-").map(Number);

  if (!year || !month) {
    return null;
  }

  return {
    year,
    monthIndex: month - 1,
  };
}

export function RegistrationOne() {
  const today = useMemo(() => new Date(), []);
  const currentYear = today.getFullYear();
  const currentMonthIndex = today.getMonth();
  const [approxDate, setApproxDate] = useState("");
  const [visibleYear, setVisibleYear] = useState(currentYear);
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);
  const [approxDateError, setApproxDateError] = useState("");
  const monthPickerRef = useRef(null);
  const monthPickerButtonRef = useRef(null);
  const monthPickerPanelRef = useRef(null);
  const [monthPickerPanelStyle, setMonthPickerPanelStyle] = useState(null);

  useEffect(() => {
    const handlePointerDown = (event) => {
      const clickedOnTrigger = monthPickerRef.current?.contains(event.target);
      const clickedOnPanel = monthPickerPanelRef.current?.contains(event.target);

      if (!clickedOnTrigger && !clickedOnPanel) {
        setIsMonthPickerOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMonthPickerOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const updateMonthPickerPosition = useCallback(() => {
    const triggerRect = monthPickerButtonRef.current?.getBoundingClientRect();

    if (!triggerRect) {
      return;
    }

    const viewportPadding = 16;
    const preferredWidth = Math.max(triggerRect.width, 320);
    const maxWidth = window.innerWidth - viewportPadding * 2;
    const width = Math.min(preferredWidth, maxWidth);
    const left = Math.min(
      Math.max(triggerRect.left, viewportPadding),
      window.innerWidth - width - viewportPadding,
    );

    setMonthPickerPanelStyle({
      top: triggerRect.bottom + 10,
      left,
      width,
    });
  }, []);

  useEffect(() => {
    if (!isMonthPickerOpen) {
      return;
    }

    updateMonthPickerPosition();

    window.addEventListener("resize", updateMonthPickerPosition);
    window.addEventListener("scroll", updateMonthPickerPosition, true);

    return () => {
      window.removeEventListener("resize", updateMonthPickerPosition);
      window.removeEventListener("scroll", updateMonthPickerPosition, true);
    };
  }, [isMonthPickerOpen, updateMonthPickerPosition]);

  const handleToggleMonthPicker = useCallback(() => {
    setIsMonthPickerOpen((currentValue) => !currentValue);
  }, []);

  const handleMonthPickerKeyDown = useCallback((event) => {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsMonthPickerOpen(true);
    }
  }, []);

  const handleSelectTravelMonth = useCallback((year, monthIndex) => {
    const nextValue = buildTravelMonthValue(year, monthIndex);
    setApproxDate(nextValue);
    setApproxDateError("");
    setVisibleYear(year);
    setIsMonthPickerOpen(false);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const petType = String(formData.get("pet_type") || "").trim();
    const destination = String(formData.get("destination") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const approxDate = String(formData.get("approx_date") || "").trim();

    if (!approxDate) {
      setApproxDateError("Selecciona un mes estimado para el viaje.");
      setIsMonthPickerOpen(true);
      monthPickerButtonRef.current?.focus();
      return;
    }

    const whatsappMessage = [
      "Hola WOW Travel, quiero empezar mi proceso de viaje.",
      "",
      `Nombre: ${name}`,
      `Tipo de mascota: ${petType}`,
      `Pais de destino: ${formatCountryLabel(destination)}`,
      `Telefono: ${phone}`,
      `Fecha aproximada de viaje: ${formatTravelMonth(approxDate) || approxDate}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    const newWindow = window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    if (!newWindow) {
      window.location.href = whatsappUrl;
    }
  };

  const selectedTravelMonth = parseTravelMonthValue(approxDate);
  const monthPickerPanel = isMonthPickerOpen && monthPickerPanelStyle
    ? createPortal(
        <div
          className="registration__month-panel"
          id="travel-month-picker"
          role="dialog"
          aria-label="Selecciona mes y ano de viaje"
          ref={monthPickerPanelRef}
          style={monthPickerPanelStyle}
        >
          <div className="registration__month-header">
            <button
              type="button"
              className="registration__month-nav"
              onClick={() => setVisibleYear((year) => year - 1)}
              disabled={visibleYear <= currentYear}
              aria-label="Ver ano anterior"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <span>{visibleYear}</span>
            <button
              type="button"
              className="registration__month-nav"
              onClick={() => setVisibleYear((year) => year + 1)}
              aria-label="Ver ano siguiente"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>

          <div className="registration__month-grid">
            {travelMonthOptions.map((monthLabel, monthIndex) => {
              const isDisabled =
                visibleYear === currentYear && monthIndex < currentMonthIndex;
              const isSelected =
                selectedTravelMonth?.year === visibleYear &&
                selectedTravelMonth?.monthIndex === monthIndex;

              return (
                <button
                  key={`${visibleYear}-${monthLabel}`}
                  type="button"
                  className={`registration__month-option ${
                    isSelected ? "is-active" : ""
                  }`}
                  onClick={() => handleSelectTravelMonth(visibleYear, monthIndex)}
                  disabled={isDisabled}
                >
                  {monthLabel}
                </button>
              );
            })}
          </div>
        </div>,
        document.body,
      )
    : null;

  return (
    <section className="registration__area">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="registration__inner-wrap">
              <h2 className="title">Empecemos tu proceso de viaje</h2>

              <div className="shape">
                <img src={registrationShape} alt="" />
              </div>

              <form onSubmit={handleSubmit}>
                <div className="row gutter-15">
                  <div className="col-lg-4 col-md-6">
                    <div className="form-grp">
                      <label htmlFor="name">Nombre</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Escribe tu nombre completo"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6">
                    <div className="form-grp select-grp">
                      <label htmlFor="pet_type">Tipo de mascota</label>
                      <select
                        id="pet_type"
                        name="pet_type"
                        className="orderby"
                        defaultValue=""
                        required
                      >
                        <option value="" disabled>
                          Selecciona tipo de mascota
                        </option>
                        <option value="Perro">Perro</option>
                        <option value="Gato">Gato</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6">
                    <div className="form-grp select-grp">
                      <label htmlFor="destination">Pais de destino</label>
                      <select
                        id="destination"
                        name="destination"
                        className="orderby"
                        defaultValue=""
                        required
                      >
                        <option value="" disabled>
                          Selecciona
                        </option>
                        {destinationOptions.map((country) => (
                          <option key={country} value={country}>
                            {formatCountryLabel(country)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <div className="form-grp">
                      <label htmlFor="phone">Telefono</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+51 912 345 678"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <div className="form-grp">
                      <label htmlFor="approx_date">Fecha aproximada de viaje</label>
                      <div className="registration__month-picker" ref={monthPickerRef}>
                        <input type="hidden" id="approx_date" name="approx_date" value={approxDate} />
                        <button
                          ref={monthPickerButtonRef}
                          type="button"
                          className={`registration__month-trigger ${
                            isMonthPickerOpen ? "is-open" : ""
                          } ${!approxDate ? "is-placeholder" : ""}`}
                          onClick={handleToggleMonthPicker}
                          onKeyDown={handleMonthPickerKeyDown}
                          aria-haspopup="dialog"
                          aria-expanded={isMonthPickerOpen}
                          aria-controls="travel-month-picker"
                        >
                          <span className="registration__month-trigger-text">
                            {approxDate ? formatTravelMonth(approxDate) : "Selecciona mes y año"}
                          </span>
                          <span className="registration__month-trigger-icon" aria-hidden="true">
                            <i className="flaticon-calendar-1"></i>
                          </span>
                        </button>
                      </div>
                      {approxDateError ? (
                        <p className="registration__month-error">{approxDateError}</p>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="submit__btn text-center mt-25">
                  <button type="submit" className="btn">
                    Continuar por WhatsApp
                    <img src={rightArrow} alt="" className="injectable" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {monthPickerPanel}
    </section>
  );
}
