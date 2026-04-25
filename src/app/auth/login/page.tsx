'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signInWithEmail, signInWithPassword } from '@/lib/auth'
import { Mail, Lock, Loader2, AlertCircle } from 'lucide-react'

type TabType = 'magic' | 'password'

export default function LoginPage() {
  const router = useRouter()
  const [tab, setTab] = useState<TabType>('magic')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const result = await signInWithEmail(email)
    if (result.error) {
      setError(result.error)
      setLoading(false)
    } else {
      setSuccess(true)
      setEmail('')
    }
  }

  async function handlePassword(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const result = await signInWithPassword(email, password)
    if (result.error) {
      setError(result.error)
      setLoading(false)
    } else {
      setEmail('')
      setPassword('')
      router.push('/')
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full mb-4">
              <Mail className="h-6 w-6 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Check your email</h2>
            <p className="text-slate-600 mb-6">
              We sent a magic link to <strong>{email}</strong>. Click the link to sign in.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Back to login
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-b from-[#0a1628] to-[#1E3A5F] px-8 py-8 text-center border-b border-slate-200">
          <h1 className="text-3xl font-bold text-slate-900 mb-1" style={{ fontFamily: 'Georgia, serif' }}>
            ⚓
          </h1>
          <h1 className="text-2xl font-bold text-slate-900">Sign In</h1>
          <p className="text-slate-600 text-sm mt-1">Welcome back to GatGridCruises</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => {
              setTab('magic')
              setError(null)
            }}
            className={`flex-1 px-4 py-4 font-medium text-sm transition-colors ${
              tab === 'magic'
                ? 'border-b-2 border-blue-600 text-slate-900'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Mail className="h-4 w-4 inline mr-2" />
            Magic Link
          </button>
          <button
            onClick={() => {
              setTab('password')
              setError(null)
            }}
            className={`flex-1 px-4 py-4 font-medium text-sm transition-colors ${
              tab === 'password'
                ? 'border-b-2 border-blue-600 text-slate-900'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Lock className="h-4 w-4 inline mr-2" />
            Password
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {tab === 'magic' ? (
            <form onSubmit={handleMagicLink} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {loading ? 'Sending...' : 'Send Magic Link'}
              </button>

              <p className="text-sm text-slate-600 text-center">
                No password needed. We'll email you a link to sign in.
              </p>
            </form>
          ) : (
            <form onSubmit={handlePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {loading ? 'Signing in...' : 'Sign In'}
              </button>

              <p className="text-xs text-slate-500 text-center">
                Password login is for admin users only.
              </p>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-center text-slate-600 text-sm">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
