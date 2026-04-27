import { Metadata } from 'next'
import { Suspense } from 'react'
import {
  DollarSign,
  Users,
  BarChart3,
  Link2,
  Star,
  Shield,
  CheckCircle,
  ExternalLink,
} from 'lucide-react'
import { ReferralForm } from './ReferralForm'

export const metadata: Metadata = {
  title: 'Partner & Affiliate Program | GatGrid Cruises',
  description:
    'Join the GatGrid Cruises affiliate program. Earn commissions sharing Disney Cruise Line deals and concierge services with your audience.',
  robots: { index: true, follow: true },
}

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Apply & Get Your Code',
    description:
      'Fill out the short application below. Once approved, you receive a unique referral code and tracking link.',
    icon: Link2,
  },
  {
    step: '02',
    title: 'Share with Your Audience',
    description:
      'Post your link, mention it in videos, or add it to your bio. Every click is tracked back to you automatically.',
    icon: Users,
  },
  {
    step: '03',
    title: 'Earn on Every Booking',
    description:
      'When someone books through your link, you earn a commission. We handle all the cruise planning — you just share.',
    icon: DollarSign,
  },
]

const BENEFITS = [
  { text: 'Dedicated referral tracking link & custom code' },
  { text: 'Real-time click and conversion dashboard' },
  { text: 'Monthly commission payouts' },
  { text: 'Exclusive partner-only deals to share' },
  { text: 'Co-marketing opportunities for large creators' },
  { text: 'Direct line to Grayson for audience questions' },
]

const WHO_ITS_FOR = [
  {
    label: 'Disney Travel Bloggers',
    desc: 'Your readers trust your cruise recommendations.',
  },
  {
    label: 'Family & Lifestyle Creators',
    desc: "If your audience has families, they're dreaming about Disney Cruises.",
  },
  {
    label: 'Travel Agents & Planners',
    desc: 'Add a Disney Cruise specialist to your referral network.',
  },
  {
    label: 'Facebook Group Admins',
    desc: 'Disney cruise groups are full of people looking for experts.',
  },
]

export default function ReferralPage() {
  return (
    <div className="min-h-screen bg-[#0d1f3c]">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-[#1E3A5F] to-[#0d1f3c] pt-24 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none select-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-[#D4AF37] blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-blue-400 blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-4 py-1.5 mb-6">
            <Star className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
              Affiliate Partner Program
            </span>
          </div>
          <h1 className="font-fraunces text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
            Earn While You Share the
            <span className="text-[#D4AF37]"> Magic</span>
          </h1>
          <p className="font-inter text-lg text-blue-200 max-w-2xl mx-auto leading-relaxed">
            Partner with GatGrid Cruises and earn commissions every time someone from your
            audience books a Disney Cruise through your unique referral link.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-fraunces text-3xl font-bold text-white text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map(({ step, title, description, icon: Icon }) => (
              <div key={step} className="relative text-center">
                <div className="w-14 h-14 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 text-xs font-bold text-[#D4AF37]/40 font-fraunces">
                  {step}
                </div>
                <h3 className="font-fraunces text-lg font-bold text-white mb-2">{title}</h3>
                <p className="font-inter text-sm text-blue-300 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits + Who It's For */}
      <section className="py-16 px-4 bg-[#1E3A5F]/30">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-fraunces text-2xl font-bold text-white mb-6">
              What You Get
            </h2>
            <ul className="space-y-3">
              {BENEFITS.map(({ text }) => (
                <li key={text} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <span className="font-inter text-sm text-blue-200">{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-fraunces text-2xl font-bold text-white mb-6">
              Who It&apos;s For
            </h2>
            <div className="space-y-4">
              {WHO_ITS_FOR.map(({ label, desc }) => (
                <div
                  key={label}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                >
                  <p className="font-semibold text-white text-sm mb-0.5">{label}</p>
                  <p className="text-xs text-blue-300">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats teaser */}
      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { value: '$0', label: 'Cost to Join', icon: DollarSign },
              { value: '24hr', label: 'Avg Response Time', icon: BarChart3 },
              { value: '100%', label: 'Free to Your Audience', icon: Shield },
            ].map(({ value, label, icon: Icon }) => (
              <div
                key={label}
                className="bg-[#1E3A5F]/60 border border-white/10 rounded-2xl px-6 py-8"
              >
                <Icon className="w-8 h-8 text-[#D4AF37] mx-auto mb-3" />
                <p className="font-fraunces text-4xl font-bold text-white mb-1">{value}</p>
                <p className="font-inter text-sm text-blue-300">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-16 px-4 bg-gradient-to-b from-[#0d1f3c] to-[#1E3A5F]/40">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-fraunces text-3xl font-bold text-white mb-3">
              Apply to Partner
            </h2>
            <p className="font-inter text-blue-200">
              Tell us about your audience and we&apos;ll get you set up with a tracking link.
            </p>
          </div>
          <div className="bg-[#1E3A5F]/50 border border-white/10 rounded-2xl p-7 shadow-2xl backdrop-blur-sm">
            <Suspense>
              <ReferralForm />
            </Suspense>
          </div>
        </div>
      </section>

      {/* FTC Disclosure & Terms */}
      <section className="py-14 px-4 border-t border-white/10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start gap-3 mb-6">
            <Shield className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-1" />
            <h2 className="font-fraunces text-xl font-bold text-white">
              FTC Disclosure Requirements &amp; Partner Terms
            </h2>
          </div>

          <div className="space-y-5 font-inter text-sm text-blue-300 leading-relaxed">
            <div className="bg-[#D4AF37]/8 border border-[#D4AF37]/20 rounded-xl px-5 py-4">
              <p className="font-semibold text-[#D4AF37] mb-2">Required FTC Disclosure</p>
              <p>
                As a GatGrid Cruises affiliate, you are legally required by the Federal Trade
                Commission (FTC) to clearly disclose your affiliate relationship whenever you
                promote our services. This applies to all content — social media posts, videos,
                blog articles, stories, and any other medium — where you earn a commission or
                other compensation.
              </p>
            </div>

            <div>
              <p className="font-semibold text-white mb-2">What you must disclose:</p>
              <ul className="space-y-1.5 list-disc list-inside ml-2">
                <li>
                  That you may earn a commission if someone books through your referral link
                </li>
                <li>The disclosure must be clear, conspicuous, and placed near the referral link or promotional content</li>
                <li>It must appear before the audience engages with the link (not buried in fine print)</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-white mb-2">Acceptable disclosure language:</p>
              <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 space-y-1.5 text-xs font-mono text-blue-200">
                <p>&ldquo;This post contains affiliate links. I may earn a commission if you book through my link, at no extra cost to you.&rdquo;</p>
                <p>&ldquo;#ad #affiliate #sponsored&rdquo; (when used clearly and prominently)</p>
                <p>&ldquo;Affiliate link below — I earn a small commission on bookings.&rdquo;</p>
              </div>
            </div>

            <div>
              <p className="font-semibold text-white mb-2">Partner Program Terms (Summary):</p>
              <ul className="space-y-1.5 list-disc list-inside ml-2">
                <li>You must be 18 years of age or older to participate</li>
                <li>Do not make false or misleading claims about GatGrid Cruises services</li>
                <li>Do not use paid advertising to promote your referral link without prior written approval</li>
                <li>Do not self-refer (use your own link to book your own trips)</li>
                <li>Commissions are earned on completed, non-refunded bookings only</li>
                <li>GatGrid Cruises reserves the right to modify or terminate the program with 30 days&apos; notice</li>
                <li>Referral codes and links are non-transferable</li>
              </ul>
            </div>

            <p className="text-xs text-blue-400">
              By applying to the GatGrid Cruises Partner Program, you agree to comply with all
              applicable FTC guidelines and these partner terms. For the full FTC guide on
              endorsements, visit{' '}
              <a
                href="https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4AF37] underline hover:text-yellow-300 inline-flex items-center gap-1"
              >
                ftc.gov <ExternalLink className="w-3 h-3" />
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
