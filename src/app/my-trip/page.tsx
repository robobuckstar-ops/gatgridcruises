'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Hash, User, Mail, ArrowRight, Lock, Star } from 'lucide-react'

export default function MyTripPage() {
  const router = useRouter()
  const [form, setForm] = useState({ bookingNumber: '', lastName: '', email: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function setField(field: keyof typeof form, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
    if (error) setError('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/portal/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Login failed. Please try again.')
        return
      }

      router.push('/my-trip/dashboard')
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const isValid = form.bookingNumber && form.lastName && form.email

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-[#0a1628] to-[#1E3A5F] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Brand lockup */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
            <span className="text-3xl">⚓</span>
          </div>
          <h1 className="text-white text-2xl font-bold font-display">My Trip Dashboard</h1>
          <p className="text-blue-200 mt-1.5 text-sm">Your personal cruise concierge portal</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="px-6 pt-6 pb-5">
            <div className="flex items-center gap-3 mb-5 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="w-9 h-9 rounded-full bg-navy/10 flex items-center justify-center flex-shrink-0">
                <Lock className="w-4 h-4 text-navy" />
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">Secure Client Portal</p>
                <p className="text-slate-500 text-xs mt-0.5">Enter your booking details to access your dashboard</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="bookingNumber" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Booking number
                </label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="bookingNumber"
                    type="text"
                    value={form.bookingNumber}
                    onChange={(e) => setField('bookingNumber', e.target.value)}
                    placeholder="#12345"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Last name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="lastName"
                    type="text"
                    value={form.lastName}
                    onChange={(e) => setField('lastName', e.target.value)}
                    placeholder="Smith"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setField('email', e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy text-sm transition-all"
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || !isValid}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#D4AF37] text-[#0a1628] font-bold rounded-xl hover:bg-yellow-400 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Verifying…
                  </>
                ) : (
                  <>
                    Access My Dashboard
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-xs text-slate-400 mt-5">
              Only works for clients with an active booking.{' '}
              <Link href="/book" className="text-navy font-medium hover:underline">
                Get a free quote →
              </Link>
            </p>
          </div>

          {/* Feature highlights */}
          <div className="bg-slate-50 border-t border-slate-100 px-6 py-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Your dashboard includes</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                'Live countdown to your cruise',
                'Timezone-smart booking alerts',
                'Prep checklist & reminders',
                'All documents in one place',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-1.5">
                  <Star className="w-3 h-3 text-[#D4AF37] flex-shrink-0" fill="currentColor" />
                  <span className="text-xs text-slate-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Demo preview link */}
        <div className="text-center mt-6">
          <Link
            href="/my-trip/dashboard"
            className="inline-flex items-center gap-1.5 text-blue-200 text-sm hover:text-white transition-colors"
          >
            <span>Preview the dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
