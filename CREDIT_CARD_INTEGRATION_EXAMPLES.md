# Credit Card System - Integration Examples

Quick copy-paste examples for integrating credit card components into your GatGrid pages.

## 1. Add a Quick Tip to an Existing Guide

```tsx
// In any guide page, e.g., src/app/guides/disney-cruise-cost-guide/page.tsx

import { TravelHackTip } from '@/components/ui/travel-hack-tip'

export default function CostGuidePage() {
  return (
    <div className="space-y-8">
      {/* Your existing guide content */}
      <h2>Pricing Breakdown</h2>
      <p>Here's what you actually pay...</p>

      {/* Add this travel hack tip */}
      <TravelHackTip
        tip="A credit card signup bonus of $750 can cover all your port fees, gratuities, and onboard spending. Apply strategically 3 months before your cruise."
        cardSlug="chase-sapphire-preferred"
      />

      {/* Continue with your content */}
    </div>
  )
}
```

## 2. Add a Full Card Recommendation to a Page

```tsx
import { CreditCardRecommendation } from '@/components/ui/credit-card-recommendation'
import { getCardBySlug } from '@/lib/credit-card-config'

export default function MyPage() {
  const sapphireCard = getCardBySlug('chase-sapphire-preferred')

  return (
    <section>
      <h2>The Best Starter Card for Cruisers</h2>
      <CreditCardRecommendation card={sapphireCard} />
    </section>
  )
}
```

## 3. Build a "Best Card For..." Comparison

```tsx
import { CardComparisonTable } from '@/components/ui/card-comparison-table'
import { CreditCardRecommendation } from '@/components/ui/credit-card-recommendation'
import { getBestCardsFor } from '@/lib/credit-card-config'

export default function BestCardsForFoodies() {
  const diningCards = getBestCardsFor('signup-bonus')
    .filter(c => c.pointsPerDollarDining >= 3)

  return (
    <div>
      <h2>Best Cards for Dining-Focused Cruisers</h2>

      {/* Show individual cards */}
      <div className="space-y-6 mb-12">
        {diningCards.map(card => (
          <CreditCardRecommendation 
            key={card.id} 
            card={card}
            compact={false}
          />
        ))}
      </div>

      {/* Show comparison */}
      <h3>Quick Comparison</h3>
      <CardComparisonTable cardIds={diningCards.map(c => c.id)} />
    </div>
  )
}
```

## 4. Add Compact Cards to a Sidebar

```tsx
import { CreditCardRecommendation } from '@/components/ui/credit-card-recommendation'
import { getCardsByIssuer } from '@/lib/credit-card-config'

export default function SidebarContent() {
  const chaseCards = getCardsByIssuer('chase')

  return (
    <aside className="w-64 bg-slate-50 p-4 rounded-lg">
      <h3 className="font-bold mb-4">Chase Cards We Love</h3>
      <div className="space-y-3">
        {chaseCards.map(card => (
          <CreditCardRecommendation
            key={card.id}
            card={card}
            compact={true}
          />
        ))}
      </div>
    </aside>
  )
}
```

## 5. Show "Best Cards For" in Different Scenarios

```tsx
import { CreditCardRecommendation } from '@/components/ui/credit-card-recommendation'
import { getBestCardsFor } from '@/lib/credit-card-config'

export default function ChooseYourCard() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Best signup bonuses */}
      <section>
        <h3>Starting a Cruise Fund?</h3>
        <p className="text-sm text-slate-600 mb-4">
          These have the biggest welcome bonuses
        </p>
        {getBestCardsFor('signup-bonus').map(card => (
          <CreditCardRecommendation
            key={card.id}
            card={card}
            compact={true}
          />
        ))}
      </section>

      {/* Best lounge access */}
      <section>
        <h3>Love Airport Lounges?</h3>
        <p className="text-sm text-slate-600 mb-4">
          Get free food, drinks, and Wi-Fi before your cruise
        </p>
        {getBestCardsFor('lounge-access').map(card => (
          <CreditCardRecommendation
            key={card.id}
            card={card}
            compact={true}
          />
        ))}
      </section>
    </div>
  )
}
```

## 6. Add FAQ Section with Card Recommendation

```tsx
import { CreditCardRecommendation } from '@/components/ui/credit-card-recommendation'
import { getCardBySlug } from '@/lib/credit-card-config'

export default function CreditCardFAQ() {
  const bestCard = getCardBySlug('chase-sapphire-preferred')

  return (
    <section className="space-y-6">
      <h2>Credit Card FAQ</h2>

      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="font-bold mb-2">Which card should I pick?</h3>
        <p className="text-slate-700 mb-4">
          Start with the Chase Sapphire Preferred. It's the most balanced option for cruisers.
        </p>
        <CreditCardRecommendation 
          card={bestCard}
          showEditorialTake={true}
          compact={false}
        />
      </div>

      {/* More FAQ items */}
    </section>
  )
}
```

## 7. Email Newsletter Integration

```tsx
import { TravelHackTip } from '@/components/ui/travel-hack-tip'
import { CreditCardRecommendation } from '@/components/ui/credit-card-recommendation'
import { getCardBySlug } from '@/lib/credit-card-config'

export default function NewsletterTemplate() {
  const thisWeeksCard = getCardBySlug('amex-gold')

  return (
    <div className="max-w-2xl mx-auto">
      <h1>GatGrid Weekly: This Week's Cruise Hack</h1>

      <TravelHackTip
        tip="Amex Gold gives 4x points on dining. Book a cruise with lots of special restaurants and watch those points stack up."
      />

      <h2>Card of the Week</h2>
      <CreditCardRecommendation 
        card={thisWeeksCard}
        showEditorialTake={true}
      />
    </div>
  )
}
```

## 8. Create a "Cheat Sheet" Page

```tsx
import { CardComparisonTable } from '@/components/ui/card-comparison-table'
import { AffiliateDisclosure } from '@/components/ui/affiliate-disclosure'

export default function CardCheatSheet() {
  // Best cards across all categories
  const topCards = [
    'chase-sapphire-preferred',
    'chase-sapphire-reserve',
    'amex-gold',
    'capital-one-venture-x',
  ]

  return (
    <div className="space-y-8">
      <h1>Credit Card Cheat Sheet</h1>
      <p className="text-lg text-slate-700">
        All the cards worth knowing about, compared at a glance.
      </p>

      <CardComparisonTable cardIds={topCards} />

      <AffiliateDisclosure />
    </div>
  )
}
```

## 9. Dynamic "Pick Your Winner" Comparison

```tsx
import { CardComparisonTable } from '@/components/ui/card-comparison-table'
import { creditCards } from '@/lib/credit-card-config'

interface DynamicComparisonProps {
  issuer?: string
  sortBy?: 'bonus' | 'fee' | 'earning'
  limit?: number
}

export default function DynamicComparison({ 
  issuer = 'chase',
  sortBy = 'bonus',
  limit = 4 
}: DynamicComparisonProps) {
  let filtered = issuer ? creditCards.filter(c => c.issuer === issuer) : creditCards

  // Sort by criteria
  if (sortBy === 'bonus') {
    filtered.sort((a, b) => b.signupBonusValue - a.signupBonusValue)
  } else if (sortBy === 'fee') {
    filtered.sort((a, b) => a.annualFee - b.annualFee)
  } else if (sortBy === 'earning') {
    filtered.sort((a, b) => b.pointsPerDollarTravel - a.pointsPerDollarTravel)
  }

  const cardIds = filtered.slice(0, limit).map(c => c.id)

  return (
    <section>
      <h2>{issuer ? `${issuer.toUpperCase()} Cards` : 'All Cards'} by {sortBy}</h2>
      <CardComparisonTable cardIds={cardIds} />
    </section>
  )
}
```

## 10. Add to Existing Pages (Real Examples)

### In "Best Time to Book" Guide:
```tsx
<TravelHackTip
  tip="The signup bonus clock starts when you're approved, not when you get the card. Apply 3 months before your cruise so you can meet spending requirements in time."
  cardSlug="chase-sapphire-preferred"
/>
```

### In "Disney Cruise Cost Guide":
```tsx
<section className="my-12">
  <h2>How to Save on Taxes & Fees</h2>
  <p>...</p>
  <CardComparisonTable cardIds={['chase-sapphire-preferred', 'amex-gold', 'citi-premier']} />
</section>
```

### In "Packing List" Guide:
```tsx
<TravelHackTip
  tip="Priority Pass (included with premium cards) gives free lounge access at most major airports. Shower, relax, and charge your devices before boarding."
  cardSlug="chase-sapphire-reserve"
/>
```

### In "First Time Cruiser" Guide:
```tsx
<div className="my-12 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-600">
  <h3 className="font-bold mb-4">Financial Hack: Don't Pay Full Price</h3>
  <p className="mb-4">Most cruisers don't know this, but credit cards can reduce your actual cruise cost by 15-20%:</p>
  <CreditCardRecommendation 
    card={getCardBySlug('chase-sapphire-preferred')}
    showEditorialTake={true}
  />
</div>
```

## Styling Notes

All components respect your existing GatGrid theme. No additional CSS needed!

- **Container**: max-w-3xl or max-w-4xl for content sections
- **Spacing**: Use space-y-6, space-y-8 for sections
- **Backgrounds**: bg-gradient-to-b from-blue-50 to-indigo-50 for hero sections
- **Cards**: border border-slate-200 rounded-xl for consistency

## More Help?

See `CREDIT_CARD_SYSTEM.md` for:
- Full API documentation
- Component prop reference
- Data structure reference
- How to add new cards
- Tone & philosophy guide
