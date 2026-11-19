
import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Clock, Tag, HelpCircle } from 'lucide-react'
import { CreditCardRecommendation } from '@/components/ui/credit-card-recommendation'
import { getCardBySlug } from '@/lib/credit-card-config'
import { StructuredData } from '@/components/ui/structured-data'
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/structured-data'

const UPDATED = 'November 10, 2026'

export const metadata: Metadata = {
  alternates: { canonical: '/travel-hacks/best-cards-for-cruises' },
  title: { absolute: 'Best Credit Card for Cruise Purchases (Nov 2026)' },
  description:
    'The best credit card for cruise purchases in 2026: which cards earn bonus points on cruise fares and onboard charges, and which popular cards earn just 1x.',
  keywords: [
    'best credit card for cruise purchases',
    'best credit card for cruises',
    'best credit card for disney cruise',
    'cruise rewards credit card',
    'credit card points cruise',
  ],
  openGraph: {
    title: 'Best Credit Card for Cruise Purchases (Nov 2026)',
    description:
      'Which cards earn bonus points on cruise fares and onboard charges, and which popular cards earn just 1x.',
    url: 'https://gatgridcruises.com/travel-hacks/best-cards-for-cruises',
    images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'GatGridCruises' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Credit Card for Cruise Purchases (Nov 2026)',
    description: 'Which cards earn bonus points on cruise fares and onboard charges, and which earn just 1x.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

/** Rendered on the page and emitted as FAQPage schema from the same array. */
const FAQS = [
  {
    question: 'What is the best credit card for cruise purchases?',
    answer:
      'For most cruisers, the Chase Sapphire Preferred ($95 annual fee) is the best all-round pick: cruise lines count in its 2x travel category, and cruises booked through Chase Travel earn 5x. If you want one card that earns the same rate on everything, including onboard charges, the Capital One Venture X earns 2x miles on all purchases. Business owners can look at the Chase Ink Business Preferred, which earns 3x on travel.',
  },
  {
    question: 'Does the Chase Sapphire Reserve still earn 3x on cruises?',
    answer:
      'No. Since Chase refreshed the Sapphire Reserve in June 2025, cruises booked directly with the cruise line earn 1x. Cruises booked through Chase Travel earn 8x. The annual fee is now $795.',
  },
  {
    question: 'Is the Amex Gold good for cruises?',
    answer:
      'Not for the cruise fare itself. The Amex Gold earns 4x at restaurants worldwide and at U.S. supermarkets, but cruise lines earn the 1x base rate. It is still a good card for meals ashore in port.',
  },
  {
    question: 'Do onboard cruise charges count as dining for credit card points?',
    answer:
      'Usually not. Onboard spending, including specialty dining, is billed by the cruise line on your shipboard account, so it does not code as a restaurant. Some issuers treat it as travel, but at least one card program excludes onboard cruise goods and services from its travel category. A flat-rate card like the Venture X avoids the guesswork.',
  },
  {
    question: 'Can I use a Disney Visa card on a Disney cruise?',
    answer:
      'Yes. Disney Rewards Dollars can be redeemed toward Disney Cruise Line packages and onboard purchases. Cardmember perks and earning rates change, so check the card\'s current terms before you rely on a specific perk.',
  },
]

export default function BestCardsForCruises() {
  const sapphirePreferred = getCardBySlug('chase-sapphire-preferred')
  const ventureX = getCardBySlug('capital-one-venture-x')
  const inkBusiness = getCardBySlug('chase-ink-business-preferred')

  return (
    <div className="min-h-screen bg-white">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: 'Home', url: 'https://gatgridcruises.com' },
          { name: 'Travel Hacks', url: 'https://gatgridcruises.com/travel-hacks' },
          {
            name: 'Best Credit Card for Cruise Purchases',
            url: 'https://gatgridcruises.com/travel-hacks/best-cards-for-cruises',
          },
        ])}
      />
      <StructuredData data={generateFAQSchema(FAQS)} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0a1628] to-[#1E3A5F] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/travel-hacks"
            className="inline-flex items-center gap-1 text-blue-100 hover:text-white text-sm font-medium mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Travel Hacks
          </Link>

          <div className="flex items-center gap-2 mb-4">
            <Tag className="h-5 w-5 text-[#D4AF37]" />
            <span className="text-sm font-semibold text-[#D4AF37] uppercase tracking-wider">
              Travel Hacks
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-fraunces font-bold text-white mb-4">
            Best Credit Card for Cruise Purchases
          </h1>

          <p className="text-lg text-blue-100 mb-6">
            Some of the most popular travel cards now earn just 1x on a cruise. Here is which
            cards actually reward cruise fares and onboard spending in 2026, and which to leave in
            your wallet.
          </p>

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-blue-100">
              <Clock className="h-4 w-4" />
              <span>6 min read · Updated {UPDATED}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick answer */}
        <section className="mb-12 rounded-xl border-l-4 border-[#D4AF37] bg-[#1E3A5F]/5 p-6">
          <h2 className="text-2xl font-fraunces font-bold text-slate-900 mb-3">Quick Answer</h2>
          <ul className="text-slate-700 space-y-2">
            <li>
              <strong>Best overall:</strong> Chase Sapphire Preferred. Cruise lines earn 2x in its
              travel category, or 5x if you book through Chase Travel. $95 annual fee.
            </li>
            <li>
              <strong>Best for onboard spending:</strong> Capital One Venture X. A flat 2x miles on
              every purchase, so it does not matter how a charge codes. $395 annual fee.
            </li>
            <li>
              <strong>Best for business owners:</strong> Chase Ink Business Preferred, which earns
              3x on travel.
            </li>
            <li>
              <strong>Skip for the cruise fare:</strong> Amex Gold (1x on cruise lines) and Chase
              Sapphire Reserve (1x on cruises booked directly since the 2025 refresh).
            </li>
          </ul>
        </section>

        <section className="prose prose-slate max-w-none mb-12">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-6">
            How Cruise Purchases Earn Points
          </h2>

          <p className="text-slate-600 leading-relaxed mb-4">
            Card issuers decide your earning rate from the merchant that bills you, not from what
            you bought. That matters on a cruise because almost everything is billed by the
            cruise line:
          </p>

          <ul className="text-slate-600 space-y-2 mb-6">
            <li>
              <strong>Cruise fare and deposits:</strong> billed by the cruise line. Chase lists
              cruise lines in its travel category; Amex Gold and the refreshed Sapphire Reserve pay
              only 1x when you book directly.
            </li>
            <li>
              <strong>Onboard charges (specialty dining, drinks, spa, shopping):</strong> billed
              to your shipboard account by the cruise line, so they do not code as restaurants.
              Whether they count as travel depends on the issuer.
            </li>
            <li>
              <strong>Shore excursions:</strong> booked through the cruise line, they are billed
              like onboard charges. Booked with a local operator or travel site, they follow that
              merchant&rsquo;s category.
            </li>
            <li>
              <strong>Meals ashore in port:</strong> regular restaurant charges, which is where a
              dining card like the Amex Gold (4x) shines.
            </li>
          </ul>

          <h3 className="text-2xl font-fraunces font-bold text-slate-900 mt-8 mb-4">
            Example: A $6,000 Cruise
          </h3>

          <div className="bg-[#1E3A5F]/10 border-l-4 border-[#D4AF37] p-6 rounded my-6 not-prose">
            <p className="text-sm text-slate-700 mb-3">
              <strong>Cruise fare paid directly to the cruise line ($6,000)</strong>
            </p>
            <ul className="text-sm text-slate-700 space-y-2">
              <li>• Chase Sapphire Preferred (2x travel): 12,000 points</li>
              <li>• Capital One Venture X (2x everything): 12,000 miles</li>
              <li>• Chase Sapphire Reserve (1x, booked direct): 6,000 points</li>
              <li>• Amex Gold (1x): 6,000 points</li>
            </ul>
            <p className="text-xs text-slate-500 mt-3">
              Points only. Rates as published by each issuer at the time of writing; check current
              terms before you apply.
            </p>
          </div>
        </section>

        {/* Card Recommendations */}
        <section className="mb-12">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-6">
            Top Cards for Cruise Purchases
          </h2>

          <div className="space-y-6">
            {sapphirePreferred && (
              <CreditCardRecommendation card={sapphirePreferred} showEditorialTake={true} />
            )}

            {ventureX && <CreditCardRecommendation card={ventureX} showEditorialTake={true} />}

            {inkBusiness && (
              <CreditCardRecommendation card={inkBusiness} showEditorialTake={true} />
            )}
          </div>
        </section>

        <section className="prose prose-slate max-w-none mb-12">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mt-8 mb-4">
            Card-by-Card Breakdown for Cruisers
          </h2>

          <h3 className="text-xl font-fraunces font-bold text-slate-900 mt-6 mb-3">
            Chase Sapphire Preferred: best overall for cruise fares
          </h3>
          <p className="text-slate-600 leading-relaxed mb-4">
            Chase&rsquo;s travel category includes cruise lines, so a fare paid directly earns 2x.
            Cruises booked through Chase Travel earn 5x. The June 2026 refresh kept the $95 fee,
            added 3x on gas and vacation rentals, and raised the Chase Travel hotel credit to $100,
            which is handy for a pre-cruise night near the port.
          </p>

          <h3 className="text-xl font-fraunces font-bold text-slate-900 mt-6 mb-3">
            Capital One Venture X: best for onboard spending
          </h3>
          <p className="text-slate-600 leading-relaxed mb-4">
            Onboard charges are the hardest to predict because some issuers exclude onboard cruise
            purchases from their travel category. The Venture X sidesteps that with 2x miles on
            every purchase. The $395 annual fee comes with a $300 annual credit for bookings made
            through Capital One Travel.
          </p>

          <h3 className="text-xl font-fraunces font-bold text-slate-900 mt-6 mb-3">
            Chase Sapphire Reserve: great card, poor cruise card
          </h3>
          <p className="text-slate-600 leading-relaxed mb-4">
            After its June 2025 refresh, the Reserve earns 8x through Chase Travel and 4x on
            flights and hotels booked directly, but only 1x on other travel such as cruises booked
            with the line. The fee rose to $795. Keep it for flights and lounges, not the cruise.
          </p>

          <h3 className="text-xl font-fraunces font-bold text-slate-900 mt-6 mb-3">
            Amex Gold: use it in port, not for the booking
          </h3>
          <p className="text-slate-600 leading-relaxed mb-4">
            The Gold earns 4x at restaurants worldwide (up to $50,000 a year) and 4x at U.S.
            supermarkets, with a $325 annual fee. Cruise fares earn 1x, so pair it with a travel
            card and use it for meals ashore.
          </p>

          <h3 className="text-2xl font-fraunces font-bold text-slate-900 mt-8 mb-4">
            Tips for Earning More on Your Cruise
          </h3>

          <ul className="text-slate-600 space-y-3 mb-6">
            <li>
              <strong>Check the merchant, not the item.</strong> A specialty dinner on your
              shipboard account is a cruise-line charge, not a restaurant charge.
            </li>
            <li>
              <strong>Time a new card to your final payment.</strong> A large cruise payment can
              help you reach a welcome-offer spending requirement. Never carry a balance to do it.
            </li>
            <li>
              <strong>Match the fee to your travel.</strong> A $95 card that earns 2x on cruises
              beats a $795 card that earns 1x unless you use the premium card&rsquo;s credits.
            </li>
            <li>
              <strong>Stack with savings on the booking.</strong> Points are on top of any
              onboard credit you get when you book. See how much{' '}
              <Link href="/obc-estimate" className="text-[#1E3A5F] underline">
                estimated onboard credit
              </Link>{' '}
              your sailing could include.
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-7 h-7 text-[#D4AF37]" aria-hidden="true" />
            <h2 className="font-fraunces text-3xl font-bold text-slate-900">
              Cruise Credit Card FAQs
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-slate-200 bg-slate-50 overflow-hidden"
              >
                <summary className="cursor-pointer list-none p-5 flex items-center justify-between gap-3 hover:bg-slate-100 transition-colors">
                  <h3 className="font-semibold text-slate-900 text-base">{faq.question}</h3>
                  <span
                    className="text-[#1E3A5F] font-bold text-xl leading-none group-open:rotate-45 transition-transform flex-shrink-0"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="px-5 pb-5 text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related Guides */}
        <section className="bg-slate-50 rounded-lg p-8 mt-12">
          <h3 className="text-2xl font-fraunces font-bold text-slate-900 mb-6">
            Related Guides
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { href: '/travel-hacks/fly-free-to-cruise-port', label: 'How to Fly Free to Your Cruise Port' },
              { href: '/travel-hacks/stack-points-free-cruise', label: 'How to Stack Points for a Free Cruise' },
              { href: '/travel-hacks/free-trip-insurance', label: 'Free Trip Insurance You Already Have' },
              { href: '/travel-hacks/cruise-port-lounge-access', label: 'Cruise Port Lounge Access' },
              { href: '/guides/disney-cruise-cost-guide', label: 'What a Disney Cruise Really Costs' },
              { href: '/onboard-credit', label: 'How Disney Cruise Onboard Credit Works' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between p-4 rounded-lg bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <span className="font-semibold text-slate-900">{link.label}</span>
                <span className="text-[#1E3A5F]">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Planning CTA */}
        <section className="mt-12 bg-[#1E3A5F] rounded-xl p-8 text-white flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-1">
            <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-wider mb-1">Ready to sail?</p>
            <p className="text-white font-fraunces text-xl font-bold mb-2">Put your card strategy to work</p>
            <p className="text-slate-300 text-sm">
              Earn points on the fare and see what estimated onboard credit your booking could
              include.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link
              href="/obc-estimate"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#1E3A5F] font-semibold rounded-lg hover:bg-yellow-300 transition-colors"
            >
              Get your onboard credit estimate <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#1E3A5F] transition-colors"
            >
              Get a free quote
            </Link>
          </div>
        </section>

        {/* Disclaimers */}
        <section className="mt-12 pt-8 border-t border-slate-200 space-y-4">
          <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">Affiliate Disclosure</h3>
            <p className="text-sm text-slate-700">
              This guide contains referral links to credit card offers. We may earn a commission if
              you apply through our links at no additional cost to you. We only recommend cards we
              believe offer value for cruise travelers.
            </p>
          </div>
          <p className="text-xs text-slate-500">
            Card terms, fees, and welcome offers change often and vary by applicant. Figures here
            were checked on {UPDATED}; confirm current terms with the issuer before applying. This
            is general information, not financial advice.
          </p>
        </section>
      </article>
    </div>
  )
}
