'use client'

import { useState } from 'react'
import Link from 'next/link'
import { transfers } from '@/data/transfers'
import { getPorts } from '@/lib/data'
import { Plus, Edit2, Check, X } from 'lucide-react'

interface TransferFormState {
  id: string
  port_id: string
  type: string
  cost_estimate_min: number
  cost_estimate_max: number
  travel_time_minutes: number
  best_for: string
  editorial_take: string
}

interface ToastState {
  show: boolean
  message: string
}

const TRANSFER_TYPES = [
  { value: 'disney_ground', label: 'Disney Ground' },
  { value: 'uber', label: 'Uber' },
  { value: 'rental_car', label: 'Rental Car' },
  { value: 'personal_car', label: 'Personal Car' },
  { value: 'hotel_shuttle', label: 'Hotel Shuttle' },
  { value: 'taxi', label: 'Taxi' },
]

export default function TransfersCRUD() {
  const ports = getPorts()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<TransferFormState | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [createForm, setCreateForm] = useState<Partial<TransferFormState>>({
    port_id: ports[0]?.id || '',
    type: 'uber',
    cost_estimate_min: 0,
    cost_estimate_max: 0,
    travel_time_minutes: 0,
    best_for: '',
    editorial_take: '',
  })
  const [toast, setToast] = useState<ToastState>({ show: false, message: '' })

  const handleEditClick = (transfer: any) => {
    setEditingId(transfer.id)
    setEditForm({
      id: transfer.id,
      port_id: transfer.port_id,
      type: transfer.type,
      cost_estimate_min: transfer.cost_estimate_min,
      cost_estimate_max: transfer.cost_estimate_max,
      travel_time_minutes: transfer.travel_time_minutes,
      best_for: transfer.best_for,
      editorial_take: transfer.editorial_take,
    })
  }

  const handleEditSave = () => {
    if (!editForm) return
    const typeLabel = TRANSFER_TYPES.find(t => t.value === editForm.type)?.label || editForm.type
    showToast(`Transfer "${typeLabel}" updated successfully`)
    setEditingId(null)
    setEditForm(null)
  }

  const handleEditCancel = () => {
    setEditingId(null)
    setEditForm(null)
  }

  const handleCreateSave = () => {
    if (!createForm.port_id || !createForm.type) {
      showToast('Please fill in all required fields')
      return
    }
    const typeLabel = TRANSFER_TYPES.find(t => t.value === createForm.type)?.label || createForm.type
    showToast(`New transfer "${typeLabel}" created successfully`)
    setShowCreateForm(false)
    setCreateForm({
      port_id: ports[0]?.id || '',
      type: 'uber',
      cost_estimate_min: 0,
      cost_estimate_max: 0,
      travel_time_minutes: 0,
      best_for: '',
      editorial_take: '',
    })
  }

  const handleCreateCancel = () => {
    setShowCreateForm(false)
    setCreateForm({
      port_id: ports[0]?.id || '',
      type: 'uber',
      cost_estimate_min: 0,
      cost_estimate_max: 0,
      travel_time_minutes: 0,
      best_for: '',
      editorial_take: '',
    })
  }

  const showToast = (message: string) => {
    setToast({ show: true, message })
    setTimeout(() => setToast({ show: false, message: '' }), 3000)
  }

  const getPortName = (portId: string) => {
    return ports.find(p => p.id === portId)?.name || 'Unknown'
  }

  const getTypeLabel = (type: string) => {
    return TRANSFER_TYPES.find(t => t.value === type)?.label || type
  }

  const getCostRange = (min: number, max: number) => {
    if (min === 0 && max === 0) return 'Free'
    return `$${min}–$${max}`
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-navy text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold">Manage Transfers</h1>
              <p className="text-slate-400 text-sm">Manage airport and port transfer options</p>
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
              Create New Transfer
            </button>
          )}
        </div>

        {/* Create form */}
        {showCreateForm && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
            <h3 className="font-semibold text-navy mb-4">Create New Transfer</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Port *</label>
                <select
                  value={createForm.port_id || ''}
                  onChange={(e) => setCreateForm({ ...createForm, port_id: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-slate-900"
                >
                  <option value="">Select a port</option>
                  {ports.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Type *</label>
                <select
                  value={createForm.type || ''}
                  onChange={(e) => setCreateForm({ ...createForm, type: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-slate-900"
                >
                  {TRANSFER_TYPES.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Cost Min ($)</label>
                <input
                  type="number"
                  value={createForm.cost_estimate_min || 0}
                  onChange={(e) => setCreateForm({ ...createForm, cost_estimate_min: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-slate-900"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Cost Max ($)</label>
                <input
                  type="number"
                  value={createForm.cost_estimate_max || 0}
                  onChange={(e) => setCreateForm({ ...createForm, cost_estimate_max: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-slate-900"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Travel Time (minutes)</label>
                <input
                  type="number"
                  value={createForm.travel_time_minutes || 0}
                  onChange={(e) => setCreateForm({ ...createForm, travel_time_minutes: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-slate-900"
                  placeholder="45"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">Best For</label>
              <input
                type="text"
                value={createForm.best_for || ''}
                onChange={(e) => setCreateForm({ ...createForm, best_for: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-slate-900"
                placeholder="Describe who this is best for..."
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">Editorial Take</label>
              <textarea
                value={createForm.editorial_take || ''}
                onChange={(e) => setCreateForm({ ...createForm, editorial_take: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-slate-900"
                rows={4}
                placeholder="Share your perspective on this transfer option..."
              />
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
                Create Transfer
              </button>
            </div>
          </div>
        )}

        {/* Transfers table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200">
            <h2 className="font-semibold text-navy">All Transfers ({transfers.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Port</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Type</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Cost Range</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Travel Time</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Best For</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transfers.map(t => (
                  <tbody key={t.id}>
                    <tr className="hover:bg-slate-50">
                      <td className="px-5 py-3 font-medium text-navy">{getPortName(t.port_id)}</td>
                      <td className="px-5 py-3 text-slate-600">{getTypeLabel(t.type)}</td>
                      <td className="px-5 py-3 text-slate-600">{getCostRange(t.cost_estimate_min, t.cost_estimate_max)}</td>
                      <td className="px-5 py-3 text-slate-600">{t.travel_time_minutes}m</td>
                      <td className="px-5 py-3 text-slate-600 text-xs">{t.best_for}</td>
                      <td className="px-5 py-3">
                        {editingId !== t.id && (
                          <button
                            onClick={() => handleEditClick(t)}
                            className="text-navy hover:text-blue-600 transition-colors flex items-center gap-1 font-medium text-xs"
                          >
                            <Edit2 className="h-4 w-4" />
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                    {editingId === t.id && editForm && (
                      <tr className="bg-[#1E3A5F]/10">
                        <td colSpan={6} className="px-5 py-4">
                          <div className="space-y-3">
                            <h4 className="font-semibold text-navy mb-3">Edit Transfer</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Port</label>
                                <select
                                  value={editForm.port_id}
                                  onChange={(e) => setEditForm({ ...editForm, port_id: e.target.value })}
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-sm text-slate-900"
                                >
                                  {ports.map(p => (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Type</label>
                                <select
                                  value={editForm.type}
                                  onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-sm text-slate-900"
                                >
                                  {TRANSFER_TYPES.map(t => (
                                    <option key={t.value} value={t.value}>{t.label}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Cost Min ($)</label>
                                <input
                                  type="number"
                                  value={editForm.cost_estimate_min}
                                  onChange={(e) => setEditForm({ ...editForm, cost_estimate_min: parseInt(e.target.value) })}
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-sm text-slate-900"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Cost Max ($)</label>
                                <input
                                  type="number"
                                  value={editForm.cost_estimate_max}
                                  onChange={(e) => setEditForm({ ...editForm, cost_estimate_max: parseInt(e.target.value) })}
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-sm text-slate-900"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Travel Time (minutes)</label>
                                <input
                                  type="number"
                                  value={editForm.travel_time_minutes}
                                  onChange={(e) => setEditForm({ ...editForm, travel_time_minutes: parseInt(e.target.value) })}
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-sm text-slate-900"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Best For</label>
                                <input
                                  type="text"
                                  value={editForm.best_for}
                                  onChange={(e) => setEditForm({ ...editForm, best_for: e.target.value })}
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-sm text-slate-900"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-slate-700 mb-1">Editorial Take</label>
                              <textarea
                                value={editForm.editorial_take}
                                onChange={(e) => setEditForm({ ...editForm, editorial_take: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-sm text-slate-900"
                                rows={3}
                              />
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
