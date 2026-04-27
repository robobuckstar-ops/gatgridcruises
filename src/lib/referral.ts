export function generateReferralCode(name: string): string {
  const prefix = name
    .replace(/[^a-zA-Z]/g, '')
    .slice(0, 4)
    .toUpperCase()
    .padEnd(4, 'X')
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `${prefix}${suffix}`
}

export function buildReferralUrl(code: string, baseUrl = 'https://gatgridcruises.com'): string {
  return `${baseUrl}/?ref=${code}`
}
