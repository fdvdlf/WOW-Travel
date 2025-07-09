import React from "react";
import Link from "next/link";
import { ServiceOneItem } from "./ServiceOneItem";

const petIcon = "/icon/pet_icon02.svg";
const rightArrow = "/icon/right_arrow.svg";
const servicesShapeImg01 = "/images/services_shape01.png";
const servicesShapeImg02 = "/images/services_shape02.png";
const servicesShapeImg03 = "/images/services_shape03.png";

export const ServiceOne = () => {
  const list = [
    { icon: "flaticon-vaccine", title: "Trámite Sanitario" },
    { icon: "flaticon-beauty-saloon", title: "Gestión Documental" },
    { icon: "flaticon-vet", title: "Reserva de Vuelo" },
    { icon: "flaticon-spay", title: "Asesoría Personal" },
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
            </div>
          </div>
          <div className="col-xl-6 col-lg-5">
            <div className="view__all-btn text-end mb-40">
              <Link href="/servicios" className="btn border-btn">
                Ver todos los servicios
                <img src={rightArrow} alt="" className="injectable" />
              </Link>
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
