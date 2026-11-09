import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getSpeciesBySlug } from "@/lib/data/speciesRepository";
import { IUCN_LABELS } from "@/lib/constants";
import {
  ArrowLeft, Crown, ShieldAlert, CheckCircle2,
  MapPin, Trees, Sparkles, Scale, Clock, Utensils,
  BookOpen, HelpCircle, FileText, ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimalProfilePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: AnimalProfilePageProps) {
  const { slug } = await params;
  const animal = await getSpeciesBySlug(slug);
  if (!animal) return { title: "Animal Not Found — Wildlife Atlas" };

  return {
    title: `${animal.commonName} (${animal.scientificName}) — Wildlife Atlas`,
    description: animal.shortDescription,
  };
}

export default async function AnimalProfilePage({ params }: AnimalProfilePageProps) {
  const { slug } = await params;
  const animal = await getSpeciesBySlug(slug);

  if (!animal) {
    notFound();
  }

  const iucnInfo = IUCN_LABELS[animal.conservationStatus] || {
    label: "Not Evaluated",
    color: "bg-gray-500",
    textColor: "text-white",
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Taxon",
    "name": animal.scientificName,
    "alternateName": animal.commonName,
    "taxonRank": "species",
    "description": animal.shortDescription,
    "image": animal.imageUrl,
    "parentTaxon": {
      "@type": "Taxon",
      "name": animal.genus,
      "taxonRank": "genus"
    }
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Navigation Breadcrumb */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest-600 dark:text-forest-400 hover:text-forest-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalogue</span>
        </Link>

        <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
          <Link href="/categories" className="hover:underline">Categories</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/categories/${animal.category}`} className="capitalize hover:underline">
            {animal.category.replace("-", " ")}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-medium truncate max-w-[150px]">{animal.commonName}</span>
        </div>
      </div>

      {/* Main Profile Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          {/* IUCN Red List Badge */}
          <span
            className={cn(
              "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm",
              iucnInfo.color,
              iucnInfo.textColor
            )}
          >
            {animal.conservationStatus} — {iucnInfo.label}
          </span>

          {/* Taxonomic Group Badge */}
          <Link
            href={`/categories/${animal.category}`}
            className="px-3 py-1 rounded-full text-xs font-semibold bg-forest-500/10 text-forest-600 dark:text-forest-400 border border-forest-500/20 hover:bg-forest-500/20 transition-colors capitalize"
          >
            {animal.category.replace("-", " ")}
          </Link>

          {/* Verified Baseline Indicator */}
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Taxonomy Verified</span>
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          {animal.commonName}
        </h1>
        <p className="mt-1 text-xl sm:text-2xl font-serif italic text-forest-700 dark:text-forest-300">
          {animal.scientificName}
        </p>
      </div>

      {/* Hero Photo & Quick Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Main Photograph */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[var(--card-border)] bg-forest-950/20 shadow-xl">
            <Image
              src={animal.imageUrl}
              alt={animal.imageAlt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>
          <div className="mt-2.5 px-2 flex items-center justify-between text-xs text-[var(--muted)]">
            <span>{animal.imageAlt}</span>
            <span>Credit: {animal.imageCredit}</span>
          </div>
        </div>

        {/* Essential Scientific Metrics */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] shadow-sm space-y-5">
            <h3 className="font-bold text-base text-foreground pb-3 border-b border-[var(--card-border)] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-forest-600 dark:text-forest-400" />
              <span>Taxonomic & Physical Profile</span>
            </h3>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[var(--muted)] block">Taxonomic Family</span>
                <span className="font-semibold text-foreground text-sm">{animal.family}</span>
              </div>
              <div>
                <span className="text-[var(--muted)] block">Order</span>
                <span className="font-semibold text-foreground text-sm">{animal.order}</span>
              </div>
              <div>
                <span className="text-[var(--muted)] block">Class</span>
                <span className="font-semibold text-foreground text-sm">{animal.className}</span>
              </div>
              <div>
                <span className="text-[var(--muted)] block">Genus</span>
                <span className="font-semibold text-foreground text-sm italic">{animal.genus}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--card-border)] grid grid-cols-2 gap-4 text-xs">
              <div className="flex items-start gap-2.5">
                <Utensils className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[var(--muted)] block">Diet Type</span>
                  <span className="font-semibold text-foreground text-sm">{animal.diet}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[var(--muted)] block">Lifespan (Wild)</span>
                  <span className="font-semibold text-foreground text-sm">{animal.lifespanWild}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Scale className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[var(--muted)] block">Average Weight</span>
                  <span className="font-semibold text-foreground text-sm">{animal.weight}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[var(--muted)] block">Average Dimensions</span>
                  <span className="font-semibold text-foreground text-sm">{animal.size}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--card-border)] text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[var(--muted)]">Global Population Trend:</span>
                <span className="font-bold text-foreground">{animal.populationTrend}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--muted)]">Census Estimate:</span>
                <span className="font-bold text-foreground">{animal.populationEstimate}</span>
              </div>
            </div>
          </div>

          {/* Premium Callout Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-forest-900 to-forest-950 text-white border border-amber-500/30 shadow-lg">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Crown className="w-4 h-4" />
              <span>Full Research Profile Available</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-2">
              Unlock Advanced Scientific Modules
            </h4>
            <p className="text-xs text-forest-200/80 leading-relaxed mb-4">
              Access complete anatomical morphology, genetic karyotype data, evolutionary divergence, detailed population uncertainty models, and scientific citations.
            </p>
            <Link
              href={`/animals/${animal.slug}/research`}
              className="w-full py-3 px-5 rounded-xl font-bold text-xs text-black bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-500 transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <FileText className="w-4 h-4" />
              <span>View 15-Section Research Dossier</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Description & Ecology */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-8 space-y-8">
          {/* Free Description */}
          <div className="p-8 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)]">
            <h2 className="text-xl font-bold text-foreground mb-4">
              General Overview & Ecological Summary
            </h2>
            <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
              {animal.shortDescription}
            </p>
          </div>

          {/* Habitat and Geographic Range */}
          <div className="p-8 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] space-y-6">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Trees className="w-5 h-5 text-forest-600 dark:text-forest-400" />
              <span>Habitats & Geographic Distribution</span>
            </h2>

            <div className="grid sm:grid-cols-2 gap-6 text-sm">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] block mb-2">
                  Primary Habitats
                </span>
                <div className="flex flex-wrap gap-2">
                  {animal.primaryHabitats.map((h) => (
                    <span
                      key={h}
                      className="px-3 py-1 rounded-xl bg-forest-500/10 text-forest-600 dark:text-forest-400 text-xs font-medium"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] block mb-2 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  <span>Continents & Biogeography</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {animal.continents.map((c) => (
                    <span
                      key={c}
                      className="px-3 py-1 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-medium"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Disclaimers & Methodology */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] space-y-4">
            <div className="flex items-center gap-2 font-bold text-foreground text-sm">
              <HelpCircle className="w-4 h-4 text-forest-600 dark:text-forest-400" />
              <span>Scientific Data Integrity</span>
            </div>

            <p className="text-xs text-[var(--muted)] leading-relaxed">
              Wildlife Atlas does not invent undocumented scientific metrics. Missing fields indicate gaps in empirical field surveys or pending scientific evaluation.
            </p>

            <div className="space-y-2 pt-2 border-t border-[var(--card-border)] text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[var(--muted)]">Taxonomy Source:</span>
                <span className="font-semibold text-foreground">Catalogue of Life</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--muted)]">Conservation Status:</span>
                <span className="font-semibold text-foreground">IUCN Red List v2024</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--muted)]">Confidence Level:</span>
                <span className="font-semibold text-emerald-600">Verified Peer-Reviewed</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-amber-500/5 border border-amber-500/20 text-xs text-[var(--muted)] space-y-2">
            <div className="flex items-center gap-2 font-semibold text-foreground">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              <span>Census Uncertainty Note</span>
            </div>
            <p>
              Population counts represent estimated median ranges from published field surveys and acoustic/camera-trap sampling. They should not be interpreted as absolute censuses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

