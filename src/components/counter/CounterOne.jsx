import React from "react";
import Link from "next/link";
import { Odometer } from "../odometer/Odometer";

const counterImg = "/images/counter_img.jpg";
const counterImgShape = "/images/counter_img_shape.svg";
const counterShape01 = "/images/counter_shape01.png";
const counterShape02 = "/images/counter_shape02.png";
const petIcon02 = "/icon/pet_icon02.svg";
const rightArrow = "/icon/right_arrow.svg";

export const CounterOne = () => {
  return (
    <section className="counter__area">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-5 col-md-8 order-0 order-lg-2">
            <div className="counter__img">
              <div className="mask-img-wrap">
                <img src={counterImg} alt="img" />
              </div>
              <div className="counter__img-shape">
                <img src={counterImgShape} alt="" className="injectable" />
              </div>
              <div className="shape">
                <img src={counterShape01} alt="img" className="ribbonRotate" />
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-7">
            <div className="counter__content">
              <div className="section__title white-title mb-10">
                <span className="sub-title">
                  Tu confianza, nuestra prioridad
                  <strong className="shake">
                    <img src={petIcon02} alt="" className="injectable" />
                  </strong>
                </span>
                <h2 className="title">
                  Servicio profesional y viajes con calidad garantizada
                </h2>
              </div>
              <p>
                En WOW Travel organizamos el viaje de tu mascota de forma completa, segura y sin errores. Nos ocupamos de todo: desde los documentos hasta el vuelo.
              </p>
              <Link href="/nosotros" className="btn border-btn white-btn">
                Saber más
                <img src={rightArrow} alt="" className="injectable" />
              </Link>
            </div>
          </div>

          {/* counters */}
          <div className="col-lg-3 col-md-5 order-3">
            <div className="counter__item-wrap">
              <div className="counter__item">
                <h2 className="count">
                  <Odometer end={3} suffix="+" />
                </h2>
                <p>Años de experiencia</p>
              </div>
              <div className="counter__item">
                <h2 className="count">
                  <Odometer end={230} suffix="+" />
                </h2>
                <p>Mascotas trasladadas</p>
              </div>
              <div className="counter__item">
                <h2 className="count">
                  <Odometer end={100} suffix="%" />
                </h2>
                <p>Clientes satisfechos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="counter__shape">
        <img
          src={counterShape02}
          alt="img"
          data-aos="fade-up-left"
          data-aos-delay="400"
        />
      </div>
    </section>
  );
};

