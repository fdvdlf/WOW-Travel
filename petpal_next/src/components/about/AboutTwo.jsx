import React from "react";
import Link from "next/link";

const h2AboutImg01 = "/images/h2_about_img01.jpg";
const h2AboutImg02 = "/images/h2_about_img02.jpg";
const h2AboutImgShape = "/images/h2_about_img_shape.svg";
const author01 = "/images/author_01.png";
const author02 = "/images/author_02.png";
const author03 = "/images/author_03.png";
const author04 = "/images/author_04.png";
const petIcon01 = "/icon/pet_icon01.svg";
const petIcon02 = "/icon/pet_icon02.svg";
const rightArrow = "/icon/right_arrow.svg";
const h2AboutShape01 = "/images/h2_about_shape01.png";
const h2AboutShape02 = "/images/h2_about_shape02.png";

export const AboutTwo = () => {
  return (
    <section className="about__area-two">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-xl-6 col-lg-7 col-md-9">
            <div className="about__img-two">
              <div
                className="mask-img-wrap"
                data-aos="fade-right"
                data-aos-delay="200"
              >
                <div className="mask-img">
                  <img src={h2AboutImg01} alt="img" />
                </div>
                <div className="shape">
                  <img src={h2AboutImgShape} alt="" className="injectable" />
                </div>
              </div>
              <div
                className="img-two"
                data-aos="fade-left"
                data-aos-delay="300"
              >
                <img src={h2AboutImg02} alt="img" />
              </div>
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
              <div className="shape">
                <img
                  src={h2AboutShape01}
                  alt="shape"
                  data-aos="fade-up-right"
                  data-aos-delay="600"
                />
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-5">
            <div className="about__content-two">
              <div className="section__title mb-15">
                <span className="sub-title">
                  WE LOVE OUR JOB!
                  <strong className="shake">
                    <img src={petIcon02} alt="" className="injectable" />
                  </strong>
                </span>
                <h2 className="title">
                  {`We'll Make Your Pets`} <br />
                  Really Happy
                </h2>
              </div>
              <p>
                {`We will work with you to develop individualised care plans,
                including management chronic diseases. We are committed to being
                the region's premier healthcare network providing patient
                centered care that inspires.`}
              </p>
              <Link href="/about" className="btn">
                Read More
                <img src={rightArrow} alt="" className="injectable" />
              </Link>
              <div className="shape">
                <img
                  src={h2AboutShape02}
                  alt="shape"
                  data-aos="fade-down-left"
                  data-aos-delay="800"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
