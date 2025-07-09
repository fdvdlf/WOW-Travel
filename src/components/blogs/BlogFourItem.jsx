import React from "react";
import Link from "next/link";

export const BlogFourItem = ({ image, category, date, author, title }) => {
  return (
    <div className="col-xl-3 col-lg-4 col-md-6">
      <div className="blog__post-item-four shine-animate-item">
        <div className="blog__post-thumb-four shine-animate">
          <Link href="/blog/b-123">
            <img src={image} alt="img" />
          </Link>
          <ul className="list-wrap blog__post-tag blog__post-tag-three">
            <li>
              <Link href="/blog">{category}</Link>
            </li>
          </ul>
        </div>
        <div className="blog__post-content-four">
          <div className="blog__post-meta">
            <ul className="list-wrap">
              <li>
                <i className="flaticon-calendar"></i>
                {date}
              </li>
              <li>
                <i className="flaticon-user"></i>by
                <Link href="/blog/b-123">{author}</Link>
              </li>
            </ul>
          </div>
          <h2 className="title">
            <Link href="/blog/b-123">{title}</Link>
          </h2>
        </div>
      </div>
    </div>
  );
};
