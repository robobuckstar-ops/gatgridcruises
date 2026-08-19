import { Metadata } from 'next'
import Link from 'next/link'
import {
  Anchor,
  BookOpen,
  CalendarClock,
  Compass,
  Luggage,
  Ship,
  Sparkles,
  Utensils,
  Wallet,
} from 'lucide-react'
import { GuideForm } from './GuideForm'

export const metadata: Metadata = {
  title: 'Free Disney Cruise First-Timer’s Guide (PDF) | GatGrid',
  description:
    'A free, no-fluff PDF guide for your first Disney cruise — booking windows, what’s included, dining rotation, packing, port day strategy, and the mistakes first-timers make. Instant download.',
  alternates: { canonical: 'https://gatgridcruises.com/free-guide' },
  openGraph: {
    title: 'Free Disney Cruise First-Timer’s Guide (PDF) | GatGrid',
    description:
      'Everything a first-time Disney cruiser needs to know, in one free PDF. Booking windows, dining, packing, port days, and the costly rookie mistakes.',
    url: 'https://gatgridcruises.com/free-guide',
    siteName: 'GatGrid Cruises',
    images: [
      {
        url: 'https://gatgridcruises.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Free Disney Cruise First-Timer’s Guide',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Disney Cruise First-Timer’s Guide (PDF) | GatGrid',
    description:
      'Everything a first-time Disney cruiser needs to know, in one free PDF. Instant download.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

const INSIDE = [
  {
    icon: CalendarClock,
    title: 'When to book — and when to stop waiting',
    description:
      'How Disney Cruise Line pricing actually moves, which sail dates reward booking early, and the deposit and final-payment dates you need on your calendar the day you book.',
  },
  {
    icon: Wallet,
    title: 'What’s included vs. what you’ll pay for',
    description:
      'Meals, soft drinks, kids’ clubs, and entertainment are in the fare. Specialty dining, spa, alcohol, internet, and Port Adventures are not. A plain list, so nothing surprises you at the folio.',
  },
  {
    icon: Ship,
    title: 'Picking the right ship and stateroom',
    description:
      'How the ships differ for first-timers, which decks stay quiet, what a verandah is really worth, and the specific room categories that trade the least comfort for the most savings.',
  },
  {
    icon: Utensils,
    title: 'Rotational dining, decoded',
    description:
      'How your dining rotation works, why your servers follow you, what early vs. late seating actually means for a family, and how to request a change without losing your table.',
  },
  {
    icon: Compass,
    title: 'Embarkation day and port day strategy',
    description:
      'Port arrival times, what to carry on, the first two hours aboard that most people waste, and how to plan a port day so you are never the family sprinting back to the gangway.',
  },
  {
    icon: Luggage,
    title: 'The packing list that assumes nothing',
    description:
      'Formal-optional nights, pirate night, laundry realities, the outlet situation in the stateroom, and the handful of items that are cheap at home and expensive at sea.',
  },
]

const MISTAKES = [
  'Booking without a travel agent on the reservation — the fare is identical either way, but one version comes with onboard credit and one does not.',
  'Missing the final payment date and losing a deposit that was fully refundable a week earlier.',
  'Waiting until boarding day to think about dining changes, spa slots, or Port Adventures.',
  'Assuming a fare is locked. Prices move, and a drop before final payment is often rebookable.',
]

const FAQ = [
  {
    q: 'Is the guide actually free?',
    a: 'Yes. Enter your first name and email and the download button appears immediately — no payment, no phone call, no obligation to book anything with us.',
  },
  {
    q: 'What do you do with my email?',
    a: 'We email you the guide and, after that, occasional Disney cruise deal alerts and planning tips. One-click unsubscribe is in every message, and we do not sell or share your address.',
  },
  {
    q: 'Do I have to book with GatGrid to use it?',
    a: 'No. The guide is useful whether you book with us, with Disney directly, or with someone else entirely. We wrote it because well-prepared first-timers have better cruises — and some of them come back to us later.',
  },
  {
    q: 'I have already booked. Is it still worth reading?',
    a: 'Yes — most of it is about the months between booking and sailing. And if you booked directly with Disney recently, take a look at transferring the reservation to us: same ship, same price, plus onboard credit and concierge help.',
  },
]

export default function FreeGuidePage() {
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
            <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
              Free PDF Guide
            </span>
          </div>
          <h1 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            The Disney Cruise First-Timer&apos;s Guide
          </h1>
          <p className="font-inter text-lg md:text-xl text-blue-200 max-w-2xl mx-auto mb-8 leading-relaxed">
            Everything we wish someone had told us before our first sailing — booking windows,
            what&apos;s actually included, dining rotation, packing, and port days. Written for
            people who have never cruised Disney before. Free, and yours in about ten seconds.
          </p>
          <a
            href="#get-guide"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#D4AF37] text-[#0a1628] font-bold rounded-xl hover:bg-yellow-300 transition-colors shadow-lg text-base"
          >
            Get the Free Guide
          </a>
          <p className="text-xs text-blue-400 mt-6">
            No cost, no obligation. Unsubscribe any time.
          </p>
        </div>
      </section>

      {/* What's inside */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
              What&apos;s Inside
            </p>
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">
              The Things First-Timers Actually Get Wrong
            </h2>
            <p className="font-inter text-lg text-slate-600 max-w-2xl mx-auto">
              Not a brochure. A working guide you can read in one sitting and refer back to
              between booking day and boarding day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {INSIDE.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="flex gap-4 bg-slate-50 rounded-2xl p-6 border border-slate-200"
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

      {/* Common mistakes */}
      <section className="py-16 md:py-24 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
              The Expensive Ones
            </p>
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">
              Four Mistakes That Cost Real Money
            </h2>
            <p className="font-inter text-lg text-slate-600">
              Each of these is covered in the guide, with what to do instead.
            </p>
          </div>

          <ul className="space-y-4">
            {MISTAKES.map((mistake, i) => (
              <li
                key={mistake}
                className="flex gap-4 bg-white border border-slate-200 rounded-2xl p-6"
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] text-xs font-bold">
                  {i + 1}
                </span>
                <p className="font-inter text-sm text-slate-600 leading-relaxed">{mistake}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Capture form */}
      <section id="get-guide" className="py-16 md:py-24 bg-[#0d1f3c] scroll-mt-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
              Instant Download
            </p>
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-white mb-4">
              Send Me the Guide
            </h2>
            <p className="font-inter text-base text-blue-200 leading-relaxed">
              Two fields. The download button appears the moment you submit, and a copy lands in
              your inbox so it&apos;s there when you need it.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <GuideForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">
              Common Questions
            </h2>
          </div>
          <div className="space-y-4">
            {FAQ.map((item, i) => (
              <div key={item.q} className="border border-slate-200 rounded-2xl p-6 bg-slate-50">
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

      {/* Next steps */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-fraunces text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-3">
              Once You&apos;ve Read It
            </h2>
            <p className="font-inter text-base text-slate-600 max-w-xl mx-auto">
              The guide gets you planning. These do the rest — all free.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Link
              href="/transfer"
              className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#1E3A5F] hover:shadow-md transition-all"
            >
              <Anchor className="w-6 h-6 text-[#1E3A5F] mb-3" aria-hidden="true" />
              <h3 className="font-fraunces text-base font-bold text-[#1E3A5F] mb-1.5">
                Already booked direct?
              </h3>
              <p className="font-inter text-sm text-slate-600 leading-relaxed">
                Transfer the reservation to us for onboard credit and concierge help — same ship,
                same price.
              </p>
            </Link>
            <Link
              href="/price-watch"
              className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#1E3A5F] hover:shadow-md transition-all"
            >
              <Sparkles className="w-6 h-6 text-[#1E3A5F] mb-3" aria-hidden="true" />
              <h3 className="font-fraunces text-base font-bold text-[#1E3A5F] mb-1.5">
                Watch your fare
              </h3>
              <p className="font-inter text-sm text-slate-600 leading-relaxed">
                We monitor your sailing and tell you when the price drops while you can still
                rebook.
              </p>
            </Link>
            <Link
              href="/tools/obc-calculator"
              className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#1E3A5F] hover:shadow-md transition-all"
            >
              <Wallet className="w-6 h-6 text-[#1E3A5F] mb-3" aria-hidden="true" />
              <h3 className="font-fraunces text-base font-bold text-[#1E3A5F] mb-1.5">
                OBC calculator
              </h3>
              <p className="font-inter text-sm text-slate-600 leading-relaxed">
                See the dollar amount of onboard credit your cruise fare would earn.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
