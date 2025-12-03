import React from "react";
import { ServiceOneItem } from "./ServiceOneItem";

const petIcon = "/icon/pet_icon02.svg";
const servicesShapeImg01 = "/images/services_shape01.png";
const servicesShapeImg02 = "/images/services_shape02.png";
const servicesShapeImg03 = "/images/services_shape03.png";

export const ServiceOne = () => {
  const list = [
    {
      icon: "flaticon-animals",
      title: "Microchip y Validación RFID",
    },
    {
      icon: "flaticon-vaccine",
      title: "Vacuna Antirrábica y Control Sanitario",
    },
    {
      icon: "flaticon-loupe",
      title: "Certificados y Documentos Oficiales",
    },
    {
      icon: "flaticon-love",
      title: "Acompañamiento Psicológico para Viajes",
    },
  ];

  return (
    <section className="services__area">
      <div className="container">
        {/* headers */}
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-7">
            <div className="section__title mb-40">
              <span className="sub-title">
                Expertos en viajes de mascotas
                <strong className="shake">
                  <img src={petIcon} alt="" className="injectable" />
                </strong>
              </span>
              <h2 className="title">Servicios que necesita tu mascota para viajar sin problemas</h2>
              <p className="mb-0">
                Todo lo que tu mascota requiere para un viaje seguro, ordenado y sin estrés.
              </p>
            </div>
          </div>
        </div>

        {/* list */}
        <div className="row justify-content-center">
          {list.map((el) => (
            <ServiceOneItem key={el.icon} icon={el.icon} title={el.title} />
          ))}
        </div>
      </div>

      {/* shapes */}
      <div className="services__shape-wrap">
        <img src={servicesShapeImg01} alt="img" className="ribbonRotate" />
        <img src={servicesShapeImg02} alt="img" data-aos="fade-up-right" data-aos-delay="800" />
        <img src={servicesShapeImg03} alt="img" data-aos="fade-down-left" data-aos-delay="400" />
      </div>
    </section>
  );
};
