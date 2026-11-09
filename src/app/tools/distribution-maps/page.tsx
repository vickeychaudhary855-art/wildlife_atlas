"use client";

import { useState } from "react";
import Link from "next/link";
import { Map, ArrowLeft, Globe, Layers, Navigation, Mountain } from "lucide-react";
import { SAMPLE_ANIMALS } from "@/data/sampleAnimals";
import { cn } from "@/lib/utils";

export default function DistributionMapsPage() {
  const [selectedSlug, setSelectedSlug] = useState("african-elephant");
  const [activeLayer, setActiveLayer] = useState<"native" | "historical" | "corridors">("native");

  const animal = SAMPLE_ANIMALS.find((a) => a.slug === selectedSlug) || SAMPLE_ANIMALS[0];

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest-600 dark:text-forest-400 hover:text-forest-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Research Tools</span>
        </Link>
      </div>

      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight flex items-center justify-center gap-3">
          <Map className="w-8 h-8 text-amber-500" />
          <span>Biogeographic Distribution Maps</span>
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[var(--muted)]">
          Geographic information system (GIS) mapping native ranges, elevation barriers, and fragmented corridors.
        </p>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
            Select Species:
          </label>
          <select
            value={selectedSlug}
            onChange={(e) => setSelectedSlug(e.target.value)}
            className="w-full p-2.5 rounded-xl border bg-[var(--card-bg)] border-[var(--card-border)] text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          >
            {SAMPLE_ANIMALS.map((a) => (
              <option key={a.slug} value={a.slug}>
                {a.commonName} ({a.scientificName})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
            GIS Layer Mode:
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveLayer("native")}
              className={cn(
                "flex-1 py-2.5 rounded-xl text-xs font-bold transition-colors",
                activeLayer === "native"
                  ? "bg-forest-600 text-white"
                  : "bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--muted)]"
              )}
            >
              Current Native
            </button>
            <button
              onClick={() => setActiveLayer("historical")}
              className={cn(
                "flex-1 py-2.5 rounded-xl text-xs font-bold transition-colors",
                activeLayer === "historical"
                  ? "bg-amber-600 text-white"
                  : "bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--muted)]"
              )}
            >
              Historical Range
            </button>
            <button
              onClick={() => setActiveLayer("corridors")}
              className={cn(
                "flex-1 py-2.5 rounded-xl text-xs font-bold transition-colors",
                activeLayer === "corridors"
                  ? "bg-blue-600 text-white"
                  : "bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--muted)]"
              )}
            >
              Corridors
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Map Visualizer Canvas */}
      <div className="rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] overflow-hidden shadow-xl mb-8">
        <div className="p-6 border-b border-[var(--card-border)] flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-foreground">{animal.commonName} Range Geography</h2>
            <p className="text-xs text-[var(--muted)] font-serif italic">{animal.scientificName}</p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="px-3 py-1 rounded-full bg-forest-500/10 text-forest-600 font-semibold flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              <span>Continents: {animal.continents.join(", ")}</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 font-semibold flex items-center gap-1.5">
              <Mountain className="w-3.5 h-3.5" />
              <span>Elevation: 0 – 4,350 m</span>
            </span>
          </div>
        </div>

        {/* Stylized Geospatial Map Graphic */}
        <div className="relative aspect-[21/9] min-h-[320px] bg-forest-950 flex items-center justify-center overflow-hidden">
          {/* Grid lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#3d8d64_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />

          {/* Compass Rose */}
          <div className="absolute top-6 right-6 p-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-forest-300">
            <Navigation className="w-5 h-5" />
          </div>

          {/* Biogeographic Range Nodes Representation */}
          <div className="relative z-10 text-center space-y-4 max-w-lg px-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md text-white text-xs">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Displaying: <strong className="text-emerald-400 capitalize">{activeLayer} Range Density</strong></span>
            </div>

            <div className="p-6 rounded-2xl bg-forest-900/60 border border-forest-500/30 backdrop-blur-md text-white text-xs leading-relaxed">
              <div className="font-bold text-sm text-forest-200 mb-1">
                Ecosystem Biomes: {animal.primaryHabitats.join(", ")}
              </div>
              <p className="text-forest-300/80">
                Range is fragmented into discrete sub-populations. Protected transboundary migration complexes (e.g. KAZA TFCA) preserve functional gene-flow across borders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

