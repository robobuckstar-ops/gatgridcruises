import { Shield, ExternalLink, Info } from 'lucide-react'
import {
  INSURANCE_PARTNERS,
  getInsurancePartnerLink,
  isInsurancePartnerAffiliated,
} from '@/lib/affiliate-config'

type Variant = 'light' | 'dark'

interface Props {
  variant?: Variant
  heading?: string
  subheading?: string
  showDisclosure?: boolean
}

export function InsurancePartners({
  variant = 'light',
  heading = 'Compare Travel Insurance for Your Cruise',
  subheading = "Three options we trust — pick the one that fits your itinerary, age, and risk tolerance. We're not insurance brokers, just honest about who covers what.",
  showDisclosure = true,
}: Props) {
  const isDark = variant === 'dark'

  const sectionBg = isDark ? 'bg-[#0d1f3c]' : 'bg-slate-50'
  const headingColor = isDark ? 'text-white' : 'text-[#1E3A5F]'
  const subColor = isDark ? 'text-blue-200' : 'text-slate-600'
  const cardBg = isDark
    ? 'bg-[#1E3A5F]/60 border-white/10'
    : 'bg-white border-slate-200'
  const cardTitle = isDark ? 'text-white' : 'text-[#1E3A5F]'
  const cardBody = isDark ? 'text-blue-200' : 'text-slate-600'
  const tagBg = isDark
    ? 'bg-[#D4AF37]/15 border-[#D4AF37]/30 text-[#D4AF37]'
    : 'bg-[#1E3A5F]/5 border-[#1E3A5F]/15 text-[#1E3A5F]'
  const checkColor = isDark ? 'text-[#D4AF37]' : 'text-[#1E3A5F]'
  const ctaClass = isDark
    ? 'bg-[#D4AF37] text-[#1E3A5F] hover:bg-yellow-300'
    : 'bg-[#1E3A5F] text-white hover:bg-[#2a4f7a]'
  const disclosureBox = isDark
    ? 'bg-white/5 border-white/10 text-blue-200'
    : 'bg-amber-50 border-amber-200 text-amber-900'

  return (
    <section className={`py-12 md:py-16 ${sectionBg}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
              Travel Insurance
            </span>
          </div>
          <h2 className={`font-fraunces text-3xl md:text-4xl font-bold ${headingColor} mb-4`}>
            {heading}
          </h2>
          <p className={`font-inter text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${subColor}`}>
            {subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {INSURANCE_PARTNERS.map((partner) => {
            const url = getInsurancePartnerLink(partner)
            const affiliated = isInsurancePartnerAffiliated(partner)
            return (
              <div
                key={partner.slug}
                className={`flex flex-col rounded-2xl border p-6 ${cardBg}`}
              >
                <span
                  className={`self-start text-[10px] font-bold uppercase tracking-widest border rounded-full px-2.5 py-0.5 mb-3 ${tagBg}`}
                >
                  {partner.bestFor}
                </span>
                <h3 className={`font-fraunces text-xl font-bold mb-1 ${cardTitle}`}>
                  {partner.name}
                </h3>
                <p className={`font-inter text-sm mb-4 ${cardBody}`}>{partner.tagline}</p>

                <ul className={`space-y-2 mb-6 text-sm ${cardBody}`}>
                  {partner.highlights.map((h) => (
                    <li key={h} className="flex gap-2">
                      <span className={`flex-shrink-0 mt-1 ${checkColor}`}>•</span>
                      <span className="leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className={`mt-auto inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-colors ${ctaClass}`}
                >
                  Get a Quote
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                {!affiliated && (
                  <p className={`text-[11px] mt-2 italic text-center ${cardBody}`}>
                    Editorial recommendation — no affiliate relationship in place yet.
                  </p>
                )}
              </div>
            )
          })}
        </div>

        {showDisclosure && (
          <div className={`mt-8 flex items-start gap-3 rounded-xl border px-5 py-4 ${disclosureBox}`}>
            <Info className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#D4AF37]" />
            <p className="text-xs leading-relaxed">
              <strong className="font-semibold">Affiliate disclosure:</strong>{' '}
              Some of the links above are affiliate links — if you buy a policy through them
              we may earn a small commission at no extra cost to you. We don&apos;t sell
              insurance, we don&apos;t take payment to feature any particular carrier, and we
              don&apos;t see your quote details. Always read the policy certificate before
              you buy: cruise itineraries, pre-existing conditions, and CFAR windows change
              what coverage you actually get.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
