"use client";

import React from "react";
import Link from "next/link";

const bannerBg = "/banner/banner_bg.jpg";
const titleImg01 = "/banner/banner_title_img01.png";
const titleImg02 = "/banner/banner_title_img02.png";
const rightArrow = "/icon/right_arrow.svg";
const bannerImg01 = "/banner/banner_img01.png";
const petIcon01 = "/icon/pet_icon01.svg";
const bannerShape01 = "/banner/banner_shape01.png";
const bannerShape02 = "/banner/banner_shape02.png";
const bannerShape03 = "/banner/banner_shape03.png";
const bannerShape04 = "/banner/banner_shape04.png";

export const BannerOne = () => {
  return (
    <section
      className="banner__area banner__bg"
      style={{ backgroundImage: `url(${bannerBg})` }}
    >
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-xl-5 col-lg-6">
            <div className="banner__content">
              <h2 className="title" data-aos="fade-up" data-aos-delay="200">
                Trusted Pet
                <img src={titleImg01} alt="" />
                care & Veterinary Center
                <span className="icon">
                  <img src={titleImg02} alt="" />
                </span>
                Point
              </h2>
              <p data-aos="fade-up" data-aos-delay="400">
                Template Kit uses demo images from Envato Elements Follower will
                need to license these images from Envato.
              </p>
              <Link
                href="/about"
                className="btn"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                Read More
                <img src={rightArrow} alt="" className="injectable" />
              </Link>
            </div>
          </div>
          <div className="col-xl-7 col-lg-6 col-md-9">
            <div className="banner__img text-end">
              <img
                src={bannerImg01}
                alt="img"
                data-aos="fade-left"
                data-aos-delay="800"
              />
              <div
                className="healthy-pets"
                data-aos="zoom-in"
                data-aos-delay="1000"
              >
                <div className="icon">
                  <img src={petIcon01} alt="" className="injectable" />
                </div>
                <div className="content">
                  <h6 className="circle rotateme">
                    BETTER - HEALTHY - PETS - LOVE -
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="banner__shape-wrap">
        <img
          src={bannerShape01}
          alt="img"
          data-aos="fade-down"
          data-aos-delay="1200"
        />
        <img
          src={bannerShape02}
          alt="img"
          data-aos="fade-up-right"
          data-aos-delay="1200"
        />
        <img src={bannerShape03} alt="img" className="ribbonRotate" />
        <img src={bannerShape04} alt="img" />
      </div>
    </section>
  );
};
