'use client'

import { useState } from 'react'
import { Loader2, Lock } from 'lucide-react'

export default function MessagesLogin() {
  const [secret, setSecret] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    if (!secret.trim() || busy) return

    setBusy(true)
    setError('')
    try {
      const res = await fetch('/api/sms/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret }),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setError(data?.error || 'Could not sign in.')
        return
      }
      // Full reload so the server component re-reads the new session cookie.
      window.location.reload()
    } catch {
      setError('Could not reach the server. Try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
      >
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-50 text-navy">
            <Lock className="h-5 w-5" />
          </span>
          <div>
            <h1 className="font-display text-lg font-bold text-navy-900">GatGrid Messages</h1>
            <p className="text-sm text-slate-500">Client texts — passphrase required</p>
          </div>
        </div>

        <label htmlFor="messages-secret" className="mb-1.5 block text-sm font-medium text-slate-700">
          Passphrase
        </label>
        <input
          id="messages-secret"
          type="password"
          value={secret}
          onChange={e => setSecret(e.target.value)}
          autoFocus
          autoComplete="current-password"
          className="mb-4 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-ocean"
        />

        {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={busy || !secret.trim()}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-navy py-2.5 text-sm font-semibold text-white transition hover:bg-navy-700 disabled:opacity-50"
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          Open the inbox
        </button>
      </form>
    </div>
  )
}
