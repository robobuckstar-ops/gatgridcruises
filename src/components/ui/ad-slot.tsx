interface AdSlotProps {
  location?: string
  size?: '728x90' | '300x250' | 'native'
  className?: string
  width?: number
  height?: number
}

const AMEX_URL =
  'https://americanexpress.com/en-us/referral/business-platinum-charge-card?ref=CRYSTSGCNM&XL=MIMNS'

export function AdSlot({ size, width, className = '' }: AdSlotProps) {
  const resolvedSize: '728x90' | '300x250' | 'native' =
    size ?? (width && width >= 700 ? '728x90' : '300x250')

  const isWide = resolvedSize === '728x90'

  return (
    <div className={`w-full ${className}`}>
      <a
        href={AMEX_URL}
        target="_blank"
        rel="noopener noreferrer sponsored"
        aria-label="American Express Business Platinum — earn 150,000 points"
        className={`flex ${isWide ? 'flex-row items-center justify-between gap-4' : 'flex-col items-center text-center gap-3'} bg-gradient-to-r from-[#006FCF] to-[#0077CC] hover:from-[#0057A8] hover:to-[#005FA3] text-white rounded-xl p-4 sm:p-5 transition-all duration-200 group`}
      >
        <div className={`flex items-center gap-3 ${isWide ? '' : 'flex-col text-center'}`}>
          <div className="flex-shrink-0 w-11 h-11 bg-white/20 rounded-lg flex items-center justify-center text-white font-black text-xs tracking-tight">
            AMEX
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-widest text-blue-200 font-semibold mb-0.5">
              American Express Business Platinum
            </p>
            <p className="font-bold text-sm sm:text-base leading-snug">
              Earn 150,000 points toward your next Disney Cruise
            </p>
            {!isWide && (
              <p className="text-xs text-blue-200 mt-0.5">
                Use points for airfare, hotels &amp; excursions
              </p>
            )}
          </div>
        </div>
        <span className="flex-shrink-0 bg-white text-[#006FCF] text-sm font-bold px-5 py-2 rounded-lg group-hover:bg-blue-50 transition-colors whitespace-nowrap">
          Learn More →
        </span>
      </a>
      <p className="text-center text-[11px] text-slate-400 mt-1.5">
        <a
          href="mailto:robobuckstar@gmail.com"
          className="hover:text-blue-500 transition-colors underline decoration-dotted"
        >
          Advertise your travel agency here — contact us
        </a>
      </p>
    </div>
  )
}
