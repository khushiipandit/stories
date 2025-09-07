// src/components/SettingsPanel.jsx
import React from "react";

const genreOptions = [
  { value: "fantasy", label: "Fantasy" },
  { value: "sci-fi", label: "Sci-Fi" },
  { value: "mystery", label: "Mystery" },
  { value: "adventure", label: "Adventure" },
  { value: "comedy", label: "Comedy" },
  { value: "horror", label: "Horror" },
  { value: "romance", label: "Romance" }
];

const toneOptions = [
  { value: "lighthearted", label: "Lighthearted" },
  { value: "dark", label: "Dark" },
  { value: "epic", label: "Epic" },
  { value: "humorous", label: "Humorous" },
  { value: "serious", label: "Serious" },
  { value: "mysterious", label: "Mysterious" }
];

const audienceOptions = [
  { value: "children", label: "Children" },
  { value: "teens", label: "Teens" },
  { value: "adults", label: "Adults" },
  { value: "all-ages", label: "All Ages" }
];

const artStyleOptions = [
  { value: "fantasy-art", label: "Fantasy Art" },
  { value: "realistic", label: "Realistic" },
  { value: "cartoon", label: "Cartoon" },
  { value: "anime", label: "Anime" },
  { value: "watercolor", label: "Watercolor" },
  { value: "digital-art", label: "Digital Art" },
  { value: "oil-painting", label: "Oil Painting" }
];

export default function SettingsPanel({ settings, onChange, onClose }) {
  const handleChange = (key, value) => {
    onChange({
      ...settings,
      [key]: value
    });
  };

  return (
    <div className="settings-panel">
      <div className="settings-header">
        <h3>Story Settings</h3>
        <button className="settings-close" onClick={onClose}>×</button>
      </div>
      
      <div className="settings-group">
        <label>Genre</label>
        <select 
          value={settings.genre} 
          onChange={(e) => handleChange("genre", e.target.value)}
        >
          {genreOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="settings-group">
        <label>Tone</label>
        <select 
          value={settings.tone} 
          onChange={(e) => handleChange("tone", e.target.value)}
        >
          {toneOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="settings-group">
        <label>Audience</label>
        <select 
          value={settings.audience} 
          onChange={(e) => handleChange("audience", e.target.value)}
        >
          {audienceOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="settings-group">
        <label>Art Style</label>
        <select 
          value={settings.artStyle} 
          onChange={(e) => handleChange("artStyle", e.target.value)}
        >
          {artStyleOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="settings-footer">
        <button className="settings-apply" onClick={onClose}>
          Apply Settings
        </button>
      </div>
    </div>
  );
}