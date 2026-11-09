"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { IUCNBadge } from "@/components/ui/IUCNBadge";
import type { AnimalSpecies } from "@/types";

export interface AnimalCardProps
  extends React.HTMLAttributes<HTMLAnchorElement> {
  animal: AnimalSpecies;
}

export function AnimalCard({ animal, className, ...props }: AnimalCardProps) {
  const heroImage = animal.images.find((img) => img.isHero) ?? animal.images[0];
  const { freeProfile } = animal;

  // Format category slug into a readable label
  const categoryLabel = animal.category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <Link
      href={`/animals/${animal.slug}`}
      className={cn(
        "group block overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.02]",
        className
      )}
      {...props}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-sage-100 dark:bg-sage-900">
        {heroImage ? (
          <Image
            src={heroImage.url}
            alt={heroImage.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sage-400 dark:text-sage-600">
            <span className="text-sm">No image</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold leading-tight text-foreground group-hover:text-forest-600 dark:group-hover:text-forest-400">
          {freeProfile.primaryCommonName}
        </h3>
        <p className="mt-0.5 text-sm italic text-[var(--muted)]">
          {animal.scientificName}
        </p>

        {/* Badges */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <IUCNBadge status={freeProfile.conservationStatus} showLabel={false} />
          <Badge variant="default">{categoryLabel}</Badge>
        </div>
      </div>
    </Link>
  );
}
