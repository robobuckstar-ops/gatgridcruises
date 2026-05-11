import { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Check, Download, Ship, Anchor, Compass, Sparkles } from 'lucide-react'
import { GuideDownloadForm } from './guide-download-form'

export const metadata: Metadata = {
  title: 'Free Disney Cruise Planning Guide (PDF) — GatGrid Cruises',
  description:
    'A free 24-page Disney Cruise planning guide: ship comparisons, stateroom decoder, packing checklists, port tips, and a realistic cruise budget. No fluff.',
  openGraph: {
    title: 'Free Disney Cruise Planning Guide (PDF)',
    description:
      'Everything a first-time (or returning) family needs to plan a Disney cruise — without the overwhelm. Free download.',
    url: 'https://gatgridcruises.com/guides/free-disney-cruise-planning-guide',
    images: [
      {
        url: 'https://gatgridcruises.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The Disney Cruise Planning Guide',
      },
    ],
  },
}

const SECTIONS = [
  { icon: Sparkles, title: 'What to Expect on Your First Disney Cruise' },
  { icon: Ship, title: 'Choosing the Right Ship (all 7 ships compared)' },
  { icon: BookOpen, title: 'Stateroom Types Decoded' },
  { icon: Check, title: 'Packing Essentials Checklist' },
  { icon: Compass, title: 'Dining & Entertainment Highlights' },
  { icon: Anchor, title: 'Port Excursion Tips (when to DIY vs. book Disney)' },
  { icon: BookOpen, title: 'Realistic Cruise Budget' },
  { icon: Sparkles, title: 'Why Work With a Travel Advisor' },
]

export default function FreePlanningGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0F172A] via-[#1E3A5F] to-[#1a3356] py-16 md:py-24 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy + form */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/20 rounded-full mb-6">
                <Download className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
                <span className="text-[#D4AF37] text-xs font-bold tracking-wider uppercase">
                  Free PDF Download
                </span>
              </div>

              <h1 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                The Disney Cruise<br />
                <span className="text-[#D4AF37]">Planning Guide</span>
              </h1>

              <p className="text-blue-100 text-lg md:text-xl mb-8 leading-relaxed">
                A free 24-page guide covering every Disney ship, every stateroom category,
                a printable packing checklist, port-day strategy, and a realistic cruise
                budget. No fluff. No upsells.
              </p>

              <GuideDownloadForm source="guide_landing_hero" />

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-blue-200">
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" aria-hidden="true" /> Free forever
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" aria-hidden="true" /> Instant download
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" aria-hidden="true" /> Unsubscribe anytime
                </span>
              </div>
            </div>

            {/* Right: Guide mockup */}
            <div className="relative hidden lg:block">
              <div className="relative mx-auto max-w-sm">
                {/* Stacked paper effect */}
                <div className="absolute inset-0 translate-x-4 translate-y-4 bg-[#D4AF37]/30 rounded-lg -z-10" />
                <div className="absolute inset-0 translate-x-2 translate-y-2 bg-white/20 rounded-lg -z-10" />

                <div className="bg-gradient-to-br from-[#1E3A5F] to-[#2a4a73] rounded-lg shadow-2xl p-10 text-center text-white border border-white/10">
                  <div className="inline-block px-3 py-1 bg-[#D4AF37]/20 rounded-full mb-6">
                    <span className="text-[#D4AF37] text-[10px] font-bold tracking-widest uppercase">
                      GatGrid Cruises
                    </span>
                  </div>
                  <h2 className="font-fraunces text-3xl font-bold mb-4 leading-tight">
                    The Disney Cruise<br />
                    <span className="text-[#D4AF37]">Planning Guide</span>
                  </h2>
                  <p className="text-blue-200 text-sm mb-8">
                    Everything a first-time family needs to plan, pack, and enjoy a
                    Disney cruise.
                  </p>
                  <div className="h-px bg-white/10 my-6" />
                  <div className="text-xs text-blue-300 tracking-wider uppercase">
                    8 Chapters · 24 Pages · 2026 Edition
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's inside */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What's Inside
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Eight no-nonsense chapters built from hundreds of real Disney cruise
              bookings.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {SECTIONS.map((section, i) => (
              <div
                key={section.title}
                className="flex items-start gap-4 p-5 rounded-xl bg-slate-50 border border-slate-100"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-[#1E3A5F] rounded-lg flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-[#D4AF37]" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1E3A5F] mb-1 tracking-wider">
                    CHAPTER {i + 1}
                  </div>
                  <div className="font-fraunces font-bold text-slate-900 text-base leading-snug">
                    {section.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why this guide */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-slate-900 mb-6 text-center">
            Why This Guide Is Different
          </h2>
          <p className="text-slate-600 text-center mb-12 max-w-xl mx-auto">
            Most "free cruise guides" are 40 pages of stock photos and affiliate links.
            This one is the cheat sheet we wish we'd had on our first sailing.
          </p>

          <div className="space-y-4">
            <div className="flex gap-4 p-6 bg-white rounded-xl border border-slate-200">
              <div className="flex-shrink-0 w-8 h-8 bg-[#1E3A5F]/10 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-[#1E3A5F]" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-fraunces font-bold text-lg text-slate-900 mb-1">
                  Honest ship comparisons
                </h3>
                <p className="text-slate-600 text-sm">
                  We tell you which ship fits which family — including when the older
                  Magic or Wonder is the smarter pick than the newer hardware.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-white rounded-xl border border-slate-200">
              <div className="flex-shrink-0 w-8 h-8 bg-[#1E3A5F]/10 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-[#1E3A5F]" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-fraunces font-bold text-lg text-slate-900 mb-1">
                  A realistic budget
                </h3>
                <p className="text-slate-600 text-sm">
                  Not just the cruise fare — gratuities, pre-cruise hotels, excursions,
                  adult dining, and the hidden costs nobody warns you about.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-white rounded-xl border border-slate-200">
              <div className="flex-shrink-0 w-8 h-8 bg-[#1E3A5F]/10 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-[#1E3A5F]" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-fraunces font-bold text-lg text-slate-900 mb-1">
                  Printable checklists
                </h3>
                <p className="text-slate-600 text-sm">
                  Packing lists with checkboxes — built for printing, organized by
                  category, with the "often forgotten" items called out.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-white rounded-xl border border-slate-200">
              <div className="flex-shrink-0 w-8 h-8 bg-[#1E3A5F]/10 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-[#1E3A5F]" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-fraunces font-bold text-lg text-slate-900 mb-1">
                  Zero sales pressure
                </h3>
                <p className="text-slate-600 text-sm">
                  The guide ends with one soft mention of our concierge service. Use it,
                  don't use it — the guide is yours either way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom signup */}
      <section className="bg-[#1E3A5F] py-16 md:py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-white mb-4">
            Get Your Free Guide
          </h2>
          <p className="text-blue-200 mb-8">
            Drop your email and we'll send the PDF instantly. Plus a short welcome
            series with the most useful Disney cruise tips we've ever published.
          </p>
          <GuideDownloadForm source="guide_landing_bottom" />
          <p className="mt-6 text-xs text-blue-300">
            Already have the guide? Read more on the{' '}
            <Link href="/guides" className="text-[#D4AF37] underline">
              GatGrid blog
            </Link>{' '}
            or{' '}
            <Link href="/concierge" className="text-[#D4AF37] underline">
              talk to a planner
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  )
}
