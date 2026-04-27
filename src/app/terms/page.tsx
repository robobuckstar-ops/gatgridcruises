import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'GatGridCruises terms of use — the rules and guidelines for using our website.',
}

export default function TermsPage() {
  return (
    <main>
      <section className="bg-gradient-to-br from-[#1E3A5F] to-[#1a3a5c] text-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-fraunces text-4xl font-bold mb-4">Terms of Use</h1>
          <p className="text-gray-300">Last updated: April 2026</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="prose prose-slate">
          <h2 className="font-fraunces text-2xl font-bold text-[#1E3A5F] mb-4">Acceptance of Terms</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            By accessing and using GatGridCruises.com, you agree to these Terms of Use. If you do not agree, please do not use the site. We reserve the right to modify these terms at any time — continued use constitutes acceptance of changes.
          </p>

          <h2 className="font-fraunces text-2xl font-bold text-[#1E3A5F] mb-4 mt-10">Nature of the Service</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            GatGridCruises.com is an independent informational and editorial website. We are <strong>not</strong> a travel agency, booking platform, or authorized seller of Disney Cruise Line products. We do not sell cruises, accept bookings, process payments, or issue travel documents. All pricing information displayed is sourced from publicly available data and is subject to change. Always verify current pricing on the official Disney Cruise Line website before making purchasing decisions.
          </p>

          <h2 className="font-fraunces text-2xl font-bold text-[#1E3A5F] mb-4 mt-10">Disclaimer of Warranties</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            All content on GatGridCruises.com is provided &quot;as is&quot; for informational purposes only. While we strive for accuracy, we make no warranties or guarantees regarding the completeness, reliability, or currentness of pricing data, sailing availability, ship amenities, or any other information. Cruise prices fluctuate frequently and the data on our site may not reflect real-time pricing.
          </p>

          <h2 className="font-fraunces text-2xl font-bold text-[#1E3A5F] mb-4 mt-10">Affiliate Relationships</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Some links on our site are affiliate links to third-party services including hotel booking platforms (Booking.com), flight search engines (Skyscanner), and other travel services (Expedia). When you click these links and make a purchase, we may earn a commission at no extra cost to you. These relationships are disclosed throughout the site and on our <Link href="/disclosures" className="text-[#D4AF37] hover:underline">Disclosures page</Link>. Affiliate relationships do not influence our editorial content, scores, or recommendations.
          </p>

          <h2 className="font-fraunces text-2xl font-bold text-[#1E3A5F] mb-4 mt-10">Intellectual Property</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            All original content on GatGridCruises.com — including text, graphics, tools, calculators, and code — is the property of GatGridCruises and protected by copyright law. Disney, Disney Cruise Line, and all related marks are trademarks of The Walt Disney Company. We use these marks solely for informational and editorial purposes under fair use. We are not affiliated with, endorsed by, or sponsored by The Walt Disney Company.
          </p>

          <h2 className="font-fraunces text-2xl font-bold text-[#1E3A5F] mb-4 mt-10">User Conduct</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            You agree not to scrape, crawl, or automatically extract data from our site without permission; attempt to interfere with the site&apos;s operation; use the site for any unlawful purpose; or submit false information through any form on the site.
          </p>

          <h2 className="font-fraunces text-2xl font-bold text-[#1E3A5F] mb-4 mt-10">Limitation of Liability</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            GatGridCruises shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of, or inability to use, this website. This includes but is not limited to reliance on pricing data, booking decisions made based on our content, or any loss resulting from following our recommendations. Your use of external links and third-party services is at your own risk.
          </p>

          <h2 className="font-fraunces text-2xl font-bold text-[#1E3A5F] mb-4 mt-10">Contact</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            For questions about these terms, contact us at legal@gatgridcruises.com or via our <Link href="/about" className="text-[#D4AF37] hover:underline">About page</Link>.
          </p>
        </div>
        </div>
      </section>
    </main>
  )
}
