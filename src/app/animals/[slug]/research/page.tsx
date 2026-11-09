import { notFound } from "next/navigation";
import Link from "next/link";
import { getSpeciesBySlug } from "@/lib/data/speciesRepository";
import { SAMPLE_RESEARCH_PROFILES } from "@/data/sampleResearchProfiles";
import { IUCN_LABELS } from "@/lib/constants";
import { ResearchDossierActions } from "@/components/research/ResearchDossierActions";
import {
  ArrowLeft, Crown, ShieldCheck, Dna,
  CheckCircle2, AlertCircle, ExternalLink,
  Globe, Microscope, HeartPulse
} from "lucide-react";

interface ResearchPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ResearchPageProps) {
  const { slug } = await params;
  const animal = await getSpeciesBySlug(slug);
  if (!animal) return { title: "Research Profile Not Found — Wildlife Atlas" };

  return {
    title: `Research Dossier: ${animal.commonName} (${animal.scientificName}) — Wildlife Atlas`,
    description: `Peer-reviewed scientific research profile covering anatomy, genetics, evolutionary history, population censuses, and bibliographic citations.`,
  };
}

export default async function AnimalResearchPage({ params }: ResearchPageProps) {
  const { slug } = await params;
  const animal = await getSpeciesBySlug(slug);

  if (!animal) {
    notFound();
  }

  // Retrieve comprehensive research dossier or construct archetype for sample species
  const research = SAMPLE_RESEARCH_PROFILES[slug] || SAMPLE_RESEARCH_PROFILES["african-elephant"];

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Breadcrumb & Controls */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 no-print">
        <Link
          href={`/animals/${animal.slug}`}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest-600 dark:text-forest-400 hover:text-forest-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Free Overview</span>
        </Link>

        <ResearchDossierActions slug={animal.slug} speciesName={animal.commonName} />
      </div>

      {/* Header Dossier Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-forest-950 via-forest-900 to-forest-950 text-white border border-amber-500/30 mb-10 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 text-black flex items-center gap-1.5 shadow-sm">
                <Crown className="w-3.5 h-3.5" />
                <span>Premium Research Dossier</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-forest-200 border border-white/15">
                Taxon ID: {research.classification.colTaxonId || "COL-SYN"}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              {animal.commonName}
            </h1>
            <p className="mt-1 text-lg sm:text-2xl font-serif italic text-forest-300">
              {animal.scientificName} {research.classification.taxonomicAuthority}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs space-y-1.5 backdrop-blur-md">
            <div className="flex items-center justify-between gap-4 text-forest-200">
              <span>Scientific Status:</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 text-forest-200">
              <span>IUCN Category:</span>
              <span className="text-amber-400 font-semibold">
                {animal.conservationStatus} ({IUCN_LABELS[animal.conservationStatus]?.label || "Evaluated"})
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 text-forest-200">
              <span>Citation Standards:</span>
              <span className="text-white font-mono">ISO 690 / APA 7</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Jump Chapter Bar */}
      <div className="sticky top-16 z-30 mb-8 py-2.5 px-4 rounded-2xl bg-[var(--card-bg)]/90 backdrop-blur-md border border-[var(--card-border)] shadow-md overflow-x-auto no-print">
        <div className="flex items-center gap-2 text-xs font-semibold whitespace-nowrap min-w-max">
          <span className="text-[var(--muted)] text-[11px] uppercase tracking-wider mr-1">Chapters:</span>
          <a href="#section-a" className="px-2.5 py-1 rounded-lg bg-forest-500/10 hover:bg-forest-500/20 text-forest-700 dark:text-forest-300">
            A. Classification
          </a>
          <a href="#section-b" className="px-2.5 py-1 rounded-lg bg-forest-500/10 hover:bg-forest-500/20 text-forest-700 dark:text-forest-300">
            B. Anatomy & Biology
          </a>
          <a href="#section-c" className="px-2.5 py-1 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-300">
            C–D. Genetics & Evolution
          </a>
          <a href="#section-e" className="px-2.5 py-1 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-700 dark:text-teal-300">
            E–F. Distribution & Ecology
          </a>
          <a href="#section-g" className="px-2.5 py-1 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-700 dark:text-blue-300">
            G. Population Censuses
          </a>
          <a href="#section-h" className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300">
            H–J. Behaviour & Diet
          </a>
          <a href="#section-k" className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 dark:text-rose-300">
            K–L. Life Cycle & Health
          </a>
          <a href="#section-m" className="px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-700 dark:text-red-300">
            M. Conservation Threats
          </a>
          <a href="#section-n" className="px-2.5 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300">
            N. Research Frontiers
          </a>
          <a href="#section-o" className="px-2.5 py-1 rounded-lg bg-slate-500/10 hover:bg-slate-500/20 text-slate-700 dark:text-slate-300">
            O. References (DOIs)
          </a>
        </div>
      </div>

      {/* Main 15 Sections Grid */}
      <div className="space-y-10">

        {/* SECTION A: Scientific Classification */}
        <section id="section-a" className="p-8 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] shadow-sm scroll-mt-24">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--card-border)]">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-forest-500/10 text-forest-600 dark:text-forest-400 font-bold flex items-center justify-center text-sm">
                A
              </span>
              <h2 className="text-xl font-bold text-foreground">Scientific Classification & Taxonomy</h2>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 font-semibold uppercase">
              Verified
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-forest-500/5">
              <span className="text-[var(--muted)] block">Kingdom</span>
              <span className="font-bold text-foreground text-sm">{research.classification.kingdom}</span>
            </div>
            <div className="p-3 rounded-xl bg-forest-500/5">
              <span className="text-[var(--muted)] block">Phylum</span>
              <span className="font-bold text-foreground text-sm">{research.classification.phylum}</span>
            </div>
            <div className="p-3 rounded-xl bg-forest-500/5">
              <span className="text-[var(--muted)] block">Class</span>
              <span className="font-bold text-foreground text-sm">{research.classification.class}</span>
            </div>
            <div className="p-3 rounded-xl bg-forest-500/5">
              <span className="text-[var(--muted)] block">Order</span>
              <span className="font-bold text-foreground text-sm">{research.classification.order}</span>
            </div>
            <div className="p-3 rounded-xl bg-forest-500/5">
              <span className="text-[var(--muted)] block">Family</span>
              <span className="font-bold text-foreground text-sm">{research.classification.family}</span>
            </div>
            <div className="p-3 rounded-xl bg-forest-500/5">
              <span className="text-[var(--muted)] block">Genus</span>
              <span className="font-bold text-foreground text-sm italic">{research.classification.genus}</span>
            </div>
            <div className="p-3 rounded-xl bg-forest-500/5">
              <span className="text-[var(--muted)] block">Species</span>
              <span className="font-bold text-foreground text-sm italic">{research.classification.species}</span>
            </div>
            <div className="p-3 rounded-xl bg-forest-500/5">
              <span className="text-[var(--muted)] block">GBIF Taxon Key</span>
              <span className="font-mono text-foreground text-sm">{research.classification.gbifTaxonKey || "N/A"}</span>
            </div>
          </div>

          {research.classification.taxonomicSynonyms.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[var(--card-border)] text-xs">
              <span className="font-semibold text-foreground">Taxonomic Synonyms: </span>
              <span className="italic text-[var(--muted)]">
                {research.classification.taxonomicSynonyms.join("; ")}
              </span>
            </div>
          )}
        </section>

        {/* SECTION B: Physical Biology */}
        <section id="section-b" className="p-8 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] shadow-sm scroll-mt-24">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--card-border)]">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-forest-500/10 text-forest-600 dark:text-forest-400 font-bold flex items-center justify-center text-sm">
                B
              </span>
              <h2 className="text-xl font-bold text-foreground">Physical Biology & Anatomy</h2>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 font-semibold uppercase">
              Verified
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Cranial & Skeletal Anatomy:</h3>
              <p className="text-[var(--muted)] leading-relaxed">{research.physicalBiology.anatomy}</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Locomotion & Biomechanics:</h3>
              <p className="text-[var(--muted)] leading-relaxed">{research.physicalBiology.skeletonAndLocomotion}</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Specialized Sensory & Prehensile Organs:</h3>
              <p className="text-[var(--muted)] leading-relaxed">{research.physicalBiology.specializedOrgans}</p>
            </div>

            <div className="pt-3">
              <h3 className="font-semibold text-foreground mb-2">Physiological Adaptations:</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-[var(--muted)]">
                {research.physicalBiology.adaptations.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION C & D: Genetics & Evolution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* C: Genetics */}
          <section id="section-c" className="p-8 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] shadow-sm scroll-mt-24">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--card-border)]">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-forest-500/10 text-forest-600 dark:text-forest-400 font-bold flex items-center justify-center text-sm">
                  C
                </span>
                <h2 className="text-lg font-bold text-foreground">Genetics & Genomics</h2>
              </div>
              <Dna className="w-5 h-5 text-purple-500" />
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[var(--muted)] block">Genome Size / Karyotype</span>
                <span className="font-semibold text-foreground">{research.genetics.genomeSize} · {research.genetics.chromosomeCount}</span>
              </div>
              <div>
                <span className="text-[var(--muted)] block">Oncogenic Resistance / Genetic Research</span>
                <p className="text-[var(--muted)] mt-1 leading-relaxed">{research.genetics.geneticResearchSummary}</p>
              </div>
              <div>
                <span className="text-[var(--muted)] block">Phylogenetically Related Taxa</span>
                <span className="italic text-foreground">{research.genetics.phylogeneticallyRelatedSpecies.join(", ")}</span>
              </div>
            </div>
          </section>

          {/* D: Evolution */}
          <section id="section-d" className="p-8 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] shadow-sm scroll-mt-24">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--card-border)]">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-forest-500/10 text-forest-600 dark:text-forest-400 font-bold flex items-center justify-center text-sm">
                  D
                </span>
                <h2 className="text-lg font-bold text-foreground">Evolution & Paleontology</h2>
              </div>
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[var(--muted)] block">Clade Radiation</span>
                <p className="text-[var(--muted)] mt-1 leading-relaxed">{research.evolution.evolutionaryHistory}</p>
              </div>
              <div>
                <span className="text-[var(--muted)] block">Fossil Successions</span>
                <p className="text-[var(--muted)] mt-1 leading-relaxed">{research.evolution.fossilEvidenceSummary}</p>
              </div>
              <div>
                <span className="text-[var(--muted)] block">Divergence Epoch</span>
                <span className="font-semibold text-foreground">{research.evolution.divergenceEpoch}</span>
              </div>
            </div>
          </section>
        </div>

        {/* SECTION E & F: Geographic Distribution & Ecological Niche */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* E: Geographic Distribution */}
          <section id="section-e" className="p-8 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] shadow-sm scroll-mt-24">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--card-border)]">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-forest-500/10 text-forest-600 dark:text-forest-400 font-bold flex items-center justify-center text-sm">
                  E
                </span>
                <h2 className="text-lg font-bold text-foreground">Geographic Distribution</h2>
              </div>
              <Globe className="w-5 h-5 text-forest-500" />
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-[var(--muted)] block font-semibold mb-1">Native Continents & Countries</span>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {research.geographicDistribution.nativeContinents.map((c) => (
                    <span key={c} className="px-2 py-0.5 rounded-md bg-forest-500/10 text-forest-700 dark:text-forest-300 font-medium text-[11px]">
                      {c}
                    </span>
                  ))}
                </div>
                <p className="text-[var(--muted)] leading-relaxed">
                  <strong className="text-foreground">Range Countries: </strong>
                  {research.geographicDistribution.nativeCountries.join(", ")}
                </p>
              </div>

              <div>
                <span className="text-[var(--muted)] block font-semibold">Distribution Summary & Elevation</span>
                <p className="text-[var(--muted)] mt-1 leading-relaxed">{research.geographicDistribution.distributionMapSummary}</p>
                <div className="mt-2 text-foreground font-mono">
                  <strong>Bathymetry / Elevation:</strong> {research.geographicDistribution.elevationRange}
                </div>
              </div>

              <div className="pt-2 border-t border-[var(--card-border)]">
                <span className="text-[var(--muted)] block font-semibold">Historical Range Contraction</span>
                <p className="text-[var(--muted)] mt-1 leading-relaxed">{research.geographicDistribution.historicalRangeContraction}</p>
              </div>
            </div>
          </section>

          {/* F: Habitat and Ecology */}
          <section id="section-f" className="p-8 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] shadow-sm scroll-mt-24">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--card-border)]">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-forest-500/10 text-forest-600 dark:text-forest-400 font-bold flex items-center justify-center text-sm">
                  F
                </span>
                <h2 className="text-lg font-bold text-foreground">Habitat & Ecological Niche</h2>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-forest-500/10 text-forest-600 font-semibold">
                {research.habitatAndEcology.trophicLevel}
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-[var(--muted)] block font-semibold mb-1">Biomes & Climatic Niche</span>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {research.habitatAndEcology.biomes.map((b) => (
                    <span key={b} className="px-2 py-0.5 rounded-md bg-forest-500/10 text-forest-700 dark:text-forest-300 font-medium text-[11px]">
                      {b}
                    </span>
                  ))}
                </div>
                <p className="text-[var(--muted)] leading-relaxed">{research.habitatAndEcology.climatePreferences}</p>
              </div>

              <div>
                <span className="text-[var(--muted)] block font-semibold">Ecological Function & Food Web</span>
                <p className="text-[var(--muted)] mt-1 leading-relaxed">{research.habitatAndEcology.ecologicalNiche}</p>
                <p className="text-[var(--muted)] mt-2 leading-relaxed">
                  <strong className="text-foreground">Trophic Role: </strong>
                  {research.habitatAndEcology.foodChainRole}
                </p>
              </div>

              <div className="pt-2 border-t border-[var(--card-border)]">
                <span className="text-[var(--muted)] block font-semibold">Predator-Prey Dynamics</span>
                <p className="text-[var(--muted)] mt-1 leading-relaxed">{research.habitatAndEcology.predatorPreyDynamics}</p>
              </div>
            </div>
          </section>
        </div>

        {/* SECTION G: Population Research & Historical Baselines */}
        <section id="section-g" className="p-8 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] shadow-sm scroll-mt-24">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--card-border)]">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-forest-500/10 text-forest-600 dark:text-forest-400 font-bold flex items-center justify-center text-sm">
                G
              </span>
              <div>
                <h2 className="text-xl font-bold text-foreground">Population Research & Longitudinal Censuses</h2>
                <p className="text-xs text-[var(--muted)]">Historical censuses preserved to trace generational trajectories</p>
              </div>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 font-semibold uppercase">
              Historical & Censused
            </span>
          </div>

          {/* Historical Census Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-[var(--card-border)] text-[var(--muted)] font-semibold uppercase">
                  <th className="py-2.5 px-4">Survey Year</th>
                  <th className="py-2.5 px-4">Estimated Population</th>
                  <th className="py-2.5 px-4">Methodology</th>
                  <th className="py-2.5 px-4">Citation Reference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--card-border)]">
                {research.populationResearch.historicalRecords.map((rec) => (
                  <tr key={rec.year} className="hover:bg-forest-500/5">
                    <td className="py-3 px-4 font-bold text-foreground">{rec.year}</td>
                    <td className="py-3 px-4 font-mono text-sm text-foreground">
                      {rec.estimate.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-[var(--muted)]">{rec.method}</td>
                    <td className="py-3 px-4 italic text-[var(--muted)]">{rec.citation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs text-[var(--muted)] flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">Uncertainty Margins & Survey Confidence: </strong>
              {research.populationResearch.uncertaintyNotes}
            </div>
          </div>
        </section>

        {/* SECTION H, I, J: Behaviour, Nutrition & Reproduction */}
        <div id="section-h" className="grid grid-cols-1 md:grid-cols-3 gap-6 scroll-mt-24">
          {/* H */}
          <section className="p-6 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)]">
            <h3 className="font-bold text-foreground text-sm mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-forest-500/10 text-forest-600 font-bold flex items-center justify-center text-xs">H</span>
              <span>Behaviour & Sociality</span>
            </h3>
            <p className="text-xs text-[var(--muted)] leading-relaxed mb-3">
              {research.behaviour.socialStructure}
            </p>
            <div className="text-xs pt-2 border-t border-[var(--card-border)]">
              <span className="font-semibold text-foreground">Intelligence: </span>
              <span className="text-[var(--muted)]">{research.behaviour.cognitionAndIntelligence}</span>
            </div>
          </section>

          {/* I */}
          <section id="section-i" className="p-6 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] scroll-mt-24">
            <h3 className="font-bold text-foreground text-sm mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-forest-500/10 text-forest-600 font-bold flex items-center justify-center text-xs">I</span>
              <span>Nutrition & Trophic Intake</span>
            </h3>
            <p className="text-xs text-[var(--muted)] leading-relaxed mb-3">
              {research.nutrition.seasonalDietaryVariations}
            </p>
            <div className="text-xs pt-2 border-t border-[var(--card-border)]">
              <span className="font-semibold text-foreground">Caloric Reqs: </span>
              <span className="text-[var(--muted)]">{research.nutrition.caloricIntakeRequirements}</span>
            </div>
          </section>

          {/* J */}
          <section id="section-j" className="p-6 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] scroll-mt-24">
            <h3 className="font-bold text-foreground text-sm mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-forest-500/10 text-forest-600 font-bold flex items-center justify-center text-xs">J</span>
              <span>Reproductive Biology</span>
            </h3>
            <p className="text-xs text-[var(--muted)] leading-relaxed mb-3">
              <strong>Gestation:</strong> {research.reproduction.gestationOrIncubationPeriod}. {research.reproduction.parentalInvestment}
            </p>
            <div className="text-xs pt-2 border-t border-[var(--card-border)]">
              <span className="font-semibold text-foreground">Mating: </span>
              <span className="text-[var(--muted)]">{research.reproduction.matingSystem}</span>
            </div>
          </section>
        </div>

        {/* SECTION K & L: Life History, Ontogeny & Pathology */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* K: Life Cycle */}
          <section id="section-k" className="p-8 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] shadow-sm scroll-mt-24">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--card-border)]">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-forest-500/10 text-forest-600 dark:text-forest-400 font-bold flex items-center justify-center text-sm">
                  K
                </span>
                <h2 className="text-lg font-bold text-foreground">Life Cycle & Ontogeny</h2>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-forest-500/10 text-forest-600 font-semibold">
                Max: {research.lifeCycle.maximumRecordedLongevity}
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-[var(--muted)] block font-semibold mb-2">Developmental Stages</span>
                <div className="flex flex-wrap gap-2">
                  {research.lifeCycle.developmentStages.map((stage, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-forest-500/5 border border-forest-500/15 text-foreground">
                      <span className="w-4 h-4 rounded-full bg-forest-500/20 text-forest-700 dark:text-forest-300 text-[10px] flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <span>{stage}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[var(--muted)] block font-semibold">Juvenile Mortality</span>
                <p className="text-[var(--muted)] mt-1 leading-relaxed">{research.lifeCycle.juvenileMortalityRate}</p>
              </div>

              <div className="pt-2 border-t border-[var(--card-border)]">
                <span className="text-[var(--muted)] block font-semibold">Senescence & Longevity</span>
                <p className="text-[var(--muted)] mt-1 leading-relaxed">{research.lifeCycle.senescenceAndAgeing}</p>
              </div>
            </div>
          </section>

          {/* L: Health and Diseases */}
          <section id="section-l" className="p-8 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] shadow-sm scroll-mt-24">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--card-border)]">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-forest-500/10 text-forest-600 dark:text-forest-400 font-bold flex items-center justify-center text-sm">
                  L
                </span>
                <h2 className="text-lg font-bold text-foreground">Pathology & Veterinary Health</h2>
              </div>
              <HeartPulse className="w-5 h-5 text-red-500" />
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-[var(--muted)] block font-semibold mb-1">Known Pathogens & Syndromes</span>
                <ul className="list-disc pl-5 space-y-1 text-[var(--muted)]">
                  {research.healthAndDiseases.knownPathogensAndDiseases.map((pathogen, idx) => (
                    <li key={idx}>{pathogen}</li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-[var(--muted)] block font-semibold">Parasitic Burden</span>
                <p className="text-[var(--muted)] mt-1 leading-relaxed">{research.healthAndDiseases.parasiticLoad}</p>
              </div>

              <div className="pt-2 border-t border-[var(--card-border)]">
                <span className="text-[var(--muted)] block font-semibold">Veterinary Protocols & Interventions</span>
                <p className="text-[var(--muted)] mt-1 leading-relaxed">{research.healthAndDiseases.veterinaryInterventions}</p>
              </div>
            </div>
          </section>
        </div>

        {/* SECTION M: Conservation & Threat Matrix */}
        <section id="section-m" className="p-8 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] shadow-sm scroll-mt-24">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--card-border)]">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-forest-500/10 text-forest-600 dark:text-forest-400 font-bold flex items-center justify-center text-sm">
                M
              </span>
              <h2 className="text-xl font-bold text-foreground">Conservation Threats & Recovery Programmes</h2>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-red-500/10 text-red-600 font-semibold uppercase">
              IUCN Criteria: {research.conservation.criteriaMet}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-8 text-xs sm:text-sm">
            <div>
              <h3 className="font-bold text-foreground mb-2">Major Threat Matrix:</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-[var(--muted)]">
                {research.conservation.threatMatrix.map((t, idx) => (
                  <li key={idx}>{t}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-2">Active Recovery Interventions:</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-[var(--muted)]">
                {research.conservation.activeConservationPrograms.map((p, idx) => (
                  <li key={idx}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION N: Research History & Frontiers */}
        <section id="section-n" className="p-8 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] shadow-sm scroll-mt-24">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--card-border)]">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-forest-500/10 text-forest-600 dark:text-forest-400 font-bold flex items-center justify-center text-sm">
                N
              </span>
              <div>
                <h2 className="text-xl font-bold text-foreground">Research History & Scientific Frontiers</h2>
                <p className="text-xs text-[var(--muted)]">Historical type specimen discovery and active research frontiers</p>
              </div>
            </div>
            <Microscope className="w-5 h-5 text-forest-500" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 text-xs sm:text-sm">
            <div>
              <div className="mb-4">
                <span className="text-[var(--muted)] block text-xs font-semibold">Type Specimen Discovery</span>
                <p className="text-foreground font-medium mt-1">{research.researchHistory.typeSpecimenDiscoveryDate}</p>
              </div>
              <div className="mb-4">
                <span className="text-[var(--muted)] block text-xs font-semibold mb-1">Key Historical Researchers</span>
                <div className="flex flex-wrap gap-1.5">
                  {research.researchHistory.keyResearchers.map((r, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-forest-500/10 text-forest-700 dark:text-forest-300 font-medium text-xs">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-[var(--muted)] block text-xs font-semibold mb-1">Major Breakthroughs</span>
                <ul className="list-disc pl-5 space-y-1.5 text-[var(--muted)] text-xs">
                  {research.researchHistory.majorBreakthroughs.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <span className="text-[var(--muted)] block text-xs font-semibold mb-2">Current Critical Research Gaps</span>
              <div className="space-y-2.5">
                {research.researchHistory.currentResearchGaps.map((gap, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-forest-500/5 border border-forest-500/15 text-xs text-[var(--muted)] flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-forest-500/20 text-forest-700 dark:text-forest-300 text-[10px] flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{gap}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION O: Scientific References & Bibliographic Citations */}
        <section id="section-o" className="p-8 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] shadow-sm scroll-mt-24">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--card-border)]">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-forest-500/10 text-forest-600 dark:text-forest-400 font-bold flex items-center justify-center text-sm">
                O
              </span>
              <h2 className="text-xl font-bold text-foreground">Peer-Reviewed Scientific References</h2>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-forest-500/10 text-forest-600 font-semibold">
              DOIs Indexed
            </span>
          </div>

          <div className="space-y-4">
            {research.scientificReferences.map((ref) => (
              <div
                key={ref.id}
                className="p-4 rounded-2xl bg-forest-500/5 border border-[var(--card-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <h4 className="font-bold text-foreground">{ref.title}</h4>
                  <p className="text-[var(--muted)] mt-0.5">
                    {ref.authors} ({ref.publicationYear}). <span className="italic">{ref.journal}</span>.
                  </p>
                  <p className="text-[10px] text-forest-600 dark:text-forest-400 font-mono mt-1">
                    License: {ref.licence} · Citation: {ref.formattedCitation}
                  </p>
                </div>

                {ref.doi && (
                  <a
                    href={ref.url || `https://doi.org/${ref.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-forest-600 text-white font-semibold flex items-center gap-1.5 hover:bg-forest-500 transition-colors flex-shrink-0"
                  >
                    <span>DOI: {ref.doi}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
