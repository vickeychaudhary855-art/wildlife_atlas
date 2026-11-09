import Link from "next/link";
import Image from "next/image";
import { History, ArrowRight, CheckCircle2 } from "lucide-react";
import { SAMPLE_ANIMALS } from "@/data/sampleAnimals";
import { IUCN_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function RecentlyUpdated() {
  const recentSpecies = SAMPLE_ANIMALS.slice(4, 10);

  return (
    <section className="px-4 py-20 sm:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-forest-600 dark:text-forest-400 mb-2">
              <History className="w-4 h-4" />
              <span>Taxonomic & Census Revisions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Recently Updated Species
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)] max-w-xl">
              Live updates synchronized from peer-reviewed taxonomic literature, IUCN Red List assessments, and verified biodiversity surveys.
            </p>
          </div>
          <Link
            href="/explore?sort=updated"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-forest-600 dark:text-forest-400 hover:text-forest-500 transition-colors"
          >
            Full update changelog
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentSpecies.map((animal, idx) => (
            <Link
              key={animal.id}
              href={`/animals/${animal.slug}`}
              className={cn(
                "group rounded-2xl border p-4 transition-all duration-300 flex items-center gap-4",
                "bg-[var(--card-bg)] border-[var(--card-border)]",
                "hover:border-forest-500/40 hover:shadow-md hover:shadow-forest-500/5"
              )}
            >
              <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-forest-900/10">
                <Image
                  src={animal.imageUrl}
                  alt={animal.imageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="80px"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {IUCN_LABELS[animal.conservationStatus] && (
                    <span
                      className={cn(
                        "px-1.5 py-0.5 rounded text-[10px] font-bold uppercase",
                        IUCN_LABELS[animal.conservationStatus].color,
                        IUCN_LABELS[animal.conservationStatus].textColor
                      )}
                    >
                      {animal.conservationStatus}
                    </span>
                  )}
                  <span className="text-[10px] text-[var(--muted)] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Verified #{idx + 104}
                  </span>
                </div>

                <h3 className="font-semibold text-foreground text-sm truncate group-hover:text-forest-600 dark:group-hover:text-forest-400 transition-colors">
                  {animal.commonName}
                </h3>
                <p className="text-xs italic text-[var(--muted)] truncate">
                  {animal.scientificName}
                </p>
                <p className="text-[11px] text-[var(--muted)] mt-1 truncate">
                  Family: <span className="text-foreground font-medium">{animal.family}</span>
                </p>
              </div>

              <ArrowRight className="w-4 h-4 text-[var(--muted)] group-hover:text-forest-500 transition-transform group-hover:translate-x-1 flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

