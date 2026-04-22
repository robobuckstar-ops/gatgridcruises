import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About GatGridCruises',
  description: 'Learn about GatGridCruises — an independent Disney cruise planning resource built for families who want transparent, honest information.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 text-slate-900 py-16 md:py-20 border-b border-slate-200">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-fraunces text-4xl md:text-5xl font-bold mb-4">About GatGridCruises</h1>
          <p className="font-inter text-lg text-slate-600">
            Independent Disney cruise planning. Honest advice. No booking pressure.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Who We Are */}
        <section className="mb-16">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Who We Are</h2>
          <p className="font-inter text-lg text-gray-700 leading-relaxed">
            GatGridCruises is an independent Disney cruise planning resource built for families who want transparent, honest information before committing thousands of dollars to a cruise vacation. We're not a booking platform — we don't sell cruises or process reservations. We're a media and tools platform, like NerdWallet for Disney cruises. We do earn affiliate commissions when you click through to partner sites (hotels, flights, travel services) at no extra cost to you — these are disclosed throughout the site.
          </p>
        </section>

        {/* Why This Exists */}
        <section className="mb-16">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Why This Exists</h2>
          <p className="font-inter text-lg text-gray-700 leading-relaxed">
            Because planning a Disney cruise is overwhelming. The real cost is always higher than the advertised price. And most "cruise deal" sites are just travel agencies in disguise. We built GatGridCruises to be different — no booking pressure, no hidden agendas, just tools and information.
          </p>
        </section>

        {/* The Name */}
        <section className="mb-16">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">The Name</h2>
          <p className="font-inter text-lg text-gray-700 leading-relaxed">
            GatGridCruises is named after our founder's kids — Gatlin and Gridley. Because the whole reason we got into Disney cruises was to give our family the best possible vacation.
          </p>
        </section>

        {/* Editorial Independence */}
        <section className="mb-16">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Editorial Independence</h2>
          <p className="font-inter text-lg text-gray-700 leading-relaxed mb-4">
            This site is independently owned and operated. The founder is an independent travel agent under Boardwalk Travel Agency (an Authorized Disney Vacation Planner), but the website is a separate media property. This separation is intentional to maintain editorial credibility.
          </p>
          <p className="font-inter text-lg text-gray-700 leading-relaxed">
            That means our cruise reviews, price analyses, and ship evaluations are never influenced by bookings we might take. We're building a resource for families first, a business second.
          </p>
        </section>

        {/* Disclaimers */}
        <section className="mb-16 bg-slate-50 border-l-4 border-blue-600 p-6 rounded">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-6">Disclaimers & Disclosures</h2>

          <div className="space-y-4 font-inter text-gray-700">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Affiliate Links</h3>
              <p>Some links on this site are affiliate links (Booking.com, Expedia, Skyscanner, and others). When you click through and complete a booking on the partner site, we may earn a commission at no extra cost to you. We only recommend products and services we genuinely believe are helpful for cruise planning.</p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Advertising</h3>
              <p>This site displays advertising, including Google AdSense and direct brand partnerships. All ads are clearly marked. Advertising relationships do not influence our editorial content, recommendations, or scoring systems.</p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Sponsored Content</h3>
              <p>Some content modules (like "Find a Disney Travel Specialist") are paid placements from travel agencies and service providers. These are always labeled as "Sponsored." We don't hide partnerships — we're transparent about them.</p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Information Accuracy</h3>
              <p>We make every effort to keep pricing, sailing schedules, and ship information accurate. However, Disney Cruise Line updates this information frequently. Always verify prices and availability directly with Disney or an authorized travel agent before booking.</p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Not Financial Advice</h3>
              <p>GatGridCruises is for informational purposes only and should not be construed as financial, investment, travel, or legal advice. We're a media platform sharing research and tools — not advisors. Consult a travel professional or financial advisor for decisions specific to your situation.</p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Prices and Availability</h3>
              <p>All prices and availability information displayed on this site are for informational purposes and may not reflect real-time data. Cruise pricing is dynamic and changes constantly. Verify all details with Disney Cruise Line or an authorized booking partner before committing.</p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-2">User-Generated Content</h3>
              <p>Reviews and comments from community members represent individual experiences and opinions, not official endorsements from GatGridCruises. We're not responsible for accuracy or appropriateness of user submissions.</p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="text-center bg-blue-600 text-white rounded-lg p-8">
          <h2 className="font-fraunces text-2xl font-bold mb-3">Get in Touch</h2>
          <p className="font-inter text-blue-100 mb-4">
            Have a question, suggestion, or partnership inquiry?
          </p>
          <a
            href="mailto:grayson@gatgridcruises.com"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#D4AF37] text-slate-900 font-semibold hover:bg-yellow-300 transition-colors duration-200"
          >
            Email Us
          </a>
        </section>
      </div>
    </main>
  )
}
