export interface OBCTier {
  minFare: number
  maxFare: number | null
  obc: number
  label: string
}

export const OBC_TIERS: OBCTier[] = [
  { minFare: 0,      maxFare: 1499,  obc: 25,  label: 'Under $1,500' },
  { minFare: 1500,   maxFare: 2999,  obc: 50,  label: '$1,500 – $2,999' },
  { minFare: 3000,   maxFare: 4999,  obc: 100, label: '$3,000 – $4,999' },
  { minFare: 5000,   maxFare: 9999,  obc: 200, label: '$5,000 – $9,999' },
  { minFare: 10000,  maxFare: 19999, obc: 300, label: '$10,000 – $19,999' },
  { minFare: 20000,  maxFare: null,  obc: 400, label: '$20,000+' },
]

export function getOBC(totalFare: number): number {
  const tier = OBC_TIERS.find(
    (t) => totalFare >= t.minFare && (t.maxFare === null || totalFare <= t.maxFare)
  )
  return tier?.obc ?? 0
}

export function getOBCTier(totalFare: number): OBCTier | null {
  return (
    OBC_TIERS.find(
      (t) => totalFare >= t.minFare && (t.maxFare === null || totalFare <= t.maxFare)
    ) ?? null
  )
}
