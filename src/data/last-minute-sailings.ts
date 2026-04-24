import type { Sailing } from '@/types/database'

// Last-minute deals: departing within 90 days of April 20, 2026
// All prices verified via gangwaze.com April 2026
// current_lowest_price = inside cabin per-person rate × 2 (standard double occupancy)

export const lastMinuteSailings: Sailing[] = [
  {
    id: 'sailing-lm-006',
    ship_id: 'ship-0005',
    departure_port_id: 'port-0001',
    sail_date: '2026-06-20',
    length_nights: 4,
    itinerary_name: '4-Night Bahamas from Port Canaveral',
    current_lowest_price: 2430,
    current_inside_price: 2430,
    current_oceanview_price: 3248,
    current_verandah_price: 4590,
    current_concierge_price: 7560,
    sailing_score: 74,
    is_featured: false,
    region: 'bahamas',
    deal_score: 74,
    deal_recommendation: 'fair',
    deal_label: 'Disney Premium',
    itinerary_details: [
      { day: 1, port: 'Port Canaveral, FL', description: 'Embarkation', departure: '3:00 PM' },
      { day: 2, port: 'Nassau, Bahamas', description: 'Atlantis & local culture', arrival: '8:00 AM', departure: '5:30 PM' },
      { day: 3, port: 'Castaway Cay', description: "Disney's private island", arrival: '8:30 AM', departure: '4:30 PM' },
      { day: 4, port: 'At Sea', description: 'Marvel & Star Wars experiences' },
      { day: 5, port: 'Port Canaveral, FL', description: 'Disembarkation', arrival: '7:30 AM' },
    ],
    created_at: '2026-04-20T00:00:00Z',
    updated_at: '2026-04-20T00:00:00Z',
    notes: 'Price: $1,215/pp inside verified gangwaze.com / disneycruiselineblog.com April 2026. Disney Wish 4-night Bahamas.',
    disney_booking_url: null,
  },
]
