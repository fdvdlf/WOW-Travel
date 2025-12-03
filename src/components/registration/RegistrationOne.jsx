import React from "react";

const registrationShape = "/images/registration_shape.svg";
const rightArrow = "/icon/right_arrow.svg";

export const RegistrationOne = () => {
  return (
    <section className="registration__area">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="registration__inner-wrap">
              {/* título */}
              <h2 className="title">Empecemos tu proceso de viaje</h2>

              {/* forma decorativa */}
              <div className="shape">
                <img src={registrationShape} alt="" />
              </div>

              {/* formulario */}
              <form action="#">
                <div className="row gutter-15">
                  {/* 1. Nombre */}
                  <div className="col-lg-4 col-md-6">
                    <div className="form-grp">
                      <label htmlFor="name">Nombre</label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Escribe tu nombre completo"
                      />
                    </div>
                  </div>

                  {/* 2. Tipo de mascota */}
                  <div className="col-lg-4 col-md-6">
                    <div className="form-grp select-grp">
                      <label>Tipo de mascota</label>
                      <select name="pet_type" className="orderby" defaultValue="">
                        <option value="" disabled>
                          Selecciona tipo de mascota
                        </option>
                        <option value="Perro">Perro</option>
                        <option value="Gato">Gato</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>
                  </div>

                  {/* 3. País de destino */}
                  <div className="col-lg-4 col-md-6">
                    <div className="form-grp select-grp">
                      <label htmlFor="destination">País de destino</label>
                      <select name="destination" id="destination" className="orderby" defaultValue="">
                        <option value="" disabled>
                          Selecciona
                        </option>
                        {[
                          "ALEMANIA", "ARGENTINA", "AUSTRALIA", "AUSTRIA", "BELGICA", "BOLIVIA", "BRASIL", "BULGARIA", "CANADA", "CHILE",
                          "CHINA", "CHIPRE", "COLOMBIA", "COREA DEL SUR", "COSTA RICA", "CROACIA", "CUBA", "DINAMARCA", "ECUADOR", "EEUU",
                          "EGIPTO", "EL SALVADOR", "EMIRATOS ARABES UNIDOS", "ESLOVAQUIA", "ESLOVENIA", "ESPAÑA", "ESTONIA", "FILIPINAS",
                          "FINLANDIA", "FRANCIA", "GRECIA", "GUATEMALA", "HONDURAS", "HUNGRIA", "INDIA", "INDONESIA", "IRLANDA", "ISRAEL",
                          "ITALIA", "JAPON", "LETONIA", "LITUANIA", "LUXEMBURGO", "MALASIA", "MALTA", "MARRUECOS", "MEXICO", "NICARAGUA",
                          "NORUEGA", "PAISES BAJOS", "PANAMA", "PARAGUAY", "POLONIA", "PORTUGAL", "QATAR", "REINO DE ARABIA SAUDITA",
                          "REINO UNIDO", "REPUBLICA CHECA", "REPUBLICA DOMINICANA", "RUMANIA", "RUSIA", "SERBIA", "SUDAFRICA", "SUECIA",
                          "SUIZA", "TAILANDIA", "TAIWAN", "TRINIDAD Y TOBAGO", "URUGUAY", "VENEZUELA", "VIETNAM", "ZAMBIA"
                        ].map((pais) => (
                          <option key={pais} value={pais}>
                            {pais
                              .toLowerCase()
                              .split(" ")
                              .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
                              .join(" ")}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* 4. Teléfono */}
                  <div className="col-lg-6 col-md-6">
                    <div className="form-grp">
                      <label htmlFor="phone">Teléfono</label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+51 912 345 678"
                      />
                    </div>
                  </div>

                  {/* 5. Fecha aproximada de viaje */}
                  <div className="col-lg-6 col-md-6">
                    <div className="form-grp">
                      <label htmlFor="approx_date">Fecha aproximada de viaje</label>
                      <input
                        id="approx_date"
                        type="month"
                        min="2026-01"
                        defaultValue="2026-01"
                        placeholder="mm/aaaa"
                      />
                    </div>
                  </div>
                </div>

                {/* botón */}
                <div className="submit__btn text-center mt-25">
                  <button type="submit" className="btn">
                    Iniciar
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
};
