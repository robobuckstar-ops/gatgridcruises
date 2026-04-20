'use client'

import { useRouter } from 'next/navigation'
import { SearchBar } from './search-bar'

export function HeroSearch() {
  const router = useRouter()

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <SearchBar onSearch={handleSearch} />
    </div>
  )
}
