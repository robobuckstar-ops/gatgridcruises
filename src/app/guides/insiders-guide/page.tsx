import type { Metadata } from 'next'
import Link from 'next/link'
import { Download, BookOpen, CheckCircle2, Mail } from 'lucide-react'
import { LeadMagnetForm } from './lead-magnet-form'

export const metadata: Metadata = {
  title: 'Free Disney Cruise Insider’s Guide (PDF) — GatGrid Cruises',
  description:
    'Free 7-section Disney cruise planning PDF: choosing the right ship, stateroom categories explained, what costs extra, Castaway Cay tips, onboard credit, first-timer cheat sheet, and a packing checklist.',
  openGraph: {
    title: 'The Disney Cruise Insider’s Guide — Free PDF',
    description:
      'A free, 7-section PDF planning guide for first-time and seasoned Disney cruisers. No fluff — the things experienced cruisers actually do.',
    url: 'https://gatgridcruises.com/guides/insiders-guide',
  },
  alternates: { canonical: 'https://gatgridcruises.com/guides/insiders-guide' },
}

const sections = [
  'Choosing the right Disney ship for your family',
  'Inside vs. Oceanview vs. Verandah vs. Concierge — decoded',
  'What’s included in your fare vs. what costs extra',
  'Castaway Cay & Lookout Cay tips (cabanas, snorkeling, BBQ)',
  'Onboard credit, explained — and how to actually spend it',
  'The first-time cruiser cheat sheet (10 things veterans do)',
  'The pre-cruise packing checklist (print-and-pack)',
]

export default function InsidersGuidePage() {
  return (
    <main className="bg-white">
      {/* Hero / hook */}
      <section className="bg-gradient-to-br from-[#0a1628] via-[#1E3A5F] to-[#0a1628] py-16 md:py-24 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 mb-6">
                <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                  Free Planning Resource
                </span>
              </div>
              <h1 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] mb-6">
                The Disney Cruise <span className="text-[#D4AF37]">Insider’s Guide</span>
              </h1>
              <p className="text-lg md:text-xl text-navy-200 leading-relaxed mb-8">
                Everything seasoned cruisers know — and most first-timers learn the hard way. A
                tight, 7-section PDF you can read in 20 minutes and reference all the way to
                embarkation.
              </p>

              <ul className="space-y-2.5 mb-8">
                {sections.slice(0, 5).map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-navy-100">
                    <CheckCircle2 className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base">{s}</span>
                  </li>
                ))}
                <li className="text-xs text-navy-300 pl-7">+ 2 more sections inside</li>
              </ul>
            </div>

            {/* Email gate card */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl text-slate-900">
              <div className="flex items-center gap-2 mb-3">
                <Download className="w-5 h-5 text-[#1E3A5F]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3A5F]">
                  Instant Download
                </span>
              </div>
              <h2 className="font-fraunces text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-2">
                Send me the guide
              </h2>
              <p className="text-sm text-slate-600 mb-6">
                Enter your email and we’ll send the PDF straight to your inbox. No spam, no
                pressure — unsubscribe anytime.
              </p>
              <LeadMagnetForm />
              <p className="text-[11px] text-slate-500 mt-4 leading-relaxed">
                By submitting, you’ll receive the guide plus our short Disney cruise planning email
                series. You can opt out at any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's inside */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-3">
              What’s inside the guide
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Seven focused sections — no filler, no upsell. Each one answers a real planning
              question we hear from clients every week.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {sections.map((s, i) => (
              <div
                key={s}
                className="flex items-start gap-4 bg-white rounded-xl border border-slate-200 p-5 hover:border-[#D4AF37] transition"
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#1E3A5F] text-[#D4AF37] font-bold flex items-center justify-center text-sm">
                  {i + 1}
                </div>
                <p className="text-slate-800 leading-snug pt-1">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why trust us */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">
            Editorial. Independent. Free.
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            GatGrid Cruises is an independent Disney cruise information and concierge site. We
            don’t sell cabins on this page and we don’t make money on guide downloads — we share
            this because the planning questions are the same every week, and a tight PDF answers
            them better than a 90-minute call.
          </p>
          <p className="text-sm text-slate-500">
            Not affiliated with The Walt Disney Company or Disney Cruise Line. The PDF is editorial
            advice based on real sailings and current published pricing.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border-2 border-[#1E3A5F] text-[#1E3A5F] font-semibold hover:bg-[#1E3A5F] hover:text-white transition"
            >
              <BookOpen className="w-4 h-4" />
              Browse all guides
            </Link>
            <Link
              href="/concierge"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#D4AF37] text-[#1E3A5F] font-semibold hover:bg-amber-400 transition"
            >
              <Mail className="w-4 h-4" />
              Talk to a concierge
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
