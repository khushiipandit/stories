// src/App.jsx
import React, { useState } from "react";
import Hero from "./components/Hero.jsx";
import TaglineBar from "./components/TaglineBar.jsx";  // 🔥 new
import "./App.css";

export default function App() {
  const [storyText, setStoryText] = useState("");
  const [pages, setPages] = useState([]);

  const handleGenerate = (sentence) => {
    setStoryText(`Once upon a time, ${sentence} — and a magical adventure unfurled.`);
    setPages([
      { id: 1, title: "Page 1", excerpt: "The sky shimmered with quiet light...", img: "/placeholder-illustration-1.png" },
      { id: 2, title: "Page 2", excerpt: "A small friend appeared at dusk...", img: "/placeholder-illustration-2.png" },
      { id: 3, title: "Page 3", excerpt: "They walked into the woods and found a secret...", img: "/placeholder-illustration-1.png" },
      { id: 4, title: "Page 4", excerpt: "A surprise at the riverbank changed everything...", img: "/placeholder-illustration-2.png" },
      { id: 5, title: "Page 5", excerpt: "The trees whispered names of the old guardians...", img: "/placeholder-illustration-1.png" },
      { id: 6, title: "Page 6", excerpt: "Moonlight paved the path back home...", img: "/placeholder-illustration-2.png" },
      { id: 7, title: "Page 7", excerpt: "An unexpected friend joined the adventure...", img: "/placeholder-illustration-1.png" },
      { id: 8, title: "Page 8", excerpt: "The end? Or the beginning of something else...", img: "/placeholder-illustration-2.png" },
    ]);
  };

  return (
    <div className="app-root">
      <TaglineBar />  {/* 🔥 thin black strip at the very top */}
      <div className="page-container">
        <Hero
          onGenerate={handleGenerate}
          pages={pages}
          storyText={storyText}
          setStoryText={setStoryText}
        />
      </div>
    </div>
  );
}
