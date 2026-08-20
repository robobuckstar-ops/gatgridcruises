import { Metadata } from 'next'
import Link from 'next/link'
import { Heart, ArrowRight, ExternalLink, HandHeart, Stethoscope, Users } from 'lucide-react'
import {
  CURE_PLEDGE_PERCENT,
  CURE_BUSINESS_DONATED_TOTAL,
  CURE_DONATIONS_LAST_UPDATED,
  FOUNDER_PERSONAL_GIVING_TOTAL,
  FOUNDER_PERSONAL_GIVING_SINCE,
  CURE_URL,
  CURE_DONATE_URL,
  formatGivingAmount,
} from '@/lib/giving'

const PAGE_TITLE = `Giving Back — ${CURE_PLEDGE_PERCENT}% of Commission to CURE.org | GatGrid Cruises`
const PAGE_DESCRIPTION = `GatGrid Cruises donates ${CURE_PLEDGE_PERCENT}% of our commission from every cruise booking to CURE.org, helping children around the world receive life-changing surgical care.`

export const metadata: Metadata = {
  alternates: { canonical: '/giving-back' },
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: 'https://gatgridcruises.com/giving-back',
    siteName: 'GatGrid Cruises',
    images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'GatGrid Cruises gives back to CURE.org' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: `We donate ${CURE_PLEDGE_PERCENT}% of our commission from every cruise booking to CURE.org.`,
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

const HOW_IT_WORKS = [
  {
    icon: HandHeart,
    title: 'You plan a cruise with our concierge',
    description:
      "Work with Grayson on a Disney cruise itinerary that fits your family. The Disney price doesn't change — you pay exactly what you'd pay booking direct.",
  },
  {
    icon: Users,
    title: 'Boardwalk Travel Agency processes the booking',
    description:
      'Disney Cruise Line pays the agency a standard travel-agent commission. No extra cost to you, no markup on your fare.',
  },
  {
    icon: Stethoscope,
    title: `We donate ${CURE_PLEDGE_PERCENT}% of that commission to CURE.org`,
    description: `On every booking — not just first-time clients, not just promotions — ${CURE_PLEDGE_PERCENT}% of our share goes directly to CURE to fund pediatric surgical care.`,
  },
]

const FAQ = [
  {
    q: 'Why CURE.org specifically?',
    a: "CURE operates a network of children's hospitals in low-income countries that perform life-changing surgeries — clubfoot repair, cleft lip/palate, hydrocephalus, burn contracture release, and more. The cost-per-surgery is unusually low because of their model, which means every dollar travels far. Their financials are public and audited.",
  },
  {
    q: 'Does the donation come out of what I pay?',
    a: `No. Disney Cruise Line sets the price; you pay Disney directly. Disney then pays the travel agency a commission on the booking. The ${CURE_PLEDGE_PERCENT}% donation comes out of our share of that commission — it doesn't add anything to your fare and doesn't reduce your onboard credit.`,
  },
  {
    q: 'How do I know the donation actually happens?',
    a: "We donate quarterly through CURE's official donor portal at cure.org. If you'd like a copy of our donation receipts for a given quarter, email bookings@gatgridcruises.com and we'll share them.",
  },
  {
    q: 'Is GatGrid affiliated with CURE.org?',
    a: "No. We're an independent donor — not a partner, sponsor, or affiliate. CURE has not endorsed or reviewed GatGrid Cruises. We chose them because their work is effective and verifiable, not because of any business relationship.",
  },
  {
    q: 'Can I donate to CURE directly instead?',
    a: `Absolutely, and we'd encourage it. Visit cure.org/donate to give directly. Our ${CURE_PLEDGE_PERCENT}% commitment is on top of any direct giving — it's our way of making every booking do a little extra good.`,
  },
]

export default function GivingBackPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#0a1628] to-[#1E3A5F] py-20 md:py-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, #D4AF37 0%, transparent 50%), radial-gradient(circle at 80% 20%, #2563EB 0%, transparent 50%)',
          }}
        />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-4 py-1.5 mb-6">
            <Heart className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
              Giving Back
            </span>
          </div>
          <h1 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Every Cruise Helps a Child<br className="hidden sm:block" /> Get Surgery They Need
          </h1>
          <p className="font-inter text-lg md:text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed">
            GatGrid donates <span className="text-[#D4AF37] font-semibold">{CURE_PLEDGE_PERCENT}% of our commission</span> from every cruise
            booking to <a href={CURE_URL} target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] underline decoration-dotted underline-offset-4 hover:text-yellow-300 transition-colors">CURE.org</a>,
            funding life-changing surgical care for children in low-income countries.
          </p>
        </div>
      </section>

      {/* Why it matters */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3 text-center">
            Why CURE
          </p>
          <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-6 text-center">
            Surgical Care That Changes a Life
          </h2>
          <div className="prose prose-slate max-w-none space-y-4 font-inter text-slate-600 leading-relaxed">
            <p>
              For a child born with clubfoot, cleft lip, hydrocephalus, or a burn contracture, a single surgical procedure
              can transform their entire future — from a life of isolation to one of school, work, and dignity. In the
              countries CURE serves, those surgeries simply aren&apos;t available without help.
            </p>
            <p>
              CURE operates a network of children&apos;s hospitals across Africa, the Middle East, and the Philippines,
              where local surgical teams perform tens of thousands of procedures every year. Their per-surgery cost is
              dramatically lower than what a comparable procedure would cost in the U.S., which means a small donation
              translates into outsized impact.
            </p>
            <p>
              We picked CURE for two reasons: their work is verifiably effective (audited financials, public outcomes
              data), and a small commission share goes a meaningful distance in their model.
            </p>
          </div>

          <div className="mt-8 text-center">
            <a
              href={CURE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-300 text-[#1E3A5F] font-semibold rounded-xl hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors text-sm"
            >
              Learn More at cure.org
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* Founder's personal commitment */}
      <section className="py-16 md:py-20 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 md:p-10">
            <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
              Where This Started
            </p>
            <h2 className="font-fraunces text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-5">
              This Isn&apos;t a New Cause for Us
            </h2>
            <div className="space-y-4 font-inter text-slate-600 leading-relaxed">
              <p>
                Our founder, Grayson, has personally supported CURE with over{' '}
                <span className="font-semibold text-[#1E3A5F]">
                  {formatGivingAmount(FOUNDER_PERSONAL_GIVING_TOTAL)} in giving since{' '}
                  {FOUNDER_PERSONAL_GIVING_SINCE}
                </span>{' '}
                — his own money, given quietly, long before GatGrid Cruises existed.
              </p>
              <p>
                Now the business is joining in. Starting today, GatGrid Cruises commits to give back on every
                booking we process, so the work Grayson has been supporting on his own gets a little help from
                the company too.
              </p>
            </div>
            <p className="mt-6 text-xs text-slate-500 leading-relaxed">
              The {formatGivingAmount(FOUNDER_PERSONAL_GIVING_TOTAL)} figure reflects Grayson&apos;s personal
              donations, confirmed by CURE International&apos;s donor relations team. It is separate from the
              company tracker below, which counts only what GatGrid Cruises gives as a business.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
              How It Works
            </p>
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">
              From Your Booking to a Surgery
            </h2>
            <p className="font-inter text-lg text-slate-600 max-w-2xl mx-auto">
              The donation is built into how we operate. You don&apos;t pay extra and you don&apos;t lose any of your
              onboard credit — it comes out of our share of the standard travel-agent commission Disney pays.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={i} className="relative bg-white border border-slate-200 rounded-2xl p-6">
                  <div className="absolute -top-3 left-6 bg-[#D4AF37] text-[#1E3A5F] text-xs font-bold rounded-full px-3 py-1">
                    Step {i + 1}
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-[#1E3A5F]/5 flex items-center justify-center mb-4 mt-2">
                    <Icon className="w-5 h-5 text-[#1E3A5F]" aria-hidden="true" />
                  </div>
                  <h3 className="font-fraunces text-lg font-bold text-[#1E3A5F] mb-2">{step.title}</h3>
                  <p className="font-inter text-sm text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Fundraising tracker */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#0a1628] to-[#1E3A5F] rounded-3xl p-8 md:p-12 text-center">
            <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-4">
              Our Running Total
            </p>
            <p className="font-inter text-blue-200 text-sm mb-2">
              Raised for CURE by GatGrid Cruises
            </p>
            <p className="font-fraunces text-5xl md:text-7xl font-bold text-[#D4AF37] mb-5 leading-none tabular-nums">
              {formatGivingAmount(CURE_BUSINESS_DONATED_TOTAL)}
            </p>
            {CURE_BUSINESS_DONATED_TOTAL > 0 ? (
              <p className="font-inter text-blue-200 max-w-xl mx-auto leading-relaxed">
                That&apos;s {CURE_PLEDGE_PERCENT}% of our commission from every booking we&apos;ve processed,
                donated to CURE. This number goes up every time someone books a cruise with us.
              </p>
            ) : (
              <p className="font-inter text-blue-200 max-w-xl mx-auto leading-relaxed">
                We&apos;re starting at zero, and we&apos;d rather show you that honestly than pad the number. The
                pledge begins with our next booking — {CURE_PLEDGE_PERCENT}% of that commission goes to CURE, and
                this total goes up from there.
              </p>
            )}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="font-inter text-sm text-blue-300 leading-relaxed">
                {CURE_PLEDGE_PERCENT}% of every cruise commission, every booking, every time. No fine print, no
                &ldquo;up to,&rdquo; no marketing-only campaign.
              </p>
              <p className="text-xs text-blue-400 mt-3">
                Business donations only — updated {CURE_DONATIONS_LAST_UPDATED}. Grayson&apos;s personal giving is
                tracked separately and isn&apos;t counted here.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">
              Common Questions
            </h2>
          </div>
          <div className="space-y-4">
            {FAQ.map((item, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl p-6 bg-white">
                <h3 className="font-fraunces text-base md:text-lg font-bold text-[#1E3A5F] mb-3 flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] text-xs font-bold mt-0.5">
                    {i + 1}
                  </span>
                  {item.q}
                </h3>
                <p className="font-inter text-sm text-slate-600 leading-relaxed pl-9">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#0a1628] via-[#1E3A5F] to-[#0a1628]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-white mb-4">
            Plan Your Cruise. Help a Child.
          </h2>
          <p className="font-inter text-lg text-blue-200 mb-8 max-w-xl mx-auto leading-relaxed">
            Same Disney price. Free onboard credit. And every booking funds a piece of a surgery that changes a child&apos;s
            life.
          </p>
          <Link
            href="/concierge"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#D4AF37] text-[#0a1628] font-bold rounded-xl hover:bg-yellow-300 transition-colors shadow-lg text-base"
          >
            Talk to Our Concierge
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <p className="font-inter text-sm text-blue-200 mt-6">
            Not booking a cruise but want to help?{' '}
            <a
              href={CURE_DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4AF37] underline decoration-dotted underline-offset-4 hover:text-yellow-300 transition-colors"
            >
              Give to CURE directly
            </a>
            .
          </p>
          <p className="text-xs text-blue-400 mt-5">
            GatGrid Cruises is an independent donor and is not affiliated with or endorsed by CURE International.
          </p>
        </div>
      </section>
    </main>
  )
}
