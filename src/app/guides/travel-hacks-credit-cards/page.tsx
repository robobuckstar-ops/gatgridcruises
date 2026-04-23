import { Metadata } from 'next'
import Link from 'next/link'
import { CreditCardRecommendation } from '@/components/ui/credit-card-recommendation'
import { CardComparisonTable } from '@/components/ui/card-comparison-table'
import { TravelHackTip } from '@/components/ui/travel-hack-tip'
import { AffiliateDisclosure } from '@/components/ui/affiliate-disclosure'
import { creditCards, getBestCardsFor } from '@/lib/credit-card-config'
import { Lightbulb } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Travel Hacks: Credit Cards for Cruise Rewards | GatGrid Cruises',
  description:
    'The insider guide to maximizing credit card rewards on Disney cruises. Compare top cards for signup bonuses, lounge access, and travel insurance.',
  openGraph: {
    title: 'Travel Hacks: Credit Cards for Cruise Rewards',
    description:
      'The insider guide to maximizing credit card rewards on Disney cruises. Compare top cards for signup bonuses, lounge access, and travel insurance.',
    type: 'article',
  },
}

export default function TravelHacksCreditCardsPage() {
  const bestSignupBonusCards = getBestCardsFor('signup-bonus')
  const loungeAccessCards = getBestCardsFor('lounge-access')

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Travel Hacks: Credit Cards for Cruise Rewards
          </h1>
          <p className="text-lg text-slate-700 mb-6 leading-relaxed">
            The insider guide to maximizing rewards on your Disney cruise. Whether you're looking for a
            big welcome bonus, free lounge access, or travel insurance, we've analyzed the market so you
            don't have to.
          </p>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
              <span>✓</span> 8 Cards Compared
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
              <span>✓</span> Honest Reviews
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
              <span>✓</span> No BS
            </div>
          </div>
        </div>
      </section>

      {/* Affiliate Disclosure - Top */}
      <section className="container mx-auto px-4 mb-12">
        <AffiliateDisclosure />
      </section>

      {/* Quick Wins Section */}
      <section className="container mx-auto px-4 mb-16">
        <h2 className="font-display text-3xl font-bold text-slate-900 mb-8">Quick Tips</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <TravelHackTip
            tip="The signup bonus alone can cover your cruise's taxes, fees, and gratuities. A $750 bonus means you're already winning."
            cardSlug="chase-sapphire-preferred"
          />
          <TravelHackTip
            tip="Priority Pass gives you access to 1,000+ airport lounges worldwide. Game-changer for early morning flights to embarkation ports."
            cardSlug="chase-sapphire-reserve"
          />
          <TravelHackTip
            tip="3x points on cruises + 3x on dining means port days and dinners onboard rack up rewards fast. Double-dip your earnings."
            cardSlug="amex-gold"
          />
        </div>
      </section>

      {/* The Best Overall */}
      <section className="container mx-auto px-4 mb-16">
        <h2 className="font-display text-3xl font-bold text-slate-900 mb-2">Our Pick: Best Overall Cruise Card</h2>
        <p className="text-slate-700 mb-8">
          For most cruisers, the Chase Sapphire Preferred strikes the perfect balance of rewards, benefits, and value.
        </p>
        <CreditCardRecommendation
          card={creditCards.find((c) => c.id === 'chase-sapphire-preferred')!}
          showEditorialTake
        />
      </section>

      {/* Signup Bonus Champions */}
      <section className="container mx-auto px-4 mb-16">
        <h2 className="font-display text-3xl font-bold text-slate-900 mb-2">
          Biggest Welcome Bonuses
        </h2>
        <p className="text-slate-700 mb-8">
          If you're ready to meet minimum spend requirements, these cards offer the largest upfront value:
        </p>
        <div className="space-y-6">
          {bestSignupBonusCards.slice(0, 3).map((card) => (
            <CreditCardRecommendation
              key={card.id}
              card={card}
              showEditorialTake
            />
          ))}
        </div>
      </section>

      {/* Lounge Access */}
      <section className="container mx-auto px-4 mb-16">
        <h2 className="font-display text-3xl font-bold text-slate-900 mb-2">Lounge Access = Free Perks</h2>
        <p className="text-slate-700 mb-4">
          Arriving early for your cruise? Pre-cruise lounges offer free food, drinks, showers, and Wi-Fi. These cards
          give you access:
        </p>
        <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            <strong>Priority Pass</strong> includes 1,000+ lounges globally, not just airport lounges. Many cruise
            terminals (Port Canaveral, Miami) have Priority Pass partners nearby.
          </p>
        </div>
        <div className="space-y-6">
          {loungeAccessCards.slice(0, 3).map((card) => (
            <CreditCardRecommendation
              key={card.id}
              card={card}
              showEditorialTake={false}
            />
          ))}
        </div>
      </section>

      {/* Full Comparison */}
      <section className="container mx-auto px-4 mb-16">
        <h2 className="font-display text-3xl font-bold text-slate-900 mb-2">Side-by-Side Comparison</h2>
        <p className="text-slate-700 mb-8">
          Can't decide? Compare all top cards across key metrics to find your perfect fit:
        </p>
        <CardComparisonTable
          cardIds={[
            'chase-sapphire-preferred',
            'chase-sapphire-reserve',
            'amex-gold',
            'capital-one-venture-x',
            'citi-premier',
          ]}
        />
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 mb-16">
        <h2 className="font-display text-3xl font-bold text-slate-900 mb-8">Cruise Cruiser Questions</h2>
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="font-display text-lg font-semibold text-slate-900 mb-2">
              Can I use the signup bonus for my cruise down payment?
            </h3>
            <p className="text-slate-700 leading-relaxed">
              Not directly—you can't typically redeem credit card points as a statement credit toward cruise bookings.
              Instead, use your points for flights, hotels, or dining during your cruise. The cash value of the bonus
              (~$600-1,500) is what you effectively "save" by putting other expenses on the card.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="font-display text-lg font-semibold text-slate-900 mb-2">
              Which card is best if I only cruise once every few years?
            </h3>
            <p className="text-slate-700 leading-relaxed">
              The <strong>Citi Premier</strong> or <strong>Capital One Venture</strong> offer excellent value at $95/year with 3x-1.5x
              points on cruises. You don't need lounge access or premium perks if cruising is occasional. Pay off the
              card monthly and watch your rewards grow.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="font-display text-lg font-semibold text-slate-900 mb-2">
              Do I need more than one credit card?
            </h3>
            <p className="text-slate-700 leading-relaxed">
              For serious cruisers: pick a high-earning card (2-3x on travel) and one for dining (3-4x). For casual
              cruisers: one all-around card is plenty. The signup bonus is where the real value is, so focus on that
              first.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="font-display text-lg font-semibold text-slate-900 mb-2">
              Is the annual fee worth it?
            </h3>
            <p className="text-slate-700 leading-relaxed">
              Generally, yes. A $95 annual fee pays for itself if you earn just ~2,000 points (~$30 value) per month.
              For premium cards ($250-550), the included credits and lounge access typically offset the fee. Do the math
              for your actual spend.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="font-display text-lg font-semibold text-slate-900 mb-2">
              Can I apply for multiple cards at once?
            </h3>
            <p className="text-slate-700 leading-relaxed">
              You can, but be strategic. Most issuers limit approvals to 1-2 per 30 days. If you're planning multiple
              cruises, spacing out applications 3+ months apart lets you hit multiple signup bonuses without raising
              red flags.
            </p>
          </div>
        </div>
      </section>

      {/* Travel Insurance Deep Dive */}
      <section className="container mx-auto px-4 mb-16">
        <h2 className="font-display text-3xl font-bold text-slate-900 mb-2">Travel Insurance: The Hidden Gem</h2>
        <p className="text-slate-700 mb-8">
          Every card on this list includes trip cancellation, trip delay, and baggage insurance. This is worth $100-500+
          per year. Here"s what you're protected against:
"        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
            <h3 className="font-semibold text-emerald-900 mb-3">Trip Cancellation</h3>
            <p className="text-sm text-emerald-800 leading-relaxed">
              If you get sick, injured, or a family member dies before your cruise, you're reimbursed up to $10,000.
              Game-changer if unexpected life happens.
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-3">Trip Delay</h3>
            <p className="text-sm text-blue-800 leading-relaxed">
              Miss your cruise due to a flight delay? You're reimbursed for hotel and meals up to $500. Common scenario
              at busy hub airports.
            </p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="font-semibold text-purple-900 mb-3">Baggage Delay</h3>
            <p className="text-sm text-purple-800 leading-relaxed">
              Your luggage arrives late? You get $500 to buy essentials while waiting for it. Happens more than you'd
              think on connecting flights.
            </p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <h3 className="font-semibold text-orange-900 mb-3">Travel Accident Insurance</h3>
            <p className="text-sm text-orange-800 leading-relaxed">
              If you"re injured on a covered trip, you're covered for medical expenses up to $250,000. Peace of mind
"              while traveling.
            </p>
          </div>
        </div>
      </section>

      {/* Earning Strategy */}
      <section className="container mx-auto px-4 mb-16 bg-white rounded-xl border border-slate-200 p-8">
        <h2 className="font-display text-3xl font-bold text-slate-900 mb-4">Maximum Earnings Strategy</h2>
        <p className="text-slate-700 mb-6">
          Here's how to squeeze every point out of your cruise:
        </p>
        <ol className="space-y-4 ml-4">
          <li className="flex gap-4">
            <span className="font-bold text-blue-600 flex-shrink-0">1.</span>
            <div>
              <strong className="text-slate-900">Before Cruise:</strong> Book flights on the card (2-3x points).
              Reserve dining packages and activities (earns points too).
            </div>
          </li>
          <li className="flex gap-4">
            <span className="font-bold text-blue-600 flex-shrink-0">2.</span>
            <div>
              <strong className="text-slate-900">During Cruise:</strong> Use the card at onboard restaurants,
              shops, and excursion vendors (3x for dining, 2x for travel-adjacent purchases).
            </div>
          </li>
          <li className="flex gap-4">
            <span className="font-bold text-blue-600 flex-shrink-0">3.</span>
            <div>
              <strong className="text-slate-900">After Cruise:</strong> Hotel stays, dining, airport transfers
              (2-3x points). These add up fast.
            </div>
          </li>
          <li className="flex gap-4">
            <span className="font-bold text-blue-600 flex-shrink-0">4.</span>
            <div>
              <strong className="text-slate-900">Redeem Wisely:</strong> Transfer points to travel partners
              (airlines/hotels) for 2-3x value vs. cash redemption. Or use statement credits for purchases.
            </div>
          </li>
        </ol>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="font-display text-3xl font-bold text-slate-900 mb-4">Ready to Start Earning?</h2>
        <p className="text-lg text-slate-700 mb-8 max-w-2xl mx-auto">
          Use the links above to apply for your card. We"ve vetted each one personally. You've got this.
"        </p>
        <Link
          href="/deals"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
        >
          Browse Our Favorite Deals
        </Link>
      </section>

      {/* Affiliate Disclosure - Bottom */}
      <section className="container mx-auto px-4 py-8 border-t border-slate-200">
        <AffiliateDisclosure />
      </section>
    </div>
  )
}
