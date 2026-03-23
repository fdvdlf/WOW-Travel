import React from "react";
import Link from "next/link";
import {
  getBlogCategories,
  getBlogTags,
  getRecentBlogPosts,
} from "@/data/blog-posts";

export const BlogSidebar = ({ currentArticleSlug }) => {
  const categories = getBlogCategories();
  const recentPosts = getRecentBlogPosts(currentArticleSlug);
  const tags = getBlogTags();

  return (
    <aside className="blog-sidebar">
      <div className="blog-widget">
        <h4 className="widget-title">Buscar</h4>
        <div className="sidebar-search-form">
          <form action="/blog">
            <input type="text" name="q" placeholder="Buscar tema..." />
            <button type="submit">
              <i className="flaticon-loupe"></i>
            </button>
          </form>
        </div>
      </div>

      <div className="blog-widget">
        <h4 className="widget-title">Categorias</h4>
        <div className="sidebar-cat-list">
          <ul className="list-wrap">
            {categories.map((category) => (
              <li key={category.name}>
                <Link href="/blog">
                  {category.name} ({String(category.count).padStart(2, "0")})
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="blog-widget">
        <h4 className="widget-title">Articulos recientes</h4>
        <div className="rc-post-wrap">
          {recentPosts.map((post) => (
            <div key={post.id} className="rc-post-item">
              <div className="thumb">
                <Link href={`/blog/${post.slug}`}>
                  <img src={post.image} alt={post.imageAlt} />
                </Link>
              </div>
              <div className="content">
                <h4 className="title">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h4>
                <span className="date">
                  <i className="flaticon-calendar"></i>
                  {post.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="blog-widget">
        <h4 className="widget-title">Temas</h4>
        <div className="sidebar-tag-list">
          <ul className="list-wrap">
            {tags.map((tag) => (
              <li key={tag}>
                <Link href="/blog">{tag}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};
