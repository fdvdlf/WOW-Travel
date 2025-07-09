import React from "react";

const petIcon = "/icon/pet_icon02.svg";
const whyIcon1 = "/icon/why_icon01.svg";
const whyIcon2 = "/icon/why_icon02.svg";
const whyIcon3 = "/icon/why_icon03.svg";
const whyShape1 = "/images/why_item_shape01.svg";
const whyShape2 = "/images/why_item_shape02.svg";
const shapeImg1 = "/images/h2_why_shape01.png";
const shapeImg2 = "/images/h2_why_shape02.png";

export const WhyWeAreTwo = () => {
  return (
    <section className="why__we-are-area-two">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="section__title text-center mb-40">
              <span className="sub-title">
                Why we are the best
                <strong className="shake">
                  <img src={petIcon} alt="" className="injectable" />
                </strong>
              </span>
              <h2 className="title">See How Petpal can Help</h2>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                <br />
                amily and deserves ets are the best care.
              </p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 col-sm-10">
            <div className="why__we-are-item">
              <div className="why__we-are-item-icon">
                <img src={whyIcon1} alt="" className="injectable" />
              </div>
              <div className="why__we-are-item-content">
                <h4 className="title">Health Guarantee</h4>
                <p>
                  Duis aute irure dolor in reprehenderit voluptate velit essed
                  eservesets are their health best care
                </p>
              </div>
              <div className="why__we-are-item-shape">
                <div className="shape-one">
                  <img src={whyShape1} alt="" className="injectable" />
                </div>
                <div className="shape-two">
                  <img src={whyShape2} alt="" className="injectable" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-10">
            <div className="why__we-are-item">
              <div className="why__we-are-item-icon">
                <img src={whyIcon2} alt="" className="injectable" />
              </div>
              <div className="why__we-are-item-content">
                <h4 className="title">Ethical breeding</h4>
                <p>
                  Duis aute irure dolor in reprehenderit voluptate velit essed
                  eservesets are their health best care
                </p>
              </div>
              <div className="why__we-are-item-shape">
                <div className="shape-one">
                  <img src={whyShape1} alt="" className="injectable" />
                </div>
                <div className="shape-two">
                  <img src={whyShape2} alt="" className="injectable" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-10">
            <div className="why__we-are-item">
              <div className="why__we-are-item-icon">
                <img src={whyIcon3} alt="" className="injectable" />
              </div>
              <div className="why__we-are-item-content">
                <h4 className="title">Transparent Policy</h4>
                <p>
                  Duis aute irure dolor in reprehenderit voluptate velit essed
                  eservesets are their health best care
                </p>
              </div>
              <div className="why__we-are-item-shape">
                <div className="shape-one">
                  <img src={whyShape1} alt="" className="injectable" />
                </div>
                <div className="shape-two">
                  <img src={whyShape2} alt="" className="injectable" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="why__shape-wrap">
        <img
          src={shapeImg1}
          alt="shape"
          data-aos="fade-down-right"
          data-aos-delay="400"
        />
        <img src={shapeImg2} alt="shape" className="ribbonRotate" />
      </div>
    </section>
  );
};
