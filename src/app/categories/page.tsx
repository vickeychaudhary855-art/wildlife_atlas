import Link from "next/link";
import { getTaxonomicGroups, getAllSpecies } from "@/lib/data/speciesRepository";
import {
  Footprints, Feather, Eye, Droplets, Fish, Waves,
  Anchor, Bug, Compass, Shell, Shield, Sparkles, ArrowRight, Layers
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ReactNode> = {
  Footprints: <Footprints className="w-8 h-8" />,
  Feather: <Feather className="w-8 h-8" />,
  Eye: <Eye className="w-8 h-8" />,
  Droplets: <Droplets className="w-8 h-8" />,
  Fish: <Fish className="w-8 h-8" />,
  Waves: <Waves className="w-8 h-8" />,
  Anchor: <Anchor className="w-8 h-8" />,
  Bug: <Bug className="w-8 h-8" />,
  Compass: <Compass className="w-8 h-8" />,
  Shell: <Shell className="w-8 h-8" />,
  Shield: <Shield className="w-8 h-8" />,
  Sparkles: <Sparkles className="w-8 h-8" />,
};

export const metadata = {
  title: "Taxonomic Categories — Wildlife Atlas",
  description: "Browse global biodiversity by taxonomic class: mammals, birds, reptiles, amphibians, marine organisms, and invertebrates.",
};

export default async function CategoriesPage() {
  const groups = await getTaxonomicGroups();
  const allSpecies = await getAllSpecies();

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-500/10 text-forest-600 dark:text-forest-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Layers className="w-4 h-4" />
          <span>Biological Hierarchy</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Taxonomic Animal Classes
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[var(--muted)] leading-relaxed">
          Modern biological taxonomy classifies the kingdom Animalia into distinct phyla and classes based on evolutionary lineage, anatomical morphology, and genetic divergence.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => {
          const speciesInGroup = allSpecies.filter((a) => a.category === group.slug);

          return (
            <Link
              key={group.slug}
              href={`/categories/${group.slug}`}
              className={cn(
                "group p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between",
                "bg-[var(--card-bg)] border-[var(--card-border)]",
                "hover:border-forest-500/40 hover:shadow-xl hover:shadow-forest-500/5 hover:-translate-y-1"
              )}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-forest-500/10 text-forest-600 dark:text-forest-400 flex items-center justify-center group-hover:bg-forest-500/20 transition-colors">
                    {ICON_MAP[group.iconName] || <Sparkles className="w-8 h-8" />}
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-forest-900/5 dark:bg-forest-100/5 text-forest-600 dark:text-forest-400">
                    {group.estimatedKnownSpecies}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-foreground group-hover:text-forest-600 dark:group-hover:text-forest-400 transition-colors">
                  {group.commonName}
                </h2>
                <p className="text-sm font-mono text-forest-600 dark:text-forest-400 mt-1 italic">
                  Class: {group.scientificClass}
                </p>

                <p className="text-xs sm:text-sm text-[var(--muted)] mt-4 leading-relaxed">
                  {group.description}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-[var(--card-border)] flex items-center justify-between">
                <span className="text-xs text-[var(--muted)]">
                  {speciesInGroup.length} sample profile{speciesInGroup.length === 1 ? "" : "s"} indexed
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-600 dark:text-forest-400 group-hover:translate-x-1 transition-transform">
                  Browse Group
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

