import React from "react";
import Link from "next/link";

const servicesShape01 = "/images/services_shape01.svg";
const servicesShape02 = "/images/services_shape02.svg";
const servicesIconShape = "/images/services_icon_shape.svg";

const getServiceWhatsappUrl = (title) =>
  `https://wa.me/51941482291?text=${encodeURIComponent(`Hola WOW Travel, quiero informacion sobre ${title.toLowerCase()}.`)}`;

export const ServiceOneItem = ({ icon, title }) => {
  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
      <div className="services__item">
        <div className="services__shape">
          <div className="shape-one">
            <img src={servicesShape01} alt="" className="injectable" />
          </div>
          <div className="shape-two">
            <img src={servicesShape02} alt="" className="injectable" />
          </div>
        </div>
        <div className="services__icon">
          <i className={icon}></i>
          <div className="services__icon-shape">
            <img src={servicesIconShape} alt="" className="injectable" />
          </div>
        </div>
        <div className="services__content">
          <h4 className="title">
            <Link href={getServiceWhatsappUrl(title)} target="_blank" rel="noreferrer">
              {title}
            </Link>
          </h4>
        </div>
      </div>
    </div>
  );
};
