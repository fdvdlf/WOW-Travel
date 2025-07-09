import React from "react";
import { VideoPlayer } from "../video/VideoPlayer";

const aboutImg = "/images/about_img.png";
const videoShape = "/images/about_video_shape.svg";
const petIcon = "/icon/pet_icon02.svg";
const experienceShape = "/images/experience_shape.svg";
const authorSign = "/images/author_sign.png";
const author1 = "/images/author_01.png";
const author2 = "/images/author_02.png";
const author3 = "/images/author_03.png";
const author4 = "/images/author_04.png";
const aboutShape1 = "/images/about_shape01.png";
const aboutShape2 = "/images/about_shape02.png";
const aboutShape3 = "/images/about_shape03.png";

export const AboutOne = () => {
  return (
    <section className="about__area">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-xl-5 col-lg-6 col-md-8">
            <div className="about__img">
              <img src={aboutImg} alt="" />
              <div className="video__box">
                <div className="video__box-shape">
                  <img src={videoShape} alt="" className="injectable" />
                </div>
                <h5 className="title">
                  Watch Our <br />
                  Working Video
                </h5>

                <VideoPlayer
                  trigger={
                    <a href="#vid" className="popup-video play-btn">
                      <i className="fas fa-play"></i>
                    </a>
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-xl-7 col-lg-6">
            <div className="about__content">
              <div className="section__title mb-20">
                <span className="sub-title">
                  Know More Us
                  <strong className="shake">
                    <img src={petIcon} alt="" className="injectable" />
                  </strong>
                </span>
                <h2 className="title">
                  Our Passion Is Providing <br />
                  Superior Pet Care
                </h2>
              </div>
              <div className="about__content-inner">
                <div className="experience__box">
                  <div className="experience__box-shape">
                    <img src={experienceShape} alt="" className="injectable" />
                  </div>
                  <div className="experience__box-content">
                    <h4 className="title">
                      15 <span>Yr</span>
                    </h4>
                    <p>Experience</p>
                  </div>
                </div>
                <p>
                  Come see how I’m styling these final days of summer with
                  bright palettes and pops of color that will dazzle your
                  wardrobe year round!
                </p>
              </div>
              <p>
                We will work with you to develop individualised care plans,
                including management of chronic diseases. We are committed to
                being the region’s premier healthcare network providing patient
                centered care that inspires.
              </p>
              <div className="about__content-bottom">
                <div className="about__content-sign">
                  <img src={authorSign} alt="" />
                </div>
                <div className="customer__review">
                  <div className="customer__review-img">
                    <ul className="list-wrap">
                      <li>
                        <img src={author1} alt="" />
                      </li>
                      <li>
                        <img src={author2} alt="" />
                      </li>
                      <li>
                        <img src={author3} alt="" />
                      </li>
                      <li>
                        <img src={author4} alt="" />
                      </li>
                    </ul>
                  </div>
                  <div className="customer__review-content">
                    <div className="rating">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                    <span>4.7 (1,567 Reviews)</span>
                  </div>
                </div>
              </div>
              <div className="shape">
                <img
                  src={aboutShape2}
                  alt="img"
                  data-aos="fade-down-left"
                  data-aos-delay="400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="about__shape-wrap">
        <img
          src={aboutShape1}
          alt="img"
          data-aos="fade-up-right"
          data-aos-delay="800"
        />
        <img src={aboutShape3} alt="img" className="ribbonRotate" />
      </div>
    </section>
  );
};
