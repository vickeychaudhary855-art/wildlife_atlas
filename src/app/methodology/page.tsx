import { AlertTriangle, Layers } from "lucide-react";

export const metadata = {
  title: "Taxonomic Methodology — Wildlife Atlas",
  description: "Scientific standards, confidence ratings, and data synchronization protocols used by Wildlife Atlas.",
};

export default function MethodologyPage() {
  const confidenceTiers = [
    { label: "Verified", desc: "Corroborated by published peer-reviewed journals, anatomical dissection, or official IUCN consensus.", color: "text-emerald-600 bg-emerald-500/10" },
    { label: "Estimated", desc: "Extrapolated using stratified line-transects, acoustic arrays, or spatial density models with specified confidence intervals.", color: "text-amber-600 bg-amber-500/10" },
    { label: "Historical", desc: "Pre-modern colonial surveys, antiquity accounts, or historical whaling/forestry records maintained for longitudinal baseline comparison.", color: "text-blue-600 bg-blue-500/10" },
    { label: "Uncertain", desc: "Conflicting taxonomic opinions, morphological dispute, or fragmented observation data requiring further fieldwork.", color: "text-orange-600 bg-orange-500/10" },
    { label: "Data Unavailable", desc: "Empirical survey metrics do not currently exist in published literature. We explicitly flag this rather than fabricating figures.", color: "text-slate-600 bg-slate-500/10" },
    { label: "Not Assessed", desc: "Taxon has not yet been formally evaluated against IUCN criteria.", color: "text-gray-500 bg-gray-500/10" },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-500/10 text-forest-600 dark:text-forest-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Layers className="w-4 h-4" />
          <span>Scientific Governance</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Taxonomic & Research Methodology
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[var(--muted)] leading-relaxed">
          How Wildlife Atlas ingests, verifies, filters, and standardizes global biodiversity data.
        </p>
      </div>

      <div className="space-y-10 text-sm leading-relaxed text-[var(--muted)]">
        {/* Section 1 */}
        <div className="p-8 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] space-y-4">
          <h2 className="text-xl font-bold text-foreground">
            Taxonomic Authority & Binomial Standardization
          </h2>
          <p>
            Species validity is governed by the Catalogue of Life (COL) taxonomic backbone and the International Code of Zoological Nomenclature (ICZN).
            When taxonomic revisions split or merge genera (e.g. within Proboscidea or Squamata), historical synonyms are indexed rather than deleted,
            ensuring researchers can cross-reference legacy field guides with modern phylogenomics.
          </p>
        </div>

        {/* Section 2: Confidence Framework */}
        <div className="p-8 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] space-y-4">
          <h2 className="text-xl font-bold text-foreground">
            The Six-Tier Confidence Rating Framework
          </h2>
          <p className="text-xs">
            Every metric across physical biology, population counts, and distribution ranges carries one of six explicit confidence indicators:
          </p>

          <div className="grid sm:grid-cols-2 gap-3 pt-2">
            {confidenceTiers.map((tier) => (
              <div key={tier.label} className="p-4 rounded-2xl bg-forest-500/5 border border-[var(--card-border)]">
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${tier.color}`}>
                  {tier.label}
                </span>
                <p className="text-xs text-[var(--muted)] mt-2 leading-relaxed">{tier.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Population Rule */}
        <div className="p-8 rounded-3xl bg-amber-500/5 border border-amber-500/20 space-y-3">
          <h3 className="font-bold text-foreground text-base flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <span>Core Policy: Occurrence Records vs. Population Censuses</span>
          </h3>
          <p className="text-xs text-[var(--muted)] leading-relaxed">
            Wildlife Atlas strictly adheres to the rule that <em>a new occurrence observation (e.g. from GBIF or citizen-science portals)
            can never be interpreted as an increase in total planetary population</em>. New observations frequently reflect increased survey effort
            or observer density in a region rather than demographic expansion. Population trends are published solely based on peer-reviewed census papers.
          </p>
        </div>
      </div>
    </div>
  );
}
