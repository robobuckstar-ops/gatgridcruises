import type { PriceSnapshot } from '@/types/database'

export interface PriceTrendData {
  percentVsAvg: number  // negative = below avg (good deal), positive = above avg (bad)
  trend: 'up' | 'down' | 'stable'
  dealRating: 'good' | 'average' | 'above-average'
  avgPrice: number
  minPrice: number
  maxPrice: number
}

export interface SailingWithTrend {
  id: string
  itinerary_name: string
  ship_name: string
  sail_date: string
  length_nights: number
  departure_port_name: string
  region: string
  current_lowest_price: number
  trend: PriceTrendData
  snapshot_count: number
  recent_prices: number[]  // last 14 snapshot prices for mini sparkline
}

export function calculatePriceTrend(snapshots: PriceSnapshot[], currentPrice: number): PriceTrendData {
  if (snapshots.length < 2) {
    return {
      percentVsAvg: 0,
      trend: 'stable',
      dealRating: 'average',
      avgPrice: currentPrice,
      minPrice: currentPrice,
      maxPrice: currentPrice,
    }
  }

  const prices = snapshots.map(s => s.lowest_price)
  const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)

  const percentVsAvg = Math.round(((currentPrice - avgPrice) / avgPrice) * 100)
  const trend: 'up' | 'down' | 'stable' =
    percentVsAvg < -2 ? 'down' : percentVsAvg > 2 ? 'up' : 'stable'
  const dealRating: 'good' | 'average' | 'above-average' =
    percentVsAvg <= -8 ? 'good' :
    percentVsAvg >= 8 ? 'above-average' :
    'average'

  return { percentVsAvg, trend, dealRating, avgPrice, minPrice, maxPrice }
}
