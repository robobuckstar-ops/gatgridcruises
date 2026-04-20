'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getCurrentUser, signOut, type User } from '@/lib/auth'
import { User as UserIcon, LogOut, Settings } from 'lucide-react'

export function UserMenu() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCurrentUser().then((u) => {
      setUser(u)
      setLoading(false)
    })
  }, [])

  const handleSignOut = async () => {
    await signOut()
    setUser(null)
    setOpen(false)
    router.push('/')
  }

  if (loading) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-400 bg-slate-100 rounded-lg">
        <UserIcon className="h-4 w-4" />
        Loading...
      </div>
    )
  }

  if (!user) {
    return (
      <Link
        href="/auth/login"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 hover:text-navy border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
      >
        <UserIcon className="h-4 w-4" />
        Sign In
      </Link>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-navy bg-gold/10 border border-gold/30 rounded-lg hover:bg-gold/20 transition-colors"
      >
        <UserIcon className="h-4 w-4" />
        {user.email.split('@')[0]}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
          <p className="px-3 py-2 text-xs text-slate-500 border-b border-slate-100">{user.email}</p>
          {user.role === 'admin' && (
            <Link
              href="/admin"
              className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Settings className="h-3.5 w-3.5" /> Admin Dashboard
            </Link>
          )}
          <Link
            href="/account/watchlist"
            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <UserIcon className="h-3.5 w-3.5" /> My Watchlist
          </Link>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign Out
          </button>
        </div>
      )}
    </div>
  )
}
