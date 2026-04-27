import { Metadata } from 'next'
import Link from 'next/link'
import {
  DollarSign,
  AlertCircle,
  Check,
  ArrowRight,
  Info,
  ChevronRight,
  TrendingDown,
  Users,
} from 'lucide-react'
import { GetQuoteCTA } from '@/components/get-quote-cta'

export const metadata: Metadata = {
  title: 'Disney Cruise Excursion Savings Guide — Book Direct vs. DCL',
  description:
    'How to save on Disney cruise shore excursions: booking direct vs through DCL, child discounts, port-by-port tips, and insider tricks to stretch your budget at every stop.',
  openGraph: {
    title: 'Disney Cruise Excursion Savings Guide',
    description:
      'Compare booking excursions through Disney vs. direct, understand child discounts, and find the best deals port by port.',
    url: 'https://gatgridcruises.com/guides/excursion-savings',
    images: [
      { url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'GatGridCruises Excursion Savings Guide' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Disney Cruise Excursion Savings Guide',
    description: 'Book direct vs. DCL, child discounts, and port-by-port savings tips.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

const COMPARISON_ROWS = [
  {
    factor: 'Price',
    dcl: 'Premium pricing — typically 20–40% more than booking direct',
    direct: 'Lower rates, especially for popular tours with established operators',
    winner: 'direct',
  },
  {
    factor: 'Ship-Wait Guarantee',
    dcl: 'If the tour runs late, the ship will wait for you',
    direct: 'No guarantee — you must return to the ship on time yourself',
    winner: 'dcl',
  },
  {
    factor: 'Child Discounts',
    dcl: 'DCL shows "child" pricing (usually under 3 free, ages 3–9 discounted)',
    direct: 'Many operators charge a flat rate or have generous under-12 free policies',
    winner: 'varies',
  },
  {
    factor: 'Booking Window',
    dcl: 'Opens during your online check-in window (75–120 days out depending on category)',
    direct: 'Book anytime — often available up to departure day',
    winner: 'direct',
  },
  {
    factor: 'Cancellation Policy',
    dcl: 'Cancel up to 72 hours before for a full refund to your onboard account',
    direct: 'Varies by operator — many offer free cancellation, some are nonrefundable',
    winner: 'dcl',
  },
  {
    factor: 'Quality / Experience',
    dcl: 'Disney-vetted operators, consistent quality, clear expectations',
    direct: 'Ranges from excellent to mediocre — research required',
    winner: 'dcl',
  },
  {
    factor: 'Group Size',
    dcl: 'Often large bus tours (30–50 guests)',
    direct: 'Small-group operators available for a more personalized experience',
    winner: 'varies',
  },
  {
    factor: 'OBC Usability',
    dcl: 'You can pay with onboard credit',
    direct: 'Must pay out of pocket (credit card or cash)',
    winner: 'dcl',
  },
]

const PORT_TIPS = [
  {
    port: 'Nassau, Bahamas',
    flag: '🇧🇸',
    slug: 'nassau',
    tips: [
      'Atlantis day pass is significantly cheaper booked directly through Atlantis.com — often $30–$50 less per person vs. DCL price.',
      'Blue Lagoon Island (private ferry) is best booked direct — DCL marks it up substantially.',
      'Beach chairs on Cable Beach are free or a small local vendor fee — no excursion needed.',
      'Child discounts: Nassau operators typically charge 50% for kids under 12. Compare per-person totals — a family of 4 often saves $80–$150 booking direct.',
    ],
    watchout:
      'For water-based excursions (snorkeling, swimming pigs), verify small-group operators on TripAdvisor before booking. Quality varies widely.',
  },
  {
    port: 'Cozumel, Mexico',
    flag: '🇲🇽',
    slug: 'cozumel',
    tips: [
      "Snorkeling at Palancar Reef is world-class. Local dive shops charge $40–$60 vs. DCL's $80–$120 for equivalent trips.",
      'Mr. Sanchos and Nachi Cocom beach clubs offer all-inclusive day access — book direct online for 15–20% off vs. DCL price.',
      "Tulum and Chichén Itzá day trips are cheaper through local operators, but these are long drives — only book if you're confident in the timeline.",
      'Under-12 discounts are standard with local operators — often 50% off adult price or free under 4.',
    ],
    watchout:
      'Build in extra time for Cozumel. The ferry to the mainland and island traffic can eat into your schedule — leave a 90-minute buffer before all-aboard.',
  },
  {
    port: 'Castaway Cay',
    flag: '🏝️',
    slug: undefined,
    tips: [
      "This is Disney's private island — DCL runs all activities here. No independent operators exist.",
      'Bike and snorkel rentals are available for purchase using onboard credit — no need to pre-book.',
      'The tram is free and runs continuously. Families with strollers should grab the first tram to beat the crowds.',
      "Cookies BBQ opens around 11am — arrive early. It's included in your cruise fare and genuinely excellent.",
    ],
    watchout: null,
  },
  {
    port: 'Port Canaveral, FL',
    flag: '🇺🇸',
    slug: 'port-canaveral',
    tips: [
      'Kennedy Space Center is $75–$85/adult if booked direct at kennedyspacecenter.com vs. $100+ through DCL.',
      'Children under 3 are free at KSC direct. Ages 3–11 are about $55 direct — DCL\'s "child" price is typically higher.',
      'Cocoa Beach is walkable or a short rideshare from the port — free beach day with no excursion needed.',
      'Ron Jon Surf Shop is walking distance from Jetty Park — great for souvenir shopping without a tour.',
    ],
    watchout:
      'KSC requires at least 4 hours to do justice. If you have a short port day, skip it and save for a dedicated visit.',
  },
]

const CHILD_DISCOUNT_GUIDE = [
  {
    ageRange: 'Under 3',
    dcl: 'Free on most excursions',
    direct: 'Almost always free',
    note: 'Lap child policies apply for most water/boat tours',
  },
  {
    ageRange: 'Ages 3–9',
    dcl: 'Reduced child rate (typically 60–70% of adult)',
    direct: 'Often 50% of adult or free under 6 — varies by operator',
    note: 'Direct can be significantly better for this age group',
  },
  {
    ageRange: 'Ages 10–17',
    dcl: 'Usually adult pricing starts at 10',
    direct: 'Many operators have "junior" rate through 12, adult rate at 13+',
    note: 'Check the cutoff age carefully — can save $20–$40/child',
  },
  {
    ageRange: 'Adults 18+',
    dcl: 'Standard adult rate',
    direct: 'Same adult rate, usually lower base price',
    note: 'Direct savings compound with group size',
  },
]

export default function ExcursionSavingsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-[#1E3A5F] to-slate-900 py-16 md:py-24 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-sm font-semibold mb-6">
            <TrendingDown className="w-4 h-4" aria-hidden="true" />
            Save $100–$300 on a family of 4
          </div>
          <h1 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Port Excursion Savings Guide
          </h1>
          <p className="text-blue-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            The real cost difference between booking excursions through Disney vs. direct — and exactly
            how to decide port by port.
          </p>
        </div>
      </section>

      {/* Quick summary */}
      <section className="bg-[#D4AF37]/10 border-y border-[#D4AF37]/30 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-fraunces font-bold text-[#1E3A5F]">20–40%</div>
              <div className="text-sm text-slate-600 mt-1">Average DCL markup vs. booking direct</div>
            </div>
            <div>
              <div className="text-3xl font-fraunces font-bold text-[#1E3A5F]">$150–$300</div>
              <div className="text-sm text-slate-600 mt-1">Typical family-of-4 savings per port day</div>
            </div>
            <div>
              <div className="text-3xl font-fraunces font-bold text-[#1E3A5F]">1 rule</div>
              <div className="text-sm text-slate-600 mt-1">Always book DCL when the timeline is tight</div>
            </div>
          </div>
        </div>
      </section>

      {/* The big tradeoff */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-slate-900 mb-6 text-center">
            The one thing you need to know first
          </h2>

          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 mb-10">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-[#D4AF37] flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-lg mb-2 text-[#D4AF37]">
                  The ship-wait guarantee is real — and it matters
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  When you book through Disney Cruise Line, if your excursion runs late, the ship will
                  not leave without you. When you book direct, the ship will leave on schedule — and
                  you&apos;ll be responsible for flying to the next port at your own expense. This guarantee
                  alone justifies DCL pricing for tight itineraries, tender ports, or any tour that cuts
                  close to all-aboard time.
                </p>
              </div>
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed mb-4">
            With that caveat clearly stated: in most cases, booking excursions independently will save a
            family of four <strong>$100–$300 per port day</strong>. Over a 7-night Caribbean itinerary
            with three port stops, that&apos;s potentially{' '}
            <strong>$300–$900 back in your pocket</strong> — money that can cover a specialty dinner, spa
            credits, or your next cruise deposit.
          </p>
          <p className="text-slate-600 leading-relaxed">
            The key is knowing which ports and tour types warrant the DCL premium vs. where booking
            direct is a no-brainer.
          </p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-slate-900 text-center mb-10">
            DCL vs. booking direct: factor by factor
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1E3A5F] text-white">
                  <th className="text-left px-5 py-3.5 font-semibold w-36">Factor</th>
                  <th className="text-left px-5 py-3.5 font-semibold">Through DCL</th>
                  <th className="text-left px-5 py-3.5 font-semibold">Booking Direct</th>
                  <th className="text-left px-5 py-3.5 font-semibold w-28">Edge</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.factor} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-5 py-4 font-semibold text-slate-900 align-top">{row.factor}</td>
                    <td className="px-5 py-4 text-slate-600 align-top leading-relaxed">{row.dcl}</td>
                    <td className="px-5 py-4 text-slate-600 align-top leading-relaxed">{row.direct}</td>
                    <td className="px-5 py-4 align-top">
                      {row.winner === 'dcl' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
                          <Check className="h-3 w-3" aria-hidden="true" /> DCL
                        </span>
                      )}
                      {row.winner === 'direct' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                          <Check className="h-3 w-3" aria-hidden="true" /> Direct
                        </span>
                      )}
                      {row.winner === 'varies' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold">
                          Varies
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Child discounts */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Child discount breakdown
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              DCL and independent operators handle child pricing differently. For families, this is often
              the biggest source of direct-booking savings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CHILD_DISCOUNT_GUIDE.map(row => (
              <div key={row.ageRange} className="p-5 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-4 w-4 text-[#1E3A5F]" aria-hidden="true" />
                  <span className="font-bold text-slate-900">{row.ageRange}</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-semibold w-12 flex-shrink-0">DCL:</span>
                    <span className="text-slate-600">{row.dcl}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-600 font-semibold w-12 flex-shrink-0">Direct:</span>
                    <span className="text-slate-600">{row.direct}</span>
                  </div>
                  {row.note && (
                    <div className="flex items-start gap-2 pt-1 border-t border-slate-100">
                      <Info className="h-3.5 w-3.5 text-amber-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-slate-500 text-xs">{row.note}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
            <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-sm text-amber-900">
              <span className="font-semibold">Pro tip:</span> Always calculate the total family cost,
              not just per-person. A tour that appears cheaper per adult can still cost more for a family
              of 5 if the direct operator has a better under-12 policy.
            </p>
          </div>
        </div>
      </section>

      {/* Port-by-port tips */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-slate-900 text-center mb-10">
            Port-by-port savings guide
          </h2>

          <div className="space-y-8">
            {PORT_TIPS.map(port => (
              <div key={port.port} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="bg-[#1E3A5F] px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" aria-hidden="true">{port.flag}</span>
                    <h3 className="font-fraunces text-lg font-bold text-white">{port.port}</h3>
                  </div>
                  {port.slug && (
                    <Link
                      href={`/guides/ports/${port.slug}`}
                      className="text-[#D4AF37] text-sm font-semibold hover:text-yellow-300 transition-colors flex items-center gap-1"
                    >
                      Port guide
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  )}
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {port.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <DollarSign
                          className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <p className="text-slate-600 text-sm leading-relaxed">{tip}</p>
                      </li>
                    ))}
                  </ul>
                  {port.watchout && (
                    <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
                      <AlertCircle
                        className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <p className="text-xs text-amber-900">
                        <span className="font-semibold">Watch out:</span> {port.watchout}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert strategies */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-slate-900 text-center mb-10">
            Expert booking strategies
          </h2>
          <div className="space-y-6">
            {[
              {
                num: '1',
                title: 'Use OBC for DCL excursions, save cash for direct bookings',
                body: 'Onboard credit can only be spent onboard — so it makes sense to use it for DCL excursions (water sports, character meets, etc.) and pay cash for direct bookings where you save the most.',
              },
              {
                num: '2',
                title: 'Book high-demand DCL tours early, comparison shop the rest',
                body: "DCL character excursions, popular water park passes, and private island snorkel tours sell out. Book these through DCL the moment your window opens. For beach clubs and sightseeing, shop direct.",
              },
              {
                num: '3',
                title: 'Check TripAdvisor reviews before any independent operator',
                body: "Search the operator name on TripAdvisor and filter for reviews from cruise passengers specifically. An operator that's great for hotel guests may have different departure logistics for cruise schedules.",
              },
              {
                num: '4',
                title: 'Call ahead to confirm ship schedule awareness',
                body: "Independent operators don't always know which ships are in port. Call or email them with your sail date and ship name and ask them to confirm they're aware of your all-aboard time.",
              },
              {
                num: '5',
                title: 'Build a 90-minute buffer at minimum',
                body: "Disney's all-aboard time is typically 30–60 minutes before departure. Build in 90 minutes of cushion to account for traffic, crowds, and unexpected delays. If a direct tour can't guarantee this, book through DCL.",
              },
            ].map(({ num, title, body }) => (
              <div key={num} className="flex gap-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1E3A5F] flex items-center justify-center">
                  <span className="text-[#D4AF37] font-bold text-sm">{num}</span>
                </div>
                <div className="pt-1.5">
                  <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related guides */}
      <section className="bg-slate-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-2xl font-bold text-slate-900 mb-6">Related guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                href: '/guides/ports',
                label: 'All Port Guides',
                desc: 'Detailed breakdowns for every Disney cruise port',
              },
              {
                href: '/guides/castaway-cay-guide',
                label: 'Castaway Cay Guide',
                desc: "What to do on Disney's private island",
              },
              {
                href: '/tools/obc-calculator',
                label: 'OBC Calculator',
                desc: 'Calculate your onboard credit and how to spend it',
              },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:border-[#1E3A5F]/40 transition-colors group"
              >
                <div>
                  <div className="font-semibold text-slate-900 text-sm">{link.label}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{link.desc}</div>
                </div>
                <ChevronRight
                  className="h-4 w-4 text-slate-400 group-hover:text-[#1E3A5F] transition-colors flex-shrink-0"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <GetQuoteCTA />
    </main>
  )
}
