import React from "react";
import Link from "next/link";
import { BlogThreeItem } from "./BlogThreeItem";

const rightArrow = "/icon/right_arrow.svg";
const petIcon = "/icon/pet_icon02.svg";
const blogShape = "/blog/blog_shape01.png";
const blogPost01 = "/blog/h2_blog_post01.jpg";
const blogPost02 = "/blog/h2_blog_post02.jpg";
const blogPost03 = "/blog/h2_blog_post03.jpg";

const blogPosts = [
  {
    id: 1,
    image: blogPost01,
    tags: ["Pet", "Medical"],
    date: "25th Aug, 2024",
    title: "Understanding Zoonotic and Safeguarding Your Health",
    description:
      "Duis aute irure dolor in reprehenderit innera voWe care for the growing needs of our comm unitye build systems.",
  },
  {
    id: 2,
    image: blogPost02,
    tags: ["Pet Love"],
    date: "25th Aug, 2024",
    title: "How to Spot, Treat, and Prevent Hot Spots in Pets",
    description:
      "Duis aute irure dolor in reprehenderit innera voWe care for the growing needs of our comm unitye build systems.",
  },
  {
    id: 3,
    image: blogPost03,
    tags: ["Pet", "Care"],
    date: "25th Aug, 2024",
    title: `3 Signs It's Time for the First Pet Dental Cleaning`,
    description:
      "Duis aute irure dolor in reprehenderit innera voWe care for the growing needs of our comm unitye build systems.",
  },
];

export const BlogThree = () => {
  return (
    <section className="blog__post-area-three">
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
              <Link href="blog.html" className="btn">
                See All Posts
                <img src={rightArrow} alt="" className="injectable" />
              </Link>
            </div>
          </div>
        </div>

        {/* list */}
        <div className="row justify-content-center">
          {blogPosts.map((post) => (
            <BlogThreeItem key={post.id} {...post} />
          ))}
        </div>
      </div>

      {/* shape */}
      <div className="blog__shape-wrap-three">
        <img
          src={blogShape}
          alt="img"
          data-aos="fade-up-right"
          data-aos-delay="400"
        />
      </div>
    </section>
  );
};
