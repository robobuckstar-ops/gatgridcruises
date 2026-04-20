# Quick Start: New Features

## Using the Deal Score System

```typescript
import { calculateDealScore } from '@/lib/deal-score'
import type { Sailing } from '@/types/database'

// On any sailing with optional price snapshots
const result = calculateDealScore(sailing, sailing.price_snapshots)

// Get values
console.log(result.score)              // 0-100
console.log(result.recommendation)    // 'strong-buy' | 'buy' | 'fair' | 'wait' | 'overpriced'
console.log(result.label)              // "Exceptional Deal", etc.

// Breakdown details
console.log(result.breakdown.price_score)        // 0-100
console.log(result.breakdown.urgency_score)      // 0-100
console.log(result.breakdown.ship_score)         // 0-100
console.log(result.breakdown.itinerary_score)    // 0-100
console.log(result.breakdown.availability_score) // 0-100
console.log(result.breakdown.seasonal_score)     // 0-100
console.log(result.breakdown.final_score)        // Same as result.score
```

## Using Pricing Utilities

### Detailed Breakdown (for modals/detailed pages)
```typescript
import { calculateOutTheDoorPrice } from '@/lib/pricing'

const pricing = calculateOutTheDoorPrice(sailing, 'verandah', 2)

console.log(pricing.baseFare)  // Listed price
console.log(pricing.portFees)  // Port fees & taxes for all guests
console.log(pricing.gratuities) // Tips for all guests & nights
console.log(pricing.total)      // Final price per stateroom
console.log(pricing.perNight)   // Total divided by nights
console.log(pricing.perPerson)  // Total divided by guests
```

### Quick Card Display (default: 2 guests)
```typescript
import { getOutTheDoorTotal } from '@/lib/pricing'

const { total, perPerson } = getOutTheDoorTotal(
  sailing.current_lowest_price,
  sailing.length_nights,
  2,  // optional, defaults to 2
  sailing.region  // 'bahamas', 'caribbean', etc.
)

// Use perPerson in card display
console.log(`${formatPrice(perPerson)} per person (all-in)`)
```

### Helper Functions
```typescript
import {
  getPricePerNight,
  getPortFeesEstimate,
  formatOutTheDoorBreakdown
} from '@/lib/pricing'

// Quick per-night calculation
const perNight = getPricePerNight(4200, 7) // 600

// Show port fee range for region
const estimate = getPortFeesEstimate(sailing.region) // "~$125 per person"

// Get formatted breakdown array
const breakdown = formatOutTheDoorBreakdown(pricing, formatPrice)
// ["Base Fare: $4,200", "Port Fees & Taxes: $250", ...]
```

## Using Deal Score Badge Component

### Basic
```typescript
import { DealScoreBadge } from '@/components/ui/deal-score-badge'

<DealScoreBadge score={85} size="md" />
```

### With Label
```typescript
<DealScoreBadge score={85} label="★" size="md" />
```

### With Tooltip on Hover
```typescript
<DealScoreBadge
  score={85}
  label="★"
  size="md"
  showTooltip={true}
/>
```

### Sizes
```typescript
<DealScoreBadge score={92} size="sm" />  // 40px
<DealScoreBadge score={92} size="md" />  // 56px (default)
<DealScoreBadge score={92} size="lg" />  // 72px
```

### Color Behavior (Automatic)
- 80+: Green (emerald-500)
- 60-79: Blue (blue-500)
- 40-59: Amber (amber-500)
- Below 40: Red (red-500)

## Using Price Match Badge

```typescript
import { PriceMatchBadge } from '@/components/ui/price-match-badge'

// Small (card footer)
<PriceMatchBadge size="sm" showTooltip={true} />

// Medium (header area)
<PriceMatchBadge size="md" showTooltip={true} />
```

## Using Updated Sailing Card

The `SailingCard` component now handles everything:

```typescript
import { SailingCard } from '@/components/ui/sailing-card'

// Just pass the sailing
<SailingCard sailing={sailing} />

// Optional: pass price comparison
<SailingCard sailing={sailing} percentBelow={15} />
```

The card automatically:
1. Calculates deal score
2. Shows circular badge
3. Displays recommendation pill
4. Shows all-in pricing
5. Provides expandable breakdown
6. Includes price match badge

## Working with Regions

All sailings now have a `region` field. Use for:
- Port fee estimation
- Itinerary desirability scoring
- Seasonal adjustments

Valid regions: `'caribbean' | 'bahamas' | 'alaska' | 'pacific' | 'europe' | 'other'`

```typescript
const sailing = sailings[0]
console.log(sailing.region) // 'bahamas'

// Port fees automatically scale by region
const fees = getPortFeesEstimate(sailing.region)
```

## Type Safety

All new types available from `@/types/database`:

```typescript
import type {
  DealScoreBreakdown,
  OutTheDoorPrice,
} from '@/types/database'

// These are optional fields on Sailing
sailing.deal_score          // number
sailing.deal_recommendation // string (union type)
sailing.deal_label          // string
sailing.region              // string (union type)
```

## Common Patterns

### Display Card with All Features
```typescript
<SailingCard sailing={sailing} />
```

### Show Deal Score on Existing Card
```typescript
import { DealScoreBadge } from '@/components/ui/deal-score-badge'
import { calculateDealScore } from '@/lib/deal-score'

const score = calculateDealScore(sailing)

<div className="flex items-center justify-between">
  <h3>{sailing.itinerary_name}</h3>
  <DealScoreBadge score={score.score} size="md" />
</div>
```

### Show Pricing in List
```typescript
import { getOutTheDoorTotal, formatPrice } from '@/lib/pricing'

const { perPerson } = getOutTheDoorTotal(
  sailing.current_lowest_price,
  sailing.length_nights,
  2,
  sailing.region
)

<div>
  <p className="text-sm text-slate-600">Per Person, All-In</p>
  <p className="text-2xl font-bold">{formatPrice(perPerson)}</p>
</div>
```

### Show Detailed Pricing Modal
```typescript
import { calculateOutTheDoorPrice, formatOutTheDoorBreakdown } from '@/lib/pricing'
import { formatPrice } from '@/lib/utils'

const pricing = calculateOutTheDoorPrice(sailing, 'verandah', 2)
const breakdown = formatOutTheDoorBreakdown(pricing, formatPrice)

breakdown.forEach(line => console.log(line))
// Base Fare: $5,200
// Port Fees & Taxes: $250
// Gratuities: $406
// Total: $5,856
```

## No External Dependencies

All new code uses:
- Tailwind CSS (already in project)
- lucide-react icons (already in project)
- TypeScript
- React hooks (`useState` for expandable pricing)
- SVG (for circular badge)

No new npm packages required!

## Performance Notes

- Deal score calculation is fast (synchronous, <1ms)
- Pricing calculations are instant
- SVG gauge renders efficiently
- Badge animations use CSS transitions (GPU-accelerated)
- All components memoized where needed

## Testing

To test the implementations:

```typescript
// Test deal score across different sailings
sailings.forEach(sailing => {
  const result = calculateDealScore(sailing)
  console.log(`${sailing.id}: ${result.score} - ${result.recommendation}`)
})

// Test pricing
sailings.forEach(sailing => {
  const pricing = calculateOutTheDoorPrice(sailing, 'oceanview', 2)
  console.log(`${sailing.id}: $${pricing.total} total`)
})
```

## Colors & Styling

All components follow the established design system:
- Use Tailwind classes only
- Blue-600 primary color
- Gold (#D4AF37) accents
- Light backgrounds (blue-50, indigo-50)
- Slate text colors

No custom CSS files needed - all in Tailwind!
