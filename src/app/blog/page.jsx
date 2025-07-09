import { Layout } from "@/layouts/Layout";
import { LayoutBlog } from "@/layouts/LayoutBlog";
import Link from "next/link";
import React from "react";

const blogImg01 = "/blog/blog_img01.jpg";
const blogImg02 = "/blog/blog_img02.jpg";
const blogImg03 = "/blog/blog_img03.jpg";
const blogImg04 = "/blog/blog_img04.jpg";
const blogImg05 = "/blog/blog_img05.jpg";
const blogImg06 = "/blog/blog_img06.jpg";
const rightArrow = "/icon/right_arrow.svg";
const paginationIcon01 = "/icon/pagination_icon01.svg";
const paginationIcon02 = "/icon/pagination_icon02.svg";

const blogPosts = [
  {
    id: 1,
    image: blogImg01,
    tags: ["Pet", "Medical"],
    date: "25th Aug, 2024",
    title: `3 Signs It's Time for the First Pets Dental Cleaning`,
    description:
      "Duis aute irure dolor in reprehenderit innera voeWe care for the growing needs of our comm unietye build systems.",
  },
  {
    id: 2,
    image: blogImg02,
    tags: ["Pet", "Grooming"],
    date: "25th Aug, 2024",
    title: "Understanding Zoonotic and Safeguarding Your Health",
    description:
      "Duis aute irure dolor in reprehenderit innera voeWe care for the growing needs of our comm unietye build systems.",
  },
  {
    id: 3,
    image: blogImg03,
    tags: ["Health", "Medical"],
    date: "25th Aug, 2024",
    title: "How to Spot, Treat, and Prevent Hot Spots in Pets",
    description:
      "Duis aute irure dolor in reprehenderit innera voeWe care for the growing needs of our comm unietye build systems.",
  },
  {
    id: 4,
    image: blogImg04,
    tags: ["Dog Love", "Pet"],
    date: "25th Aug, 2024",
    title: "Clean indoor air as important in controlling asthma",
    description:
      "Duis aute irure dolor in reprehenderit innera voeWe care for the growing needs of our comm unietye build systems.",
  },
  {
    id: 5,
    image: blogImg05,
    tags: ["Animals", "Medical"],
    date: "25th Aug, 2024",
    title: "How to Spot, Treat, and Prevent Hot Spots in Pets",
    description:
      "Duis aute irure dolor in reprehenderit innera voeWe care for the growing needs of our comm unietye build systems.",
  },
  {
    id: 6,
    image: blogImg06,
    tags: ["Pet", "Pet Love"],
    date: "25th Aug, 2024",
    title: "A Complete Price Guide for the Shar Pei Breed",
    description:
      "Duis aute irure dolor in reprehenderit innera voeWe care for the growing needs of our comm unietye build systems.",
  },
];

export default function Blog() {
  return (
    <Layout
      breadcrumbTitle="Our Latest Blogs"
      breadcrumbSubtitle={"All Blogs"}
      mainClass="nothing"
    >
      <LayoutBlog>
        {/* list */}
        <div className="row">
          {blogPosts.map((post) => (
            <div key={post.id} className="col-md-6">
              <div className="blog__post-item-three blog__post-item-five shine-animate-item">
                <div className="blog__post-thumb-three blog__post-thumb-five shine-animate">
                  <Link href="/blog/b-123">
                    <img src={post.image} alt="blog" />
                  </Link>
                  <ul className="list-wrap blog__post-tag blog__post-tag-two">
                    {post.tags.map((tag, index) => (
                      <li key={index}>
                        <Link href="/blog">{tag}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="blog__post-content-three">
                  <div className="blog__post-meta">
                    <ul className="list-wrap">
                      <li>
                        <i className="flaticon-calendar"></i>
                        {post.date}
                      </li>
                      <li>
                        <i className="flaticon-user"></i>by
                        <Link href="/blog/b-123">admin</Link>
                      </li>
                    </ul>
                  </div>
                  <h2 className="title">
                    <Link href="/blog/b-123">{post.title}</Link>
                  </h2>
                  <p>{post.description}</p>
                  <Link href="/blog/b-123" className="btn">
                    Read More
                    <img src={rightArrow} alt="" className="injectable" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* pagination */}
        <nav className="pagination__wrap mt-50">
          <ul className="list-wrap">
            <li className="link-arrow">
              <Link href="#">
                <img src={paginationIcon01} alt="" className="injectable" />
              </Link>
            </li>
            <li className="active">
              <Link href="#">1</Link>
            </li>
            <li>
              <Link href="courses.html">2</Link>
            </li>
            <li>
              <Link href="courses.html">3</Link>
            </li>
            <li>
              <Link href="courses.html">4</Link>
            </li>
            <li className="link-arrow">
              <Link href="#">
                <img src={paginationIcon02} alt="" className="injectable" />
              </Link>
            </li>
          </ul>
        </nav>
      </LayoutBlog>
    </Layout>
  );
}
