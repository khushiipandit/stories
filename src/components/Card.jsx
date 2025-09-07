// src/components/Card.jsx
import React from "react";

/*
 Card.jsx
 - Reusable card that displays thumbnail, title & excerpt
 - If `page` is null, show a placeholder skeleton
*/

export default function Card({ page, onClick = () => {}, isActive = false }) {
  if (!page) {
    return (
      <div className={`card-placeholder`}>
        <div className="placeholder-art" />
        <div className="placeholder-text">
          <div className="line short" />
          <div className="line long" />
        </div>
      </div>
    );
  }

  return (
    <article
      className={`card ${isActive ? "card--active" : ""}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" ? onClick() : null)}
      aria-pressed={isActive}
    >
      <div className="card-art">
        <img src={page.img || "/bg.png"} alt={page.title} />
      </div>
      <div className="card-body">
        <h3 className="card-title">{page.title}</h3>
        <p className="card-excerpt">{page.excerpt}</p>
      </div>
      <div className="card-footer">
        <button className="card-btn">Read</button>
      </div>
    </article>
  );
}
