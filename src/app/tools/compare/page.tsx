"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SAMPLE_ANIMALS } from "@/data/sampleAnimals";
import { IUCN_LABELS } from "@/lib/constants";
import { ArrowLeft, Download, Scale, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ComparePage() {
  const [slugA, setSlugA] = useState("african-elephant");
  const [slugB, setSlugB] = useState("blue-whale");

  const animalA = SAMPLE_ANIMALS.find((a) => a.slug === slugA) || SAMPLE_ANIMALS[0];
  const animalB = SAMPLE_ANIMALS.find((a) => a.slug === slugB) || SAMPLE_ANIMALS[6];

  const handleExportCSV = () => {
    const headers = ["Parameter", animalA.commonName, animalB.commonName];
    const rows = [
      ["Scientific Name", animalA.scientificName, animalB.scientificName],
      ["Taxonomic Class", animalA.className, animalB.className],
      ["Order", animalA.order, animalB.order],
      ["Family", animalA.family, animalB.family],
      ["Genus", animalA.genus, animalB.genus],
      ["Diet", animalA.diet, animalB.diet],
      ["Average Dimensions", animalA.size, animalB.size],
      ["Average Weight", animalA.weight, animalB.weight],
      ["Wild Lifespan", animalA.lifespanWild, animalB.lifespanWild],
      ["Conservation Status", animalA.conservationStatus, animalB.conservationStatus],
      ["Population Trend", animalA.populationTrend, animalB.populationTrend],
      ["Population Estimate", animalA.populationEstimate, animalB.populationEstimate],
      ["Primary Habitats", animalA.primaryHabitats.join("; "), animalB.primaryHabitats.join("; ")],
      ["Continents", animalA.continents.join("; "), animalB.continents.join("; ")],
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.map((val) => `"${val}"`).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `comparison_${animalA.slug}_vs_${animalB.slug}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const COMPARISON_ROWS = [
    { label: "Scientific Binomial", valA: <em>{animalA.scientificName}</em>, valB: <em>{animalB.scientificName}</em> },
    { label: "Taxonomic Class", valA: animalA.className, valB: animalB.className },
    { label: "Order", valA: animalA.order, valB: animalB.order },
    { label: "Family", valA: animalA.family, valB: animalB.family },
    { label: "Trophic Diet", valA: animalA.diet, valB: animalB.diet },
    { label: "Adult Weight", valA: animalA.weight, valB: animalB.weight },
    { label: "Physical Dimensions", valA: animalA.size, valB: animalB.size },
    { label: "Wild Lifespan", valA: animalA.lifespanWild, valB: animalB.lifespanWild },
    {
      label: "IUCN Red List Status",
      valA: (
        <span className={cn("px-2.5 py-0.5 rounded text-xs font-bold", IUCN_LABELS[animalA.conservationStatus]?.color, IUCN_LABELS[animalA.conservationStatus]?.textColor)}>
          {animalA.conservationStatus} — {IUCN_LABELS[animalA.conservationStatus]?.label}
        </span>
      ),
      valB: (
        <span className={cn("px-2.5 py-0.5 rounded text-xs font-bold", IUCN_LABELS[animalB.conservationStatus]?.color, IUCN_LABELS[animalB.conservationStatus]?.textColor)}>
          {animalB.conservationStatus} — {IUCN_LABELS[animalB.conservationStatus]?.label}
        </span>
      ),
    },
    { label: "Population Trend", valA: animalA.populationTrend, valB: animalB.populationTrend },
    { label: "Census Estimate", valA: animalA.populationEstimate, valB: animalB.populationEstimate },
    { label: "Primary Habitats", valA: animalA.primaryHabitats.join(", "), valB: animalB.primaryHabitats.join(", ") },
    { label: "Geographic Continents", valA: animalA.continents.join(", "), valB: animalB.continents.join(", ") },
  ];

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Back and Title */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest-600 dark:text-forest-400 hover:text-forest-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Research Tools</span>
        </Link>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2 rounded-xl bg-forest-600 text-white text-xs font-bold hover:bg-forest-500 flex items-center gap-2 transition-colors shadow-sm"
        >
          <Download className="w-4 h-4" />
          <span>Export Comparison (CSV)</span>
        </button>
      </div>

      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight flex items-center justify-center gap-3">
          <Scale className="w-8 h-8 text-forest-600 dark:text-forest-400" />
          <span>Taxonomic Comparison Tool</span>
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[var(--muted)]">
          Select any two species across different taxonomic phyla to analyze morphological variance and evolutionary divergence.
        </p>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Selector A */}
        <div className="p-6 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] space-y-4">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
            Species A:
          </label>
          <select
            value={slugA}
            onChange={(e) => setSlugA(e.target.value)}
            className="w-full p-3 rounded-xl border bg-[var(--background)] border-[var(--card-border)] text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-forest-500/50"
          >
            {SAMPLE_ANIMALS.map((a) => (
              <option key={a.slug} value={a.slug}>
                {a.commonName} ({a.scientificName})
              </option>
            ))}
          </select>

          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-forest-900/10">
            <Image
              src={animalA.imageUrl}
              alt={animalA.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Selector B */}
        <div className="p-6 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] space-y-4">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
            Species B:
          </label>
          <select
            value={slugB}
            onChange={(e) => setSlugB(e.target.value)}
            className="w-full p-3 rounded-xl border bg-[var(--background)] border-[var(--card-border)] text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-forest-500/50"
          >
            {SAMPLE_ANIMALS.map((a) => (
              <option key={a.slug} value={a.slug}>
                {a.commonName} ({a.scientificName})
              </option>
            ))}
          </select>

          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-forest-900/10">
            <Image
              src={animalB.imageUrl}
              alt={animalB.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--card-border)] bg-forest-500/5 text-foreground font-bold">
                <th className="py-4 px-6 w-1/4">Biological Metric</th>
                <th className="py-4 px-6 w-3/8 text-forest-700 dark:text-forest-300 font-extrabold text-sm">
                  {animalA.commonName}
                </th>
                <th className="py-4 px-6 w-3/8 text-forest-700 dark:text-forest-300 font-extrabold text-sm">
                  {animalB.commonName}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)]">
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.label} className="hover:bg-forest-500/5">
                  <td className="py-3.5 px-6 font-semibold text-[var(--muted)]">
                    {row.label}
                  </td>
                  <td className="py-3.5 px-6 text-foreground font-medium">
                    {row.valA}
                  </td>
                  <td className="py-3.5 px-6 text-foreground font-medium">
                    {row.valB}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Profile quick links */}
      <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
        <Link
          href={`/animals/${animalA.slug}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-forest-600 dark:text-forest-400 hover:underline"
        >
          <span>Explore full {animalA.commonName} profile</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href={`/animals/${animalB.slug}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-forest-600 dark:text-forest-400 hover:underline"
        >
          <span>Explore full {animalB.commonName} profile</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

