import React from "react";

export default function PageCard({ page }) {
  return (
    <article className="pagecard">
      <div className="pagecard-art">
        <img src={page.img || "/bg.png"} alt={page.title} />
      </div>
      <div className="pagecard-text">
        <h3>{page.title}</h3>
        <p>{page.excerpt}</p>
      </div>
      <div className="pagecontrols">
        <button className="prev">◀ Previous</button>
        <button className="next">Next ▶</button>
      </div>
    </article>
  );
}
