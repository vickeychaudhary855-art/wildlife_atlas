"use client";

import { useState } from "react";
import { Printer, Share2, Check } from "lucide-react";

interface ResearchDossierActionsProps {
  slug: string;
  speciesName: string;
}

export function ResearchDossierActions({ slug, speciesName }: ResearchDossierActionsProps) {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : `https://wildlife-atlas.org/animals/${slug}/research`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Research Dossier: ${speciesName} — Wildlife Atlas`,
          text: `Scientific research dossier and taxonomic records for ${speciesName}.`,
          url,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="flex items-center gap-3 no-print">
      <button
        onClick={handlePrint}
        className="px-3.5 py-1.5 rounded-xl border bg-[var(--card-bg)] border-[var(--card-border)] text-xs font-medium text-foreground hover:bg-forest-500/10 flex items-center gap-1.5 transition-colors cursor-pointer"
        title="Print or Save as PDF"
      >
        <Printer className="w-3.5 h-3.5 text-forest-600 dark:text-forest-400" />
        <span>Print / PDF</span>
      </button>

      <button
        onClick={handleShare}
        className="px-3.5 py-1.5 rounded-xl border bg-[var(--card-bg)] border-[var(--card-border)] text-xs font-medium text-foreground hover:bg-forest-500/10 flex items-center gap-1.5 transition-colors cursor-pointer"
        title="Share or copy dossier link"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-emerald-600 dark:text-emerald-400">Link Copied!</span>
          </>
        ) : (
          <>
            <Share2 className="w-3.5 h-3.5 text-forest-600 dark:text-forest-400" />
            <span>Share Dossier</span>
          </>
        )}
      </button>
    </div>
  );
}
