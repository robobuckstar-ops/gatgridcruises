import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, CreditCard, Star, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Best Credit Cards for Disney Cruises (2025) — Top Picks',
  description:
    'Compare the best credit cards for Disney cruise bookings, including Chase Ink, Capital One Spark, and Amex Business Platinum. Earn sign-up bonuses worth $1,000+ on your cruise.',
  keywords: [
    'best credit cards disney cruise',
    'chase ink business credit card',
    'capital one spark business',
    'amex business platinum cruise',
    'cruise credit card rewards',
  ],
}

interface CardProps {
  rank: number
  name: string
  issuer: string
  referralUrl: string
  signUpBonus: string
  bonusSpend: string
  annualFee: string
  rewardRate: string
  keyBenefits: string[]
  cruisePros: string[]
  bestFor: string
  badge?: string
}

function CreditCardCard({
  card,
}: {
  card: CardProps
}) {
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-slate-900 font-bold text-sm">
            {card.rank}
          </div>
          <div>
            <p className="text-white font-bold">{card.name}</p>
            <p className="text-slate-300 text-xs">{card.issuer}</p>
          </div>
        </div>
        {card.badge && (
          <span className="bg-yellow-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full">
            {card.badge}
          </span>
        )}
      </div>

      <div className="p-6">
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <p className="text-xs text-slate-500 mb-1">Sign-Up Bonus</p>
            <p className="font-bold text-green-700 text-sm">{card.signUpBonus}</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <p className="text-xs text-slate-500 mb-1">Annual Fee</p>
            <p className="font-bold text-blue-700 text-sm">{card.annualFee}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-3 text-center">
            <p className="text-xs text-slate-500 mb-1">Earn Rate</p>
            <p className="font-bold text-purple-700 text-sm">{card.rewardRate}</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Bonus Requirement
          </p>
          <p className="text-slate-700 text-sm">{card.bonusSpend}</p>
        </div>

        <div className="mb-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Key Benefits
          </p>
          <ul className="space-y-1.5">
            {card.keyBenefits.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Why It Works for Disney Cruises
          </p>
          <ul className="space-y-1.5">
            {card.cruisePros.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm text-slate-700">
                <Star className="h-3.5 w-3.5 text-yellow-500 flex-shrink-0 mt-0.5" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            <strong className="text-slate-700">Best for:</strong> {card.bestFor}
          </p>
          <a
            href={card.referralUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition text-sm whitespace-nowrap"
          >
            View Deal
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </div>
  )
}

const cards: CardProps[] = [
  {
    rank: 1,
    name: 'Chase Ink Business Preferred',
    issuer: 'Chase',
    referralUrl: 'https://www.referyourchasecard.com/226m/6ZT33F9TOQ',
    signUpBonus: '100,000 bonus points (~$1,250 value)',
    bonusSpend: 'Spend $8,000 in first 3 months',
    annualFee: '$95/year',
    rewardRate: '3x on travel, shipping, internet & phone',
    keyBenefits: [
      '3x points on travel purchases (including cruise fares)',
      'Points transfer 1:1 to United, Hyatt, Southwest, and more',
      '$1,000+ in sign-up bonus value through Chase travel portal',
      'Cell phone protection up to $1,000',
      'No foreign transaction fees',
      'Trip cancellation/interruption insurance',
    ],
    cruisePros: [
      'Cruise fares code as travel → 3x points on the biggest expense',
      '100k bonus = $1,250 toward future travel in Chase portal',
      'Trip cancellation coverage protects your cruise investment',
      'Transfer to United or Hyatt for high-value Disney port hotel stays',
    ],
    bestFor: 'Business owners who want maximum sign-up bonus on cruise fare',
    badge: '#1 Pick',
  },
  {
    rank: 2,
    name: 'Capital One Spark Miles for Business',
    issuer: 'Capital One',
    referralUrl: 'https://i.capitalone.com/JKlfRwN3f',
    signUpBonus: '50,000 miles (worth $500 in travel)',
    bonusSpend: 'Spend $4,500 in first 3 months',
    annualFee: '$95/year (waived first year)',
    rewardRate: '2x miles on every purchase',
    keyBenefits: [
      'Flat 2x miles on every purchase — no category tracking',
      'Miles redeem at 1¢ each for any travel purchase',
      'Transfer to 15+ travel partners including Air Canada and Turkish',
      'No foreign transaction fees',
      'Global Entry / TSA PreCheck credit ($100)',
      'Unlimited employee cards at no cost',
    ],
    cruisePros: [
      'Flat 2x on cruise fare, excursions, onboard shopping — no categories to optimize',
      'First-year fee waived — essentially free first year of rewards',
      'Redeem miles to wipe any travel charge, including Disney Cruise Line charges',
      'Partner transfers can yield 2–4¢/mile for first-class flights to cruise ports',
    ],
    bestFor: 'Business owners who want simple flat-rate rewards with no category complexity',
    badge: 'Best Simplicity',
  },
  {
    rank: 3,
    name: 'American Express Business Platinum',
    issuer: 'American Express',
    referralUrl:
      'https://americanexpress.com/en-us/referral/business-platinum-charge-card?ref=CRYSTSGCNM&XL=MIMNS',
    signUpBonus: '120,000 Membership Rewards points (~$1,200+ value)',
    bonusSpend: 'Spend $15,000 in first 3 months',
    annualFee: '$695/year',
    rewardRate: '5x on flights & prepaid hotels via Amex Travel; 1.5x on purchases over $5,000',
    keyBenefits: [
      '$695 annual fee offset by $500+ in annual credits (airline incidentals, Dell, etc.)',
      '1,500+ Global Lounge Collection airport lounges worldwide',
      '35% points rebate when booking first/biz class via Amex Travel',
      'Fine Hotels + Resorts with $100+ property credits and room upgrades',
      'Trip delay/cancellation/interruption insurance',
      'Baggage insurance up to $3,000',
    ],
    cruisePros: [
      '1.5x on the entire cruise fare if it exceeds $5,000 (common for families)',
      'Airport lounge access for pre-cruise travel days',
      'Hotel credits for pre/post cruise hotel stays at FHR properties',
      '120k sign-up bonus transfers to Delta, British Airways, ANA at 1:1',
    ],
    bestFor: 'Frequent travelers who can offset the annual fee with credits and value luxury perks',
    badge: 'Premium Pick',
  },
]

const comparisonRows = [
  {
    feature: 'Sign-Up Bonus Value',
    chase: '~$1,250',
    capOne: '~$500',
    amex: '~$1,200+',
  },
  {
    feature: 'Annual Fee',
    chase: '$95',
    capOne: '$95 (waived yr 1)',
    amex: '$695',
  },
  {
    feature: 'On Cruise Fare',
    chase: '3x points',
    capOne: '2x miles',
    amex: '1.5x (if $5k+)',
  },
  {
    feature: 'On Dining',
    chase: '1x',
    capOne: '2x',
    amex: '1x',
  },
  {
    feature: 'Foreign Transaction Fee',
    chase: 'None',
    capOne: 'None',
    amex: 'None',
  },
  {
    feature: 'Lounge Access',
    chase: 'None',
    capOne: 'None (Priority Pass available separately)',
    amex: 'Yes (1,500+ lounges)',
  },
  {
    feature: 'Trip Cancellation Insurance',
    chase: 'Yes',
    capOne: 'Limited',
    amex: 'Yes',
  },
]

export default function BestCruiseCreditCardsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-800 to-blue-900 py-14 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/travel-hacks"
            className="inline-flex items-center gap-1 text-blue-300 hover:text-white text-sm font-medium mb-6 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Travel Hacks
          </Link>

          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="h-5 w-5 text-yellow-400" />
            <span className="text-sm font-semibold text-yellow-400 uppercase tracking-wider">
              Credit Cards
            </span>
          </div>

          <h1 className="font-fraunces text-4xl md:text-5xl font-bold mb-4">
            Best Credit Cards for Disney Cruises
          </h1>

          <p className="text-lg text-blue-200 mb-8 max-w-2xl">
            The right credit card can cover $1,000+ of your Disney cruise cost through sign-up
            bonuses alone. Here are the top picks for 2025, with real referral links and honest
            pros and cons.
          </p>

          <div className="flex flex-wrap gap-6 text-sm">
            <div className="bg-white/10 rounded-lg px-4 py-3 text-center">
              <p className="text-2xl font-bold text-yellow-400">$1,250+</p>
              <p className="text-blue-200">Top bonus value</p>
            </div>
            <div className="bg-white/10 rounded-lg px-4 py-3 text-center">
              <p className="text-2xl font-bold text-yellow-400">3</p>
              <p className="text-blue-200">Cards compared</p>
            </div>
            <div className="bg-white/10 rounded-lg px-4 py-3 text-center">
              <p className="text-2xl font-bold text-yellow-400">$0</p>
              <p className="text-blue-200">Cost to compare</p>
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

        {/* Card listings */}
        <section className="space-y-8 mb-14">
          {cards.map((card) => (
            <CreditCardCard key={card.name} card={card} />
          ))}
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
        <section className="bg-blue-50 rounded-xl p-8 mb-14 border border-blue-100">
          <h2 className="font-fraunces text-2xl font-bold text-slate-900 mb-4">
            The Smart Strategy: Stack Multiple Cards
          </h2>
          <p className="text-slate-700 mb-4">
            You don't have to pick just one. Many savvy cruisers use a two-card approach:
          </p>
          <ol className="space-y-3 text-slate-700">
            <li className="flex gap-3">
              <span className="bg-blue-600 text-white font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
              <span>Apply for <strong>Chase Ink Preferred</strong> and put the full cruise fare on it (3x on travel + 100k bonus).</span>
            </li>
            <li className="flex gap-3">
              <span className="bg-blue-600 text-white font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
              <span>Use <strong>Amex Business Platinum</strong> for any pre/post-cruise hotel stays through Amex Travel (5x points + fine hotel credits).</span>
            </li>
            <li className="flex gap-3">
              <span className="bg-blue-600 text-white font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
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
            <a
              key={card.name}
              href={card.referralUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="block text-center p-5 border-2 border-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition group"
            >
              <p className="font-bold text-slate-900 group-hover:text-white text-sm mb-1">
                {card.name}
              </p>
              <p className="text-blue-600 group-hover:text-white font-semibold text-lg">
                {card.signUpBonus.split(' ').slice(0, 2).join(' ')}
              </p>
              <p className="text-blue-700 group-hover:text-blue-100 text-xs mt-2">
                View Deal →
              </p>
            </a>
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

        {/* Disclosure */}
        <section className="pt-8 border-t border-slate-200">
          <div className="bg-amber-50 rounded-lg p-5 border border-amber-200">
            <h3 className="font-semibold text-slate-900 mb-1 text-sm">Affiliate Disclosure</h3>
            <p className="text-xs text-slate-600">
              This page contains referral links to credit card offers. We may earn a commission if
              you apply through our links. Rates, bonuses, and terms change frequently — always
              verify current offers on the issuer's website before applying. Approval is not
              guaranteed and depends on individual creditworthiness. We only feature cards we
              believe offer genuine value for cruise travelers.
            </p>
          </div>
        </section>
      </article>
    </div>
  )
}
