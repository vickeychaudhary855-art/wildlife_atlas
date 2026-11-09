import Link from "next/link";
import { ExternalLink, Globe, Mail, TreePine } from "lucide-react";
import { SITE } from "@/lib/constants";

const FOOTER_COLUMNS = [
  {
    title: "Explore",
    links: [
      { label: "All Animals", href: "/explore" },
      { label: "Categories", href: "/categories" },
      { label: "Conservation", href: "/conservation" },
      { label: "Research Tools", href: "/tools" },
      { label: "Compare Species", href: "/tools/compare" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Methodology", href: "/methodology" },
      { label: "Data Sources", href: "/methodology" },
      { label: "API Access", href: "/api/animals/search" },
      { label: "Contact Board", href: "/contact" },
    ],
  },
  {
    title: "Legal & Ethics",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Licence Information", href: "/about" },
      { label: "Curatorial Standards", href: "/methodology" },
    ],
  },
] as const;

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com", icon: Globe },
  { label: "X / Twitter", href: "https://twitter.com", icon: ExternalLink },
  { label: "Email", href: "/contact", icon: Mail },
] as const;

export default function Footer() {
  return (
    <footer className="bg-forest-950 text-parchment-200 dark:bg-black/90 dark:text-parchment-300">
      {/* Main columns */}
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <TreePine className="h-6 w-6 text-forest-400" />
              <span className="text-lg font-bold tracking-tight text-parchment-100">
                {SITE.name}
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-parchment-400 dark:text-parchment-500">
              {SITE.tagline}
            </p>

            <p className="text-xs text-parchment-500 dark:text-parchment-600">
              A serious global animal encyclopedia and biodiversity research platform.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-forest-400">
                {col.title}
              </h3>
              <ul className="space-y-2 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-parchment-400 transition-colors hover:text-parchment-100 dark:text-parchment-400 dark:hover:text-parchment-100"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Data attribution notice */}
        <div className="mt-12 rounded-xl border border-forest-800/40 bg-forest-900/30 p-4 text-xs text-parchment-400 dark:border-forest-900/60 dark:bg-forest-950/40">
          <p>
            <strong className="text-parchment-200">Data Attribution: </strong>
            Species taxonomy aligned with the Catalogue of Life (COL) and Global Biodiversity
            Information Facility (GBIF). Conservation assessments reference IUCN Red List criteria
            with commercial-use license filtering. Images used under respective Creative Commons
            or open commercial licenses with mandatory author attribution.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-forest-900/60 pt-6 text-xs text-parchment-500 sm:flex-row dark:border-forest-900/40">
          <p>
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="text-parchment-400 transition-colors hover:text-parchment-100"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
