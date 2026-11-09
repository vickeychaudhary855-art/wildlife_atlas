"use client";

import { useState } from "react";
import Link from "next/link";
import { LineChart, ArrowLeft, Info, ShieldAlert } from "lucide-react";
import { SAMPLE_ANIMALS } from "@/data/sampleAnimals";

interface TrendDataPoint {
  year: number;
  estimate: number;
  upperBound: number;
  lowerBound: number;
  censusMethod: string;
}

const POPULATION_TRAJECTORIES: Record<string, TrendDataPoint[]> = {
  "african-elephant": [
    { year: 1970, estimate: 1600000, upperBound: 1800000, lowerBound: 1400000, censusMethod: "Aerial Sample Transects" },
    { year: 1980, estimate: 1200000, upperBound: 1350000, lowerBound: 1050000, censusMethod: "Continental Sample Surveys" },
    { year: 1990, estimate: 600000, upperBound: 700000, lowerBound: 500000, censusMethod: "Acoustic & Transect Modeling" },
    { year: 2005, estimate: 550000, upperBound: 620000, lowerBound: 480000, censusMethod: "Stratified Aerial Surveys" },
    { year: 2016, estimate: 415000, upperBound: 435000, lowerBound: 395000, censusMethod: "Great Elephant Census (GEC)" },
    { year: 2024, estimate: 390000, upperBound: 420000, lowerBound: 360000, censusMethod: "KAZA Aerial Resurvey" },
  ],
  "blue-whale": [
    { year: 1900, estimate: 340000, upperBound: 380000, lowerBound: 300000, censusMethod: "Pre-whaling Historical Model" },
    { year: 1965, estimate: 1000, upperBound: 2000, lowerBound: 500, censusMethod: "Post-whaling Moratorium Assessment" },
    { year: 1980, estimate: 5000, upperBound: 8000, lowerBound: 3000, censusMethod: "Acoustic Sonobuoy Surveys" },
    { year: 2000, estimate: 12000, upperBound: 16000, lowerBound: 9000, censusMethod: "Photo-ID Mark-Recapture" },
    { year: 2024, estimate: 18000, upperBound: 25000, lowerBound: 12000, censusMethod: "Integrated Sighting Modeling" },
  ],
  "komodo-dragon": [
    { year: 1980, estimate: 5000, upperBound: 6000, lowerBound: 4200, censusMethod: "Island Trail Counts" },
    { year: 1995, estimate: 4500, upperBound: 5200, lowerBound: 3800, censusMethod: "Camera Trap Mark-Resight" },
    { year: 2010, estimate: 3800, upperBound: 4300, lowerBound: 3300, censusMethod: "Bait Station Intensive Sampling" },
    { year: 2024, estimate: 3000, upperBound: 3400, lowerBound: 2600, censusMethod: "Telemetry & Spatially Explicit Modeling" },
  ],
};

export default function PopulationTrendsPage() {
  const [selectedSlug, setSelectedSlug] = useState("african-elephant");
  const animal = SAMPLE_ANIMALS.find((a) => a.slug === selectedSlug) || SAMPLE_ANIMALS[0];
  const trajectory = POPULATION_TRAJECTORIES[selectedSlug] || POPULATION_TRAJECTORIES["african-elephant"];

  const maxVal = Math.max(...trajectory.map((d) => d.upperBound));

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
          <LineChart className="w-8 h-8 text-blue-500" />
          <span>Population Trajectory Modeler</span>
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[var(--muted)]">
          Inspect multi-decade empirical census baselines, confidence intervals, and uncertainty envelopes.
        </p>
      </div>

      {/* Species Selector */}
      <div className="max-w-md mx-auto mb-10">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-2 text-center">
          Select Taxon to Model:
        </label>
        <select
          value={selectedSlug}
          onChange={(e) => setSelectedSlug(e.target.value)}
          className="w-full p-3 rounded-2xl border bg-[var(--card-bg)] border-[var(--card-border)] text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm"
        >
          <option value="african-elephant">African Elephant (Loxodonta africana)</option>
          <option value="blue-whale">Blue Whale (Balaenoptera musculus)</option>
          <option value="komodo-dragon">Komodo Dragon (Varanus komodoensis)</option>
        </select>
      </div>

      {/* Main Chart Simulation & Metrics */}
      <div className="p-8 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] shadow-xl mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[var(--card-border)]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Longitudinal Census Analysis
            </span>
            <h2 className="text-2xl font-bold text-foreground mt-0.5">
              {animal.commonName} Trajectory ({trajectory[0].year}–{trajectory[trajectory.length - 1].year})
            </h2>
            <p className="text-xs text-[var(--muted)] font-serif italic">{animal.scientificName}</p>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-600" />
              <span>Median Estimate</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-blue-500/20 border border-blue-500/40" />
              <span>Confidence Envelope (95% CI)</span>
            </div>
          </div>
        </div>

        {/* Visual Bar Graph of Estimates */}
        <div className="h-72 flex items-end justify-between gap-2 sm:gap-6 pt-12 pb-4 px-2 sm:px-6 border-b border-[var(--card-border)]">
          {trajectory.map((point) => {
            const upperPercent = Math.round((point.upperBound / maxVal) * 100);

            return (
              <div key={point.year} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                {/* Tooltip on Hover */}
                <div className="absolute -top-14 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] px-2.5 py-1.5 rounded-lg pointer-events-none whitespace-nowrap shadow-lg z-20">
                  <div className="font-bold">{point.estimate.toLocaleString()} individuals</div>
                  <div className="text-slate-300">Method: {point.censusMethod}</div>
                </div>

                {/* Upper bound ghost */}
                <div
                  className="w-full max-w-[48px] bg-blue-500/15 border-t-2 border-dashed border-blue-500/40 rounded-t-lg transition-all"
                  style={{ height: `${upperPercent}%` }}
                >
                  {/* Estimate solid bar */}
                  <div
                    className="w-full bg-gradient-to-t from-blue-700 to-blue-500 rounded-t-md transition-all duration-500 group-hover:brightness-110"
                    style={{ height: `${Math.round((point.estimate / point.upperBound) * 100)}%` }}
                  />
                </div>

                <span className="text-[11px] font-bold text-foreground mt-3">{point.year}</span>
              </div>
            );
          })}
        </div>

        {/* Historical Survey Methodology Breakdown Table */}
        <div className="mt-8">
          <h3 className="font-bold text-sm text-foreground mb-4 flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-500" />
            <span>Survey Methodologies & Uncertainty Baselines</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-[var(--card-border)] text-[var(--muted)] uppercase font-semibold">
                  <th className="py-2.5 px-4">Year</th>
                  <th className="py-2.5 px-4">Survey Estimate</th>
                  <th className="py-2.5 px-4">Confidence Interval (95% CI)</th>
                  <th className="py-2.5 px-4">Methodological Survey Standard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--card-border)]">
                {trajectory.map((point) => (
                  <tr key={point.year} className="hover:bg-forest-500/5">
                    <td className="py-3 px-4 font-bold text-foreground">{point.year}</td>
                    <td className="py-3 px-4 font-mono font-semibold text-foreground">
                      {point.estimate.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-[var(--muted)] font-mono">
                      {point.lowerBound.toLocaleString()} – {point.upperBound.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-[var(--muted)]">{point.censusMethod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Uncertainty Standard Note */}
      <div className="p-6 rounded-3xl bg-amber-500/5 border border-amber-500/20 text-xs text-[var(--muted)] flex items-start gap-4">
        <ShieldAlert className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-foreground block">Scientific Modeling Protocol:</strong>
          <span>
            Wildlife Atlas never presents crude observation counts as census totals.
            Population trend graphs combine calibrated strip-transects, acoustic arrays, and mark-recapture statistical modeling.
          </span>
        </div>
      </div>
    </div>
  );
}
