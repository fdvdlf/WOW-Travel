import React from "react";
import Link from "next/link";
import { BlogTwoItem } from "./BlogTwoItem";

const petIcon = "/icon/pet_icon02.svg";
const rightArrow = "/icon/right_arrow.svg";
const blogPost01 = "/blog/h2_blog_post01.jpg";
const blogPost02 = "/blog/h2_blog_post02.jpg";
const blogPost03 = "/blog/h2_blog_post03.jpg";
const blogShape = "/blog/blog_shape01.png";

const blogPosts = [
  {
    image: blogPost01,
    tags: ["Pet", "Medical"],
    title: "Clean indoor air as important in controlling asthma",
    author: "admin",
    date: "25th Aug, 2024",
  },
  {
    image: blogPost02,
    tags: ["Pet", "Medical"],
    title: "How to Spot, Treat, and Prevent Hot Spots in Pets",
    author: "admin",
    date: "25th Aug, 2024",
  },
  {
    image: blogPost03,
    tags: ["Pet", "Medical"],
    title: "3 Signs It's Time for the First Pet Dental Cleaning",
    author: "admin",
    date: "25th Aug, 2024",
  },
];

export const BlogTwo = () => {
  return (
    <section className="blog__post-area-two">
      <div className="container">
        {/* top */}
        <div className="row align-items-center">
          <div className="col-lg-6">
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
          <div className="col-lg-6">
            <div className="view__all-btn text-end mb-40">
              <Link href="/blog" className="btn">
                See All Posts
                <img src={rightArrow} alt="" className="injectable" />
              </Link>
            </div>
          </div>
        </div>

        {/* list */}
        <div className="row justify-content-center">
          {blogPosts.map((post, index) => (
            <BlogTwoItem key={index} {...post} />
          ))}
        </div>
      </div>

      {/* shape */}
      <div className="blog__shape-wrap-two">
        <img src={blogShape} alt="img" className="alltuchtopdown" />
      </div>
    </section>
  );
};
