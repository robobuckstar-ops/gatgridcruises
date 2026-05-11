import { Metadata } from 'next'
import { NewsletterSignupForm } from './newsletter-signup-form'
import { Star, TrendingDown, CreditCard, Lightbulb, Mail, Check } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Disney Cruise Insider — Monthly Newsletter',
  description: 'Get the best Disney cruise deals, insider tips, and credit card hacks delivered monthly. Join 3,000+ savvy Disney cruisers.',
  openGraph: {
    title: 'Disney Cruise Insider — Monthly Newsletter',
    description: 'Get the best Disney cruise deals, insider tips, and credit card hacks delivered monthly.',
    url: 'https://gatgridcruises.com/newsletter',
    images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'GatGridCruises' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Disney Cruise Insider — Monthly Newsletter',
    description: 'Disney cruise deals, insider tips, and credit card hacks delivered monthly. Join 3,000+ savvy cruisers.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

const BENEFITS = [
  {
    icon: TrendingDown,
    title: 'Price Drop Alerts',
    description: 'We track thousands of sailings so you see the real bargains — including unadvertised GTY rate drops.',
  },
  {
    icon: CreditCard,
    title: 'Credit Card Hacks',
    description: 'Which cards earn the most on Disney bookings. How to use points for stateroom upgrades and onboard credit.',
  },
  {
    icon: Lightbulb,
    title: 'Insider Tips',
    description: 'Port arrival strategies, onboard booking windows, concierge-level perks for regular stateroom guests.',
  },
  {
    icon: Star,
    title: 'Deal Spotlights',
    description: 'Deep-dive analysis of the best current deals with honest breakdowns of total trip cost.',
  },
]

const SAMPLE_SUBJECTS = [
  { label: 'Deal Alert', subject: 'Disney Dream 7-night Caribbean — 23% below average' },
  { label: 'Tip', subject: 'How we booked Concierge using Chase Sapphire points' },
  { label: 'Deal Alert', subject: 'Last-minute Bahamas sailing — $899pp interior' },
  { label: 'Insider', subject: 'The best time to call Disney Cruise Line for upgrades' },
  { label: 'Credit Card', subject: 'New Amex offer: 10x on Disney Cruise prepayments' },
]

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0F172A] via-[#1E3A5F] to-[#1a3356] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/20 rounded-full mb-6">
            <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" aria-hidden="true" />
            <span className="text-[#D4AF37] text-sm font-bold tracking-wide">Free Monthly Newsletter</span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Disney Cruise<br />
            <span className="text-[#D4AF37]">Insider</span>
          </h1>

          <p className="text-blue-100 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mb-8">
            The best Disney cruise deals, insider tips, and credit card hacks — delivered to your inbox every month.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm text-blue-300">
            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 3,000+ subscribers</span>
            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Free forever</span>
            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> No spam, ever</span>
            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Unsubscribe anytime</span>
          </div>

          <NewsletterSignupForm source="newsletter_page" />
        </div>
      </div>

      {/* What You Get */}
      <div className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What's Inside Every Issue
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Not another generic travel newsletter. Everything in Disney Cruise Insider is specific, actionable, and designed to save you real money.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {BENEFITS.map(benefit => (
              <div key={benefit.title} className="flex gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex-shrink-0 w-11 h-11 bg-[#1E3A5F] rounded-xl flex items-center justify-center">
                  <benefit.icon className="w-5 h-5 text-[#D4AF37]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900 mb-1">{benefit.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sample Issues */}
      <div className="py-20 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Recent Issues
            </h2>
            <p className="text-slate-600">A taste of what hits your inbox.</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            {/* Fake email client header */}
            <div className="bg-slate-100 px-6 py-3 flex items-center gap-3 border-b border-slate-200">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-slate-500 border border-slate-200 text-center">
                Inbox — Disney Cruise Insider
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {SAMPLE_SUBJECTS.map((item, i) => (
                <div key={i} className={`px-6 py-4 flex items-start gap-4 ${i === 0 ? 'bg-[#1E3A5F]/10/50' : ''}`}>
                  <div className="flex-shrink-0">
                    <Mail className={`w-5 h-5 mt-0.5 ${i === 0 ? 'text-[#1E3A5F]' : 'text-slate-300'}`} aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold text-slate-900">GatGridCruises</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        item.label === 'Deal Alert' ? 'bg-amber-100 text-amber-700' :
                        item.label === 'Credit Card' ? 'bg-purple-100 text-purple-700' :
                        item.label === 'Insider' ? 'bg-[#1E3A5F]/20 text-[#162d4a]' :
                        'bg-emerald-100 text-emerald-700'
                      }`}>{item.label}</span>
                    </div>
                    <p className={`text-sm truncate ${i === 0 ? 'font-semibold text-slate-900' : 'text-slate-600'}`}>
                      {item.subject}
                    </p>
                  </div>
                  <span className="flex-shrink-0 text-xs text-slate-400">
                    {i === 0 ? 'Today' : `${i + 1}w ago`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Why Us */}
      <div className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="font-display text-5xl font-bold text-[#1E3A5F] mb-2">3,000+</p>
              <p className="text-slate-600 font-medium">Disney cruisers subscribed</p>
            </div>
            <div>
              <p className="font-display text-5xl font-bold text-[#1E3A5F] mb-2">$400+</p>
              <p className="text-slate-600 font-medium">Average savings per booking</p>
            </div>
            <div>
              <p className="font-display text-5xl font-bold text-[#1E3A5F] mb-2">Daily</p>
              <p className="text-slate-600 font-medium">Prices monitored across all ships</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-[#1E3A5F] py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Cruise Smarter?
          </h2>
          <p className="text-blue-200 mb-8">
            Join thousands of Disney cruisers who never pay full price. Your next great deal is in the next issue.
          </p>
          <NewsletterSignupForm source="newsletter_page_bottom" />
        </div>
      </div>
    </div>
  )
}
