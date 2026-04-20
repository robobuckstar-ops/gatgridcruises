'use client'

import { useState } from 'react'
import Link from 'next/link'
import { staterooms } from '@/data/staterooms'
import { getShips } from '@/lib/data'
import { Plus, Edit2, Check, X } from 'lucide-react'

interface StateRoomFormState {
  id: string
  room_number: string
  ship_id: string
  category: string
  category_code: string
  deck: number
  position: string
  side: string
  noise_rating: number
  view_rating: number
  accessible: boolean
  max_occupancy: number
}

interface ToastState {
  show: boolean
  message: string
}

const CATEGORIES = ['Inside', 'Oceanview', 'Verandah', 'Concierge']
const POSITIONS = ['forward', 'mid', 'aft']
const SIDES = ['port', 'starboard', 'interior']

export default function StateRoomsCRUD() {
  const ships = getShips()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<StateRoomFormState | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [createForm, setCreateForm] = useState<Partial<StateRoomFormState>>({
    room_number: '',
    ship_id: ships[0]?.id || '',
    category: 'Inside',
    category_code: '',
    deck: 1,
    position: 'mid',
    side: 'interior',
    noise_rating: 3,
    view_rating: 3,
    accessible: false,
    max_occupancy: 4,
  })
  const [toast, setToast] = useState<ToastState>({ show: false, message: '' })

  const handleEditClick = (room: any) => {
    setEditingId(room.id)
    setEditForm({
      id: room.id,
      room_number: room.room_number,
      ship_id: room.ship_id,
      category: room.category,
      category_code: room.category_code,
      deck: room.deck,
      position: room.position,
      side: room.side,
      noise_rating: room.noise_rating,
      view_rating: room.view_rating,
      accessible: room.accessible,
      max_occupancy: room.max_occupancy,
    })
  }

  const handleEditSave = () => {
    if (!editForm) return
    showToast(`Stateroom "${editForm.room_number}" updated successfully`)
    setEditingId(null)
    setEditForm(null)
  }

  const handleEditCancel = () => {
    setEditingId(null)
    setEditForm(null)
  }

  const handleCreateSave = () => {
    if (!createForm.room_number || !createForm.ship_id) {
      showToast('Please fill in all required fields')
      return
    }
    showToast(`New stateroom "${createForm.room_number}" created successfully`)
    setShowCreateForm(false)
    setCreateForm({
      room_number: '',
      ship_id: ships[0]?.id || '',
      category: 'Inside',
      category_code: '',
      deck: 1,
      position: 'mid',
      side: 'interior',
      noise_rating: 3,
      view_rating: 3,
      accessible: false,
      max_occupancy: 4,
    })
  }

  const handleCreateCancel = () => {
    setShowCreateForm(false)
    setCreateForm({
      room_number: '',
      ship_id: ships[0]?.id || '',
      category: 'Inside',
      category_code: '',
      deck: 1,
      position: 'mid',
      side: 'interior',
      noise_rating: 3,
      view_rating: 3,
      accessible: false,
      max_occupancy: 4,
    })
  }

  const showToast = (message: string) => {
    setToast({ show: true, message })
    setTimeout(() => setToast({ show: false, message: '' }), 3000)
  }

  const getShipName = (shipId: string) => {
    return ships.find(s => s.id === shipId)?.name || 'Unknown'
  }

  const getRatingBars = (rating: number) => {
    return '█'.repeat(rating) + '░'.repeat(5 - rating)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-navy text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold">Manage Staterooms</h1>
              <p className="text-slate-400 text-sm">Manage ship staterooms and cabins</p>
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
              Create New Stateroom
            </button>
          )}
        </div>

        {/* Create form */}
        {showCreateForm && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
            <h3 className="font-semibold text-navy mb-4">Create New Stateroom</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Room Number *</label>
                <input
                  type="text"
                  value={createForm.room_number || ''}
                  onChange={(e) => setCreateForm({ ...createForm, room_number: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-slate-900"
                  placeholder="e.g., 2001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Ship *</label>
                <select
                  value={createForm.ship_id || ''}
                  onChange={(e) => setCreateForm({ ...createForm, ship_id: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-slate-900"
                >
                  <option value="">Select a ship</option>
                  {ships.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <select
                  value={createForm.category || 'Inside'}
                  onChange={(e) => setCreateForm({ ...createForm, category: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-slate-900"
                >
                  {CATEGORIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category Code</label>
                <input
                  type="text"
                  value={createForm.category_code || ''}
                  onChange={(e) => setCreateForm({ ...createForm, category_code: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-slate-900"
                  placeholder="e.g., 11A"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Deck</label>
                <input
                  type="number"
                  value={createForm.deck || 1}
                  onChange={(e) => setCreateForm({ ...createForm, deck: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-slate-900"
                  placeholder="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Position</label>
                <select
                  value={createForm.position || 'mid'}
                  onChange={(e) => setCreateForm({ ...createForm, position: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-slate-900"
                >
                  {POSITIONS.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Side</label>
                <select
                  value={createForm.side || 'interior'}
                  onChange={(e) => setCreateForm({ ...createForm, side: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-slate-900"
                >
                  {SIDES.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Noise Rating (1-5)</label>
                <input
                  type="number"
                  value={createForm.noise_rating || 3}
                  onChange={(e) => setCreateForm({ ...createForm, noise_rating: Math.min(5, Math.max(1, parseInt(e.target.value))) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-slate-900"
                  min="1"
                  max="5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">View Rating (1-5)</label>
                <input
                  type="number"
                  value={createForm.view_rating || 3}
                  onChange={(e) => setCreateForm({ ...createForm, view_rating: Math.min(5, Math.max(1, parseInt(e.target.value))) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-slate-900"
                  min="1"
                  max="5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Max Occupancy</label>
                <input
                  type="number"
                  value={createForm.max_occupancy || 4}
                  onChange={(e) => setCreateForm({ ...createForm, max_occupancy: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-slate-900"
                  placeholder="4"
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="create-accessible"
                  checked={createForm.accessible || false}
                  onChange={(e) => setCreateForm({ ...createForm, accessible: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300"
                />
                <label htmlFor="create-accessible" className="text-sm font-medium text-slate-700">
                  Accessible
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
                Create Stateroom
              </button>
            </div>
          </div>
        )}

        {/* Staterooms table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200">
            <h2 className="font-semibold text-navy">All Staterooms ({staterooms.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Room #</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Ship</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Category</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Deck</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Position</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Noise</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">View</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Access</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {staterooms.map(r => (
                  <tbody key={r.id}>
                    <tr className="hover:bg-slate-50">
                      <td className="px-5 py-3 font-mono font-bold text-navy">{r.room_number}</td>
                      <td className="px-5 py-3 text-slate-600 text-xs">{getShipName(r.ship_id)}</td>
                      <td className="px-5 py-3 text-slate-600">{r.category}</td>
                      <td className="px-5 py-3 text-slate-600">{r.deck}</td>
                      <td className="px-5 py-3 text-slate-600 capitalize">{r.position}</td>
                      <td className="px-5 py-3 text-xs font-mono">{getRatingBars(r.noise_rating)}</td>
                      <td className="px-5 py-3 text-xs font-mono">{getRatingBars(r.view_rating)}</td>
                      <td className="px-5 py-3">{r.accessible ? '♿' : '—'}</td>
                      <td className="px-5 py-3">
                        {editingId !== r.id && (
                          <button
                            onClick={() => handleEditClick(r)}
                            className="text-navy hover:text-blue-600 transition-colors flex items-center gap-1 font-medium text-xs"
                          >
                            <Edit2 className="h-4 w-4" />
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                    {editingId === r.id && editForm && (
                      <tr className="bg-blue-50">
                        <td colSpan={9} className="px-5 py-4">
                          <div className="space-y-3">
                            <h4 className="font-semibold text-navy mb-3">Edit Stateroom</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Room Number</label>
                                <input
                                  type="text"
                                  value={editForm.room_number}
                                  onChange={(e) => setEditForm({ ...editForm, room_number: e.target.value })}
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-sm text-slate-900"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Ship</label>
                                <select
                                  value={editForm.ship_id}
                                  onChange={(e) => setEditForm({ ...editForm, ship_id: e.target.value })}
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-sm text-slate-900"
                                >
                                  {ships.map(s => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Category</label>
                                <select
                                  value={editForm.category}
                                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-sm text-slate-900"
                                >
                                  {CATEGORIES.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Code</label>
                                <input
                                  type="text"
                                  value={editForm.category_code}
                                  onChange={(e) => setEditForm({ ...editForm, category_code: e.target.value })}
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-sm text-slate-900"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Deck</label>
                                <input
                                  type="number"
                                  value={editForm.deck}
                                  onChange={(e) => setEditForm({ ...editForm, deck: parseInt(e.target.value) })}
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-sm text-slate-900"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Position</label>
                                <select
                                  value={editForm.position}
                                  onChange={(e) => setEditForm({ ...editForm, position: e.target.value })}
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-sm text-slate-900"
                                >
                                  {POSITIONS.map(p => (
                                    <option key={p} value={p}>{p}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Side</label>
                                <select
                                  value={editForm.side}
                                  onChange={(e) => setEditForm({ ...editForm, side: e.target.value })}
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-sm text-slate-900"
                                >
                                  {SIDES.map(s => (
                                    <option key={s} value={s}>{s}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Noise (1-5)</label>
                                <input
                                  type="number"
                                  value={editForm.noise_rating}
                                  onChange={(e) => setEditForm({ ...editForm, noise_rating: Math.min(5, Math.max(1, parseInt(e.target.value))) })}
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-sm text-slate-900"
                                  min="1"
                                  max="5"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">View (1-5)</label>
                                <input
                                  type="number"
                                  value={editForm.view_rating}
                                  onChange={(e) => setEditForm({ ...editForm, view_rating: Math.min(5, Math.max(1, parseInt(e.target.value))) })}
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-sm text-slate-900"
                                  min="1"
                                  max="5"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Occupancy</label>
                                <input
                                  type="number"
                                  value={editForm.max_occupancy}
                                  onChange={(e) => setEditForm({ ...editForm, max_occupancy: parseInt(e.target.value) })}
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-sm text-slate-900"
                                />
                              </div>
                              <div className="flex items-center gap-2 pt-2">
                                <input
                                  type="checkbox"
                                  id={`accessible-${editForm.id}`}
                                  checked={editForm.accessible}
                                  onChange={(e) => setEditForm({ ...editForm, accessible: e.target.checked })}
                                  className="w-4 h-4 rounded border-slate-300"
                                />
                                <label htmlFor={`accessible-${editForm.id}`} className="text-xs font-medium text-slate-700">
                                  Accessible
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
