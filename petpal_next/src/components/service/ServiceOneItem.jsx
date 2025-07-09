import React from "react";
import Link from "next/link";

const rightArrow02 = "/icon/right_arrow02.svg";
const servicesShape01 = "/images/services_shape01.svg";
const servicesShape02 = "/images/services_shape02.svg";
const servicesIconShape = "/images/services_icon_shape.svg";

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
            <Link href="/animal/a-123">{title}</Link>
          </h4>
          <p>
            We will work with you to develop individu alised care plans
            including
          </p>
          <Link href="/animal/a-123" className="btn border-btn">
            See Details
            <img src={rightArrow02} alt="" className="injectable" />
          </Link>
        </div>
      </div>
    </div>
  );
};
