// The shared SMS inbox for the business line, at /admin/messages.
//
// Gated by MESSAGES_ADMIN_SECRET rather than by an admin login, because this
// app doesn't have one — see src/lib/messages-auth.ts.

import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import MessagesInbox from '@/components/admin/messages-inbox'
import MessagesLogin from '@/components/admin/messages-login'
import { MESSAGES_COOKIE, getMessagesSecret, isValidSessionCookie } from '@/lib/messages-auth'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Messages · GatGrid Cruises',
  robots: { index: false, follow: false },
}

export default async function MessagesPage() {
  const secretConfigured = getMessagesSecret() !== null

  // Without a passphrase set there is nothing to log in against. Locally that
  // means "just show the inbox"; in production it means the page stays shut
  // until the variable exists, rather than opening client texts to anyone.
  if (!secretConfigured) {
    if (process.env.NODE_ENV === 'production') {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
          <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-7 text-center">
            <h1 className="font-display text-lg font-bold text-navy-900">Inbox not set up yet</h1>
            <p className="mt-2 text-sm text-slate-600">
              Add a <code className="rounded bg-slate-100 px-1">MESSAGES_ADMIN_SECRET</code>{' '}
              environment variable in Vercel and redeploy — that passphrase is what opens this page.
            </p>
          </div>
        </div>
      )
    }
    return <MessagesInbox />
  }

  const session = (await cookies()).get(MESSAGES_COOKIE)?.value
  if (!isValidSessionCookie(session)) return <MessagesLogin />

  return <MessagesInbox />
}
