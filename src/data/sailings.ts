/**
 * Sailings data — sourced from Disney Cruise Line via the Apify
 * `sercul/disney-cruises-scraper` actor. Regenerate with:
 *
 *   APIFY_TOKEN=… APIFY_DATASET_ID=… npx tsx scripts/fetch-apify-data.ts
 *
 * The script writes `sailings.json` next to this file. Don't hand-edit the
 * JSON — re-run the pipeline against a fresher Apify dataset instead.
 */
import type { Sailing } from '@/types/database'
import sailingsJson from './sailings.json'

export const sailings: Sailing[] = sailingsJson as Sailing[]
