/** SAMPLE DATA – FOR DEVELOPMENT ONLY. Not for production use. */

export interface SampleAnimal {
  id: string;
  slug: string;
  scientificName: string;
  commonName: string;
  category: string;
  family: string;
  order: string;
  className: string;
  phylum: string;
  kingdom: string;
  genus: string;
  diet: string;
  lifespanWild: string;
  size: string;
  weight: string;
  conservationStatus: string;
  populationTrend: string;
  populationEstimate: string;
  shortDescription: string;
  primaryHabitats: string[];
  continents: string[];
  imageUrl: string;
  imageAlt: string;
  imageCredit: string;
  featured: boolean;
  rare: boolean;
}

export const SAMPLE_ANIMALS: SampleAnimal[] = [
  // ── 1. African Elephant ──────────────────────────────────────────────
  {
    id: "african-elephant-001",
    slug: "african-elephant",
    scientificName: "Loxodonta africana",
    commonName: "African Elephant",
    category: "mammals",
    family: "Elephantidae",
    order: "Proboscidea",
    className: "Mammalia",
    phylum: "Chordata",
    kingdom: "Animalia",
    genus: "Loxodonta",
    diet: "Herbivore",
    lifespanWild: "60–70 years",
    size: "3–4 m tall at the shoulder",
    weight: "4,000–7,000 kg",
    conservationStatus: "VU",
    populationTrend: "Decreasing",
    populationEstimate: "~415,000",
    shortDescription:
      "The African elephant is the largest living terrestrial animal, roaming the savannas, forests, and deserts of sub-Saharan Africa. These highly social animals live in matriarchal herds and communicate using low-frequency infrasound that can travel several kilometres. Their elongated incisors, known as tusks, are used for digging, foraging, and defence but have also made them a prime target for poaching. Conservation efforts across the continent focus on habitat corridors and anti-poaching patrols to stabilise declining populations.",
    primaryHabitats: ["Savanna", "Tropical forest", "Semi-arid desert"],
    continents: ["Africa"],
    imageUrl:
      "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=800&q=80",
    imageAlt: "African elephant walking across a sunlit savanna",
    imageCredit: "Unsplash",
    featured: true,
    rare: false,
  },

  // ── 2. Harpy Eagle ───────────────────────────────────────────────────
  {
    id: "harpy-eagle-002",
    slug: "harpy-eagle",
    scientificName: "Harpia harpyja",
    commonName: "Harpy Eagle",
    category: "birds",
    family: "Accipitridae",
    order: "Accipitriformes",
    className: "Aves",
    phylum: "Chordata",
    kingdom: "Animalia",
    genus: "Harpia",
    diet: "Carnivore",
    lifespanWild: "25–35 years",
    size: "89–107 cm body length; wingspan up to 2 m",
    weight: "4–9 kg",
    conservationStatus: "VU",
    populationTrend: "Decreasing",
    populationEstimate: "~20,000–49,999",
    shortDescription:
      "The harpy eagle is one of the most powerful raptors in the world, inhabiting the tropical lowland rainforests of Central and South America. Its massive talons, comparable in size to a grizzly bear's claws, allow it to snatch sloths and monkeys from the forest canopy. Pairs are monogamous and raise only one chick every two to three years, making population recovery slow. Deforestation of its primary habitat remains the greatest threat to its long-term survival.",
    primaryHabitats: ["Tropical rainforest", "Lowland forest"],
    continents: ["South America", "North America"],
    imageUrl:
      "https://images.unsplash.com/photo-1611689342806-0863700ce8e4?w=800&q=80",
    imageAlt: "Harpy eagle perched on a branch in a tropical forest",
    imageCredit: "Unsplash",
    featured: true,
    rare: true,
  },

  // ── 3. Komodo Dragon ─────────────────────────────────────────────────
  {
    id: "komodo-dragon-003",
    slug: "komodo-dragon",
    scientificName: "Varanus komodoensis",
    commonName: "Komodo Dragon",
    category: "reptiles",
    family: "Varanidae",
    order: "Squamata",
    className: "Reptilia",
    phylum: "Chordata",
    kingdom: "Animalia",
    genus: "Varanus",
    diet: "Carnivore",
    lifespanWild: "~30 years",
    size: "2.6–3 m in length",
    weight: "70–90 kg",
    conservationStatus: "EN",
    populationTrend: "Decreasing",
    populationEstimate: "~3,000",
    shortDescription:
      "The Komodo dragon is the world's largest living lizard, endemic to a handful of islands in southeastern Indonesia. It is an apex predator that relies on a combination of serrated teeth, powerful claws, and venom-secreting glands to subdue prey as large as water buffalo. Despite its bulk, it is capable of sprinting at speeds up to 20 km/h over short distances. Rising sea levels and shrinking habitat driven by climate change have led to its recent uplisting to Endangered on the IUCN Red List.",
    primaryHabitats: ["Tropical dry forest", "Savanna", "Coastal scrubland"],
    continents: ["Asia"],
    imageUrl:
      "https://images.unsplash.com/photo-1567870335211-4e6e0a3e7c2b?w=800&q=80",
    imageAlt: "Komodo dragon basking on rocky ground",
    imageCredit: "Unsplash",
    featured: true,
    rare: true,
  },

  // ── 4. Axolotl ───────────────────────────────────────────────────────
  {
    id: "axolotl-004",
    slug: "axolotl",
    scientificName: "Ambystoma mexicanum",
    commonName: "Axolotl",
    category: "amphibians",
    family: "Ambystomatidae",
    order: "Urodela",
    className: "Amphibia",
    phylum: "Chordata",
    kingdom: "Animalia",
    genus: "Ambystoma",
    diet: "Carnivore",
    lifespanWild: "10–15 years",
    size: "15–45 cm in length",
    weight: "60–200 g",
    conservationStatus: "CR",
    populationTrend: "Decreasing",
    populationEstimate: "~50–1,000 in the wild",
    shortDescription:
      "The axolotl is a neotenic salamander that retains its larval features—external gills, a dorsal fin, and a fully aquatic lifestyle—throughout adulthood. It is endemic to the lake complex of Xochimilco in the Valley of Mexico, where urbanisation and invasive species have driven it to the brink of extinction. Scientists prize it for its extraordinary regenerative abilities: it can regrow entire limbs, portions of its heart, and even parts of its brain. Captive breeding programmes now vastly outnumber wild populations, underscoring the urgency of habitat restoration.",
    primaryHabitats: ["Freshwater lake", "Canal system"],
    continents: ["North America"],
    imageUrl:
      "https://images.unsplash.com/photo-1615497001839-b0a0eac3274c?w=800&q=80",
    imageAlt: "Pink axolotl resting on aquatic plants",
    imageCredit: "Unsplash",
    featured: true,
    rare: true,
  },

  // ── 5. Coelacanth ────────────────────────────────────────────────────
  {
    id: "coelacanth-005",
    slug: "coelacanth",
    scientificName: "Latimeria chalumnae",
    commonName: "Coelacanth",
    category: "fish",
    family: "Latimeriidae",
    order: "Coelacanthiformes",
    className: "Sarcopterygii",
    phylum: "Chordata",
    kingdom: "Animalia",
    genus: "Latimeria",
    diet: "Carnivore",
    lifespanWild: "~60 years (estimated up to 100)",
    size: "1.5–2 m in length",
    weight: "50–100 kg",
    conservationStatus: "CR",
    populationTrend: "Decreasing",
    populationEstimate: "~500 (estimated)",
    shortDescription:
      "Often called a 'living fossil', the coelacanth was thought to have gone extinct 66 million years ago until a living specimen was caught off the coast of South Africa in 1938. It possesses lobed, limb-like fins that move in an alternating pattern reminiscent of tetrapod locomotion, making it crucial for understanding vertebrate evolution. Coelacanths inhabit deep submarine canyons and caves at depths of 150–700 metres along the western Indian Ocean. Their low fecundity and extreme sensitivity to environmental disturbance keep them Critically Endangered.",
    primaryHabitats: ["Deep ocean caves", "Submarine canyons"],
    continents: ["Africa"],
    imageUrl:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    imageAlt: "Deep-sea fish swimming in dark ocean waters",
    imageCredit: "Unsplash",
    featured: false,
    rare: true,
  },

  // ── 6. Great White Shark ──────────────────────────────────────────────
  {
    id: "great-white-shark-006",
    slug: "great-white-shark",
    scientificName: "Carcharodon carcharias",
    commonName: "Great White Shark",
    category: "sharks-rays",
    family: "Lamnidae",
    order: "Lamniformes",
    className: "Chondrichthyes",
    phylum: "Chordata",
    kingdom: "Animalia",
    genus: "Carcharodon",
    diet: "Carnivore",
    lifespanWild: "~70 years",
    size: "4–6 m in length (females larger)",
    weight: "680–1,100 kg",
    conservationStatus: "VU",
    populationTrend: "Unknown",
    populationEstimate: "~3,500 (estimated globally)",
    shortDescription:
      "The great white shark is the world's largest predatory fish, found in cool coastal and offshore waters across all major oceans. Equipped with rows of serrated, triangular teeth and electroreceptive ampullae of Lorenzini, it detects prey with remarkable precision. Despite its fearsome reputation, it plays a critical role as an apex predator in maintaining marine ecosystem balance. Bycatch, shark finning, and declining prey populations contribute to its Vulnerable conservation status worldwide.",
    primaryHabitats: ["Coastal waters", "Open ocean", "Kelp forests"],
    continents: [
      "Africa",
      "North America",
      "South America",
      "Oceania",
      "Asia",
      "Europe",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1560275619-4662e36fa65c?w=800&q=80",
    imageAlt: "Great white shark gliding through clear blue water",
    imageCredit: "Unsplash",
    featured: true,
    rare: false,
  },

  // ── 7. Blue Whale ─────────────────────────────────────────────────────
  {
    id: "blue-whale-007",
    slug: "blue-whale",
    scientificName: "Balaenoptera musculus",
    commonName: "Blue Whale",
    category: "marine-mammals",
    family: "Balaenopteridae",
    order: "Artiodactyla",
    className: "Mammalia",
    phylum: "Chordata",
    kingdom: "Animalia",
    genus: "Balaenoptera",
    diet: "Carnivore (krill specialist)",
    lifespanWild: "80–90 years",
    size: "25–30 m in length",
    weight: "100,000–150,000 kg",
    conservationStatus: "EN",
    populationTrend: "Increasing",
    populationEstimate: "~10,000–25,000",
    shortDescription:
      "The blue whale is the largest animal ever known to have existed on Earth, reaching lengths of up to 30 metres and weights exceeding 150 tonnes. Despite its colossal size, it feeds almost exclusively on tiny crustaceans called krill, consuming up to 3,600 kg per day during the feeding season. Its heart is roughly the size of a small car, and its vocalisations can be detected by other blue whales over 1,600 km away. After near-extinction from 20th-century commercial whaling, populations are slowly recovering under international protections.",
    primaryHabitats: ["Open ocean", "Polar seas", "Upwelling zones"],
    continents: [
      "Antarctica",
      "North America",
      "South America",
      "Asia",
      "Oceania",
      "Africa",
      "Europe",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=800&q=80",
    imageAlt: "Blue whale surfacing in open ocean with a spout of mist",
    imageCredit: "Unsplash",
    featured: true,
    rare: true,
  },

  // ── 8. Atlas Moth ─────────────────────────────────────────────────────
  {
    id: "atlas-moth-008",
    slug: "atlas-moth",
    scientificName: "Attacus atlas",
    commonName: "Atlas Moth",
    category: "insects",
    family: "Saturniidae",
    order: "Lepidoptera",
    className: "Insecta",
    phylum: "Arthropoda",
    kingdom: "Animalia",
    genus: "Attacus",
    diet: "Non-feeding adult (larva: herbivore)",
    lifespanWild: "1–2 weeks (adult stage)",
    size: "Wingspan 25–30 cm",
    weight: "~25 g",
    conservationStatus: "NE",
    populationTrend: "Stable",
    populationEstimate: "Unknown – widespread",
    shortDescription:
      "The Atlas moth is one of the largest lepidopterans in the world, boasting a wingspan that can exceed 25 centimetres. Native to the tropical and subtropical forests of Southeast Asia, the adult moth lacks functional mouthparts and does not eat, surviving solely on fat reserves stored during its larval stage. The wing tips bear patterns that mimic the head of a snake, a trait thought to deter predators. Its cocoons, spun from broken strands of silk, are sometimes harvested to produce a durable, brown fabric known as fagara silk.",
    primaryHabitats: [
      "Tropical rainforest",
      "Subtropical forest",
      "Lowland scrub",
    ],
    continents: ["Asia"],
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f1d7?w=800&q=80",
    imageAlt: "Large Atlas moth resting with wings spread on green foliage",
    imageCredit: "Unsplash",
    featured: false,
    rare: false,
  },

  // ── 9. Mexican Red-Knee Tarantula ─────────────────────────────────────
  {
    id: "mexican-red-knee-tarantula-009",
    slug: "mexican-red-knee-tarantula",
    scientificName: "Brachypelma hamorii",
    commonName: "Mexican Red-Knee Tarantula",
    category: "arachnids",
    family: "Theraphosidae",
    order: "Araneae",
    className: "Arachnida",
    phylum: "Arthropoda",
    kingdom: "Animalia",
    genus: "Brachypelma",
    diet: "Carnivore",
    lifespanWild: "20–30 years (females); 5–10 years (males)",
    size: "12–15 cm leg span",
    weight: "15–16 g",
    conservationStatus: "NT",
    populationTrend: "Decreasing",
    populationEstimate: "Unknown – declining in the wild",
    shortDescription:
      "The Mexican red-knee tarantula is a strikingly coloured burrowing spider native to the Pacific coast of Mexico. Its vivid orange-red leg joints make it one of the most recognisable tarantulas in the pet trade, which, combined with habitat loss, has led to its Near Threatened status. Females can live for over 25 years and moult regularly throughout their lives, while males rarely survive more than a few months after reaching maturity. Like many theraphosids, it defends itself by flicking urticating hairs from its abdomen at potential predators.",
    primaryHabitats: [
      "Tropical deciduous forest",
      "Scrubland",
      "Rocky hillsides",
    ],
    continents: ["North America"],
    imageUrl:
      "https://images.unsplash.com/photo-1584553421349-3557471bed79?w=800&q=80",
    imageAlt:
      "Mexican red-knee tarantula on a piece of bark showing vivid leg markings",
    imageCredit: "Unsplash",
    featured: false,
    rare: false,
  },

  // ── 10. Giant Pacific Octopus ──────────────────────────────────────────
  {
    id: "giant-pacific-octopus-010",
    slug: "giant-pacific-octopus",
    scientificName: "Enteroctopus dofleini",
    commonName: "Giant Pacific Octopus",
    category: "molluscs",
    family: "Enteroctopodidae",
    order: "Octopoda",
    className: "Cephalopoda",
    phylum: "Mollusca",
    kingdom: "Animalia",
    genus: "Enteroctopus",
    diet: "Carnivore",
    lifespanWild: "3–5 years",
    size: "Arm span up to 6 m",
    weight: "10–50 kg (record ~71 kg)",
    conservationStatus: "LC",
    populationTrend: "Stable",
    populationEstimate: "Unknown – considered abundant",
    shortDescription:
      "The giant Pacific octopus is the largest species of octopus in the world, with an arm span that can reach six metres. Found in the coastal waters of the North Pacific from Alaska to California and across to Japan, it is renowned for its problem-solving intelligence, including the ability to open jars and navigate complex mazes. Each of its eight arms contains roughly two-thirds of its total neurons, enabling semi-autonomous limb control. Females lay tens of thousands of eggs in a single clutch and guard them relentlessly for up to seven months without feeding, dying shortly after the eggs hatch.",
    primaryHabitats: ["Rocky reef", "Kelp forest", "Coastal seafloor"],
    continents: ["North America", "Asia"],
    imageUrl:
      "https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?w=800&q=80",
    imageAlt:
      "Giant Pacific octopus with extended tentacles on the ocean floor",
    imageCredit: "Unsplash",
    featured: false,
    rare: false,
  },

  // ── 11. Japanese Spider Crab ──────────────────────────────────────────
  {
    id: "japanese-spider-crab-011",
    slug: "japanese-spider-crab",
    scientificName: "Macrocheira kaempferi",
    commonName: "Japanese Spider Crab",
    category: "crustaceans",
    family: "Inachidae",
    order: "Decapoda",
    className: "Malacostraca",
    phylum: "Arthropoda",
    kingdom: "Animalia",
    genus: "Macrocheira",
    diet: "Omnivore",
    lifespanWild: "~100 years (estimated)",
    size: "Leg span up to 3.7 m; carapace ~40 cm",
    weight: "16–20 kg",
    conservationStatus: "LC",
    populationTrend: "Stable",
    populationEstimate: "Unknown – not formally assessed",
    shortDescription:
      "The Japanese spider crab possesses the largest leg span of any living arthropod, stretching up to 3.7 metres from claw tip to claw tip. It inhabits the deep waters surrounding Japan, typically at depths of 150–300 metres, migrating to shallower waters during breeding season. Despite its intimidating appearance, it is a slow-moving scavenger that feeds on dead organisms, algae, and small invertebrates on the ocean floor. Specimens are believed to live for up to a century, making them among the longest-lived arthropods known to science.",
    primaryHabitats: ["Deep ocean floor", "Continental shelf"],
    continents: ["Asia"],
    imageUrl:
      "https://images.unsplash.com/photo-1559827291-bae8efb7e269?w=800&q=80",
    imageAlt:
      "Japanese spider crab on the seafloor with long spindly legs extended",
    imageCredit: "Unsplash",
    featured: false,
    rare: false,
  },

  // ── 12. Crown-of-Thorns Starfish ──────────────────────────────────────
  {
    id: "crown-of-thorns-starfish-012",
    slug: "crown-of-thorns-starfish",
    scientificName: "Acanthaster planci",
    commonName: "Crown-of-Thorns Starfish",
    category: "other-invertebrates",
    family: "Acanthasteridae",
    order: "Valvatida",
    className: "Asteroidea",
    phylum: "Echinodermata",
    kingdom: "Animalia",
    genus: "Acanthaster",
    diet: "Corallivore",
    lifespanWild: "~15–17 years",
    size: "25–35 cm diameter (up to 80 cm)",
    weight: "Up to 3 kg",
    conservationStatus: "LC",
    populationTrend: "Stable (with periodic outbreaks)",
    populationEstimate: "Unknown – highly variable due to boom-bust cycles",
    shortDescription:
      "The crown-of-thorns starfish is a large, venomous sea star that feeds on the coral polyps of Indo-Pacific reefs. Covered in sharp, toxin-coated spines, it digests coral by everting its stomach onto the reef surface and absorbing the liquefied tissue. While a natural part of reef ecosystems, population outbreaks—sometimes involving millions of individuals—can devastate vast tracts of coral, including sections of the Great Barrier Reef. Nutrient runoff and the removal of its natural predators, such as the giant triton snail, are thought to exacerbate these outbreaks.",
    primaryHabitats: ["Coral reef", "Tropical shallow seas"],
    continents: ["Asia", "Oceania", "Africa"],
    imageUrl:
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&q=80",
    imageAlt:
      "Crown-of-thorns starfish on a coral reef displaying spiny purple arms",
    imageCredit: "Unsplash",
    featured: false,
    rare: false,
  },
];

export const WILDLIFE_STATS = {
  totalSpeciesDocumented: 1_450_000,
  mammalsKnown: 6_500,
  birdsKnown: 11_000,
  reptilesKnown: 12_000,
  amphibiansKnown: 8_700,
  fishKnown: 34_000,
  insectsKnown: 1_050_000,
  endangeredSpecies: 44_000,
  criticallyEndangered: 9_500,
  countriesRepresented: 195,
  conservationProgramsTracked: 2_400,
  scientificReferencesIndexed: 85_000,
};
