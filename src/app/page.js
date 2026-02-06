"use client";
import { useState } from "react";
import Link from "next/link";
import BlogCard from "./blogCard/BlogCard";
import SearchBar from "./SearchBar"; // 👈 add this

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">

        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">

          <div className="mainblog-top-head" style={{ justifyContent: "space-between" }}>
            <div className="flex flex-col">
              <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                Blog App
              </h1>
              <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                Here you'll see all the blog posts
              </p>
            </div>

            <div>
              <Link href={`/CreateNewBlog`}>
                <button className="b-btn">Write a New Blog</button>
              </Link>
            </div>
          </div>

          {/* 🔍 SEARCH BAR */}
          <SearchBar onSearch={setSearchQuery} />

          <div className="blog-section">
            <BlogCard searchQuery={searchQuery} />
          </div>

        </div>
      </main>
    </div>
  );
}
