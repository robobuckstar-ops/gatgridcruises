
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, DollarSign, TrendingUp } from 'lucide-react';
import { GetQuoteCTA } from '@/components/get-quote-cta';

export const metadata: Metadata = {
  title: 'The True Cost of a Disney Cruise (2026 Breakdown)',
  description: 'Complete breakdown of Disney cruise costs including base fares, gratuities, drinks, excursions, specialty dining, and hidden fees. Plus sample family budget and cost calculator.',
  openGraph: {
    title: 'The True Cost of a Disney Cruise (2026 Breakdown)',
    description: 'Complete breakdown of Disney cruise costs — base fares, gratuities, drinks, excursions, and hidden fees.',
    url: 'https://gatgridcruises.com/guides/disney-cruise-cost-guide',
    images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'GatGridCruises' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The True Cost of a Disney Cruise (2026)',
    description: 'Complete breakdown of Disney cruise costs — base fares, gratuities, drinks, excursions, and hidden fees.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
};

export default function DisneyVsCruiseCostGuide() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#0a1628] to-[#1E3A5F] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link href="/" className="text-[#D4AF37] hover:underline text-sm">
              Home
            </Link>
            <span className="text-white/50 mx-2">/</span>
            <Link href="/guides" className="text-[#D4AF37] hover:underline text-sm">
              Guides
            </Link>
            <span className="text-white/50 mx-2">/</span>
            <span className="text-gray-300 text-sm">The True Cost of a Disney Cruise</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-fraunces font-bold mb-4 text-white">
            The True Cost of a Disney Cruise (2026 Breakdown)
          </h1>
          <p className="text-lg text-white/80">
            Base fare is just the start. Here"s exactly what you'll pay for a family Disney cruise, with hidden costs and real-world examples.
"          </p>
        </div>
      </section>

      {/* Ad Slot 1 */}
      <a
              href="/concierge"
              className="block rounded-xl overflow-hidden border border-[#D4AF37] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2a4f7a] px-6 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[#D4AF37] font-bold text-base leading-tight">Plan Your Disney Cruise</p>
                  <p className="text-blue-200 text-sm mt-0.5">Connect with our concierge team for expert cruise planning</p>
                </div>
                <span className="flex-shrink-0 bg-[#D4AF37] text-[#1E3A5F] font-bold text-sm px-4 py-2 rounded-lg whitespace-nowrap">Get Started →</span>
              </div>
            </a>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-12">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-6">
            Understanding the Base Fare
          </h2>
          <p className="font-inter text-slate-600 leading-relaxed mb-4">
            When browsing Disney Cruise Line prices, the per-person, per-night rate you see is just the foundation of your total cost. Inside cabins typically range from $250-400 per night, while oceanview cabins start around $350-550. Verandah staterooms command $600-1,200 per night, and concierge suites can exceed $800-2,000+ per night depending on the ship and itinerary.
          </p>
          <p className="font-inter text-slate-600 leading-relaxed mb-4">
            For a 7-night cruise, a family of four in a standard inside cabin might see a base fare of $4,000-$5,600 total (before any discounts). But this is where the hidden costs begin to multiply.
          </p>
        </section>

        {/* Ad Slot 2 */}
        <a
              href="/concierge"
              className="block rounded-xl overflow-hidden border border-[#D4AF37] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2a4f7a] px-6 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[#D4AF37] font-bold text-base leading-tight">Plan Your Disney Cruise</p>
                  <p className="text-blue-200 text-sm mt-0.5">Connect with our concierge team for expert cruise planning</p>
                </div>
                <span className="flex-shrink-0 bg-[#D4AF37] text-[#1E3A5F] font-bold text-sm px-4 py-2 rounded-lg whitespace-nowrap">Get Started →</span>
              </div>
            </a>
  
        <section className="mb-12">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-6">
            The Hidden Costs That Add Up Fast
          </h2>

          <div className="bg-[#1E3A5F]/5 border-l-4 border-[#D4AF37] p-6 rounded-lg mb-8">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-4">
              Gratuities (Automatic Service Charges)
            </h3>
            <p className="font-inter text-slate-600 mb-3">
              Disney automatically adds gratuities to your account at a rate of $14.50 per person per day for standard accommodations, $16 for concierge. For a family of four on a 7-night cruise, expect $406-448 just in automatic gratuities—non-negotiable unless you request an adjustment at the purser's office.
            </p>
          </div>

          <div className="bg-[#1E3A5F]/5 border-l-4 border-[#D4AF37] p-6 rounded-lg mb-8">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-4">
              Beverage Packages
            </h3>
            <p className="font-inter text-slate-600 mb-3">
              Soft drink packages run $9-12 per person per day, while alcoholic beverage packages range from $65-89 per adult per day. A non-alcoholic package is around $9-12 per day. For a family of four with one adult drinker over 7 nights, budget an additional $500+ if purchasing individual drinks, or $455-623 for a full-week beverage package.
            </p>
          </div>

          <div className="bg-[#1E3A5F]/5 border-l-4 border-[#D4AF37] p-6 rounded-lg mb-8">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-4">
              Internet (Wi-Fi)
            </h3>
            <p className="font-inter text-slate-600 mb-3">
              Unlimited Wi-Fi ranges from $12-25 per person per day depending on package length. For a family wanting connectivity throughout a 7-night cruise, expect $336-700 total. Many families purchase only a 3-day pass ($25-35) to stay partially connected.
            </p>
          </div>

          <div className="bg-[#1E3A5F]/5 border-l-4 border-[#D4AF37] p-6 rounded-lg mb-8">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-4">
              Port Excursions (Shore Activities)
            </h3>
            <p className="font-inter text-slate-600 mb-3">
              This varies wildly by port and activity. A casual beach day might cost nothing, but organized excursions range from $50-300+ per person. A family hitting 3-4 ports with one major excursion per port (snorkeling, adventure park access, cultural tours) easily spends $600-1,200 total.
            </p>
          </div>

          <div className="bg-[#1E3A5F]/5 border-l-4 border-[#D4AF37] p-6 rounded-lg mb-8">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-4">
              Specialty Dining
            </h3>
            <p className="font-inter text-slate-600 mb-3">
              Palo, Remy, and Enchanted Garden charge $30-75+ per person for dinner. Brunch packages add $30+ per person. A family of four enjoying just one specialty dinner adds $120-300. Multiple specialty experiences across a week easily reach $400-600+.
            </p>
          </div>

          <div className="bg-[#1E3A5F]/5 border-l-4 border-[#D4AF37] p-6 rounded-lg mb-8">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-4">
              Onboard Experiences & Activities
            </h3>
            <p className="font-inter text-slate-600 mb-3">
              Photography packages ($199-299 for digital or physical prints), Bibbidi Boppidi Boutique character experiences ($65-450+ depending on package), spa services, and premium experiences like private character dining add up quickly. Budget $300-800 for a family wanting multiple premium experiences.
            </p>
          </div>

          <div className="bg-[#1E3A5F]/5 border-l-4 border-[#D4AF37] p-6 rounded-lg mb-8">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-4">
              Getting to the Port
            </h3>
            <p className="font-inter text-slate-600 mb-3">
              If driving from more than 4 hours away, consider parking ($25-34 per day) or hotel options. From Florida, parking at Port Canaveral runs $25-30 per day for 7 nights ($175-210). Flying guests must factor in airfare, ground transportation, and potentially a pre-cruise hotel night ($100-250).
            </p>
          </div>
        </section>

        {/* Ad Slot 3 */}
        <a
              href="/concierge"
              className="block rounded-xl overflow-hidden border border-[#D4AF37] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2a4f7a] px-6 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[#D4AF37] font-bold text-base leading-tight">Plan Your Disney Cruise</p>
                  <p className="text-blue-200 text-sm mt-0.5">Connect with our concierge team for expert cruise planning</p>
                </div>
                <span className="flex-shrink-0 bg-[#D4AF37] text-[#1E3A5F] font-bold text-sm px-4 py-2 rounded-lg whitespace-nowrap">Get Started →</span>
              </div>
            </a>
  
        <section className="mb-12">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-6">
            Sample Family of Four Budget Breakdown
          </h2>
          <p className="font-inter text-slate-600 leading-relaxed mb-6">
            Let's calculate a realistic 7-night cruise cost for a family of four (2 adults, 2 kids) in an inside cabin with moderate add-ons:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-slate-900 text-slate-900">
                <tr>
                  <th className="border border-gray-300 px-4 py-3 text-left font-fraunces">Expense Category</th>
                  <th className="border border-gray-300 px-4 py-3 text-right font-fraunces">Amount</th>
                </tr>
              </thead>
              <tbody className="font-inter text-slate-600">
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3">Base Fare (Inside Cabin, 7 nights)</td>
                  <td className="border border-gray-300 px-4 py-3 text-right">$4,200</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3">Automatic Gratuities</td>
                  <td className="border border-gray-300 px-4 py-3 text-right">$406</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3">Beverage Package (2 adults, 7 nights)</td>
                  <td className="border border-gray-300 px-4 py-3 text-right">$910</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3">Wi-Fi (Partial - 3 days)</td>
                  <td className="border border-gray-300 px-4 py-3 text-right">$85</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3">Port Excursions (2 ports, 2 people)</td>
                  <td className="border border-gray-300 px-4 py-3 text-right">$400</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3">Specialty Dinner (1 night, 4 people)</td>
                  <td className="border border-gray-300 px-4 py-3 text-right">$200</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3">Photography Package (digital)</td>
                  <td className="border border-gray-300 px-4 py-3 text-right">$199</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3">Bibbidi Boppidi Boutique (1 child)</td>
                  <td className="border border-gray-300 px-4 py-3 text-right">$70</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3">Port Parking (7 days at Port Canaveral)</td>
                  <td className="border border-gray-300 px-4 py-3 text-right">$210</td>
                </tr>
                <tr className="bg-blue-600/10 font-bold">
                  <td className="border border-gray-300 px-4 py-3">TOTAL CRUISE COST</td>
                  <td className="border border-gray-300 px-4 py-3 text-right text-blue-600">$6,680</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="font-inter text-slate-600 leading-relaxed mb-4">
            This realistic scenario shows that a $4,200 base fare becomes $6,680 when including common add-ons—a 59% increase. Families seeking more premium experiences (multiple specialty dinners, spa services, concierge suites) could easily surpass $10,000-15,000+ total.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-6">
            Ways to Reduce Your Total Cost
          </h2>
          <ul className="font-inter text-slate-600 space-y-3">
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span><strong>Book during promotional periods:</strong> Last-minute deals and seasonal promotions can save 15-30% on base fares.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span><strong>Skip beverage packages strategically:</strong> If your family rarely drinks, skip the package and order select beverages à la carte.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span><strong>Plan free excursions:</strong> Many ports offer beaches and attractions accessible without organized tours.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span><strong>Use onboard credit:</strong> Some booking promos include OBC that reduces out-of-pocket specialty dining costs.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span><strong>Share a cabin:</strong> Booking with another family reduces per-person base fares and opens larger stateroom options.</span>
            </li>
          </ul>
        </section>

        {/* Ad Slot 4 */}
        <a
              href="/concierge"
              className="block rounded-xl overflow-hidden border border-[#D4AF37] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2a4f7a] px-6 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[#D4AF37] font-bold text-base leading-tight">Plan Your Disney Cruise</p>
                  <p className="text-blue-200 text-sm mt-0.5">Connect with our concierge team for expert cruise planning</p>
                </div>
                <span className="flex-shrink-0 bg-[#D4AF37] text-[#1E3A5F] font-bold text-sm px-4 py-2 rounded-lg whitespace-nowrap">Get Started →</span>
              </div>
            </a>
  
        <section className="mb-12">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-6">
            Use Our Cost Calculator
          </h2>
          <div className="bg-gradient-to-b from-[#0a1628] to-[#1E3A5F] text-slate-900 p-8 rounded-lg">
            <p className="font-inter mb-6">
              Stop guessing at your cruise budget. Our interactive cost calculator lets you input your stateroom category, sailing length, family size, and preferred add-ons to generate a personalized total cost estimate.
            </p>
            <Link href="/tools/cost-calculator" className="inline-flex items-center gap-2 bg-[#D4AF37] text-slate-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-300 transition">
              Try the Cost Calculator <ArrowRight size={20} />
            </Link>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-6">
            Key Takeaways
          </h2>
          <ul className="font-inter text-slate-600 space-y-2">
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span>Base fares represent only 60-70% of your actual cruise cost</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span>Gratuities and beverage packages are the largest hidden costs</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span>Port excursions and specialty dining vary widely—budget per your interests</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span>Consider pre-cruise hotel, parking, and ground transportation in your total</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span>A realistic family budget ranges from $5,500-$12,000+ per week</span>
            </li>
          </ul>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-b from-[#0a1628] to-[#1E3A5F] text-slate-900 p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-fraunces font-bold mb-4">Ready to Plan Your Disney Cruise?</h2>
          <p className="font-inter mb-6">
            Use our tools to compare prices, calculate realistic budgets, and find the best deals on your next sailing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/deals" className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-slate-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-300 transition">
              View Current Deals <ArrowRight size={20} />
            </Link>
            <Link href="/tools/cost-calculator" className="inline-flex items-center justify-center gap-2 border-2 border-[#1E3A5F] text-slate-900 font-bold py-3 px-6 rounded-lg hover:bg-[#1E3A5F] hover:text-white transition">
              Calculate Your Cost <TrendingUp size={20} />
            </Link>
          </div>
        </section>

        {/* Related Guides */}
        <section className="border-t-2 border-gray-200 pt-12">
          <h2 className="text-2xl font-fraunces font-bold text-slate-900 mb-6">Related Guides</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/guides/best-disney-cruise-staterooms" className="group">
              <div className="bg-gray-50 p-6 rounded-lg hover:bg-[#1E3A5F]/10 transition">
                <h3 className="font-fraunces font-bold text-slate-900 mb-2 group-hover:text-[#D4AF37]">
                  Best Disney Cruise Staterooms
                </h3>
                <p className="font-inter text-gray-600 text-sm">
                  Category-by-category breakdown to choose your perfect cabin.
                </p>
              </div>
            </Link>
            <Link href="/guides/disney-cruise-with-toddlers" className="group">
              <div className="bg-gray-50 p-6 rounded-lg hover:bg-[#1E3A5F]/10 transition">
                <h3 className="font-fraunces font-bold text-slate-900 mb-2 group-hover:text-[#D4AF37]">
                  Disney Cruise with Toddlers
                </h3>
                <p className="font-inter text-gray-600 text-sm">
                  Complete guide for traveling with young children.
                </p>
              </div>
            </Link>
            <Link href="/guides/first-time-disney-cruise-tips" className="group">
              <div className="bg-gray-50 p-6 rounded-lg hover:bg-[#1E3A5F]/10 transition">
                <h3 className="font-fraunces font-bold text-slate-900 mb-2 group-hover:text-[#D4AF37]">
                  25 First-Time Cruise Tips
                </h3>
                <p className="font-inter text-gray-600 text-sm">
                  Essential advice for first-time Disney cruisers.
                </p>
              </div>
            </Link>
          </div>
        </section>
      </article>

      {/* Ad Slot 5 */}

      <GetQuoteCTA />

      <GetQuoteCTA />
    </div>
  );
}