import { Metadata } from 'next'
import Link from 'next/link'
import {
  BadgeCheck,
  Clock,
  Gift,
  Mail,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  Wallet,
} from 'lucide-react'
import { OBCDisclaimer } from '@/components/ui/obc-disclaimer'
import { OBC_EXAMPLE_FARES, formatUSD, getOBC } from '@/lib/obc'
import { FreeQuoteForm } from './FreeQuoteForm'

// Destination page for Google and Meta ads. Everything here is subordinate to
// one job: get the quote form filled in. The form sits in the hero on mobile
// rather than below the fold, there is exactly one CTA, and every supporting
// section is short enough not to push a scroller past the point of intent.
//
// Ad traffic is overwhelmingly mobile, so the whole page is static server-
// rendered; the only client component is the form itself.

export const metadata: Metadata = {
  title: 'Free Disney Cruise Quote — No Obligation | GatGrid Cruises',
  description:
    'Get a free, no-obligation Disney cruise quote. Book through GatGrid and your sailing earns free onboard credit plus concierge planning and price-drop monitoring — at no additional cost versus booking direct.',
  alternates: { canonical: '/free-quote' },
  openGraph: {
    title: 'Free Disney Cruise Quote — No Obligation | GatGrid Cruises',
    description:
      'Free quote, free onboard credit, free concierge planning. Same Disney price as booking direct.',
    url: 'https://gatgridcruises.com/free-quote',
    siteName: 'GatGrid Cruises',
    images: [
      {
        url: 'https://gatgridcruises.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Free Disney cruise quote from GatGrid Cruises',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Disney Cruise Quote — No Obligation | GatGrid Cruises',
    description:
      'Free quote, free onboard credit, free concierge planning. Same Disney price as booking direct.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

const PERKS = [
  {
    icon: Gift,
    title: 'Free onboard credit',
    description:
      'Your booking earns credit that posts to your stateroom folio — spendable on drinks, spa, specialty dining, or excursions. Booking direct with Disney earns you none.',
  },
  {
    icon: Sparkles,
    title: 'Concierge planning included',
    description:
      'Booking-window reminders, dining and activity strategy, stateroom advice, packing help, and day-of boarding guidance. Free, for as long as you are our client.',
  },
  {
    icon: TrendingDown,
    title: 'Price-drop monitoring',
    description:
      'We watch your fare through final payment. If it drops while you are still in a penalty-free window, we rebook you at the lower rate.',
  },
  {
    icon: Wallet,
    title: 'No additional cost to you',
    description:
      'Disney sets the fare and it is the same either way — we do not add fees or markups. The onboard credit comes out of the standard travel-agent commission Disney pays the agency.',
  },
]

const REASONS = [
  'A real person answers you — not a call center queue or a chatbot.',
  'Disney Cruise Line is what we do, not one line among fifty.',
  'Your quote lists the fare and your onboard credit in writing before you commit to anything.',
  'You keep your Disney account for check-in, dining, and Port Adventures — nothing moves.',
  'No fees, no markups, no obligation to book after you see the numbers.',
]

const STEPS = [
  {
    title: 'Send the form',
    description: 'Four fields. Takes under a minute, and no payment details are involved.',
  },
  {
    title: 'We build your options',
    description:
      'Sailings that fit your dates and party, with the fare and your onboard credit spelled out.',
  },
  {
    title: 'You decide',
    description:
      'Book with us, ask more questions, or walk away. No follow-up pressure either way.',
  },
]

export default function FreeQuotePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero + form. On mobile the form is the first thing under the headline —
          an ad click should never have to scroll to find the conversion point. */}
      <section className="relative bg-gradient-to-br from-[#0a1628] to-[#1E3A5F] py-12 md:py-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, #D4AF37 0%, transparent 50%), radial-gradient(circle at 80% 20%, #2563EB 0%, transparent 50%)',
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-4 py-1.5 mb-5">
                <BadgeCheck className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
                <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
                  Free · No Obligation
                </span>
              </div>
              <h1 className="font-fraunces text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
                Get a Free Disney Cruise Quote — With Free Onboard Credit
              </h1>
              <p className="font-inter text-base sm:text-lg text-blue-200 leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0">
                Tell us roughly when you want to sail and who&apos;s coming. We&apos;ll email you
                real options with the fare and your onboard credit in writing — plus concierge
                planning and price-drop monitoring, all at no additional cost versus booking
                direct with Disney.
              </p>

              <ul className="space-y-2.5 max-w-xl mx-auto lg:mx-0 text-left">
                {[
                  'Free onboard credit on your sailing',
                  'Concierge planning from booking to boarding',
                  'We watch your fare and rebook it if it drops',
                  'Same Disney price — no fees, no markups',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <BadgeCheck
                      className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="font-inter text-sm text-blue-100">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="font-inter text-xs text-blue-400 mt-6 flex items-center justify-center lg:justify-start gap-2">
                <Clock className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                Quotes go out the same business day.
              </p>
            </div>

            <div
              id="quote"
              className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-7 backdrop-blur-sm scroll-mt-16"
            >
              <h2 className="font-fraunces text-xl sm:text-2xl font-bold text-white mb-2">
                Request Your Free Quote
              </h2>
              <p className="font-inter text-sm text-blue-300 mb-6 leading-relaxed">
                Four quick fields. No payment details, no obligation to book.
              </p>
              <FreeQuoteForm />
            </div>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-14 md:py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
              What You Get
            </p>
            <h2 className="font-fraunces text-2xl sm:text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">
              Same Cruise. Same Price. More Perks.
            </h2>
            <p className="font-inter text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Disney charges the same fare whether you book direct or through us. The only
              question is whether you want a travel agent&apos;s benefits attached to the booking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PERKS.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="flex gap-4 bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#1E3A5F] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#D4AF37]" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-fraunces text-base font-bold text-[#1E3A5F] mb-1.5">
                      {item.title}
                    </h3>
                    <p className="font-inter text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* OBC examples — dollar figures only, all derived from lib/obc.ts */}
          <div className="mt-10 bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="px-5 sm:px-6 py-5 border-b border-slate-200">
              <h3 className="font-fraunces text-lg sm:text-xl font-bold text-[#1E3A5F] mb-1">
                What the onboard credit looks like*
              </h3>
              <p className="font-inter text-sm text-slate-600">
                Based on your total cruise fare, before taxes and port fees.
              </p>
            </div>
            <table className="w-full">
              <caption className="sr-only">
                Example onboard credit amounts by total cruise fare
              </caption>
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th
                    scope="col"
                    className="px-5 sm:px-6 py-3 font-inter text-xs font-bold uppercase tracking-wider text-slate-500"
                  >
                    Your cruise fare
                  </th>
                  <th
                    scope="col"
                    className="px-5 sm:px-6 py-3 font-inter text-xs font-bold uppercase tracking-wider text-slate-500"
                  >
                    Onboard credit
                  </th>
                </tr>
              </thead>
              <tbody>
                {OBC_EXAMPLE_FARES.map((fare) => (
                  <tr key={fare} className="border-t border-slate-100">
                    <td className="px-5 sm:px-6 py-3.5 font-inter text-sm text-slate-700">
                      {formatUSD(fare)}
                    </td>
                    <td className="px-5 sm:px-6 py-3.5 font-inter text-base font-bold text-[#1E3A5F]">
                      {formatUSD(getOBC(fare))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-5 sm:px-6 py-4 bg-slate-50 border-t border-slate-200">
              <p className="font-inter text-xs text-slate-500">
                Illustrative amounts, not a quote — your credit depends on your actual fare and
                on the conditions below. Want your exact figure? Run the{' '}
                <Link
                  href="/tools/obc-calculator"
                  className="text-[#1E3A5F] font-semibold hover:underline"
                >
                  OBC calculator
                </Link>{' '}
                or just ask us above.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why book with us */}
      <section className="py-14 md:py-20 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div>
              <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
                Why GatGrid
              </p>
              <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-[#1E3A5F] mb-6">
                Reasons People Book With Us
              </h2>
              <ul className="space-y-3.5">
                {REASONS.map((reason) => (
                  <li key={reason} className="flex items-start gap-3">
                    <ShieldCheck
                      className="w-5 h-5 text-[#1E3A5F] flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="font-inter text-sm text-slate-700 leading-relaxed">
                      {reason}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
                How It Works
              </p>
              <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-[#1E3A5F] mb-6">
                Three Steps, No Commitment
              </h2>
              <ol className="space-y-4">
                {STEPS.map((step, i) => (
                  <li
                    key={step.title}
                    className="flex gap-4 bg-white border border-slate-200 rounded-2xl p-5"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-[#1E3A5F] text-sm font-bold">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-fraunces text-base font-bold text-[#1E3A5F] mb-1">
                        {step.title}
                      </h3>
                      <p className="font-inter text-sm text-slate-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Honest framing — what we can and can't promise. */}
          <div className="mt-10 bg-amber-50 border-l-4 border-[#D4AF37] rounded-r-2xl p-5 sm:p-7">
            <h3 className="font-fraunces text-base font-bold text-[#1E3A5F] mb-2">
              A straight word about what this is
            </h3>
            <p className="font-inter text-sm text-slate-700 leading-relaxed">
              A quote is a quote, not a reservation — fares and stateroom availability are set by
              Disney Cruise Line and can change before you book. We don&apos;t claim to beat
              Disney&apos;s price, because nobody can: Disney sets the same fare for every agency
              and for booking direct. What we add is the onboard credit, the planning help, and
              the price-drop monitoring, at no additional cost to you. Onboard credit is subject
              to the conditions noted below, and we&apos;ll confirm your exact amount in writing
              before you commit to anything. GatGrid Cruises is not affiliated with Disney Cruise
              Line.
            </p>
          </div>
        </div>
      </section>

      {/* Closing CTA — same single destination as the hero form. */}
      <section className="py-14 md:py-20 bg-[#0d1f3c]">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-fraunces text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Ready for Your Free Quote?
          </h2>
          <p className="font-inter text-base text-blue-200 leading-relaxed mb-8">
            Under a minute to send, no payment details, no obligation. We&apos;ll email your
            options the same business day.
          </p>
          <a
            href="#quote"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#D4AF37] text-[#0a1628] font-bold rounded-xl hover:bg-yellow-300 transition-colors shadow-lg text-base"
          >
            Get My Free Quote
          </a>
          <p className="mt-8">
            <a
              href="mailto:bookings@gatgridcruises.com?subject=Free%20Disney%20Cruise%20Quote"
              className="inline-flex items-center gap-2 text-blue-300 font-semibold text-sm hover:text-[#D4AF37] transition-colors"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              Prefer email? bookings@gatgridcruises.com
            </a>
          </p>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-10 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <OBCDisclaimer />
        </div>
      </section>
    </main>
  )
}
