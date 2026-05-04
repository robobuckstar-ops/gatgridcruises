/**
 * Historical last-minute deals seed data.
 *
 * The site now derives last-minute deals from the canonical Apify-sourced
 * `sailings` list (any sailing within 90 days), so this array is empty.
 * Kept as a typed export for backward compatibility with `lib/data.ts`.
 */
import type { Sailing } from '@/types/database'

export const lastMinuteSailings: Sailing[] = []
