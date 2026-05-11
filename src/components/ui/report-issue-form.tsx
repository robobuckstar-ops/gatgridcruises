'use client'

import { useState } from 'react'
import { Flag } from 'lucide-react'

export function ReportIssueForm() {
  const [open, setOpen] = useState(false)
  const [pageUrl, setPageUrl] = useState('')
  const [description, setDescription] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production this would POST to an API route
    setSubmitted(true)
    setTimeout(() => {
      setOpen(false)
      setSubmitted(false)
      setPageUrl('')
      setDescription('')
      setEmail('')
    }, 2500)
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
      >
        <Flag className="h-4 w-4" />
        Report an Issue
      </button>

      {open && (
        <div className="mt-4 p-5 bg-white border border-slate-200 rounded-xl shadow-md max-w-md">
          <h3 className="font-semibold text-slate-900 mb-4">Report an Issue</h3>

          {submitted ? (
            <p className="text-emerald-700 font-medium text-sm">
              Thanks for your report — we&apos;ll look into it!
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="report-page-url" className="block text-xs font-medium text-slate-600 mb-1">
                  Page URL
                </label>
                <input
                  id="report-page-url"
                  type="text"
                  value={pageUrl}
                  onChange={e => setPageUrl(e.target.value)}
                  placeholder="https://gatgridcruises.com/..."
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="report-description" className="block text-xs font-medium text-slate-600 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="report-description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="What's wrong or inaccurate?"
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="report-email" className="block text-xs font-medium text-slate-600 mb-1">
                  Email <span className="text-slate-400">(optional)</span>
                </label>
                <input
                  id="report-email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1E3A5F] text-white text-sm font-semibold rounded-lg hover:bg-[#162d4a] transition-colors"
                >
                  Submit Report
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  )
}
