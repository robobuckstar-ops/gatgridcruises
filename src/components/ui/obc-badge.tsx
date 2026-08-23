import Link from 'next/link'
import { Gift } from 'lucide-react'

/**
 * Site-wide floating link to the /onboard-credit explainer. Rendered once from
 * the root layout, so it rides along on every route — including the highest
 * traffic landing pages that have no OBC callout of their own.
 *
 * Positioning is deliberately kept out of the chat widget's way. The chat
 * bubble owns the bottom-right corner (bottom-24 on mobile, bottom-6 from sm
 * up, both right-6), so this badge takes the right edge at mid-height on
 * desktop and the bottom-LEFT on mobile, where a mid-height pill would sit on
 * top of body copy.
 *
 * z-30 is above page content but below the chat bubble (z-40), the compare bar
 * (z-40), and the chat panel / newsletter popup (z-50) — the badge must never
 * be what covers an open dialog.
 *
 * Copy note: the offer is a flat share of the cruise fare with no cap (see
 * src/lib/obc.ts), so this advertises free onboard credit without quoting a
 * ceiling that doesn't exist. It is credit spendable onboard, never cash back.
 */
export function ObcBadge() {
  return (
    <div className="fixed z-30 bottom-24 left-3 sm:bottom-auto sm:left-auto sm:top-1/2 sm:right-0 sm:-translate-y-1/2">
      <Link
        href="/onboard-credit"
        aria-label="Book with us and get free onboard credit — learn how onboard credit works"
        className="cta-shimmer inline-flex items-center gap-1.5 rounded-full bg-[#1E3A5F] px-3 py-2 text-[11px] font-semibold text-white shadow-[0_2px_10px_rgba(30,58,95,0.35)] ring-1 ring-[#D4AF37]/45 transition-colors duration-200 hover:bg-[#2a4d75] focus:outline-2 focus:outline-offset-2 focus:outline-[#D4AF37] sm:gap-2 sm:rounded-l-full sm:rounded-r-none sm:px-4 sm:py-2.5 sm:text-sm"
      >
        <Gift className="relative h-3.5 w-3.5 shrink-0 text-[#D4AF37] sm:h-4 sm:w-4" aria-hidden="true" />
        {/* .relative lifts the text above the shimmer's ::before sweep */}
        <span className="relative">
          <span className="hidden sm:inline">Book With Us → </span>Free Onboard Credit
        </span>
      </Link>
    </div>
  )
}
