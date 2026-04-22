'use client'

import { useState } from 'react'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

interface ReportIssueFormProps {
  page?: string
}

export function ReportIssueForm({ page }: ReportIssueFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    description: '',
    page: page || (typeof window !== 'undefined' ? window.location.pathname : ''),
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    console.log('[Report Issue]', form)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-emerald-800">
        <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-semibold">Thanks for the heads-up!</p>
          <p className="text-sm text-emerald-700 mt-0.5">
            We review all reports and fix issues as quickly as possible.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="border border-slate-200 rounded-xl p-5 bg-slate-50">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="w-5 h-5 text-slate-500 flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-slate-800 text-sm">See a wrong price or broken link?</h3>
          <p className="text-xs text-slate-500">Let us know — we fix it fast.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="ri-name" className="block text-xs font-medium text-slate-600 mb-1">
              Name <span className="text-slate-400">(optional)</span>
            </label>
            <input
              id="ri-name"
              type="text"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Your name"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="ri-email" className="block text-xs font-medium text-slate-600 mb-1">
              Email <span className="text-slate-400">(optional)</span>
            </label>
            <input
              id="ri-email"
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="you@example.com"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="ri-description" className="block text-xs font-medium text-slate-600 mb-1">
            What did you find? <span className="text-red-400">*</span>
          </label>
          <textarea
            id="ri-description"
            required
            rows={3}
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            placeholder="e.g. The price shown is $500 higher than Disney's site shows right now."
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 resize-none"
          />
        </div>

        <div>
          <label htmlFor="ri-page" className="block text-xs font-medium text-slate-600 mb-1">
            Which page / deal?
          </label>
          <input
            id="ri-page"
            type="text"
            value={form.page}
            onChange={e => setForm(f => ({ ...f, page: e.target.value }))}
            placeholder="e.g. /sailing/4-night-bahamian-123"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit Report
        </button>
      </form>
    </div>
  )
}
