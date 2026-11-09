"use client";

import { useState, useTransition, useMemo, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, Filter, ArrowUpDown, X, Globe, RefreshCw } from "lucide-react";
import { SAMPLE_ANIMALS } from "@/data/sampleAnimals";
import { TAXONOMIC_GROUPS } from "@/data/taxonomyGroups";
import { HABITATS, IUCN_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";

function ExploreContent() {
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedHabitat, setSelectedHabitat] = useState("all");
  const [selectedContinent, setSelectedContinent] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState<"name" | "status" | "recent">("name");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Initialize from URL search parameters on mount
  useEffect(() => {
    const qParam = searchParams.get("q");
    const catParam = searchParams.get("category");
    const habParam = searchParams.get("habitat");
    const contParam = searchParams.get("continent");
    const statParam = searchParams.get("status");

    if (qParam) setSearchQuery(qParam);
    if (catParam) setSelectedCategory(catParam);
    if (habParam) setSelectedHabitat(habParam);
    if (contParam) setSelectedContinent(contParam);
    if (statParam) setSelectedStatus(statParam);
  }, [searchParams]);

  // Filtered dataset
  const filteredSpecies = useMemo(() => {
    let result = [...SAMPLE_ANIMALS];

    // Search query
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (a) =>
          a.commonName.toLowerCase().includes(q) ||
          a.scientificName.toLowerCase().includes(q) ||
          a.family.toLowerCase().includes(q) ||
          a.genus.toLowerCase().includes(q) ||
          a.order.toLowerCase().includes(q) ||
          a.shortDescription.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter((a) => a.category === selectedCategory);
    }

    // Habitat filter
    if (selectedHabitat !== "all") {
      const target = selectedHabitat.toLowerCase();
      result = result.filter((a) =>
        a.primaryHabitats.some((h) => h.toLowerCase().includes(target))
      );
    }

    // Continent filter
    if (selectedContinent !== "all") {
      result = result.filter((a) =>
        a.continents.some((c) => c.toLowerCase() === selectedContinent.toLowerCase())
      );
    }

    // IUCN status filter
    if (selectedStatus !== "all") {
      result = result.filter((a) => a.conservationStatus === selectedStatus);
    }

    // Sorting
    if (sortBy === "name") {
      result.sort((a, b) => a.commonName.localeCompare(b.commonName));
    } else if (sortBy === "status") {
      const order = ["CR", "EN", "VU", "NT", "LC", "DD", "NE"];
      result.sort((a, b) => {
        const idxA = order.indexOf(a.conservationStatus);
        const idxB = order.indexOf(b.conservationStatus);
        return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
      });
    }

    return result;
  }, [searchQuery, selectedCategory, selectedHabitat, selectedContinent, selectedStatus, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredSpecies.length / itemsPerPage) || 1;
  const paginatedSpecies = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredSpecies.slice(start, start + itemsPerPage);
  }, [filteredSpecies, currentPage]);

  const handleResetFilters = () => {
    startTransition(() => {
      setSearchQuery("");
      setSelectedCategory("all");
      setSelectedHabitat("all");
      setSelectedContinent("all");
      setSelectedStatus("all");
      setSortBy("name");
      setCurrentPage(1);
    });
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategory !== "all" ||
    selectedHabitat !== "all" ||
    selectedContinent !== "all" ||
    selectedStatus !== "all";

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Global Species Catalogue
        </h1>
        <p className="mt-2 text-sm text-[var(--muted)] max-w-2xl">
          Search and filter across taxonomic classes, biomes, biogeographic zones, and IUCN threat categories.
        </p>
      </div>

      {/* Main Search Bar & Sort Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted)] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by common name, scientific binomial, family, genus..."
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl border bg-[var(--card-bg)] border-[var(--card-border)] text-foreground placeholder:text-[var(--muted)] text-sm focus:outline-none focus:ring-2 focus:ring-forest-500/50 shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2">
          <div className="relative flex-shrink-0">
            <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)] pointer-events-none" />
            <select
              value={sortBy}
              aria-label="Sort species by"
              onChange={(e) => setSortBy(e.target.value as "name" | "status" | "recent")}
              className="pl-10 pr-8 py-3.5 rounded-2xl border bg-[var(--card-bg)] border-[var(--card-border)] text-foreground text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-forest-500/50 appearance-none shadow-sm cursor-pointer"
            >
              <option value="name">Sort by Name (A–Z)</option>
              <option value="status">Sort by Threat Level (CR first)</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="px-4 py-3.5 rounded-2xl border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 text-xs sm:text-sm font-semibold flex items-center gap-1.5 hover:bg-red-500/20 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar Filters */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-6 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] space-y-6">
            <div className="flex items-center gap-2 font-bold text-foreground text-sm border-b border-[var(--card-border)] pb-3">
              <Filter className="w-4 h-4 text-forest-600 dark:text-forest-400" />
              <span>Refine Discovery</span>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-2">
                Taxonomic Group
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full p-2.5 rounded-xl border bg-[var(--background)] border-[var(--card-border)] text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-forest-500/50"
              >
                <option value="all">All Groups ({SAMPLE_ANIMALS.length})</option>
                {TAXONOMIC_GROUPS.map((g) => (
                  <option key={g.slug} value={g.slug}>
                    {g.commonName}
                  </option>
                ))}
              </select>
            </div>

            {/* IUCN Red List Filter */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-2">
                IUCN Red List Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full p-2.5 rounded-xl border bg-[var(--background)] border-[var(--card-border)] text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-forest-500/50"
              >
                <option value="all">All Conservation Statuses</option>
                <option value="CR">Critically Endangered (CR)</option>
                <option value="EN">Endangered (EN)</option>
                <option value="VU">Vulnerable (VU)</option>
                <option value="NT">Near Threatened (NT)</option>
                <option value="LC">Least Concern (LC)</option>
                <option value="DD">Data Deficient (DD)</option>
                <option value="NE">Not Evaluated (NE)</option>
              </select>
            </div>

            {/* Continent Filter */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-2">
                Biogeographic Continent
              </label>
              <select
                value={selectedContinent}
                onChange={(e) => {
                  setSelectedContinent(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full p-2.5 rounded-xl border bg-[var(--background)] border-[var(--card-border)] text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-forest-500/50"
              >
                <option value="all">All Continents</option>
                {["Africa", "Asia", "Europe", "North America", "South America", "Oceania", "Antarctica"].map(
                  (c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Habitat Filter */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-2">
                Habitat / Biome
              </label>
              <select
                value={selectedHabitat}
                onChange={(e) => {
                  setSelectedHabitat(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full p-2.5 rounded-xl border bg-[var(--background)] border-[var(--card-border)] text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-forest-500/50"
              >
                <option value="all">All Habitats</option>
                {HABITATS.map((h) => (
                  <option key={h.slug} value={h.name}>
                    {h.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Right Species Grid */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-medium text-[var(--muted)]">
              Showing <strong className="text-foreground">{filteredSpecies.length}</strong> catalogued species
            </p>
          </div>

          {filteredSpecies.length === 0 ? (
            <div className="text-center py-20 p-8 rounded-3xl border border-dashed border-[var(--card-border)] bg-[var(--card-bg)]">
              <Globe className="w-10 h-10 text-[var(--muted)] mx-auto mb-3 opacity-50" />
              <h3 className="text-lg font-bold text-foreground">No matching species found</h3>
              <p className="text-xs text-[var(--muted)] mt-1 max-w-sm mx-auto">
                Try loosening your filters or search for another common name or scientific binomial.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-4 px-5 py-2 rounded-xl bg-forest-600 text-white text-xs font-semibold hover:bg-forest-500 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedSpecies.map((animal) => (
                <Link
                  key={animal.id}
                  href={`/animals/${animal.slug}`}
                  className={cn(
                    "group rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between",
                    "bg-[var(--card-bg)] border-[var(--card-border)]",
                    "hover:border-forest-500/40 hover:shadow-xl hover:shadow-forest-500/5 hover:-translate-y-1"
                  )}
                >
                  <div className="relative aspect-[16/11] overflow-hidden bg-forest-900/10">
                    <Image
                      src={animal.imageUrl}
                      alt={animal.imageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      {IUCN_LABELS[animal.conservationStatus] && (
                        <span
                          className={cn(
                            "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase shadow-sm",
                            IUCN_LABELS[animal.conservationStatus].color,
                            IUCN_LABELS[animal.conservationStatus].textColor
                          )}
                        >
                          {animal.conservationStatus}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-base text-foreground group-hover:text-forest-600 dark:group-hover:text-forest-400 transition-colors">
                        {animal.commonName}
                      </h3>
                      <p className="text-xs italic font-serif text-[var(--muted)] mt-0.5">
                        {animal.scientificName}
                      </p>
                      <p className="text-xs text-[var(--muted)] mt-2.5 line-clamp-2 leading-relaxed">
                        {animal.shortDescription}
                      </p>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-[var(--card-border)] flex items-center justify-between text-[11px] text-[var(--muted)]">
                      <span>Family: <strong className="text-foreground">{animal.family}</strong></span>
                      <span className="flex items-center gap-1 font-semibold text-forest-600 dark:text-forest-400">
                        Profile →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-4 py-2 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-forest-500/10 transition-colors"
              >
                Previous
              </button>
              <span className="text-xs font-medium text-[var(--muted)] px-3">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="px-4 py-2 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-forest-500/10 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-xs text-[var(--muted)]">
          Loading global species catalogue...
        </div>
      }
    >
      <ExploreContent />
    </Suspense>
  );
}
