"use client";

import React from "react";
import { Swiper, SwiperSlide } from "../swiper/SwiperRoot";

const brand1 = "/brand/h2_brand_img01.png";
const brand2 = "/brand/h2_brand_img02.png";
const brand3 = "/brand/h2_brand_img03.png";
const brand4 = "/brand/h2_brand_img04.png";
const brand5 = "/brand/h2_brand_img05.png";
const brand6 = "/brand/h2_brand_img06.png";
const brand7 = "/brand/h2_brand_img07.png";

export const BrandFour = () => {
  const brandData = [
    { img: brand1, alt: "Brand 1" },
    { img: brand2, alt: "Brand 2" },
    { img: brand3, alt: "Brand 3" },
    { img: brand4, alt: "Brand 4" },
    { img: brand5, alt: "Brand 5" },
    { img: brand6, alt: "Brand 6" },
    { img: brand7, alt: "Brand 7" },
    { img: brand3, alt: "Brand 8" },
  ];

  const swiperSettings = {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    breakpoints: {
      1200: {
        slidesPerView: 7,
      },
      992: {
        slidesPerView: 5,
      },
      768: {
        slidesPerView: 4,
      },
      576: {
        slidesPerView: 3,
      },
      0: {
        slidesPerView: 2,
      },
    },
  };

  return (
    <div className="brand__area-four">
      <div className="container">
        <div className="brand__title">
          <h5 className="title">{`Trusted By The World’s Best`}</h5>
        </div>

        <Swiper {...swiperSettings} className="brand-active">
          {brandData.map((brand, index) => (
            <SwiperSlide key={index}>
              <div className="brand__item brand__item-two">
                <img src={brand.img} alt={brand.alt} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
