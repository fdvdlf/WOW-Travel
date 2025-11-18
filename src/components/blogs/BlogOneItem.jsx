import React from "react";
import Link from "next/link";

const blogImgShape = "/blog/blog_img_shape.svg";

export const BlogOneItem = ({ image, tags, title }) => {
  return (
    <div className="col-lg-4 col-md-6 col-sm-8">
      <div className="blog__post-item shine-animate-item">
        <div className="blog__post-thumb">
          <div className="blog__post-mask shine-animate">
            <Link href="/blog/b-123">
              <img src={image} alt="img" />
            </Link>
            <ul className="list-wrap blog__post-tag">
              {tags.map((tag, index) => (
                <li key={index}>
                  <Link href="/blog">{tag}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="shape">
            <img src={blogImgShape} alt="" className="injectable" />
          </div>
        </div>
        <div className="blog__post-content">
          <h2 className="title">
            <Link href="/blog/b-123">{title}</Link>
          </h2>
        </div>
      </div>
    </div>
  );
};
