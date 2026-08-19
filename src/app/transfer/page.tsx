import { Metadata } from 'next'
import Link from 'next/link'
import {
  Anchor,
  CheckCircle,
  Clock,
  Gift,
  Mail,
  ShieldCheck,
  Sparkles,
  TrendingDown,
} from 'lucide-react'
import { OBCDisclaimer } from '@/components/ui/obc-disclaimer'
import { OBC_EXAMPLE_FARES, formatUSD, getOBC } from '@/lib/obc'
import { TransferForm } from './TransferForm'

export const metadata: Metadata = {
  title: 'Transfer Your Disney Cruise Booking — Free Onboard Credit | GatGrid',
  description:
    'Already booked your Disney cruise directly? You may be able to add GatGrid as your travel agent and unlock free onboard credit and concierge help — at no additional cost to you.',
  alternates: { canonical: 'https://gatgridcruises.com/transfer' },
  openGraph: {
    title: 'Transfer Your Disney Cruise Booking — Free Onboard Credit | GatGrid',
    description:
      'Booked direct with Disney? Add us as your travel agent and unlock onboard credit and concierge service at no additional cost.',
    url: 'https://gatgridcruises.com/transfer',
    siteName: 'GatGrid Cruises',
    images: [
      {
        url: 'https://gatgridcruises.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Transfer your Disney cruise booking for free onboard credit',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Transfer Your Disney Cruise Booking — Free Onboard Credit | GatGrid',
    description:
      'Booked direct with Disney? Add us as your travel agent and unlock onboard credit at no additional cost.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

/**
 * Disney sets these rules and can change them, so the page states them as the
 * general shape of the policy and promises a human check rather than an
 * automated yes/no. Verified against Disney Cruise Line's published booking
 * transfer policy — see the disclaimer block rendered below.
 */
const ELIGIBILITY = [
  {
    icon: Anchor,
    title: 'You booked directly with Disney',
    description:
      'Booked on disneycruise.com, through the Disney Cruise Line app, or over the phone with Disney. A reservation already held by another travel agency can’t be moved to us — Disney only transfers bookings out of its own direct channel.',
  },
  {
    icon: Clock,
    title: 'You booked recently — commonly within about 30 days',
    description:
      'Disney generally accepts a transfer request within roughly 30 days of the original booking date. If you booked this week you almost certainly qualify; if it has been a couple of months, it is likely past the window — but it costs nothing to have us check.',
  },
  {
    icon: ShieldCheck,
    title: 'You have not made final payment',
    description:
      'A reservation that is paid in full is not eligible for transfer. As long as you are still on a deposit and final payment has not been processed, this part is usually satisfied.',
  },
]

const BENEFITS = [
  {
    icon: Gift,
    title: 'Free onboard credit',
    description:
      'Once the transfer completes, your booking qualifies for onboard credit that posts to your stateroom folio — spendable on drinks, spa, specialty dining, or excursions. Booking direct with Disney earns you none.',
  },
  {
    icon: Sparkles,
    title: 'Concierge service included',
    description:
      'Booking-window reminders, dining and activity strategy, packing help, and day-of boarding guidance. Free, for as long as you are our client.',
  },
  {
    icon: TrendingDown,
    title: 'Price-drop monitoring',
    description:
      'We watch your fare from transfer day through final payment. If it drops while you are still in a penalty-free window, we rebook you at the lower rate.',
  },
  {
    icon: CheckCircle,
    title: 'Nothing about your cruise changes',
    description:
      'Same reservation number, same ship, same sail date, same stateroom, same Castaway Club status, same price. The only change is who Disney talks to about the booking.',
  },
]

const FAQ = [
  {
    q: 'Does this cost anything?',
    a: 'No. The transfer is free and your cruise fare, taxes, and port fees are unchanged — Disney sets that price either way. The onboard credit comes out of the standard travel-agent commission Disney pays the agency, not out of your pocket.',
  },
  {
    q: 'What is the actual deadline?',
    a: 'Disney Cruise Line generally allows a direct booking to be transferred to a travel agent within about 30 days of the original booking date, and only before final payment. Those rules are Disney’s, not ours, and Disney can change or apply them at its discretion. Send us your details and we will confirm your specific reservation rather than guess.',
  },
  {
    q: 'Will my reservation number or stateroom change?',
    a: 'No. The reservation itself is untouched — same ship, sail date, stateroom, dining rotation, and Castaway Club status. The agency simply becomes the contact of record.',
  },
  {
    q: 'Can I still manage my booking on disneycruise.com?',
    a: 'Yes. You still log into your Disney account for online check-in, port arrival time, dining preferences, and Port Adventures. We handle the fare side — price-drop rebooking and final payment processing.',
  },
  {
    q: 'How much onboard credit will I get?',
    a: 'It scales with your total cruise fare before taxes and port fees — see the examples above. We will confirm your exact amount in writing before you sign anything.',
  },
  {
    q: 'What if my booking turns out not to be eligible?',
    a: 'We will tell you plainly rather than string you along. You are still welcome to use our concierge service for free trip-planning help on that sailing — you just would not have the onboard credit on that particular booking. For your next cruise, talk to us before you book.',
  },
  {
    q: 'What about a booking made with a different travel agency?',
    a: 'Disney does not transfer a reservation from one travel agency to another. If your cruise is already with another agency, it stays there for that sailing.',
  },
]

export default function TransferPage() {
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
            <Clock className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
              Already Booked Direct?
            </span>
          </div>
          <h1 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Transfer Your Disney Cruise Booking to Us
          </h1>
          <p className="font-inter text-lg md:text-xl text-blue-200 max-w-2xl mx-auto mb-8 leading-relaxed">
            Already booked your Disney cruise directly? You can add us as your travel agent — and
            unlock free onboard credit and concierge help, at no additional cost to you. Same ship,
            same sail date, same stateroom, same price.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#request"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#D4AF37] text-[#0a1628] font-bold rounded-xl hover:bg-yellow-300 transition-colors shadow-lg text-base"
            >
              Check My Eligibility
            </a>
            <a
              href="#eligibility"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20 text-base"
            >
              Am I Eligible?
            </a>
          </div>
          <p className="text-xs text-blue-400 mt-6">
            Eligibility and timing are set by Disney Cruise Line — we&apos;ll confirm yours for
            free.
          </p>
        </div>
      </section>

      {/* Eligibility */}
      <section id="eligibility" className="py-16 md:py-24 bg-white scroll-mt-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
              Eligibility
            </p>
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">
              If You Booked Directly With Disney, You May Be Eligible
            </h2>
            <p className="font-inter text-lg text-slate-600 max-w-2xl mx-auto">
              Here&apos;s the general shape of Disney Cruise Line&apos;s policy. If you booked
              directly with Disney and haven&apos;t yet transferred it,{' '}
              <strong className="text-[#1E3A5F]">you may be eligible — we&apos;ll confirm for you.</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ELIGIBILITY.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-6"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#1E3A5F]/5 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#1E3A5F]" aria-hidden="true" />
                  </div>
                  <h3 className="font-fraunces text-lg font-bold text-[#1E3A5F] mb-2">
                    {item.title}
                  </h3>
                  <p className="font-inter text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Honest disclaimer — Disney owns these rules, not us. */}
          <div className="mt-10 bg-amber-50 border-l-4 border-[#D4AF37] rounded-r-2xl p-6 md:p-7">
            <h3 className="font-fraunces text-base font-bold text-[#1E3A5F] mb-2">
              A straight word about eligibility
            </h3>
            <p className="font-inter text-sm text-slate-700 leading-relaxed">
              Eligibility and timing for transferring a reservation are determined by Disney Cruise
              Line and are subject to their current rules, which can change at any time and are
              applied at Disney&apos;s discretion. The conditions above describe the policy as we
              understand it today — they are not a guarantee, and nothing on this page is an offer
              from or an approval by Disney Cruise Line. We&apos;ll check your specific reservation
              against Disney&apos;s current policy and tell you honestly whether it qualifies,
              before anything is signed and at no cost to you.
            </p>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-16 md:py-24 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
              What You Get
            </p>
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">
              Same Cruise. Same Price. More Perks.
            </h2>
            <p className="font-inter text-lg text-slate-600 max-w-2xl mx-auto">
              Disney charges you the same either way. The only question is whether you want the
              benefits that come with having a travel agent on the booking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {BENEFITS.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="flex gap-4 bg-white rounded-2xl p-6 border border-slate-200"
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
          <div className="mt-12 bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200">
              <h3 className="font-fraunces text-xl font-bold text-[#1E3A5F] mb-1">
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
                  <th scope="col" className="px-6 py-3 font-inter text-xs font-bold uppercase tracking-wider text-slate-500">
                    Your cruise fare
                  </th>
                  <th scope="col" className="px-6 py-3 font-inter text-xs font-bold uppercase tracking-wider text-slate-500">
                    Onboard credit
                  </th>
                </tr>
              </thead>
              <tbody>
                {OBC_EXAMPLE_FARES.map((fare) => (
                  <tr key={fare} className="border-t border-slate-100">
                    <td className="px-6 py-3.5 font-inter text-sm text-slate-700">
                      {formatUSD(fare)}
                    </td>
                    <td className="px-6 py-3.5 font-inter text-base font-bold text-[#1E3A5F]">
                      {formatUSD(getOBC(fare))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
              <p className="font-inter text-xs text-slate-500">
                Illustrative amounts. Want your exact figure? Run the{' '}
                <Link
                  href="/tools/obc-calculator"
                  className="text-[#1E3A5F] font-semibold hover:underline"
                >
                  OBC calculator
                </Link>{' '}
                or just ask us below.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Capture form */}
      <section id="request" className="py-16 md:py-24 bg-[#0d1f3c] scroll-mt-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
              Free Eligibility Check
            </p>
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-white mb-4">
              Send Us Your Booking Details
            </h2>
            <p className="font-inter text-base text-blue-200 leading-relaxed">
              Two required fields. We&apos;ll check your reservation against Disney&apos;s current
              transfer rules and email you back the same business day — yes or no, either way.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <TransferForm />
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
              <div key={item.q} className="border border-slate-200 rounded-2xl p-6 bg-white">
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

          <div className="mt-12 bg-[#1E3A5F]/5 border border-[#1E3A5F]/10 rounded-2xl p-6 text-center">
            <p className="font-inter text-sm text-slate-600 mb-3">Still have questions?</p>
            <a
              href="mailto:bookings@gatgridcruises.com?subject=Booking%20Transfer%20Question"
              className="inline-flex items-center gap-2 text-[#1E3A5F] font-semibold text-sm hover:text-[#D4AF37] transition-colors"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              bookings@gatgridcruises.com
            </a>
          </div>
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
