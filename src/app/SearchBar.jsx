"use client";
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(value);
  }

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Search blogs..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="b-btn">
        Search
      </button>
    </form>
  );
}
