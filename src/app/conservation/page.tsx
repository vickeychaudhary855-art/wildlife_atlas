import Link from "next/link";
import Image from "next/image";
import { SAMPLE_ANIMALS } from "@/data/sampleAnimals";
import { IUCN_LABELS } from "@/lib/constants";
import { ShieldAlert, AlertTriangle, ArrowRight, HeartPulse } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Global Conservation & Red List — Wildlife Atlas",
  description: "Tracking threatened species, population declines, habitat fragmentation, and international recovery initiatives.",
};

export default function ConservationPage() {
  const threatened = SAMPLE_ANIMALS.filter((a) =>
    ["CR", "EN", "VU"].includes(a.conservationStatus)
  );

  const categories = [
    { code: "EX", name: "Extinct", desc: "No known individuals remaining globally.", count: 0, color: "bg-black text-white" },
    { code: "EW", name: "Extinct in the Wild", desc: "Surviving only in captivity, cultivation or as a naturalized population.", count: 0, color: "bg-purple-900 text-white" },
    { code: "CR", name: "Critically Endangered", desc: "Facing an extremely high risk of extinction in the wild.", count: 2, color: "bg-red-700 text-white" },
    { code: "EN", name: "Endangered", desc: "Facing a very high risk of extinction in the wild.", count: 2, color: "bg-orange-600 text-white" },
    { code: "VU", name: "Vulnerable", desc: "Facing a high risk of extinction in the wild.", count: 3, color: "bg-yellow-600 text-white" },
    { code: "NT", name: "Near Threatened", desc: "Close to qualifying for a threatened category in the near future.", count: 1, color: "bg-lime-700 text-white" },
    { code: "LC", name: "Least Concern", desc: "Widespread and abundant taxa evaluated with low extinction risk.", count: 3, color: "bg-green-700 text-white" },
    { code: "DD", name: "Data Deficient", desc: "Inadequate information to make a direct or indirect assessment of risk.", count: 0, color: "bg-slate-500 text-white" },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <HeartPulse className="w-4 h-4" />
          <span>Extinction Risk Monitoring</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Global Conservation Watch
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[var(--muted)] leading-relaxed">
          The IUCN Red List of Threatened Species provides the global standard for assessing species extinction probability.
          Wildlife Atlas tracks longitudinal trends and protected area connectivity.
        </p>
      </div>

      {/* Red List Categories Taxonomy */}
      <div className="mb-16">
        <h2 className="text-xl font-bold text-foreground mb-6">
          IUCN Threat Classification Framework
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.code}
              href={`/explore?status=${cat.code}`}
              className={cn(
                "p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between",
                "bg-[var(--card-bg)] border-[var(--card-border)] hover:border-forest-500/40 hover:shadow-md hover:-translate-y-0.5"
              )}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={cn("px-2.5 py-0.5 rounded text-xs font-bold", cat.color)}>
                    {cat.code}
                  </span>
                  <span className="text-xs font-semibold text-[var(--muted)]">
                    {cat.count} indexed
                  </span>
                </div>
                <h3 className="font-bold text-foreground text-sm">{cat.name}</h3>
                <p className="text-xs text-[var(--muted)] mt-1.5 leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--card-border)] flex items-center justify-between text-xs text-forest-600 dark:text-forest-400 font-semibold">
                <span>Filter Catalogue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Priority Watchlist Species */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-red-500" />
              <span>Priority Red List Species</span>
            </h2>
            <p className="text-xs text-[var(--muted)] mt-1">
              Species currently classified as Critically Endangered (CR), Endangered (EN), or Vulnerable (VU).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {threatened.map((animal) => (
            <Link
              key={animal.id}
              href={`/animals/${animal.slug}`}
              className={cn(
                "group rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between",
                "bg-[var(--card-bg)] border-[var(--card-border)]",
                "hover:border-red-500/40 hover:shadow-xl hover:shadow-red-500/5 hover:-translate-y-1"
              )}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-forest-900/10">
                <Image
                  src={animal.imageUrl}
                  alt={animal.imageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-3 left-3">
                  <span
                    className={cn(
                      "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase shadow-sm",
                      IUCN_LABELS[animal.conservationStatus]?.color,
                      IUCN_LABELS[animal.conservationStatus]?.textColor
                    )}
                  >
                    {animal.conservationStatus} — {IUCN_LABELS[animal.conservationStatus]?.label}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-foreground group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                    {animal.commonName}
                  </h3>
                  <p className="text-xs italic font-serif text-[var(--muted)] mt-0.5">
                    {animal.scientificName}
                  </p>
                  <p className="text-xs text-[var(--muted)] mt-2.5 line-clamp-2 leading-relaxed">
                    {animal.shortDescription}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[var(--card-border)] flex items-center justify-between text-[11px]">
                  <span className="text-[var(--muted)]">Trend: <strong className="text-foreground">{animal.populationTrend}</strong></span>
                  <span className="font-semibold text-red-600 dark:text-red-400 flex items-center gap-1">
                    Conservation Profile →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Uncertainty Notice */}
      <div className="mt-16 p-6 rounded-3xl bg-forest-500/5 border border-[var(--card-border)] flex items-start gap-4 text-xs text-[var(--muted)]">
        <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-foreground block">Methodological Note on Population Trends:</strong>
          <span>
            A new occurrence record in a biodiversity database (e.g. GBIF) does not constitute proof of population increase.
            True demographic trends require calibrated transects, acoustic censuses, or mark-recapture statistical modeling.
          </span>
        </div>
      </div>
    </div>
  );
}
