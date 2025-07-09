import React from "react";
import Link from "next/link";
import { VideoPlayer } from "../video/VideoPlayer";

const h3AboutImg01 = "/images/h3_about_img01.png";
const h3AboutImg02 = "/images/h3_about_img02.png";
const author01 = "/images/author_01.png";
const author02 = "/images/author_02.png";
const author03 = "/images/author_03.png";
const author04 = "/images/author_04.png";
const petIcon01 = "/icon/pet_icon01.svg";
const petIcon02 = "/icon/pet_icon02.svg";
const rightArrow = "/icon/right_arrow.svg";
const h3AboutShape = "/images/h3_about_shape.png";

export const AboutThree = () => {
  return (
    <section className="about__area-three">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5 col-md-7">
            <div className="about__img-three">
              <img src={h3AboutImg01} alt="img" />
              <div
                className="customer__review customer__review-two"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div className="customer__review-img">
                  <ul className="list-wrap">
                    <li>
                      <img src={author01} alt="" />
                    </li>
                    <li>
                      <img src={author02} alt="" />
                    </li>
                    <li>
                      <img src={author03} alt="" />
                    </li>
                    <li>
                      <img src={author04} alt="" />
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
              <div
                className="healthy-pets healthy-pets-two"
                data-aos="zoom-in"
                data-aos-delay="400"
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
          <div className="col-lg-3 col-md-5 order-0 order-lg-3">
            <div className="about__video-wrap">
              <img src={h3AboutImg02} alt="img" />
              <VideoPlayer
                trigger={
                  <a href="#vid" className="popup-video play-btn">
                    <i className="fas fa-play"></i>
                  </a>
                }
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="about__content-three">
              <div className="section__title mb-10">
                <span className="sub-title">
                  WE LOVE OUR JOB!
                  <strong className="shake">
                    <img src={petIcon02} alt="" className="injectable" />
                  </strong>
                </span>
                <h2 className="title">Adopt Pets And Save Their Lives</h2>
              </div>
              <p>
                We will work with you to develop individualised care plans
                including management chronic diseases. We areommit ted to being
                the network providing healthcare centered care that inspires.
              </p>
              <Link href="/about" className="btn">
                Contact With Us
                <img src={rightArrow} alt="" className="injectable" />
              </Link>
              <div className="shape">
                <img src={h3AboutShape} alt="shape" className="ribbonRotate" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
