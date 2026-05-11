'use client'

import { useState } from 'react'
import { Download, Loader2, CheckCircle2 } from 'lucide-react'

const PDF_URL = '/downloads/disney-cruise-insiders-guide.pdf'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function LeadMagnetForm() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('submitting')
    setErrorMsg(null)

    try {
      const res = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          _honeypot: honeypot,
          source: 'insiders-guide-landing',
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || `Request failed (${res.status})`)
      }

      setState('success')
      // Trigger download in a new tab so the success state stays visible.
      window.open(PDF_URL, '_blank', 'noopener')
    } catch (err) {
      setState('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  if (state === 'success') {
    return (
      <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-5">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
          <div>
            <p className="font-semibold text-emerald-900 mb-1">Your guide is on the way.</p>
            <p className="text-sm text-emerald-800 mb-3">
              Check your inbox in a minute or two. If the download didn’t open automatically:
            </p>
            <a
              href={PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1E3A5F] text-white text-sm font-semibold hover:bg-[#0a1628] transition"
            >
              <Download className="w-4 h-4" />
              Download the PDF
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      {/* Honeypot — bots fill this, humans don't see it */}
      <input
        type="text"
        name="company"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] opacity-0 pointer-events-none"
        aria-hidden="true"
      />

      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5 block">
          First name
        </span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jamie"
          className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F]/20 focus:outline-none text-slate-900 placeholder:text-slate-400"
          maxLength={80}
          required
        />
      </label>

      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5 block">
          Email address
        </span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F]/20 focus:outline-none text-slate-900 placeholder:text-slate-400"
          maxLength={200}
          required
        />
      </label>

      <button
        type="submit"
        disabled={state === 'submitting'}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#D4AF37] text-[#1E3A5F] font-bold hover:bg-amber-400 disabled:opacity-60 transition"
      >
        {state === 'submitting' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            Send Me the Guide
          </>
        )}
      </button>

      {state === 'error' && (
        <p className="text-sm text-red-600">
          {errorMsg ?? 'We couldn’t send the guide. Try again, or email bookings@gatgridcruises.com.'}
        </p>
      )}
    </form>
  )
}
