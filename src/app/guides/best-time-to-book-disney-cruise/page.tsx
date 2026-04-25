import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, TrendingDown, AlertCircle, Zap, DollarSign } from 'lucide-react';
import { GetQuoteCTA } from '@/components/get-quote-cta';

export const metadata: Metadata = {
  title: 'Best Time to Book a Disney Cruise (Price Data Analysis)',
  description: 'Data-driven guide to booking Disney cruises at the lowest prices. Learn about wave season, price cycles, cheapest months, and booking strategies.',
};

export default function BestTimeToBookGuide() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 via-white to-indigo-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-fraunces text-4xl sm:text-5xl font-bold text-white mb-4">
            Best Time to Book a Disney Cruise
          </h1>
          <p className="text-lg text-blue-100 mb-6">
            Save thousands with data-driven booking strategies. Learn when Disney releases cruises, how prices fluctuate, and exactly when to hit "book now."
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-blue-100">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Wave season timing</span>
            <span className="flex items-center gap-2"><TrendingDown className="w-4 h-4" /> Price patterns</span>
            <span className="flex items-center gap-2"><DollarSign className="w-4 h-4" /> Save money</span>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-4 border-b">
        <div className="max-w-4xl mx-auto text-sm text-gray-600">
          <Link href="/" className="text-blue-600 hover:underline">Home</Link>
          {' > '}
          <Link href="/guides" className="text-blue-600 hover:underline">Guides</Link>
          {' > Best Time to Book'}
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <a
              href="/concierge"
              
              
              className="block rounded-xl overflow-hidden border border-[#D4AF37] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2a4f7a] px-6 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[#D4AF37] font-bold text-base leading-tight">Earn 150K+ Membership Rewards Points</p>
                  <p className="text-blue-200 text-sm mt-0.5">Enough for your next Disney cruise upgrade — Amex Business Platinum</p>
                </div>
                <span className="flex-shrink-0 bg-[#D4AF37] text-[#1E3A5F] font-bold text-sm px-4 py-2 rounded-lg whitespace-nowrap">Learn More →</span>
              </div>
            </a>

        {/* Overview */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Key Insight</h2>
          <p className="font-inter text-slate-600 leading-relaxed mb-4">
            Disney cruise prices are dynamic, controlled by sophisticated revenue management algorithms. Unlike hotels with gradual pricing, cruise fares can drop or spike suddenly based on occupancy, demand, and competing itineraries. The difference between booking at the right time versus wrong time can be $1,000-3,000+ per cabin. Understanding the pricing cycle and using strategic booking tactics can save you significant money.
          </p>
          <p className="font-inter text-slate-600 leading-relaxed">
            This guide reveals the patterns Disney's pricing follows and provides actionable strategies to lock in the best rates.
          </p>
        </section>

        {/* The Booking Window */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">The Booking Window: When Disney Opens Cruises</h2>

          <p className="font-inter text-slate-600 leading-relaxed mb-6">
            Disney opens cruises for booking approximately 18 months in advance. For example, cruises departing in October 2026 open for booking around April 2025. This isn't a hard rule—Disney occasionally opens farther out (up to 24 months) or closer (12 months), but 18 months is the standard.
          </p>

          <div className="p-6 bg-slate-50 border-l-4 border-[#1E3A5F] mb-6">
            <h3 className="font-fraunces text-xl font-bold text-slate-900 mb-3">Example Timeline:</h3>
            <ul className="space-y-2 font-inter text-slate-600">
              <li className="flex gap-2"><span className="text-blue-600 font-bold">April 2025:</span> Disney opens October 2026 cruises for booking (18 months out)</li>
              <li className="flex gap-2"><span className="text-blue-600 font-bold">October 2025:</span> Same October 2026 cruises now available (12 months out)</li>
              <li className="flex gap-2"><span className="text-blue-600 font-bold">April 2026:</span> Same cruises now available (6 months out)</li>
              <li className="flex gap-2"><span className="text-blue-600 font-bold">September 2026:</span> Last-minute bookings (1 month out)</li>
            </ul>
          </div>

          <p className="font-inter text-slate-600">
            <strong>Implication:</strong> A given cruise has its prices evolve over an 18-month window. Early bookers lock in opening prices; late bookers gamble on last-minute drops or accept higher fares.
          </p>
        </section>

        {/* Wave Season */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Wave Season: The Prime Booking Period</h2>

          <div className="mb-6 p-6 bg-amber-50 border-l-4 border-[#1E3A5F]">
            <h3 className="font-fraunces text-xl font-bold text-slate-900 mb-3">What Is Wave Season?</h3>
            <p className="font-inter text-slate-600">
              "Wave season" (January through March, sometimes extending into April) is when Disney and other cruise lines offer aggressive promotions, price drops, and discounts to drive bookings. Travel agencies see heightened commission opportunities, and passengers benefit from special onboard credits and reduced fares. It"s the single best time to book a cruise if you're flexible on itineraries.
"            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-4">Why Wave Season Offers Deals:</h3>
            <ul className="space-y-3 font-inter text-slate-600">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Post-holiday cash flow:</strong> Travelers have return-from-holidays sales mentality.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Spring getaway planning:</strong> Families plan spring break and summer vacations.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Travel agency sales goals:</strong> Agents push bookings to hit Q1 targets.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Competitive pressure:</strong> Cruise lines reduce fares to capture market share.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Onboard credit promos:</strong> Disney bundles $50-300+ onboard credits with bookings.</span>
              </li>
            </ul>
          </div>

          <div className="p-4 bg-green-50 rounded">
            <p className="font-inter text-slate-600">
              <strong>Tip:</strong> If you"re planning any cruise within the next 2-3 years, wave season (Jan-Mar) is prime time to shop. Even if your desired cruise isn't until 2026, prices on 2026 cruises are often reduced during wave season.
"            </p>
          </div>
        </section>

        <a
              href="/concierge"
              
              
              className="block rounded-xl overflow-hidden border border-[#D4AF37] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2a4f7a] px-6 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[#D4AF37] font-bold text-base leading-tight">Earn 150K+ Membership Rewards Points</p>
                  <p className="text-blue-200 text-sm mt-0.5">Enough for your next Disney cruise upgrade — Amex Business Platinum</p>
                </div>
                <span className="flex-shrink-0 bg-[#D4AF37] text-[#1E3A5F] font-bold text-sm px-4 py-2 rounded-lg whitespace-nowrap">Learn More →</span>
              </div>
            </a>

        {/* Typical Price Lifecycle */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Typical Disney Cruise Price Lifecycle</h2>

          <p className="font-inter text-slate-600 leading-relaxed mb-6">
            While prices vary by itinerary and season, a typical Disney cruise follows this pattern over its 18-month booking window:
          </p>

          <div className="space-y-4 mb-8">
            <div className="p-4 bg-gray-50 rounded border-l-4 border-orange-500">
              <p className="font-inter font-bold text-slate-900 mb-2">Phase 1: Opening (18 months out)</p>
              <p className="font-inter text-slate-600">Prices are typically high at opening. Disney sets "anchor pricing" to test demand. Early bookers pay a premium for certainty of availability.</p>
            </div>

            <div className="p-4 bg-gray-50 rounded border-l-4 border-orange-400">
              <p className="font-inter font-bold text-slate-900 mb-2">Phase 2: Wave Season (12-18 months out)</p>
              <p className="font-inter text-slate-600">Prices drop significantly during wave season (Jan-Mar). This is often the cheapest time relative to sailing date. Discounts of 15-30% from opening prices are common.</p>
            </div>

            <div className="p-4 bg-gray-50 rounded border-l-4 border-orange-300">
              <p className="font-inter font-bold text-slate-900 mb-2">Phase 3: Mid-Term (6-12 months out)</p>
              <p className="font-inter text-slate-600">Prices gradually increase from wave season lows. Availability tightens, and demand increases as guests plan summer/holiday trips. Modest drops may occur if a competitor releases lower prices.</p>
            </div>

            <div className="p-4 bg-gray-50 rounded border-l-4 border-orange-200">
              <p className="font-inter font-bold text-slate-900 mb-2">Phase 4: Close-to-Sailing (0-6 months out)</p>
              <p className="font-inter text-slate-600">Prices typically rise to peak levels. Cabins fill quickly. Last-minute deals are rare unless the itinerary undersells (unlikely for Disney). Some cabins may sell out entirely.</p>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded">
            <p className="font-inter text-slate-600">
              <strong>Key Takeaway:</strong> The best prices are usually found during wave season (Jan-Mar), roughly 12-18 months before your target sailing date. Booking 6+ months in advance is risky; you pay higher prices with little benefit.
            </p>
          </div>
        </section>

        {/* Seasonal Pricing */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Cheapest vs. Most Expensive Times to Sail</h2>

          <p className="font-inter text-slate-600 leading-relaxed mb-6">
            Beyond the booking-window pricing, certain sailing dates are inherently more or less expensive based on demand:
          </p>

          <div className="mb-8">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-4">Cheapest Months to Sail</h3>

            <div className="space-y-4">
              <div className="p-4 bg-green-50 border-l-4 border-green-600 rounded">
                <p className="font-inter font-bold text-slate-900 mb-1">January & February</p>
                <p className="font-inter text-slate-600 text-sm">Post-holiday travel slump. Kids still in school. Families avoid travel. Fares are 15-25% lower than peak seasons.</p>
              </div>

              <div className="p-4 bg-green-50 border-l-4 border-green-600 rounded">
                <p className="font-inter font-bold text-slate-900 mb-1">September (Labor Day excepted)</p>
                <p className="font-inter text-slate-600 text-sm">Back-to-school season. Most families can't cruise. Kids just started school. Prices drop significantly except the Labor Day week itself.</p>
              </div>

              <div className="p-4 bg-green-50 border-l-4 border-green-600 rounded">
                <p className="font-inter font-bold text-slate-900 mb-1">Early November</p>
                <p className="font-inter text-slate-600 text-sm">Post-Halloween, pre-Thanksgiving. School still in session. Brief lull in demand before holiday season.</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-4">Most Expensive Times to Sail</h3>

            <div className="space-y-4">
              <div className="p-4 bg-red-50 border-l-4 border-red-600 rounded">
                <p className="font-inter font-bold text-slate-900 mb-1">Spring Break (March-April)</p>
                <p className="font-inter text-slate-600 text-sm">School breaks drive demand. Families book vacations. Prices are 30-40% higher than off-season. Book far in advance for spring break.</p>
              </div>

              <div className="p-4 bg-red-50 border-l-4 border-red-600 rounded">
                <p className="font-inter font-bold text-slate-900 mb-1">Summer (June-August)</p>
                <p className="font-inter text-slate-600 text-sm">School vacation season. Peak demand. Prices peak. Expect 25-50% premiums. Ships fully booked. Plan a year ahead if targeting summer.</p>
              </div>

              <div className="p-4 bg-red-50 border-l-4 border-red-600 rounded">
                <p className="font-inter font-bold text-slate-900 mb-1">Thanksgiving Week</p>
                <p className="font-inter text-slate-600 text-sm">Holiday travel. Family vacation time. Very high demand. Prices peak. Cruises sell out.</p>
              </div>

              <div className="p-4 bg-red-50 border-l-4 border-red-600 rounded">
                <p className="font-inter font-bold text-slate-900 mb-1">Christmas/New Year's (Dec 19-Jan 3)</p>
                <p className="font-inter text-slate-600 text-sm">Peak holiday season. Highest prices of the year. Premium pricing on all itineraries. Many families book these weeks a year in advance.</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-amber-50 rounded">
            <p className="font-inter text-slate-600">
              <strong>Pro Strategy:</strong> If you can sail in January or September (outside Labor Day), you'll get 30-40% discounts vs. peak seasons. Flexibility on dates saves thousands.
            </p>
          </div>
        </section>

        {/* Guaranteed Rate Categories */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Guaranteed Rate Categories (GTY)</h2>

          <p className="font-inter text-slate-600 leading-relaxed mb-6">
            Disney offers "Guaranteed Rate" (GTY) bookings where you select a category (e.g., "inside cabin") instead of a specific cabin. Your assigned cabin is guaranteed to be that category or better, at a discounted rate. GTY cabins are typically 10-15% cheaper than selecting a specific cabin upfront.
          </p>

          <div className="p-6 bg-slate-50 border-l-4 border-[#1E3A5F]">
            <h3 className="font-fraunces text-xl font-bold text-slate-900 mb-4">How GTY Works:</h3>
            <ul className="space-y-3 font-inter text-slate-600">
              <li className="flex gap-2"><span className="text-blue-600 font-bold">1.</span> Book a cabin category without a specific cabin assignment</li>
              <li className="flex gap-2"><span className="text-blue-600 font-bold">2.</span> Pay a lower price than if you selected a specific cabin</li>
              <li className="flex gap-2"><span className="text-blue-600 font-bold">3.</span> Disney assigns your specific cabin 75 days before sailing</li>
              <li className="flex gap-2"><span className="text-blue-600 font-bold">4.</span> You're guaranteed to receive that category or an upgrade</li>
            </ul>
          </div>

          <p className="font-inter text-slate-600 mt-6">
            <strong>Strategy:</strong> GTY bookings are excellent for budget-conscious cruisers who value savings over cabin certainty. You'll often get upgraded to a better cabin. If you have specific cabin preferences (obstructed view vs. ocean view, specific deck), book a specific cabin and accept higher pricing.
          </p>
        </section>

        <a
              href="/concierge"
              
              
              className="block rounded-xl overflow-hidden border border-[#D4AF37] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2a4f7a] px-6 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[#D4AF37] font-bold text-base leading-tight">Earn 150K+ Membership Rewards Points</p>
                  <p className="text-blue-200 text-sm mt-0.5">Enough for your next Disney cruise upgrade — Amex Business Platinum</p>
                </div>
                <span className="flex-shrink-0 bg-[#D4AF37] text-[#1E3A5F] font-bold text-sm px-4 py-2 rounded-lg whitespace-nowrap">Learn More →</span>
              </div>
            </a>

        {/* Booking Strategies */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Strategic Booking Tips to Save Money</h2>

          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded">
              <p className="font-inter font-bold text-slate-900 mb-2">1. Book During Wave Season (Jan-Mar)</p>
              <p className="font-inter text-slate-600 text-sm">Even if your cruise is 2+ years away, wave season offers the best promotions. Prices are 15-30% lower than off-season.</p>
            </div>

            <div className="p-4 bg-green-50 rounded">
              <p className="font-inter font-bold text-slate-900 mb-2">2. Target Cheap Sailing Dates</p>
              <p className="font-inter text-slate-600 text-sm">Book September (not Labor Day week) or January/February cruises. Save 30-40% vs. summer/holiday sailings.</p>
            </div>

            <div className="p-4 bg-green-50 rounded">
              <p className="font-inter font-bold text-slate-900 mb-2">3. Use Our Price Tracking (/deals)</p>
              <p className="font-inter text-slate-600 text-sm">Monitor price drops on your target cruise. When fares fall, you can rebook at the lower price (assuming you booked with the flexibility to change).</p>
            </div>

            <div className="p-4 bg-green-50 rounded">
              <p className="font-inter font-bold text-slate-900 mb-2">4. Compare Deck & Category Pricing</p>
              <p className="font-inter text-slate-600 text-sm">Similar cabin types on different decks may have different prices. Lower decks or midship cabins are sometimes cheaper. Upgrade availability increases closer to sailing.</p>
            </div>

            <div className="p-4 bg-green-50 rounded">
              <p className="font-inter font-bold text-slate-900 mb-2">5. Book Onboard for Next Cruise</p>
              <p className="font-inter text-slate-600 text-sm">Book your next cruise while sailing. Disney offers 10% onboard credit toward your next booking. This stacks with other promotions.</p>
            </div>

            <div className="p-4 bg-green-50 rounded">
              <p className="font-inter font-bold text-slate-900 mb-2">6. Use Placeholder Cruises</p>
              <p className="font-inter text-slate-600 text-sm">Book a cheap placeholder cruise to lock in wave season pricing/credits. Later, switch to your desired cruise at the reduced rate.</p>
            </div>

            <div className="p-4 bg-green-50 rounded">
              <p className="font-inter font-bold text-slate-900 mb-2">7. Pay Attention to Cancellation Policies</p>
              <p className="font-inter text-slate-600 text-sm">Disney's cancellation policy allows free cancellation up to ~114 days before sailing. This flexibility lets you rebook if prices drop further.</p>
            </div>

            <div className="p-4 bg-green-50 rounded">
              <p className="font-inter font-bold text-slate-900 mb-2">8. Watch for Onboard Credit Promotions</p>
              <p className="font-inter text-slate-600 text-sm">Wave season often includes $50-300 onboard credits. These add value beyond ticket discounts, especially for specialty dining or activities.</p>
            </div>
          </div>
        </section>

        {/* Cancellation & Rescheduling */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Disney's Cancellation Policy & Rescheduling</h2>

          <p className="font-inter text-slate-600 leading-relaxed mb-6">
            Understanding Disney's cancellation and change policies is crucial for strategic booking:
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-4 bg-blue-50 rounded">
              <p className="font-inter font-bold text-slate-900 mb-2">Cancellation Window (~114 days before sailing):</p>
              <p className="font-inter text-slate-600 text-sm">Guests can cancel with a full refund (or rebook at no cost) up to ~114 days before sailing. This is a generous window that lets you rebook if prices drop.</p>
            </div>

            <div className="p-4 bg-blue-50 rounded">
              <p className="font-inter font-bold text-slate-900 mb-2">After 114 Days:</p>
              <p className="font-inter text-slate-600 text-sm">Cancellations result in onboard credits (vs. cash refunds). You can rebook a future cruise with the credit.</p>
            </div>

            <div className="p-4 bg-blue-50 rounded">
              <p className="font-inter font-bold text-slate-900 mb-2">Price Reduction Rebook:</p>
              <p className="font-inter text-slate-600 text-sm">If prices drop after you book, you can cancel and rebook at the lower price within the 114-day window. The change is free.</p>
            </div>
          </div>

          <div className="p-4 bg-amber-50 rounded">
            <p className="font-inter text-slate-600">
              <strong>Strategy:</strong> Book early (during wave season) to lock in pricing flexibility. Monitor prices. If a price drop occurs within 114 days, rebook at the lower rate.
            </p>
          </div>
        </section>

        {/* Price Data Examples */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Real Price Lifecycle Example</h2>

          <p className="font-inter text-slate-600 leading-relaxed mb-6">
            Here"s a realistic example of how a 7-night Disney cruise's pricing evolves over its booking window (prices are estimates):
"          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full font-inter text-sm border border-gray-300">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="p-3 text-left">Time Until Sailing</th>
                  <th className="p-3 text-right">Per Person Price</th>
                  <th className="p-3 text-left">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-3">18 months (Opening)</td>
                  <td className="p-3 text-right">$1,400</td>
                  <td className="p-3">Anchor pricing; early bookers lock in</td>
                </tr>
                <tr className="border-b hover:bg-gray-50 bg-green-50">
                  <td className="p-3">15 months (Wave Season)</td>
                  <td className="p-3 text-right">$1,100</td>
                  <td className="p-3 text-green-700 font-bold">21% discount! Wave season drop + OBC promotions</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-3">12 months</td>
                  <td className="p-3 text-right">$1,200</td>
                  <td className="p-3">Price recovers slightly post-wave season</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-3">9 months</td>
                  <td className="p-3 text-right">$1,350</td>
                  <td className="p-3">Prices climb; demand increases</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-3">6 months</td>
                  <td className="p-3 text-right">$1,500</td>
                  <td className="p-3">Cabins filling up; prices peak</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-3">3 months</td>
                  <td className="p-3 text-right">$1,500-1,600</td>
                  <td className="p-3">Peak pricing; last-minute deals rare</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="font-inter text-slate-600">
            <strong>Insight:</strong> The guest who booked at 15 months (wave season) paid $1,100/person. The guest who booked at 6 months paid $1,500/person—a 36% premium for the exact same cruise. For a family of 4, that's $1,600 additional cost by missing wave season.
          </p>
        </section>

        {/* Use GatGridCruises */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Use GatGridCruises to Monitor Prices</h2>

          <p className="font-inter text-slate-600 leading-relaxed mb-6">
            Rather than manually monitoring Disney's website daily, use our price tracking tool (/deals) to:
          </p>

          <ul className="space-y-3 font-inter text-slate-600 mb-6">
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span>Set price alerts for your target cruises and dates</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span>Receive notifications when prices drop</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span>View historical pricing trends on itineraries</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span>Compare prices across multiple ships and itineraries</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span>Use our cost calculator to estimate total trip expenses</span>
            </li>
          </ul>

          <div className="p-4 bg-blue-50 rounded">
            <p className="font-inter text-slate-600">
              Rather than wondering if you got a good deal, our tools provide data-driven insights to confirm you're booking at the optimal time.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="my-12 p-8 bg-gradient-to-r from-blue-50 to-blue-900 text-white rounded-lg">
          <h2 className="font-fraunces text-3xl font-bold mb-4">Ready to Book at the Best Price?</h2>
          <p className="font-inter text-lg mb-6">
            Use our price tracking, cost calculator, and deal finder to secure the lowest fares on your Disney cruise.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/deals"
              className="inline-block px-6 py-3 bg-[#D4AF37] text-slate-900 font-inter font-bold rounded hover:bg-yellow-300 transition"
            >
              Browse Current Deals
            </Link>
            <Link
              href="/tools/cost-calculator"
              className="inline-block px-6 py-3 bg-white text-slate-900 font-inter font-bold rounded hover:bg-gray-100 transition"
            >
              Calculate Total Cost
            </Link>
            <Link
              href="/ships"
              className="inline-block px-6 py-3 border-2 border-white text-white font-inter font-bold rounded hover:bg-white hover:text-slate-900 transition"
            >
              Compare Ships
            </Link>
          </div>
        </section>

        {/* Related Guides */}
        <section className="mt-12 pt-12 border-t border-gray-200">
          <h2 className="font-fraunces text-2xl font-bold text-slate-900 mb-6">Related Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/guides/disney-cruise-vs-royal-caribbean"
              className="p-6 border border-gray-200 rounded-lg hover:border-[#1E3A5F] hover:shadow-md transition"
            >
              <h3 className="font-fraunces font-bold text-slate-900 mb-2">Disney Cruise vs. Royal Caribbean</h3>
              <p className="font-inter text-gray-600 text-sm">Compare cruise lines and see if Disney or Royal Caribbean fits your budget and preferences.</p>
            </Link>
            <Link
              href="/guides/disney-cruise-packing-list"
              className="p-6 border border-gray-200 rounded-lg hover:border-[#1E3A5F] hover:shadow-md transition"
            >
              <h3 className="font-fraunces font-bold text-slate-900 mb-2">The Ultimate Disney Cruise Packing List</h3>
              <p className="font-inter text-gray-600 text-sm">Complete checklist of what to pack for your Disney cruise.</p>
            </Link>
            <Link
              href="/guides/castaway-cay-guide"
              className="p-6 border border-gray-200 rounded-lg hover:border-[#1E3A5F] hover:shadow-md transition"
            >
              <h3 className="font-fraunces font-bold text-slate-900 mb-2">Castaway Cay: The Ultimate Guide</h3>
              <p className="font-inter text-gray-600 text-sm">Make the most of Disney's private island with activities and tips.</p>
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
