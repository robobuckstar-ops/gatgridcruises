import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Affiliate & Advertising Disclosures',
  description: 'Full transparency about affiliate relationships, advertising, and sponsored content on GatGridCruises.',
}

export default function DisclosuresPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#0a1628] to-[#1E3A5F] text-white py-16 md:py-20 border-b border-slate-200">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-fraunces text-4xl md:text-5xl font-bold mb-4">Disclosures</h1>
          <p className="font-inter text-lg text-slate-600">
            Complete transparency about our relationships and how we earn revenue.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Affiliate Relationships */}
        <section className="mb-16">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Affiliate Relationships</h2>
          <p className="font-inter text-lg text-gray-700 leading-relaxed mb-4">
            GatGridCruises uses affiliate marketing to support the operation and development of this resource. When you click certain links on our site and complete a booking on the partner site, we may earn a commission.
          </p>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 font-inter text-gray-700">
            <p className="font-semibold text-[#1E3A5F] mb-3">We have affiliate partnerships with:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Booking.com (hotel accommodations)</li>
              <li>Expedia (flights and hotels)</li>
              <li>Skyscanner (flight comparisons)</li>
              <li>Other travel and cruise-related brands as appropriate</li>
            </ul>
            <p className="text-sm text-gray-600 mt-4">
              Important: These commissions are paid by the merchant at no extra cost to you. You pay the same price whether you click through our link or go directly to the website.
            </p>
          </div>
        </section>

        {/* Display Advertising */}
        <section className="mb-16">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Display Advertising</h2>
          <p className="font-inter text-lg text-gray-700 leading-relaxed mb-4">
            This website displays advertising to support ongoing operations and free content for users. Our primary advertising platforms include:
          </p>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 font-inter text-gray-700">
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li><strong>Google AdSense:</strong> Contextual ads served by Google</li>
              <li><strong>Direct Advertising:</strong> Brand partnerships with travel and lifestyle companies</li>
            </ul>
            <p className="text-sm text-gray-600">
              All advertising is clearly distinguished from editorial content. Ads are never integrated into reviews, recommendations, or scoring systems to maintain editorial integrity.
            </p>
          </div>
        </section>

        {/* Sponsored Content */}
        <section className="mb-16">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Sponsored Content</h2>
          <p className="font-inter text-lg text-gray-700 leading-relaxed mb-4">
            Some sections of this site feature paid placements and sponsored content. Examples include:
          </p>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 font-inter text-gray-700">
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li><strong>Travel Specialist Directory:</strong> Disney travel agents pay to appear in featured placements</li>
              <li><strong>Brand Features:</strong> Travel companies may sponsor guides and comparison tools</li>
            </ul>
            <p className="text-sm text-gray-600">
              All sponsored content is clearly labeled as "Sponsored" or "Paid Placement." We never hide the commercial nature of these relationships.
            </p>
          </div>
        </section>

        {/* Editorial Independence */}
        <section className="mb-16">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Editorial Independence</h2>
          <p className="font-inter text-lg text-gray-700 leading-relaxed">
            Advertising and affiliate relationships never influence our editorial content, Sailing Scores, ship reviews, or recommendations. Our analysis is based on data, user research, and honest evaluation — not on who pays to advertise on the site.
          </p>
        </section>

        {/* Privacy & Data */}
        <section className="mb-16">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Privacy & Data Collection</h2>
          <div className="space-y-4 font-inter text-gray-700">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Email Newsletter</h3>
              <p>We collect email addresses for our optional weekly newsletter. Subscription is opt-in only — we never add you to our list without your consent. You can unsubscribe at any time.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Analytics</h3>
              <p>We use Google Analytics to understand how visitors use GatGridCruises. This helps us improve the site and create better content. Analytics data is anonymized and aggregated.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Data Sharing</h3>
              <p>We do not sell personal data to third parties. Email addresses, names, and other personal information are only used for the purposes you provide them — like newsletter subscriptions.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Cookies</h3>
              <p>This site uses cookies for analytics, advertising, and site functionality. By using the site, you consent to standard cookie usage as described in our privacy practices.</p>
            </div>
          </div>
        </section>

        {/* Terms of Service */}
        <section className="mb-16">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Terms & Legal</h2>
          <div className="space-y-4 font-inter text-gray-700">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">For Informational Purposes</h3>
              <p>The information on this site is provided for general informational purposes only. It is not professional financial, travel, investment, or legal advice. Consult appropriate professionals before making booking or financial decisions.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Verify Information</h3>
              <p>Pricing, availability, and cruise details change frequently. Always verify prices, sailing dates, and inclusions directly with Disney Cruise Line or an authorized travel agent before booking.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">No Warranties</h3>
              <p>This site and its contents are provided "as is" without warranties of any kind. We make no guarantees about accuracy, completeness, or fitness for a particular purpose.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Limitation of Liability</h3>
              <p>GatGridCruises is not responsible for indirect, incidental, or consequential damages from use of this site, including decision-making based on our content.</p>
            </div>
          </div>
        </section>

        {/* Changes to Disclosures */}
        <section className="bg-[#1E3A5F]/10 border-l-4 border-[#D4AF37] p-6 rounded">
          <h2 className="font-fraunces text-2xl font-bold text-slate-900 mb-3">Changes to This Page</h2>
          <p className="font-inter text-gray-700">
            We may update these disclosures periodically as our business relationships and practices evolve. The most current version is always available on this page. Please check back regularly.
          </p>
        </section>
      </div>
    </main>
  )
}
