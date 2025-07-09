"use client";

import React from "react";
import { Swiper, SwiperSlide } from "../swiper/SwiperRoot";

const testimonialImg = "/images/testimonial_img.jpg";
const testimonialImgShape = "/images/testimonial_img_shape.svg";
const testimonialShape03 = "/images/testimonial_shape03.png";
const reviewShape = "/images/review_shape.svg";
const starIcon = "/icon/star.svg";
const quoteIcon = "/icon/quote.svg";
const testiAuthor = "/images/testi_author01.png";
const testimonialShape01 = "/images/testimonial_shape01.png";
const testimonialShape02 = "/images/testimonial_shape02.png";

export const TestimonialOne = () => {
  const swiperSettings = {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    breakpoints: {
      1200: { slidesPerView: 1 },
      992:  { slidesPerView: 1 },
      768:  { slidesPerView: 1 },
      576:  { slidesPerView: 1 },
      0:    { slidesPerView: 1 },
    },
  };

  return (
    <section className="testimonial__area">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          {/* imagen */}
          <div className="col-lg-6 col-md-8 order-0 order-lg-2">
            <div className="testimonial__img">
              <div className="mask-img testimonial__img-mask">
                <img src={testimonialImg} alt="img" />
              </div>
              <div className="testimonial__img-shape">
                <div className="shape-one">
                  <img src={testimonialImgShape} alt="" className="injectable" />
                </div>
                <div className="shape-two">
                  <img
                    src={testimonialShape03}
                    alt="img"
                    className="alltuchtopdown"
                  />
                </div>
              </div>
              <div className="review__box">
                <div className="review__box-shape">
                  <img src={reviewShape} alt="" className="injectable" />
                </div>
                <div className="review__box-content">
                  <img src={starIcon} alt="" className="injectable" />
                  <h2 className="title">1500+</h2>
                  <span>Opiniones</span>
                </div>
              </div>
            </div>
          </div>

          {/* testimonios */}
          <div className="col-lg-6">
            <div className="testimonial__item-wrap">
              <Swiper {...swiperSettings} className="testimonial-active">
                {/* Slide 1 */}
                <SwiperSlide>
                  <div className="testimonial__item">
                    <div className="testimonial__icon">
                      <img src={quoteIcon} alt="" className="injectable" />
                    </div>
                    <div className="testimonial__content">
                      <h2 className="title">Un viaje impecable a Madrid</h2>
                      <p>
                        “Cuando decidí mudarme a Madrid con mi gato, no sabía ni
                        por dónde empezar. WOW Travel se encargó del microchip,
                        certificados, trámites y reserva de vuelo. Me guiaron con
                        cariño y profesionalismo: ¡mi gato llegó feliz y yo
                        tranquila!”
                      </p>
                      <div className="testimonial__author">
                        <div className="testimonial__author-thumb">
                          <img src={testiAuthor} alt="" />
                        </div>
                        <div className="testimonial__author-content">
                          <h4 className="title">Natalia de la Flor</h4>
                          <span>Cliente – Viaje Lima → Madrid</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide>
                  <div className="testimonial__item">
                    <div className="testimonial__icon">
                      <img src={quoteIcon} alt="" className="injectable" />
                    </div>
                    <div className="testimonial__content">
                      <h2 className="title">Servicio confiable y humano</h2>
                      <p>
                        “WOW Travel hizo que viajar con mi perro fuera sencillo.
                        Gestionaron cada documento y estuvieron disponibles para
                        todas mis dudas. Recomiendo su servicio al 100 %.”
                      </p>
                      <div className="testimonial__author">
                        <div className="testimonial__author-thumb">
                          <img src={testiAuthor} alt="" />
                        </div>
                        <div className="testimonial__author-content">
                          <h4 className="title">Roberto Montalvo</h4>
                          <span>Cliente – Viaje a Ciudad de México</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>

      {/* formas decorativas */}
      <div className="testimonial__shape-wrap">
        <img
          src={testimonialShape01}
          alt="img"
          data-aos="fade-down-right"
          data-aos-delay="400"
        />
        <img
          src={testimonialShape02}
          alt="img"
          data-aos="fade-right"
          data-aos-delay="400"
        />
      </div>
    </section>
  );
};
