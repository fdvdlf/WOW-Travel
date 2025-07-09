import React from "react";
import Link from "next/link";

const titleShape = "/images/title_shape.svg";
const productImg1 = "/products/h_products_img01.jpg";
const productImg2 = "/products/latest_products_img01.jpg";
const productImg3 = "/products/latest_products_img02.jpg";
const productImg4 = "/products/latest_products_img03.jpg";
const productImg5 = "/products/h_products_img02.jpg";
const productImg6 = "/products/latest_products_img04.jpg";
const productImg7 = "/products/latest_products_img05.jpg";
const productImg8 = "/products/latest_products_img06.jpg";

export const ProductTwo = () => {
  return (
    <section className="product__area-three">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="product__inner-wrap">
              {/* top */}
              <div className="row align-items-center">
                <div className="col-sm-8">
                  <div className="section__title-two mb-20">
                    <h2 className="title">
                      Hot Sale Products
                      <img src={titleShape} alt="" className="injectable" />
                    </h2>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="view-all-btn">
                    <Link href="/product">
                      See All <i className="flaticon-right-arrow-angle"></i>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-xl-6 col-lg-12 col-md-6">
                  <div className="product__item product__item-two">
                    <div className="product__thumb product__thumb-two">
                      <Link href="/product/p-123">
                        <img src={productImg1} alt="img" />
                      </Link>
                      <div className="sale-wrap">
                        <span>New</span>
                      </div>
                    </div>
                    <div className="product__content">
                      <div className="product__reviews">
                        <div className="rating">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                        </div>
                        <span>(2 Reviews)</span>
                      </div>
                      <h4 className="title">
                        <Link href="/product/p-123">
                          IAMS Minichunks Chicken & Whole Grains Dry Dog Food fo
                        </Link>
                      </h4>
                      <h3 className="price">
                        $11.00 <del>$48.00</del>
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-12 col-md-6">
                  <div className="product__item-three">
                    <div className="product__thumb-three">
                      <Link href="/product/p-123">
                        <img src={productImg2} alt="img" />
                      </Link>
                    </div>
                    <div className="product__content product__content-three">
                      <h2 className="title">
                        <Link href="/product/p-123">
                          TrustyPup Dragon Squeaky Plush Chew ..
                        </Link>
                      </h2>
                      <h3 className="price">
                        $47.00 <del>$82.00</del>
                      </h3>
                    </div>
                  </div>
                  <div className="product__item-three">
                    <div className="product__thumb-three">
                      <Link href="/product/p-123">
                        <img src={productImg3} alt="img" />
                      </Link>
                    </div>
                    <div className="product__content product__content-three">
                      <h2 className="title">
                        <Link href="/product/p-123">
                          Vital Pet Life Salmon Oil for Dogs and Cat
                        </Link>
                      </h2>
                      <h3 className="price">$12.00</h3>
                    </div>
                  </div>
                  <div className="product__item-three">
                    <div className="product__thumb-three">
                      <Link href="/product/p-123">
                        <img src={productImg4} alt="img" />
                      </Link>
                    </div>
                    <div className="product__content product__content-three">
                      <h2 className="title">
                        <Link href="/product/p-123">
                          Dog HarnesNeoprene Comfort Liner...
                        </Link>
                      </h2>
                      <h3 className="price">
                        $30.00 <del>$48.00</del>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="product__inner-wrap">
              {/* top */}
              <div className="row align-items-center">
                <div className="col-sm-8">
                  <div className="section__title-two mb-20">
                    <h2 className="title">
                      Latest Products
                      <img src={titleShape} alt="" className="injectable" />
                    </h2>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="view-all-btn">
                    <Link href="/product">
                      See All <i className="flaticon-right-arrow-angle"></i>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-xl-6 col-lg-12 col-md-6">
                  <div className="product__item product__item-two">
                    <div className="product__thumb product__thumb-two">
                      <Link href="/product/p-123">
                        <img src={productImg5} alt="img" />
                      </Link>
                      <div className="sale-wrap sale-wrap-two">
                        <span>Sale!</span>
                      </div>
                    </div>
                    <div className="product__content">
                      <div className="product__reviews">
                        <div className="rating">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                        </div>
                        <span>(2 Reviews)</span>
                      </div>
                      <h4 className="title">
                        <Link href="/product/p-123">
                          Pro-Sense Multivitamin, 90ct For your Lovely Dog
                        </Link>
                      </h4>
                      <h3 className="price">
                        $15.00 <del>$28.00</del>
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-12 col-md-6">
                  <div className="product__item-three">
                    <div className="product__thumb-three">
                      <Link href="/product/p-123">
                        <img src={productImg6} alt="img" />
                      </Link>
                    </div>
                    <div className="product__content product__content-three">
                      <h2 className="title">
                        <Link href="/product/p-123">
                          Pet Grooming Glove for Dogs & Cats ...
                        </Link>
                      </h2>
                      <h3 className="price">
                        $12.00 <del>$20.00</del>
                      </h3>
                    </div>
                  </div>
                  <div className="product__item-three">
                    <div className="product__thumb-three">
                      <Link href="/product/p-123">
                        <img src={productImg7} alt="img" />
                      </Link>
                    </div>
                    <div className="product__content product__content-three">
                      <h2 className="title">
                        <Link href="/product/p-123">
                          Beloved Pets For Playing Toy
                        </Link>
                      </h2>
                      <h3 className="price">$25.00</h3>
                    </div>
                  </div>
                  <div className="product__item-three">
                    <div className="product__thumb-three">
                      <Link href="/product/p-123">
                        <img src={productImg8} alt="img" />
                      </Link>
                    </div>
                    <div className="product__content product__content-three">
                      <h2 className="title">
                        <Link href="/product/p-123">
                          Zesty Paws Calming Puppy Bites ...
                        </Link>
                      </h2>
                      <h3 className="price">
                        $45.00 <del>$80.00</del>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
