import Link from "next/link";
import { GitCompare, LineChart, Map, FileDown, Layers, ArrowRight, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Wildlife Research Tools — Wildlife Atlas",
  description: "Computational tools for comparing taxa, modeling population trends, and generating scientific dossiers.",
};

const TOOLS = [
  {
    title: "Taxonomic Comparison Tool",
    description: "Compare biometric dimensions, taxonomic families, conservation risk, and physiological adaptations across two species side-by-side.",
    icon: <GitCompare className="w-8 h-8 text-emerald-500" />,
    badge: "Available Now",
    href: "/tools/compare",
  },
  {
    title: "Population Trajectory Modeler",
    description: "Inspect historical survey records, census uncertainty envelopes, and generational decline gradients across decades.",
    icon: <LineChart className="w-8 h-8 text-blue-500" />,
    badge: "Data Model",
    href: "/explore?status=CR",
  },
  {
    title: "Biogeographic & Habitat Maps",
    description: "Correlate continental occurrences with biome layers (Tropical Rainforest, Pelagic Oceans, Boreal Taiga, Coral Reefs).",
    icon: <Map className="w-8 h-8 text-amber-500" />,
    badge: "GIS Explorer",
    href: "/categories",
  },
  {
    title: "Citation & Academic Export Suite",
    description: "Export bibliographic citations in APA 7, ISO 690, and BibTeX format alongside CSV occurrence and population records.",
    icon: <FileDown className="w-8 h-8 text-purple-500" />,
    badge: "Academic Tools",
    href: "/explore",
  },
];

export default function ToolsIndexPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-500/10 text-forest-600 dark:text-forest-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Layers className="w-4 h-4" />
          <span>Computational Zoology</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Wildlife Research Tools
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[var(--muted)] leading-relaxed">
          Analytical utilities engineered for zoologists, conservation biologists, educators, and field researchers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {TOOLS.map((tool) => (
          <Link
            key={tool.title}
            href={tool.href}
            className={cn(
              "group p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between",
              "bg-[var(--card-bg)] border-[var(--card-border)]",
              "hover:border-forest-500/40 hover:shadow-xl hover:shadow-forest-500/5 hover:-translate-y-1"
            )}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-forest-500/10 flex items-center justify-center">
                  {tool.icon}
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-forest-500/10 text-forest-600 dark:text-forest-400">
                  {tool.badge}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-foreground group-hover:text-forest-600 dark:group-hover:text-forest-400 transition-colors">
                {tool.title}
              </h2>
              <p className="text-sm text-[var(--muted)] mt-3 leading-relaxed">
                {tool.description}
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-[var(--card-border)] flex items-center justify-between text-xs font-semibold text-forest-600 dark:text-forest-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Empirical Census Data
              </span>
              <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Open Utility
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

