-- ==============================================================================
-- WILDLIFE ATLAS – COMPREHENSIVE POSTGRESQL DATABASE SCHEMA (SUPABASE)
-- Tagline: "Explore Every Species. Understand Every Life. Protect Our Planet."
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- Fast fuzzy taxonomy search

-- 2. ENUMS
CREATE TYPE scientific_confidence_level AS ENUM (
  'verified',
  'estimated',
  'historical',
  'uncertain',
  'data_unavailable',
  'not_assessed'
);

CREATE TYPE iucn_category AS ENUM (
  'EX', -- Extinct
  'EW', -- Extinct in the Wild
  'CR', -- Critically Endangered
  'EN', -- Endangered
  'VU', -- Vulnerable
  'NT', -- Near Threatened
  'LC', -- Least Concern
  'DD', -- Data Deficient
  'NE'  -- Not Evaluated
);

CREATE TYPE population_trend AS ENUM (
  'increasing',
  'stable',
  'decreasing',
  'fluctuating',
  'unknown'
);

CREATE TYPE user_role AS ENUM (
  'free',
  'premium',
  'admin'
);

CREATE TYPE sync_status AS ENUM (
  'pending_review',
  'approved',
  'rejected',
  'auto_applied'
);

CREATE TYPE payment_status AS ENUM (
  'created',
  'pending',
  'verified',
  'failed',
  'refunded'
);

-- 3. TAXONOMY AND ANIMAL REGISTRY
CREATE TABLE taxonomic_groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(64) UNIQUE NOT NULL,
  common_name VARCHAR(128) NOT NULL,
  scientific_class VARCHAR(128) NOT NULL,
  description TEXT,
  display_order INT DEFAULT 0,
  icon_name VARCHAR(64),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE animals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  taxonomic_group_id UUID REFERENCES taxonomic_groups(id) ON DELETE RESTRICT,
  scientific_name VARCHAR(255) UNIQUE NOT NULL,
  canonical_name VARCHAR(255) NOT NULL,
  taxonomic_identifier VARCHAR(128) UNIQUE, -- e.g. COL / GBIF Taxon ID
  is_published BOOLEAN DEFAULT true,
  is_archived BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  rare_flag BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_animals_scientific_name ON animals(scientific_name);
CREATE INDEX idx_animals_taxonomic_id ON animals(taxonomic_identifier);
CREATE INDEX idx_animals_group ON animals(taxonomic_group_id);

CREATE TABLE taxonomy_relationships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  animal_id UUID NOT NULL REFERENCES animals(id) ON DELETE CASCADE,
  kingdom VARCHAR(100) DEFAULT 'Animalia',
  phylum VARCHAR(100) NOT NULL,
  subphylum VARCHAR(100),
  class_name VARCHAR(100) NOT NULL,
  order_name VARCHAR(100) NOT NULL,
  family VARCHAR(100) NOT NULL,
  subfamily VARCHAR(100),
  genus VARCHAR(100) NOT NULL,
  species VARCHAR(100) NOT NULL,
  subspecies VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_taxonomy_family ON taxonomy_relationships(family);
CREATE INDEX idx_taxonomy_genus ON taxonomy_relationships(genus);

CREATE TABLE animal_names (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  animal_id UUID NOT NULL REFERENCES animals(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  language_code VARCHAR(10) DEFAULT 'en',
  name_type VARCHAR(50) DEFAULT 'common', -- common, synonym, indigenous, historical
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_animal_names_trgm ON animal_names USING gin (name gin_trgm_ops);

-- 4. BASIC / FREE ANIMAL PROFILES
CREATE TABLE animal_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  animal_id UUID UNIQUE NOT NULL REFERENCES animals(id) ON DELETE CASCADE,
  primary_common_name VARCHAR(255) NOT NULL,
  short_description TEXT NOT NULL,
  diet_type VARCHAR(100), -- Herbivore, Carnivore, Omnivore, etc.
  average_lifespan_wild VARCHAR(100),
  average_lifespan_captivity VARCHAR(100),
  size_description VARCHAR(255),
  weight_description VARCHAR(255),
  primary_habitats TEXT,
  geographic_distribution_summary TEXT,
  basic_behaviour_summary TEXT,
  conservation_status_summary VARCHAR(50),
  confidence_rating scientific_confidence_level DEFAULT 'verified',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. IMAGERY AND LICENSING
CREATE TABLE data_licences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) UNIQUE NOT NULL,
  spdx_id VARCHAR(50),
  allows_commercial_use BOOLEAN DEFAULT false,
  requires_attribution BOOLEAN DEFAULT true,
  url TEXT,
  notes TEXT
);

CREATE TABLE animal_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  animal_id UUID NOT NULL REFERENCES animals(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  alt_text VARCHAR(255) NOT NULL,
  caption TEXT,
  photographer VARCHAR(255),
  source_dataset VARCHAR(100),
  licence_id UUID REFERENCES data_licences(id),
  licence_attribution TEXT NOT NULL,
  is_hero BOOLEAN DEFAULT false,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_animal_images_animal ON animal_images(animal_id);

-- 6. HABITATS AND BIOGEOGRAPHY
CREATE TABLE habitats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(64) UNIQUE NOT NULL,
  name VARCHAR(128) NOT NULL,
  biome VARCHAR(128),
  description TEXT,
  icon_name VARCHAR(64)
);

CREATE TABLE animal_habitats (
  animal_id UUID REFERENCES animals(id) ON DELETE CASCADE,
  habitat_id UUID REFERENCES habitats(id) ON DELETE CASCADE,
  is_primary BOOLEAN DEFAULT true,
  PRIMARY KEY (animal_id, habitat_id)
);

CREATE TABLE geographic_distributions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  animal_id UUID NOT NULL REFERENCES animals(id) ON DELETE CASCADE,
  continent VARCHAR(64) NOT NULL,
  country_iso2 VARCHAR(2),
  country_name VARCHAR(128) NOT NULL,
  range_status VARCHAR(64) DEFAULT 'native', -- native, introduced, re-introduced, extinct_locally
  confidence scientific_confidence_level DEFAULT 'verified',
  notes TEXT
);

CREATE INDEX idx_geo_continent ON geographic_distributions(continent);
CREATE INDEX idx_geo_country ON geographic_distributions(country_name);

-- 7. POPULATION ESTIMATES & CONSERVATION ASSESSMENTS (Historical Tracking)
CREATE TABLE population_estimates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  animal_id UUID NOT NULL REFERENCES animals(id) ON DELETE CASCADE,
  estimated_population_min BIGINT,
  estimated_population_max BIGINT,
  estimated_population_median BIGINT,
  population_trend population_trend DEFAULT 'unknown',
  survey_year INT,
  geographic_scope VARCHAR(128) DEFAULT 'Global', -- Global, Regional, Subspecies
  region_name VARCHAR(128),
  methodology_description TEXT,
  confidence scientific_confidence_level DEFAULT 'estimated',
  uncertainty_margin_percentage NUMERIC(5,2),
  is_current_baseline BOOLEAN DEFAULT true,
  source_citation TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_population_animal ON population_estimates(animal_id);

CREATE TABLE conservation_assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  animal_id UUID NOT NULL REFERENCES animals(id) ON DELETE CASCADE,
  category iucn_category NOT NULL,
  assessment_year INT NOT NULL,
  criteria_met VARCHAR(255),
  trend population_trend DEFAULT 'unknown',
  threat_summary TEXT,
  assessor VARCHAR(255),
  source_dataset VARCHAR(100),
  is_current BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_conservation_animal ON conservation_assessments(animal_id);

-- 8. PREMIUM RESEARCH MODULES (A THROUGH O)
CREATE TABLE research_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  animal_id UUID NOT NULL REFERENCES animals(id) ON DELETE CASCADE,
  section_code VARCHAR(32) NOT NULL, -- 'A_CLASSIFICATION', 'B_PHYSICAL_BIOLOGY', 'C_GENETICS', etc.
  section_title VARCHAR(128) NOT NULL,
  data_payload JSONB NOT NULL,
  confidence scientific_confidence_level DEFAULT 'verified',
  scientific_reviewer VARCHAR(255),
  last_verified_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(animal_id, section_code)
);

CREATE INDEX idx_research_sections_animal ON research_sections(animal_id);

-- 9. SCIENTIFIC REFERENCES
CREATE TABLE scientific_references (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  animal_id UUID NOT NULL REFERENCES animals(id) ON DELETE CASCADE,
  paper_title TEXT NOT NULL,
  authors TEXT NOT NULL,
  publication_year INT,
  journal_name VARCHAR(255),
  doi VARCHAR(128),
  source_url TEXT,
  data_collection_date DATE,
  licence VARCHAR(100),
  citation_formatted TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_references_doi ON scientific_references(doi);

-- 10. EXTERNAL DATA SOURCES & AUTOMATIC SYNC AUDITING
CREATE TABLE data_sources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_name VARCHAR(100) UNIQUE NOT NULL, -- 'Catalogue of Life', 'GBIF', 'IUCN Red List'
  base_url TEXT NOT NULL,
  api_version VARCHAR(32),
  license_terms TEXT,
  commercial_rights_status VARCHAR(128),
  active BOOLEAN DEFAULT true,
  last_sync_at TIMESTAMPTZ
);

CREATE TABLE update_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_id UUID REFERENCES data_sources(id),
  animal_id UUID REFERENCES animals(id) ON DELETE SET NULL,
  taxonomic_identifier VARCHAR(128),
  field_name VARCHAR(128) NOT NULL,
  previous_value JSONB,
  proposed_value JSONB,
  detected_conflict BOOLEAN DEFAULT false,
  status sync_status DEFAULT 'pending_review',
  review_notes TEXT,
  reviewed_by UUID,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. USERS, ENTITLEMENTS & PAYMENTS
CREATE TABLE users_profile (
  id UUID PRIMARY KEY, -- Maps to auth.users.id in Supabase
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  role user_role DEFAULT 'free',
  avatar_url TEXT,
  country VARCHAR(64),
  currency_preference VARCHAR(3) DEFAULT 'USD',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_entitlements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users_profile(id) ON DELETE CASCADE,
  is_lifetime_premium BOOLEAN DEFAULT false,
  entitlement_source VARCHAR(64) DEFAULT 'direct_purchase', -- direct_purchase, grant, promo
  granted_at TIMESTAMPTZ DEFAULT NOW(),
  revoked_at TIMESTAMPTZ,
  UNIQUE(user_id)
);

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users_profile(id),
  gateway_provider VARCHAR(64) NOT NULL, -- 'stripe_sandbox', 'razorpay_sandbox', etc.
  transaction_reference VARCHAR(128) UNIQUE NOT NULL,
  order_reference VARCHAR(128) NOT NULL,
  currency VARCHAR(3) NOT NULL, -- 'INR' or 'USD'
  amount_cents_or_paise BIGINT NOT NULL, -- 3000 for ₹30 INR, 100 for $1.00 USD
  status payment_status DEFAULT 'created',
  verified_by_webhook BOOLEAN DEFAULT false,
  webhook_payload JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_payments_user ON payments(user_id);
CREATE INDEX idx_payments_trans ON payments(transaction_reference);

-- 12. ADMIN AUDIT LOGS
CREATE TABLE admin_audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_user_id UUID REFERENCES users_profile(id),
  action_type VARCHAR(64) NOT NULL, -- 'ANIMAL_UPDATE', 'POPULATION_MODIFIED', 'SYNC_APPROVED'
  entity_type VARCHAR(64) NOT NULL,
  entity_id UUID NOT NULL,
  before_payload JSONB,
  after_payload JSONB,
  ip_address VARCHAR(45),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE animals ENABLE ROW LEVEL SECURITY;
ALTER TABLE animal_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE animal_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE users_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_entitlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- Public can read published animals, free profiles, and images
CREATE POLICY "Public can view published animals"
  ON animals FOR SELECT
  USING (is_published = true AND is_archived = false);

CREATE POLICY "Public can view animal free profiles"
  ON animal_profiles FOR SELECT
  USING (true);

CREATE POLICY "Public can view animal images"
  ON animal_images FOR SELECT
  USING (true);

-- Research sections: Only premium users or admins can read full research payloads
CREATE POLICY "Premium users and admins can view research sections"
  ON research_sections FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_entitlements
      WHERE user_entitlements.user_id = auth.uid()
        AND user_entitlements.is_lifetime_premium = true
    )
    OR
    EXISTS (
      SELECT 1 FROM users_profile
      WHERE users_profile.id = auth.uid()
        AND users_profile.role = 'admin'
    )
  );

-- Users can read their own profile & entitlements
CREATE POLICY "Users can read own profile"
  ON users_profile FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can read own entitlements"
  ON user_entitlements FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  USING (auth.uid() = user_id);

-- Admins have full access
CREATE POLICY "Admins full management on animals"
  ON animals TO authenticated
  USING (EXISTS (SELECT 1 FROM users_profile WHERE id = auth.uid() AND role = 'admin'));

