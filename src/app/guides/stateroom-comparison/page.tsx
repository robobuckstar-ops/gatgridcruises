import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Disney Cruise Stateroom Comparison: Inside vs Verandah vs Concierge | GatGridCruises',
  description:
    'Full comparison of Disney cruise stateroom types — Inside, Oceanview, Verandah, and Concierge. Price ranges, square footage, pros/cons, and which is best for families, couples, and budget travelers.',
  openGraph: {
    title: 'Disney Cruise Stateroom Comparison 2025',
    description:
      'Inside vs Oceanview vs Verandah vs Concierge — which Disney cruise stateroom is right for you? Full comparison with price ranges and honest advice.',
    type: 'article',
  },
}

const staterooms = [
  {
    id: 'inside',
    name: 'Inside Stateroom',
    emoji: '🚢',
    tagline: 'Maximum value, minimal space',
    priceRange: '$150–$350/person/night',
    typicalTotal: '$900–$4,900 (7-night, 2 guests)',
    sqft: '169–214 sq ft',
    sleeps: 'Up to 4 guests',
    window: 'None',
    features: [
      'Two twin beds (convert to queen)',
      'Sofa or pullman bunk for additional guests',
      'Full bathroom with split bath design',
      'Flat-screen TV',
      'Mini-fridge',
      'In-room safe',
      'Stateroom host service (twice daily)',
    ],
    pros: [
      'Cheapest stateroom available — save thousands',
      'Same ship access — pools, shows, dining, kids clubs',
      'Blackout-dark — best sleep on the ship',
      'You won\'t miss the balcony if you\'re rarely in the room',
      'Savings can fund excursions, specialty dining, or a future cruise',
    ],
    cons: [
      'No window — zero natural light',
      'Can feel claustrophobic, especially for longer sailings',
      'No outdoor private space',
      'Hard to tell if it\'s day or night without checking your phone',
    ],
    bestFor: [
      'Budget-focused families',
      'Guests who spend most time at the pool or on port days',
      'Short sailings (3–4 nights)',
      'Experienced cruisers who know they sleep through port mornings',
    ],
    worstFor: [
      'Anyone prone to seasickness (no horizon reference)',
      'Families with young kids needing nap time in natural light',
      'Longer sailings (7+ nights) where at-sea days mean more room time',
    ],
    rating: { value: 4, luxury: 2, family: 3, couple: 3 },
    color: 'slate',
  },
  {
    id: 'oceanview',
    name: 'Oceanview Stateroom',
    emoji: '🌊',
    tagline: 'Natural light without the balcony price',
    priceRange: '$220–$450/person/night',
    typicalTotal: '$1,500–$7,000 (7-night, 2 guests)',
    sqft: '214–268 sq ft',
    sleeps: 'Up to 4 guests',
    window: 'Porthole or picture window (does not open)',
    features: [
      'Porthole or larger picture window',
      'Two twin beds (convert to queen)',
      'Sofa or pullman bunk for additional guests',
      'Full bathroom with split bath design',
      'Flat-screen TV',
      'Mini-fridge',
      'In-room safe',
    ],
    pros: [
      'Natural light — can tell time by the sun',
      'More spacious than inside cabins',
      'Wake up to ocean views',
      'Comfortable middle-ground price',
      'Great on sea days for watching waves',
    ],
    cons: [
      'Window does not open — no fresh air',
      'No private outdoor space',
      'Significantly more expensive than inside',
      'Portholes are quite small on some ships',
    ],
    bestFor: [
      'Couples who want a romantic view without splurging on a balcony',
      'Moderate budgets wanting natural light',
      'Night-owl travelers who want to see the ocean in the morning',
    ],
    worstFor: [
      'Families who want outdoor private space',
      'Those expecting a "sea view balcony" experience',
    ],
    rating: { value: 3, luxury: 3, family: 3, couple: 4 },
    color: 'blue',
  },
  {
    id: 'verandah',
    name: 'Verandah Stateroom',
    emoji: '🏝️',
    tagline: 'The sweet spot — private balcony for everyone',
    priceRange: '$320–$650/person/night',
    typicalTotal: '$2,500–$11,000 (7-night, 2 guests)',
    sqft: '268–304 sq ft',
    sleeps: 'Up to 5 guests',
    window: 'Private balcony with sliding glass door',
    features: [
      'Private balcony with chairs and table',
      'Sliding glass door to balcony',
      'Two twin beds (convert to queen)',
      'Sofa or pullman bunk for additional guests',
      'Full bathroom with split bath design (on most ships)',
      'Flat-screen TV',
      'Mini-fridge',
      'In-room safe',
    ],
    pros: [
      'Private outdoor space — have coffee while watching the ocean at sunrise',
      'Fresh air any time',
      'Natural light + panoramic views',
      'Most popular category for a reason',
      'At-sea days feel luxurious with a private balcony',
      'Wake up on a port day to your destination approaching',
    ],
    cons: [
      'Significantly more expensive than inside or oceanview',
      'Balcony size varies — some are quite small',
      'Aft-facing balconies get ship exhaust on some vessels',
      'Not worth it if you\'re only doing 3-night sailings',
    ],
    bestFor: [
      'Families on 5+ night sailings',
      'Couples celebrating anniversaries or honeymoons',
      'Guests who want to experience the ocean fully',
      'Anyone with sea days — verandah makes them magical',
    ],
    worstFor: [
      'Very budget-conscious travelers (inside saves thousands)',
      'Short 3-night sailings where you\'re rarely in the room',
    ],
    rating: { value: 3, luxury: 4, family: 5, couple: 5 },
    color: 'emerald',
  },
  {
    id: 'concierge',
    name: 'Concierge Stateroom',
    emoji: '👑',
    tagline: 'White-glove service and the largest rooms on the ship',
    priceRange: '$600–$1,500+/person/night',
    typicalTotal: '$8,000–$30,000+ (7-night, 2 guests)',
    sqft: '304–1,781 sq ft (suites)',
    sleeps: 'Up to 7 guests (in suites)',
    window: 'Large verandah + some suites have wrap-around balconies',
    features: [
      'Dedicated Concierge host team',
      'Private concierge lounge with complimentary drinks & snacks',
      'Priority embarkation (board before anyone else)',
      'Priority reservations for Palo, spa, and excursions',
      'Welcome amenities (fruit basket, sparkling wine)',
      'Premium bedding and additional bathroom amenities',
      'Some suites have whirlpool tubs, dining areas, and multiple bedrooms',
      'Exclusive Concierge Sun Deck on some ships',
    ],
    pros: [
      'Best service on the ship — truly white-glove',
      'Priority access eliminates every frustration',
      'Concierge lounge is genuinely wonderful for relaxing',
      'Suites have room for large families with space to breathe',
      'Worth it as a once-in-a-lifetime splurge',
      'Concierge guests often say it\'s the only way they\'ll cruise now',
    ],
    cons: [
      'Extremely expensive — often 3–4x the cost of a verandah',
      'Most of the "benefits" are already included for everyone',
      'ROI is hard to justify vs. spending that money on a second cruise',
      'The Concierge lounge perk diminishes if you\'re off the ship all day',
    ],
    bestFor: [
      'Luxury travelers for whom price is not a concern',
      'Large families who need multiple bedrooms (suites)',
      'Anniversary trips or honeymoons wanting the best possible experience',
      'Guests who want zero friction on reservations and boarding',
    ],
    worstFor: [
      'Budget-conscious travelers (obvious)',
      'Families who spend all day at ports or the beach',
      'First-time Disney cruisers who don\'t know what they\'re comparing against',
    ],
    rating: { value: 2, luxury: 5, family: 4, couple: 5 },
    color: 'purple',
  },
]

const colorMap: Record<string, { bg: string; border: string; badge: string; badgeText: string; bar: string }> = {
  slate: {
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    badge: 'bg-slate-100',
    badgeText: 'text-slate-700',
    bar: 'bg-slate-500',
  },
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    badge: 'bg-blue-100',
    badgeText: 'text-blue-700',
    bar: 'bg-blue-500',
  },
  emerald: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    badge: 'bg-emerald-100',
    badgeText: 'text-emerald-700',
    bar: 'bg-emerald-500',
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    badge: 'bg-purple-100',
    badgeText: 'text-purple-700',
    bar: 'bg-purple-500',
  },
}

function RatingBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-slate-600">{label}</span>
        <span className="font-medium text-slate-700">{value}/5</span>
      </div>
      <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full"
          style={{ width: `${(value / 5) * 100}%` }}
        />
      </div>
    </div>
  )
}

export default function StateroomComparisonPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-950 to-blue-900 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-sm text-blue-300 mb-3 font-medium">Guides · Staterooms</div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Disney Cruise Stateroom Comparison
          </h1>
          <p className="text-lg text-blue-100 leading-relaxed max-w-2xl">
            Inside vs Oceanview vs Verandah vs Concierge — the honest breakdown of every Disney cruise
            stateroom category, with price ranges, square footage, and who each is best for.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Quick comparison table */}
        <section className="mb-14">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-5">Quick Comparison</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="text-left p-3 font-semibold">Category</th>
                  <th className="text-left p-3 font-semibold">Size</th>
                  <th className="text-left p-3 font-semibold">View</th>
                  <th className="text-left p-3 font-semibold">Est. Cost (pp/night)</th>
                  <th className="text-left p-3 font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {staterooms.map((room, i) => (
                  <tr key={room.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="p-3 font-semibold text-slate-900">
                      <span className="mr-1.5">{room.emoji}</span>
                      {room.name}
                    </td>
                    <td className="p-3 text-slate-600">{room.sqft}</td>
                    <td className="p-3 text-slate-600">{room.window}</td>
                    <td className="p-3 text-slate-900 font-medium">{room.priceRange}</td>
                    <td className="p-3 text-slate-600 text-xs">{room.bestFor[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Detailed cards */}
        <div className="space-y-10">
          {staterooms.map((room) => {
            const colors = colorMap[room.color]
            return (
              <section key={room.id} id={room.id} className={`rounded-2xl border-2 ${colors.border} overflow-hidden`}>
                {/* Header */}
                <div className={`${colors.bg} p-6 border-b ${colors.border}`}>
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{room.emoji}</span>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors.badge} ${colors.badgeText}`}>
                          {room.tagline}
                        </span>
                      </div>
                      <h2 className="font-display text-2xl font-bold text-slate-900">{room.name}</h2>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-500 mb-0.5">Estimated fare</div>
                      <div className="font-bold text-slate-900 text-lg">{room.priceRange}</div>
                      <div className="text-xs text-slate-500">{room.typicalTotal}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                    {[
                      { label: 'Size', value: room.sqft },
                      { label: 'Sleeps', value: room.sleeps },
                      { label: 'View', value: room.window.split(' ')[0] },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white/60 rounded-lg p-2.5">
                        <div className="text-xs text-slate-500">{stat.label}</div>
                        <div className="font-semibold text-slate-800 text-sm">{stat.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 bg-white">
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Features */}
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-3 text-sm">What&apos;s Included</h3>
                      <ul className="space-y-1.5">
                        {room.features.map((f) => (
                          <li key={f} className="flex items-start gap-1.5 text-xs text-slate-700">
                            <span className="text-blue-400 mt-0.5 flex-shrink-0">·</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Pros / Cons */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-emerald-700 mb-2 text-sm">Pros</h3>
                        <ul className="space-y-1.5">
                          {room.pros.map((p) => (
                            <li key={p} className="flex items-start gap-1.5 text-xs text-slate-700">
                              <span className="text-emerald-500 flex-shrink-0">+</span>{p}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-red-600 mb-2 text-sm">Cons</h3>
                        <ul className="space-y-1.5">
                          {room.cons.map((c) => (
                            <li key={c} className="flex items-start gap-1.5 text-xs text-slate-700">
                              <span className="text-red-400 flex-shrink-0">−</span>{c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Best for / Worst for + ratings */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-slate-800 mb-2 text-sm">Best For</h3>
                        <ul className="space-y-1">
                          {room.bestFor.map((b) => (
                            <li key={b} className="text-xs text-slate-700 flex items-start gap-1.5">
                              <span className="text-blue-400 flex-shrink-0">✓</span>{b}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 mb-3 text-sm">Ratings</h3>
                        <div className="space-y-2">
                          <RatingBar label="Value for Money" value={room.rating.value} />
                          <RatingBar label="Luxury Factor" value={room.rating.luxury} />
                          <RatingBar label="Best for Families" value={room.rating.family} />
                          <RatingBar label="Best for Couples" value={room.rating.couple} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )
          })}
        </div>

        {/* Decision guide */}
        <section className="mt-14 bg-slate-900 text-white rounded-2xl p-8">
          <h2 className="font-display text-2xl font-bold mb-2">Which Stateroom Should You Book?</h2>
          <p className="text-slate-400 mb-6 text-sm">Our honest take, based on budget and trip style:</p>
          <div className="space-y-4">
            {[
              {
                scenario: 'If you\'re on a tight budget...',
                answer: 'Book Inside. You have access to every single thing on the ship. The money you save can fund excursions, specialty dining, or even a second cruise.',
              },
              {
                scenario: 'If it\'s a 3–4 night sailing...',
                answer: 'Inside or Oceanview. You\'ll spend very little time in the stateroom — save the balcony premium for a longer sailing where you\'ll actually use it.',
              },
              {
                scenario: 'If it\'s a 7+ night sailing...',
                answer: 'Verandah is worth every penny. Sea days with a private balcony are genuinely magical. Morning coffee watching the ocean approach a port is a bucket-list experience.',
              },
              {
                scenario: 'If it\'s a honeymoon or anniversary...',
                answer: 'Verandah minimum, Concierge if budget allows. The balcony transforms a vacation into an experience.',
              },
              {
                scenario: 'If you have a family of 5+...',
                answer: 'Consider a Verandah or Concierge suite. Standard staterooms max out at 4–5 guests. Suites give you the space to actually coexist.',
              },
              {
                scenario: 'If money is no object...',
                answer: 'Concierge. The service level and suite size are genuinely extraordinary. The concierge team handles everything. You\'ll board first, eat first, and relax more than anyone.',
              },
            ].map(({ scenario, answer }) => (
              <div key={scenario} className="border-l-2 border-amber-500 pl-4">
                <div className="font-semibold text-amber-300 text-sm mb-1">{scenario}</div>
                <p className="text-slate-300 text-sm leading-relaxed">{answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 text-center">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-3">Ready to Estimate Your Cost?</h2>
          <p className="text-slate-600 mb-6 max-w-lg mx-auto text-sm">
            Use our free calculator to see estimated fares based on your stateroom choice, ship, length, and party size.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/tools/cruise-cost-calculator"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
            >
              Cruise Cost Calculator
            </Link>
            <Link
              href="/guides/first-time-disney-cruise"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 hover:border-blue-400 text-slate-700 font-semibold transition-colors"
            >
              First-Timer&apos;s Guide
            </Link>
            <a
              href="https://disneycruise.disney.go.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-700 text-white font-semibold transition-colors"
            >
              Check Prices on Disney Cruise Line →
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
