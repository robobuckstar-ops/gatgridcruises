-- GatGridCruises Initial Schema
-- This migration creates all tables for the GatGridCruises application

-- ============================================================================
-- Extension Setup
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- Auth Profiles Table (depends on auth.users)
-- ============================================================================

CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text NOT NULL,
  role text DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_self" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_update_self" ON profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ============================================================================
-- Ships Table
-- ============================================================================

CREATE TABLE ships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  year_launched int,
  capacity int,
  tonnage int,
  highlights jsonb,
  whats_included jsonb,
  whats_extra jsonb,
  editorial_take text,
  hero_image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE ships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ships_select_public" ON ships
  FOR SELECT USING (true);

CREATE POLICY "ships_insert_admin" ON ships
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "ships_update_admin" ON ships
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "ships_delete_admin" ON ships
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE INDEX idx_ships_slug ON ships(slug);

-- ============================================================================
-- Ports Table
-- ============================================================================

CREATE TABLE ports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  city text,
  country text,
  code text,
  overview text,
  nearest_airports jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE ports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ports_select_public" ON ports
  FOR SELECT USING (true);

CREATE POLICY "ports_insert_admin" ON ports
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "ports_update_admin" ON ports
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "ports_delete_admin" ON ports
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE INDEX idx_ports_slug ON ports(slug);

-- ============================================================================
-- Sailings Table
-- ============================================================================

CREATE TABLE sailings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ship_id uuid NOT NULL REFERENCES ships(id) ON DELETE CASCADE,
  departure_port_id uuid NOT NULL REFERENCES ports(id) ON DELETE RESTRICT,
  itinerary_name text,
  itinerary_details jsonb,
  sail_date date NOT NULL,
  length_nights int,
  current_lowest_price numeric,
  current_inside_price numeric,
  current_oceanview_price numeric,
  current_verandah_price numeric,
  current_concierge_price numeric,
  sailing_score int,
  is_featured boolean DEFAULT false,
  notes text,
  disney_booking_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE sailings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sailings_select_public" ON sailings
  FOR SELECT USING (true);

CREATE POLICY "sailings_insert_admin" ON sailings
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "sailings_update_admin" ON sailings
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "sailings_delete_admin" ON sailings
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE INDEX idx_sailings_sail_date ON sailings(sail_date);
CREATE INDEX idx_sailings_ship_id ON sailings(ship_id);
CREATE INDEX idx_sailings_departure_port_id ON sailings(departure_port_id);

-- ============================================================================
-- Price Snapshots Table
-- ============================================================================

CREATE TABLE price_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sailing_id uuid NOT NULL REFERENCES sailings(id) ON DELETE CASCADE,
  snapshot_date date NOT NULL,
  inside_price numeric,
  oceanview_price numeric,
  verandah_price numeric,
  concierge_price numeric,
  lowest_price numeric,
  source text DEFAULT 'manual',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE price_snapshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "price_snapshots_select_public" ON price_snapshots
  FOR SELECT USING (true);

CREATE POLICY "price_snapshots_insert_admin" ON price_snapshots
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "price_snapshots_update_admin" ON price_snapshots
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "price_snapshots_delete_admin" ON price_snapshots
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE INDEX idx_price_snapshots_sailing_id ON price_snapshots(sailing_id);

-- ============================================================================
-- Staterooms Table
-- ============================================================================

CREATE TABLE staterooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ship_id uuid NOT NULL REFERENCES ships(id) ON DELETE CASCADE,
  room_number text,
  category text,
  category_code text,
  deck int,
  position text,
  side text,
  noise_rating int,
  view_rating int,
  connecting_room text,
  accessible boolean DEFAULT false,
  max_occupancy int,
  pros jsonb,
  cons jsonb,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE staterooms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "staterooms_select_public" ON staterooms
  FOR SELECT USING (true);

CREATE POLICY "staterooms_insert_admin" ON staterooms
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "staterooms_update_admin" ON staterooms
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "staterooms_delete_admin" ON staterooms
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE INDEX idx_staterooms_ship_id ON staterooms(ship_id);

-- ============================================================================
-- Pre-Cruise Hotels Table
-- ============================================================================

CREATE TABLE pre_cruise_hotels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  port_id uuid NOT NULL REFERENCES ports(id) ON DELETE CASCADE,
  name text NOT NULL,
  is_disney_partner boolean DEFAULT false,
  price_range text,
  distance_to_port_miles numeric,
  shuttle_available boolean DEFAULT false,
  shuttle_details text,
  pros jsonb,
  cons jsonb,
  editorial_take text,
  booking_affiliate_url text,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE pre_cruise_hotels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "pre_cruise_hotels_select_public" ON pre_cruise_hotels
  FOR SELECT USING (true);

CREATE POLICY "pre_cruise_hotels_insert_admin" ON pre_cruise_hotels
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "pre_cruise_hotels_update_admin" ON pre_cruise_hotels
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "pre_cruise_hotels_delete_admin" ON pre_cruise_hotels
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE INDEX idx_pre_cruise_hotels_port_id ON pre_cruise_hotels(port_id);

-- ============================================================================
-- Transfer Options Table
-- ============================================================================

CREATE TABLE transfer_options (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  port_id uuid NOT NULL REFERENCES ports(id) ON DELETE CASCADE,
  type text NOT NULL,
  cost_estimate_min numeric,
  cost_estimate_max numeric,
  travel_time_minutes int,
  pros jsonb,
  cons jsonb,
  best_for text,
  editorial_take text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE transfer_options ENABLE ROW LEVEL SECURITY;

CREATE POLICY "transfer_options_select_public" ON transfer_options
  FOR SELECT USING (true);

CREATE POLICY "transfer_options_insert_admin" ON transfer_options
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "transfer_options_update_admin" ON transfer_options
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "transfer_options_delete_admin" ON transfer_options
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE INDEX idx_transfer_options_port_id ON transfer_options(port_id);

-- ============================================================================
-- Subscribers Table
-- ============================================================================

CREATE TABLE subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  preferences jsonb DEFAULT '{}',
  confirmed boolean DEFAULT false,
  unsubscribe_token text UNIQUE DEFAULT gen_random_uuid()::text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "subscribers_insert_authenticated" ON subscribers
  FOR INSERT WITH CHECK (auth.role() = 'authenticated')
  TO authenticated;

CREATE POLICY "subscribers_select_own" ON subscribers
  FOR SELECT USING (auth.uid()::text = email OR EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ))
  TO authenticated;

CREATE POLICY "subscribers_update_admin" ON subscribers
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "subscribers_delete_admin" ON subscribers
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================================================
-- Ad Slots Table
-- ============================================================================

CREATE TABLE ad_slots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location text NOT NULL,
  size text,
  status text DEFAULT 'placeholder' CHECK (status IN ('placeholder', 'active', 'inactive')),
  advertiser_name text,
  custom_html text,
  start_date date,
  end_date date,
  impressions_tracked int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE ad_slots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ad_slots_select_public" ON ad_slots
  FOR SELECT USING (true);

CREATE POLICY "ad_slots_insert_admin" ON ad_slots
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "ad_slots_update_admin" ON ad_slots
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "ad_slots_delete_admin" ON ad_slots
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================================================
-- Updated At Trigger Function
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all tables
CREATE TRIGGER update_ships_updated_at BEFORE UPDATE ON ships
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ports_updated_at BEFORE UPDATE ON ports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sailings_updated_at BEFORE UPDATE ON sailings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_price_snapshots_updated_at BEFORE UPDATE ON price_snapshots
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_staterooms_updated_at BEFORE UPDATE ON staterooms
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pre_cruise_hotels_updated_at BEFORE UPDATE ON pre_cruise_hotels
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transfer_options_updated_at BEFORE UPDATE ON transfer_options
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscribers_updated_at BEFORE UPDATE ON subscribers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ad_slots_updated_at BEFORE UPDATE ON ad_slots
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
