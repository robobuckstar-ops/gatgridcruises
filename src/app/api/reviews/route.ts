import { NextRequest, NextResponse } from 'next/server'

export interface Review {
  id: string
  shipId: string
  roomNumber: string
  category: string
  rating: number
  title: string
  body: string
  sailDate: string
  reviewerName: string
  createdAt: string
  helpful: number
}

// In-memory store for MVP
const reviews: Review[] = [
  {
    id: 'review-001',
    shipId: 'ship-0005',
    roomNumber: '7104',
    category: 'Verandah',
    rating: 5,
    title: 'Perfect mid-ship verandah — quiet and spacious',
    body: 'We had room 7104 on the Wish for a 4-night Bahamian. Mid-ship on deck 7 is the sweet spot — zero rocking, close to everything, and our verandah had a completely unobstructed ocean view. The room was spotless and our stateroom host was incredible. Only downside: it was a short walk to the pools, but honestly that kept the hallway quieter.',
    sailDate: '2025-11-15',
    reviewerName: 'Sarah M.',
    createdAt: '2025-12-01T00:00:00Z',
    helpful: 24,
  },
  {
    id: 'review-002',
    shipId: 'ship-0003',
    roomNumber: '2516',
    category: 'Inside',
    rating: 4,
    title: 'Budget-friendly and perfectly fine',
    body: 'Deck 2 inside on the Dream. Yes, it is dark. Yes, it is small. But you spend 90% of your time outside the room anyway. The virtual porthole is a nice touch. We saved $1,500 vs. a verandah and spent that on excursions instead. Would do it again.',
    sailDate: '2025-09-20',
    reviewerName: 'Mike T.',
    createdAt: '2025-10-05T00:00:00Z',
    helpful: 18,
  },
  {
    id: 'review-003',
    shipId: 'ship-0005',
    roomNumber: '11008',
    category: 'Concierge',
    rating: 5,
    title: 'Worth every penny for a special occasion',
    body: 'Concierge on the Wish is another level. The lounge, the dedicated cast members, priority boarding, and the room itself are all top-notch. We did this for our anniversary and it made the trip unforgettable. Is it 3x the price of a verandah? Yes. Is it 3x better? For a special trip, honestly yes.',
    sailDate: '2026-01-10',
    reviewerName: 'Jennifer L.',
    createdAt: '2026-02-01T00:00:00Z',
    helpful: 31,
  },
  {
    id: 'review-004',
    shipId: 'ship-0001',
    roomNumber: '6134',
    category: 'Oceanview',
    rating: 3,
    title: 'Partially obstructed — manage expectations',
    body: 'Our oceanview on the Magic had a lifeboat partially blocking the view. Disney calls it "obstructed" but we were still surprised by how much was blocked. The room itself was fine — clean, comfortable, good size. But if you are paying for a view, check the deck plans carefully or just go verandah.',
    sailDate: '2025-08-05',
    reviewerName: 'Dave R.',
    createdAt: '2025-09-01T00:00:00Z',
    helpful: 42,
  },
  {
    id: 'review-005',
    shipId: 'ship-0004',
    roomNumber: '8042',
    category: 'Verandah',
    rating: 4,
    title: 'Aft verandah = massive balcony, but noisy',
    body: 'Aft verandahs on the Fantasy are HUGE — easily 3x a regular verandah. The curved wrap-around view is incredible, especially at sunset. However, it is directly above Cabanas and you can hear the pool deck noise. If you are light sleepers, go mid-ship. If you want the best balcony experience, this is it.',
    sailDate: '2025-10-12',
    reviewerName: 'Amanda K.',
    createdAt: '2025-11-15T00:00:00Z',
    helpful: 37,
  },
]

export async function GET() {
  return NextResponse.json({ reviews: reviews.sort((a, b) => b.helpful - a.helpful) })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const review: Review = {
      id: `review-${Date.now()}`,
      shipId: body.shipId,
      roomNumber: body.roomNumber,
      category: body.category,
      rating: body.rating,
      title: body.title,
      body: body.body,
      sailDate: body.sailDate,
      reviewerName: body.reviewerName || 'Anonymous',
      createdAt: new Date().toISOString(),
      helpful: 0,
    }
    reviews.push(review)
    return NextResponse.json({ success: true, review })
  } catch {
    return NextResponse.json({ error: 'Invalid review data' }, { status: 400 })
  }
}
