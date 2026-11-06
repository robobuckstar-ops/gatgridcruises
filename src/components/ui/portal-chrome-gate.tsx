'use client'

import { usePathname } from 'next/navigation'
import { ChatWidget } from '@/components/ui/chat-widget'
import { ObcBadge } from '@/components/ui/obc-badge'
import { NewsletterPopup } from '@/components/ui/newsletter-popup'

// Marketing chrome — the chat bubble, the Free Onboard Credit badge, and the
// newsletter popup — makes sense on the public marketing site but clutters the
// private client portal, where the visitor is an already-booked client. Hide it
// on /my-trip routes; render it normally everywhere else.
const MOBILE_FORM_PAGES = ['/obc-estimate', '/book', '/transfer', '/free-guide', '/contact', '/concierge', '/group-cruise', '/price-watch']

export function PortalChromeGate() {
  const pathname = usePathname()
  if (pathname?.startsWith('/my-trip')) return null

  return (
    <>
      {/* On phones these float over form fields, so lead form pages leave them off. */}
      <div className={MOBILE_FORM_PAGES.includes(pathname) ? 'hidden md:block' : undefined}>
        <ChatWidget />
        <ObcBadge />
      </div>
      {pathname !== '/obc-thanks' && <NewsletterPopup />}
    </>
  )
}
