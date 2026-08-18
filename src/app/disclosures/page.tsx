import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Affiliate & Advertising Disclosures',
  description: 'Full transparency about affiliate relationships, advertising, and sponsored content on GatGridCruises.',
}

export default function DisclosuresPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#0a1628] to-[#1E3A5F] text-white py-16 md:py-20 border-b border-slate-200">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-fraunces text-4xl md:text-5xl font-bold mb-4">Disclosures</h1>
          <p className="font-inter text-lg text-white/80">
            Complete transparency about our relationships and how we earn revenue.
          </p>
          <p className="font-inter text-sm text-white/60 mt-4">Last updated: August 2026</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Affiliate Relationships */}
        <section className="mb-16">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Affiliate Relationships</h2>
          <p className="font-inter text-lg text-gray-700 leading-relaxed mb-4">
            GatGridCruises uses affiliate marketing to support the operation and development of this resource. When you click certain links on our site and complete a booking on the partner site, we may earn a commission.
          </p>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 font-inter text-gray-700">
            <p className="font-semibold text-[#1E3A5F] mb-3">The affiliate programs we currently participate in:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Amazon Associates</strong> (tag: <code className="text-sm">gatgridcruise-20</code>) — product
                links in our packing lists, gear guides, and Fish Extender gift posts.
              </li>
              <li>
                <strong>Travelpayouts</strong> (marker 766218), including its Aviasales, Hotellook, and partner
                networks — flights, hotels, airport transfers, and travel insurance.
              </li>
              <li>
                <strong>CJ Affiliate</strong> (Commission Junction) — travel insurance and retail partners. Links
                appear on the pages where we have an active program with the merchant.
              </li>
              <li>
                <strong>Credit card issuer referral links</strong> — Chase, American Express, and Capital One
                &ldquo;refer a friend&rdquo; links on our credit card pages. We may receive points or a bonus when
                someone is approved through one of those links.
              </li>
            </ul>
            <p className="text-sm text-gray-600 mt-4">
              Where a page names a brand we do <em>not</em> have an affiliate relationship with, the link goes to the
              company&apos;s own site or to our free concierge form, and we earn nothing from it.
            </p>
            <p className="text-sm text-gray-600 mt-3">
              Important: These commissions are paid by the merchant at no extra cost to you. You pay the same price whether you click through our link or go directly to the website.
            </p>
          </div>
        </section>

        {/* Display Advertising */}
        <section className="mb-16">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Display Advertising</h2>
          <p className="font-inter text-lg text-gray-700 leading-relaxed mb-4">
            We do not currently run a third-party display ad network on this site — there is no AdSense, Mediavine, or
            similar ad unit on any page. Our revenue comes from the affiliate relationships above and from our free
            concierge service. What we do run:
          </p>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 font-inter text-gray-700">
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li><strong>Google Analytics 4 and Google Ads:</strong> measurement and our own advertising campaigns</li>
              <li><strong>Meta Pixel:</strong> measurement for our own advertising campaigns</li>
            </ul>
            <p className="text-sm text-gray-600">
              If we add display advertising later, ads will be clearly distinguished from editorial content and will
              never be integrated into reviews, recommendations, or scoring systems.
            </p>
          </div>
        </section>

        {/* Sponsored Content */}
        <section className="mb-16">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Sponsored Content</h2>
          <p className="font-inter text-lg text-gray-700 leading-relaxed mb-4">
            We do not currently sell sponsored posts or paid placements. No brand has paid for a ranking, a Sailing
            Score, or a spot in any of our guides or comparison tools.
          </p>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 font-inter text-gray-700">
            <p className="text-sm text-gray-600">
              If that ever changes, the placement will be clearly labeled &ldquo;Sponsored&rdquo; or &ldquo;Paid
              Placement&rdquo; on the page itself. We will never hide the commercial nature of a relationship.
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
      </div>
    </main>
  )
}
