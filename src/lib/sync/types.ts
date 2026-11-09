export interface BiodiversitySourceRecord {
  sourceName: "Catalogue of Life" | "GBIF" | "IUCN Red List";
  taxonomicId: string;
  scientificName: string;
  rank: string;
  family: string;
  genus: string;
  acceptedName?: string;
  synonyms: string[];
  licence: string;
  allowsCommercialUse: boolean;
  retrievedAt: string;
}

export interface ProposedSpeciesDiff {
  id: string;
  speciesSlug: string;
  scientificName: string;
  source: string;
  field: string;
  currentValue: string;
  proposedValue: string;
  detectedConflict: boolean;
  conflictReason?: string;
  status: "pending_review" | "approved" | "rejected";
  createdAt: string;
}

