import { Metadata } from 'next'
import Link from 'next/link'
import {
  Shield,
  ArrowRight,
  Check,
  AlertCircle,
  Users,
  Gift,
  ChevronRight,
} from 'lucide-react'
import { GetQuoteCTA } from '@/components/get-quote-cta'

export const metadata: Metadata = {
  title: 'Military Disney Cruise Deals & Discounts 2026 | GatGridCruises',
  description:
    'Exclusive $250 onboard credit for military members on Disney Cruise Line 2026 sailings. Active duty, retired, Guard, Reserves, Coast Guard, Space Force, PHS, and NOAA eligible.',
  openGraph: {
    title: 'Military Disney Cruise Deals 2026 — $250 OBC Offer',
    description:
      'Active duty, retired, Guard, Reserves, Coast Guard, Space Force, PHS, and NOAA members qualify for special Disney cruise pricing.',
    url: 'https://gatgridcruises.com/deals/military',
    images: [
      { url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'Military Disney Cruise Deals' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Military Disney Cruise Deals 2026',
    description: '$250 OBC for eligible service members on Disney Cruise Line sailings.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

const ELIGIBLE_BRANCHES = [
  { icon: '🪖', label: 'Active Duty Military', detail: 'All branches — Army, Navy, Marine Corps, Air Force' },
  { icon: '🎖️', label: 'Retired Military', detail: 'Honorably discharged veterans with qualifying service' },
  { icon: '🛡️', label: 'National Guard', detail: 'Army and Air National Guard members' },
  { icon: '⚓', label: 'Reserves', detail: 'All branch reserve components' },
  { icon: '🏅', label: 'U.S. Coast Guard', detail: 'Active duty and retired Coast Guard' },
  { icon: '🚀', label: 'U.S. Space Force', detail: 'Active duty Guardians' },
  { icon: '⚕️', label: 'Public Health Service (PHS)', detail: 'Commissioned Corps officers' },
  { icon: '🌊', label: 'NOAA Corps', detail: 'National Oceanic and Atmospheric Administration officers' },
]

const HOW_TO_BOOK = [
  {
    step: '01',
    title: 'Confirm your eligibility',
    body: 'Review the eligible branches and service types above. You will need to provide proof of service (military ID, DD-214, or equivalent) when booking.',
  },
  {
    step: '02',
    title: 'Browse available sailings',
    body: 'Military rates are applied at booking — not all sailings show the discount in the public price. Our concierge can identify which sailings qualify and calculate your total savings.',
  },
  {
    step: '03',
    title: 'Contact our concierge',
    body: "Reach out to Dr. Grayson Starbuck, DPT at GatGrid. We'll confirm the military rate is applied, stack it with any other eligible offers, and handle all the booking details — at zero cost to you.",
  },
  {
    step: '04',
    title: 'Sail and enjoy your OBC',
    body: 'Your $250 onboard credit will be available the moment you board. Use it for excursions, specialty dining, spa treatments, drinks, or ship merchandise.',
  },
]

const FAQS = [
  {
    q: 'Does the $250 OBC stack with other promotions?',
    a: 'In many cases, yes. Military OBC can often be combined with standard OBC promotions. Our concierge will verify what can be stacked for your specific sailing at the time of booking.',
  },
  {
    q: 'Can family members who are not in the military travel on the booking?',
    a: 'Yes. The military rate typically applies to the entire stateroom reservation, not just the service member\'s ticket. The eligible service member must be a guest on the booking.',
  },
  {
    q: 'What documentation is required?',
    a: "You'll need a valid military ID, a Department of Defense Uniformed Services ID, a DD-214 (for veterans/retired), or equivalent official documentation. Disney verifies this at embarkation.",
  },
  {
    q: 'Are military rates available year-round?',
    a: 'Disney typically runs military appreciation promotions for specific booking windows. The 2026 $250 OBC offer is available on select sailings — contact us to check current availability before rates change.',
  },
  {
    q: 'Does GatGrid charge a fee for military quotes?',
    a: "No. Our partner agency Boardwalk Travel earns a commission directly from Disney. You pay exactly what Disney charges, and you get the military rate plus our concierge service at no extra cost.",
  },
  {
    q: 'Can I use the military rate and still get the GatGrid OBC bonus?',
    a: 'Yes. When you plan your cruise with our concierge, any bonus OBC we offer is on top of the military rate and Disney\'s own OBC promotions — subject to confirmation for your specific sailing.',
  },
]

export default function MilitaryDealsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-[#1E3A5F] to-slate-900 py-20 md:py-28 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-sm font-semibold mb-6">
                <Shield className="w-4 h-4" aria-hidden="true" />
                2026 Military Appreciation Offer
              </div>
              <h1 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Military &amp; Government Disney Cruise Deals
              </h1>
              <p className="text-blue-200 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl">
                In recognition of their service, Disney Cruise Line offers eligible military members and
                government service officers a{' '}
                <span className="text-[#D4AF37] font-bold">$250 onboard credit</span> on 2026 sailings.
                We help you book it right.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/concierge"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#D4AF37] text-[#1E3A5F] font-bold rounded-xl hover:bg-yellow-300 transition-colors text-sm"
                >
                  Book with Military Rate
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/deals"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors text-sm"
                >
                  Browse All Deals
                </Link>
              </div>
            </div>

            {/* Offer card */}
            <div className="w-full md:w-80 flex-shrink-0">
              <div className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D4AF37]/20 mb-4">
                  <Gift className="w-8 h-8 text-[#D4AF37]" aria-hidden="true" />
                </div>
                <div className="text-[#D4AF37] text-5xl font-fraunces font-bold mb-1">$250</div>
                <div className="text-white font-semibold text-lg mb-2">Onboard Credit</div>
                <div className="text-blue-200 text-sm mb-4">Per stateroom · 2026 sailings</div>
                <div className="space-y-2 text-left">
                  {[
                    'Valid on select 2026 sailings',
                    '8 eligible service branches',
                    'Stackable with other offers',
                    'No booking fee through GatGrid',
                  ].map(item => (
                    <div key={item} className="flex items-center gap-2 text-sm text-blue-100">
                      <Check className="h-4 w-4 text-[#D4AF37] flex-shrink-0" aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Who qualifies
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Disney Cruise Line extends this offer to eight branches of U.S. military and uniformed
              service. If you currently serve or have served in any of the following, you likely qualify.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ELIGIBLE_BRANCHES.map(branch => (
              <div
                key={branch.label}
                className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 hover:border-[#1E3A5F]/40 transition-colors"
              >
                <span className="text-2xl flex-shrink-0 mt-0.5" aria-hidden="true">
                  {branch.icon}
                </span>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">{branch.label}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{branch.detail}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Verification required:</span> Disney confirms military
              status during the booking process. Valid documentation (military ID, DD-214, or equivalent)
              must be presented. Our concierge will guide you through what&apos;s needed for your specific
              situation.
            </p>
          </div>
        </div>
      </section>

      {/* How to book */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">
            How to book your military rate
          </h2>
          <div className="space-y-8">
            {HOW_TO_BOOK.map(({ step, title, body }) => (
              <div key={step} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#1E3A5F] flex items-center justify-center">
                  <span className="text-[#D4AF37] font-bold text-sm">{step}</span>
                </div>
                <div className="pt-2">
                  <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OBC usage */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How to spend your $250 OBC
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Onboard credit is usable for almost everything on the ship — here&apos;s what veterans and
              service members typically prioritize.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🏖️', label: 'Shore Excursions', value: '$50–$120/person' },
              { icon: '🍽️', label: 'Specialty Dining', value: '$30–$60/reservation' },
              { icon: '💆', label: 'Senses Spa', value: '$80–$200/treatment' },
              { icon: '🍹', label: 'Drinks & Beverages', value: 'Cocktails, coffee & more' },
              { icon: '🛍️', label: 'Ship Merchandise', value: 'Disney Cruise exclusives' },
              { icon: '👧', label: "Kids' Activities", value: 'Premium youth programs' },
              { icon: '🎳', label: 'Activities & Rentals', value: 'Mini golf, equipment rental' },
              { icon: '📸', label: 'Photos', value: 'Disney PhotoPass prints' },
            ].map(item => (
              <div key={item.label} className="p-4 rounded-xl border border-slate-200 text-center">
                <div className="text-3xl mb-2" aria-hidden="true">{item.icon}</div>
                <div className="font-semibold text-slate-900 text-sm">{item.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 text-center mb-10">
            Common questions
          </h2>
          <div className="space-y-6">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="border-b border-slate-200 pb-6">
                <h3 className="font-semibold text-slate-900 mb-2 flex items-start gap-2">
                  <ChevronRight
                    className="h-4 w-4 text-[#D4AF37] flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  {q}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed pl-6">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Concierge CTA */}
      <section className="bg-gradient-to-br from-[#1E3A5F] via-[#162d4a] to-[#0f1f33] py-16 md:py-20 text-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-12 h-12 text-[#D4AF37] mx-auto mb-5" aria-hidden="true" />
          <h2 className="font-fraunces text-3xl md:text-4xl font-bold mb-4">
            Ready to book your military rate?
          </h2>
          <p className="text-blue-200 mb-8 leading-relaxed">
            Our concierge will verify the military rate applies to your sailing, stack it with any
            available promotions, and handle all the booking details — at no charge to you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/concierge"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#D4AF37] text-[#1E3A5F] font-bold rounded-xl hover:bg-yellow-300 transition-colors"
            >
              <Users className="h-5 w-5" aria-hidden="true" />
              Contact Concierge
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/deals"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
            >
              Browse Current Deals
            </Link>
          </div>
          <p className="mt-6 text-blue-400 text-sm">
            Thank you for your service. We&apos;re honored to help you and your family make the most of it.
          </p>
        </div>
      </section>
    </main>
  )
}
