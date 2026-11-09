import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getTaxonomicGroupBySlug, getSpeciesByCategory } from "@/lib/data/speciesRepository";
import { IUCN_LABELS } from "@/lib/constants";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryPageProps {
  params: Promise<{ group: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { group } = await params;
  const taxonomicGroup = await getTaxonomicGroupBySlug(group);
  if (!taxonomicGroup) return { title: "Category Not Found — Wildlife Atlas" };

  return {
    title: `${taxonomicGroup.commonName} (${taxonomicGroup.scientificClass}) — Wildlife Atlas`,
    description: taxonomicGroup.description,
  };
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { group } = await params;
  const taxonomicGroup = await getTaxonomicGroupBySlug(group);

  if (!taxonomicGroup) {
    notFound();
  }

  const speciesList = await getSpeciesByCategory(group);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Navigation Breadcrumb */}
      <div className="mb-8">
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest-600 dark:text-forest-400 hover:text-forest-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Categories</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="p-8 sm:p-12 rounded-3xl bg-forest-950 text-white relative overflow-hidden mb-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-forest-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-500/20 text-forest-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>Class: {taxonomicGroup.scientificClass}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            {taxonomicGroup.commonName}
          </h1>

          <p className="mt-4 text-forest-200/90 text-base sm:text-lg leading-relaxed">
            {taxonomicGroup.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-xs font-medium text-forest-300">
            <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm">
              Estimated Global Diversity: <strong className="text-white">{taxonomicGroup.estimatedKnownSpecies}</strong>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm">
              Catalogued Sample Profiles: <strong className="text-white">{speciesList.length}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Species Grid */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Documented {taxonomicGroup.commonName}
            </h2>
            <p className="text-xs text-[var(--muted)] mt-1">
              Showing species catalogued with scientific taxonomic identifiers.
            </p>
          </div>
        </div>

        {speciesList.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-2xl border border-dashed border-[var(--card-border)]">
            <p className="text-[var(--muted)] text-sm">
              Additional {taxonomicGroup.commonName.toLowerCase()} records are currently being verified by taxonomists.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {speciesList.map((animal) => (
              <Link
                key={animal.id}
                href={`/animals/${animal.slug}`}
                className={cn(
                  "group rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col",
                  "bg-[var(--card-bg)] border-[var(--card-border)]",
                  "hover:border-forest-500/40 hover:shadow-xl hover:shadow-forest-500/5 hover:-translate-y-1"
                )}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-forest-900/10">
                  <Image
                    src={animal.imageUrl}
                    alt={animal.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {IUCN_LABELS[animal.conservationStatus] && (
                      <span
                        className={cn(
                          "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase",
                          IUCN_LABELS[animal.conservationStatus].color,
                          IUCN_LABELS[animal.conservationStatus].textColor
                        )}
                      >
                        {animal.conservationStatus}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-foreground group-hover:text-forest-600 dark:group-hover:text-forest-400 transition-colors">
                      {animal.commonName}
                    </h3>
                    <p className="text-xs italic font-serif text-[var(--muted)] mt-0.5">
                      {animal.scientificName}
                    </p>
                    <p className="text-xs text-[var(--muted)] mt-3 line-clamp-2 leading-relaxed">
                      {animal.shortDescription}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[var(--card-border)] flex items-center justify-between text-xs font-semibold text-forest-600 dark:text-forest-400">
                    <span>Family: {animal.family}</span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View Profile
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

