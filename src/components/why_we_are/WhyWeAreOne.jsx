import React from "react";

const whyWeAreImg = "/images/why_we_are_img.png";
const whyShape1 = "/images/why_shape01.svg";
const whyShape2 = "/images/why_shape02.svg";
const whyShape3 = "/images/why_shape03.svg";
const whyShape4 = "/images/why_shape04.svg";
const petIcon = "/icon/pet_icon02.svg";
const checkIcon = "/icon/check_icon.svg";

export const WhyWeAreOne = () => {
  return (
    <section className="why__we-are-area">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          {/* images */}
          <div className="col-lg-6 col-md-8 col-sm-10">
            <div className="why__we-are-img">
              <img src={whyWeAreImg} alt="" />
              <div className="shape shape-one" data-aos="fade-down-right" data-aos-delay="500">
                <img src={whyShape1} alt="" className="injectable" />
              </div>
              <div className="shape shape-two" data-aos="fade-up-right" data-aos-delay="500">
                <img src={whyShape2} alt="" className="injectable" />
              </div>
              <div className="shape shape-three" data-aos="fade-up-left" data-aos-delay="500">
                <img src={whyShape3} alt="" className="injectable" />
              </div>
              <div className="shape shape-four ribbonRotate">
                <img src={whyShape4} alt="" className="injectable" />
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="why__we-are-content">
              <div className="section__title mb-10">
                <span className="sub-title">
                  ACOMPAÑAMIENTO PERSONALIZADO
                  <strong className="shake">
                    <img src={petIcon} alt="" className="injectable" />
                  </strong>
                </span>
                <h2 className="title">Te acompañamos siempre</h2>
              </div>
              <p>
                Viajar con una mascota implica documentos, tiempos, validaciones y requisitos que pueden ser confusos. Nuestra labor
                es hacer que todo este proceso sea simple, seguro y sin estrés, tanto para ti como para tu mascota.
              </p>

              <div className="why__list-box">
                <ul className="list-wrap">
                  <li>
                    <div className="why__list-box-item">
                      <div className="why__list-box-item-top">
                        <div className="icon">
                          <img src={checkIcon} alt="" className="injectable" />
                        </div>
                        <h4 className="title">Experiencia real en viajes internacionales</h4>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="why__list-box-item">
                      <div className="why__list-box-item-top">
                        <div className="icon">
                          <img src={checkIcon} alt="" className="injectable" />
                        </div>
                        <h4 className="title">Acompañamiento y asesoría personalizada</h4>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="why__list-box-item">
                      <div className="why__list-box-item-top">
                        <div className="icon">
                          <img src={checkIcon} alt="" className="injectable" />
                        </div>
                        <h4 className="title">Precios claros y sin sorpresas</h4>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="why__list-box-item">
                      <div className="why__list-box-item-top">
                        <div className="icon">
                          <img src={checkIcon} alt="" className="injectable" />
                        </div>
                        <h4 className="title">Un proceso tranquilo y guiado paso a paso</h4>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
