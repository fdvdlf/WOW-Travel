import React from "react";
import Link from "next/link";
import { BlogPersonAvatar } from "./BlogPersonAvatar";

const rightArrow = "/icon/right_arrow.svg";

function countComments(comments = []) {
  return comments.reduce((total, comment) => {
    return total + 1 + countComments(comment.children || []);
  }, 0);
}

function CommentItem({ comment }) {
  return (
    <li>
      <div className="comments-box">
        <div className="comments-avatar">
          <BlogPersonAvatar initials={comment.initials} label={comment.name} />
        </div>
        <div className="comments-text">
          <div className="avatar-name">
            <h6 className="name">{comment.name}</h6>
            <span className="date">{comment.date}</span>
          </div>
          <p>{comment.content}</p>
          <Link href="#" className="reply-btn">
            Responder
          </Link>
        </div>
      </div>

      {comment.children?.length ? (
        <ul className="children">
          {comment.children.map((child) => (
            <CommentItem key={`${comment.name}-${child.name}-${child.date}`} comment={child} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function BlogComments({ post }) {
  if (!post) {
    return null;
  }

  const totalComments = countComments(post.comments);

  return (
    <>
      <div className="comments-wrap" id="comentarios">
        <h3 className="comments-wrap-title">
          {String(totalComments).padStart(2, "0")} Comentarios
        </h3>
        <div className="latest-comments">
          <ul className="list-wrap">
            {post.comments.map((comment) => (
              <CommentItem key={`${comment.name}-${comment.date}`} comment={comment} />
            ))}
          </ul>
        </div>
      </div>
      <div className="comment-respond">
        <h3 className="comment-reply-title">Deja tu consulta</h3>
        <form action="#" className="comment-form">
          <p className="comment-notes">
            Si prefieres una respuesta directa para tu caso, tambien puedes escribirnos por WhatsApp.
          </p>
          <div className="form-grp">
            <textarea name="comment" placeholder="Cuentanos tu ruta o tu duda"></textarea>
          </div>
          <div className="row gutter-20">
            <div className="col-md-4">
              <div className="form-grp">
                <input type="text" placeholder="Nombre" />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-grp">
                <input type="email" placeholder="Correo" />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-grp">
                <input type="text" placeholder="Pais de destino" />
              </div>
            </div>
          </div>
          <div className="form-grp checkbox-grp">
            <input type="checkbox" id="checkbox" />
            <label htmlFor="checkbox">
              Quiero recibir una respuesta con una orientacion inicial para mi viaje.
            </label>
          </div>
          <button type="submit" className="btn">
            Enviar comentario
            <img src={rightArrow} alt="" className="injectable" />
          </button>
        </form>
      </div>
    </>
  );
}
