"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SAMPLE_ANIMALS } from "@/data/sampleAnimals";
import { IUCN_LABELS } from "@/lib/constants";
import {
  ArrowLeft, PlusCircle, Search, Edit3,
  Archive, Eye
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminAnimalsPage() {
  const [speciesList, setSpeciesList] = useState(
    SAMPLE_ANIMALS.map((a) => ({
      ...a,
      isArchived: false,
      isPublished: true,
    }))
  );
  const [query, setQuery] = useState("");

  const toggleArchive = (id: string) => {
    setSpeciesList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isArchived: !s.isArchived } : s))
    );
  };

  const togglePublish = (id: string) => {
    setSpeciesList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isPublished: !s.isPublished } : s))
    );
  };

  const filtered = speciesList.filter(
    (s) =>
      s.commonName.toLowerCase().includes(query.toLowerCase()) ||
      s.scientificName.toLowerCase().includes(query.toLowerCase()) ||
      s.family.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumb & Header */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest-600 dark:text-forest-400 hover:text-forest-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Admin Hub</span>
        </Link>

        <Link
          href="/admin/animals/new"
          className="px-4 py-2 rounded-xl bg-forest-600 text-white text-xs font-bold hover:bg-forest-500 transition-colors flex items-center gap-2 shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Species</span>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground">
            Species Registry & Content Curation
          </h1>
          <p className="text-xs text-[var(--muted)] mt-1">
            Manage public visibility, publish states, photographic licences, and taxonomic identifiers.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search catalog..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border bg-[var(--card-bg)] border-[var(--card-border)] text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-forest-500/50"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-3xl border bg-[var(--card-bg)] border-[var(--card-border)] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--card-border)] bg-forest-500/5 text-foreground font-bold">
                <th className="py-4 px-6">Species</th>
                <th className="py-4 px-6">Taxonomy</th>
                <th className="py-4 px-6">IUCN Status</th>
                <th className="py-4 px-6">Visibility</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)]">
              {filtered.map((animal) => (
                <tr key={animal.id} className="hover:bg-forest-500/5 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-forest-900/10 flex-shrink-0">
                        <Image
                          src={animal.imageUrl}
                          alt={animal.imageAlt}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-foreground text-sm">{animal.commonName}</div>
                        <div className="font-serif italic text-xs text-[var(--muted)]">{animal.scientificName}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <div className="font-medium text-foreground">{animal.family}</div>
                    <div className="text-[11px] text-[var(--muted)] capitalize">{animal.category} · {animal.order}</div>
                  </td>

                  <td className="py-4 px-6">
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                        IUCN_LABELS[animal.conservationStatus]?.color,
                        IUCN_LABELS[animal.conservationStatus]?.textColor
                      )}
                    >
                      {animal.conservationStatus}
                    </span>
                  </td>

                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => togglePublish(animal.id)}
                        className={cn(
                          "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-colors",
                          animal.isPublished
                            ? "bg-emerald-500/15 text-emerald-600"
                            : "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                        )}
                      >
                        {animal.isPublished ? "Published" : "Draft"}
                      </button>
                      {animal.isArchived && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-600 uppercase">
                          Archived
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/animals/${animal.slug}`}
                        className="p-2 rounded-lg border border-[var(--card-border)] hover:bg-forest-500/10 text-forest-600 dark:text-forest-400"
                        title="View Live Profile"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => toggleArchive(animal.id)}
                        className="p-2 rounded-lg border border-[var(--card-border)] hover:bg-amber-500/10 text-amber-600"
                        title="Archive Record"
                      >
                        <Archive className="w-3.5 h-3.5" />
                      </button>
                      <Link
                        href={`/admin/animals/${animal.slug}/edit`}
                        className="p-2 rounded-lg border border-forest-500/30 bg-forest-500/10 text-forest-700 dark:text-forest-300 font-bold"
                        title="Edit Species Record"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
