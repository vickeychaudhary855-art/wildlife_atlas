"use client";

import { useState } from "react";
import Link from "next/link";
import { FileDown, ArrowLeft, Copy, Check, Printer } from "lucide-react";
import { SAMPLE_ANIMALS } from "@/data/sampleAnimals";

export default function ExportToolsPage() {
  const [selectedSlug, setSelectedSlug] = useState("african-elephant");
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const animal = SAMPLE_ANIMALS.find((a) => a.slug === selectedSlug) || SAMPLE_ANIMALS[0];

  const citations = {
    apa: `Wildlife Atlas Taxonomists. (2024). ${animal.commonName} (${animal.scientificName}): Ecological Profile and Conservation Metrics. Wildlife Atlas Biodiversity Database. https://wildlife-atlas.org/animals/${animal.slug}`,
    bibtex: `@article{wildlifeatlas_${animal.slug},
  author = {{Wildlife Atlas Collaboration}},
  title = {${animal.commonName} (${animal.scientificName}) Species Dossier},
  journal = {Wildlife Atlas Global Animal Encyclopedia},
  year = {2024},
  url = {https://wildlife-atlas.org/animals/${animal.slug}}
}`,
    iso: `WILDLIFE ATLAS COLLABORATION. ${animal.commonName} (${animal.scientificName}) [online]. Global Biodiversity Encyclopedia, 2024. Available from: https://wildlife-atlas.org/animals/${animal.slug}`,
  };

  const handleCopy = (text: string, format: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(animal, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${animal.slug}-biodiversity-dossier.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleDownloadCSV = () => {
    const headers = ["Slug", "Common Name", "Scientific Name", "Category", "Family", "Genus", "IUCN Status", "Habitats", "Continents"];
    const row = [
      animal.slug,
      `"${animal.commonName}"`,
      `"${animal.scientificName}"`,
      animal.category,
      `"${animal.family}"`,
      `"${animal.genus}"`,
      animal.conservationStatus,
      `"${animal.primaryHabitats.join("; ")}"`,
      `"${animal.continents.join("; ")}"`,
    ];
    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent([headers.join(","), row.join(",")].join("\n"));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", csvContent);
    downloadAnchor.setAttribute("download", `${animal.slug}-taxonomy-record.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
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
          <FileDown className="w-8 h-8 text-purple-500" />
          <span>Academic Dossier Export Suite</span>
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[var(--muted)]">
          Export standardized citations in APA 7, BibTeX, and ISO 690 format, or print research reports for fieldwork and academic citation.
        </p>
      </div>

      {/* Species Selector */}
      <div className="max-w-md mx-auto mb-10">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-2 text-center">
          Select Species for Dossier:
        </label>
        <select
          value={selectedSlug}
          onChange={(e) => setSelectedSlug(e.target.value)}
          className="w-full p-3 rounded-2xl border bg-[var(--card-bg)] border-[var(--card-border)] text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 shadow-sm"
        >
          {SAMPLE_ANIMALS.map((a) => (
            <option key={a.slug} value={a.slug}>
              {a.commonName} ({a.scientificName})
            </option>
          ))}
        </select>
      </div>

      {/* Export Options Card */}
      <div className="p-8 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] shadow-xl space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--card-border)]">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              {animal.commonName} Academic Dossier
            </h2>
            <p className="text-xs text-[var(--muted)] font-serif italic mt-0.5">{animal.scientificName}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleDownloadJSON}
              className="px-3.5 py-2 rounded-xl border bg-[var(--card-bg)] border-[var(--card-border)] text-xs font-semibold text-foreground hover:bg-forest-500/10 transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <FileDown className="w-4 h-4 text-purple-500" />
              <span>Export JSON</span>
            </button>
            <button
              onClick={handleDownloadCSV}
              className="px-3.5 py-2 rounded-xl border bg-[var(--card-bg)] border-[var(--card-border)] text-xs font-semibold text-foreground hover:bg-forest-500/10 transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <FileDown className="w-4 h-4 text-emerald-500" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-500 transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / PDF</span>
            </button>
          </div>
        </div>

        {/* Citation Formats */}
        <div className="space-y-6">
          {/* APA 7 */}
          <div className="p-5 rounded-2xl bg-forest-500/5 border border-[var(--card-border)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                APA 7th Edition
              </span>
              <button
                onClick={() => handleCopy(citations.apa, "apa")}
                className="text-xs font-semibold text-forest-600 dark:text-forest-400 flex items-center gap-1 hover:underline"
              >
                {copiedFormat === "apa" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedFormat === "apa" ? "Copied" : "Copy Citation"}</span>
              </button>
            </div>
            <p className="text-xs text-foreground font-mono leading-relaxed bg-[var(--card-bg)] p-3 rounded-xl border border-[var(--card-border)]">
              {citations.apa}
            </p>
          </div>

          {/* BibTeX */}
          <div className="p-5 rounded-2xl bg-forest-500/5 border border-[var(--card-border)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                BibTeX (LaTeX)
              </span>
              <button
                onClick={() => handleCopy(citations.bibtex, "bibtex")}
                className="text-xs font-semibold text-forest-600 dark:text-forest-400 flex items-center gap-1 hover:underline"
              >
                {copiedFormat === "bibtex" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedFormat === "bibtex" ? "Copied" : "Copy BibTeX"}</span>
              </button>
            </div>
            <pre className="text-xs text-foreground font-mono leading-relaxed bg-[var(--card-bg)] p-3 rounded-xl border border-[var(--card-border)] overflow-x-auto whitespace-pre">
              {citations.bibtex}
            </pre>
          </div>

          {/* ISO 690 */}
          <div className="p-5 rounded-2xl bg-forest-500/5 border border-[var(--card-border)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                ISO 690
              </span>
              <button
                onClick={() => handleCopy(citations.iso, "iso")}
                className="text-xs font-semibold text-forest-600 dark:text-forest-400 flex items-center gap-1 hover:underline"
              >
                {copiedFormat === "iso" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedFormat === "iso" ? "Copied" : "Copy Citation"}</span>
              </button>
            </div>
            <p className="text-xs text-foreground font-mono leading-relaxed bg-[var(--card-bg)] p-3 rounded-xl border border-[var(--card-border)]">
              {citations.iso}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
