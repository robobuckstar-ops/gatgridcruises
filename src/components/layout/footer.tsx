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
                  <Link href="/newsletter" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
                    Newsletter
                  </Link>
                </li>
                <li>
                  <Link href="/alerts" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
                    Deal Alerts
                  </Link>
                </li>
                <li>
                  <Link href="/my-trip" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium">
                    My Trip ↗
                  </Link>
                </li>
              </ul>
              <div className="mt-6 pt-5 border-t border-slate-200">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Follow</p>
                <div className="flex gap-3">
                  {/* TODO: Update with real profile URL once created */}
                  <a
                    href="https://tiktok.com/@gatgridcruises"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="text-slate-500 hover:text-slate-900 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                    </svg>
                  </a>
                  {/* TODO: Update with real profile URL once created */}
                  <a
                    href="https://instagram.com/gatgridcruises"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="text-slate-500 hover:text-pink-600 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  {/* TODO: Update with real profile URL once created */}
                  <a
                    href="https://youtube.com/@gatgridcruises"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="text-slate-500 hover:text-red-600 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
                    </svg>
                  </a>
                </div>
              </div>
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
                  <Link href="/onboard-credit" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
                    Free Onboard Credit
                  </Link>
                </li>
                <li>
                  <Link href="/tools/obc-calculator" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
                    OBC Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/tools/cost-calculator" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
                    Cost Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/tools/credit-cards" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
                    Credit Card Hacks
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

            {/* Guides */}
            <div>
              <h3 className="font-display text-lg font-bold text-slate-900 mb-4">
                Guides
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/guides" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
                    All Guides
                  </Link>
                </li>
                <li>
                  <Link href="/guides/packing-gear" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
                    Packing Gear
                  </Link>
                </li>
                <li>
                  <Link href="/guides/travel-insurance" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
                    Travel Insurance
                  </Link>
                </li>
                <li>
                  <Link href="/guides/ports" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
                    Port Guides
                  </Link>
                </li>
                <li>
                  <Link href="/guides/ports/port-canaveral" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
                    Port Canaveral
                  </Link>
                </li>
                <li>
                  <Link href="/guides/ports/nassau" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
                    Nassau
                  </Link>
                </li>
                <li>
                  <Link href="/guides/ports/castaway-cay" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
                    Castaway Cay
                  </Link>
                </li>
                <li>
                  <Link href="/guides/ports/cozumel" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
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
                  <Link href="/blog/disney-cruise-packing-list" className="text-slate-500 text-sm hover:text-blue-600 transition-colors duration-200">
                    ↳ Packing List 2026
                  </Link>
                </li>
                <li>
                  <Link href="/blog/best-credit-cards-disney-cruises" className="text-slate-500 text-sm hover:text-blue-600 transition-colors duration-200">
                    ↳ Best Credit Cards
                  </Link>
                </li>
                <li>
                  <Link href="/blog/save-money-disney-cruise" className="text-slate-500 text-sm hover:text-blue-600 transition-colors duration-200">
                    ↳ 10 Money-Saving Tips
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
                <li>
                  <Link href="/price-tracker" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
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
