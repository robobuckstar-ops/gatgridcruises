'use client'

import { useState } from 'react'
import Link from 'next/link'
import { getShips } from '@/lib/data'
import { Plus, Edit2, Check, X } from 'lucide-react'

interface ShipFormState {
  id: string
  name: string
  slug: string
  year_launched: number
  capacity: number
  tonnage: number
  editorial_take: string
}

interface ToastState {
  show: boolean
  message: string
}

export default function ShipsCRUD() {
  const ships = getShips()

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<ShipFormState | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [createForm, setCreateForm] = useState<Partial<ShipFormState>>({
    name: '',
    slug: '',
    year_launched: new Date().getFullYear(),
    capacity: 0,
    tonnage: 0,
    editorial_take: '',
  })
  const [toast, setToast] = useState<ToastState>({ show: false, message: '' })

  const handleEditClick = (ship: any) => {
    setEditingId(ship.id)
    setEditForm({
      id: ship.id,
      name: ship.name,
      slug: ship.slug,
      year_launched: ship.year_launched,
      capacity: ship.capacity,
      tonnage: ship.tonnage,
      editorial_take: ship.editorial_take,
    })
  }

  const handleEditSave = () => {
    if (!editForm) return
    showToast(`Ship "${editForm.name}" updated successfully`)
    setEditingId(null)
    setEditForm(null)
  }

  const handleEditCancel = () => {
    setEditingId(null)
    setEditForm(null)
  }

  const handleCreateSave = () => {
    if (!createForm.name || !createForm.slug) {
      showToast('Please fill in all required fields')
      return
    }
    showToast(`New ship "${createForm.name}" created successfully`)
    setShowCreateForm(false)
    setCreateForm({
      name: '',
      slug: '',
      year_launched: new Date().getFullYear(),
      capacity: 0,
      tonnage: 0,
      editorial_take: '',
    })
  }

  const handleCreateCancel = () => {
    setShowCreateForm(false)
    setCreateForm({
      name: '',
      slug: '',
      year_launched: new Date().getFullYear(),
      capacity: 0,
      tonnage: 0,
      editorial_take: '',
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
              <h1 className="font-display text-2xl font-bold">Manage Ships</h1>
              <p className="text-slate-400 text-sm">Create, edit, and manage cruise ships</p>
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
              Create New Ship
            </button>
          )}
        </div>

        {/* Create form */}
        {showCreateForm && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
            <h3 className="font-semibold text-navy mb-4">Create New Ship</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
                <input
                  type="text"
                  value={createForm.name || ''}
                  onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-slate-900"
                  placeholder="e.g., Disney Dream"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Slug *</label>
                <input
                  type="text"
                  value={createForm.slug || ''}
                  onChange={(e) => setCreateForm({ ...createForm, slug: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-slate-900"
                  placeholder="e.g., disney-dream"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Year Launched</label>
                <input
                  type="number"
                  value={createForm.year_launched || new Date().getFullYear()}
                  onChange={(e) => setCreateForm({ ...createForm, year_launched: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-slate-900"
                  placeholder="2011"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Capacity</label>
                <input
                  type="number"
                  value={createForm.capacity || 0}
                  onChange={(e) => setCreateForm({ ...createForm, capacity: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-slate-900"
                  placeholder="4000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tonnage</label>
                <input
                  type="number"
                  value={createForm.tonnage || 0}
                  onChange={(e) => setCreateForm({ ...createForm, tonnage: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-slate-900"
                  placeholder="130000"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">Editorial Take</label>
              <textarea
                value={createForm.editorial_take || ''}
                onChange={(e) => setCreateForm({ ...createForm, editorial_take: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-slate-900"
                rows={4}
                placeholder="Share your editorial perspective on this ship..."
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
                Create Ship
              </button>
            </div>
          </div>
        )}

        {/* Ships table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200">
            <h2 className="font-semibold text-navy">All Ships ({ships.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Name</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Slug</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Year</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Capacity</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Tonnage</th>
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ships.map(s => (
                  <tbody key={s.id}>
                    <tr className="hover:bg-slate-50">
                      <td className="px-5 py-3 font-medium text-navy">{s.name}</td>
                      <td className="px-5 py-3 text-slate-600">{s.slug}</td>
                      <td className="px-5 py-3 text-slate-600">{s.year_launched}</td>
                      <td className="px-5 py-3 text-slate-600">{s.capacity.toLocaleString()}</td>
                      <td className="px-5 py-3 text-slate-600">{s.tonnage.toLocaleString()}</td>
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
                      <tr className="bg-[#1E3A5F]/10">
                        <td colSpan={6} className="px-5 py-4">
                          <div className="space-y-3">
                            <h4 className="font-semibold text-navy mb-3">Edit Ship</h4>
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
                                <label className="block text-xs font-medium text-slate-700 mb-1">Slug</label>
                                <input
                                  type="text"
                                  value={editForm.slug}
                                  onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })}
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-sm text-slate-900"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Year Launched</label>
                                <input
                                  type="number"
                                  value={editForm.year_launched}
                                  onChange={(e) => setEditForm({ ...editForm, year_launched: parseInt(e.target.value) })}
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-sm text-slate-900"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Capacity</label>
                                <input
                                  type="number"
                                  value={editForm.capacity}
                                  onChange={(e) => setEditForm({ ...editForm, capacity: parseInt(e.target.value) })}
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-sm text-slate-900"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Tonnage</label>
                                <input
                                  type="number"
                                  value={editForm.tonnage}
                                  onChange={(e) => setEditForm({ ...editForm, tonnage: parseInt(e.target.value) })}
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
