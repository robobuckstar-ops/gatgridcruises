import Link from 'next/link'
import { EmailSignup } from '@/components/ui/email-signup'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="text-slate-700 border-t border-slate-200">
      {/* Newsletter Strip */}
      <div className="bg-[#1E3A5F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-2">Free Weekly Newsletter</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                Disney Cruise Deals to Your Inbox
              </h2>
              <p className="text-blue-200 text-sm leading-relaxed">
                Price drops, insider tips, and credit card hacks — every Sunday. No spam, unsubscribe anytime.
              </p>
              <div className="mt-3 flex flex-wrap gap-4 text-xs text-blue-300">
                <span>✓ Weekly price drops</span>
                <span>✓ Credit card hacks</span>
                <span>✓ Insider tips</span>
              </div>
            </div>
            <div>
              <EmailSignup />
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Five-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Company */}
            <div>
              <h3 className="font-display text-lg font-bold text-slate-900 mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-slate-600 hover:text-[#1E3A5F] transition-colors duration-200">
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-slate-600 hover:text-[#1E3A5F] transition-colors duration-200"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/newsletter" className="text-slate-600 hover:text-[#1E3A5F] transition-colors duration-200">
                    Newsletter
                  </Link>
                </li>
                <li>
                  <Link href="/alerts" className="text-slate-600 hover:text-[#1E3A5F] transition-colors duration-200">
                    Deal Alerts
                  </Link>
                </li>
                <li>
                  <Link href="/my-trip" className="text-slate-600 hover:text-[#1E3A5F] transition-colors duration-200 font-medium">
                    My Trip ↗
                  </Link>
                </li>
                <li>
                  <Link href="/already-booked" className="text-slate-600 hover:text-[#1E3A5F] transition-colors duration-200">
                    Already Booked?
                  </Link>
                </li>
                <li>
                  <Link href="/giving-back" className="text-slate-600 hover:text-[#1E3A5F] transition-colors duration-200">
                    Giving Back
                  </Link>
                </li>
                <li>
                  <Link href="/refer" className="text-slate-600 hover:text-[#1E3A5F] transition-colors duration-200">
                    Partner Program
                  </Link>
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
                  <Link href="/search" className="text-slate-600 hover:text-[#1E3A5F] transition-colors duration-200">
                    AI Cruise Finder
                  </Link>
                </li>
                <li>
                  <Link href="/onboard-credit" className="text-slate-600 hover:text-[#1E3A5F] transition-colors duration-200">
                    Free Onboard Credit
                  </Link>
                </li>
                <li>
                  <Link href="/tools/obc-calculator" className="text-slate-600 hover:text-[#1E3A5F] transition-colors duration-200">
                    OBC Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/tools/credit-cards" className="text-slate-600 hover:text-[#1E3A5F] transition-colors duration-200">
                    Credit Card Hacks
                  </Link>
                </li>
                <li>
                  <Link href="/tools/flights" className="text-slate-600 hover:text-[#1E3A5F] transition-colors duration-200">
                    Flight Finder
                  </Link>
                </li>
                <li>
                  <Link href="/flight-deals" className="text-slate-600 hover:text-[#1E3A5F] transition-colors duration-200">
                    Flight Deal Alerts
                  </Link>
                </li>
                <li>
                  <Link href="/tools/staterooms" className="text-slate-600 hover:text-[#1E3A5F] transition-colors duration-200">
                    Stateroom Finder
                  </Link>
                </li>
                <li>
                  <Link href="/tools/transfers" className="text-slate-600 hover:text-[#1E3A5F] transition-colors duration-200">
                    Transfer Guide
                  </Link>
                </li>
              </ul>
            </div>

            {/* Guides */}
            <div>
              <h3 className="font-display text-lg font-bold text-slate-900 mb-4">
                Guides
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/guides" className="text-slate-600 hover:text-[#1E3A5F] transition-colors duration-200">
                    All Guides
                  </Link>
                </li>
                <li>
                  <Link href="/guides/packing-gear" className="text-slate-600 hover:text-[#1E3A5F] transition-colors duration-200">
                    Packing Gear
                  </Link>
                </li>
                <li>
                  <Link href="/guides/travel-insurance" className="text-slate-600 hover:text-[#1E3A5F] transition-colors duration-200">
                    Travel Insurance
                  </Link>
                </li>
                <li>
                  <Link href="/guides/ports" className="text-slate-600 hover:text-[#1E3A5F] transition-colors duration-200">
                    Port Guides
                  </Link>
                </li>
                <li>
                  <Link href="/guides/ports/port-canaveral" className="text-slate-600 hover:text-[#1E3A5F] transition-colors duration-200">
                    Port Canaveral
                  </Link>
                </li>
                <li>
                  <Link href="/guides/ports/nassau" className="text-slate-600 hover:text-[#1E3A5F] transition-colors duration-200">
                    Nassau
                  </Link>
                </li>
                <li>
                  <Link href="/guides/ports/castaway-cay" className="text-slate-600 hover:text-[#1E3A5F] transition-colors duration-200">
                    Castaway Cay
                  </Link>
                </li>
                <li>
                  <Link href="/guides/ports/lookout-cay" className="text-slate-600 hover:text-[#1E3A5F] transition-colors duration-200">
                    Lookout Cay
                  </Link>
                </li>
                <li>
                  <Link href="/guides/ports/cozumel" className="text-slate-600 hover:text-[#1E3A5F] transition-colors duration-200">
                    Cozumel
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
                  <Link href="/deals" className="text-slate-600 hover:text-[#1E3A5F] transition-colors duration-200">
                    Deal Grid
                  </Link>
                </li>
                <li>
                  <Link href="/deals/last-minute" className="text-slate-600 hover:text-[#1E3A5F] transition-colors duration-200">
                    Last-Minute Deals
                  </Link>
                </li>
                <li>
                  <Link href="/ships" className="text-slate-600 hover:text-[#1E3A5F] transition-colors duration-200">
                    Ship Guides
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-slate-600 hover:text-[#1E3A5F] transition-colors duration-200">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/blog/disney-cruise-packing-list" className="text-slate-500 text-sm hover:text-[#1E3A5F] transition-colors duration-200">
                    ↳ Packing List 2026
                  </Link>
                </li>
                <li>
                  <Link href="/blog/how-to-get-comped-cruises" className="text-slate-500 text-sm hover:text-[#1E3A5F] transition-colors duration-200">
                    ↳ How to Get Comped Cruises
                  </Link>
                </li>
                <li>
                  <Link href="/blog/best-fish-extender-gifts" className="text-slate-500 text-sm hover:text-[#1E3A5F] transition-colors duration-200">
                    ↳ Best Fish Extender Gifts
                  </Link>
                </li>
                <li>
                  <Link href="/travel-hacks/best-cruise-credit-cards" className="text-slate-500 text-sm hover:text-[#1E3A5F] transition-colors duration-200">
                    ↳ Best Cruise Credit Cards
                  </Link>
                </li>
                <li>
                  <Link href="/travel-hacks" className="text-slate-600 hover:text-[#1E3A5F] transition-colors duration-200">
                    Travel Hacks
                  </Link>
                </li>
                <li>
                  <Link href="/solo-cruising" className="text-slate-600 hover:text-[#1E3A5F] transition-colors duration-200">
                    Solo Cruising Hub
                  </Link>
                </li>
                <li>
                  <Link href="/hotels" className="text-slate-600 hover:text-[#1E3A5F] transition-colors duration-200">
                    Hotel Guides
                  </Link>
                </li>
                <li>
                  <Link href="/tools/compare" className="text-slate-600 hover:text-[#1E3A5F] transition-colors duration-200">
                    Compare Sailings
                  </Link>
                </li>
                <li>
                  <Link href="/price-tracker" className="text-slate-600 hover:text-[#1E3A5F] transition-colors duration-200">
                    Price Tracker
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
                  <Link href="/disclosures" className="text-slate-600 hover:text-[#1E3A5F] transition-colors duration-200">
                    Disclosures
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-slate-600 hover:text-[#1E3A5F] transition-colors duration-200">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-slate-600 hover:text-[#1E3A5F] transition-colors duration-200">
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
          <div className="border-t border-slate-200 pt-8 text-center text-slate-500 space-y-1">
            <p>
              &copy; {currentYear} GatGrid Cruises. All rights reserved.
            </p>
            <p className="text-xs text-slate-400">
              All content, deal scores, pricing analysis, and AI-generated recommendations on this site are proprietary and protected by copyright law.
              Unauthorized scraping, reproduction, or distribution of any content is strictly prohibited and may result in legal action.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
