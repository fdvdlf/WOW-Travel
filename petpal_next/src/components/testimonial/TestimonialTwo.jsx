"use client";

import React from "react";
import { Swiper, SwiperSlide, modules } from "../swiper/SwiperRoot";

const quoteIcon = "/icon/quote.svg";
const testimonialAuthor = "/images/testi_author01.png";
const rightArrow = "/icon/right_arrow03.svg";
const testimonialShape1 = "/images/h2_testimonial_shape01.png";
const testimonialShape2 = "/images/h2_testimonial_shape02.png";

export const TestimonialTwo = () => {
  const swiperSettings = {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    breakpoints: {
      1200: {
        slidesPerView: 1,
      },
      992: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 1,
      },
      0: {
        slidesPerView: 1,
      },
    },
    // Navigation arrows
    modules: modules,
    navigation: {
      nextEl: ".testimonial-button-next",
      prevEl: ".testimonial-button-prev",
    },
  };

  return (
    <section className="testimonial__area-two">
      <div className="container">
        <div className="testimonial__item-wrap-two">
          <Swiper {...swiperSettings} className="testimonial-active-two">
            <SwiperSlide>
              <div className="testimonial__item-two">
                <div className="testimonial__icon-two">
                  <img src={quoteIcon} alt="" className="injectable" />
                </div>
                <div className="testimonial__content-two">
                  <h2 className="title">Pet Health Important</h2>
                  <p>
                    “ Duis aute irure dolor in repreerit in voluptate velitesse
                    We understand that your furry aute irure dolor in repreerit
                    in voluptate just about the best thing you can do. dolor in
                    repreerit in voluptate understand that you ”
                  </p>
                  <div className="testimonial__author-two">
                    <div className="testimonial__author-thumb">
                      <img src={testimonialAuthor} alt="" />
                    </div>
                    <div className="testimonial__author-content">
                      <h4 className="title">Uraney Jacke</h4>
                      <span>Business Study</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="testimonial__item-two">
                <div className="testimonial__icon-two">
                  <img src={quoteIcon} alt="" className="injectable" />
                </div>
                <div className="testimonial__content-two">
                  <h2 className="title">Pet Health Important</h2>
                  <p>
                    “ Duis aute irure dolor in repreerit in voluptate velitesse
                    We understand that your furry aute irure dolor in repreerit
                    in voluptate just about the best thing you can do. dolor in
                    repreerit in voluptate understand that you ”
                  </p>
                  <div className="testimonial__author-two">
                    <div className="testimonial__author-thumb">
                      <img src={testimonialAuthor} alt="" />
                    </div>
                    <div className="testimonial__author-content">
                      <h4 className="title">Uraney Jacke</h4>
                      <span>Business Study</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>

          <div className="testimonial__nav-wrap">
            <button className="testimonial-button-prev">
              <img src={rightArrow} alt="" className="injectable" />
            </button>
            <button className="testimonial-button-next">
              <img src={rightArrow} alt="" className="injectable" />
            </button>
          </div>

          <div className="shape">
            <img src={testimonialShape1} alt="" />
          </div>
        </div>
      </div>
      <div className="testimonial__shape-wrap-two">
        <img
          src={testimonialShape2}
          alt="img"
          data-aos="fade-down-left"
          data-aos-delay="400"
        />
      </div>
    </section>
  );
};
