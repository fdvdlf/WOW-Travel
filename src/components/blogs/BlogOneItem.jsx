import React from "react";
import Link from "next/link";

const blogImgShape = "/blog/blog_img_shape.svg";

export const BlogOneItem = ({ image, imageAlt, tags, title, slug }) => {
  const href = `/blog/${slug}`;

  return (
    <div className="col-lg-4 col-md-6 col-sm-8">
      <div className="blog__post-item shine-animate-item">
        <div className="blog__post-thumb">
          <div className="blog__post-mask shine-animate">
            <Link href={href}>
              <img src={image} alt={imageAlt} />
            </Link>
            <ul className="list-wrap blog__post-tag">
              {tags.map((tag) => (
                <li key={tag}>
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
            <Link href={href}>{title}</Link>
          </h2>
        </div>
      </div>
    </div>
  );
};
