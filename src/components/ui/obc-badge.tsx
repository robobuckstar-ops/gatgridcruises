'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Gift } from 'lucide-react'

/**
 * Site-wide floating link to the /onboard-credit explainer. Rendered once from
 * the root layout, so it rides along on every route — including the highest
 * traffic landing pages that have no OBC callout of their own.
 *
 * Positioning stacks it directly above the chat bubble so the two floating
 * elements read as one tidy corner group. The bubble is 56px tall (w-14 h-14)
 * at bottom-24 right-6 on mobile and sm:bottom-6 right-6 from sm up, so its top
 * edge sits at 152px / 80px. The badge takes the same right-6 gutter and clears
 * the bubble by ~16px: bottom-[10.5rem] (168px) on mobile, sm:bottom-24 (96px)
 * on desktop.
 *
 * z-30 is above page content but below the chat bubble (z-40), the compare bar
 * (z-40), and the chat panel / newsletter popup (z-50) — the badge must never
 * be what covers an open dialog.
 *
 * Hidden on /onboard-credit itself, where it would only link to the page the
 * visitor is already reading.
 *
 * Copy note: the offer is a flat share of the cruise fare with no cap (see
 * src/lib/obc.ts), so this advertises free onboard credit without quoting a
 * ceiling that doesn't exist. It is credit spendable onboard, never cash back.
 */
export function ObcBadge() {
  const pathname = usePathname()

  if (pathname?.startsWith('/onboard-credit')) return null

  return (
    <div className="fixed z-30 right-6 bottom-[10.5rem] sm:bottom-24">
      <Link
        href="/onboard-credit"
        aria-label="Book with us and get free onboard credit — learn how onboard credit works"
        className="cta-shimmer inline-flex items-center gap-1.5 rounded-full bg-[#1E3A5F] px-2.5 py-1.5 text-[11px] font-semibold leading-none text-white shadow-[0_2px_10px_rgba(30,58,95,0.35)] ring-1 ring-[#D4AF37]/45 transition-colors duration-200 hover:bg-[#2a4d75] focus:outline-2 focus:outline-offset-2 focus:outline-[#D4AF37]"
      >
        <Gift className="relative h-3.5 w-3.5 shrink-0 text-[#D4AF37]" aria-hidden="true" />
        {/* .relative lifts the text above the shimmer's ::before sweep */}
        <span className="relative">Free Onboard Credit</span>
      </Link>
    </div>
  )
}
