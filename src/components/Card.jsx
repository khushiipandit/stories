// src/components/Card.jsx
import React, { useState, useRef } from "react";

/*
 Card.jsx
 - Reusable card that displays thumbnail, title & excerpt
 - If `page` is null, show a placeholder skeleton
 - Supports both images and videos
*/

export default function Card({ page, onClick = () => {}, isActive = false }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef(null);

  const toggleFullscreen = () => {
    if (!page?.video) return;
    
    if (!isFullscreen) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
      setIsFullscreen(true);
    }
  };

  const handleFullscreenChange = () => {
    if (document.fullscreenElement === null) {
      setIsFullscreen(false);
    }
  };

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
    <>
      <article
        className={`card ${isActive ? "card--active" : ""}`}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === "Enter" ? onClick() : null)}
        aria-pressed={isActive}
      >
        <div className="card-art">
          {page.video ? (
            <video 
              ref={videoRef}
              src={page.video} 
              alt={page.title}
              muted
              loop
              playsInline
              onDoubleClick={toggleFullscreen}
              onFullscreenChange={handleFullscreenChange}
            />
          ) : (
            <img src={page.img || "/bg.png"} alt={page.title} />
          )}
        </div>
        <div className="card-body">
          <h3 className="card-title">{page.title}</h3>
          <p className="card-excerpt">{page.excerpt}</p>
        </div>
        <div className="card-footer">
          {page.video && (
            <button 
              className="card-btn fullscreen-btn"
              onClick={(e) => {
                e.stopPropagation();
                toggleFullscreen();
              }}
              title="Fullscreen"
            >
              ⛶
            </button>
          )}
          <button className="card-btn">Read</button>
        </div>
      </article>
    </>
  );
}