import React from "react";
import Link from "next/link";
import { BlogOneItem } from "./BlogOneItem";

const petIcon = "/icon/pet_icon02.svg";
const rightArrow = "/icon/right_arrow.svg";
const blogPost01 = "/blog/blog_post01.jpg";
const blogPost02 = "/blog/blog_post02.jpg";
const blogPost03 = "/blog/blog_post03.jpg";
const blogShape01 = "/blog/blog_shape01.png";
const blogShape02 = "/blog/blog_shape02.png";

const blogData = [
  {
    id: 1,
    image: blogPost01,
    tags: ["Pet", "Medical"],
    author: "admin",
    date: "25th Aug, 2024",
    title: "Clean indoor air as important in controlling asthma",
  },
  {
    id: 2,
    image: blogPost02,
    tags: ["Care"],
    author: "admin",
    date: "25th Aug, 2024",
    title: "Clean indoor air as important in controlling asthma",
  },
  {
    id: 3,
    image: blogPost03,
    tags: ["Pet Care"],
    author: "admin",
    date: "25th Aug, 2024",
    title: "Clean indoor air as important in controlling asthma",
  },
];

export const BlogOne = () => {
  return (
    <section className="blog__post-area">
      <div className="container">
        {/* top */}
        <div className="row align-items-center">
          <div className="col-md-8">
            <div className="section__title mb-40">
              <span className="sub-title">
                News & Blogs
                <strong className="shake">
                  <img src={petIcon} alt="" className="injectable" />
                </strong>
              </span>
              <h2 className="title">Our Recent Articles</h2>
            </div>
          </div>
          <div className="col-md-4">
            <div className="view__all-btn text-end mb-40">
              <Link href="/blog" className="btn btn-two">
                See All Posts
                <img src={rightArrow} alt="" className="injectable" />
              </Link>
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
