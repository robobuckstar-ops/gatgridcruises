'use client'

import { useState } from 'react'
import { Shield, Star, Phone, Gift } from 'lucide-react'
import Link from 'next/link'
import { OBC_TIERS } from '@/lib/obc'
import { OBCDisclaimer } from '@/components/ui/obc-disclaimer'

export default function BookPage() {
  const [submitted, setSubmitted] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const [formError, setFormError] = useState('')
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    startMonth: '',
    startYear: '',
    endMonth: '',
    endYear: '',
    adults: '2',
    children: '0',
    ship: 'any',
    stateroom: 'no-preference',
    cruiseLength: [] as string[],
    destination: 'any',
    budget: 'flexible',
    notes: '',
    referral: '',
  })

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 3 }, (_, i) => currentYear + i)
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleCheckbox = (value: string) => {
    setForm(prev => ({
      ...prev,
      cruiseLength: prev.cruiseLength.includes(value)
        ? prev.cruiseLength.filter(v => v !== value)
        : [...prev.cruiseLength, value],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')
    if (honeypot) return
    if (!form.fullName.trim()) { setFormError('Please enter your full name.'); return }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!form.email || !emailRegex.test(form.email)) { setFormError('Please enter a valid email address.'); return }
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-10 border border-slate-200">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="w-8 h-8 text-emerald-600" />
            </div>
            <h1 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">
              You&rsquo;re All Set!
            </h1>
            <p className="text-lg text-slate-600 mb-6">
              Thanks! A Disney cruise specialist will get back to you within 24 hours with personalized options.
            </p>
            <p className="text-sm text-slate-500">
              Keep an eye on your inbox — we&rsquo;ll send you a summary of your request along with our best cruise recommendations.
            </p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 md:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-fraunces text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Get Your Free Disney Cruise Quote
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Tell us about your dream cruise and a licensed Disney cruise specialist will send you personalized pricing and options within 24 hours.
          </p>
        </div>

        {/* Trust signals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <Shield className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-900 text-sm">Free, No-Obligation Quote</p>
              <p className="text-xs text-slate-500">Zero pressure, zero commitment</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <Star className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-900 text-sm">Licensed Travel Advisor</p>
              <p className="text-xs text-slate-500">Through Boardwalk Travel Agency</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <Phone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-900 text-sm">Our Service is 100% Free</p>
              <p className="text-xs text-slate-500">We earn a commission from the cruise line, not you</p>
            </div>
          </div>
        </div>

        {/* OBC Promo Banner */}
        <div className="rounded-2xl bg-[#1E3A5F] p-6 mb-2">
          <div className="flex items-center gap-3 mb-3">
            <Gift className="w-6 h-6 text-[#D4AF37] flex-shrink-0" aria-hidden="true" />
            <h2 className="font-fraunces text-xl font-bold text-white">Book Through GatGrid — Get Free Onboard Credit</h2>
          </div>
          <p className="text-blue-200 text-sm mb-5">
            The more you cruise, the more free spending money we add to your onboard account. This perk isn&rsquo;t available when booking directly with Disney.
          </p>

          {/* Tier Table */}
          <div className="rounded-xl overflow-hidden border border-white/10 mb-4">
            <div className="grid grid-cols-2 gap-2 px-4 py-2 bg-white/10">
              <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">Cruise Fare</span>
              <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest text-right">Free OBC*</span>
            </div>
            <div className="divide-y divide-white/10">
              {OBC_TIERS.map((tier, i) => (
                <div key={i} className="grid grid-cols-2 gap-2 px-4 py-2.5 items-center hover:bg-white/5 transition-colors">
                  <span className="text-blue-100 text-sm">{tier.label}</span>
                  <span className="font-fraunces font-bold text-white text-right">${tier.obc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <p className="text-blue-300 text-xs">Not sure what tier you'd be in?</p>
            <Link
              href="/tools/obc-calculator"
              className="inline-flex items-center gap-1.5 text-[#D4AF37] font-semibold text-sm hover:text-yellow-300 transition-colors flex-shrink-0"
            >
              <Gift className="w-4 h-4" aria-hidden="true" />
              Calculate My OBC →
            </Link>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10">
            <OBCDisclaimer />
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="bg-[#1E3A5F] px-8 py-6">
            <h2 className="text-white font-fraunces text-xl font-bold">Your Cruise Preferences</h2>
            <p className="text-blue-200 text-sm mt-1">The more detail you share, the better we can personalize your quote</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0 }} aria-hidden="true">
              <input type="text" name="website" value={honeypot} onChange={e => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
            </div>
            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700" role="alert">{formError}</div>
            )}

            {/* Contact Info */}
            <div>
              <h3 className="font-fraunces text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Phone Number <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(555) 555-5555"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Travel Dates */}
            <div>
              <h3 className="font-fraunces text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Preferred Travel Dates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Earliest Departure</label>
                  <div className="flex gap-2">
                    <select
                      name="startMonth"
                      value={form.startMonth}
                      onChange={handleChange}
                      className="flex-1 px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 text-sm"
                    >
                      <option value="">Month</option>
                      {months.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <select
                      name="startYear"
                      value={form.startYear}
                      onChange={handleChange}
                      className="w-24 px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 text-sm"
                    >
                      <option value="">Year</option>
                      {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Latest Departure</label>
                  <div className="flex gap-2">
                    <select
                      name="endMonth"
                      value={form.endMonth}
                      onChange={handleChange}
                      className="flex-1 px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 text-sm"
                    >
                      <option value="">Month</option>
                      {months.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <select
                      name="endYear"
                      value={form.endYear}
                      onChange={handleChange}
                      className="w-24 px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 text-sm"
                    >
                      <option value="">Year</option>
                      {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Party Size */}
            <div>
              <h3 className="font-fraunces text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Party Size</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="adults" className="block text-sm font-semibold text-slate-700 mb-1.5">Number of Adults</label>
                  <select
                    id="adults"
                    name="adults"
                    value={form.adults}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 text-sm"
                  >
                    {Array.from({ length: 8 }, (_, i) => i + 1).map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Adult' : 'Adults'}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="children" className="block text-sm font-semibold text-slate-700 mb-1.5">Number of Children</label>
                  <select
                    id="children"
                    name="children"
                    value={form.children}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 text-sm"
                  >
                    {Array.from({ length: 9 }, (_, i) => i).map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Child' : 'Children'}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Cruise Preferences */}
            <div>
              <h3 className="font-fraunces text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Cruise Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="ship" className="block text-sm font-semibold text-slate-700 mb-1.5">Preferred Ship</label>
                  <select
                    id="ship"
                    name="ship"
                    value={form.ship}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 text-sm"
                  >
                    <option value="any">Any Ship</option>
                    <option value="magic">Disney Magic</option>
                    <option value="wonder">Disney Wonder</option>
                    <option value="dream">Disney Dream</option>
                    <option value="fantasy">Disney Fantasy</option>
                    <option value="wish">Disney Wish</option>
                    <option value="treasure">Disney Treasure</option>
                    <option value="destiny">Disney Destiny</option>
                    <option value="adventure">Disney Adventure</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="stateroom" className="block text-sm font-semibold text-slate-700 mb-1.5">Preferred Stateroom</label>
                  <select
                    id="stateroom"
                    name="stateroom"
                    value={form.stateroom}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 text-sm"
                  >
                    <option value="no-preference">No Preference</option>
                    <option value="inside">Inside</option>
                    <option value="oceanview">Oceanview</option>
                    <option value="verandah">Verandah</option>
                    <option value="concierge">Concierge</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="destination" className="block text-sm font-semibold text-slate-700 mb-1.5">Preferred Destination</label>
                  <select
                    id="destination"
                    name="destination"
                    value={form.destination}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 text-sm"
                  >
                    <option value="any">Any Destination</option>
                    <option value="bahamas">Bahamas</option>
                    <option value="caribbean-east">Caribbean East</option>
                    <option value="caribbean-west">Caribbean West</option>
                    <option value="alaska">Alaska</option>
                    <option value="europe">Europe</option>
                    <option value="hawaii">Hawaii</option>
                    <option value="mexico">Mexico</option>
                    <option value="transatlantic">Transatlantic</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className="block text-sm font-semibold text-slate-700 mb-1.5">Budget Per Person</label>
                  <select
                    id="budget"
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 text-sm"
                  >
                    <option value="flexible">Flexible</option>
                    <option value="under-1000">Under $1,000</option>
                    <option value="1000-2000">$1,000 – $2,000</option>
                    <option value="2000-3000">$2,000 – $3,000</option>
                    <option value="3000-plus">$3,000+</option>
                  </select>
                </div>
              </div>

              {/* Cruise Length */}
              <div className="mt-4">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Cruise Length Preference</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: '3-4', label: '3–4 Nights' },
                    { value: '5', label: '5 Nights' },
                    { value: '7', label: '7 Nights' },
                    { value: '10plus', label: '10+ Nights' },
                    { value: 'flexible', label: 'Flexible' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleCheckbox(opt.value)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-colors ${
                        form.cruiseLength.includes(opt.value)
                          ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                          : 'bg-white text-slate-700 border-slate-300 hover:border-[#1E3A5F]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Notes + Referral */}
            <div>
              <h3 className="font-fraunces text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Additional Details</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="notes" className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Special Requests / Notes <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Anniversaries, accessibility needs, celebrating a birthday, specific ships you've already sailed..."
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 text-sm resize-none"
                  />
                </div>
                <div>
                  <label htmlFor="referral" className="block text-sm font-semibold text-slate-700 mb-1.5">How did you hear about us?</label>
                  <select
                    id="referral"
                    name="referral"
                    value={form.referral}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 text-sm"
                  >
                    <option value="">Select one</option>
                    <option value="google">Google</option>
                    <option value="social">Social Media</option>
                    <option value="friend">Friend / Family</option>
                    <option value="blog">Blog / Article</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 bg-[#1E3A5F] text-white font-bold text-lg rounded-xl hover:bg-[#162d4a] transition-colors duration-200 shadow-lg"
              >
                Get My Free Quote →
              </button>
              <div className="mt-4 text-center space-y-1">
                <p className="text-xs text-slate-500">
                  By submitting, you agree to be contacted by a Disney cruise specialist. No spam, ever.
                </p>
                <p className="text-xs text-slate-400">
                  Booking services provided through{' '}
                  <span className="font-semibold text-slate-500">Boardwalk Travel Agency</span>
                  {' '}— your licensed travel advisor
                </p>
              </div>
            </div>

          </form>
        </div>
      </div>
    </main>
  )
}
