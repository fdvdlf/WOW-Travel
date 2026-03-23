import React from "react";
import { BlogOneItem } from "./BlogOneItem";
import { getHomeBlogPosts } from "@/data/blog-posts";

const petIcon = "/icon/pet_icon02.svg";
const blogShape01 = "/blog/blog_shape01.png";
const blogShape02 = "/blog/blog_shape02.png";

export const BlogOne = () => {
  const blogData = getHomeBlogPosts();

  return (
    <section className="blog__post-area">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12">
            <div className="section__title mb-40">
              <span className="sub-title">
                Informate correctamente
                <strong className="shake">
                  <img src={petIcon} alt="" className="injectable" />
                </strong>
              </span>
              <h2 className="title">Noticias y articulos</h2>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          {blogData.map((blog) => (
            <BlogOneItem key={blog.id} {...blog} />
          ))}
        </div>
      </div>

      <div className="blog__shape-wrap">
        <img src={blogShape01} alt="img" data-aos="fade-up-right" data-aos-delay="400" />
        <img src={blogShape02} alt="img" className="ribbonRotate" />
      </div>
    </section>
  );
};
