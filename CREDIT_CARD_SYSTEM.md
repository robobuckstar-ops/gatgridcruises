# Credit Card Referral System

A modular, editorial credit card recommendation system for GatGrid Cruises. Designed to feel helpful and informative rather than salesy.

## Overview

The system includes:
- **Configuration database** (`src/lib/credit-card-config.ts`): 8 pre-configured credit cards with all key details
- **Credit Card Recommendation Component**: Beautiful card display with full details
- **Comparison Table**: Side-by-side comparison with highlighting
- **Travel Hack Tip Box**: Quick tips with optional card recommendation
- **Affiliate Disclosure**: Transparent disclosure for referral links
- **Example Page**: Full travel hacks guide showing all components in action

## Quick Start

### 1. Updating Referral URLs

In `src/lib/credit-card-config.ts`, update the `referralUrl` for each card:

```typescript
{
  id: 'chase-sapphire-preferred',
  name: 'Chase Sapphire Preferred',
  // ... other fields
  referralUrl: 'https://your-affiliate-domain/link/chase-sapphire-preferred',
}
```

All cards currently point to placeholder URLs (`https://gatgridcruises.com/go/cards/{slug}`).

### 2. Using the Components

#### Full Card Recommendation

```tsx
import { CreditCardRecommendation } from '@/components/ui/credit-card-recommendation'
import { creditCards } from '@/lib/credit-card-config'

export default function MyPage() {
  const card = creditCards.find(c => c.id === 'chase-sapphire-preferred')
  
  return (
    <CreditCardRecommendation 
      card={card}
      showEditorialTake={true}  // Shows 2-3 sentence review
      compact={false}            // Full layout
    />
  )
}
```

#### Compact Card (Sidebar, Tips)

```tsx
<CreditCardRecommendation 
  card={card}
  compact={true}  // Single row with icon + name + bonus + CTA
/>
```

#### Comparison Table

```tsx
import { CardComparisonTable } from '@/components/ui/card-comparison-table'

export default function MyPage() {
  return (
    <CardComparisonTable 
      cardIds={[
        'chase-sapphire-preferred',
        'chase-sapphire-reserve',
        'amex-gold',
        'capital-one-venture-x'
      ]}
    />
  )
}
```

#### Travel Hack Tip Box

```tsx
import { TravelHackTip } from '@/components/ui/travel-hack-tip'

export default function MyPage() {
  return (
    <TravelHackTip 
      tip="The signup bonus alone can cover your cruise's taxes and fees."
      cardSlug="chase-sapphire-preferred"  // Optional
    />
  )
}
```

#### Affiliate Disclosure

Add to any page with referral links:

```tsx
import { AffiliateDisclosure } from '@/components/ui/affiliate-disclosure'

export default function MyPage() {
  return (
    <div>
      {/* Your content */}
      <AffiliateDisclosure />
    </div>
  )
}
```

## Configuration API

### getCardBySlug(slug: string)

```typescript
import { getCardBySlug } from '@/lib/credit-card-config'

const card = getCardBySlug('chase-sapphire-preferred')
```

### getCardsByIssuer(issuer: string)

```typescript
import { getCardsByIssuer } from '@/lib/credit-card-config'

const chaseCards = getCardsByIssuer('chase')
const amexCards = getCardsByIssuer('amex')
```

Supported issuers: `chase`, `amex`, `capital-one`, `citi`, `bank-of-america`, `other`

### getBestCardsFor(category: string)

```typescript
import { getBestCardsFor } from '@/lib/credit-card-config'

// Get top 3 cards by signup bonus value
const bestBonuses = getBestCardsFor('signup-bonus')

// Get cards with lounge access
const loungeCards = getBestCardsFor('lounge-access')

// Get best for cruise purchases (value per dollar adjusted by fee)
const cruiseCards = getBestCardsFor('cruise-purchases')

// Get best for flights (3x+ earning or lounge)
const flightCards = getBestCardsFor('flights')

// All cards have travel insurance
const insuranceCards = getBestCardsFor('travel-insurance')
```

## Card Data Structure

Each card includes:

```typescript
interface CreditCard {
  id: string                          // unique identifier
  name: string                        // "Chase Sapphire Preferred"
  issuer: string                      // chase, amex, capital-one, etc
  slug: string                        // chase-sapphire-preferred
  annualFee: number                   // e.g., 95
  signupBonus: string                 // "60,000 points"
  signupBonusValue: number            // ~$750 (estimated USD value)
  signupBonusRequirement: string      // "Spend $4,000 in first 3 months"
  pointsPerDollarTravel: number       // 2, 3, etc
  pointsPerDollarDining: number       // 3, 4, etc
  pointsPerDollarOther: number        // 1, etc
  tripCancellation: boolean           // true/false
  tripDelay: boolean                  // true/false
  baggageDelay: boolean               // true/false
  travelAccident: boolean             // true/false
  loungeAccess: string | null         // "Priority Pass", "Centurion Lounges", null
  bestFor: string                     // marketing tagline
  highlights: string[]                // 3-5 key benefits
  referralUrl: string                 // YOUR affiliate link
  imageColor: string                  // CSS color hex for card visual
  editorial_take: string              // 2-3 sentence honest review
}
```

## Design Details

### Colors

All components use the GatGrid design system:
- **Primary action**: Blue (#2563EB, `blue-600`)
- **Success/highlights**: Emerald (#10B981, `emerald-600`)
- **Badges**: Issuer-specific (Chase blue, Amex indigo, etc.)
- **Card visuals**: Custom `imageColor` per card (e.g., Chase navy `#1a1f71`)

### Typography

- **Headings**: Fraunces (serif, premium feel)
- **Body**: Inter (clean, modern)
- **Emphasis**: Bold weight or color shifts (not all-caps unless needed)

### Responsive

All components are fully responsive:
- **Card Recommendation**: Stacks vertical on mobile, horizontal on desktop
- **Comparison Table**: Horizontal scroll on mobile, full width on desktop
- **Tip Box**: Full width, single column throughout
- **Disclosure**: Center-aligned, max-width for readability

## Styling Conventions

### Light theme gradient
```css
bg-gradient-to-b from-blue-50 to-indigo-50
```

### Card styling
```css
border border-slate-200 rounded-xl hover:shadow-lg transition-all duration-200
```

### Badge styling
```css
px-2.5 py-1 rounded-full text-xs font-semibold
```

## Adding New Cards

To add a new card:

1. Add to `creditCards` array in `src/lib/credit-card-config.ts`
2. Fill in all required fields
3. Set `referralUrl` to your affiliate link
4. Choose an `imageColor` that matches the card's branding
5. Write a 2-3 sentence `editorial_take` (honest, helpful tone)

Example:

```typescript
{
  id: 'new-card-id',
  name: 'New Card Name',
  issuer: 'chase',
  slug: 'new-card-slug',
  annualFee: 95,
  signupBonus: '60,000 points',
  signupBonusValue: 600,
  signupBonusRequirement: 'Spend $4,000 in first 3 months',
  pointsPerDollarTravel: 2,
  pointsPerDollarDining: 3,
  pointsPerDollarOther: 1,
  tripCancellation: true,
  tripDelay: true,
  baggageDelay: true,
  travelAccident: true,
  loungeAccess: 'Priority Pass',
  bestFor: 'Travel-focused cruisers',
  highlights: [
    'Benefit 1',
    'Benefit 2',
    'Benefit 3',
  ],
  referralUrl: 'https://your-domain.com/go/new-card-slug',
  imageColor: '#2563EB',
  editorial_take: 'Honest 2-3 sentence review explaining why this card is valuable for cruisers.',
}
```

## Example Page

A fully built example page demonstrating all components is available at:

**URL**: `/guides/travel-hacks-credit-cards`

**File**: `src/app/guides/travel-hacks-credit-cards/page.tsx`

This page includes:
- Hero section with overview
- Quick tips section (3x TravelHackTip components)
- Individual card recommendations (full and compact)
- Comparison table with 5 cards
- FAQ section
- Travel insurance deep-dive
- Earning strategy guide
- CTA sections

Use this as a template for creating additional credit card content.

## Tone & Philosophy

**GatGrid is an editorial guide, not a booking platform.** Credit cards are recommended because they're genuinely useful for cruisers, not because we make commission. 

Key principles:
- **Honest**: Acknowledge tradeoffs (high fees, high minimum spend)
- **Helpful**: Explain benefits in context (lounge access prevents airport hassles)
- **No BS**: No over-the-top language, hype, or artificial urgency
- **Edited**: All editorial copy is carefully written and reviewed

## Updating the Database

Cards change frequently (new bonuses, fee increases, benefits added/removed). To update:

1. Update `creditCards` array in `src/lib/credit-card-config.ts`
2. Adjust numeric values (fees, bonuses, earning rates)
3. Update `editorial_take` if major changes occurred
4. Update `highlights` if benefits changed
5. Test component displays on the example page or locally

## File Locations

- **Config**: `src/lib/credit-card-config.ts`
- **Components**:
  - `src/components/ui/credit-card-recommendation.tsx`
  - `src/components/ui/card-comparison-table.tsx`
  - `src/components/ui/travel-hack-tip.tsx`
  - `src/components/ui/affiliate-disclosure.tsx`
- **Example Page**: `src/app/guides/travel-hacks-credit-cards/page.tsx`

## Next Steps

1. Update referral URLs in config
2. Create additional content pages using the components
3. Add internal links from relevant guides (e.g., "Best Time to Book", "Cost Guide")
4. Consider email integration: cards that earn points on booking flights to ports
5. Monitor card changes and update config quarterly
