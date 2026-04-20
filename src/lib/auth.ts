import { supabase, isSupabaseConfigured } from './supabase'

export interface User {
  id: string
  email: string
  role: 'user' | 'admin'
  created_at: string
}

// Check if user is logged in (client-side)
export async function getCurrentUser(): Promise<User | null> {
  if (!supabase || !isSupabaseConfigured) return null

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  // Get profile with role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  return {
    id: user.id,
    email: user.email || '',
    role: profile?.role || 'user',
    created_at: user.created_at,
  }
}

// Sign in with email magic link
export async function signInWithEmail(email: string): Promise<{ error: string | null }> {
  if (!supabase) return { error: 'Auth not configured' }

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
    },
  })

  return { error: error?.message || null }
}

// Sign in with password (for admin)
export async function signInWithPassword(email: string, password: string): Promise<{ error: string | null }> {
  if (!supabase) return { error: 'Auth not configured' }

  const { error } = await supabase.auth.signInWithPassword({ email, password })
  return { error: error?.message || null }
}

// Sign out
export async function signOut(): Promise<void> {
  if (!supabase) return
  await supabase.auth.signOut()
}

// Check if user is admin
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser()
  return user?.role === 'admin'
}
