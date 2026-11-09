import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTINENTS } from "@/lib/constants";

export function ContinentExplorer() {
  return (
    <section className="px-4 py-20 sm:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-medium uppercase tracking-widest text-forest-500 mb-3">
            Biogeography
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Explore by Continent
          </h2>
          <p className="mt-3 text-[var(--muted)] max-w-2xl mx-auto">
            Discover wildlife across every continent — from the megafauna of Africa
            to the unique marsupials of Oceania.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CONTINENTS.map((continent) => (
            <Link
              key={continent.slug}
              href={`/explore?continent=${continent.slug}`}
              className={cn(
                "group relative overflow-hidden rounded-2xl p-6 transition-all duration-300",
                "border border-[var(--card-border)] bg-[var(--card-bg)]",
                "hover:border-forest-500/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-forest-500/5"
              )}
            >
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4", continent.color)}>
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-foreground">{continent.name}</h3>
              <p className="text-xs text-[var(--muted)] mt-1">
                {continent.speciesHighlight}
              </p>
              <ArrowRight className="w-4 h-4 text-[var(--muted)] mt-3 transition-transform group-hover:translate-x-1 group-hover:text-forest-500" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

