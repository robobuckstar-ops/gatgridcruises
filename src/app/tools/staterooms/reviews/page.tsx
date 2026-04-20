'use client'

import { useState, useEffect } from 'react'
import { Star, MessageSquare, ThumbsUp } from 'lucide-react'

interface Review {
  id: string
  shipId: string
  shipName: string
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

const SAMPLE_REVIEWS: Review[] = [
  {
    id: 'review-001',
    shipId: 'ship-0005',
    shipName: 'Disney Wish',
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
    shipName: 'Disney Dream',
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
    shipName: 'Disney Wish',
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
    shipName: 'Disney Magic',
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
    shipName: 'Disney Fantasy',
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

const SHIPS = [
  { id: 'ship-0001', name: 'Disney Magic' },
  { id: 'ship-0002', name: 'Disney Wonder' },
  { id: 'ship-0003', name: 'Disney Dream' },
  { id: 'ship-0004', name: 'Disney Fantasy' },
  { id: 'ship-0005', name: 'Disney Wish' },
]

const CATEGORIES = ['Inside', 'Oceanview', 'Verandah', 'Concierge', 'Suites']

interface FormData {
  shipId: string
  roomNumber: string
  category: string
  rating: number
  title: string
  body: string
  sailDate: string
  reviewerName: string
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(SAMPLE_REVIEWS)
  const [filteredReviews, setFilteredReviews] = useState<Review[]>(SAMPLE_REVIEWS)
  const [showForm, setShowForm] = useState(false)
  const [filterShip, setFilterShip] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [formData, setFormData] = useState<FormData>({
    shipId: '',
    roomNumber: '',
    category: '',
    rating: 0,
    title: '',
    body: '',
    sailDate: '',
    reviewerName: '',
  })

  useEffect(() => {
    let filtered = reviews
    if (filterShip) {
      filtered = filtered.filter((r) => r.shipId === filterShip)
    }
    if (filterCategory) {
      filtered = filtered.filter((r) => r.category === filterCategory)
    }
    setFilteredReviews(filtered.sort((a, b) => b.helpful - a.helpful))
  }, [reviews, filterShip, filterCategory])

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const selectedShip = SHIPS.find((s) => s.id === formData.shipId)
    const newReview: Review = {
      id: `review-${Date.now()}`,
      shipId: formData.shipId,
      shipName: selectedShip?.name || '',
      roomNumber: formData.roomNumber,
      category: formData.category,
      rating: formData.rating,
      title: formData.title,
      body: formData.body,
      sailDate: formData.sailDate,
      reviewerName: formData.reviewerName || 'Anonymous',
      createdAt: new Date().toISOString(),
      helpful: 0,
    }
    setReviews([newReview, ...reviews])
    setShowForm(false)
    setFormData({
      shipId: '',
      roomNumber: '',
      category: '',
      rating: 0,
      title: '',
      body: '',
      sailDate: '',
      reviewerName: '',
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Stateroom Reviews</h1>
          <p className="text-slate-600 mb-8">
            Real experiences from real cruisers
          </p>

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            {showForm ? 'Cancel' : 'Write a Review'}
          </button>
        </div>

        {/* Review Form */}
        {showForm && (
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-8 mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Share Your Experience</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Ship
                  </label>
                  <select
                    name="shipId"
                    value={formData.shipId}
                    onChange={handleFormChange}
                    required
                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="">Select a ship</option>
                    {SHIPS.map((ship) => (
                      <option key={ship.id} value={ship.id}>
                        {ship.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Room Number
                  </label>
                  <input
                    type="text"
                    name="roomNumber"
                    value={formData.roomNumber}
                    onChange={handleFormChange}
                    placeholder="e.g., 7104"
                    required
                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    required
                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, rating: star }))
                        }
                        className={`text-2xl transition-colors ${
                          formData.rating >= star
                            ? 'text-amber-500'
                            : 'text-gray-300 hover:text-gray-400'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Review Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    placeholder="Brief summary of your experience"
                    required
                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Review
                  </label>
                  <textarea
                    name="body"
                    value={formData.body}
                    onChange={handleFormChange}
                    placeholder="Share details about the stateroom, location, view, noise level, amenities, etc."
                    required
                    rows={5}
                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Sail Date
                  </label>
                  <input
                    type="date"
                    name="sailDate"
                    value={formData.sailDate}
                    onChange={handleFormChange}
                    required
                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Your Name (optional)
                  </label>
                  <input
                    type="text"
                    name="reviewerName"
                    value={formData.reviewerName}
                    onChange={handleFormChange}
                    placeholder="Display name"
                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Submit Review
              </button>
            </form>
          </div>
        )}

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Filter by Ship
            </label>
            <select
              value={filterShip}
              onChange={(e) => setFilterShip(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">All Ships</option>
              {SHIPS.map((ship) => (
                <option key={ship.id} value={ship.id}>
                  {ship.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Filter by Category
            </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.length === 0 ? (
            <div className="bg-slate-50 rounded-lg border border-slate-200 p-12 text-center">
              <MessageSquare className="h-16 w-16 text-slate-400 mx-auto mb-6 opacity-30" />
              <h2 className="text-2xl font-semibold text-slate-900 mb-2">
                No reviews found
              </h2>
              <p className="text-slate-600">
                Try adjusting your filters or be the first to review this
                stateroom type.
              </p>
            </div>
          ) : (
            filteredReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-blue-600">
                        {review.shipName}
                      </span>
                      <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                        Room {review.roomNumber}
                      </span>
                      <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                        {review.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      {review.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <span>By {review.reviewerName}</span>
                      <span>
                        {new Date(review.sailDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= review.rating
                            ? 'fill-amber-500 text-amber-500'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-slate-700 mb-4 leading-relaxed">
                  {review.body}
                </p>

                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                    <ThumbsUp className="h-4 w-4" />
                    Helpful ({review.helpful})
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
