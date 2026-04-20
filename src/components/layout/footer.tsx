import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-50 text-slate-700 border-t border-slate-200 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Four-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company */}
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900 mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
                  About
                </Link>
              </li>
              <li>
                <a
                  href="mailto:grayson@gatgridcruises.com"
                  className="text-slate-600 hover:text-blue-600 transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
              <li>
                <button className="text-slate-600 hover:text-blue-600 transition-colors text-left">
                  Subscribe
                </button>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900 mb-4">
              Tools
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/search" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
                  AI Cruise Finder
                </Link>
              </li>
              <li>
                <Link href="/tools/cost-calculator" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
                  Cost Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/carbon-calculator" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
                  Carbon Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/flights" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
                  Flight Finder
                </Link>
              </li>
              <li>
                <Link href="/tools/staterooms" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
                  Stateroom Finder
                </Link>
              </li>
              <li>
                <Link href="/tools/transfers" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
                  Transfer Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900 mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/deals" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
                  Deal Grid
                </Link>
              </li>
              <li>
                <Link href="/deals/last-minute" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
                  Last-Minute Deals
                </Link>
              </li>
              <li>
                <Link href="/ships" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
                  Ship Guides
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/travel-hacks" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
                  Travel Hacks
                </Link>
              </li>
              <li>
                <Link href="/solo-cruising" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
                  Solo Cruising Hub
                </Link>
              </li>
              <li>
                <Link href="/hotels" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
                  Hotel Guides
                </Link>
              </li>
              <li>
                <Link href="/tools/compare" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
                  Compare Sailings
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900 mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/disclosures" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
                  Disclosures
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimers */}
        <div className="border-t border-slate-200 pt-8 mb-8 space-y-4 text-sm">
          <p className="text-slate-500">
            <span className="text-slate-900 font-semibold">Disclaimer:</span> GatGridCruises is an independent information resource and is not affiliated with, endorsed by, or connected to The Walt Disney Company or Disney Cruise Line. All trademarks and intellectual property are owned by their respective holders.
          </p>
          <p className="text-slate-500">
            <span className="text-slate-900 font-semibold">Affiliate Notice:</span> This site contains affiliate links. We may earn a commission if you use our links to book on partner sites at no additional cost to you. These commissions help support the continued development of GatGridCruises.
          </p>
          <p className="text-slate-500">
            <span className="text-slate-900 font-semibold">Not Financial Advice:</span> The information and tools on GatGridCruises are provided for informational purposes only and do not constitute financial, investment, or travel advice. Always verify current prices and policies directly with Disney Cruise Line before making booking decisions.
          </p>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-200 pt-8 text-center text-slate-500">
          <p>
            &copy; {currentYear} GatGridCruises. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
