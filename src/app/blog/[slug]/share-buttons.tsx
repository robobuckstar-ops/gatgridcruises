'use client'

import { Twitter, Facebook, Copy } from 'lucide-react'

interface ShareButtonsProps {
  title: string
  slug: string
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const url = `https://gatgridcruises.com/blog/${slug}`
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 bg-[#1E3A5F]/10 text-[#1E3A5F] rounded-lg hover:bg-[#1E3A5F]/20 transition-colors font-medium"
      >
        <Twitter className="h-4 w-4" />
        Twitter
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 bg-[#1E3A5F]/10 text-[#1E3A5F] rounded-lg hover:bg-[#1E3A5F]/20 transition-colors font-medium"
      >
        <Facebook className="h-4 w-4" />
        Facebook
      </a>
      <button
        onClick={() => navigator.clipboard.writeText(url)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium"
      >
        <Copy className="h-4 w-4" />
        Copy Link
      </button>
    </div>
  )
}
