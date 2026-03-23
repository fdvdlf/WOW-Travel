import { Layout } from "@/layouts/Layout";
import { LayoutBlog } from "@/layouts/LayoutBlog";
import { getAllBlogPosts } from "@/data/blog-posts";
import Link from "next/link";
import React from "react";

const rightArrow = "/icon/right_arrow.svg";

export default function Blog() {
  const blogPosts = getAllBlogPosts();

  return (
    <Layout
      breadcrumbTitle="Noticias y articulos"
      breadcrumbSubtitle={"Blog"}
      mainClass="nothing"
    >
      <LayoutBlog>
        <div className="row">
          {blogPosts.map((post) => (
            <div key={post.id} className="col-md-6">
              <div className="blog__post-item-three blog__post-item-five shine-animate-item">
                <div className="blog__post-thumb-three blog__post-thumb-five shine-animate">
                  <Link href={`/blog/${post.slug}`}>
                    <img src={post.image} alt={post.imageAlt} />
                  </Link>
                  <ul className="list-wrap blog__post-tag blog__post-tag-two">
                    {post.tags.map((tag) => (
                      <li key={tag}>
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
                        <i className="flaticon-user"></i>por
                        <Link href={`/blog/${post.slug}`}>WOW Travel</Link>
                      </li>
                    </ul>
                  </div>
                  <h2 className="title">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p>{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="btn">
                    Leer articulo
                    <img src={rightArrow} alt="" className="injectable" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <nav className="pagination__wrap mt-50">
          <ul className="list-wrap">
            <li className="active">
              <Link href="#">1</Link>
            </li>
          </ul>
        </nav>
      </LayoutBlog>
    </Layout>
  );
}
