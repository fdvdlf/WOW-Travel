import React from "react";
import Link from "next/link";

export const ProductOneItem = ({
  image,
  badge,
  reviews,
  title,
  price,
  oldPrice,
}) => {
  return (
    <div className="product__item">
      <div className="product__thumb">
        <Link href="/product/p-123">
          <img src={image} alt="img" />
        </Link>
        <div className="product__action">
          <Link href="/product/p-123">
            <i className="flaticon-love"></i>
          </Link>
          <Link href="/product/p-123">
            <i className="flaticon-loupe"></i>
          </Link>
          <Link href="/product/p-123">
            <i className="flaticon-exchange"></i>
          </Link>
        </div>
        {badge && (
          <div
            className={`sale-wrap ${
              badge.type === "sale" ? "sale-wrap-two" : ""
            }`}
          >
            <span>{badge.text}</span>
          </div>
        )}
        <div className="product__add-cart">
          <Link href="/product/p-123" className="btn">
            <i className="flaticon-shopping-bag"></i>Add To Cart
          </Link>
        </div>
      </div>
      <div className="product__content">
        <div className="product__reviews">
          <div className="rating">
            {[...Array(5)].map((_, index) => (
              <i key={index} className="fas fa-star"></i>
            ))}
          </div>
          <span>({reviews} Reviews)</span>
        </div>
        <h4 className="title">
          <Link href="/product/p-123">{title}</Link>
        </h4>
        <h3 className="price">
          ${price?.toFixed(2)} <del>${oldPrice?.toFixed(2)}</del>
        </h3>
      </div>
    </div>
  );
};
