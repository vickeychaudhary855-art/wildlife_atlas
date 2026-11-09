import { TreePine, ShieldCheck, Heart, Award } from "lucide-react";

export const metadata = {
  title: "About Us — Wildlife Atlas",
  description: "Global animal encyclopedia and scientific biodiversity research platform.",
};

export default function AboutPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-500/10 text-forest-600 dark:text-forest-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <TreePine className="w-4 h-4" />
          <span>Our Scientific Mission</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          About Wildlife Atlas
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[var(--muted)] leading-relaxed">
          &ldquo;Explore Every Species. Understand Every Life. Protect Our Planet.&rdquo;
        </p>
      </div>

      <div className="space-y-10 text-sm leading-relaxed text-[var(--muted)]">
        <div className="p-8 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-foreground">
            A Serious Global Biodiversity Encyclopedia
          </h2>
          <p>
            Wildlife Atlas was created to bridge the divide between high-density scientific literature and public environmental awareness.
            Rather than generic wildlife trivia or superficial blogs, we curate rigorous, peer-reviewed taxonomic data covering all branches
            of the animal kingdom — from large terrestrial megafauna and deep-sea marine mammals to insects, arachnids, molluscs, and marine invertebrates.
          </p>
          <p>
            Every animal in our database is referenced using standardized taxonomic identifiers from the Catalogue of Life (COL) and
            Global Biodiversity Information Facility (GBIF). We strictly distinguish verified census baselines from statistical estimations.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border bg-[var(--card-bg)] border-[var(--card-border)]">
            <ShieldCheck className="w-6 h-6 text-emerald-600 mb-3" />
            <h3 className="font-bold text-foreground text-base mb-1">Empirical Scientific Honesty</h3>
            <p className="text-xs">
              We never invent undocumented scientific metrics. Missing, estimated, historical, and uncertain data are explicitly marked with transparency badges.
            </p>
          </div>

          <div className="p-6 rounded-2xl border bg-[var(--card-bg)] border-[var(--card-border)]">
            <Heart className="w-6 h-6 text-red-500 mb-3" />
            <h3 className="font-bold text-foreground text-base mb-1">Accessible Lifetime Access</h3>
            <p className="text-xs">
              By rejecting predatory monthly subscriptions in favor of a one-time lifetime model (₹30 INR in India / $1 USD internationally), we ensure students, researchers, and naturalists everywhere can access full research dossiers.
            </p>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-forest-950 text-white space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Ethical Standards & Licensing</span>
          </h2>
          <p className="text-forest-200/90 text-xs sm:text-sm">
            All photography displayed across the platform respects Creative Commons and open commercial licenses with strict photographer attribution.
            Commercial API integrations exclude non-commercial restrictors, guaranteeing full compliance with international open science charters.
          </p>
        </div>
      </div>
    </div>
  );
}
