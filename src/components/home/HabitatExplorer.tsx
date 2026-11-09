import Link from "next/link";
import { Trees, Sun, Thermometer, Waves, Droplets, Snowflake, Trees as TreePine, Shell, ArrowRight } from "lucide-react";
import { HABITATS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const HABITAT_ICONS: Record<string, React.ReactNode> = {
  Trees: <Trees className="w-6 h-6" />,
  Sun: <Sun className="w-6 h-6" />,
  Thermometer: <Thermometer className="w-6 h-6" />,
  Waves: <Waves className="w-6 h-6" />,
  Droplets: <Droplets className="w-6 h-6" />,
  Snowflake: <Snowflake className="w-6 h-6" />,
  TreePine: <TreePine className="w-6 h-6" />,
  Shell: <Shell className="w-6 h-6" />,
};

export function HabitatExplorer() {
  return (
    <section className="px-4 py-20 sm:py-24 bg-forest-950/[0.02] dark:bg-forest-950/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-medium uppercase tracking-widest text-forest-600 dark:text-forest-400 mb-3">
            Ecosystems & Biomes
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Explore by Habitat
          </h2>
          <p className="mt-3 text-[var(--muted)] max-w-2xl mx-auto">
            Organisms evolved specialized anatomical and behavioral adaptations for their distinct biomes.
            Browse species by planetary habitat.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HABITATS.map((habitat) => (
            <Link
              key={habitat.slug}
              href={`/explore?habitat=${habitat.slug}`}
              className={cn(
                "group p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between",
                "bg-[var(--card-bg)] border-[var(--card-border)]",
                "hover:border-forest-500/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-forest-500/5"
              )}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-forest-500/10 text-forest-600 dark:text-forest-400 flex items-center justify-center mb-4 group-hover:bg-forest-500/20 transition-colors">
                  {HABITAT_ICONS[habitat.icon] || <Trees className="w-6 h-6" />}
                </div>
                <h3 className="font-semibold text-foreground text-lg">{habitat.name}</h3>
                <p className="text-xs text-[var(--muted)] mt-2 line-clamp-2 leading-relaxed">
                  {habitat.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--card-border)] flex items-center justify-between text-xs font-medium text-forest-600 dark:text-forest-400">
                <span>View Species</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

