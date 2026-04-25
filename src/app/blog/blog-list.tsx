'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Calendar, Clock, Tag } from 'lucide-react'
import type { BlogPost } from '@/data/blog-posts'

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'news', label: 'News' },
  { value: 'tips', label: 'Tips' },
  { value: 'deals', label: 'Deals' },
  { value: 'reviews', label: 'Reviews' },
  { value: 'destinations', label: 'Destinations' },
]

const categoryColors: Record<string, { bg: string; text: string }> = {
  news: { bg: 'bg-[#1E3A5F]/20', text: 'text-blue-700' },
  tips: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  deals: { bg: 'bg-amber-100', text: 'text-amber-700' },
  reviews: { bg: 'bg-purple-100', text: 'text-purple-700' },
  destinations: { bg: 'bg-pink-100', text: 'text-pink-700' },
}

interface BlogListProps {
  posts: BlogPost[]
}

export function BlogList({ posts }: BlogListProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'all') {
      return posts
    }
    return posts.filter(post => post.category === activeCategory)
  }, [posts, activeCategory])

  return (
    <div>
      {/* Category Filter Pills */}
      <div className="mb-12">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(category => (
            <button
              key={category.value}
              onClick={() => setActiveCategory(category.value)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                activeCategory === category.value
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map(post => {
            const colors = categoryColors[post.category]
            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group h-full"
              >
                <article className="h-full border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all duration-300 bg-white">
                  {/* Featured Image */}
                  {post.featured_image_url && (
                    <div className="h-48 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                      <img
                        src={post.featured_image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    {/* Category Badge */}
                    <div className="mb-3 inline-block">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${colors.bg} ${colors.text}`}
                      >
                        {post.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-display font-bold text-slate-900 mb-3 group-hover:text-[#D4AF37] transition-colors">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-slate-600 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="space-y-3 text-sm text-slate-500 border-t border-slate-100 pt-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <time dateTime={post.published_date}>
                          {new Date(post.published_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{post.read_time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-700">{post.author}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map(tag => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded"
                          >
                            <Tag className="h-3 w-3" />
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 2 && (
                          <span className="text-xs text-slate-400 px-2 py-1">
                            +{post.tags.length - 2} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              </Link>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-slate-600 text-lg">
            No posts found in this category. Try selecting a different one.
          </p>
        </div>
      )}
    </div>
  )
}
