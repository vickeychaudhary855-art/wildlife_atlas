import {
  Globe, BookOpen, Users, ShieldCheck,
  TrendingDown, Database, Microscope, MapPin,
} from "lucide-react";
import { WILDLIFE_STATS } from "@/data/sampleAnimals";
import { formatNumber } from "@/lib/utils";

const stats = [
  { icon: <Database className="w-6 h-6" />, value: WILDLIFE_STATS.totalSpeciesDocumented, label: "Known Species Catalogued" },
  { icon: <ShieldCheck className="w-6 h-6" />, value: WILDLIFE_STATS.endangeredSpecies, label: "Threatened Species Tracked" },
  { icon: <TrendingDown className="w-6 h-6" />, value: WILDLIFE_STATS.criticallyEndangered, label: "Critically Endangered" },
  { icon: <MapPin className="w-6 h-6" />, value: WILDLIFE_STATS.countriesRepresented, label: "Countries Represented" },
  { icon: <Globe className="w-6 h-6" />, value: WILDLIFE_STATS.conservationProgramsTracked, label: "Conservation Programs" },
  { icon: <Microscope className="w-6 h-6" />, value: WILDLIFE_STATS.scientificReferencesIndexed, label: "Scientific References" },
  { icon: <BookOpen className="w-6 h-6" />, value: WILDLIFE_STATS.birdsKnown + WILDLIFE_STATS.mammalsKnown, label: "Birds & Mammals" },
  { icon: <Users className="w-6 h-6" />, value: WILDLIFE_STATS.insectsKnown, label: "Insect Species" },
];

export function StatsSection() {
  return (
    <section className="px-4 py-20 sm:py-24 bg-forest-950 text-white relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest-900 via-forest-950 to-black" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-forest-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-14">
          <p className="text-sm font-medium uppercase tracking-widest text-forest-400 mb-3">
            Global Biodiversity Data
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Wildlife in Numbers
          </h2>
          <p className="mt-3 text-forest-300/70 max-w-2xl mx-auto">
            Aggregated statistics from peer-reviewed literature, government wildlife databases,
            and international biodiversity catalogues. All figures are approximate and subject
            to ongoing scientific revision.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.07] transition-colors"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-forest-500/15 text-forest-400 mb-4">
                {stat.icon}
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-white">
                {formatNumber(stat.value)}
              </p>
              <p className="text-xs text-forest-300/60 mt-1.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-forest-300/40 mt-10 max-w-2xl mx-auto">
          Not every species on Earth has been documented. Current species counts
          represent described species only. Actual biodiversity is estimated to be
          significantly higher, particularly among invertebrates and deep-sea organisms.
        </p>
      </div>
    </section>
  );
}

