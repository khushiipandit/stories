// src/components/Hero.jsx
import React, { useState, useRef, useEffect } from "react";
import Card from "./Card.jsx";
import SettingsPanel from "./SettingsPanel.jsx";
import "./Hero.css";

export default function Hero({ onGenerate, pages = [], storyText = "", setStoryText, isLoading }) {
  const [input, setInput] = useState("");
  const [settings, setSettings] = useState({
    genre: "fantasy",
    tone: "lighthearted",
    audience: "all-ages",
    artStyle: "fantasy-art"
  });
  const [showSettings, setShowSettings] = useState(false);
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
    generateStory();
  };

  const generateStory = () => {
    const sentence = input.trim();
    if (!sentence) {
      inputRef.current?.focus();
      return;
    }
    onGenerate(sentence, settings);
    setInput("");
  };

  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
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
      {/* Full screen video background */}
      <div className="fullscreen-video-container">
        <video 
          className="fullscreen-video" 
          autoPlay 
          muted 
          loop 
          playsInline
          poster="/bgv-poster.jpg"
        >
          <source src="/bgv.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Video overlay for better text visibility */}
        <div className="video-overlay"></div>
      </div>

      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <h1 className="site-title">📖 AI Story Generator</h1>
          <p className="subtitle">Turn your words into illustrated worlds ✨</p>
        </div>
      </header>

      {/* Input section */}
      <div className="input-section">
        {/* Stylish input placeholder */}
        <div id="poda">
          <div id="main">
            <label htmlFor="story-input" className="visually-hidden">Start your story</label>
            <input
              id="story-input"
              ref={inputRef}
              className="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your story idea..."
              aria-label="Type a sentence to begin your adventure"
              autoComplete="off"
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
              disabled={isLoading}
            />
            
            <div id="input-mask"></div>
            <div id="pink-mask"></div>
            
            <div id="search-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#C0B9C0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <div className="filterBorder"></div>
            <button 
              id="filter-icon"
              onClick={toggleSettings}
              aria-label="Story settings"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2.66675H2L6.66667 8.04408V12.6667L9.33333 14.0001V8.04408L14 2.66675Z" stroke="#C0B9C0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div className="white"></div>
            <div className="border"></div>
            <div className="darkBorderBg"></div>
            <div className="glow"></div>
          </div>
        </div>

        {/* Generate Story Button */}
        <button
          className="generate-story-btn"
          onClick={generateStory}
          disabled={isLoading}
          aria-label="Generate Story"
        >
          {isLoading ? (
            <div className="loading-spinner"></div>
          ) : (
            'Generate Story'
          )}
        </button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <SettingsPanel 
          settings={settings} 
          onChange={handleSettingsChange}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* Result area */}
      <div className="result-note">
        {storyText ? (
          <p className="result-text">{storyText}</p>
        ) : (
          <p className="hint">Type a story idea to create your illustrated story</p>
        )}
      </div>

      {/* Export buttons */}
      {pages.length > 0 && (
        <div className="export-buttons">
          <button className="export-btn" onClick={() => {/* Export as PDF */}}>
            📄 Export PDF
          </button>
          <button className="export-btn" onClick={() => {/* Export as images */}}>
            🖼️ Export Images
          </button>
          <button className="export-btn" onClick={() => {/* Share story */}}>
            🔗 Share Story
          </button>
        </div>
      )}

      {/* Cards carousel (six visible) */}
      {pages.length > 0 && (
        <div className="cards-carousel" aria-label="Story cards carousel">
          <div className="carousel-controls">
            <button className="carousel-arrow left" onClick={prev} aria-label="Previous cards">◀</button>
          </div>

          <div className="cards-track">
            {visibleItems.map((p, idx) => (
              <div key={p ? p.id : idx} className="card-slot">
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
      )}

      {/* Loading overlay */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="loading-spinner-large"></div>
            <p>Generating your story and illustrations...</p>
            <p className="loading-subtext">This may take a few moments</p>
          </div>
        </div>
      )}
    </section>
  );
}