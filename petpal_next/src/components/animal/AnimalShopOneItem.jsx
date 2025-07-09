import React from "react";
import Link from "next/link";

export const AnimalShopOneItem = ({ src, id, title, price }) => {
  return (
    <div className="animal__item shine-animate-item">
      <div className="animal__thumb shine-animate">
        <Link href="/animal/a-123">
          <img src={src} alt="img" />
        </Link>
        <Link href="/animal/a-123" className="wishlist">
          <i className="flaticon-love"></i>
        </Link>
      </div>

      <div className="animal__content">
        <span className="animal-code">ID: {id}</span>
        <h4 className="title">
          <Link href="/animal/a-123">{title}</Link>
        </h4>
        <h4 className="price">${price}</h4>
      </div>
    </div>
  );
};
