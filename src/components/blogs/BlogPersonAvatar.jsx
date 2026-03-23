import React from "react";

export function BlogPersonAvatar({ initials, label }) {
  return (
    <div className="blog-person-avatar" aria-label={label}>
      <span>{initials}</span>
    </div>
  );
}
