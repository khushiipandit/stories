// src/components/Hero.jsx
import React, { useState, useRef, useEffect } from "react";
import Card from "./Card.jsx";

export default function Hero({ onGenerate, pages = [], storyText = "", setStoryText }) {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 6;
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    setStartIndex(0);
    setActiveId(null);
  }, [pages]);

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const sentence = input.trim();
    if (!sentence) {
      inputRef.current?.focus();
      return;
    }
    onGenerate(sentence);
    setInput("");
  };

  const handleOverlayClick = () => {
    const sentence = input.trim();
    if (!sentence) {
      inputRef.current?.focus();
      return;
    }
    onGenerate(sentence);
    setInput("");
  };

  const length = pages?.length || 0;
  const prev = () => {
    if (length === 0) return;
    setStartIndex((s) => (s - 1 + length) % length);
  };
  const next = () => {
    if (length === 0) return;
    setStartIndex((s) => (s + 1) % length);
  };

  const visibleItems = [];
  for (let i = 0; i < visibleCount; i++) {
    if (length === 0) visibleItems.push(null);
    else visibleItems.push(pages[(startIndex + i) % length]);
  }

  const handleCardClick = (page) => {
    if (!page) return;
    setActiveId(page.id);
    if (setStoryText) setStoryText(page.excerpt || "");
  };

  return (
    <section className="hero-section" aria-label="Hero storybook">
      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <h1 className="site-title">📖 Storybook</h1>
          <p className="subtitle">Turn your words into worlds ✨</p>
        </div>
      </header>

      {/* Book art + input overlay */}
      <div className="inputbook-section">
        <div className="book-art">
          <img src="/placeholder.png" alt="Open book" className="book-image" />

          {/* Input positioned lower */}
          <form className="book-form" onSubmit={handleSubmit} aria-label="story-form">
            <input
              ref={inputRef}
              className="book-input highlight-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your sentence here..."
              aria-label="Type a sentence to begin your adventure"
              autoComplete="off"
            />
          </form>

          {/* Overlay button with increased width */}
          <button
            type="button"
            className="generate-overlay"
            onClick={handleOverlayClick}
            title="Generate Story"
            aria-label="Generate Story"
          >
            <span className="sr-only">Generate Story</span>
          </button>
        </div>
      </div>

      {/* Result area */}
      <div className="result-note">
        {storyText ? (
          <p className="result-text">{storyText}</p>
        ) : (
          <p className="hint">Type a sentence to create your story and illustrations</p>
        )}
      </div>

      {/* Cards carousel (six visible) */}
      <div className="cards-carousel" aria-label="Story cards carousel">
        <div className="carousel-controls">
          <button className="carousel-arrow left" onClick={prev} aria-label="Previous cards">◀</button>
        </div>

        <div className="cards-track">
          {visibleItems.map((p, idx) => (
            <div key={idx} className="card-slot">
              <Card
                page={p}
                isActive={p?.id === activeId}
                onClick={() => p && handleCardClick(p)}
              />
            </div>
          ))}
        </div>

        <div className="carousel-controls">
          <button className="carousel-arrow right" onClick={next} aria-label="Next cards">▶</button>
        </div>
      </div>
    </section>
  );
}
