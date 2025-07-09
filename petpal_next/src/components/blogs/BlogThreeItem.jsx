import React from "react";
import Link from "next/link";

const rightArrow = "/icon/right_arrow.svg";

export const BlogThreeItem = ({ image, tags, date, title, description }) => {
  return (
    <div className="col-lg-4 col-md-6">
      <div className="blog__post-item-three shine-animate-item">
        <div className="blog__post-thumb-three shine-animate">
          <Link href="/blog/b-123">
            <img src={image} alt="img" />
          </Link>
          <ul className="list-wrap blog__post-tag blog__post-tag-two">
            {tags.map((tag, index) => (
              <li key={index}>
                <Link href="blog.html">{tag}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="blog__post-content-three">
          <div className="blog__post-meta">
            <ul className="list-wrap">
              <li>
                <i className="flaticon-calendar"></i>
                {date}
              </li>
              <li>
                <i className="flaticon-user"></i>by
                <Link href="/blog/b-123">admin</Link>
              </li>
            </ul>
          </div>
          <h2 className="title">
            <Link href="/blog/b-123">{title}</Link>
          </h2>
          <p>{description}</p>
          <Link href="/blog/b-123" className="btn btn-two">
            Read More
            <img src={rightArrow} alt="" className="injectable" />
          </Link>
        </div>
      </div>
    </div>
  );
};
