import { Metadata } from 'next'
import Link from 'next/link'
import { Dices, ArrowRight, Check, X, HelpCircle } from 'lucide-react'
import { getSailings, getSnapshotsForSailing } from '@/lib/data'
import { calculateDealScore } from '@/lib/deal-score'
import { formatPrice, formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Restricted Stateroom (GTY) Deals — Disney Cruise',
  description:
    'Restricted / Guarantee (GTY) stateroom rates on Disney cruises — lower prices in exchange for letting Disney pick your exact cabin. See how it works and which sailings have the best inside-cabin value right now.',
  openGraph: {
    title: 'Restricted Stateroom (GTY) Deals — Disney Cruise',
    description:
      "GTY stateroom deals trade cabin choice for a discount. Here's how they work — plus the sailings with the best inside-cabin value right now.",
    url: 'https://gatgridcruises.com/deals/restricted-staterooms',
    images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'GatGridCruises' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Restricted Stateroom (GTY) Deals — Disney Cruise',
    description:
      "GTY stateroom deals trade cabin choice for a discount. Here's how they work — plus the sailings with the best inside-cabin value right now.",
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

export default function RestrictedStateroomDealsPage() {
  const sailings = getSailings()

  // Surface sailings with an Inside-cabin price (GTY is most commonly an Inside-category restriction)
  // and rank by deal score so the strongest GTY-style values land at the top.
  const candidates = sailings
    .filter((s) => s.current_inside_price && s.current_inside_price > 0)
    .map((s) => {
      const snapshots = getSnapshotsForSailing(s.id)
      const score = calculateDealScore(s, snapshots).score
      return { sailing: s, score }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 24)

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-[#1E3A5F] to-slate-900 text-white py-14 md:py-20 border-b border-white/10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-3 text-sm">
            <Link href="/deals" className="text-blue-200 hover:text-white">Deals</Link>
            <span className="text-slate-500">/</span>
            <span className="text-slate-300">Restricted Stateroom Deals</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <Dices className="w-9 h-9 text-[#D4AF37]" aria-hidden="true" />
            <h1 className="font-fraunces text-3xl md:text-5xl font-bold">
              Restricted Stateroom Deals
            </h1>
          </div>
          <p className="font-inter text-lg text-blue-200 max-w-3xl mb-2">
            Disney&apos;s &quot;guarantee&quot; (GTY) bookings trade cabin choice for a lower fare. You pick the
            <strong> category</strong> (Inside, Oceanview, Verandah); Disney picks the
            <strong> exact cabin</strong>, often a few weeks before sailing.
          </p>
          <p className="font-inter text-sm text-blue-300 max-w-3xl">
            Prices updated daily. Request a quote for exact pricing with your group.
          </p>
        </div>
      </section>

      {/* What is a GTY rate? */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="font-fraunces text-2xl md:text-3xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-[#1E3A5F]" aria-hidden="true" />
            What&apos;s a Restricted (GTY) stateroom?
          </h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            A Guarantee (GTY) booking locks in a category — for example, &quot;Inside Stateroom&quot; — but not a
            specific cabin number. Disney assigns your exact stateroom anytime up to a few days before
            sailing, sometimes upgrading you to a higher category at no extra charge. In exchange, you
            usually save 10–15% versus picking a specific cabin upfront.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white rounded-xl border border-emerald-200 p-5">
              <h3 className="font-semibold text-emerald-900 mb-3 flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Great if you...
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex gap-2"><span className="text-emerald-600">•</span>Want the lowest price for your category</li>
                <li className="flex gap-2"><span className="text-emerald-600">•</span>Don&apos;t care about deck, location, or specific number</li>
                <li className="flex gap-2"><span className="text-emerald-600">•</span>Are open to a free upgrade if Disney has space</li>
                <li className="flex gap-2"><span className="text-emerald-600">•</span>Are cruising solo or as a flexible couple</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl border border-amber-200 p-5">
              <h3 className="font-semibold text-amber-900 mb-3 flex items-center gap-1.5">
                <X className="w-4 h-4" /> Skip GTY if you...
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex gap-2"><span className="text-amber-600">•</span>Need connecting rooms for kids/family</li>
                <li className="flex gap-2"><span className="text-amber-600">•</span>Get seasick — midship/lower deck matters</li>
                <li className="flex gap-2"><span className="text-amber-600">•</span>Want a specific verandah view (aft/forward)</li>
                <li className="flex gap-2"><span className="text-amber-600">•</span>Are sailing with mobility/accessibility needs</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-900">
            <p>
              <strong>Heads up:</strong> Disney doesn&apos;t always publicly flag a sailing as
              &quot;GTY-eligible&quot; — availability shifts daily. The list below ranks Disney sailings by
              overall deal score with their lowest Inside-cabin rate. Request a quote and we&apos;ll confirm
              whether a GTY rate is currently available on the sailing you want.
            </p>
          </div>
        </div>
      </section>

      {/* Sailings list */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="font-fraunces text-2xl md:text-3xl font-bold text-slate-900">
            Best inside-cabin value right now
          </h2>
          <Link
            href="/deals"
            className="text-sm font-semibold text-blue-700 hover:text-blue-900"
          >
            See all deals →
          </Link>
        </div>
        <p className="text-sm text-slate-500 mb-6">
          {candidates.length} sailings sorted by deal score. Inside category — the most common GTY tier.
        </p>

        {candidates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {candidates.map(({ sailing, score }) => (
              <Link
                key={sailing.id}
                href={`/sailing/${sailing.id}`}
                className="group block bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-fraunces text-base font-semibold text-slate-900 group-hover:text-blue-700 leading-tight">
                    {sailing.itinerary_name}
                  </h3>
                  <span className="flex-shrink-0 text-xs font-bold bg-navy-50 text-navy-800 border border-navy-200 px-2 py-1 rounded-full">
                    {score}
                  </span>
                </div>
                <dl className="space-y-1 text-sm text-slate-600 mb-4">
                  {sailing.ship && <div>{sailing.ship.name}</div>}
                  <div>{formatDate(sailing.sail_date)} · {sailing.length_nights} nights</div>
                  {sailing.departure_port && <div>From {sailing.departure_port.name}</div>}
                </dl>
                <div className="flex items-baseline justify-between border-t border-slate-100 pt-3">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wide text-slate-400">Inside from</span>
                    <span className="text-lg font-bold text-slate-900">
                      {formatPrice(sailing.current_inside_price ?? sailing.current_lowest_price)}
                    </span>
                    <span className="text-xs text-slate-500"> /person</span>
                  </div>
                  <span className="text-sm font-medium text-blue-600 group-hover:text-blue-800 flex items-center gap-1">
                    Details <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-slate-500">No sailings with inside-cabin pricing available right now.</p>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 text-center">
          <h2 className="font-fraunces text-xl md:text-2xl font-bold text-slate-900 mb-2">
            Want to know if a GTY rate is available?
          </h2>
          <p className="text-slate-600 mb-5">
            Restricted-rate availability changes daily and isn&apos;t always public. Send us the sailing
            you&apos;re interested in and we&apos;ll confirm what rate is open right now.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#1E3A5F] font-semibold px-6 py-3 rounded-lg hover:bg-yellow-300 transition-colors"
          >
            Request a Free Quote
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
