import { Metadata } from 'next'
import Link from 'next/link'
import {
  Anchor,
  BadgeDollarSign,
  CheckCircle,
  Clock,
  FileSignature,
  Gift,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  Wallet,
} from 'lucide-react'
import { OBCDisclaimer } from '@/components/ui/obc-disclaimer'
import { OBC_EXAMPLE_FARES, formatUSD, getOBC } from '@/lib/obc'
import { EligibilityCheck } from './EligibilityCheck'

export const metadata: Metadata = {
  title: 'Transfer Your Disney Cruise Booking — Free Onboard Credit | GatGrid',
  description:
    'Already booked your Disney cruise directly? Take the 60-second eligibility check — you may be able to add GatGrid as your travel agent and unlock free onboard credit and concierge help, at no additional cost to you.',
  alternates: { canonical: '/transfer' },
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

/** The six-point reassurance bar. Short enough to read in one pass. */
const TRUST_POINTS = [
  'Same price you already paid',
  'Free onboard credit',
  'Keep your exact reservation',
  'Takes ~2 minutes',
  'Disney pays our commission, not you',
  'No cost, no catch',
]

const STEPS = [
  {
    icon: FileSignature,
    title: 'You send the request',
    time: '2 minutes',
    description:
      'Name, email, sail date, and your reservation number if you have it handy. That is the whole ask — no fare details, no payment information, nothing sensitive.',
  },
  {
    icon: ShieldCheck,
    title: 'We submit the transfer form to Disney',
    time: 'Same business day',
    description:
      'We check your reservation against Disney Cruise Line’s current transfer rules and, if it qualifies, send you Disney’s own one-page transfer form to sign. You sign it, we file it. Disney does the rest.',
  },
  {
    icon: Gift,
    title: 'Onboard credit and concierge land on the booking',
    time: 'After the transfer completes',
    description:
      'Your onboard credit is confirmed in writing in dollars, and posts to your stateroom folio after final payment. From that day on you have a real person for dining strategy, booking-window reminders, and price-drop watching.',
  },
]

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

/** The four objections people actually have before they fill anything in. */
const OBJECTIONS = [
  {
    icon: Lock,
    q: 'Is this a scam?',
    a: 'Fair question — the offer sounds too good until you know how travel agencies get paid. Disney pays a standard commission to the agency of record on every booking. If you booked direct, Disney simply keeps it. We give part of ours back to you as onboard credit. We never ask for a card number, a Disney password, or a payment on this page — the only thing you send is your name, email, and sail date, and Disney itself processes the transfer.',
  },
  {
    icon: Wallet,
    q: 'What does it cost me?',
    a: 'Nothing. Your cruise fare, taxes, and port fees are exactly what Disney already quoted you — a travel agent cannot change them. There is no agency fee, no service charge, and no membership. The onboard credit comes out of the commission Disney pays us, not out of your pocket.',
  },
  {
    icon: ShieldCheck,
    q: 'Do I lose control of my booking?',
    a: 'No. You keep your Disney account and still log in for online check-in, port arrival time, dining preferences, and Port Adventures. You can call us or email us any time, and you can request the booking be moved back or cancelled under Disney’s normal terms. We are added as the contact of record — we are not a gatekeeper between you and your cruise.',
  },
  {
    icon: BadgeDollarSign,
    q: 'What actually changes?',
    a: 'One line on Disney’s side: who the agency of record is. Same reservation number, same ship, same sail date, same stateroom, same dining rotation, same Castaway Club status, same price. What is added is onboard credit, price-drop monitoring through final payment, and a human who answers.',
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
    a: 'It scales with your total cruise fare before taxes and port fees — see the dollar examples above. We will confirm your exact amount in writing before you sign anything.',
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
      {/* Hero + the eligibility check share one dark band so the check is the
          first thing on screen rather than something to scroll for. */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1628] to-[#1E3A5F] pt-16 pb-16 md:pt-20 md:pb-20">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, #D4AF37 0%, transparent 50%), radial-gradient(circle at 80% 20%, #2563EB 0%, transparent 50%)',
          }}
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5">
            <Clock className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              Already Booked Direct?
            </span>
          </div>
          <h1 className="mb-5 font-fraunces text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            Get Free Onboard Credit on the Cruise You Already Booked
          </h1>
          <p className="mx-auto mb-7 max-w-2xl font-inter text-lg leading-relaxed text-blue-200 md:text-xl">
            If you booked direct with Disney in the last 30 days, you can add us as your travel
            agent and unlock onboard credit in real dollars — same ship, same sail date, same
            stateroom, same price. Find out in 60 seconds.
          </p>

          {/* Trust bar — the six objections answered before they are asked. */}
          <ul className="mb-9 flex flex-wrap justify-center gap-2">
            {TRUST_POINTS.map((point) => (
              <li
                key={point}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-inter text-xs font-semibold text-blue-100"
              >
                <CheckCircle className="h-3.5 w-3.5 flex-shrink-0 text-[#D4AF37]" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Eligibility check */}
        <div id="request" className="relative mx-auto max-w-2xl scroll-mt-16 px-4 sm:px-6 lg:px-8">
          <EligibilityCheck />
          <p className="mt-5 text-center font-inter text-xs leading-relaxed text-blue-400">
            Eligibility and timing are set by Disney Cruise Line — we&apos;ll confirm yours for
            free, and tell you honestly either way.
          </p>
        </div>
      </section>

      {/* Objection handling */}
      <section className="border-b border-slate-200 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              The Honest Answers
            </p>
            <h2 className="mb-4 font-fraunces text-3xl font-bold text-[#1E3A5F] md:text-4xl">
              &quot;Wait — What&apos;s the Catch?&quot;
            </h2>
            <p className="mx-auto max-w-2xl font-inter text-lg text-slate-600">
              There isn&apos;t one, but you shouldn&apos;t take that on faith. Here is exactly how
              this works and what it does and doesn&apos;t change.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {OBJECTIONS.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.q}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-7"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#1E3A5F]">
                      <Icon className="h-5 w-5 text-[#D4AF37]" aria-hidden="true" />
                    </div>
                    <h3 className="font-fraunces text-lg font-bold text-[#1E3A5F]">{item.q}</h3>
                  </div>
                  <p className="font-inter text-sm leading-relaxed text-slate-600">{item.a}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-16 bg-slate-50 py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              How It Works
            </p>
            <h2 className="mb-4 font-fraunces text-3xl font-bold text-[#1E3A5F] md:text-4xl">
              Three Steps. You Do One of Them.
            </h2>
            <p className="mx-auto max-w-2xl font-inter text-lg text-slate-600">
              Start to finish, your part is a short form and a signature on Disney&apos;s own
              transfer request.
            </p>
          </div>

          <ol className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <li
                  key={step.title}
                  className="relative rounded-2xl border border-slate-200 bg-white p-6 md:p-7"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#D4AF37] font-inter text-sm font-bold text-[#0a1628]">
                      {i + 1}
                    </span>
                    <Icon className="h-5 w-5 text-[#1E3A5F]" aria-hidden="true" />
                  </div>
                  <h3 className="mb-1.5 font-fraunces text-lg font-bold text-[#1E3A5F]">
                    {step.title}
                  </h3>
                  <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#1E3A5F]/5 px-2.5 py-1 font-inter text-[11px] font-bold uppercase tracking-wider text-[#1E3A5F]">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    {step.time}
                  </p>
                  <p className="font-inter text-sm leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </li>
              )
            })}
          </ol>

          <div className="mt-10 text-center">
            <a
              href="#request"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1E3A5F] px-7 py-3.5 font-inter text-base font-bold text-white shadow-lg transition-colors hover:bg-[#0a1628]"
            >
              Start the 60-second check
            </a>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="border-y border-slate-200 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              What You Get
            </p>
            <h2 className="mb-4 font-fraunces text-3xl font-bold text-[#1E3A5F] md:text-4xl">
              Same Cruise. Same Price. More Perks.
            </h2>
            <p className="mx-auto max-w-2xl font-inter text-lg text-slate-600">
              Disney charges you the same either way. The only question is whether you want the
              benefits that come with having a travel agent on the booking.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {BENEFITS.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#1E3A5F]">
                    <Icon className="h-5 w-5 text-[#D4AF37]" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="mb-1.5 font-fraunces text-base font-bold text-[#1E3A5F]">
                      {item.title}
                    </h3>
                    <p className="font-inter text-sm leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* OBC examples — dollar figures only, all derived from lib/obc.ts */}
          <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-6 py-5">
              <h3 className="mb-1 font-fraunces text-xl font-bold text-[#1E3A5F]">
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
                    className="px-6 py-3 font-inter text-xs font-bold uppercase tracking-wider text-slate-500"
                  >
                    Your cruise fare
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 font-inter text-xs font-bold uppercase tracking-wider text-slate-500"
                  >
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
            <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">
              <p className="font-inter text-xs text-slate-500">
                Illustrative amounts. Want your exact figure? Run the{' '}
                <Link
                  href="/tools/obc-calculator"
                  className="font-semibold text-[#1E3A5F] hover:underline"
                >
                  OBC calculator
                </Link>{' '}
                or just ask us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility, in detail */}
      <section id="eligibility" className="scroll-mt-16 bg-slate-50 py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              Eligibility, In Detail
            </p>
            <h2 className="mb-4 font-fraunces text-3xl font-bold text-[#1E3A5F] md:text-4xl">
              The Three Rules Behind Those Three Questions
            </h2>
            <p className="mx-auto max-w-2xl font-inter text-lg text-slate-600">
              Here&apos;s the general shape of Disney Cruise Line&apos;s policy. If you booked
              directly with Disney and haven&apos;t yet transferred it,{' '}
              <strong className="text-[#1E3A5F]">
                you may be eligible — we&apos;ll confirm for you.
              </strong>
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {ELIGIBILITY.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#1E3A5F]/5">
                    <Icon className="h-5 w-5 text-[#1E3A5F]" aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 font-fraunces text-lg font-bold text-[#1E3A5F]">
                    {item.title}
                  </h3>
                  <p className="font-inter text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Honest disclaimer — Disney owns these rules, not us. */}
          <div className="mt-10 rounded-r-2xl border-l-4 border-[#D4AF37] bg-amber-50 p-6 md:p-7">
            <h3 className="mb-2 font-fraunces text-base font-bold text-[#1E3A5F]">
              A straight word about eligibility
            </h3>
            <p className="font-inter text-sm leading-relaxed text-slate-700">
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

      {/* FAQ */}
      <section className="border-t border-slate-200 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">FAQ</p>
            <h2 className="mb-4 font-fraunces text-3xl font-bold text-[#1E3A5F] md:text-4xl">
              Common Questions
            </h2>
          </div>
          <div className="space-y-4">
            {FAQ.map((item, i) => (
              <div key={item.q} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="mb-3 flex items-start gap-3 font-fraunces text-base font-bold text-[#1E3A5F] md:text-lg">
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/10 text-xs font-bold text-[#D4AF37]">
                    {i + 1}
                  </span>
                  {item.q}
                </h3>
                <p className="pl-9 font-inter text-sm leading-relaxed text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-[#1E3A5F]/10 bg-[#1E3A5F]/5 p-6 text-center">
            <p className="mb-3 font-inter text-sm text-slate-600">Still have questions?</p>
            <a
              href="mailto:bookings@gatgridcruises.com?subject=Booking%20Transfer%20Question"
              className="inline-flex items-center gap-2 font-semibold text-[#1E3A5F] text-sm transition-colors hover:text-[#D4AF37]"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              bookings@gatgridcruises.com
            </a>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-gradient-to-br from-[#0a1628] to-[#1E3A5F] py-16 md:py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 font-fraunces text-3xl font-bold text-white md:text-4xl">
            Your Cruise Is Already Booked. The Credit Isn&apos;t.
          </h2>
          <p className="mb-8 font-inter text-base leading-relaxed text-blue-200 md:text-lg">
            The transfer window closes about 30 days after you booked, and final payment closes it
            for good. Sixty seconds now is the difference between onboard credit and none.
          </p>
          <a
            href="#request"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-8 py-4 font-inter text-base font-bold text-[#0a1628] shadow-lg transition-colors hover:bg-yellow-300"
          >
            Check My Eligibility
          </a>
          <p className="mt-5 font-inter text-xs text-blue-400">
            Free, no obligation, and we&apos;ll tell you straight if it doesn&apos;t qualify.
          </p>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <OBCDisclaimer />
        </div>
      </section>
    </main>
  )
}
