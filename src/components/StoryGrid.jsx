import React from "react";
import PageCard from "./PageCard.jsx";

export default function StoryGrid({ pages }) {
  if (!pages || pages.length === 0) return null;
  return (
    <section className="storygrid">
      <div className="grid-inner">
        {pages.map((p) => <PageCard key={p.id} page={p} />)}
      </div>
    </section>
  );
}
