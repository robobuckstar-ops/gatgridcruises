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
  Gift,
  Award,
  Crown,
  Quote,
  HelpCircle,
} from 'lucide-react'
import { ReferralForm } from './ReferralForm'

export const metadata: Metadata = {
  title: 'Partner & Referral Program | GatGrid Cruises',
  description:
    'Share your unique link, earn rewards when friends book Disney cruises. Three reward tiers: thank-you gifts, onboard credit bonuses, and commission percentages for ambassadors.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://gatgridcruises.com/referral' },
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
    title: 'Earn When Friends Book',
    description:
      'When someone from your link books a Disney cruise with our concierge, you earn a reward — tier depends on how many bookings you drive each year.',
    icon: DollarSign,
  },
]

const TIERS = [
  {
    name: 'Casual Referrer',
    range: '1–2 bookings / year',
    icon: Gift,
    reward: 'Thank-you gift',
    description:
      'Send a friend our way and once they book, we mail you a Disney-themed thank-you (gift card or branded merch). No quotas, no pressure — just appreciation.',
    perks: [
      'Personal referral code & tracking link',
      'Hand-picked thank-you gift (~$50 value)',
      'Insider deal previews via email',
    ],
    accent: 'border-blue-300/30 bg-blue-300/5',
    featured: false,
  },
  {
    name: 'Active Partner',
    range: '3–5 bookings / year',
    icon: Award,
    reward: 'OBC bonus on your next cruise',
    description:
      'Hit three confirmed bookings in a calendar year and we apply onboard credit to your own next Disney cruise — stacking on top of every other deal you qualify for.',
    perks: [
      'Everything in Casual Referrer',
      '$100 OBC per qualifying booking, applied to your sailing',
      'Quarterly performance reports',
      'Early access to promo creative & assets',
    ],
    accent: 'border-[#D4AF37]/40 bg-[#D4AF37]/8',
    featured: true,
  },
  {
    name: 'Ambassador',
    range: '6+ bookings / year',
    icon: Crown,
    reward: 'Cash commission percentage',
    description:
      'For creators and travel pros who consistently send bookings. You move to a percentage-based commission paid monthly, with co-marketing opportunities and direct line to Grayson.',
    perks: [
      'Everything in Active Partner',
      'Percentage-based commission, paid monthly',
      'Custom landing page with your photo & bio',
      'Co-marketing & feature spots in our newsletter',
      'Priority concierge support for your audience',
    ],
    accent: 'border-purple-300/30 bg-purple-300/5',
    featured: false,
  },
]

const BENEFITS = [
  { text: 'Dedicated referral tracking link & custom code' },
  { text: 'Real-time click and conversion dashboard' },
  { text: 'Tiered rewards — gifts, OBC, or cash commission' },
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

const TESTIMONIALS = [
  {
    quote:
      'Sent three families our way last summer and the OBC bonus paid for a full balcony upgrade on our Wish sailing. The tracking dashboard makes it stupid simple.',
    name: 'Active Partner',
    role: 'Family travel blogger · 38K followers',
    placeholder: true,
  },
  {
    quote:
      'Grayson actually takes the time to walk my followers through their options before quoting. That trust is why I keep recommending GatGrid — and the monthly commission checks are real.',
    name: 'Ambassador',
    role: 'Disney TikTok creator · 220K followers',
    placeholder: true,
  },
  {
    quote:
      "I'm not a creator — just a Facebook group admin. I sent a few friends and got a really thoughtful thank-you package in the mail. Felt like a real partnership, not an algorithm.",
    name: 'Casual Referrer',
    role: 'Disney Cruise Families FB group',
    placeholder: true,
  },
]

const FAQS = [
  {
    q: 'How does my friend book a cruise through my link?',
    a: 'They click your tracking link, browse GatGrid Cruises, and when they request a quote or talk to our concierge, your referral code is automatically attached to their inquiry. Once their Disney cruise is booked and sailed, the referral is credited to you.',
  },
  {
    q: 'Does my friend pay more because they used my link?',
    a: 'No. There is zero markup. Your friend pays Disney Cruise Line directly, at the same prices Disney publishes. Your reward is funded by the standard travel-industry commission that Disney already pays the booking agency.',
  },
  {
    q: 'When do I get my reward?',
    a: 'Thank-you gifts (Casual tier) ship within 30 days of the cruise sailing. OBC bonuses (Active tier) are applied to your next confirmed Disney booking. Ambassador commissions are paid monthly via PayPal or direct deposit, on the month after the cruise sails (Disney pays commission post-sailing, not at booking).',
  },
  {
    q: 'How do tiers reset — calendar year or rolling 12 months?',
    a: 'Tiers are based on rolling 12-month confirmed bookings. The moment you hit three confirmed bookings in any 12-month window, you move up to Active Partner. Six bookings moves you to Ambassador. You never get demoted mid-program — once you reach a tier you keep it through the end of the next calendar year.',
  },
  {
    q: 'Can I refer myself or my own family?',
    a: "No self-referrals. You can't use your own link to book your own cruise. Spouses, parents, and kids in your immediate household also don't count. We do allow extended family — cousins, in-laws, siblings in separate households — as long as the booking is in their name and they're the one sailing.",
  },
  {
    q: 'Do I need to be an influencer or have a big following?',
    a: 'Not at all. The Casual tier is built specifically for people who just want to share with friends, family, and small online groups. Many of our active partners came in with under 1,000 followers — what matters is the quality of the relationship, not the size of the audience.',
  },
  {
    q: 'What if a booking is cancelled or refunded?',
    a: 'Rewards are earned on sailed, non-refunded bookings only. If a booking is cancelled before sailing, it does not count toward your tier and any pending reward is reversed. This protects the program from gaming and keeps Disney commissions stable.',
  },
  {
    q: 'How is my tracking handled — is it cookie-based?',
    a: 'Your code is captured at click and stored locally for 60 days, then attached to any quote or concierge inquiry submitted during that window. We also tag the inquiry on our side so even if a visitor switches devices, Grayson can credit the referral manually when they recognize the source.',
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
              Referral &amp; Partner Program
            </span>
          </div>
          <h1 className="font-fraunces text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
            Share Your Link, Earn While You
            <span className="text-[#D4AF37]"> Share the Magic</span>
          </h1>
          <p className="font-inter text-lg text-blue-200 max-w-2xl mx-auto leading-relaxed">
            Send friends, family, and followers our way. When they book a Disney cruise with
            our concierge, you earn rewards — from thank-you gifts to onboard credit to cash
            commission. Three tiers, no quotas, no cost to join.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#apply"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#1E3A5F] font-bold rounded-xl hover:bg-yellow-300 transition-colors shadow-lg text-sm"
            >
              Apply in 60 Seconds
            </a>
            <a
              href="#tiers"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-colors text-sm"
            >
              See Reward Tiers
            </a>
          </div>
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

      {/* Reward Tiers */}
      <section id="tiers" className="py-16 px-4 bg-gradient-to-b from-[#0d1f3c] to-[#1E3A5F]/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-3">
              Reward Tiers
            </p>
            <h2 className="font-fraunces text-3xl font-bold text-white mb-3">
              Three Tiers, One Goal: Reward Real Recommendations
            </h2>
            <p className="font-inter text-blue-300 max-w-2xl mx-auto">
              Your tier moves up automatically as you drive more confirmed bookings. No
              applications, no negotiations — just earn the reward your activity unlocks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TIERS.map(({ name, range, icon: Icon, reward, description, perks, accent, featured }) => (
              <div
                key={name}
                className={`relative rounded-2xl border ${accent} p-7 backdrop-blur-sm ${
                  featured ? 'md:-translate-y-3 shadow-2xl shadow-[#D4AF37]/10' : ''
                }`}
              >
                {featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#1E3A5F] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="font-fraunces text-xl font-bold text-white">{name}</h3>
                    <p className="text-xs text-blue-300">{range}</p>
                  </div>
                </div>
                <div className="mb-4 pb-4 border-b border-white/10">
                  <p className="text-xs text-blue-400 uppercase tracking-wider mb-1">Reward</p>
                  <p className="font-semibold text-[#D4AF37]">{reward}</p>
                </div>
                <p className="font-inter text-sm text-blue-200 leading-relaxed mb-5">
                  {description}
                </p>
                <ul className="space-y-2">
                  {perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-blue-200">{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-blue-400 mt-10 max-w-2xl mx-auto">
            Tiers are based on confirmed, sailed bookings over a rolling 12-month window. You
            move up automatically — no need to reapply. Commission percentages for Ambassadors
            are disclosed during onboarding and depend on Disney&apos;s current agency rates.
          </p>
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

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-3">
              What Partners Are Saying
            </p>
            <h2 className="font-fraunces text-3xl font-bold text-white mb-3">
              Real People, Real Rewards
            </h2>
            <p className="font-inter text-sm text-blue-400 max-w-xl mx-auto">
              Placeholder testimonials shown below — real partner quotes are added as the
              program grows. Want yours featured? Become an Ambassador.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ quote, name, role, placeholder }, idx) => (
              <div
                key={idx}
                className="relative bg-[#1E3A5F]/50 border border-white/10 rounded-2xl px-6 py-7 backdrop-blur-sm"
              >
                <Quote className="w-7 h-7 text-[#D4AF37]/40 mb-3" />
                <p className="font-inter text-sm text-blue-100 leading-relaxed mb-5 italic">
                  &ldquo;{quote}&rdquo;
                </p>
                <div className="pt-4 border-t border-white/10">
                  <p className="font-semibold text-white text-sm">{name}</p>
                  <p className="text-xs text-blue-300">{role}</p>
                </div>
                {placeholder && (
                  <span className="absolute top-3 right-3 text-[10px] text-blue-400/60 uppercase tracking-wider">
                    Placeholder
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats teaser */}
      <section className="py-14 px-4 bg-[#1E3A5F]/30">
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
              Apply to the Program
            </h2>
            <p className="font-inter text-blue-200">
              Tell us about your audience and we&apos;ll get you set up with a tracking link.
              Most applications get a response within 2 business days.
            </p>
          </div>
          <div className="bg-[#1E3A5F]/50 border border-white/10 rounded-2xl p-7 shadow-2xl backdrop-blur-sm">
            <Suspense>
              <ReferralForm />
            </Suspense>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <HelpCircle className="w-6 h-6 text-[#D4AF37]" />
            <h2 className="font-fraunces text-3xl font-bold text-white text-center">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map(({ q, a }) => (
              <details
                key={q}
                className="group bg-[#1E3A5F]/40 border border-white/10 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none hover:bg-white/5 transition-colors">
                  <span className="font-semibold text-white text-sm sm:text-base">{q}</span>
                  <span className="text-[#D4AF37] text-xl flex-shrink-0 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 pt-1 text-sm text-blue-200 leading-relaxed border-t border-white/5">
                  {a}
                </div>
              </details>
            ))}
          </div>
          <p className="text-center text-sm text-blue-300 mt-8">
            Still have questions? Email{' '}
            <a
              href="mailto:grayson@gatgridcruises.com"
              className="text-[#D4AF37] hover:underline"
            >
              grayson@gatgridcruises.com
            </a>{' '}
            and we&apos;ll get back to you within a day.
          </p>
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
                As a GatGrid Cruises partner, you are legally required by the Federal Trade
                Commission (FTC) to clearly disclose your referral relationship whenever you
                promote our services. This applies to all content — social media posts, videos,
                blog articles, stories, and any other medium — where you earn a reward or
                commission.
              </p>
            </div>

            <div>
              <p className="font-semibold text-white mb-2">What you must disclose:</p>
              <ul className="space-y-1.5 list-disc list-inside ml-2">
                <li>
                  That you may earn a reward or commission if someone books through your referral link
                </li>
                <li>The disclosure must be clear, conspicuous, and placed near the referral link or promotional content</li>
                <li>It must appear before the audience engages with the link (not buried in fine print)</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-white mb-2">Acceptable disclosure language:</p>
              <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 space-y-1.5 text-xs font-mono text-blue-200">
                <p>&ldquo;This post contains affiliate links. I may earn a reward if you book through my link, at no extra cost to you.&rdquo;</p>
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
                <li>Rewards are earned on completed, sailed, non-refunded bookings only</li>
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
