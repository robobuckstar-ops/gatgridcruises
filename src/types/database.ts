export interface Ship {
  id: string
  name: string
  slug: string
  cruise_line?: string
  year_launched: number
  capacity: number
  tonnage: number
  highlights: string[]
  whats_included: IncludedItem[]
  whats_extra: ExtraItem[]
  editorial_take: string
  hero_image_url: string
  created_at: string
  updated_at: string
}

export interface IncludedItem {
  category: string
  items: string[]
}

export interface ExtraItem {
  category: string
  items: { name: string; price_range: string }[]
}

export interface Port {
  id: string
  name: string
  slug: string
  city: string
  country: string
  code: string
  overview: string
  nearest_airports: { code: string; name: string; distance_miles: number }[]
  parking?: {
    name: string
    dailyRate: number
    reservationUrl?: string
    tips: string
  }[]
  drivingDirections?: string
  weatherByMonth?: { month: string, highF: number, lowF: number, rainyDays: number }[]
  terminalTips?: string[]
  preTripsActivities?: { name: string, description: string, distance?: string }[]
  created_at: string
  updated_at: string
}

export interface Sailing {
  id: string
  ship_id: string
  departure_port_id: string
  itinerary_name: string
  itinerary_details: ItineraryDay[]
  sail_date: string
  length_nights: number
  current_lowest_price: number
  current_inside_price: number | null
  current_oceanview_price: number | null
  current_verandah_price: number | null
  current_concierge_price: number | null
  sailing_score: number
  is_featured: boolean
  notes: string | null
  disney_booking_url: string | null
  created_at: string
  updated_at: string
  // Deal score fields
  deal_score?: number
  deal_recommendation?: 'strong-buy' | 'buy' | 'fair' | 'wait' | 'overpriced'
  deal_label?: string
  region?: 'caribbean' | 'bahamas' | 'alaska' | 'pacific' | 'europe' | 'other'
  // Joined fields
  ship?: Ship
  departure_port?: Port
  price_snapshots?: PriceSnapshot[]
}

export interface ItineraryDay {
  day: number
  port: string
  description: string
  arrival?: string
  departure?: string
}

export interface PriceSnapshot {
  id: string
  sailing_id: string
  snapshot_date: string
  inside_price: number | null
  oceanview_price: number | null
  verandah_price: number | null
  concierge_price: number | null
  lowest_price: number
  source: 'manual' | 'scrape' | 'synthesized'
  created_at: string
}

export interface Stateroom {
  id: string
  ship_id: string
  room_number: string
  category: 'Inside' | 'Oceanview' | 'Verandah' | 'Concierge'
  category_code: string
  deck: number
  position: 'forward' | 'mid' | 'aft'
  side: 'port' | 'starboard' | 'interior'
  noise_rating: number
  view_rating: number
  connecting_room: string | null
  accessible: boolean
  max_occupancy: number
  pros: string[]
  cons: string[]
  notes: string | null
  created_at: string
  updated_at: string
}

export interface PreCruiseHotel {
  id: string
  port_id: string
  name: string
  is_disney_partner: boolean
  price_range: string
  distance_to_port_miles: number
  shuttle_available: boolean
  shuttle_details: string | null
  pros: string[]
  cons: string[]
  editorial_take: string
  booking_affiliate_url: string
  image_url: string | null
  created_at: string
  updated_at: string
}

export interface TransferOption {
  id: string
  port_id: string
  type: 'disney_ground' | 'uber' | 'rental_car' | 'personal_car' | 'hotel_shuttle' | 'taxi'
  cost_estimate_min: number
  cost_estimate_max: number
  travel_time_minutes: number
  pros: string[]
  cons: string[]
  best_for: string
  editorial_take: string
  created_at: string
  updated_at: string
}

export interface Subscriber {
  id: string
  email: string
  preferences: {
    ships?: string[]
    ports?: string[]
    max_budget?: number
    frequency?: 'weekly' | 'daily'
  }
  confirmed: boolean
  unsubscribe_token: string
  created_at: string
}

export interface AdSlot {
  id: string
  location: string
  size: string
  status: 'placeholder' | 'adsense' | 'direct_sold'
  advertiser_name: string | null
  custom_html: string | null
  start_date: string | null
  end_date: string | null
  impressions_tracked: number
  created_at: string
  updated_at: string
}

// Sailing Score calculation
export interface SailingScoreBreakdown {
  price_score: number
  urgency_score: number
  ship_score: number
  final_score: number
}

// Deal Score calculation
export interface DealScoreBreakdown {
  price_score: number
  urgency_score: number
  ship_score: number
  itinerary_score: number
  availability_score: number
  seasonal_score: number
  final_score: number
}

export interface OutTheDoorPrice {
  baseFare: number
  portFees: number
  gratuities: number
  total: number
  perNight: number
  perPerson: number
  guests: number
}
