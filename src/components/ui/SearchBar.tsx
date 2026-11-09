"use client";

import React, { useCallback } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchBarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = "Search by species name, family, habitat...",
  className,
  ...props
}: SearchBarProps) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onSearch(value);
      }
    },
    [onSearch, value]
  );

  const handleClear = useCallback(() => {
    onChange("");
  }, [onChange]);

  return (
    <div
      className={cn(
        "relative mx-auto flex w-full max-w-2xl items-center",
        className
      )}
      {...props}
    >
      <div className="relative flex w-full items-center rounded-full border border-sage-200/60 bg-white/70 shadow-sm backdrop-blur-md transition-shadow focus-within:shadow-md focus-within:ring-2 focus-within:ring-forest-500/30 dark:border-sage-700/60 dark:bg-sage-950/70">
        {/* Search icon */}
        <Search className="pointer-events-none ml-4 h-5 w-5 shrink-0 text-sage-400 dark:text-sage-500" />

        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 bg-transparent px-3 py-3 text-sm text-foreground placeholder:text-sage-400 focus:outline-none dark:placeholder:text-sage-500 sm:text-base"
        />

        {/* Clear button */}
        {value.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="mr-1 rounded-full p-1.5 text-sage-400 transition-colors hover:bg-sage-100 hover:text-sage-600 dark:text-sage-500 dark:hover:bg-sage-800 dark:hover:text-sage-300"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {/* Search button */}
        <button
          type="button"
          onClick={() => onSearch(value)}
          className="mr-1.5 rounded-full bg-forest-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-forest-600 active:bg-forest-800 dark:bg-forest-600 dark:hover:bg-forest-500 sm:px-5"
        >
          Search
        </button>
      </div>
    </div>
  );
}
