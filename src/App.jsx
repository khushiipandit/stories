import React, { useState } from "react";
import Header from "./components/Header.jsx";
import InputBook from "./components/InputBook.jsx";
import StoryGrid from "./components/StoryGrid.jsx";

export default function App() {
  const [storyText, setStoryText] = useState("");
  const [pages, setPages] = useState([]); // later populated by API (images + text)

  // Temporary mock generation (replace with API calls)
  const handleGenerate = (sentence) => {
    setStoryText(`Once upon a time, ${sentence} — and a magical adventure unfurled.`);
    // mock pages to show grid (replace with API images/text)
    setPages([
      { id: 1, title: "Page 1", excerpt: "The sky shimmered...", img: "/placeholder-illustration-1.png" },
      { id: 2, title: "Page 2", excerpt: "A small friend appeared...", img: "/placeholder-illustration-2.png" },
      { id: 3, title: "Page 3", excerpt: "They walked into the woods...", img: "/placeholder-illustration-1.png" },
      { id: 4, title: "Page 4", excerpt: "A surprise by the river...", img: "/placeholder-illustration-2.png" },
    ]);
  };

  return (
    <div className="app-root">
      <div className="sky-bg" />
      <div className="page-container">
        <Header />
        <InputBook onGenerate={handleGenerate} />
        <div className="result-note">
          {storyText ? <p className="result-text">{storyText}</p> : <p className="hint">Type a sentence to create your story and illustrations</p>}
        </div>

        <StoryGrid pages={pages} />
      </div>
    </div>
  );
}
