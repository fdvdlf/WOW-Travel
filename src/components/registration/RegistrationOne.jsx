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
              <h2 className="title">¡Agenda tu asesoría hoy mismo!</h2>

              {/* forma decorativa */}
              <div className="shape">
                <img src={registrationShape} alt="" />
              </div>

              {/* formulario */}
              <form action="#">
                <div className="row gutter-15">
                  {/* Nombre */}
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

                  {/* Tipo de mascota */}
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

                  {/* Servicio de interés */}
                  <div className="col-lg-4 col-md-6">
                    <div className="form-grp select-grp">
                      <label>Servicio de interés</label>
                      <select name="interest" className="orderby" defaultValue="">
                        <option value="" disabled>
                          Selecciona servicio
                        </option>
                        <option value="tramites">Trámites sanitarios</option>
                        <option value="documentos">
                          Documentación y pasaporte
                        </option>
                        <option value="vuelo">Reserva de vuelo</option>
                        <option value="asesoria">Asesoría completa</option>
                      </select>
                    </div>
                  </div>

                  {/* Fecha */}
                  <div className="col-lg-4 col-md-6">
                    <div className="form-grp">
                      <label htmlFor="date">Fecha</label>
                      <input
                        id="date"
                        className="textbox-n"
                        type="date"
                        placeholder="dd/mm/aaaa"
                      />
                    </div>
                  </div>

                  {/* Hora */}
                  <div className="col-lg-4 col-md-6">
                    <div className="form-grp">
                      <label htmlFor="time">Hora</label>
                      <input
                        id="time"
                        placeholder="08:00"
                        type="time"
                      />
                      <i className="flaticon-three-o-clock-clock"></i>
                    </div>
                  </div>

                  {/* Teléfono */}
                  <div className="col-lg-4 col-md-6">
                    <div className="form-grp">
                      <label htmlFor="phone">Teléfono</label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+51 9 123 456 78"
                      />
                    </div>
                  </div>
                </div>

                {/* botón */}
                <div className="submit__btn text-center mt-25">
                  <button type="submit" className="btn">
                    Comenzar reserva
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

