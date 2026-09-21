'use client'

import { useState } from 'react'
import { Loader2, Lock, Mail, CheckCircle2 } from 'lucide-react'

export default function MessagesLogin() {
  // Magic-link (email) is the primary path; passphrase stays as a fallback.
  const [email, setEmail] = useState('')
  const [linkSent, setLinkSent] = useState(false)
  const [linkBusy, setLinkBusy] = useState(false)
  const [linkError, setLinkError] = useState('')

  const [showPass, setShowPass] = useState(false)
  const [secret, setSecret] = useState('')
  const [passError, setPassError] = useState('')
  const [passBusy, setPassBusy] = useState(false)

  async function requestLink(event: React.FormEvent) {
    event.preventDefault()
    if (!email.trim() || linkBusy) return
    setLinkBusy(true)
    setLinkError('')
    try {
      const res = await fetch('/api/admin/magic-link/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setLinkError(data?.error || 'Could not send the link.')
        return
      }
      // Always "sent" on success — the server won't say if the email is an admin.
      setLinkSent(true)
    } catch {
      setLinkError('Could not reach the server. Try again.')
    } finally {
      setLinkBusy(false)
    }
  }

  async function submitPass(event: React.FormEvent) {
    event.preventDefault()
    if (!secret.trim() || passBusy) return
    setPassBusy(true)
    setPassError('')
    try {
      const res = await fetch('/api/sms/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setPassError(data?.error || 'Could not sign in.')
        return
      }
      window.location.reload()
    } catch {
      setPassError('Could not reach the server. Try again.')
    } finally {
      setPassBusy(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-50 text-navy">
            <Lock className="h-5 w-5" />
          </span>
          <div>
            <h1 className="font-display text-lg font-bold text-navy-900">GatGrid Messages</h1>
            <p className="text-sm text-slate-500">Client texts — sign in to continue</p>
          </div>
        </div>

        {linkSent ? (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-center">
            <CheckCircle2 className="mx-auto mb-2 h-6 w-6 text-green-600" />
            <p className="text-sm font-medium text-slate-800">Check your email</p>
            <p className="mt-1 text-sm text-slate-600">
              If that address is on the admin list, a one-time login link is on its way. It expires in 15 minutes.
            </p>
            <button
              type="button"
              onClick={() => setLinkSent(false)}
              className="mt-3 text-sm font-medium text-ocean hover:underline"
            >
              Use a different email
            </button>
          </div>
        ) : (
          <form onSubmit={requestLink}>
            <label htmlFor="admin-email" className="mb-1.5 block text-sm font-medium text-slate-700">
              Email me a login link
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoFocus
              autoComplete="email"
              placeholder="you@example.com"
              className="mb-4 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-ocean"
            />
            {linkError && <p className="mb-3 text-sm text-red-600">{linkError}</p>}
            <button
              type="submit"
              disabled={linkBusy || !email.trim()}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-navy py-2.5 text-sm font-semibold text-white transition hover:bg-navy-700 disabled:opacity-50"
            >
              {linkBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
              Send me a link
            </button>
          </form>
        )}

        <div className="mt-5 border-t border-slate-100 pt-4">
          {showPass ? (
            <form onSubmit={submitPass}>
              <label htmlFor="messages-secret" className="mb-1.5 block text-sm font-medium text-slate-700">
                Passphrase
              </label>
              <input
                id="messages-secret"
                type="password"
                value={secret}
                onChange={e => setSecret(e.target.value)}
                autoComplete="current-password"
                className="mb-3 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-ocean"
              />
              {passError && <p className="mb-3 text-sm text-red-600">{passError}</p>}
              <button
                type="submit"
                disabled={passBusy || !secret.trim()}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-navy py-2 text-sm font-semibold text-navy transition hover:bg-navy-50 disabled:opacity-50"
              >
                {passBusy && <Loader2 className="h-4 w-4 animate-spin" />}
                Open with passphrase
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setShowPass(true)}
              className="w-full text-center text-sm font-medium text-slate-500 hover:text-navy"
            >
              Use the passphrase instead
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
