import type { PriceSnapshot } from '@/types/database'

// Deterministic seeded LCG random for reproducible price curves
function makeRand(seed: number): () => number {
  let s = seed >>> 0
  return () => {
    s = Math.imul(s, 1664525) + 1013904223 >>> 0
    return s / 0x100000000
  }
}

function generateSnapshots(
  sailingId: string,
  sailingIndex: number,
  insideBase: number,
): PriceSnapshot[] {
  const snapshots: PriceSnapshot[] = []
  const startDate = new Date('2025-10-01')
  const endDate = new Date('2026-04-20')
  const totalMs = endDate.getTime() - startDate.getTime()

  const rand = makeRand(sailingIndex * 31337)
  const pattern = sailingIndex % 5

  // Derived category prices using typical cruise-line ratios
  const oceanviewBase = Math.round(insideBase * 1.22 / 50) * 50
  const verandahBase = Math.round(insideBase * 1.52 / 50) * 50
  const conciergeBase = Math.round(insideBase * 2.18 / 50) * 50

  let current = new Date(startDate)
  let seq = 1

  while (current <= endDate) {
    const progress = (current.getTime() - startDate.getTime()) / totalMs

    // Five realistic price patterns, all converging to ~1.0 (current price) at progress=1
    let mult: number

    if (pattern === 0) {
      // Steady climb: starts 15% below, rises to current
      mult = 0.85 + progress * 0.15
    } else if (pattern === 1) {
      // Early-bird dip (promo), then steady rise
      if (progress < 0.2) {
        mult = 0.92 - progress * 0.2
      } else {
        mult = 0.88 + (progress - 0.2) * 0.15
      }
    } else if (pattern === 2) {
      // Starts elevated, sale at 40%, climbs to current
      if (progress < 0.4) {
        mult = 1.05 - progress * 0.25
      } else {
        mult = 0.95 + (progress - 0.4) * (0.05 / 0.6)
      }
    } else if (pattern === 3) {
      // Flat at 90% then sharp rise in the final third
      if (progress < 0.7) {
        mult = 0.90 + progress * 0.04
      } else {
        mult = 0.928 + (progress - 0.7) * 0.24
      }
    } else {
      // High open, mid-cruise-sale dip, then recovery rise
      if (progress < 0.15) {
        mult = 1.08 - progress * 0.6
      } else if (progress < 0.45) {
        mult = 0.99 - (progress - 0.15) * 0.1
      } else {
        mult = 0.96 + (progress - 0.45) * (0.04 / 0.55)
      }
    }

    // ±2% noise for natural price fluctuation
    mult = Math.max(0.75, Math.min(1.2, mult * (1 + (rand() - 0.5) * 0.04)))

    // Round to nearest $50 as real cruise prices are quoted
    const snap = (base: number) => Math.round((base * mult) / 50) * 50

    const insidePrice = snap(insideBase)
    const dateStr = current.toISOString().split('T')[0]

    snapshots.push({
      id: `snap-${sailingId}-${String(seq).padStart(3, '0')}`,
      sailing_id: sailingId,
      snapshot_date: dateStr,
      inside_price: insidePrice,
      oceanview_price: snap(oceanviewBase),
      verandah_price: snap(verandahBase),
      concierge_price: snap(conciergeBase),
      lowest_price: insidePrice,
      source: 'synthesized',
      created_at: dateStr + 'T00:00:00Z',
    })

    // Weekly snapshots give ~29 data points per sailing (Oct 1 → Apr 20)
    current.setDate(current.getDate() + 7)
    seq++
  }

  return snapshots
}

// All sailings with their current inside prices (total for 2 guests)
const sailingsData = [
  { id: 'sailing-dis-001', idx: 1,  insideBase: 2430  },
  { id: 'sailing-dis-002', idx: 2,  insideBase: 4088  },
  { id: 'sailing-dis-003', idx: 3,  insideBase: 4706  },
  { id: 'sailing-dis-004', idx: 4,  insideBase: 2446  },
  { id: 'sailing-dis-005', idx: 5,  insideBase: 3500  },
  { id: 'sailing-dis-006', idx: 6,  insideBase: 2900  },
  { id: 'sailing-dis-007', idx: 7,  insideBase: 2760  },
  { id: 'sailing-dis-008', idx: 8,  insideBase: 4400  },
  { id: 'sailing-rcl-001', idx: 9,  insideBase: 1282  },
  { id: 'sailing-rcl-002', idx: 10, insideBase: 1652  },
  { id: 'sailing-rcl-003', idx: 11, insideBase: 1856  },
  { id: 'sailing-rcl-004', idx: 12, insideBase: 3070  },
  { id: 'sailing-rcl-005', idx: 13, insideBase: 3226  },
  { id: 'sailing-rcl-006', idx: 14, insideBase: 3590  },
  { id: 'sailing-rcl-007', idx: 15, insideBase: 1386  },
  { id: 'sailing-ccl-001', idx: 16, insideBase: 808   },
  { id: 'sailing-ccl-002', idx: 17, insideBase: 1188  },
  { id: 'sailing-ccl-003', idx: 18, insideBase: 898   },
  { id: 'sailing-ncl-001', idx: 19, insideBase: 1098  },
  { id: 'sailing-ncl-002', idx: 20, insideBase: 2158  },
  { id: 'sailing-ncl-003', idx: 21, insideBase: 2258  },
  { id: 'sailing-ncl-004', idx: 22, insideBase: 1778  },
  { id: 'sailing-ncl-005', idx: 23, insideBase: 1138  },
  { id: 'sailing-msc-001', idx: 24, insideBase: 1396  },
  { id: 'sailing-msc-002', idx: 25, insideBase: 1390  },
  { id: 'sailing-msc-003', idx: 26, insideBase: 1694  },
  { id: 'sailing-msc-004', idx: 27, insideBase: 998   },
  { id: 'sailing-cel-001', idx: 28, insideBase: 2706  },
  { id: 'sailing-cel-002', idx: 29, insideBase: 1814  },
  { id: 'sailing-cel-003', idx: 30, insideBase: 1316  },
  { id: 'sailing-cel-004', idx: 31, insideBase: 2286  },
  { id: 'sailing-pri-001', idx: 32, insideBase: 1706  },
  { id: 'sailing-pri-002', idx: 33, insideBase: 1458  },
  { id: 'sailing-pri-003', idx: 34, insideBase: 1798  },
  { id: 'sailing-pri-004', idx: 35, insideBase: 1118  },
  { id: 'sailing-pri-005', idx: 36, insideBase: 998   },
  { id: 'sailing-hal-001', idx: 37, insideBase: 1408  },
  { id: 'sailing-hal-002', idx: 38, insideBase: 1358  },
  { id: 'sailing-hal-003', idx: 39, insideBase: 1244  },
  { id: 'sailing-hal-004', idx: 40, insideBase: 1942  },
  { id: 'sailing-hal-005', idx: 41, insideBase: 1398  },
]

const allSnapshots: PriceSnapshot[] = []
for (const s of sailingsData) {
  allSnapshots.push(...generateSnapshots(s.id, s.idx, s.insideBase))
}

export const priceSnapshots: PriceSnapshot[] = allSnapshots
