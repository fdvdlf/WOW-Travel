import React from "react";
import { BlogSidebar } from "../components/blogs/BlogSidebar";

export const LayoutBlog = ({ children, currentArticleSlug }) => {
  return (
    <section className="blog__area pt-100 pb-100">
      <div className="container">
        <div className="row">
          <div className="col-xl-9 col-lg-8 order-0 order-lg-2">{children}</div>

          <div className="col-xl-3 col-lg-4">
            <BlogSidebar currentArticleSlug={currentArticleSlug} />
          </div>
        </div>
      </div>
    </section>
  );
};
