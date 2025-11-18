import React from "react";
import { BlogOneItem } from "./BlogOneItem";

const petIcon = "/icon/pet_icon02.svg";
const blogPost01 = "/blog/blog_post01.jpg";
const blogPost02 = "/blog/blog_post02.jpg";
const blogPost03 = "/blog/blog_post03.jpg";
const blogShape01 = "/blog/blog_shape01.png";
const blogShape02 = "/blog/blog_shape02.png";

const blogData = [
  {
    id: 1,
    image: blogPost01,
    tags: ["Pet", "Viajes"],
    title: "¿Tu mascota puede viajar en avión? Descúbrelo en 5 pasos",
  },
  {
    id: 2,
    image: blogPost02,
    tags: ["Pasaporte", "Requisitos"],
    title: "Cómo sacar el pasaporte europeo para tu mascota",
  },
  {
    id: 3,
    image: blogPost03,
    tags: ["Experiencias", "Consejos"],
    title: "Viajar con tu mascota desde Perú: Lo que nadie te cuenta",
  },
];

export const BlogOne = () => {
  return (
    <section className="blog__post-area">
      <div className="container">
        {/* top */}
        <div className="row align-items-center">
          <div className="col-12">
            <div className="section__title mb-40">
              <span className="sub-title">
                Infórmate correctamente
                <strong className="shake">
                  <img src={petIcon} alt="" className="injectable" />
                </strong>
              </span>
              <h2 className="title">Noticias y artículos</h2>
            </div>
          </div>
        </div>

        {/* list */}
        <div className="row justify-content-center">
          {blogData.map((blog) => (
            <BlogOneItem key={blog.id} {...blog} />
          ))}
        </div>
      </div>

      {/* shapes */}
      <div className="blog__shape-wrap">
        <img
          src={blogShape01}
          alt="img"
          data-aos="fade-up-right"
          data-aos-delay="400"
        />
        <img src={blogShape02} alt="img" className="ribbonRotate" />
      </div>
    </section>
  );
};
