#!/usr/bin/env node

/**
 * Wildlife Atlas — Scientific Data & Integrity Test Suite
 * Validates 100% completeness of sample animals, taxonomic groups, and research profiles.
 */

import { readFileSync } from "fs";
import { resolve } from "path";

console.log("🔍 Running Wildlife Atlas Integrity & Verification Suite...\n");

let failures = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    failures++;
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

// 1. Verify sample animals file exists and has 12 species
const sampleAnimalsCode = readFileSync(resolve("src/data/sampleAnimals.ts"), "utf-8");
const animalSlugMatches = [...sampleAnimalsCode.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map(m => m[1]);

assert(animalSlugMatches.length === 12, `Expected 12 species in sampleAnimals, found ${animalSlugMatches.length}`);

// 2. Verify taxonomy groups has 12 groups
const taxonomyCode = readFileSync(resolve("src/data/taxonomyGroups.ts"), "utf-8");
const taxonomyGroupMatches = [...taxonomyCode.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map(m => m[1]);
assert(taxonomyGroupMatches.length === 12, `Expected 12 taxonomic groups, found ${taxonomyGroupMatches.length}`);

// 3. Verify sampleResearchProfiles has all 12 species
const researchCode = readFileSync(resolve("src/data/sampleResearchProfiles.ts"), "utf-8");
const researchProfileMatches = [...researchCode.matchAll(/^\s*"([a-z0-9-]+)":\s*\{/gm)].map(m => m[1]);

assert(researchProfileMatches.length === 12, `Expected 12 research profiles, found ${researchProfileMatches.length}`);

for (const slug of animalSlugMatches) {
  assert(researchProfileMatches.includes(slug), `Research profile exists for species: "${slug}"`);
}

// 4. Verify all 15 required scientific sections exist in sampleResearchProfiles
const requiredSections = [
  "classification",
  "physicalBiology",
  "genetics",
  "evolution",
  "geographicDistribution",
  "habitatAndEcology",
  "populationResearch",
  "behaviour",
  "nutrition",
  "reproduction",
  "lifeCycle",
  "healthAndDiseases",
  "conservation",
  "researchHistory",
  "scientificReferences",
];

for (const section of requiredSections) {
  const count = (researchCode.match(new RegExp(`${section}:\\s*\\{`, "g")) || []).length;
  // scientificReferences is an array, others are objects
  const arrayCount = (researchCode.match(new RegExp(`${section}:\\s*\\[`, "g")) || []).length;
  const total = count + arrayCount;
  assert(total === 12, `Section "${section}" present in all 12 species profiles (found ${total}/12)`);
}

console.log("\n---------------------------------------------------");
if (failures === 0) {
  console.log("🎉 ALL SCIENTIFIC INTEGRITY CHECKS PASSED (100% Complete)!");
  process.exit(0);
} else {
  console.error(`💥 Completed with ${failures} failure(s).`);
  process.exit(1);
}

