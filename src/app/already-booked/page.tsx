import { Metadata } from 'next'
import Link from 'next/link'
import {
  Anchor,
  ArrowRight,
  CheckCircle,
  Clock,
  Gift,
  ShieldCheck,
  Sparkles,
  Mail,
} from 'lucide-react'
import { OBCDisclaimer } from '@/components/ui/obc-disclaimer'

export const metadata: Metadata = {
  title: 'Already Booked Your Disney Cruise? Get Free Onboard Credit | GatGrid',
  description:
    'Already booked a Disney cruise direct? You can transfer your reservation to our partner travel agency for free within 30 days of booking — and get up to $400* in onboard credit at no extra cost.',
  openGraph: {
    title: 'Already Booked Your Disney Cruise? Get Free Onboard Credit | GatGrid',
    description:
      'Transfer your existing Disney cruise booking within 30 days and unlock up to $400* in free onboard credit. No extra cost, same sailing.',
    url: 'https://gatgridcruises.com/already-booked',
    siteName: 'GatGrid Cruises',
    images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'Transfer your Disney cruise booking for free OBC' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Already Booked Your Disney Cruise? Get Free Onboard Credit | GatGrid',
    description: 'Transfer your existing Disney cruise booking within 30 days and unlock up to $400* in free onboard credit.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

const STEPS = [
  {
    number: 1,
    icon: Anchor,
    title: 'You already booked direct with Disney',
    description:
      "You did the research, picked your sailing, locked in your stateroom — and paid your deposit directly through Disney Cruise Line. Nothing about your reservation needs to change: same ship, same date, same room, same Disney price.",
  },
  {
    number: 2,
    icon: ShieldCheck,
    title: 'Transfer to our partner travel agency — free',
    description:
      "Disney Cruise Line lets you transfer an existing direct booking to a travel agent within 30 days of booking, free of charge. You sign a simple one-page form (Disney's standard transfer request), we handle the rest with Boardwalk Travel Agency. Your fare and stateroom stay exactly the same.",
  },
  {
    number: 3,
    icon: Gift,
    title: 'Unlock up to $400* in onboard credit',
    description:
      "Once the transfer completes, your booking qualifies for our standard onboard credit tiers — up to $400* for higher cruise fares. The OBC posts to your stateroom folio after final payment and you can spend it on drinks, spa, dining, excursions, almost anything onboard.",
  },
]

const WHY_TRANSFER = [
  {
    icon: Gift,
    title: 'Free Onboard Credit',
    description:
      'You get up to $400* in spending money on the ship. Booking direct with Disney earns you $0 in OBC by default.',
  },
  {
    icon: Sparkles,
    title: 'Concierge Support Included',
    description:
      "After the transfer you get the full GatGrid concierge service — booking-window reminders, dining tips, packing lists, day-of boarding guidance.",
  },
  {
    icon: ShieldCheck,
    title: 'Price Drop Monitoring',
    description:
      'We watch your fare from transfer day through final payment. If the price drops in your penalty-free window, we rebook you at the lower rate and preserve your OBC.',
  },
  {
    icon: CheckCircle,
    title: 'Zero Risk to Your Reservation',
    description:
      "Your reservation number, stateroom, sailing date, and Castaway Club status all stay the same. The only thing that changes is who Disney communicates with about the booking.",
  },
]

const FAQ = [
  {
    q: "What's the deadline to transfer?",
    a: "Disney Cruise Line allows transfers from a direct booking to a travel agent within 30 days of the original booking date. After 30 days the booking is locked to direct and can't be transferred. If you booked yesterday you have time; if you booked two months ago, unfortunately the window has closed.",
  },
  {
    q: "Does it cost anything?",
    a: "No. The transfer itself is free. Your cruise fare, taxes, and port fees are unchanged — Disney Cruise Line sets the price either way. The OBC you unlock comes out of the standard travel-agent commission Disney pays the agency, not from your pocket.",
  },
  {
    q: "Will my reservation number, stateroom, or perks change?",
    a: "No. The reservation stays exactly the same. Same ship, same sail date, same stateroom, same Castaway Club status, same dining rotation — nothing about the trip itself changes. The agency simply becomes the contact of record on the booking.",
  },
  {
    q: "Can I still manage my booking on disneycruise.com?",
    a: "Yes. You'll still log into your Disney Cruise Line account to handle online check-in, port arrival times, dining preferences, and Port Adventures. The agency handles fare-side things like price-drop rebooking and final payment processing.",
  },
  {
    q: "How much OBC will I get?",
    a: "It depends on your total cruise fare (before taxes and port fees). Our tiers go up to $400* on higher fares. Send us your reservation details and we'll confirm the exact amount before you sign anything.",
  },
  {
    q: "What if I'm past the 30-day window?",
    a: "Then a transfer isn't possible — Disney Cruise Line's policy is firm. You can still use our concierge service for free trip-planning guidance and pre-cruise reminders, you just won't qualify for the OBC on this particular booking. For your next cruise, talk to us first.",
  },
]

export default function AlreadyBookedPage() {
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
            You Just Left Up to $400* on the Table
          </h1>
          <p className="font-inter text-lg md:text-xl text-blue-200 max-w-2xl mx-auto mb-8 leading-relaxed">
            If you booked your Disney cruise direct in the last 30 days, you can transfer the
            reservation to our partner travel agency at no cost — and unlock onboard credit you
            wouldn&apos;t otherwise get. Same sailing, same price, same stateroom.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/concierge"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#D4AF37] text-[#0a1628] font-bold rounded-xl hover:bg-yellow-300 transition-colors shadow-lg text-base"
            >
              Start the Free Transfer
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20 text-base"
            >
              How It Works
            </a>
          </div>
          <p className="text-xs text-blue-400 mt-6">
            Eligible within 30 days of your original Disney booking date.
          </p>
        </div>
      </section>

      {/* 3-step process */}
      <section id="how-it-works" className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
              How It Works
            </p>
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">
              Three Steps. Zero Cost. Free OBC.
            </h2>
            <p className="font-inter text-lg text-slate-600 max-w-2xl mx-auto">
              The transfer takes a few minutes of paperwork. Your trip stays exactly the same — you
              just gain the perks of having a travel agent on the booking.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((step) => {
              const Icon = step.icon
              return (
                <div
                  key={step.number}
                  className="relative bg-slate-50 border border-slate-200 rounded-2xl p-6"
                >
                  <div className="absolute -top-3 left-6 bg-[#D4AF37] text-[#1E3A5F] text-xs font-bold rounded-full px-3 py-1">
                    Step {step.number}
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-[#1E3A5F]/5 flex items-center justify-center mb-4 mt-2">
                    <Icon className="w-5 h-5 text-[#1E3A5F]" aria-hidden="true" />
                  </div>
                  <h3 className="font-fraunces text-lg font-bold text-[#1E3A5F] mb-2">
                    {step.title}
                  </h3>
                  <p className="font-inter text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Transfer */}
      <section className="py-16 md:py-24 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
              Why Transfer
            </p>
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">
              What You Get After the Transfer
            </h2>
            <p className="font-inter text-lg text-slate-600 max-w-2xl mx-auto">
              Disney charges you the same price either way. So the only question is: do you want
              the perks that come with having a travel agent on your booking?
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {WHY_TRANSFER.map((item) => {
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
        </div>
      </section>

      {/* Time pressure callout */}
      <section className="py-12 md:py-16 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-50 border-l-4 border-[#D4AF37] rounded-r-2xl p-6 md:p-8 flex gap-4">
            <Clock className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h3 className="font-fraunces text-lg font-bold text-[#1E3A5F] mb-2">
                The 30-Day Clock Is Real
              </h3>
              <p className="font-inter text-sm text-slate-700 leading-relaxed">
                Disney Cruise Line policy: a direct booking can be transferred to a travel agent
                within <strong>30 days of the original booking date</strong>. After that window, the
                booking is locked to direct and the OBC is no longer available on this reservation.
                If you&apos;re still inside that window, don&apos;t wait — the form takes a few
                minutes.
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

          <div className="mt-12 bg-[#1E3A5F]/5 border border-[#1E3A5F]/10 rounded-2xl p-6 text-center">
            <p className="font-inter text-sm text-slate-600 mb-3">Still have questions?</p>
            <a
              href="mailto:grayson@gatgridcruises.com?subject=Already%20Booked%20-%20Transfer%20Question"
              className="inline-flex items-center gap-2 text-[#1E3A5F] font-semibold text-sm hover:text-[#D4AF37] transition-colors"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              grayson@gatgridcruises.com
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#0a1628] via-[#1E3A5F] to-[#0a1628]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-white mb-4">
            Don&apos;t Sail Without Your OBC
          </h2>
          <p className="font-inter text-lg text-blue-200 mb-8 max-w-xl mx-auto leading-relaxed">
            Tell us your reservation number and original booking date. We&apos;ll confirm
            eligibility, walk you through the transfer form, and get your onboard credit posted to
            your folio.
          </p>
          <Link
            href="/concierge"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#D4AF37] text-[#0a1628] font-bold rounded-xl hover:bg-yellow-300 transition-colors shadow-lg text-base"
          >
            Start the Free Transfer
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
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
