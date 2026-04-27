import { Metadata } from 'next'
import { BarChart3, Link2, DollarSign, MousePointerClick, Clock, Lock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Referral Dashboard | GatGrid Cruises',
  description: 'Track your referral clicks, conversions, and commissions.',
  robots: { index: false, follow: false },
}

const STAT_CARDS = [
  { label: 'Total Clicks', value: '—', icon: MousePointerClick, note: 'All-time link clicks' },
  { label: 'Bookings', value: '—', icon: BarChart3, note: 'Completed referral bookings' },
  { label: 'Pending Commission', value: '—', icon: DollarSign, note: 'Awaiting payout' },
  { label: 'Paid Out', value: '—', icon: DollarSign, note: 'Lifetime earnings' },
]

export default function ReferralDashboardPage() {
  return (
    <div className="min-h-screen bg-[#0d1f3c]">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#1E3A5F] to-[#0d1f3c] pt-24 pb-14 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-7 h-7 text-[#D4AF37]" />
            <h1 className="font-fraunces text-3xl font-bold text-white">
              Referral Dashboard
            </h1>
          </div>
          <p className="font-inter text-blue-300">
            Track your clicks, conversions, and commissions in one place.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Coming Soon Banner */}
        <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-2xl px-6 py-5 mb-10 flex items-start gap-4">
          <Clock className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-[#D4AF37] mb-1">Dashboard Coming Soon</p>
            <p className="font-inter text-sm text-blue-200 leading-relaxed">
              Full dashboard functionality — including real-time click tracking, conversion
              history, and payout management — is in development. In the meantime, Grayson
              will send you monthly referral reports directly via email.
            </p>
          </div>
        </div>

        {/* Stat Cards (placeholder) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {STAT_CARDS.map(({ label, value, icon: Icon, note }) => (
            <div
              key={label}
              className="bg-[#1E3A5F]/60 border border-white/10 rounded-2xl px-5 py-6"
            >
              <Icon className="w-5 h-5 text-[#D4AF37] mb-3" />
              <p className="font-fraunces text-3xl font-bold text-white mb-1">{value}</p>
              <p className="font-inter text-sm font-semibold text-white mb-0.5">{label}</p>
              <p className="text-xs text-blue-400">{note}</p>
            </div>
          ))}
        </div>

        {/* Referral Link Section */}
        <div className="bg-[#1E3A5F]/50 border border-white/10 rounded-2xl px-6 py-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Link2 className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="font-fraunces text-lg font-bold text-white">Your Referral Link</h2>
          </div>
          <p className="font-inter text-sm text-blue-300 mb-4">
            Your unique referral link was emailed to you when you were approved. Share it in
            your bio, posts, and videos to start earning.
          </p>
          <div className="bg-white/5 border border-white/15 rounded-lg px-4 py-3 font-mono text-sm text-blue-200">
            https://gatgridcruises.com/?ref=YOURCODE
          </div>
          <p className="text-xs text-blue-400 mt-2">
            Replace YOURCODE with your personal referral code from your approval email.
          </p>
        </div>

        {/* Auth Placeholder */}
        <div className="bg-[#1E3A5F]/30 border border-white/10 rounded-2xl px-6 py-8 text-center">
          <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="font-fraunces text-xl font-bold text-white mb-2">
            Partner Login Coming Soon
          </h3>
          <p className="font-inter text-sm text-blue-300 max-w-md mx-auto leading-relaxed">
            We&apos;re building a full partner portal with login, live stats, payout history,
            and commission tracking. Until then, email{' '}
            <a
              href="mailto:grayson@gatgridcruises.com"
              className="text-[#D4AF37] hover:underline"
            >
              grayson@gatgridcruises.com
            </a>{' '}
            with any questions about your referrals.
          </p>
        </div>
      </div>
    </div>
  )
}
