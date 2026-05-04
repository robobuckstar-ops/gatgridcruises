import { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, XCircle } from 'lucide-react'
import { NewsletterSignup } from '@/components/newsletter-signup'
import {
  getStateroomCategories,
  getStateroomComparisonFeatures,
  getStateroomDecisionGuide,
} from '@/lib/data'

export const metadata: Metadata = {
  title: 'Disney Cruise Stateroom Comparison: Inside vs Verandah vs Concierge | GatGridCruises',
  description:
    'Full comparison of Disney cruise stateroom types — Inside, Oceanview, Verandah, and Concierge. Price ranges, square footage, pros/cons, and which is best for families, couples, and budget travelers.',
  openGraph: {
    title: 'Disney Cruise Stateroom Comparison 2026',
    description:
      'Inside vs Oceanview vs Verandah vs Concierge — which Disney cruise stateroom is right for you? Full comparison with price ranges and honest advice.',
    type: 'article',
    url: 'https://gatgridcruises.com/guides/stateroom-comparison',
    images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'GatGridCruises' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Disney Cruise Stateroom Comparison 2026',
    description: 'Inside vs Oceanview vs Verandah vs Concierge — which Disney cruise stateroom is right for you? Full comparison with price ranges.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

function CheckIcon({ val }: { val: boolean }) {
  return val ? (
    <CheckCircle className="h-5 w-5 text-emerald-500 mx-auto" />
  ) : (
    <XCircle className="h-5 w-5 text-slate-300 mx-auto" />
  )
}


const colorMap: Record<string, { bg: string; border: string; badge: string; badgeText: string }> = {
  slate: { bg: 'bg-slate-50', border: 'border-slate-200', badge: 'bg-slate-100', badgeText: 'text-slate-700' },
  blue: { bg: 'bg-[#1E3A5F]/10', border: 'border-blue-200', badge: 'bg-[#1E3A5F]/20', badgeText: 'text-blue-700' },
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', badge: 'bg-emerald-100', badgeText: 'text-emerald-700' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', badge: 'bg-purple-100', badgeText: 'text-purple-700' },
}

function RatingBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-slate-600">{label}</span>
        <span className="font-medium text-slate-700">{value}/5</span>
      </div>
      <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <div className="h-full bg-[#1E3A5F]/100 rounded-full" style={{ width: `${(value / 5) * 100}%` }} />
      </div>
    </div>
  )
}

export default function StateroomComparisonPage() {
  const staterooms = getStateroomCategories()
  const comparisonFeatures = getStateroomComparisonFeatures()
  const decisionGuide = getStateroomDecisionGuide()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0a1628] to-[#1E3A5F] text-white py-16 px-4">
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
                  {staterooms.map((s) => (
                    <td key={s.id} className="px-3 py-3 text-center font-semibold text-slate-900 text-xs">{s.perPersonNightEstimate}</td>
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
        <section className="bg-[#1E3A5F]/10 rounded-2xl p-8 border border-blue-100 mb-14">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">
            How to Choose: Quick Decision Guide
          </h2>
          <div className="space-y-4">
            {decisionGuide.map(({ cond, rec, why }) => (
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

        {/* Detailed stateroom cards */}
        <div className="space-y-10 mb-14">
          {staterooms.map((room) => {
            const colors = colorMap[room.color]
            return (
              <section key={room.id} id={room.id} className={`rounded-2xl border-2 ${colors.border} overflow-hidden`}>
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
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
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
                <div className="p-6 bg-white">
                  <div className="grid md:grid-cols-3 gap-6">
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

        {/* Which should you book */}
        <section className="bg-slate-900 text-white rounded-2xl p-8 mb-14">
          <h2 className="font-display text-2xl font-bold mb-2">Which Stateroom Should You Book?</h2>
          <p className="text-slate-400 mb-6 text-sm">Our honest take, based on budget and trip style:</p>
          <div className="space-y-4">
            {[
              { scenario: "If you're on a tight budget...", answer: 'Book Inside. You have access to every single thing on the ship. The money you save can fund excursions, specialty dining, or even a second cruise.' },
              { scenario: "If it's a 3–4 night sailing...", answer: "Inside or Oceanview. You'll spend very little time in the stateroom — save the balcony premium for a longer sailing where you'll actually use it." },
              { scenario: "If it's a 7+ night sailing...", answer: "Verandah is worth every penny. Sea days with a private balcony are genuinely magical. Morning coffee watching the ocean approach a port is a bucket-list experience." },
              { scenario: "If it's a honeymoon or anniversary...", answer: 'Verandah minimum, Concierge if budget allows. The balcony transforms a vacation into an experience.' },
              { scenario: 'If you have a family of 5+...', answer: 'Consider a Verandah or Concierge suite. Standard staterooms max out at 4–5 guests. Suites give you the space to actually coexist.' },
              { scenario: 'If money is no object...', answer: "Concierge. The service level and suite size are genuinely extraordinary. The concierge team handles everything. You'll board first, eat first, and relax more than anyone." },
            ].map(({ scenario, answer }) => (
              <div key={scenario} className="border-l-2 border-amber-500 pl-4">
                <div className="font-semibold text-amber-300 text-sm mb-1">{scenario}</div>
                <p className="text-slate-300 text-sm leading-relaxed">{answer}</p>
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
              
              rel="noopener noreferrer"
              className="block text-center px-6 py-4 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:border-blue-400 transition"
            >
              Check Price on Disney Cruise Line →
            </a>
          </div>
        </section>

        {/* Newsletter */}
        <NewsletterSignup className="mb-12" />

        {/* Related guides */}
        <section className="bg-slate-50 rounded-xl p-8 border border-slate-200">
          <h3 className="font-display text-2xl font-bold text-slate-900 mb-5">Related Guides</h3>
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
      </div>
    </div>
  )
}
