import { ProposedSpeciesDiff } from "./types";

export const SAMPLE_SYNC_QUEUE: ProposedSpeciesDiff[] = [
  {
    id: "diff_sync_001",
    speciesSlug: "african-elephant",
    scientificName: "Loxodonta africana",
    source: "Catalogue of Life (COL v2024.11)",
    field: "Subspecies Nomenclature",
    currentValue: "Loxodonta africana africana",
    proposedValue: "Loxodonta africana (monotypic classification confirmed via mitochondrial DNA)",
    detectedConflict: false,
    status: "pending_review",
    createdAt: "2024-11-08T10:14:00Z",
  },
  {
    id: "diff_sync_002",
    speciesSlug: "komodo-dragon",
    scientificName: "Varanus komodoensis",
    source: "IUCN Red List API v3",
    field: "Conservation Assessment Criteria",
    currentValue: "EN B1ab(iii,v) (Endangered)",
    proposedValue: "CR A2c (Critically Endangered - Proposed elevation due to projected sea-level inundation on Flores Island)",
    detectedConflict: true,
    conflictReason: "Significant uplisting detected. Requires manual taxonomist verification before altering public conservation status.",
    status: "pending_review",
    createdAt: "2024-11-09T08:22:00Z",
  },
  {
    id: "diff_sync_003",
    speciesSlug: "axolotl",
    scientificName: "Ambystoma mexicanum",
    source: "GBIF Occurrence Sync",
    field: "Occurrence Density Record",
    currentValue: "Wild census estimate < 100 individuals (Lake Xochimilco canal remnants)",
    proposedValue: "+14 opportunistic citizen observation records submitted",
    detectedConflict: true,
    conflictReason: "POLICY RULE ENFORCED: New occurrence records cannot be interpreted as an increase in total population without verified mark-recapture survey.",
    status: "pending_review",
    createdAt: "2024-11-09T09:45:00Z",
  },
];

export class DiffDetector {
  detectTaxonomyDiffs(): ProposedSpeciesDiff[] {
    return SAMPLE_SYNC_QUEUE;
  }

  approveDiff(diffId: string): ProposedSpeciesDiff | null {
    const item = SAMPLE_SYNC_QUEUE.find((d) => d.id === diffId);
    if (item) {
      item.status = "approved";
      return item;
    }
    return null;
  }

  rejectDiff(diffId: string): ProposedSpeciesDiff | null {
    const item = SAMPLE_SYNC_QUEUE.find((d) => d.id === diffId);
    if (item) {
      item.status = "rejected";
      return item;
    }
    return null;
  }
}

export const diffDetector = new DiffDetector();
