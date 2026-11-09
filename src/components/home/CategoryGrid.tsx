import Link from "next/link";
import {
  Footprints, Feather, Eye, Droplets, Fish, Waves,
  Anchor, Bug, Compass, Shell, Shield, Sparkles,
} from "lucide-react";
import { TAXONOMIC_GROUPS } from "@/data/taxonomyGroups";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ReactNode> = {
  Footprints: <Footprints className="w-7 h-7" />,
  Feather: <Feather className="w-7 h-7" />,
  Eye: <Eye className="w-7 h-7" />,
  Droplets: <Droplets className="w-7 h-7" />,
  Fish: <Fish className="w-7 h-7" />,
  Waves: <Waves className="w-7 h-7" />,
  Anchor: <Anchor className="w-7 h-7" />,
  Bug: <Bug className="w-7 h-7" />,
  Compass: <Compass className="w-7 h-7" />,
  Shell: <Shell className="w-7 h-7" />,
  Shield: <Shield className="w-7 h-7" />,
  Sparkles: <Sparkles className="w-7 h-7" />,
};

export function CategoryGrid() {
  return (
    <section className="px-4 py-20 sm:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-14">
          <p className="text-sm font-medium uppercase tracking-widest text-forest-500 mb-3">
            Explore the Animal Kingdom
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Browse by Taxonomic Group
          </h2>
          <p className="mt-3 text-[var(--muted)] max-w-2xl mx-auto">
            From mammals to molluscs — explore every major animal group documented by
            modern taxonomy.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {TAXONOMIC_GROUPS.map((group, idx) => (
            <Link
              key={group.slug}
              href={`/categories/${group.slug}`}
              className={cn(
                "group relative flex flex-col items-center text-center p-6 rounded-2xl border transition-all duration-300",
                "bg-[var(--card-bg)] border-[var(--card-border)]",
                "hover:border-forest-500/40 hover:shadow-lg hover:shadow-forest-500/5 hover:-translate-y-1"
              )}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-forest-500/10 text-forest-600 dark:text-forest-400 mb-4 group-hover:bg-forest-500/20 transition-colors">
                {ICON_MAP[group.iconName] || <Sparkles className="w-7 h-7" />}
              </div>
              <h3 className="font-semibold text-foreground">{group.commonName}</h3>
              <p className="text-xs text-[var(--muted)] italic mt-0.5">
                {group.scientificClass}
              </p>
              <p className="text-xs text-forest-600 dark:text-forest-400 font-medium mt-2">
                {group.estimatedKnownSpecies}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

