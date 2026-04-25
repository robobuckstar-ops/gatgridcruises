'use client'

import { useState } from 'react'
import Link from 'next/link'
import { hotels } from '@/data/hotels'
import { getPorts } from '@/lib/data'
import { Plus, Edit2, Check, X } from 'lucide-react'

interface HotelFormState {
  id: string
  name: string
  port_id: string
  is_disney_partner: boolean
  price_range: string
  distance_to_port_miles: number
  shuttle_available: boolean
  editorial_take: string
  booking_affiliate_url: string
}

interface ToastState {
  show: boolean
  message: string
}

export default function HotelsCRUD() {
  const ports = getPorts()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<HotelFormState | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [createForm, setCreateForm] = useState<Partial<HotelFormState>>({
    name: '',
    port_id: ports[0]?.id || '',
    is_disney_partner: false,
    price_range: '',
    distance_to_port_miles: 0,
    shuttle_available: false,
    editorial_take: '',
    booking_affiliate_url: '',
  })
  const [toast, setToast] = useState<ToastState>({ show: false, message: '' })

  const handleEditClick = (hotel: any) => {
    setEditingId(hotel.id)
    setEditForm({
      id: hotel.id,
      name: hotel.name,
      port_id: hotel.port_id,
      is_disney_partner: hotel.is_disney_partner,
      price_range: hotel.price_range,
      distance_to_port_miles: hotel.distance_to_port_miles,
      shuttle_available: hotel.shuttle_available,
      editorial_take: hotel.editorial_take,
      booking_affiliate_url: hotel.booking_affiliate_url,
    })
  }

  const handleEditSave = () => {
    if (!editForm) return
    showToast(`Hotel "${editForm.name}" updated successfully`)
    setEditingId(null)
    setEditForm(null)
  }

  const handleEditCancel = () => {
    setEditingId(null)
    setEditForm(null)
  }

  const handleCreateSave = () => {
    if (!createForm.name || !createForm.port_id) {
      showToast('Please fill in all required fields')
      return
    }
    showToast(`New hotel "${createForm.name}" created successfully`)
    setShowCreateForm(false)
    setCreateForm({
      name: '',
      port_id: ports[0]?.id || '',
      is_disney_partner: false,
      price_range: '',
      distance_to_port_miles: 0,
      shuttle_available: false,
      editorial_take: '',
      booking_affiliate_url: '',
    })
  }

  const handleCreateCancel = () => {
    setShowCreateForm(false)
    setCreateForm({
      name: '',
      port_id: ports[0]?.id || '',
      is_disney_partner: false,
      price_range: '',
      distance_to_port_miles: 0,
      shuttle_available: false,
      editorial_take: '',
      booking_affiliate_url: '',
    })
  }

  const showToast = (message: string) => {
    setToast({ show: true, message })
    setTimeout(() => setToast({ show: false, message: '' }), 3000)
  }

  const getPortName = (portId: string) => {
    return ports.find(p => p.id === portId)?.name || 'Unknown'
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-navy text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold">Manage Hotels</h1>
              <p className="text-slate-400 text-sm">Manage pre-cruise hotel options</p>
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
              Create New Hotel
            </button>
          )}
        </div>

        {/* Create form */}
        {showCreateForm && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
            <h3 className="font-semibold text-navy mb-4">Create New Hotel</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
                <input
                  type="text"
                  value={createForm.name || ''}
                  onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-slate-900"
                  placeholder="e.g., Hyatt Place Cape Canaveral"
                />
              </div>
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
                <label className="block text-sm font-medium text-slate-700 mb-1">Price Range</label>
                <input
                  type="text"
                  value={createForm.price_range || ''}
                  onChange={(e) => setCreateForm({ ...createForm, price_range: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-slate-900"
                  placeholder="e.g., $140–$220"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Distance to Port (miles)</label>
                <input
                  type="number"
                  value={createForm.distance_to_port_miles || 0}
                  onChange={(e) => setCreateForm({ ...createForm, distance_to_port_miles: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-slate-900"
                  placeholder="2.5"
                  step="0.1"
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="create-disney"
                  checked={createForm.is_disney_partner || false}
                  onChange={(e) => setCreateForm({ ...createForm, is_disney_partner: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300"
                />
                <label htmlFor="create-disney" className="text-sm font-medium text-slate-700">
                  Disney Partner?
                </label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="create-shuttle"
                  checked={createForm.shuttle_available || false}
                  onChange={(e) => setCreateForm({ ...createForm, shuttle_available: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300"
                />
                <label htmlFor="create-shuttle" className="text-sm font-medium text-slate-700">
                  Shuttle Available?
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">Booking Affiliate URL</label>
              <input
                type="text"
                value={createForm.booking_affiliate_url || ''}
                onChange={(e) => setCreateForm({ ...createForm, booking_affiliate_url: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-slate-900"
                placeholder="/go/booking/hyatt-place-cape-canaveral"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">Editorial Take</label>
              <textarea
                value={createForm.editorial_take || ''}
                onChange={(e) => setCreateForm({ ...createForm, editorial_take: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-slate-900"
                rows={4}
                placeholder="Share your perspective on this hotel..."
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
                Create Hotel
              </button>
            </div>
          </div>
        )}

        {/* Hotels table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200">
            <h2 className="font-semibold text-navy">All Hotels ({hotels.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Name</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Port</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Disney?</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Price Range</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Distance</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {hotels.map(h => (
                  <tbody key={h.id}>
                    <tr className="hover:bg-slate-50">
                      <td className="px-5 py-3 font-medium text-navy">{h.name}</td>
                      <td className="px-5 py-3 text-slate-600">{getPortName(h.port_id)}</td>
                      <td className="px-5 py-3">{h.is_disney_partner ? '✓' : '—'}</td>
                      <td className="px-5 py-3 text-slate-600">{h.price_range}</td>
                      <td className="px-5 py-3 text-slate-600">{h.distance_to_port_miles}mi</td>
                      <td className="px-5 py-3">
                        {editingId !== h.id && (
                          <button
                            onClick={() => handleEditClick(h)}
                            className="text-navy hover:text-blue-600 transition-colors flex items-center gap-1 font-medium text-xs"
                          >
                            <Edit2 className="h-4 w-4" />
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                    {editingId === h.id && editForm && (
                      <tr className="bg-[#1E3A5F]/10">
                        <td colSpan={6} className="px-5 py-4">
                          <div className="space-y-3">
                            <h4 className="font-semibold text-navy mb-3">Edit Hotel</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Name</label>
                                <input
                                  type="text"
                                  value={editForm.name}
                                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-sm text-slate-900"
                                />
                              </div>
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
                                <label className="block text-xs font-medium text-slate-700 mb-1">Price Range</label>
                                <input
                                  type="text"
                                  value={editForm.price_range}
                                  onChange={(e) => setEditForm({ ...editForm, price_range: e.target.value })}
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-sm text-slate-900"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Distance (miles)</label>
                                <input
                                  type="number"
                                  value={editForm.distance_to_port_miles}
                                  onChange={(e) => setEditForm({ ...editForm, distance_to_port_miles: parseFloat(e.target.value) })}
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-sm text-slate-900"
                                  step="0.1"
                                />
                              </div>
                              <div className="flex items-center gap-2 pt-2">
                                <input
                                  type="checkbox"
                                  id={`disney-${editForm.id}`}
                                  checked={editForm.is_disney_partner}
                                  onChange={(e) => setEditForm({ ...editForm, is_disney_partner: e.target.checked })}
                                  className="w-4 h-4 rounded border-slate-300"
                                />
                                <label htmlFor={`disney-${editForm.id}`} className="text-xs font-medium text-slate-700">
                                  Disney Partner
                                </label>
                              </div>
                              <div className="flex items-center gap-2 pt-2">
                                <input
                                  type="checkbox"
                                  id={`shuttle-${editForm.id}`}
                                  checked={editForm.shuttle_available}
                                  onChange={(e) => setEditForm({ ...editForm, shuttle_available: e.target.checked })}
                                  className="w-4 h-4 rounded border-slate-300"
                                />
                                <label htmlFor={`shuttle-${editForm.id}`} className="text-xs font-medium text-slate-700">
                                  Shuttle Available
                                </label>
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-slate-700 mb-1">Booking Affiliate URL</label>
                              <input
                                type="text"
                                value={editForm.booking_affiliate_url}
                                onChange={(e) => setEditForm({ ...editForm, booking_affiliate_url: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-sm text-slate-900"
                              />
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
