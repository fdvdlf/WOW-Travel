import React from "react";
import Link from "next/link";
import { ProductPagination } from "../products/ProductPagination";

const animalImg1 = "/shop/shop_img01.jpg";
const animalImg2 = "/shop/shop_img02.jpg";
const animalImg3 = "/shop/shop_img03.jpg";
const animalImg4 = "/shop/shop_img04.jpg";
const animalImg5 = "/shop/shop_img05.jpg";
const animalImg6 = "/shop/shop_img06.jpg";
const animalImg7 = "/shop/shop_img07.jpg";
const animalImg8 = "/shop/shop_img08.jpg";
const animalImg9 = "/shop/shop_img09.jpg";

export const AnimalList = () => {
  const animals = [
    {
      id: 1,
      image: animalImg1,
      name: "Cute French Bulldog",
      gender: "Male",
      breed: "French",
      location: "Bakersfield, California",
    },
    {
      id: 2,
      image: animalImg2,
      name: "purebred pussycat",
      gender: "Female",
      breed: "Germany",
      location: "Central Park, New York",
    },
    {
      id: 3,
      image: animalImg3,
      name: "Italian Rabbit",
      gender: "Male",
      breed: "Italy",
      location: "Birmingham, Alabama",
    },
    {
      id: 4,
      image: animalImg4,
      name: "Macaw Russian",
      gender: "Male",
      breed: "Canada",
      location: "Anchorage, Alaska",
    },
    {
      id: 5,
      image: animalImg5,
      name: "Egypt Cat",
      gender: "Male",
      breed: "Egypt",
      location: "Bakersfield, California",
    },
    {
      id: 6,
      image: animalImg6,
      name: "Australian Shepherd",
      gender: "Female",
      breed: "Australia",
      location: "Central Park, New York",
    },
    {
      id: 7,
      image: animalImg7,
      name: "Beagle Britain",
      gender: "Female",
      breed: "Egypt",
      location: "Anchorage, Alaska",
    },
    {
      id: 8,
      image: animalImg8,
      name: "Maltipoo USA",
      gender: "Male",
      breed: "USA",
      location: "Birmingham, Alabama",
    },
    {
      id: 9,
      image: animalImg9,
      name: "purebred pussycat",
      gender: "Female",
      breed: "Germany",
      location: "Central Park, New York",
    },
  ];

  return (
    <div className="col-xl-9 col-lg-8 order-0 order-lg-2">
      <div className="row">
        {animals.map((animal) => (
          <div key={animal.id} className="col-xl-4 col-md-6">
            <div className="animal__item animal__item-two animal__item-three shine-animate-item">
              <div className="animal__thumb animal__thumb-two shine-animate">
                <Link href={`/animal/a-123`}>
                  <img src={animal.image} alt={animal.name} />
                </Link>
                <Link href={`/animal/a-123`} className="wishlist">
                  <i className="flaticon-love"></i>
                </Link>
              </div>
              <div className="animal__content animal__content-two">
                <h4 className="title">
                  <Link href={`/animal/a-123`}>{animal.name}</Link>
                </h4>
                <div className="pet-info">
                  <ul className="list-wrap">
                    <li>
                      Gender: <span>{animal.gender}</span>
                    </li>
                    <li>
                      Breed: <span>{animal.breed}</span>
                    </li>
                  </ul>
                </div>
                <div className="location">
                  <i className="flaticon-placeholder"></i>
                  <span>{animal.location}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* pagination */}
      <ProductPagination />
    </div>
  );
};
