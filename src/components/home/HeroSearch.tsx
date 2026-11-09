"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";

const SEARCH_SUGGESTIONS = [
  "African Elephant",
  "Blue Whale",
  "Komodo Dragon",
  "Harpy Eagle",
  "Great White Shark",
  "Axolotl",
  "Giant Pacific Octopus",
];

export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const filteredSuggestions = query.length > 0
    ? SEARCH_SUGGESTIONS.filter((s) =>
        s.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSearch = (searchTerm?: string) => {
    const term = searchTerm !== undefined ? searchTerm : query;
    if (term.trim()) {
      router.push(`/explore?q=${encodeURIComponent(term.trim())}`);
    } else {
      router.push("/explore");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-950 via-forest-900 to-forest-800" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-forest-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 flex flex-col items-center justify-center px-4 pt-32 pb-20 sm:pt-40 sm:pb-28 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-forest-500/10 border border-forest-500/20 text-forest-300 text-sm">
          <Sparkles className="w-4 h-4" />
          <span>Global Biodiversity Research Platform</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight max-w-4xl leading-[1.1]">
          <span className="bg-gradient-to-r from-forest-300 via-emerald-200 to-forest-400 bg-clip-text text-transparent">
            Wildlife Atlas
          </span>
        </h1>

        <p className="mt-4 text-lg sm:text-xl text-forest-200/80 max-w-2xl leading-relaxed">
          {SITE.tagline}
        </p>

        {/* Search Bar */}
        <div className="relative w-full max-w-2xl mt-10">
          <div
            className={cn(
              "flex items-center w-full rounded-full transition-all duration-300",
              "bg-white/10 backdrop-blur-xl border",
              focused
                ? "border-forest-400/60 shadow-lg shadow-forest-500/20 bg-white/15"
                : "border-white/10 hover:border-white/20"
            )}
          >
            <Search className="ml-5 w-5 h-5 text-forest-300 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 200)}
              placeholder="Search by species name, family, habitat..."
              className="flex-1 bg-transparent px-4 py-4 text-white placeholder:text-forest-300/50 outline-none text-base sm:text-lg"
              aria-label="Search animals"
            />
            <button
              onClick={() => handleSearch()}
              className="mr-2 px-6 py-2.5 rounded-full bg-forest-500 hover:bg-forest-400 text-white font-medium text-sm transition-colors flex items-center gap-2"
              aria-label="Search"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Suggestions Dropdown */}
          {focused && filteredSuggestions.length > 0 && (
            <div className="absolute top-full mt-2 w-full rounded-2xl bg-white/15 backdrop-blur-xl border border-white/15 overflow-hidden z-50 text-left shadow-2xl">
              {filteredSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  className="w-full px-5 py-3 text-left text-white hover:bg-white/15 transition-colors flex items-center gap-3 text-sm font-medium"
                  onMouseDown={() => {
                    setQuery(suggestion);
                    handleSearch(suggestion);
                  }}
                >
                  <Search className="w-4 h-4 text-forest-400" />
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Discovery Tags */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {[
            { label: "Endangered", query: "?status=EN" },
            { label: "Mammals", query: "?category=mammals" },
            { label: "Marine Life", query: "?category=marine-mammals" },
            { label: "Tropical Rainforest", query: "?habitat=Tropical+Rainforest" },
            { label: "Africa", query: "?continent=Africa" },
          ].map((tag) => (
            <button
              key={tag.label}
              onClick={() => router.push(`/explore${tag.query}`)}
              className="px-3 py-1 rounded-full text-xs text-forest-300 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--background)] to-transparent" />
    </section>
  );
}
