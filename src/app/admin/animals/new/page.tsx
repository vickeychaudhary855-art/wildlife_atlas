"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, CheckCircle2, ShieldCheck } from "lucide-react";
import { TAXONOMIC_GROUPS } from "@/data/taxonomyGroups";

export default function AddSpeciesPage() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  // Form State
  const [commonName, setCommonName] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [category, setCategory] = useState("mammals");
  const [family, setFamily] = useState("");
  const [genus, setGenus] = useState("");
  const [order, setOrder] = useState("");
  const [diet, setDiet] = useState("Carnivore");
  const [lifespanWild, setLifespanWild] = useState("15–20 years");
  const [weight, setWeight] = useState("");
  const [size, setSize] = useState("");
  const [conservationStatus, setConservationStatus] = useState("VU");
  const [populationEstimate, setPopulationEstimate] = useState("");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800&q=80");
  const [imageLicence, setImageLicence] = useState("Unsplash License");
  const [photographer, setPhotographer] = useState("");
  const [shortDescription, setShortDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      router.push("/admin/animals");
    }, 1200);
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/admin/animals"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest-600 dark:text-forest-400 hover:text-forest-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Species List</span>
        </Link>
      </div>

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-forest-600 dark:text-forest-400 mb-1">
          <ShieldCheck className="w-4 h-4" />
          <span>Curator Authoring Suite</span>
        </div>
        <h1 className="text-3xl font-extrabold text-foreground">
          Register New Animal Species
        </h1>
        <p className="text-xs text-[var(--muted)] mt-1">
          Each species record must be catalogued with a valid taxonomic identifier and transparent photographic attribution.
        </p>
      </div>

      {saved && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Species catalogued successfully. Redirecting to registry...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Scientific Taxonomy */}
        <div className="p-8 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] space-y-6">
          <h2 className="text-lg font-bold text-foreground border-b border-[var(--card-border)] pb-3">
            1. Scientific Taxonomy & Nomenclature
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
                Common English Name *
              </label>
              <input
                type="text"
                required
                value={commonName}
                onChange={(e) => setCommonName(e.target.value)}
                placeholder="Snow Leopard"
                className="w-full px-4 py-2.5 rounded-xl border bg-[var(--background)] border-[var(--card-border)] text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-forest-500/50"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
                Scientific Binomial *
              </label>
              <input
                type="text"
                required
                value={scientificName}
                onChange={(e) => setScientificName(e.target.value)}
                placeholder="Panthera uncia"
                className="w-full px-4 py-2.5 rounded-xl border bg-[var(--background)] border-[var(--card-border)] text-foreground text-sm italic font-serif focus:outline-none focus:ring-2 focus:ring-forest-500/50"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
                Taxonomic Group *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border bg-[var(--background)] border-[var(--card-border)] text-foreground text-xs"
              >
                {TAXONOMIC_GROUPS.map((g) => (
                  <option key={g.slug} value={g.slug}>
                    {g.commonName} ({g.scientificClass})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
                Family *
              </label>
              <input
                type="text"
                required
                value={family}
                onChange={(e) => setFamily(e.target.value)}
                placeholder="Felidae"
                className="w-full px-4 py-2.5 rounded-xl border bg-[var(--background)] border-[var(--card-border)] text-foreground text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
                Genus *
              </label>
              <input
                type="text"
                required
                value={genus}
                onChange={(e) => setGenus(e.target.value)}
                placeholder="Panthera"
                className="w-full px-4 py-2.5 rounded-xl border bg-[var(--background)] border-[var(--card-border)] text-foreground text-sm italic"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
                Order *
              </label>
              <input
                type="text"
                required
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                placeholder="Carnivora"
                className="w-full px-4 py-2.5 rounded-xl border bg-[var(--background)] border-[var(--card-border)] text-foreground text-sm"
              />
            </div>
          </div>
        </div>

        {/* Step 2: Physical & Conservation Attributes */}
        <div className="p-8 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] space-y-6">
          <h2 className="text-lg font-bold text-foreground border-b border-[var(--card-border)] pb-3">
            2. Biometrics, Diet & Conservation Risk
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
                IUCN Red List Status *
              </label>
              <select
                value={conservationStatus}
                onChange={(e) => setConservationStatus(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border bg-[var(--background)] border-[var(--card-border)] text-foreground text-xs"
              >
                <option value="CR">Critically Endangered (CR)</option>
                <option value="EN">Endangered (EN)</option>
                <option value="VU">Vulnerable (VU)</option>
                <option value="NT">Near Threatened (NT)</option>
                <option value="LC">Least Concern (LC)</option>
                <option value="DD">Data Deficient (DD)</option>
                <option value="NE">Not Evaluated (NE)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
                Diet Classification *
              </label>
              <input
                type="text"
                required
                value={diet}
                onChange={(e) => setDiet(e.target.value)}
                placeholder="Carnivore / Herbivore / Omnivore"
                className="w-full px-4 py-2.5 rounded-xl border bg-[var(--background)] border-[var(--card-border)] text-foreground text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
                Wild Lifespan *
              </label>
              <input
                type="text"
                required
                value={lifespanWild}
                onChange={(e) => setLifespanWild(e.target.value)}
                placeholder="15–18 years"
                className="w-full px-4 py-2.5 rounded-xl border bg-[var(--background)] border-[var(--card-border)] text-foreground text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
                Dimensions / Body Length *
              </label>
              <input
                type="text"
                required
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="1.0–1.3 m body; 0.8–1.0 m tail"
                className="w-full px-4 py-2.5 rounded-xl border bg-[var(--background)] border-[var(--card-border)] text-foreground text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
                Weight Range *
              </label>
              <input
                type="text"
                required
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="30–55 kg"
                className="w-full px-4 py-2.5 rounded-xl border bg-[var(--background)] border-[var(--card-border)] text-foreground text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
                Census Estimate (with ~ if approx) *
              </label>
              <input
                type="text"
                required
                value={populationEstimate}
                onChange={(e) => setPopulationEstimate(e.target.value)}
                placeholder="~4,000–6,500"
                className="w-full px-4 py-2.5 rounded-xl border bg-[var(--background)] border-[var(--card-border)] text-foreground text-sm"
              />
            </div>
          </div>
        </div>

        {/* Step 3: Imagery and Licencing */}
        <div className="p-8 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] space-y-6">
          <h2 className="text-lg font-bold text-foreground border-b border-[var(--card-border)] pb-3">
            3. Photographic Imagery & Licence Attribution
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="sm:col-span-2">
              <label className="block font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
                High-Resolution Image URL *
              </label>
              <input
                type="url"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border bg-[var(--background)] border-[var(--card-border)] text-foreground text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
                Licence Type *
              </label>
              <select
                value={imageLicence}
                onChange={(e) => setImageLicence(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border bg-[var(--background)] border-[var(--card-border)] text-foreground text-xs"
              >
                <option value="Unsplash License">Unsplash Commercial Open License</option>
                <option value="CC BY 4.0">CC BY 4.0 (Attribution)</option>
                <option value="CC BY-SA 4.0">CC BY-SA 4.0 (ShareAlike)</option>
                <option value="Public Domain / CC0">Public Domain / CC0</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <label className="block font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
                Photographer Credit & Attribution *
              </label>
              <input
                type="text"
                required
                value={photographer}
                onChange={(e) => setPhotographer(e.target.value)}
                placeholder="Photograph by Wildlife Conservation Society (WCS) via Unsplash"
                className="w-full px-4 py-2.5 rounded-xl border bg-[var(--background)] border-[var(--card-border)] text-foreground text-sm"
              />
            </div>
          </div>
        </div>

        {/* Step 4: Overview Description */}
        <div className="p-8 rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] space-y-4">
          <h2 className="text-lg font-bold text-foreground border-b border-[var(--card-border)] pb-3">
            4. Free Ecological Overview
          </h2>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5">
              Factual Scientific Summary *
            </label>
            <textarea
              required
              rows={4}
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Provide a factual, verified 3-4 sentence ecological description..."
              className="w-full px-4 py-3 rounded-xl border bg-[var(--background)] border-[var(--card-border)] text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-forest-500/50"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link
            href="/admin/animals"
            className="px-6 py-3 rounded-xl border border-[var(--card-border)] text-xs font-semibold text-foreground hover:bg-forest-500/10 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-forest-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-forest-500 transition-colors flex items-center gap-2 shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>Publish Species Record</span>
          </button>
        </div>
      </form>
    </div>
  );
}
