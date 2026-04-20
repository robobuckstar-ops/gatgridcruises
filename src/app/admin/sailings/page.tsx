'use client'

import { useState } from 'react'
import Link from 'next/link'
import { getSailings, getShips, getPorts } from '@/lib/data'
import { formatPrice, formatDate } from '@/lib/utils'
import { Plus, Edit2, Check, X } from 'lucide-react'

interface SailingFormState {
  id: string
  itinerary_name: string
  sail_date: string
  current_lowest_price: number
  sailing_score: number
  is_featured: boolean
}

interface ToastState {
  show: boolean
  message: string
}

export default function SailingsCRUD() {
  const sailings = getSailings()
  const ships = getShips()

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<SailingFormState | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [createForm, setCreateForm] = useState<Partial<SailingFormState>>({
    itinerary_name: '',
    sail_date: '',
    current_lowest_price: 0,
    sailing_score: 0,
    is_featured: false,
  })
  const [toast, setToast] = useState<ToastState>({ show: false, message: '' })

  const handleEditClick = (sailing: any) => {
    setEditingId(sailing.id)
    setEditForm({
      id: sailing.id,
      itinerary_name: sailing.itinerary_name,
      sail_date: sailing.sail_date,
      current_lowest_price: sailing.current_lowest_price,
      sailing_score: sailing.sailing_score,
      is_featured: sailing.is_featured,
    })
  }

  const handleEditSave = () => {
    if (!editForm) return
    showToast(`Sailing "${editForm.itinerary_name}" updated successfully`)
    setEditingId(null)
    setEditForm(null)
  }

  const handleEditCancel = () => {
    setEditingId(null)
    setEditForm(null)
  }

  const handleCreateSave = () => {
    if (!createForm.itinerary_name || !createForm.sail_date) {
      showToast('Please fill in all required fields')
      return
    }
    showToast(`New sailing "${createForm.itinerary_name}" created successfully`)
    setShowCreateForm(false)
    setCreateForm({
      itinerary_name: '',
      sail_date: '',
      current_lowest_price: 0,
      sailing_score: 0,
      is_featured: false,
    })
  }

  const handleCreateCancel = () => {
    setShowCreateForm(false)
    setCreateForm({
      itinerary_name: '',
      sail_date: '',
      current_lowest_price: 0,
      sailing_score: 0,
      is_featured: false,
    })
  }

  const showToast = (message: string) => {
    setToast({ show: true, message })
    setTimeout(() => setToast({ show: false, message: '' }), 3000)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-navy text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold">Manage Sailings</h1>
              <p className="text-slate-400 text-sm">Create, edit, and manage cruise sailings</p>
            </div>
            <Link href="/admin" className="text-sm text-slate-300 hover:text-white">← Back to dashboard</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create button */}
        <div className="mb-8">
          {!showCreateForm && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-navy text-white rounded-lg hover:bg-blue-900 transition-colors font-medium"
            >
              <Plus className="h-4 w-4" />
              Create New Sailing
            </button>
          )}
        </div>

        {/* Create form */}
        {showCreateForm && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
            <h3 className="font-semibold text-navy mb-4">Create New Sailing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Itinerary Name *</label>
                <input
                  type="text"
                  value={createForm.itinerary_name || ''}
                  onChange={(e) => setCreateForm({ ...createForm, itinerary_name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-slate-900"
                  placeholder="e.g., Caribbean 7-Day"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Sail Date *</label>
                <input
                  type="date"
                  value={createForm.sail_date || ''}
                  onChange={(e) => setCreateForm({ ...createForm, sail_date: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-slate-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Starting Price</label>
                <input
                  type="number"
                  value={createForm.current_lowest_price || 0}
                  onChange={(e) => setCreateForm({ ...createForm, current_lowest_price: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-slate-900"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Sailing Score</label>
                <input
                  type="number"
                  value={createForm.sailing_score || 0}
                  onChange={(e) => setCreateForm({ ...createForm, sailing_score: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-slate-900"
                  placeholder="0"
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="create-featured"
                  checked={createForm.is_featured || false}
                  onChange={(e) => setCreateForm({ ...createForm, is_featured: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300"
                />
                <label htmlFor="create-featured" className="text-sm font-medium text-slate-700">
                  Featured Deal
                </label>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={handleCreateCancel}
                className="px-4 py-2 text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateSave}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
              >
                Create Sailing
              </button>
            </div>
          </div>
        )}

        {/* Sailings table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200">
            <h2 className="font-semibold text-navy">All Sailings ({sailings.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Sailing</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Ship</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Date</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Price</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Score</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Featured</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sailings.map(s => (
                  <tbody key={s.id}>
                    <tr className="hover:bg-slate-50">
                      <td className="px-5 py-3 font-medium text-navy">{s.itinerary_name}</td>
                      <td className="px-5 py-3 text-slate-600">{s.ship?.name}</td>
                      <td className="px-5 py-3 text-slate-600">{formatDate(s.sail_date)}</td>
                      <td className="px-5 py-3 font-medium">{formatPrice(s.current_lowest_price)}</td>
                      <td className="px-5 py-3">{s.sailing_score}</td>
                      <td className="px-5 py-3">{s.is_featured ? '⭐' : '—'}</td>
                      <td className="px-5 py-3">
                        {editingId !== s.id && (
                          <button
                            onClick={() => handleEditClick(s)}
                            className="text-navy hover:text-blue-600 transition-colors flex items-center gap-1 font-medium text-xs"
                          >
                            <Edit2 className="h-4 w-4" />
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                    {editingId === s.id && editForm && (
                      <tr className="bg-blue-50">
                        <td colSpan={7} className="px-5 py-4">
                          <div className="space-y-3">
                            <h4 className="font-semibold text-navy mb-3">Edit Sailing</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Itinerary Name</label>
                                <input
                                  type="text"
                                  value={editForm.itinerary_name}
                                  onChange={(e) => setEditForm({ ...editForm, itinerary_name: e.target.value })}
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-sm text-slate-900"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Sail Date</label>
                                <input
                                  type="date"
                                  value={editForm.sail_date}
                                  onChange={(e) => setEditForm({ ...editForm, sail_date: e.target.value })}
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-sm text-slate-900"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Starting Price</label>
                                <input
                                  type="number"
                                  value={editForm.current_lowest_price}
                                  onChange={(e) => setEditForm({ ...editForm, current_lowest_price: parseFloat(e.target.value) })}
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-sm text-slate-900"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Sailing Score</label>
                                <input
                                  type="number"
                                  value={editForm.sailing_score}
                                  onChange={(e) => setEditForm({ ...editForm, sailing_score: parseFloat(e.target.value) })}
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-sm text-slate-900"
                                />
                              </div>
                              <div className="flex items-center gap-2 pt-2">
                                <input
                                  type="checkbox"
                                  id={`featured-${editForm.id}`}
                                  checked={editForm.is_featured}
                                  onChange={(e) => setEditForm({ ...editForm, is_featured: e.target.checked })}
                                  className="w-4 h-4 rounded border-slate-300"
                                />
                                <label htmlFor={`featured-${editForm.id}`} className="text-xs font-medium text-slate-700">
                                  Featured Deal
                                </label>
                              </div>
                            </div>
                            <div className="flex gap-2 justify-end pt-2">
                              <button
                                onClick={handleEditCancel}
                                className="flex items-center gap-1 px-3 py-2 text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors text-xs font-medium"
                              >
                                <X className="h-4 w-4" />
                                Cancel
                              </button>
                              <button
                                onClick={handleEditSave}
                                className="flex items-center gap-1 px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-xs font-medium"
                              >
                                <Check className="h-4 w-4" />
                                Save Changes
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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
