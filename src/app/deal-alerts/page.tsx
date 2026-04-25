import type { Metadata } from 'next'
import Link from 'next/link'
import { Bell, TrendingDown, Mail, Check, Zap, Bot, Shield } from 'lucide-react'
import { DealAlertsForm } from './deal-alerts-form'

export const metadata: Metadata = {
  title: 'Disney Cruise Deal Alerts — GatGrid Cruises',
  description: 'Get notified when Disney cruise prices drop on your preferred dates. Free deal alerts from Dr. Grayson Starbuck, DPT — AI-curated cruise deals.',
}

const WHAT_YOU_GET = [
  {
    icon: TrendingDown,
    title: 'Price Drop Alerts',
    desc: 'When a sailing drops 5%+ below its 90-day average, you get a personal email with the details before it goes public on deal boards.',
  },
  {
    icon: Zap,
    title: 'Last-Minute Steals',
    desc: 'Disney discounts sailings within 90 days to fill cabins. We catch these the moment they happen — often 15–25% off.',
  },
  {
    icon: Mail,
    title: 'Weekly Deal Digest',
    desc: 'Every Sunday, the biggest price drops of the week, honest deal scores, and planning tips — curated by Grayson, not an algorithm.',
  },
  {
    icon: Bot,
    title: 'AI-Powered Scanning',
    desc: "Our system checks hundreds of sailings every morning so you don't have to. You only hear about the ones worth booking.",
  },
]

const TESTIMONIALS = [
  {
    quote: "Got the alert on a 7-night Alaska sailing, booked the same day, saved over $800 vs. what we'd seen the week before.",
    author: 'Sarah M.',
    detail: 'Disney Wonder, Alaska sailing',
  },
  {
    quote: "Grayson replied to my email within an hour and walked me through the whole booking. The deal alert literally paid for itself 10x.",
    author: 'James K.',
    detail: 'Disney Fantasy, Caribbean',
  },
  {
    quote: "I'd been watching prices for months on my own. The alerts saved me from doing that and actually found a better deal than I was tracking.",
    author: 'Michelle T.',
    detail: 'Disney Wish, Bahamas',
  },
]

export default function DealAlertsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1E3A5F] via-[#162d4a] to-[#0f1f33] py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-5">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#D4AF37] text-sm font-semibold">
              <Bell className="w-4 h-4" aria-hidden="true" />
              Free · No spam · Unsubscribe anytime
            </span>
          </div>

          <h1 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Get Notified When Disney Cruise Prices Drop
          </h1>

          <p className="text-lg md:text-xl text-blue-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            Our AI monitors hundreds of Disney cruise sailings every day. When a price drops on your preferred dates, you hear about it first — directly from Dr. Grayson Starbuck, DPT.
          </p>

          <div className="max-w-lg mx-auto">
            <DealAlertsForm />
          </div>

          <p className="mt-4 text-blue-300 text-sm">
            Join thousands of Disney cruise fans who never pay full price.
          </p>
        </div>
      </section>

      {/* What you get */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-slate-900 text-center mb-4">
            What deal alert subscribers get
          </h2>
          <p className="text-center text-slate-600 mb-12 max-w-xl mx-auto">
            This isn't a generic newsletter. Every email is written personally by Grayson and covers only deals worth your time.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WHAT_YOU_GET.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-6 rounded-xl border border-slate-200 hover:border-[#1E3A5F] transition-colors">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#1E3A5F]/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[#1E3A5F]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">
            How it works
          </h2>

          <div className="space-y-8">
            {[
              {
                step: '01',
                title: 'Sign up with your email',
                desc: "Takes 10 seconds. We don't ask for your phone number, credit card, or anything else. Just an email.",
              },
              {
                step: '02',
                title: 'We watch the prices',
                desc: 'Our AI pulls prices for every Disney cruise sailing every morning. We track historical averages so we can tell the difference between a real deal and a marketing gimmick.',
              },
              {
                step: '03',
                title: "You get a personal email when something's worth booking",
                desc: 'When a sailing drops 5–25% below its historical average, you get an email with the details, the savings, and a direct line to Grayson for booking help.',
              },
              {
                step: '04',
                title: "Reply to book (optional)",
                desc: "If you want to move forward, just reply to the alert email. Grayson will personally handle the booking through Boardwalk Travel Agency at no extra cost to you.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#1E3A5F] flex items-center justify-center">
                  <span className="text-[#D4AF37] font-bold text-sm">{step}</span>
                </div>
                <div className="pt-2">
                  <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">
            What subscribers say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ quote, author, detail }) => (
              <div key={author} className="p-6 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-slate-700 text-sm leading-relaxed mb-4 italic">"{quote}"</p>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{author}</p>
                  <p className="text-slate-500 text-xs">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 text-center mb-10">
            Common questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: 'How often will I get emails?',
                a: "Once a week guaranteed (Sunday digest). Deal alerts are sent as-needed — typically a few times a month when meaningful drops occur. We won't spam you.",
              },
              {
                q: 'Is this actually free?',
                a: 'Yes. We earn money through travel booking commissions and affiliate links in some emails (always disclosed). The deal alerts themselves are completely free.',
              },
              {
                q: 'Who is Dr. Grayson Starbuck, DPT?',
                a: "Grayson is a Doctor of Physical Therapy, Disney cruise specialist, and travel advisor through Boardwalk Travel Agency. He built GatGrid because he was frustrated with how opaque Disney cruise pricing is — and now helps families book smarter.",
              },
              {
                q: 'Can I pick which ships or dates I want alerts for?',
                a: 'Right now we send alerts for the best deals across all sailings. Personalized filters are on the roadmap. For now, reply to any email and Grayson will set up a manual watchlist for you.',
              },
              {
                q: 'What if I want to unsubscribe?',
                a: 'Every email has an unsubscribe link at the bottom. One click and you\'re out — no confirmation email, no re-subscribe attempts.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="border-b border-slate-200 pb-6">
                <h3 className="font-semibold text-slate-900 mb-2">{q}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#1E3A5F] py-16 md:py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-10 h-10 text-[#D4AF37] mx-auto mb-4" aria-hidden="true" />
          <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to stop overpaying?
          </h2>
          <p className="text-blue-200 mb-8">
            Free deal alerts. Personal booking help. No pressure, ever.
          </p>

          <div className="max-w-md mx-auto">
            <DealAlertsForm dark />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-blue-300 text-sm">
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4" aria-hidden="true" /> Free forever</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4" aria-hidden="true" /> No credit card</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4" aria-hidden="true" /> Unsubscribe anytime</span>
          </div>

          <p className="mt-8 text-blue-400 text-sm">
            Already a subscriber?{' '}
            <Link href="/deals" className="text-[#D4AF37] hover:underline">
              Browse current deals →
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
