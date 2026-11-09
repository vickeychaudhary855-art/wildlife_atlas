import { SAMPLE_ANIMALS, SampleAnimal } from "@/data/sampleAnimals";
import { TAXONOMIC_GROUPS } from "@/data/taxonomyGroups";
import { TaxonomicGroup } from "@/types";

export interface SpeciesSearchParams {
  query?: string;
  category?: string;
  habitat?: string;
  continent?: string;
  conservationStatus?: string;
  family?: string;
  genus?: string;
  rareOnly?: boolean;
  featuredOnly?: boolean;
  sortBy?: "name" | "status" | "updated";
  page?: number;
  limit?: number;
}

export interface SpeciesSearchResult {
  species: SampleAnimal[];
  total: number;
  page: number;
  totalPages: number;
  availableFilters: {
    categories: Array<{ slug: string; name: string; count: number }>;
    statuses: Array<{ code: string; count: number }>;
    continents: Array<{ name: string; count: number }>;
    families: string[];
  };
}

export async function getAllSpecies(): Promise<SampleAnimal[]> {
  return SAMPLE_ANIMALS;
}

export async function getSpeciesBySlug(slug: string): Promise<SampleAnimal | null> {
  const match = SAMPLE_ANIMALS.find((a) => a.slug === slug);
  return match || null;
}

export async function getSpeciesByCategory(categorySlug: string): Promise<SampleAnimal[]> {
  return SAMPLE_ANIMALS.filter((a) => a.category === categorySlug);
}

export async function getTaxonomicGroups(): Promise<TaxonomicGroup[]> {
  return TAXONOMIC_GROUPS;
}

export async function getTaxonomicGroupBySlug(slug: string): Promise<TaxonomicGroup | null> {
  const match = TAXONOMIC_GROUPS.find((g) => g.slug === slug);
  return match || null;
}

export async function searchSpecies(params: SpeciesSearchParams): Promise<SpeciesSearchResult> {
  let list = [...SAMPLE_ANIMALS];

  // 1. Text Query (Search across Common Name, Scientific Name, Family, Genus, Order, Description)
  if (params.query && params.query.trim().length > 0) {
    const q = params.query.toLowerCase().trim();
    list = list.filter((item) => {
      return (
        item.commonName.toLowerCase().includes(q) ||
        item.scientificName.toLowerCase().includes(q) ||
        item.family.toLowerCase().includes(q) ||
        item.genus.toLowerCase().includes(q) ||
        item.order.toLowerCase().includes(q) ||
        item.shortDescription.toLowerCase().includes(q)
      );
    });
  }

  // 2. Category Filter
  if (params.category && params.category !== "all") {
    list = list.filter((item) => item.category === params.category);
  }

  // 3. Habitat Filter
  if (params.habitat && params.habitat !== "all") {
    const target = params.habitat.toLowerCase();
    list = list.filter((item) =>
      item.primaryHabitats.some((h) => h.toLowerCase().includes(target))
    );
  }

  // 4. Continent Filter
  if (params.continent && params.continent !== "all") {
    const target = params.continent.toLowerCase();
    list = list.filter((item) =>
      item.continents.some((c) => c.toLowerCase() === target || c.toLowerCase().includes(target))
    );
  }

  // 5. Conservation Status Filter (IUCN)
  if (params.conservationStatus && params.conservationStatus !== "all") {
    list = list.filter((item) => item.conservationStatus === params.conservationStatus);
  }

  // 6. Family Filter
  if (params.family && params.family !== "all") {
    list = list.filter((item) => item.family.toLowerCase() === params.family?.toLowerCase());
  }

  // 7. Rare / Featured Flags
  if (params.rareOnly) {
    list = list.filter((item) => item.rare);
  }
  if (params.featuredOnly) {
    list = list.filter((item) => item.featured);
  }

  // Calculate available filter counts from the unfiltered universe
  const categoryCounts = TAXONOMIC_GROUPS.map((tg) => ({
    slug: tg.slug,
    name: tg.commonName,
    count: SAMPLE_ANIMALS.filter((a) => a.category === tg.slug).length,
  }));

  const statuses = ["CR", "EN", "VU", "NT", "LC", "DD", "NE"].map((code) => ({
    code,
    count: SAMPLE_ANIMALS.filter((a) => a.conservationStatus === code).length,
  }));

  const continentsList = ["Africa", "Asia", "Europe", "North America", "South America", "Oceania", "Antarctica"].map((name) => ({
    name,
    count: SAMPLE_ANIMALS.filter((a) => a.continents.includes(name)).length,
  }));

  const families = Array.from(new Set(SAMPLE_ANIMALS.map((a) => a.family))).sort();

  // Sorting
  if (params.sortBy === "name") {
    list.sort((a, b) => a.commonName.localeCompare(b.commonName));
  } else if (params.sortBy === "status") {
    const severityOrder = ["CR", "EN", "VU", "NT", "LC", "DD", "NE"];
    list.sort((a, b) => {
      const idxA = severityOrder.indexOf(a.conservationStatus);
      const idxB = severityOrder.indexOf(b.conservationStatus);
      return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
    });
  }

  const total = list.length;
  const page = Math.max(1, params.page || 1);
  const limit = Math.max(1, params.limit || 12);
  const totalPages = Math.ceil(total / limit) || 1;
  const startIndex = (page - 1) * limit;
  const paginated = list.slice(startIndex, startIndex + limit);

  return {
    species: paginated,
    total,
    page,
    totalPages,
    availableFilters: {
      categories: categoryCounts,
      statuses,
      continents: continentsList,
      families,
    },
  };
}

