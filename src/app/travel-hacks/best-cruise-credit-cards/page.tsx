import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Best Business Credit Cards for Disney Cruises 2026 | GatGridCruises',
  description:
    'Compare the best business credit cards for Disney cruise bookings. Chase Ink, Capital One Spark, and Amex Business Platinum — earn points, get trip insurance, and save on your next cruise.',
  openGraph: {
    title: 'Best Business Credit Cards for Disney Cruises 2026',
    description:
      'Chase Ink vs Capital One Spark vs Amex Business Platinum — which business card earns the most on Disney cruise bookings?',
    type: 'article',
  },
}

const cards = [
  {
    id: 'chase-ink',
    name: 'Chase Ink Business Preferred',
    badge: 'Best for Points',
    badgeColor: 'blue',
    annualFee: '$95',
    earningRate: '3x on travel, shipping, internet, & phone',
    signupBonus: '90,000 points after $8,000 spend in 3 months (~$1,125 value)',
    referralUrl: '/concierge',
    highlights: [
      '3x Ultimate Rewards points on travel (including cruise bookings)',
      'Points transfer 1:1 to United, Hyatt, Southwest, and more',
      'Primary rental car insurance — no need to buy from the rental desk',
      'Trip cancellation / interruption insurance up to $5,000 per trip',
      'Cell phone protection (pay your bill with the card)',
      'No foreign transaction fees',
    ],
    bestFor: 'Business owners who travel regularly and want maximum flexibility with points',
    cruiseTip:
      'Book your Disney cruise with the Chase Ink and earn 3x points on the entire fare. A $5,000 cruise earns 15,000 points (~$187 in travel value). Then redeem points through Chase Travel or transfer to an airline partner.',
    pros: ['Massive signup bonus', '3x on travel is unbeatable for business cards', 'Best transfer partners in the game', 'Excellent trip insurance'],
    cons: ['$8,000 spend requirement for bonus', 'Points are most valuable when transferred (takes some learning)'],
  },
  {
    id: 'capital-one-spark',
    name: 'Capital One Spark Cash Plus',
    badge: 'Best for Simplicity',
    badgeColor: 'emerald',
    annualFee: '$150 (rebated if you spend $150K+)',
    earningRate: '2% unlimited cash back on everything',
    signupBonus: 'Up to $1,000 cash back — $500 at $5K, $500 more at $50K in first 6 months',
    referralUrl: '/concierge',
    highlights: [
      'Flat 2% cash back on every purchase — no categories to track',
      'No spending caps or limits on cash back',
      'Extended warranty on purchases',
      'Free employee cards at no additional cost',
      'No foreign transaction fees',
      'Travel accident insurance included',
    ],
    bestFor: 'Business owners who want dead-simple, predictable rewards without managing categories',
    cruiseTip:
      'A $5,000 Disney cruise earns you $100 cash back automatically. Not as flashy as points, but dead simple. Use it for everything — flights, excursions, onboard spending — and let the 2% stack up.',
    pros: ['Zero complexity — 2% on everything', 'No annual fee with enough spend', 'Great for high-volume businesses', 'No confusing categories'],
    cons: ['Lower ceiling than points cards for savvy travelers', 'Missing premium travel perks like lounge access'],
  },
  {
    id: 'amex-business-platinum',
    name: 'American Express Business Platinum',
    badge: 'Best for Luxury Travel',
    badgeColor: 'purple',
    annualFee: '$695',
    earningRate: '5x on flights & hotels booked via Amex Travel; 1.5x on purchases $5K+',
    signupBonus: '150,000 Membership Rewards points after $20,000 spend in first 3 months',
    referralUrl: '/concierge',
    highlights: [
      '$200 airline fee credit per year (incidental fees)',
      '$189 CLEAR Plus credit per year',
      '$100 Global Entry or TSA PreCheck credit',
      'Priority Pass Select lounge access (1,300+ lounges)',
      'Centurion Lounge access at select airports',
      'Trip cancellation / interruption insurance',
      '5x Membership Rewards on flights booked via Amex Travel',
      'No preset spending limit — charge large cruise fares easily',
      '35% airline bonus when you Pay with Points on flights',
    ],
    bestFor: 'Frequent travelers who want premium airport lounge access and maximum points on big-ticket purchases',
    cruiseTip:
      'The Business Platinum earns 1.5x Membership Rewards on a single purchase of $5,000+. A Disney cruise often qualifies. Pair this with the signup bonus (150K points ≈ $1,500+ in travel) and the lounge access before flying to your cruise port — it\'s a genuinely luxurious pre-cruise experience.',
    pros: ['Best airport lounge access available', 'Huge signup bonus', 'Strong travel protections', '5x on airfare', 'No preset spending limit for large purchases'],
    cons: ['$695 annual fee requires active use to justify', 'High spend requirement for bonus', 'Not ideal if you don\'t fly frequently'],
  },
]

const badgeColors: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-700',
  emerald: 'bg-emerald-100 text-emerald-700',
  purple: 'bg-purple-100 text-purple-700',
}

const comparisonRows = [
  { feature: 'Annual Fee', chase: '$95', capOne: '$150 (refunded at $150K+ spend)', amex: '$695' },
  { feature: 'Sign-Up Bonus', chase: '90,000 UR pts (~$1,125)', capOne: 'Up to $1,000 cash', amex: '150,000 MR pts' },
  { feature: 'Cruise Earning Rate', chase: '3x on travel', capOne: '2% flat', amex: '1.5x on $5K+ charges' },
  { feature: 'Trip Cancellation Coverage', chase: 'Up to $5,000/trip', capOne: 'Included', amex: 'Included' },
  { feature: 'No Foreign Transaction Fee', chase: '✓', capOne: '✓', amex: '✓' },
  { feature: 'Lounge Access', chase: '—', capOne: '—', amex: 'Priority Pass + Centurion' },
  { feature: 'Transfer Partners', chase: 'United, Hyatt, SW…', capOne: '—', amex: 'Delta, Marriott…' },
]

export default function BestCruiseCreditCardsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0a1628] to-[#1E3A5F] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-sm text-slate-400 mb-3 font-medium">Travel Hacks · Credit Cards</div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Best Business Credit Cards for Disney Cruises (2025)
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
            The right business card can offset hundreds or thousands of dollars on your Disney cruise.
            We compared the top three — here&apos;s exactly how each one helps.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-slate-200 text-sm">
              ✓ 3 cards compared
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-slate-200 text-sm">
              ✓ Cruise expert tips
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-slate-200 text-sm">
              ✓ Cruise-specific tips
            </div>
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Intro */}
        <section className="prose prose-slate max-w-none mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">
            Why a Credit Card Sign-Up Bonus Changes the Math
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            A Disney cruise for a family of 4 typically runs $5,000–$12,000. That's a huge spend —
            and the right credit card can earn you $500–$1,500 in travel value on that spend alone,
            not counting the sign-up bonus. Stack the bonus on top and your effective discount can
            reach 20%+ of your cruise cost.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            The key is timing: apply for the card 1–2 months before you pay the balance on your
            Disney cruise, then use it for all pre-cruise spend (hotels, flights, excursion
            deposits) to hit the minimum spend requirement. Points earned stack directly on top of
            the sign-up bonus.
          </p>
        </section>


        {/* Comparison table */}
        <section className="mb-14">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-6">
            Side-by-Side Comparison
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="text-left px-4 py-3 text-slate-600 font-semibold">Feature</th>
                  <th className="text-center px-4 py-3 text-slate-900 font-bold">Chase Ink</th>
                  <th className="text-center px-4 py-3 text-slate-900 font-bold">Cap One Spark</th>
                  <th className="text-center px-4 py-3 text-slate-900 font-bold">Amex Biz Plat</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                  >
                    <td className="px-4 py-3 text-slate-700 font-medium">{row.feature}</td>
                    <td className="px-4 py-3 text-center text-slate-700">{row.chase}</td>
                    <td className="px-4 py-3 text-center text-slate-700">{row.capOne}</td>
                    <td className="px-4 py-3 text-center text-slate-700">{row.amex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Strategy */}
        <section className="bg-slate-50 rounded-xl p-8 mb-14 border border-slate-200">
          <h2 className="font-fraunces text-2xl font-bold text-slate-900 mb-4">
            The Smart Strategy: Stack Multiple Cards
          </h2>
          <p className="text-slate-700 mb-4">
            You don't have to pick just one. Many savvy cruisers use a two-card approach:
          </p>
          <ol className="space-y-3 text-slate-700">
            <li className="flex gap-3">
              <span className="bg-[#1E3A5F] text-white font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
              <span>Apply for <strong>Chase Ink Preferred</strong> and put the full cruise fare on it (3x on travel + 100k bonus).</span>
            </li>
            <li className="flex gap-3">
              <span className="bg-[#1E3A5F] text-white font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
              <span>Use <strong>Amex Business Platinum</strong> for any pre/post-cruise hotel stays through Amex Travel (5x points + fine hotel credits).</span>
            </li>
            <li className="flex gap-3">
              <span className="bg-[#1E3A5F] text-white font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
              <span>Keep <strong>Capital One Spark</strong> as a backup for all miscellaneous spend (2x on everything, no annual fee year one).</span>
            </li>
          </ol>
          <p className="text-slate-600 text-sm mt-4">
            Combined bonus value: up to $2,750+ — more than many families spend on a 4-night cruise.
          </p>
        </section>

        {/* CTAs */}
        <section className="grid sm:grid-cols-3 gap-4 mb-14">
          {cards.map((card) => (
            <Link
              key={card.name}
              href={card.referralUrl}
              className="block text-center p-5 border-2 border-[#1E3A5F] rounded-xl hover:bg-[#1E3A5F] hover:text-white transition group"
            >
              <p className="font-bold text-slate-900 group-hover:text-white text-sm mb-1">
                {card.name}
              </p>
              <p className="text-[#1E3A5F] group-hover:text-[#D4AF37] font-semibold text-lg">
                {card.signupBonus.split(' ').slice(0, 2).join(' ')}
              </p>
              <p className="text-slate-600 group-hover:text-white text-xs mt-2">
                Learn More →
              </p>
            </Link>
          ))}
        </section>

        {/* Related guides */}
        <section className="bg-slate-50 rounded-lg p-8 mb-10">
          <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-5">
            More Travel Hacks
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              ['/travel-hacks/best-cards-for-cruises', 'Best Cards for Cruise Purchases'],
              ['/travel-hacks/stack-points-free-cruise', 'Stack Points for a Free Cruise'],
              ['/travel-hacks/free-trip-insurance', 'Free Trip Insurance You Already Have'],
              ['/travel-hacks/fly-free-to-cruise-port', 'How to Fly Free to Your Cruise Port'],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-sm transition"
              >
                <span className="font-medium text-slate-900 text-sm">{label}</span>
                <span className="text-blue-600 text-sm">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Comparison table */}
        <section className="mt-10 overflow-x-auto">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">Quick Comparison</h2>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="text-left p-3 font-semibold rounded-tl-lg">Card</th>
                <th className="text-left p-3 font-semibold">Annual Fee</th>
                <th className="text-left p-3 font-semibold">Earning Rate</th>
                <th className="text-left p-3 font-semibold rounded-tr-lg">Best For</th>
              </tr>
            </thead>
            <tbody>
              {cards.map((card, i) => (
                <tr key={card.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="p-3 font-medium text-slate-900">{card.name}</td>
                  <td className="p-3 text-slate-600">{card.annualFee}</td>
                  <td className="p-3 text-slate-600">{card.earningRate}</td>
                  <td className="p-3 text-slate-600">{card.bestFor.split(' ').slice(0, 6).join(' ')}…</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Card deep dives */}
        <div className="mt-12 space-y-12">
          {cards.map((card) => (
            <section key={card.id} id={card.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              {/* Card header */}
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${badgeColors[card.badgeColor]}`}>
                      {card.badge}
                    </span>
                    <h2 className="font-display text-2xl font-bold text-slate-900">{card.name}</h2>
                    <p className="text-slate-500 text-sm mt-1">Annual fee: <span className="font-semibold text-slate-700">{card.annualFee}</span></p>
                  </div>
                  <a
                    href={card.referralUrl}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1E3A5F] hover:bg-[#2a4f7a] text-white font-semibold text-sm transition-colors whitespace-nowrap"
                  >
                    Learn More →
                  </a>
                </div>

                {/* Signup bonus */}
                <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">Welcome Offer</div>
                  <p className="font-semibold text-amber-900">{card.signupBonus}</p>
                </div>
              </div>

              <div className="p-6 grid md:grid-cols-2 gap-6">
                {/* Highlights */}
                <div>
                  <h3 className="font-semibold text-slate-800 mb-3">Key Benefits</h3>
                  <ul className="space-y-2">
                    {card.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="text-[#1E3A5F] mt-0.5 flex-shrink-0">✓</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pros/Cons */}
                <div>
                  <div className="mb-4">
                    <h3 className="font-semibold text-slate-800 mb-2">Pros</h3>
                    <ul className="space-y-1.5">
                      {card.pros.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-sm text-emerald-700">
                          <span className="flex-shrink-0">+</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">Cons</h3>
                    <ul className="space-y-1.5">
                      {card.cons.map((c) => (
                        <li key={c} className="flex items-start gap-2 text-sm text-red-600">
                          <span className="flex-shrink-0">−</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Cruise tip */}
              <div className="px-6 pb-6">
                <div className="p-4 bg-[#1E3A5F]/5 border border-[#1E3A5F]/20 rounded-lg">
                  <div className="text-xs font-semibold text-[#1E3A5F] uppercase tracking-wide mb-1">⚓ Cruise Strategy</div>
                  <p className="text-sm text-slate-700">{card.cruiseTip}</p>
                </div>
              </div>

              {/* CTA */}
              <div className="px-6 pb-6">
                <a
                  href={card.referralUrl}
                  className="block w-full text-center py-3 rounded-lg bg-[#1E3A5F] hover:bg-[#2a4f7a] text-white font-semibold transition-colors"
                >
                  Plan Your Disney Cruise →
                </a>
              </div>
            </section>
          ))}
        </div>

        {/* How points offset cruise costs */}
        <section className="mt-14 bg-slate-900 text-white rounded-2xl p-8">
          <h2 className="font-display text-2xl font-bold mb-2">How Points & Cash Back Offset Cruise Costs</h2>
          <p className="text-slate-300 mb-6 text-sm">Here&apos;s what a typical Disney cruise booking could earn you with each card:</p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { card: 'Chase Ink Preferred', scenario: '$5,000 cruise booking', earn: '15,000 UR points', value: '~$187–225 in travel', note: 'At 1.25–1.5¢/pt through Chase Travel' },
              { card: 'Capital One Spark', scenario: '$5,000 cruise booking', earn: '$100 cash back', value: '$100 direct cash', note: 'Simple, automatic, no redemption needed' },
              { card: 'Amex Biz Platinum', scenario: '$5,000 cruise booking', earn: '7,500 MR points', value: '~$75–150 in travel', note: '+signup bonus of 150K points is the real value here' },
            ].map((row) => (
              <div key={row.card} className="bg-white/10 rounded-xl p-4">
                <div className="text-xs text-slate-400 mb-1">{row.card}</div>
                <div className="text-xs text-slate-400 mb-2">{row.scenario}</div>
                <div className="font-bold text-white text-lg">{row.earn}</div>
                <div className="text-emerald-400 font-semibold text-sm">{row.value}</div>
                <div className="text-slate-400 text-xs mt-1">{row.note}</div>
              </div>
            ))}
          </div>
          <p className="text-slate-400 text-xs mt-6">
            Point values are estimates. Actual redemption value varies based on how you redeem.
            Transfer partners and premium redemptions often yield the highest value.
          </p>
        </section>

        {/* FAQ */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Can I pay my Disney cruise with a business credit card?',
                a: 'Yes. Disney Cruise Line accepts all major credit cards, including business cards. There\'s no restriction — business cards earn the same rewards as if you were buying office supplies.',
              },
              {
                q: 'Do business credit cards affect my personal credit score?',
                a: 'Usually no. Most business cards report only to business credit bureaus, not personal ones. Chase and Capital One business cards typically don\'t appear on your personal credit report after approval.',
              },
              {
                q: 'Which card has the best trip insurance for cruises?',
                a: 'Chase Ink Business Preferred includes trip cancellation/interruption insurance up to $5,000 per trip when you pay with the card. The Amex Business Platinum also includes robust travel protections. Both are significantly better than buying DCL\'s own cruise insurance.',
              },
              {
                q: 'What counts as a "business" for these cards?',
                a: 'Broadly, almost anything you do for profit. Freelancing, consulting, selling on eBay, driving for Uber, photography — if you earn any self-employment income, you likely qualify. You don\'t need a registered LLC.',
              },
              {
                q: 'Should I get one card or multiple?',
                a: 'For cruisers: start with Chase Ink for the points + trip insurance. Add the Capital One Spark later for its simplicity on everyday purchases. Space applications 3+ months apart to maximize approval odds.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="p-5 bg-white rounded-xl border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">{q}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal links */}
        <section className="mt-12 bg-slate-50 border border-slate-200 rounded-xl p-6">
          <h2 className="font-display text-lg font-bold text-slate-900 mb-3">More Travel Hacks</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: 'Fly Free to Your Cruise Port', href: '/travel-hacks/fly-free-to-cruise-port' },
              { label: 'Free Trip Insurance with Your Card', href: '/travel-hacks/free-trip-insurance' },
              { label: 'Stack Points for a Free Cruise', href: '/travel-hacks/stack-points-free-cruise' },
              { label: 'Cruise Port Lounge Access', href: '/travel-hacks/cruise-port-lounge-access' },
              { label: 'Compare All Cards', href: '/travel-hacks/compare-cards' },
              { label: 'All Travel Hacks', href: '/travel-hacks' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 text-sm text-[#1E3A5F] hover:text-[#2a4f7a] font-medium"
              >
                → {link.label}
              </Link>
            ))}
          </div>
        </section>

      </article>
    </div>
  )
}
