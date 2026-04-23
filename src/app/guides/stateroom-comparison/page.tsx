import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, XCircle, Maximize2 } from 'lucide-react'
import { NewsletterSignup } from '@/components/newsletter-signup'

export const metadata: Metadata = {
  title: 'Disney Cruise Stateroom Comparison: Inside vs Oceanview vs Verandah vs Concierge',
  description:
    'Compare all Disney Cruise Line stateroom types: inside, oceanview, verandah, and concierge. Price ranges, square footage, pros and cons, and how to choose.',
  keywords: [
    'disney cruise stateroom comparison',
    'disney cruise cabin types',
    'disney cruise inside vs verandah',
    'disney cruise concierge class',
    'disney cruise cabin size',
  ],
}

interface StateroomData {
  type: string
  slug: string
  priceRange: string
  sizeRange: string
  occupancy: string
  description: string
  pros: string[]
  cons: string[]
  bestFor: string[]
  color: string
  gradient: string
  badge?: string
}

const staterooms: StateroomData[] = [
  {
    type: 'Inside Stateroom',
    slug: 'inside',
    priceRange: '$165–$240/person/night',
    sizeRange: '169–204 sq ft',
    occupancy: '1–4 guests',
    description:
      'No windows or portholes. Complete darkness makes these the best for sleeping — many parents prefer them for kids. The most affordable way to experience Disney Cruise Line.',
    pros: [
      'Lowest price point — often 30–40% cheaper than verandah',
      'Complete blackout darkness is ideal for children\'s sleep',
      'Same amenities and service as other cabin types',
      'Smaller footprint means less to manage with young kids',
      'Spend most of your time outside the cabin anyway',
    ],
    cons: [
      'No natural light — disorienting for some guests',
      'Feels smallest of all cabin types',
      'Not ideal for longer cruises (7+ nights)',
      'Can feel claustrophobic for adults who value space',
    ],
    bestFor: ['Budget-conscious travelers', 'Families with young children who sleep well', 'Short cruises (3–5 nights)', 'Those who plan to spend most time outside the cabin'],
    color: 'slate',
    gradient: 'from-slate-700 to-slate-900',
  },
  {
    type: 'Oceanview Stateroom',
    slug: 'oceanview',
    priceRange: '$210–$300/person/night',
    sizeRange: '170–214 sq ft',
    occupancy: '1–4 guests',
    description:
      'Features a porthole or large picture window providing natural light and ocean views. Similar size to inside staterooms but with the psychological and visual benefit of daylight and sea views.',
    pros: [
      'Natural daylight throughout the day',
      'Ocean views provide connection to the sea',
      'More affordable than verandah',
      'Good middle-ground for light sleepers who want views',
      'Same deck layout options as verandah cabins',
    ],
    cons: [
      'Window doesn\'t open — no fresh air',
      'Views can be obstructed on some ships/decks',
      'Porthole windows on older ships feel small',
      'No outdoor private space',
      'Minimal size upgrade over inside staterooms',
    ],
    bestFor: ['Travelers who want natural light without the verandah premium', 'First-timers on a moderate budget', 'Couples looking for an affordable upgrade', 'Alaska or Northern Europe itineraries where scenery viewing matters'],
    color: 'blue',
    gradient: 'from-blue-600 to-blue-800',
  },
  {
    type: 'Verandah (Balcony)',
    slug: 'verandah',
    priceRange: '$280–$400/person/night',
    sizeRange: '204–268 sq ft',
    occupancy: '1–5 guests',
    description:
      'Disney calls balcony cabins "verandah" staterooms. A private outdoor space with patio furniture lets you watch the ocean, enjoy sunrises, and have morning coffee outside. The most popular upgrade for repeat guests.',
    pros: [
      'Private outdoor space — sea air and ocean views anytime',
      'Larger cabin square footage than inside/oceanview',
      'Perfect for morning coffee or evening sunsets',
      'Great for spotting wildlife, ports, and scenery',
      'Provides a quiet escape from busy common areas',
      'Full floor-to-ceiling doors flood cabin with natural light',
    ],
    cons: [
      'Significantly more expensive than inside/oceanview',
      'Balconies are small — typically 2 chairs and a table',
      'Some verandah cabins have obstructed views from lifeboats',
      'Balcony position matters (forward/aft/midship)',
    ],
    bestFor: ['Couples and adults who value private outdoor space', 'Repeat Disney cruisers ready to upgrade', 'Alaska or Norway itineraries (wildlife and scenery)', 'Guests celebrating special occasions'],
    color: 'indigo',
    gradient: 'from-indigo-600 to-indigo-800',
    badge: 'Most Popular',
  },
  {
    type: 'Concierge Class',
    slug: 'concierge',
    priceRange: '$490–$710/person/night',
    sizeRange: '246–622 sq ft (incl. 2-story suites)',
    occupancy: '1–7 guests (suites)',
    description:
      'The premium tier of Disney Cruise Line. Dedicated concierge team handles reservations and special requests before and during the cruise. Access to a private sun deck lounge with exclusive food and beverage service.',
    pros: [
      'Dedicated Concierge team available before sailing and onboard',
      'Private sun deck lounge with exclusive food, drinks, and seating',
      'Priority embarkation and disembarkation',
      'Priority reservations for specialty dining and activities',
      'Largest staterooms on the ship — some 2-story suites',
      'Complimentary champagne and welcome amenities',
      'Priority tendering at ports',
    ],
    cons: [
      'Extremely expensive — typically 2–3x verandah pricing',
      'Concierge lounge most valuable on sea days — less so at ports',
      'Still limited to ship-wide amenities and same dining rooms',
      'Diminishing returns if you\'re rarely in the cabin',
      'Not all ships have equal concierge facilities',
    ],
    bestFor: ['Luxury travelers seeking a premium Disney experience', 'Milestone celebrations (honeymoons, anniversaries)', 'Large families needing suite-sized accommodations', 'Guests who value priority access and concierge service'],
    color: 'amber',
    gradient: 'from-amber-600 to-orange-700',
    badge: 'Premium',
  },
]

const comparisonFeatures = [
  { feature: 'Private outdoor space', inside: false, oceanview: false, verandah: true, concierge: true },
  { feature: 'Natural light / windows', inside: false, oceanview: true, verandah: true, concierge: true },
  { feature: 'Dedicated concierge', inside: false, oceanview: false, verandah: false, concierge: true },
  { feature: 'Private lounge access', inside: false, oceanview: false, verandah: false, concierge: true },
  { feature: 'Priority boarding', inside: false, oceanview: false, verandah: false, concierge: true },
  { feature: 'Room service available', inside: true, oceanview: true, verandah: true, concierge: true },
  { feature: 'Split bathroom (tub + shower)', inside: true, oceanview: true, verandah: true, concierge: true },
  { feature: 'Sofa converts to bed', inside: true, oceanview: true, verandah: true, concierge: true },
  { feature: 'In-cabin entertainment', inside: true, oceanview: true, verandah: true, concierge: true },
]

function CheckIcon({ val }: { val: boolean }) {
  return val ? (
    <CheckCircle className="h-5 w-5 text-emerald-500 mx-auto" />
  ) : (
    <XCircle className="h-5 w-5 text-slate-300 mx-auto" />
  )
}

export default function StateroomComparisonPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 py-14 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/guides"
            className="inline-flex items-center gap-1 text-slate-400 hover:text-white text-sm mb-6 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Guides
          </Link>

          <div className="flex items-center gap-2 mb-4">
            <Maximize2 className="h-5 w-5 text-yellow-400" />
            <span className="text-sm font-semibold text-yellow-400 uppercase tracking-wider">
              Cabin Guide
            </span>
          </div>

          <h1 className="font-fraunces text-4xl md:text-5xl font-bold mb-4">
            Disney Cruise Stateroom Comparison
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Inside, oceanview, verandah, or concierge? Compare every stateroom type by price,
            size, features, and who each one is best for.
          </p>
        </div>
      </section>

      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
          {[
            { label: 'Stateroom Types', value: '4 main' },
            { label: 'Smallest (sq ft)', value: '169' },
            { label: 'Largest (sq ft)', value: '622+' },
            { label: 'Price Difference', value: '4× inside' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200">
              <p className="font-fraunces font-bold text-2xl text-slate-900">{value}</p>
              <p className="text-xs text-slate-500 mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Stateroom cards */}
        <section className="space-y-10 mb-16">
          {staterooms.map((room) => (
            <div key={room.slug} className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className={`bg-gradient-to-r ${room.gradient} px-6 py-5 text-white flex items-center justify-between`}>
                <div>
                  <h2 className="font-fraunces text-2xl font-bold">{room.type}</h2>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-white/80">
                    <span>{room.sizeRange}</span>
                    <span>·</span>
                    <span>{room.occupancy}</span>
                  </div>
                </div>
                <div className="text-right">
                  {room.badge && (
                    <span className="bg-yellow-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full block mb-2">
                      {room.badge}
                    </span>
                  )}
                  <p className="text-sm text-white/70">Est. price</p>
                  <p className="font-bold text-lg">{room.priceRange}</p>
                </div>
              </div>

              <div className="p-6">
                <p className="text-slate-600 mb-6">{room.description}</p>

                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm mb-3 flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-emerald-500" /> Pros
                    </h3>
                    <ul className="space-y-2">
                      {room.pros.map((p) => (
                        <li key={p} className="text-sm text-slate-600 flex items-start gap-2">
                          <span className="text-emerald-500 mt-0.5 flex-shrink-0">+</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm mb-3 flex items-center gap-1">
                      <XCircle className="h-4 w-4 text-red-400" /> Cons
                    </h3>
                    <ul className="space-y-2">
                      {room.cons.map((c) => (
                        <li key={c} className="text-sm text-slate-600 flex items-start gap-2">
                          <span className="text-red-400 mt-0.5 flex-shrink-0">−</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Best For</p>
                  <div className="flex flex-wrap gap-2">
                    {room.bestFor.map((bf) => (
                      <span key={bf} className="bg-white border border-slate-200 text-slate-700 text-xs px-3 py-1 rounded-full">
                        {bf}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Comparison table */}
        <section className="mb-16">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-6">
            Feature Comparison
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="text-left px-4 py-3 font-medium">Feature</th>
                  <th className="text-center px-3 py-3 font-medium">Inside</th>
                  <th className="text-center px-3 py-3 font-medium">Oceanview</th>
                  <th className="text-center px-3 py-3 font-medium">Verandah</th>
                  <th className="text-center px-3 py-3 font-medium">Concierge</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-4 py-3 text-slate-700 font-medium">{row.feature}</td>
                    <td className="px-3 py-3"><CheckIcon val={row.inside} /></td>
                    <td className="px-3 py-3"><CheckIcon val={row.oceanview} /></td>
                    <td className="px-3 py-3"><CheckIcon val={row.verandah} /></td>
                    <td className="px-3 py-3"><CheckIcon val={row.concierge} /></td>
                  </tr>
                ))}
                <tr className="bg-slate-100">
                  <td className="px-4 py-3 font-semibold text-slate-900">Est. price/person/night</td>
                  {['$165–240', '$210–300', '$280–400', '$490–710'].map((p) => (
                    <td key={p} className="px-3 py-3 text-center font-semibold text-slate-900 text-xs">{p}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            * Prices are estimates. Actual pricing varies by ship, sailing date, and booking window.
          </p>
        </section>

        {/* Decision guide */}
        <section className="bg-blue-50 rounded-2xl p-8 border border-blue-100 mb-14">
          <h2 className="font-fraunces text-2xl font-bold text-slate-900 mb-6">
            How to Choose: Quick Decision Guide
          </h2>
          <div className="space-y-4">
            {[
              { cond: 'Budget is your primary concern', rec: 'Inside Stateroom', why: 'Same ship experience at the lowest cost. All dining, entertainment, and pools are identical.' },
              { cond: 'First-time cruiser wanting a solid experience', rec: 'Oceanview or Verandah', why: 'Natural light makes the cruise feel less hotel-like; verandah adds the private outdoor touch.' },
              { cond: 'Alaska, Norway, or scenic itinerary', rec: 'Verandah strongly recommended', why: 'Wildlife, glaciers, and fjords are viewed best from your private balcony — you\'d regret an inside cabin here.' },
              { cond: 'Celebrating a milestone (wedding, honeymoon, anniversary)', rec: 'Verandah or Concierge', why: 'Private space and priority service make special occasions feel extraordinary.' },
              { cond: 'You have 4+ people in one cabin', rec: 'Verandah or Concierge suite', why: 'More square footage prevents cabin fever; suites sleep 5–7 guests comfortably.' },
              { cond: 'Maximum luxury and hassle-free experience', rec: 'Concierge Class', why: 'Concierge team handles everything; private lounge is a genuine retreat on sea days.' },
            ].map(({ cond, rec, why }) => (
              <div key={cond} className="flex gap-4 bg-white rounded-xl p-4 border border-blue-100">
                <div className="flex-shrink-0 w-2 bg-blue-600 rounded-full" />
                <div>
                  <p className="text-slate-500 text-xs mb-1">If: {cond}</p>
                  <p className="font-bold text-slate-900 text-sm">→ {rec}</p>
                  <p className="text-slate-600 text-xs mt-1">{why}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-12">
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/tools/cruise-cost-calculator"
              className="block text-center px-6 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
            >
              Estimate Your Cruise Cost
            </Link>
            <a
              href="https://www.disneycruise.disney.go.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center px-6 py-4 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:border-blue-400 transition"
            >
              Check Price on Disney Cruise Line →
            </a>
          </div>
        </section>

        {/* Newsletter */}
        <NewsletterSignup className="mb-12" />

        {/* Related */}
        <section className="bg-slate-50 rounded-xl p-8 border border-slate-200">
          <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-5">Related Guides</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              ['/guides/first-time-disney-cruise', 'First-Time Disney Cruise Guide'],
              ['/blog/disney-cruise-packing-list', 'Packing List'],
              ['/tools/cruise-cost-calculator', 'Cruise Cost Calculator'],
              ['/travel-hacks/best-cruise-credit-cards', 'Best Credit Cards for Cruises'],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition text-sm"
              >
                <span className="font-medium text-slate-900">{label}</span>
                <span className="text-blue-600">→</span>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </div>
  )
}
