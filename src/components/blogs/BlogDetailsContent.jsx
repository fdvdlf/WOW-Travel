import React from "react";
import Link from "next/link";
import { BlogPersonAvatar } from "./BlogPersonAvatar";

const rightArrow = "/icon/right_arrow.svg";

function countComments(comments = []) {
  return comments.reduce((total, comment) => {
    return total + 1 + countComments(comment.children || []);
  }, 0);
}

export function BlogDetailsContent({ post }) {
  if (!post) {
    return null;
  }

  const totalComments = countComments(post.comments);

  return (
    <>
      <div className="blog__details-wrap">
        <div className="blog__details-thumb">
          <img src={post.image} alt={post.imageAlt} />
        </div>
        <div className="blog__details-content">
          <h2 className="title">{post.title}</h2>
          <div className="blog__post-meta">
            <ul className="list-wrap">
              <li>
                <i className="flaticon-user"></i>por
                <Link href={post.cta.href} target="_blank" rel="noreferrer">
                  WOW Travel
                </Link>
              </li>
              <li>
                <i className="flaticon-calendar"></i>
                {post.date}
              </li>
              <li>
                <i className="fas fa-tags"></i>
                {post.tags.map((tag, index) => (
                  <Link key={tag} href="/blog">
                    {index === post.tags.length - 1 ? tag : `${tag},`}
                  </Link>
                ))}
              </li>
              <li>
                <i className="far fa-comment-alt"></i>
                <Link href="#comentarios">
                  {String(totalComments).padStart(2, "0")} Comentarios
                </Link>
              </li>
            </ul>
          </div>

          {post.body.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <blockquote>
            <p>"{post.body.quote}"</p>
          </blockquote>

          <h4 className="title-two">{post.body.sectionTitle}</h4>
          {post.body.sectionParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <div className="blog__details-inner-wrap">
            <div className="row align-items-center">
              <div className="col-54">
                <div className="content">
                  <h3 className="title-two">{post.body.innerTitle}</h3>
                  <p>{post.body.innerParagraph}</p>
                  <ul className="list-wrap">
                    {post.body.bullets.map((item) => (
                      <li key={item}>
                        <i className="fas fa-arrow-right"></i>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-46">
                <div className="thumb">
                  <img src={post.image} alt={post.imageAlt} />
                </div>
              </div>
            </div>
          </div>

          {post.body.closing.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <div className="comment-respond">
            <h3 className="comment-reply-title">{post.cta.title}</h3>
            <p className="comment-notes">{post.cta.body}</p>
            <Link href={post.cta.href} className="btn" target="_blank" rel="noreferrer">
              {post.cta.label}
              <img src={rightArrow} alt="" className="injectable" />
            </Link>
          </div>

          <div className="blog__details-content-bottom">
            <div className="row align-items-center">
              <div className="col-md-7">
                <div className="post-tags">
                  <h5 className="title">Temas:</h5>
                  <ul className="list-wrap">
                    {post.tags.map((tag) => (
                      <li key={tag}>
                        <Link href="/blog">{tag}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-md-5">
                <div className="blog-post-share">
                  <h5 className="title">Contacto:</h5>
                  <ul className="list-wrap">
                    <li>
                      <Link href={post.cta.href} target="_blank" rel="noreferrer">
                        <i className="fab fa-whatsapp"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="mailto:contacto@wowtravel.pe">
                        <i className="fas fa-envelope"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="https://www.linkedin.com/company/wowtravel-pe/" target="_blank" rel="noreferrer">
                        <i className="fab fa-linkedin-in"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog">
                        <i className="fas fa-book-open"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="blog-avatar-wrap">
        <div className="blog-avatar-img">
          <BlogPersonAvatar initials={post.author.initials} label={post.author.name} />
        </div>
        <div className="blog-avatar-info">
          <span className="designation">{post.author.role}</span>
          <h4 className="name">
            <Link href={post.cta.href} target="_blank" rel="noreferrer">
              {post.author.name}
            </Link>
          </h4>
          <p>{post.author.bio}</p>
        </div>
      </div>
    </>
  );
}
