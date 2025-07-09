import React from "react";
import Link from "next/link";

const rcPost01 = "/blog/rc_post01.jpg";
const rcPost02 = "/blog/rc_post02.jpg";
const rcPost03 = "/blog/rc_post03.jpg";
const rcPost04 = "/blog/rc_post04.jpg";

export const BlogSidebar = () => {
  const categories = [
    { name: "Animals", count: 15 },
    { name: "Pet Love", count: 11 },
    { name: "Grooming", count: 5 },
    { name: "Dog Care", count: 7 },
    { name: "Pet Health", count: 4 },
  ];

  const recentPosts = [
    {
      id: 1,
      image: rcPost01,
      title: "weuine easiure and praising",
      date: "Sep 15, 2024",
    },
    {
      id: 2,
      image: rcPost02,
      title: "how to pursue pleasure rationally",
      date: "Sep 15, 2024",
    },
    {
      id: 3,
      image: rcPost03,
      title: "there anyone who loves",
      date: "Sep 15, 2024",
    },
    {
      id: 4,
      image: rcPost04,
      title: "New occasionally circumstances",
      date: "Sep 15, 2024",
    },
  ];

  const tags = [
    "Dogs",
    "Pet Care",
    "Cats",
    "Modern Lab",
    "Expert Vet",
    "Grooming",
    "Caring",
  ];

  return (
    <aside className="blog-sidebar">
      {/* search */}
      <div className="blog-widget">
        <h4 className="widget-title">Search</h4>
        <div className="sidebar-search-form">
          <form action="#">
            <input type="text" placeholder="Type Keywords. . ." />
            <button type="submit">
              <i className="flaticon-loupe"></i>
            </button>
          </form>
        </div>
      </div>

      {/* categories */}
      <div className="blog-widget">
        <h4 className="widget-title">Categories</h4>
        <div className="sidebar-cat-list">
          <ul className="list-wrap">
            {categories.map((category, index) => (
              <li key={index}>
                <Link href="#">
                  {category.name} ({String(category.count).padStart(2, "0")})
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* recent post */}
      <div className="blog-widget">
        <h4 className="widget-title">Recent Post</h4>
        <div className="rc-post-wrap">
          {recentPosts.map((post) => (
            <div key={post.id} className="rc-post-item">
              <div className="thumb">
                <Link href="/blog/b-123">
                  <img src={post.image} alt="img" />
                </Link>
              </div>
              <div className="content">
                <h4 className="title">
                  <Link href="/blog/b-123">{post.title}</Link>
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

      {/* tags */}
      <div className="blog-widget">
        <h4 className="widget-title">Tags</h4>
        <div className="sidebar-tag-list">
          <ul className="list-wrap">
            {tags.map((tag, index) => (
              <li key={index}>
                <Link href="#">{tag}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};
