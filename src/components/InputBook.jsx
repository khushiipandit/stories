import React, { useState } from "react";

/*
  This component visually mimics the big open book in your mockup.
  The central input field sits on the book; the large "Generate Story" sign is a button below.
*/

export default function InputBook({ onGenerate }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onGenerate(input.trim());
    setInput("");
  };

  return (
    <section className="inputbook-section" aria-label="Storybook Input">
      <div className="book-art">
        <img src="/placeholder.png" alt="Open book" className="book-image" />
        <form className="book-form" onSubmit={handleSubmit}>
          <input
            className="book-input"
            placeholder="Type a sentence to begin your adventure..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="story-sentence"
          />
          <button className="generate-btn" type="submit" aria-label="Generate Story">Generate Story</button>
        </form>
      </div>
    </section>
  );
}
