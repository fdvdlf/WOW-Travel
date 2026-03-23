"use client";

import React from "react";

const registrationShape = "/images/registration_shape.svg";
const rightArrow = "/icon/right_arrow.svg";
const whatsappNumber = "51941482291";
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

export function RegistrationOne() {
  const currentMonth = new Date().toISOString().slice(0, 7);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const petType = String(formData.get("pet_type") || "").trim();
    const destination = String(formData.get("destination") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const approxDate = String(formData.get("approx_date") || "").trim();

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
                      <input
                        id="approx_date"
                        name="approx_date"
                        type="month"
                        min={currentMonth}
                        required
                      />
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
    </section>
  );
}
