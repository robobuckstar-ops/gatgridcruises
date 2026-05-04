import { ships } from '@/data/ships'
import { ports } from '@/data/ports'
import { sailings } from '@/data/sailings'
import { lastMinuteSailings } from '@/data/last-minute-sailings'
import { priceSnapshots } from '@/data/price-snapshots'
import { staterooms } from '@/data/staterooms'
import {
  stateroomCategories,
  stateroomComparisonFeatures,
  stateroomDecisionGuide,
} from '@/data/stateroom-categories'
import { hotels } from '@/data/hotels'
import { transfers } from '@/data/transfers'
import { sailTogetherGroups } from '@/data/sail-together-groups'
import { blogPosts } from '@/data/blog-posts'
import type { Ship, Port, Sailing, PriceSnapshot, Stateroom, PreCruiseHotel, TransferOption } from '@/types/database'
import type {
  StateroomCategory,
  StateroomCategoryId,
  StateroomComparisonFeature,
  StateroomDecisionRule,
} from '@/data/stateroom-categories'
import type { SailTogetherGroup } from '@/data/sail-together-groups'
import type { BlogPost } from '@/data/blog-posts'

export interface SailTogetherGroupWithSailing extends SailTogetherGroup {
  sailing: Sailing
}

// Ships
export function getShips(): Ship[] {
  return ships
}

export function getShipBySlug(slug: string): Ship | undefined {
  return ships.find(s => s.slug === slug)
}

export function getShipById(id: string): Ship | undefined {
  return ships.find(s => s.id === id)
}

// Ports
export function getPorts(): Port[] {
  return ports
}

export function getPortBySlug(slug: string): Port | undefined {
  return ports.find(p => p.slug === slug)
}

export function getPortById(id: string): Port | undefined {
  return ports.find(p => p.id === id)
}

// Disney Cruise Line ship IDs — only these ships should ever appear on the site
const DISNEY_SHIP_IDS = new Set([
  'ship-0001', // Disney Magic
  'ship-0002', // Disney Wonder
  'ship-0003', // Disney Dream
  'ship-0004', // Disney Fantasy
  'ship-0005', // Disney Wish
  'ship-0006', // Disney Treasure
  'ship-0007', // Disney Destiny
  'ship-0008', // Disney Adventure
])

function isDisneySailing(s: { ship_id: string }): boolean {
  return DISNEY_SHIP_IDS.has(s.ship_id)
}

// Sailings
export function getSailings(): Sailing[] {
  return sailings.filter(isDisneySailing).map(s => ({
    ...s,
    ship: getShipById(s.ship_id),
    departure_port: getPortById(s.departure_port_id),
  }))
}

export function getSailingById(id: string): Sailing | undefined {
  const s = sailings.find(s => s.id === id)
  if (!s || !isDisneySailing(s)) return undefined
  return {
    ...s,
    ship: getShipById(s.ship_id),
    departure_port: getPortById(s.departure_port_id),
    price_snapshots: getSnapshotsForSailing(s.id),
  }
}

export function getFeaturedSailings(): Sailing[] {
  return getSailings().filter(s => s.is_featured).slice(0, 12)
}

export interface FeaturedDealResult {
  sailing: Sailing
  historicalAvgPrice: number | null
  savingsAmount: number | null
  savingsPct: number | null
}

export function getFeaturedDeal(): FeaturedDealResult | null {
  const allSailings = getSailings()
  if (allSailings.length === 0) return null

  const sorted = [...allSailings].sort((a, b) => (b.sailing_score ?? 0) - (a.sailing_score ?? 0))
  const best = sorted[0]

  const snapshots = getSnapshotsForSailing(best.id)
  let historicalAvgPrice: number | null = null
  let savingsAmount: number | null = null
  let savingsPct: number | null = null

  if (snapshots.length >= 2) {
    const avg = snapshots.reduce((sum, s) => sum + s.lowest_price, 0) / snapshots.length
    if (avg > best.current_lowest_price * 1.05) {
      historicalAvgPrice = Math.round(avg)
      savingsAmount = Math.round(avg - best.current_lowest_price)
      savingsPct = Math.round(((avg - best.current_lowest_price) / avg) * 100)
    }
  }

  return {
    sailing: { ...best, price_snapshots: snapshots },
    historicalAvgPrice,
    savingsAmount,
    savingsPct,
  }
}

export function getBiggestPriceDrops(): Sailing[] {
  const allSailings = getSailings()
  return allSailings
    .map(s => {
      const snapshots = getSnapshotsForSailing(s.id)
      if (snapshots.length < 2) return { ...s, drop: 0 }
      const avg = snapshots.reduce((sum, sn) => sum + sn.lowest_price, 0) / snapshots.length
      const drop = ((avg - s.current_lowest_price) / avg) * 100
      return { ...s, drop }
    })
    .filter(s => s.drop > 0)
    .sort((a, b) => b.drop - a.drop)
    .slice(0, 6)
}

export function getLastMinuteDeals(): Sailing[] {
  const now = new Date()
  const ninetyDaysFromNow = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000)

  // Combine last-minute sailings with regular sailings, filtering to Disney only
  const allSailings = [
    ...lastMinuteSailings,
    ...sailings
  ].filter(isDisneySailing)

  // Filter for sailings departing within 90 days
  const dealsWithin90 = allSailings.filter(s => {
    const sailDate = new Date(s.sail_date)
    return sailDate >= now && sailDate <= ninetyDaysFromNow
  })

  // Join ship and port data
  const enrichedDeals = dealsWithin90.map(s => ({
    ...s,
    ship: getShipById(s.ship_id),
    departure_port: getPortById(s.departure_port_id),
  }))

  // Sort by departure date (soonest first)
  return enrichedDeals.sort((a, b) => a.sail_date.localeCompare(b.sail_date))
}

// Price Snapshots
export function getSnapshotsForSailing(sailingId: string): PriceSnapshot[] {
  return priceSnapshots
    .filter(p => p.sailing_id === sailingId)
    .sort((a, b) => a.snapshot_date.localeCompare(b.snapshot_date))
}

// Staterooms
export function getStaterooms(): Stateroom[] {
  return staterooms
}

export function getStateroomsForShip(shipId: string): Stateroom[] {
  return staterooms.filter(s => s.ship_id === shipId)
}

// Stateroom Categories (Inside / Oceanview / Verandah / Concierge — category-level profiles)
export function getStateroomCategories(): StateroomCategory[] {
  return stateroomCategories
}

export function getStateroomCategoryById(id: StateroomCategoryId): StateroomCategory | undefined {
  return stateroomCategories.find(c => c.id === id)
}

export function getStateroomComparisonFeatures(): StateroomComparisonFeature[] {
  return stateroomComparisonFeatures
}

export function getStateroomDecisionGuide(): StateroomDecisionRule[] {
  return stateroomDecisionGuide
}

// Hotels
export function getHotelsForPort(portId: string): PreCruiseHotel[] {
  return hotels.filter(h => h.port_id === portId)
}

// Transfers
export function getTransfersForPort(portId: string): TransferOption[] {
  return transfers.filter(t => t.port_id === portId)
}

// Sail Together Community Groups
export function getSailTogetherGroups(): SailTogetherGroupWithSailing[] {
  return sailTogetherGroups
    .map(group => {
      const sailing = getSailingById(group.sailing_id)
      if (!sailing) return null
      return {
        ...group,
        sailing,
      }
    })
    .filter((g): g is SailTogetherGroupWithSailing => g !== null)
    .sort((a, b) => a.sailing.sail_date.localeCompare(b.sailing.sail_date))
}

export function getSailTogetherGroupBySailingId(sailingId: string): SailTogetherGroupWithSailing | undefined {
  const group = sailTogetherGroups.find(g => g.sailing_id === sailingId)
  if (!group) return undefined
  const sailing = getSailingById(sailingId)
  if (!sailing) return undefined
  return {
    ...group,
    sailing,
  }
}

export function getSailTogetherGroupsByShip(shipId: string): SailTogetherGroupWithSailing[] {
  return getSailTogetherGroups().filter(g => g.sailing.ship_id === shipId)
}

export function getSailTogetherGroupsByMonth(month: number, year: number): SailTogetherGroupWithSailing[] {
  return getSailTogetherGroups().filter(g => {
    const sailDate = new Date(g.sailing.sail_date)
    return sailDate.getMonth() === month && sailDate.getFullYear() === year
  })
}

// Blog Posts
export function getBlogPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime())
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug)
}

export function getRelatedPosts(postId: string, category: string, limit: number = 3): BlogPost[] {
  return blogPosts
    .filter(post => post.id !== postId && post.category === category)
    .sort((a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime())
    .slice(0, limit)
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts
    .filter(post => post.category === category)
    .sort((a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime())
}

export function getFeaturedBlogPost(): BlogPost | undefined {
  return getBlogPosts()[0]
}
