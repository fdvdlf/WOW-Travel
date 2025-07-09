import React from "react";
import Link from "next/link";

export const AnimalTwoItem = ({ image, name, gender, breed, location }) => {
  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-10">
      <div className="animal__item animal__item-two shine-animate-item">
        <div className="animal__thumb animal__thumb-two shine-animate">
          <Link href="/animal/a-123">
            <img src={image} alt={name} />
          </Link>
          <Link href="/animal/a-123" className="wishlist">
            <i className="flaticon-love"></i>
          </Link>
        </div>
        <div className="animal__content animal__content-two">
          <h4 className="title">
            <Link href="/animal/a-123">{name}</Link>
          </h4>
          <div className="pet-info">
            <ul className="list-wrap">
              <li>
                Gender: <span>{gender}</span>
              </li>
              <li>
                Breed: <span>{breed}</span>
              </li>
            </ul>
          </div>
          <div className="location">
            <i className="flaticon-placeholder"></i>
            <span>{location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
