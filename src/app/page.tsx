import { HeroSearch } from "@/components/home/HeroSearch";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedSpecies } from "@/components/home/FeaturedSpecies";
import { EndangeredSection } from "@/components/home/EndangeredSection";
import { ContinentExplorer } from "@/components/home/ContinentExplorer";
import { HabitatExplorer } from "@/components/home/HabitatExplorer";
import { StatsSection } from "@/components/home/StatsSection";
import { RecentlyUpdated } from "@/components/home/RecentlyUpdated";
import { ResearchToolsTeaser } from "@/components/home/ResearchToolsTeaser";
import { PremiumTeaser } from "@/components/home/PremiumTeaser";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Search-first Hero Section */}
      <HeroSearch />

      {/* 2. Taxonomic Categories Grid (Mammals, Birds, Reptiles, Amphibians, etc.) */}
      <CategoryGrid />

      {/* 3. Featured Species */}
      <FeaturedSpecies />

      {/* 4. Rare & Critically Endangered Species Watch */}
      <EndangeredSection />

      {/* 5. Biogeographic Explorer: Continents */}
      <ContinentExplorer />

      {/* 6. Ecosystem Explorer: Habitats */}
      <HabitatExplorer />

      {/* 7. Global Biodiversity Statistics & Confidence Baseline */}
      <StatsSection />

      {/* 8. Recently Updated Species & Revision Changelog */}
      <RecentlyUpdated />

      {/* 9. Wildlife Research Tools (Comparison, Trends, GIS Maps, Export) */}
      <ResearchToolsTeaser />

      {/* 10. Lifetime Premium Membership (₹30 INR / $1 USD) */}
      <PremiumTeaser />
    </div>
  );
}
