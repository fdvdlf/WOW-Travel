import React from "react";
import Link from "next/link";

const rightArrow = "/icon/right_arrow.svg";
const ctaShape01 = "/images/cta_shape01.png";
const ctaImg = "/images/cta_img.png";
const ctaShape02 = "/images/cta_shape02.png";
const ctaShape03 = "/images/cta_shape03.png";

export const CtaOne = () => {
  return (
    <section className="cta__area fix">
      <div className="container">
        <div className="row align-items-end justify-content-center">
          <div className="col-lg-7">
            <div className="cta__content">
              <h2 className="title">
                Pets are not just animals, they are a part of your family
              </h2>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                We understand that your furry friend is a treasured membee.
              </p>
              <Link href="/about" className="btn">
                Read More
                <img src={rightArrow} alt="" className="injectable" />
              </Link>
              <div className="shape">
                <img
                  src={ctaShape01}
                  alt="shape"
                  data-aos="fade-up-right"
                  data-aos-delay="400"
                />
              </div>
            </div>
          </div>

          <div className="col-lg-5 col-md-8">
            <div className="cta__img">
              <img src={ctaImg} alt="img" />
              <div className="cta__img-shape">
                <img
                  src={ctaShape02}
                  alt="shape"
                  data-aos="fade-down-left"
                  data-aos-delay="400"
                />
                <img
                  src={ctaShape03}
                  alt="shape"
                  data-aos="fade-up"
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
