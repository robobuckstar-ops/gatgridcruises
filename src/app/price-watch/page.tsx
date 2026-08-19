import { Metadata } from 'next'
import Link from 'next/link'
import {
  AlertTriangle,
  BellRing,
  CalendarClock,
  Eye,
  Gift,
  Mail,
  Search,
  ShieldCheck,
} from 'lucide-react'
import { OBCDisclaimer } from '@/components/ui/obc-disclaimer'
import { formatUSD, getOBC } from '@/lib/obc'
import { PriceWatchForm } from './PriceWatchForm'

export const metadata: Metadata = {
  title: 'Price-Drop Guarantee — We Watch Your Disney Cruise Fare | GatGrid',
  description:
    "Book your Disney cruise with GatGrid and we monitor Disney's pricing after you book. When DCL's rules permit, we request a price adjustment so you don't overpay.",
  alternates: { canonical: 'https://gatgridcruises.com/price-watch' },
  openGraph: {
    title: 'Price-Drop Guarantee — We Watch Your Disney Cruise Fare | GatGrid',
    description:
      "Book with us and we watch Disney's pricing for you, requesting an adjustment when DCL's rules permit. Booking direct means watching it yourself.",
    url: 'https://gatgridcruises.com/price-watch',
    siteName: 'GatGrid Cruises',
    images: [
      {
        url: 'https://gatgridcruises.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GatGrid price-drop monitoring for Disney Cruise Line fares',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Price-Drop Guarantee — We Watch Your Disney Cruise Fare | GatGrid',
    description:
      "We monitor Disney's pricing after you book and request an adjustment when DCL's rules permit.",
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

/**
 * How the watch actually runs. Deliberately describes effort and process, not
 * an outcome — Disney approves or declines every adjustment, not us.
 */
const HOW_IT_WORKS = [
  {
    icon: Eye,
    title: 'We watch your fare, not just the headline deals',
    description:
      'After you book, your sailing goes on our watch list — your itinerary, your stateroom category, your rate. Public deal pages only show the lead-in fare; what matters is whether the price for your category moved.',
  },
  {
    icon: Search,
    title: 'We check it against what you actually paid',
    description:
      'A lower number on Disney’s site is only useful if it applies to your booking. We compare like for like — same category, same rate code — before we bother you or Disney with it.',
  },
  {
    icon: BellRing,
    title: 'We request the adjustment when the rules allow it',
    description:
      'If a genuine drop lands inside a window where Disney permits an adjustment, we submit the request to Disney Cruise Line on your behalf and tell you what came back. You do not have to call anyone or watch anything.',
  },
  {
    icon: CalendarClock,
    title: 'We track your final payment date',
    description:
      'This is the deadline that decides everything. Adjustments are generally only possible before final payment, so we work the window while it is still open rather than discovering it closed.',
  },
]

/** The limits, stated plainly and up front rather than buried in fine print. */
const LIMITS = [
  {
    title: 'Before final payment only',
    description:
      'Price adjustments are generally only possible before your final payment is processed. Once final payment is made, Disney does not make adjustments — that is DCL policy, and no agency can work around it.',
  },
  {
    title: 'Same category, same rate',
    description:
      'An adjustment has to be for the same stateroom category and rate you booked. A lower price on a different category or a different rate code is not a drop on your booking.',
  },
  {
    title: 'Subject to promotions and availability',
    description:
      'Whether an adjustment is possible depends on Disney’s current promotions and on availability at the lower price at that moment. A fare that is gone by the time we ask is gone.',
  },
  {
    title: 'Some fares are not adjustable at all',
    description:
      'Restricted and non-refundable fare types generally cannot be adjusted. If you are on one of those, we will tell you that up front rather than let you believe a watch is running that cannot do anything.',
  },
]

const FAQ = [
  {
    q: 'Is this actually a guarantee?',
    a: 'What we guarantee is the work: we monitor your fare and we request an adjustment whenever Disney Cruise Line’s rules permit one. We cannot guarantee Disney approves any given request — that decision is Disney’s, and it depends on their current policies, timing, and availability. Any agency promising you a guaranteed refund on a price drop is promising you something they do not control.',
  },
  {
    q: 'What does it cost?',
    a: 'Nothing. It is part of what you get for booking your Disney cruise through us instead of direct. Your cruise fare, taxes, and port fees are identical either way — Disney sets that price.',
  },
  {
    q: 'What happens if the price drops after final payment?',
    a: 'Nothing can be done, by us or by anyone. After final payment Disney does not adjust fares. This is exactly why we track your final payment date and work the window before it closes.',
  },
  {
    q: 'How is an adjustment applied?',
    a: 'It depends on the sailing and on what Disney authorizes at the time — it may come as a lower fare on the reservation or as onboard credit. We will tell you which one you are getting when Disney responds, rather than promising a form it may not take.',
  },
  {
    q: 'I booked direct with Disney. Can you watch my fare?',
    a: 'Only if the booking is transferred to us first, and Disney has its own rules about when that is allowed — generally within about 30 days of booking and before final payment. Start at our transfer page and we will check your reservation for free.',
  },
  {
    q: 'Do I have to do anything once I am on the watch list?',
    a: 'No. That is the point. You do not need to check prices, set alerts, or call anyone. If something actionable happens, you hear from us.',
  },
]

export default function PriceWatchPage() {
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
            <Eye className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
              Price-Drop Guarantee
            </span>
          </div>
          <h1 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            We Watch Your Fare So You Don&apos;t Overpay
          </h1>
          <p className="font-inter text-lg md:text-xl text-blue-200 max-w-2xl mx-auto mb-8 leading-relaxed">
            Disney cruise prices move after you book. When you book with GatGrid, we monitor
            Disney&apos;s pricing on your sailing and — when DCL&apos;s rules permit — request a
            price adjustment on your behalf. Book direct and that job is yours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#watch"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#D4AF37] text-[#0a1628] font-bold rounded-xl hover:bg-yellow-300 transition-colors shadow-lg text-base"
            >
              Put My Fare on Watch
            </a>
            <a
              href="#limits"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20 text-base"
            >
              Read the Fine Print First
            </a>
          </div>
          <p className="text-xs text-blue-400 mt-6">
            We monitor and request adjustments when DCL&apos;s rules permit — outcomes depend on
            Disney&apos;s current policies, timing, and availability.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
              How It Works
            </p>
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">
              Booking Is the Start of the Job, Not the End of It
            </h2>
            <p className="font-inter text-lg text-slate-600 max-w-2xl mx-auto">
              A travel agent who disappears after the deposit is worth exactly what you paid them.
              Here&apos;s what we do between your booking and your sail date.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {HOW_IT_WORKS.map((item) => {
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

      {/* Why book with us vs. direct */}
      <section className="py-16 md:py-24 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
              Us vs. Booking Direct
            </p>
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">
              Same Cruise. Same Price. Someone Watching It.
            </h2>
            <p className="font-inter text-lg text-slate-600 max-w-2xl mx-auto">
              Disney charges you the same fare either way. The difference is what happens in the
              months between your deposit and your final payment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-7">
              <h3 className="font-fraunces text-lg font-bold text-slate-500 mb-4">
                Booking direct with Disney
              </h3>
              <ul className="space-y-3 font-inter text-sm text-slate-600">
                <li>You check the price yourself, whenever you remember to.</li>
                <li>You have to know your own final payment date and what it means.</li>
                <li>You call Disney and make the case for an adjustment.</li>
                <li>No onboard credit from the booking itself.</li>
              </ul>
            </div>
            <div className="bg-white border-2 border-[#D4AF37] rounded-2xl p-6 md:p-7 shadow-sm">
              <h3 className="font-fraunces text-lg font-bold text-[#1E3A5F] mb-4">
                Booking with GatGrid
              </h3>
              <ul className="space-y-3 font-inter text-sm text-slate-700">
                <li>We monitor your fare and your stateroom category for you.</li>
                <li>We track your final payment date and work the window before it closes.</li>
                <li>We submit the adjustment request to Disney on your behalf.</li>
                <li>
                  Your booking also earns onboard credit — a {formatUSD(exampleFare)} cruise fare
                  earns about {formatUSD(exampleOBC)} to spend onboard.*
                </li>
              </ul>
            </div>
          </div>

          <p className="mt-6 text-center font-inter text-sm text-slate-500">
            Want your exact onboard credit figure? Run the{' '}
            <Link
              href="/tools/obc-calculator"
              className="text-[#1E3A5F] font-semibold hover:underline"
            >
              OBC calculator
            </Link>
            .
          </p>
        </div>
      </section>

      {/* The honest limits — Disney owns these rules, not us. */}
      <section id="limits" className="py-16 md:py-24 bg-white scroll-mt-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
              What We Can and Can&apos;t Do
            </p>
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">
              The Fine Print, Up Front
            </h2>
            <p className="font-inter text-lg text-slate-600 max-w-2xl mx-auto">
              Disney Cruise Line sets these rules. We&apos;d rather you know them now than feel
              misled later.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {LIMITS.map((item) => (
              <div
                key={item.title}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-6"
              >
                <h3 className="font-fraunces text-base font-bold text-[#1E3A5F] mb-2 flex items-start gap-2.5">
                  <AlertTriangle
                    className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  {item.title}
                </h3>
                <p className="font-inter text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* The disclaimer proper. */}
          <div className="mt-10 bg-amber-50 border-l-4 border-[#D4AF37] rounded-r-2xl p-6 md:p-7">
            <h3 className="font-fraunces text-base font-bold text-[#1E3A5F] mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
              A straight word about price adjustments
            </h3>
            <p className="font-inter text-sm text-slate-700 leading-relaxed">
              We monitor and request adjustments when DCL&apos;s rules permit — outcomes depend on
              Disney&apos;s current policies, timing, and availability. Price adjustments are
              generally only possible <strong>before final payment</strong>; they must be for the
              same stateroom category and rate you booked, and are subject to current promotions
              and availability. Some fares — restricted and non-refundable rate types in particular
              — are not adjustable at all. After final payment, no adjustments are made. We do our
              best on every booking we hold, but we cannot guarantee that Disney approves any given
              adjustment: that decision belongs to Disney Cruise Line, and Disney can change or
              apply these rules at its discretion. Nothing on this page is an offer from, or an
              approval by, Disney Cruise Line. GatGrid Cruises is not affiliated with The Walt
              Disney Company or Disney Cruise Line.
            </p>
          </div>
        </div>
      </section>

      {/* Capture form */}
      <section id="watch" className="py-16 md:py-24 bg-[#0d1f3c] scroll-mt-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
              Free Price Watch
            </p>
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-white mb-4">
              Put Your Fare on Our Watch List
            </h2>
            <p className="font-inter text-base text-blue-200 leading-relaxed">
              Two required fields. If you have your reservation number handy it saves us a round
              trip, but it&apos;s optional.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <PriceWatchForm />
          </div>

          <p className="mt-8 text-center font-inter text-sm text-blue-300/90 leading-relaxed">
            Booked direct with Disney already? Fares can only be watched on bookings we hold —{' '}
            <Link href="/transfer" className="text-[#D4AF37] font-semibold hover:underline">
              check whether yours can be transferred
            </Link>{' '}
            first, free.
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
              href="mailto:bookings@gatgridcruises.com?subject=Price%20Watch%20Question"
              className="inline-flex items-center gap-2 text-[#1E3A5F] font-semibold text-sm hover:text-[#D4AF37] transition-colors"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              bookings@gatgridcruises.com
            </a>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/price-tracker"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 text-[#1E3A5F] font-semibold rounded-xl hover:border-[#D4AF37] transition-colors text-sm"
            >
              <Gift className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
              See historical pricing by sailing
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1E3A5F] text-white font-semibold rounded-xl hover:bg-[#2a4f7f] transition-colors text-sm"
            >
              Start a booking with us
            </Link>
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
