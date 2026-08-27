'use client'

import { usePathname } from 'next/navigation'
import { ChatWidget } from '@/components/ui/chat-widget'
import { ObcBadge } from '@/components/ui/obc-badge'
import { NewsletterPopup } from '@/components/ui/newsletter-popup'

// Marketing chrome — the chat bubble, the Free Onboard Credit badge, and the
// newsletter popup — makes sense on the public marketing site but clutters the
// private client portal, where the visitor is an already-booked client. Hide it
// on /my-trip routes; render it normally everywhere else.
export function PortalChromeGate() {
  const pathname = usePathname()
  if (pathname?.startsWith('/my-trip')) return null

  return (
    <>
      <ChatWidget />
      <ObcBadge />
      <NewsletterPopup />
    </>
  )
}
