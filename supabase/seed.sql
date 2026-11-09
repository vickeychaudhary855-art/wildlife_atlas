-- ==============================================================================
-- WILDLIFE ATLAS – SEED DATA FOR TAXONOMY, HABITATS AND SPECIES
-- Tagline: "Explore Every Species. Understand Every Life. Protect Our Planet."
-- ==============================================================================

-- 1. TAXONOMIC GROUPS
INSERT INTO taxonomic_groups (id, slug, common_name, scientific_class, description, display_order, icon_name) VALUES
('b1010000-0000-0000-0000-000000000001', 'mammals', 'Mammals', 'Mammalia', 'Endothermic amniotes possessing hair, mammary glands, and neocortex.', 1, 'Footprints'),
('b1010000-0000-0000-0000-000000000002', 'birds', 'Birds', 'Aves', 'Feathered, winged, bipedal, endothermic oviparous vertebrate animals.', 2, 'Feather'),
('b1010000-0000-0000-0000-000000000003', 'reptiles', 'Reptiles', 'Reptilia', 'Ectothermic tetrapods protected by keratinized epidermal scales.', 3, 'Eye'),
('b1010000-0000-0000-0000-000000000004', 'amphibians', 'Amphibians', 'Amphibia', 'Ectothermic anamniotes requiring moist microhabitats with biphasic life cycles.', 4, 'Droplets'),
('b1010000-0000-0000-0000-000000000005', 'fish', 'Fish', 'Actinopterygii & Sarcopterygii', 'Ray-finned and lobe-finned aquatic craniate animals.', 5, 'Fish'),
('b1010000-0000-0000-0000-000000000006', 'sharks-rays', 'Sharks & Rays', 'Chondrichthyes', 'Cartilaginous jawed marine predators with placoid denticles.', 6, 'Waves'),
('b1010000-0000-0000-0000-000000000007', 'marine-mammals', 'Marine Mammals', 'Cetacea, Sirenia & Pinnipedia', 'Aquatic mammals specialized for open ocean, coastal and estuarine zones.', 7, 'Anchor'),
('b1010000-0000-0000-0000-000000000008', 'insects', 'Insects', 'Insecta', 'Hexapod invertebrates with chitinous exoskeletons and three-part bodies.', 8, 'Bug'),
('b1010000-0000-0000-0000-000000000009', 'arachnids', 'Arachnids', 'Arachnida', 'Eight-legged joint-legged chelicerate invertebrates.', 9, 'Compass'),
('b1010000-0000-0000-0000-000000000010', 'molluscs', 'Molluscs', 'Mollusca', 'Soft-bodied coelomates including cephalopods, gastropods, and bivalves.', 10, 'Shell'),
('b1010000-0000-0000-0000-000000000011', 'crustaceans', 'Crustaceans', 'Crustacea', 'Predominantly aquatic arthropods with biramous limbs and calcified carapaces.', 11, 'Shield'),
('b1010000-0000-0000-0000-000000000012', 'other-invertebrates', 'Other Invertebrates', 'Cnidaria, Porifera & Echinodermata', 'Corals, jellyfishes, sponges, sea urchins, and starfish.', 12, 'Sparkles')
ON CONFLICT (slug) DO NOTHING;

-- 2. HABITATS
INSERT INTO habitats (id, slug, name, biome, description, icon_name) VALUES
('c2010000-0000-0000-0000-000000000001', 'tropical-rainforest', 'Tropical Rainforest', 'Forest', 'Dense equatorial forests characterized by high annual precipitation.', 'Trees'),
('c2010000-0000-0000-0000-000000000002', 'savanna', 'Savanna', 'Grassland', 'Tropical grassland biome with scattered trees and marked dry seasons.', 'Sun'),
('c2010000-0000-0000-0000-000000000003', 'desert', 'Desert', 'Arid', 'Extreme moisture deficit with xerophytic vegetation and specialised fauna.', 'Thermometer'),
('c2010000-0000-0000-0000-000000000004', 'ocean', 'Ocean', 'Marine', 'Pelagic, benthic and bathypelagic marine water bodies covering 71% of Earth.', 'Waves'),
('c2010000-0000-0000-0000-000000000005', 'freshwater', 'Freshwater', 'Aquatic', 'Low salinity riparian, lacustrine and palustrine wetland systems.', 'Droplets'),
('c2010000-0000-0000-0000-000000000006', 'tundra', 'Tundra', 'Polar', 'Permafrost subsoil, dwarf shrubs, mosses and extreme cold seasons.', 'Snowflake'),
('c2010000-0000-0000-0000-000000000007', 'temperate-forest', 'Temperate Forest', 'Forest', 'Mid-latitude deciduous, coniferous and mixed canopy ecosystems.', 'TreePine'),
('c2010000-0000-0000-0000-000000000008', 'coral-reef', 'Coral Reef', 'Marine', 'Calcium carbonate biogenic marine structures harboring massive marine biodiversity.', 'Shell')
ON CONFLICT (slug) DO NOTHING;

-- 3. DATA LICENCES
INSERT INTO data_licences (id, name, spdx_id, allows_commercial_use, requires_attribution, url) VALUES
('d3010000-0000-0000-0000-000000000001', 'Creative Commons Zero 1.0 Universal', 'CC0-1.0', true, false, 'https://creativecommons.org/publicdomain/zero/1.0/'),
('d3010000-0000-0000-0000-000000000002', 'Creative Commons Attribution 4.0 International', 'CC-BY-4.0', true, true, 'https://creativecommons.org/licenses/by/4.0/'),
('d3010000-0000-0000-0000-000000000003', 'Creative Commons Attribution-ShareAlike 4.0', 'CC-BY-SA-4.0', true, true, 'https://creativecommons.org/licenses/by-sa/4.0/'),
('d3010000-0000-0000-0000-000000000004', 'Unsplash License', 'Unsplash', true, true, 'https://unsplash.com/license')
ON CONFLICT (name) DO NOTHING;

-- 4. DATA SOURCES
INSERT INTO data_sources (id, source_name, base_url, api_version, license_terms, commercial_rights_status) VALUES
('e4010000-0000-0000-0000-000000000001', 'Catalogue of Life', 'https://api.checklistbank.org', 'v1', 'CC BY 4.0 Open Access', 'Commercial attribution required'),
('e4010000-0000-0000-0000-000000000002', 'Global Biodiversity Information Facility (GBIF)', 'https://api.gbif.org/v1', 'v1', 'Mixed open licenses (CC0/CC-BY/CC-BY-NC)', 'CC-BY-NC filtered out for commercial safety'),
('e4010000-0000-0000-0000-000000000003', 'IUCN Red List of Threatened Species', 'https://apiv3.iucnredlist.org/api/v3', 'v3', 'Proprietary Terms of Use', 'Permitted for non-commercial and educational citation')
ON CONFLICT (source_name) DO NOTHING;

