export type ScientificConfidence =
  | "verified"
  | "estimated"
  | "historical"
  | "uncertain"
  | "data_unavailable"
  | "not_assessed";

export type IUCNCategory =
  | "EX" // Extinct
  | "EW" // Extinct in the Wild
  | "CR" // Critically Endangered
  | "EN" // Endangered
  | "VU" // Vulnerable
  | "NT" // Near Threatened
  | "LC" // Least Concern
  | "DD" // Data Deficient
  | "NE"; // Not Evaluated

export type PopulationTrend = "increasing" | "stable" | "decreasing" | "fluctuating" | "unknown";

export type AnimalCategorySlug =
  | "mammals"
  | "birds"
  | "reptiles"
  | "amphibians"
  | "fish"
  | "sharks-rays"
  | "marine-mammals"
  | "insects"
  | "arachnids"
  | "molluscs"
  | "crustaceans"
  | "other-invertebrates";

export interface TaxonomicGroup {
  id: string;
  slug: AnimalCategorySlug;
  commonName: string;
  scientificClass: string;
  description: string;
  iconName: string;
  estimatedKnownSpecies: string;
}

export interface AnimalImage {
  id: string;
  url: string;
  thumbnailUrl?: string;
  alt: string;
  caption: string;
  photographer: string;
  licenceAttribution: string;
  sourceDataset: string;
  isHero?: boolean;
}

export interface FreeAnimalProfile {
  primaryCommonName: string;
  scientificName: string;
  taxonomicGroup: string;
  family: string;
  genus: string;
  order: string;
  class: string;
  phylum: string;
  kingdom: string;
  diet: string;
  lifespanWild: string;
  lifespanCaptivity?: string;
  size: string;
  weight: string;
  basicBehaviour: string;
  primaryHabitats: string[];
  continents: string[];
  countries: string[];
  conservationStatus: IUCNCategory;
  populationTrend: PopulationTrend;
  shortDescription: string;
  confidenceRating: ScientificConfidence;
}

export interface ResearchSectionAClassification {
  kingdom: string;
  phylum: string;
  class: string;
  order: string;
  family: string;
  genus: string;
  species: string;
  subspecies?: string[];
  taxonomicSynonyms: string[];
  taxonomicAuthority: string;
  colTaxonId?: string;
  gbifTaxonKey?: string;
}

export interface ResearchSectionBPhysicalBiology {
  anatomy: string;
  morphology: string;
  bodyMeasurements: {
    length: string;
    height?: string;
    wingspan?: string;
    weightMale: string;
    weightFemale: string;
  };
  skeletonAndLocomotion: string;
  specializedOrgans: string;
  adaptations: string[];
  sexualDimorphism: string;
}

export interface ResearchSectionCGenetics {
  genomeSize?: string;
  chromosomeCount?: string;
  geneticDiversityLevel: string;
  geneticResearchSummary: string;
  phylogeneticallyRelatedSpecies: string[];
}

export interface ResearchSectionDEvolution {
  evolutionaryHistory: string;
  ancestralTaxa: string;
  fossilEvidenceSummary: string;
  divergenceEpoch: string;
}

export interface ResearchSectionEGeographicDistribution {
  nativeContinents: string[];
  nativeCountries: string[];
  distributionMapSummary: string;
  elevationRange: string;
  historicalRangeContraction: string;
}

export interface ResearchSectionFHabitatAndEcology {
  biomes: string[];
  climatePreferences: string;
  trophicLevel: string;
  ecologicalNiche: string;
  foodChainRole: string;
  predatorPreyDynamics: string;
}

export interface ResearchSectionGPopulationResearch {
  globalEstimateMin?: number;
  globalEstimateMax?: number;
  medianEstimate?: number;
  populationTrend: PopulationTrend;
  confidence: ScientificConfidence;
  historicalRecords: Array<{
    year: number;
    estimate: number;
    method: string;
    citation: string;
  }>;
  surveyMethodology: string;
  uncertaintyNotes: string;
}

export interface ResearchSectionHBehaviour {
  socialStructure: string;
  communicationMethods: string[];
  cognitionAndIntelligence: string;
  territoriality: string;
  huntingOrForagingStrategy: string;
  migrationPatterns: string;
}

export interface ResearchSectionINutrition {
  dietaryClassification: string;
  primaryFoodSources: string[];
  seasonalDietaryVariations: string;
  caloricIntakeRequirements: string;
}

export interface ResearchSectionJReproduction {
  matingSystem: string;
  breedingSeason: string;
  gestationOrIncubationPeriod: string;
  clutchOrLitterSize: string;
  parentalInvestment: string;
  ageOfSexualMaturity: string;
}

export interface ResearchSectionKLifeCycle {
  developmentStages: string[];
  juvenileMortalityRate: string;
  senescenceAndAgeing: string;
  maximumRecordedLongevity: string;
}

export interface ResearchSectionLHealthAndDiseases {
  knownPathogensAndDiseases: string[];
  parasiticLoad: string;
  veterinaryInterventions: string;
}

export interface ResearchSectionMConservation {
  iucnCategory: IUCNCategory;
  criteriaMet: string;
  threatMatrix: string[];
  climateVulnerability: string;
  activeConservationPrograms: string[];
  protectedAreasPresent: string[];
  citesAppendix: string;
}

export interface ResearchSectionNResearchHistory {
  typeSpecimenDiscoveryDate: string;
  keyResearchers: string[];
  majorBreakthroughs: string[];
  currentResearchGaps: string[];
}

export interface ScientificReference {
  id: string;
  title: string;
  authors: string;
  publicationYear: number;
  journal: string;
  doi?: string;
  url?: string;
  licence: string;
  formattedCitation: string;
}

export interface PremiumResearchProfile {
  classification: ResearchSectionAClassification;
  physicalBiology: ResearchSectionBPhysicalBiology;
  genetics: ResearchSectionCGenetics;
  evolution: ResearchSectionDEvolution;
  geographicDistribution: ResearchSectionEGeographicDistribution;
  habitatAndEcology: ResearchSectionFHabitatAndEcology;
  populationResearch: ResearchSectionGPopulationResearch;
  behaviour: ResearchSectionHBehaviour;
  nutrition: ResearchSectionINutrition;
  reproduction: ResearchSectionJReproduction;
  lifeCycle: ResearchSectionKLifeCycle;
  healthAndDiseases: ResearchSectionLHealthAndDiseases;
  conservation: ResearchSectionMConservation;
  researchHistory: ResearchSectionNResearchHistory;
  scientificReferences: ScientificReference[];
}

export interface AnimalSpecies {
  id: string;
  slug: string;
  scientificName: string;
  taxonomicIdentifier: string;
  category: AnimalCategorySlug;
  featured?: boolean;
  rare?: boolean;
  freeProfile: FreeAnimalProfile;
  images: AnimalImage[];
  premiumResearch?: PremiumResearchProfile;
  lastUpdated: string;
}

export interface UserEntitlement {
  userId: string;
  isLifetimePremium: boolean;
  source: string;
  grantedAt: string;
}

export type SupportedCurrency = "INR" | "USD";

export interface PricingPlan {
  currency: SupportedCurrency;
  symbol: string;
  amount: number;
  displayText: string;
  details: string;
}

