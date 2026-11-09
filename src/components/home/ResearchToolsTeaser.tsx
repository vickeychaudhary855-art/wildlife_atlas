import Link from "next/link";
import { GitCompare, LineChart, Map, FileDown, ArrowRight, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

const TOOLS = [
  {
    title: "Taxonomic Comparison Tool",
    description: "Compare morphological dimensions, phylogenetic divergence, conservation vulnerability, and trophic positions across any two species side-by-side.",
    icon: <GitCompare className="w-6 h-6 text-emerald-500" />,
    badge: "Interactive",
    href: "/tools/compare",
  },
  {
    title: "Population Trajectory Modeler",
    description: "Visualize longitudinal census data, generational decline gradients, and confidence margins across survey years.",
    icon: <LineChart className="w-6 h-6 text-blue-500" />,
    badge: "Analytics",
    href: "/tools/population-trends",
  },
  {
    title: "Biogeographic Distribution Maps",
    description: "Examine historical vs. current native ranges, elevational barriers, and fragmented habitat corridors with geo-spatial precision.",
    icon: <Map className="w-6 h-6 text-amber-500" />,
    badge: "GIS & Cartography",
    href: "/tools/distribution-maps",
  },
  {
    title: "Academic Dossier Export (PDF/CSV)",
    description: "Generate peer-reviewed citation dossiers, formatted bibliographies, and raw statistical tables for publication and fieldwork.",
    icon: <FileDown className="w-6 h-6 text-purple-500" />,
    badge: "Export",
    href: "/tools/export",
  },
];

export function ResearchToolsTeaser() {
  return (
    <section className="px-4 py-20 sm:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-forest-600 dark:text-forest-400 mb-2">
              <Layers className="w-4 h-4" />
              <span>Computational Zoology Suite</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Scientific Research Tools
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)] max-w-2xl">
              Engineered for biologists, ecologists, educators, and field researchers. Tools clearly segregate verified census baselines from statistical estimations.
            </p>
          </div>
          <Link
            href="/tools"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-forest-600 dark:text-forest-400 hover:text-forest-500 transition-colors"
          >
            <span>Explore all tools</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TOOLS.map((tool) => (
            <Link
              key={tool.title}
              href={tool.href}
              className={cn(
                "group p-6 sm:p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between",
                "bg-[var(--card-bg)] border-[var(--card-border)]",
                "hover:border-forest-500/40 hover:shadow-lg hover:shadow-forest-500/5 hover:-translate-y-0.5"
              )}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-forest-500/10 flex items-center justify-center">
                    {tool.icon}
                  </div>
                  <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-forest-500/10 text-forest-600 dark:text-forest-400">
                    {tool.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground group-hover:text-forest-600 dark:group-hover:text-forest-400 transition-colors">
                  {tool.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--card-border)] flex items-center gap-2 text-xs font-semibold text-forest-600 dark:text-forest-400">
                <span>Launch Tool</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
