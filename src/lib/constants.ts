export const SITE = {
  name: "Wildlife Atlas",
  tagline: "Explore Every Species. Understand Every Life. Protect Our Planet.",
  description:
    "A comprehensive global animal encyclopedia and biodiversity research platform covering mammals, birds, reptiles, amphibians, fish, insects, and every corner of the animal kingdom.",
  url: "https://wildlife-atlas.org",
} as const;

export const NAV_LINKS = [
  { label: "Explore", href: "/explore" },
  { label: "Categories", href: "/categories" },
  { label: "Conservation", href: "/conservation" },
  { label: "Research Tools", href: "/tools" },
] as const;

export const CONTINENTS = [
  { name: "Africa", slug: "africa", speciesHighlight: "Megafauna & Great Apes", color: "bg-amber-600" },
  { name: "Asia", slug: "asia", speciesHighlight: "Tigers & Giant Pandas", color: "bg-red-600" },
  { name: "Europe", slug: "europe", speciesHighlight: "Wolves & Brown Bears", color: "bg-blue-600" },
  { name: "North America", slug: "north-america", speciesHighlight: "Bison & Bald Eagles", color: "bg-indigo-600" },
  { name: "South America", slug: "south-america", speciesHighlight: "Jaguars & Macaws", color: "bg-emerald-600" },
  { name: "Oceania", slug: "oceania", speciesHighlight: "Marsupials & Monotremes", color: "bg-cyan-600" },
  { name: "Antarctica", slug: "antarctica", speciesHighlight: "Penguins & Seals", color: "bg-slate-600" },
] as const;

export const HABITATS = [
  { name: "Tropical Rainforest", slug: "tropical-rainforest", icon: "Trees", description: "Dense equatorial forests with extraordinary biodiversity." },
  { name: "Savanna", slug: "savanna", icon: "Sun", description: "Expansive grasslands with scattered trees and large mammals." },
  { name: "Desert", slug: "desert", icon: "Thermometer", description: "Arid biomes with extreme thermal adaptation." },
  { name: "Ocean", slug: "ocean", icon: "Waves", description: "Marine ecosystems from pelagic to abyssal zones." },
  { name: "Freshwater", slug: "freshwater", icon: "Droplets", description: "Rivers, lakes, and wetland habitats." },
  { name: "Tundra", slug: "tundra", icon: "Snowflake", description: "Treeless permafrost-dominated polar biomes." },
  { name: "Temperate Forest", slug: "temperate-forest", icon: "TreePine", description: "Deciduous and mixed forests of mid-latitudes." },
  { name: "Coral Reef", slug: "coral-reef", icon: "Shell", description: "Underwater calcareous structures built by colonial cnidarians." },
] as const;

export const IUCN_LABELS: Record<string, { label: string; color: string; textColor: string }> = {
  EX: { label: "Extinct", color: "bg-black", textColor: "text-white" },
  EW: { label: "Extinct in Wild", color: "bg-purple-900", textColor: "text-white" },
  CR: { label: "Critically Endangered", color: "bg-red-700", textColor: "text-white" },
  EN: { label: "Endangered", color: "bg-orange-600", textColor: "text-white" },
  VU: { label: "Vulnerable", color: "bg-yellow-600", textColor: "text-white" },
  NT: { label: "Near Threatened", color: "bg-lime-700", textColor: "text-white" },
  LC: { label: "Least Concern", color: "bg-green-700", textColor: "text-white" },
  DD: { label: "Data Deficient", color: "bg-slate-500", textColor: "text-white" },
  NE: { label: "Not Evaluated", color: "bg-gray-400", textColor: "text-gray-900" },
};

export const CONFIDENCE_LABELS: Record<string, { label: string; color: string }> = {
  verified: { label: "Verified", color: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300" },
  estimated: { label: "Estimated", color: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300" },
  historical: { label: "Historical", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300" },
  uncertain: { label: "Uncertain", color: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300" },
  data_unavailable: { label: "Data Unavailable", color: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400" },
  not_assessed: { label: "Not Assessed", color: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-500" },
};

