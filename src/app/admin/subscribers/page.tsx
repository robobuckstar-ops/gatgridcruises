'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Download } from 'lucide-react'

interface ToastState {
  show: boolean
  message: string
}

export default function SubscribersCRUD() {
  const [toast, setToast] = useState<ToastState>({ show: false, message: '' })

  // Stub data - no subscribers yet
  const subscribers: any[] = []
  const confirmedCount = 0
  const totalCount = 0

  const showToast = (message: string) => {
    setToast({ show: true, message })
    setTimeout(() => setToast({ show: false, message: '' }), 3000)
  }

  const handleExportCSV = () => {
    showToast('CSV export feature coming soon')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-navy text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold">Manage Subscribers</h1>
              <p className="text-slate-400 text-sm">View and manage your email subscribers</p>
            </div>
            <Link href="/admin" className="text-sm text-slate-300 hover:text-white">← Back to dashboard</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl font-bold text-navy">{totalCount}</span>
            </div>
            <p className="text-sm text-slate-500">Total Subscribers</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl font-bold text-emerald-600">{confirmedCount}</span>
            </div>
            <p className="text-sm text-slate-500">Confirmed</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl font-bold text-slate-400">{totalCount - confirmedCount}</span>
            </div>
            <p className="text-sm text-slate-500">Pending Confirmation</p>
          </div>
        </div>

        {/* Empty state */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="font-semibold text-navy">All Subscribers</h2>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>
          <div className="px-5 py-12 text-center">
            <div className="mb-4">
              <div className="mx-auto w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-2xl">📧</span>
              </div>
            </div>
            <h3 className="font-semibold text-navy mb-2">No subscribers yet</h3>
            <p className="text-slate-500 text-sm mb-4">
              Share your subscribe page to start building your list
            </p>
            <a
              href="/subscribe"
              className="inline-flex items-center gap-2 px-4 py-2 bg-navy text-white rounded-lg hover:bg-blue-900 transition-colors font-medium text-sm"
            >
              View Subscribe Page
            </a>
          </div>
        </div>

        {/* Subscribers table (hidden when empty) */}
        {subscribers.length > 0 && (
          <div className="mt-8 bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left px-5 py-3 text-slate-500 font-medium">Email</th>
                    <th className="text-left px-5 py-3 text-slate-500 font-medium">Confirmed</th>
                    <th className="text-left px-5 py-3 text-slate-500 font-medium">Preferences</th>
                    <th className="text-left px-5 py-3 text-slate-500 font-medium">Signed Up</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {subscribers.map(s => (
                    <tr key={s.id} className="hover:bg-slate-50">
                      <td className="px-5 py-3 font-medium text-navy">{s.email}</td>
                      <td className="px-5 py-3">{s.confirmed ? '✓' : '—'}</td>
                      <td className="px-5 py-3 text-xs text-slate-600">
                        {s.preferences ? JSON.stringify(s.preferences) : '{}'}
                      </td>
                      <td className="px-5 py-3 text-slate-600 text-sm">
                        {new Date(s.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Toast notification */}
      {toast.show && (
        <div className="fixed bottom-4 right-4 bg-emerald-600 text-white px-4 py-3 rounded-lg shadow-lg text-sm font-medium">
          {toast.message}
        </div>
      )}
    </div>
  )
}
