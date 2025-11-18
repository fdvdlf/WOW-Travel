import React from "react";
import { ServiceOneItem } from "./ServiceOneItem";

const petIcon = "/icon/pet_icon02.svg";
const servicesShapeImg01 = "/images/services_shape01.png";
const servicesShapeImg02 = "/images/services_shape02.png";
const servicesShapeImg03 = "/images/services_shape03.png";

export const ServiceOne = () => {
  const list = [
    {
      icon: "flaticon-vaccine",
      title: "Trámite sanitario",
      description:
        "Te guiamos en todas las atenciones sanitarias que tu mascota necesita: microchip, certificados, vacunas y requisitos oficiales según el país destino.",
    },
    {
      icon: "flaticon-beauty-saloon",
      title: "Gestión documental",
      description:
        "Organizamos, revisamos y verificamos toda la documentación requerida, para que cumplas con cada normativa sin complicaciones.",
    },
    {
      icon: "flaticon-vet",
      title: "Preparación de viaje",
      description:
        "Te acompañamos en la preparación completa del viaje: requisitos previos, tiempos, recomendaciones, transporte al aeropuerto y checklist final para un proceso fluido.",
    },
    {
      icon: "flaticon-spay",
      title: "Asesoría personalizada",
      description:
        "Recibes guía personalizada durante todo el proceso. Estamos contigo en cada paso, resolviendo dudas y asegurando que todo salga bien.",
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
              <h2 className="title">
                Servicios integrales para viajes seguros y certificados
              </h2>
              <p className="mb-0">
                Todo lo necesario para preparar el viaje de tu mascota de manera clara, ordenada y sin estrés.
              </p>
            </div>
          </div>
        </div>

        {/* list */}
        <div className="row justify-content-center">
          {list.map((el) => (
            <ServiceOneItem
              key={el.icon}
              icon={el.icon}
              title={el.title}
              description={el.description}
            />
          ))}
        </div>
      </div>

      {/* shapes */}
      <div className="services__shape-wrap">
        <img src={servicesShapeImg01} alt="img" className="ribbonRotate" />
        <img
          src={servicesShapeImg02}
          alt="img"
          data-aos="fade-up-right"
          data-aos-delay="800"
        />
        <img
          src={servicesShapeImg03}
          alt="img"
          data-aos="fade-down-left"
          data-aos-delay="400"
        />
      </div>
    </section>
  );
};
