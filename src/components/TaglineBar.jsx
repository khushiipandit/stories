// src/components/TaglineBar.jsx
import React from "react";

export default function TaglineBar() {
  return (
    <div className="bg-black py-1 text-center w-full fixed top-0 left-0 right-0 z-50 shadow-md">
      <p className="text-white text-xs sm:text-sm lg:text-base font-semibold italic tracking-wide">
        <span className="text-pink-400 font-bold">StorySpark</span> – Turn your words into
        <span className="text-yellow-300"> illustrated worlds ✨</span>
      </p>
    </div>
  );
}
