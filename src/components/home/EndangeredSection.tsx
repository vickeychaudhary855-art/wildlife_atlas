"use client";

import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, ArrowRight, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { IUCN_LABELS } from "@/lib/constants";
import { SAMPLE_ANIMALS } from "@/data/sampleAnimals";

export function EndangeredSection() {
  const endangered = SAMPLE_ANIMALS.filter((a) =>
    ["CR", "EN"].includes(a.conservationStatus)
  ).slice(0, 4);

  const rare = SAMPLE_ANIMALS.filter((a) => a.rare).slice(0, 2);
  const combined = [...endangered, ...rare].reduce((acc, a) => {
    if (!acc.find((x) => x.id === a.id)) acc.push(a);
    return acc;
  }, [] as typeof endangered);

  return (
    <section className="px-4 py-20 sm:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Warning banner */}
        <div className="flex items-start gap-4 p-5 rounded-2xl bg-red-500/5 border border-red-500/10 dark:bg-red-900/10 mb-12">
          <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-foreground">
              Species at Critical Risk
            </h3>
            <p className="text-sm text-[var(--muted)] mt-1">
              These species face imminent extinction risk. Population data reflects the
              latest available assessments. Estimates may carry significant uncertainty
              — see individual profiles for confidence levels and methodology.
            </p>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Endangered */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-red-500" />
              <h2 className="text-2xl font-bold text-foreground">
                Endangered & Critically Endangered
              </h2>
            </div>
            <div className="space-y-4">
              {endangered.map((animal) => (
                <Link
                  key={animal.id}
                  href={`/animals/${animal.slug}`}
                  className={cn(
                    "group flex items-center gap-4 p-4 rounded-xl border transition-all duration-300",
                    "bg-[var(--card-bg)] border-[var(--card-border)]",
                    "hover:border-red-500/30 hover:shadow-md hover:shadow-red-500/5"
                  )}
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={animal.imageUrl}
                      alt={animal.imageAlt}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground truncate">
                        {animal.commonName}
                      </h3>
                      {IUCN_LABELS[animal.conservationStatus] && (
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0",
                            IUCN_LABELS[animal.conservationStatus].color,
                            IUCN_LABELS[animal.conservationStatus].textColor
                          )}
                        >
                          {animal.conservationStatus}
                        </span>
                      )}
                    </div>
                    <p className="text-xs italic text-[var(--muted)]">
                      {animal.scientificName}
                    </p>
                    <p className="text-xs text-[var(--muted)] mt-1">
                      Est. population: {animal.populationEstimate} · Trend: {animal.populationTrend}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[var(--muted)] group-hover:text-red-500 transition-colors flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          {/* Rare Species */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-amber-500" />
              <h2 className="text-2xl font-bold text-foreground">
                Rare & Unusual Species
              </h2>
            </div>
            <div className="space-y-4">
              {combined
                .filter((a) => a.rare)
                .map((animal) => (
                  <Link
                    key={`rare-${animal.id}`}
                    href={`/animals/${animal.slug}`}
                    className={cn(
                      "group flex flex-col overflow-hidden rounded-xl border transition-all duration-300",
                      "bg-[var(--card-bg)] border-[var(--card-border)]",
                      "hover:border-amber-500/30 hover:shadow-md hover:shadow-amber-500/5"
                    )}
                  >
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={animal.imageUrl}
                        alt={animal.imageAlt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white">
                        RARE
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-foreground">
                        {animal.commonName}
                      </h3>
                      <p className="text-xs italic text-[var(--muted)]">
                        {animal.scientificName}
                      </p>
                      <p className="text-sm text-[var(--muted)] mt-2 line-clamp-2">
                        {animal.shortDescription}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>

            {/* Additional note */}
            <div className="mt-6 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 dark:bg-amber-900/10">
              <p className="text-xs text-[var(--muted)]">
                <strong className="text-foreground">About rare species:</strong> Rarity
                can refer to naturally low population densities, restricted geographic
                ranges, or cryptic behaviour that limits observation. Being rare does not
                always equate to being endangered.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

