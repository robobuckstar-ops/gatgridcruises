import { Metadata } from 'next'
import Link from 'next/link'
import {
  AlertTriangle,
  CalendarCheck,
  Gift,
  Mail,
  PartyPopper,
  Ship,
  Sparkles,
  Users,
} from 'lucide-react'
import { OBCDisclaimer } from '@/components/ui/obc-disclaimer'
import { formatUSD, getOBC } from '@/lib/obc'
import { GroupCruiseForm } from './GroupCruiseForm'

export const metadata: Metadata = {
  title: 'GatGrid Group Sailing — Join a Hosted Disney Cruise | GatGrid',
  description:
    'Sail a Disney cruise with a group instead of alone. Join the GatGrid hosted group sailing interest list — meet-ups, a community onboard, and potential group perks when cabin minimums are met.',
  alternates: { canonical: '/group-cruise' },
  openGraph: {
    title: 'GatGrid Group Sailing — Join a Hosted Disney Cruise | GatGrid',
    description:
      'Join a hosted Disney group sailing: sail with a community, with potential group perks when cabin minimums are met.',
    url: 'https://gatgridcruises.com/group-cruise',
    siteName: 'GatGrid Cruises',
    images: [
      {
        url: 'https://gatgridcruises.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GatGrid hosted Disney group cruise sailing',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GatGrid Group Sailing — Join a Hosted Disney Cruise | GatGrid',
    description:
      'Sail a Disney cruise with a community. Join the GatGrid group sailing interest list — free, no obligation.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

const WHAT_IT_IS = [
  {
    icon: Ship,
    title: 'One sailing, many of us on it',
    description:
      'We pick a single Disney sailing and gather GatGrid travelers onto it. You book your own stateroom at your own price — you just end up on a ship where you already know people.',
  },
  {
    icon: Users,
    title: 'A community, not a tour group',
    description:
      'Nobody marches you around a port. Think a group chat before the cruise, a sail-away meet-up, a shared dinner or two, and people to split an excursion with if you feel like it. Join as much or as little as you want.',
  },
  {
    icon: PartyPopper,
    title: 'Meet-ups and fish extender swaps',
    description:
      'The onboard traditions are better with numbers. A group makes fish extender exchanges, deck meet-ups, and door-decorating actually work instead of fizzling at four people.',
  },
  {
    icon: Sparkles,
    title: 'Potential group perks when minimums are met',
    description:
      'If enough staterooms book under the group, Disney’s group policies may make additional amenities available — the kind of thing a single booking can’t access. Whether that happens depends on hitting Disney’s cabin minimum. See the note below.',
  },
]

const HOW_IT_WORKS = [
  {
    step: '1',
    title: 'Tell us your timeframe',
    description:
      'Fill in the form with roughly when you could sail and how many are in your party. That is all we need to start.',
  },
  {
    step: '2',
    title: 'We find where the interest clusters',
    description:
      'Once enough people line up on a window, we pick the sailing — ship, itinerary, and dates — and hold group space with Disney.',
  },
  {
    step: '3',
    title: 'You get the details before you commit',
    description:
      'We email you the sailing, the pricing, and exactly what the group includes. Nothing is booked and no deposit is taken until you say yes.',
  },
  {
    step: '4',
    title: 'You book, and we handle the rest',
    description:
      'Your stateroom, your booking, our concierge service on it — booking-window reminders, dining strategy, fare monitoring, and the group chat.',
  },
]

const FAQ = [
  {
    q: 'Does joining the list book anything?',
    a: 'No. It is an interest list. No deposit, no obligation, no commitment. You are telling us when you could sail so we can pick a date that works for the most people — you decide once you see the actual sailing and price.',
  },
  {
    q: 'Do I have to do the group activities?',
    a: 'Not one of them. Plenty of people join for the group rate and the chat and then do their own cruise. Show up to the sail-away meet-up or do not — nobody is taking attendance.',
  },
  {
    q: 'Can I bring my own family or friends?',
    a: 'Yes, and most people do. The group is not instead of your travel party — it is the wider set of people on the same ship. Put your full party size in the form.',
  },
  {
    q: 'Is a group cruise more expensive?',
    a: 'No. You are booking a normal Disney stateroom at Disney’s price. Group space is simply held under one booking umbrella, which is also what makes group amenities possible if minimums are met.',
  },
  {
    q: 'What if the group does not fill?',
    a: 'Then we tell you. If we do not hit Disney’s minimum cabin count, the group amenities do not apply — you would still have a normal booking with us, with onboard credit and concierge service on it. What we will not do is imply perks that never got granted.',
  },
  {
    q: 'Is this the same as Sail Together?',
    a: 'Not quite. Sail Together connects you with other cruisers who happen to be on your sailing. A group sailing is one we choose and host, with group space held with Disney and the possibility of group amenities when enough cabins book.',
  },
]

export default function GroupCruisePage() {
  // Illustrative OBC figure, derived — never a hardcoded amount or a stated rate.
  const exampleFare = 5000
  const exampleOBC = getOBC(exampleFare)

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
            <Users className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
              GatGrid Group Sailing
            </span>
          </div>
          <h1 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Sail Disney With a Group, Not by Yourself
          </h1>
          <p className="font-inter text-lg md:text-xl text-blue-200 max-w-2xl mx-auto mb-8 leading-relaxed">
            We&apos;re gathering GatGrid travelers onto hosted Disney sailings — your own stateroom,
            your own pace, but a whole community on the same ship. Tell us when you could sail and
            we&apos;ll build the group around the dates that work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#interest"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#D4AF37] text-[#0a1628] font-bold rounded-xl hover:bg-yellow-300 transition-colors shadow-lg text-base"
            >
              Add Me to the List
            </a>
            <a
              href="#how"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20 text-base"
            >
              How It Works
            </a>
          </div>
          <p className="text-xs text-blue-400 mt-6">
            Free to join, no deposit, no obligation — it&apos;s an interest list, not a booking.
          </p>
        </div>
      </section>

      {/* What it is */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
              The Concept
            </p>
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">
              Your Cruise, With People On It
            </h2>
            <p className="font-inter text-lg text-slate-600 max-w-2xl mx-auto">
              A hosted group sailing is a normal Disney cruise where a bunch of us happen to be on
              the same ship on purpose.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {WHAT_IT_IS.map((item) => {
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

      {/* How it works */}
      <section id="how" className="py-16 md:py-24 bg-slate-50 border-y border-slate-200 scroll-mt-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
              How It Works
            </p>
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">
              Four Steps, and You Decide at Step Three
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOW_IT_WORKS.map((item) => (
              <div
                key={item.step}
                className="bg-white border border-slate-200 rounded-2xl p-6"
              >
                <div className="w-9 h-9 rounded-full bg-[#1E3A5F] text-[#D4AF37] font-bold flex items-center justify-center mb-4 font-fraunces">
                  {item.step}
                </div>
                <h3 className="font-fraunces text-base font-bold text-[#1E3A5F] mb-2">
                  {item.title}
                </h3>
                <p className="font-inter text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* What comes with any GatGrid booking, group or not. */}
          <div className="mt-10 bg-white border border-slate-200 rounded-2xl p-6 md:p-7">
            <h3 className="font-fraunces text-lg font-bold text-[#1E3A5F] mb-3 flex items-center gap-2">
              <Gift className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
              Everything that comes with a normal GatGrid booking still applies
            </h3>
            <p className="font-inter text-sm text-slate-600 leading-relaxed">
              Group sailing or not, a booking through us earns onboard credit that posts to your
              stateroom folio — a {formatUSD(exampleFare)} cruise fare earns about{' '}
              {formatUSD(exampleOBC)} to spend onboard.* You also get concierge service and fare
              monitoring through our{' '}
              <Link
                href="/price-watch"
                className="text-[#1E3A5F] font-semibold hover:underline"
              >
                price watch
              </Link>
              . Want your exact figure? Run the{' '}
              <Link
                href="/tools/obc-calculator"
                className="text-[#1E3A5F] font-semibold hover:underline"
              >
                OBC calculator
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Honest disclaimer about group perks */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-50 border-l-4 border-[#D4AF37] rounded-r-2xl p-6 md:p-7">
            <h3 className="font-fraunces text-base font-bold text-[#1E3A5F] mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
              A straight word about group perks
            </h3>
            <p className="font-inter text-sm text-slate-700 leading-relaxed">
              Group amenities and perks are determined by Disney Cruise Line&apos;s group policies
              and generally require a minimum number of staterooms to be booked under the group
              before any amenity becomes available. They are subject to availability, to
              Disney&apos;s current policies, and to change at Disney&apos;s discretion. We
              can&apos;t promise a specific perk before a sailing is chosen and the cabin minimum is
              met — if we hit it, we&apos;ll tell you exactly what it unlocks, and if we don&apos;t,
              we&apos;ll tell you that too. Joining the interest list is free and creates no
              obligation on either side; it is not a booking, a reservation, or a held rate.
              Nothing on this page is an offer from, or an approval by, Disney Cruise Line. GatGrid
              Cruises is not affiliated with The Walt Disney Company or Disney Cruise Line.
            </p>
          </div>
        </div>
      </section>

      {/* Capture form */}
      <section id="interest" className="py-16 md:py-24 bg-[#0d1f3c] scroll-mt-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
              Interest List
            </p>
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-white mb-4">
              Tell Us When You Could Sail
            </h2>
            <p className="font-inter text-base text-blue-200 leading-relaxed">
              Four quick fields. We&apos;ll email you the sailing details and pricing once a date
              takes shape — you decide from there.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <GroupCruiseForm />
          </div>

          <p className="mt-8 text-center font-inter text-sm text-blue-300/90 leading-relaxed">
            Already have a sailing booked and just want to find your people on it? Try{' '}
            <Link
              href="/community/sail-together"
              className="text-[#D4AF37] font-semibold hover:underline"
            >
              Sail Together
            </Link>{' '}
            instead.
          </p>
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
              href="mailto:bookings@gatgridcruises.com?subject=Group%20Sailing%20Question"
              className="inline-flex items-center gap-2 text-[#1E3A5F] font-semibold text-sm hover:text-[#D4AF37] transition-colors"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              bookings@gatgridcruises.com
            </a>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sailings"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 text-[#1E3A5F] font-semibold rounded-xl hover:border-[#D4AF37] transition-colors text-sm"
            >
              <CalendarCheck className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
              Browse upcoming sailings
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1E3A5F] text-white font-semibold rounded-xl hover:bg-[#2a4f7f] transition-colors text-sm"
            >
              Start a booking with us
            </Link>
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don&apos;t have a group yet?{' '}
            <Link href="/community/sail-together" className="text-[#1E3A5F] font-semibold hover:underline">
              Find other families sailing your dates →
            </Link>
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
