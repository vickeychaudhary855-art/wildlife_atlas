"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { IUCN_LABELS } from "@/lib/constants";
import { SAMPLE_ANIMALS } from "@/data/sampleAnimals";

export function FeaturedSpecies() {
  const featured = SAMPLE_ANIMALS.filter((a) => a.featured).slice(0, 4);

  if (featured.length === 0) return null;

  const hero = featured[0];
  const rest = featured.slice(1);

  return (
    <section className="px-4 py-20 sm:py-24 bg-forest-950/[0.02] dark:bg-forest-950/40">
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-forest-500 mb-3">
              Featured Research
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Featured Species
            </h2>
            <p className="mt-3 text-[var(--muted)] max-w-xl">
              Highlighted species with comprehensive research profiles and recent conservation updates.
            </p>
          </div>
          <Link
            href="/explore?featured=true"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-sm font-medium text-forest-600 dark:text-forest-400 hover:text-forest-500 transition-colors"
          >
            View all featured
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Hero featured card */}
          <Link
            href={`/animals/${hero.slug}`}
            className={cn(
              "group relative overflow-hidden rounded-2xl aspect-[4/3] lg:aspect-auto lg:row-span-2",
              "border border-[var(--card-border)] hover:border-forest-500/40 transition-all duration-500"
            )}
          >
            <Image
              src={hero.imageUrl}
              alt={hero.imageAlt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                {IUCN_LABELS[hero.conservationStatus] && (
                  <span
                    className={cn(
                      "px-2.5 py-0.5 rounded-full text-xs font-bold",
                      IUCN_LABELS[hero.conservationStatus].color,
                      IUCN_LABELS[hero.conservationStatus].textColor
                    )}
                  >
                    {hero.conservationStatus} — {IUCN_LABELS[hero.conservationStatus].label}
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                  {hero.category}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                {hero.commonName}
              </h3>
              <p className="text-sm italic text-white/70 mt-1">
                {hero.scientificName}
              </p>
              <p className="text-sm text-white/60 mt-3 line-clamp-2 max-w-lg">
                {hero.shortDescription}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm text-forest-300 group-hover:text-forest-200 transition-colors">
                <Crown className="w-4 h-4" />
                View full research profile
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          {/* Secondary cards */}
          {rest.map((animal) => (
            <Link
              key={animal.id}
              href={`/animals/${animal.slug}`}
              className={cn(
                "group relative overflow-hidden rounded-2xl",
                "border border-[var(--card-border)] hover:border-forest-500/40 transition-all duration-300",
                "bg-[var(--card-bg)]"
              )}
            >
              <div className="flex flex-col sm:flex-row h-full">
                <div className="relative aspect-[16/10] sm:aspect-auto sm:w-48 flex-shrink-0">
                  <Image
                    src={animal.imageUrl}
                    alt={animal.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 200px"
                  />
                </div>
                <div className="p-5 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    {IUCN_LABELS[animal.conservationStatus] && (
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded-full text-[10px] font-bold",
                          IUCN_LABELS[animal.conservationStatus].color,
                          IUCN_LABELS[animal.conservationStatus].textColor
                        )}
                      >
                        {animal.conservationStatus}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-forest-600 dark:group-hover:text-forest-400 transition-colors">
                    {animal.commonName}
                  </h3>
                  <p className="text-xs italic text-[var(--muted)] mt-0.5">
                    {animal.scientificName}
                  </p>
                  <p className="text-xs text-[var(--muted)] mt-2 line-clamp-2">
                    {animal.shortDescription}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

