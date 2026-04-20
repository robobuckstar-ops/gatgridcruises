import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatDateShort(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

export function daysUntil(date: string): number {
  const now = new Date()
  const target = new Date(date)
  const diff = target.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export function calculateSailingScore(
  currentPrice: number,
  historicalAvgPrice: number,
  sailDate: string,
  shipSlug: string
): { price_score: number; urgency_score: number; ship_score: number; final_score: number } {
  // Price score: 50 = at average, 100 = 25%+ below, 0 = 25%+ above
  const priceRatio = (historicalAvgPrice - currentPrice) / historicalAvgPrice
  const price_score = Math.min(100, Math.max(0, priceRatio * 200 + 50))

  // Urgency score based on days until sail
  const days = daysUntil(sailDate)
  let urgency_score: number
  if (days < 30) urgency_score = 90
  else if (days < 60) urgency_score = 75
  else if (days < 120) urgency_score = 60
  else if (days < 365) urgency_score = 50
  else urgency_score = 40

  // Ship score based on newness/popularity
  const shipScores: Record<string, number> = {
    treasure: 90, destiny: 90, adventure: 90,
    wish: 85,
    dream: 75, fantasy: 75,
    magic: 65, wonder: 65,
  }
  const ship_score = shipScores[shipSlug] ?? 70

  const final_score = Math.round(
    price_score * 0.6 + urgency_score * 0.2 + ship_score * 0.2
  )

  return { price_score: Math.round(price_score), urgency_score, ship_score, final_score }
}

export function getScoreColor(score: number): string {
  if (score >= 85) return 'text-success'
  if (score >= 70) return 'text-yellow-500'
  return 'text-muted'
}

export function getScoreBg(score: number): string {
  if (score >= 85) return 'bg-emerald-50 text-emerald-700 border-emerald-200'
  if (score >= 70) return 'bg-yellow-50 text-yellow-700 border-yellow-200'
  return 'bg-slate-50 text-slate-600 border-slate-200'
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function percentChange(current: number, previous: number): number {
  if (previous === 0) return 0
  return Math.round(((current - previous) / previous) * 100)
}
