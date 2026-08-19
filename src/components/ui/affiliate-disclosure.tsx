/**
 * Affiliate Disclosure Component
 * Tasteful, transparent disclosure for pages with referral links
 */
export function AffiliateDisclosure() {
  return (
    <div className="text-xs italic text-slate-500 max-w-2xl">
      <strong>Disclosure:</strong> Some links on this page are referral links. If you apply through our
      links, we may earn a commission at no extra cost to you. We recommend cards based on editorial
      merit, not commission rates.
    </div>
  )
}

/**
 * FTC disclosure for travel booking links (flights, hotels, transfers,
 * insurance). Sits directly next to the links it covers — the disclosure has
 * to be visible without scrolling or clicking through to /disclosures.
 */
export function TravelAffiliateDisclosure({ className = '' }: { className?: string }) {
  return (
    <p className={`text-xs italic text-slate-500 leading-relaxed ${className}`}>
      <strong className="not-italic">Affiliate disclosure:</strong> As an affiliate we may earn a
      commission from these links, at no cost to you. We don&apos;t sell flights, hotels, or
      transfers — these open third-party sites where you book directly.
    </p>
  )
}
