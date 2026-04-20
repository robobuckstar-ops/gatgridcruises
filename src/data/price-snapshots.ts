import type { PriceSnapshot } from '@/types/database'

// Helper function to generate price curves with various patterns
function generatePriceSnapshots(sailingId: string, sailingNum: number, basePrice: number): PriceSnapshot[] {
  const snapshots: PriceSnapshot[] = []
  const startDate = new Date('2026-02-15')
  const endDate = new Date('2026-04-01')

  // Define different price patterns for variety
  let dayNum = 1
  let currentDate = new Date(startDate)

  while (currentDate <= endDate) {
    const daysFromStart = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    const progress = daysFromStart / totalDays

    // Create different price patterns based on sailing number
    let priceMultiplier = 1.0

    if (sailingNum % 5 === 1) {
      // Steady decline pattern (good deal getting better)
      priceMultiplier = 1.2 - progress * 0.25
    } else if (sailingNum % 5 === 2) {
      // Gradual increase then sudden drop
      if (progress < 0.8) {
        priceMultiplier = 1.0 + progress * 0.3
      } else {
        priceMultiplier = 0.85
      }
    } else if (sailingNum % 5 === 3) {
      // Fluctuating pattern
      const wave = Math.sin(progress * Math.PI * 4) * 0.15
      priceMultiplier = 1.05 + wave
    } else if (sailingNum % 5 === 4) {
      // Steady with recent sharp drop
      if (progress < 0.85) {
        priceMultiplier = 1.1
      } else {
        priceMultiplier = 0.9 - (progress - 0.85) * 0.5
      }
    } else {
      // Stable then gradual increase
      if (progress < 0.6) {
        priceMultiplier = 1.0
      } else {
        priceMultiplier = 1.0 + (progress - 0.6) * 0.35
      }
    }

    // Add some random noise for realism
    const noise = 0.98 + Math.random() * 0.04
    priceMultiplier *= noise

    // Ensure prices don't go below base or too high
    priceMultiplier = Math.max(0.75, Math.min(1.35, priceMultiplier))

    const lowestPrice = Math.round(basePrice * priceMultiplier)
    const insidePrice = lowestPrice
    const oceanviewPrice = Math.round(insidePrice * 1.2)
    const verandahPrice = Math.round(insidePrice * 1.5)
    const conciergePrice = Math.round(insidePrice * 2.2)

    const dateStr = currentDate.toISOString().split('T')[0]

    snapshots.push({
      id: `snap-${String(sailingNum).padStart(4, '0')}-${String(dayNum).padStart(3, '0')}`,
      sailing_id: sailingId,
      snapshot_date: dateStr,
      inside_price: insidePrice,
      oceanview_price: oceanviewPrice,
      verandah_price: verandahPrice,
      concierge_price: conciergePrice,
      lowest_price: lowestPrice,
      source: 'synthesized',
      created_at: '2026-01-15T00:00:00Z'
    })

    currentDate.setDate(currentDate.getDate() + 1)
    dayNum++
  }

  return snapshots
}

// Generate snapshots for all 18 sailings
const allSnapshots: PriceSnapshot[] = []

const sailingsData = [
  { id: 'sailing-0001', num: 1, basePrice: 4288 },
  { id: 'sailing-0002', num: 2, basePrice: 3196 },
  { id: 'sailing-0003', num: 3, basePrice: 3456 },
  { id: 'sailing-0004', num: 4, basePrice: 4120 },
  { id: 'sailing-0005', num: 5, basePrice: 6384 },
  { id: 'sailing-0006', num: 6, basePrice: 5880 },
  { id: 'sailing-0007', num: 7, basePrice: 7196 },
  { id: 'sailing-0008', num: 8, basePrice: 4856 },
  { id: 'sailing-0009', num: 9, basePrice: 4760 },
  { id: 'sailing-0010', num: 10, basePrice: 3920 },
  { id: 'sailing-0011', num: 11, basePrice: 6944 },
  { id: 'sailing-0012', num: 12, basePrice: 4200 },
  { id: 'sailing-0013', num: 13, basePrice: 4544 },
  { id: 'sailing-0014', num: 14, basePrice: 6720 },
  { id: 'sailing-0015', num: 15, basePrice: 2856 },
  { id: 'sailing-0016', num: 16, basePrice: 7840 },
  { id: 'sailing-0017', num: 17, basePrice: 3680 },
  { id: 'sailing-0018', num: 18, basePrice: 4480 }
]

for (const sailing of sailingsData) {
  const snapshots = generatePriceSnapshots(sailing.id, sailing.num, sailing.basePrice)
  allSnapshots.push(...snapshots)
}

export const priceSnapshots: PriceSnapshot[] = allSnapshots
