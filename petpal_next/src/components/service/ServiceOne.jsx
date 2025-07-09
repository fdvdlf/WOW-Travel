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
    { icon: "flaticon-vaccine", title: "Pet Vaccination" },
    { icon: "flaticon-beauty-saloon", title: "Pet Grooming" },
    { icon: "flaticon-vet", title: "Pet Veterinary" },
    { icon: "flaticon-spay", title: "Pet Surgery" },
  ];

  return (
    <section className="services__area">
      <div className="container">
        {/* headers */}
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-7">
            <div className="section__title mb-40">
              <span className="sub-title">
                Delivering world class home care
                <strong className="shake">
                  <img src={petIcon} alt="" className="injectable" />
                </strong>
              </span>
              <h2 className="title">
                Providing Our Best Pet Care & Veterinary Services
              </h2>
            </div>
          </div>
          <div className="col-xl-6 col-lg-5">
            <div className="view__all-btn text-end mb-40">
              <Link href="/animal/a-123" className="btn border-btn">
                See All Services
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
