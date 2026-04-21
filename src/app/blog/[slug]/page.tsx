import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBlogPostBySlug, getRelatedPosts, getBlogPosts } from '@/lib/data'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import { ShareButtons } from './share-buttons'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const posts = getBlogPosts()
  return posts.map(post => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found | GatGridCruises',
    }
  }

  return {
    title: `${post.title} | GatGridCruises Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post.id, post.category, 3)

  const categoryColors: Record<string, { bg: string; text: string }> = {
    news: { bg: 'bg-blue-100', text: 'text-blue-700' },
    tips: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
    deals: { bg: 'bg-amber-100', text: 'text-amber-700' },
    reviews: { bg: 'bg-purple-100', text: 'text-purple-700' },
    destinations: { bg: 'bg-pink-100', text: 'text-pink-700' },
  }

  const colors = categoryColors[post.category]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-8 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Title & Metadata */}
          <div className="mb-8">
            <div className="mb-4 inline-block">
              <span className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide ${colors.bg} ${colors.text}`}>
                {post.category}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              {post.title}
            </h1>

            {/* Post Meta */}
            <div className="flex flex-wrap items-center gap-6 text-slate-600 border-t border-slate-200 pt-6">
              {/* Author */}
              <div className="flex items-center gap-3">
                {post.author_avatar && (
                  <img
                    src={post.author_avatar}
                    alt={post.author}
                    className="h-10 w-10 rounded-full"
                  />
                )}
                <div>
                  <div className="font-semibold text-slate-900">{post.author}</div>
                  <div className="text-sm text-slate-500">Author</div>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.published_date}>
                  {new Date(post.published_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>

              {/* Read Time */}
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                <span>{post.read_time}</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {post.featured_image_url && (
            <div className="mb-8 rounded-xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 shadow-lg">
              <img
                src={post.featured_image_url}
                alt={post.title}
                className="w-full h-96 object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div
          className="prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-4">Tagged with</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <a
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 transition-colors text-sm font-medium"
                >
                  #{tag}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Share Section */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-4">Share this article</h3>
          <ShareButtons title={post.title} slug={post.slug} />
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-slate-50 py-16 mt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-8">
              Related Articles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(relatedPost => {
                const relatedColors = categoryColors[relatedPost.category]
                return (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="group"
                  >
                    <article className="border border-slate-200 rounded-lg overflow-hidden bg-white hover:shadow-lg hover:border-blue-200 transition-all duration-300 h-full flex flex-col">
                      {relatedPost.featured_image_url && (
                        <div className="h-40 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                          <img
                            src={relatedPost.featured_image_url}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}

                      <div className="p-4 flex flex-col flex-grow">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-semibold uppercase tracking-wide ${relatedColors.bg} ${relatedColors.text} mb-2 w-fit`}
                        >
                          {relatedPost.category}
                        </span>

                        <h3 className="font-display text-base font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>

                        <p className="text-sm text-slate-600 mb-3 flex-grow line-clamp-2">
                          {relatedPost.excerpt}
                        </p>

                        <div className="text-xs text-slate-500 pt-2 border-t border-slate-100">
                          {new Date(relatedPost.published_date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                      </div>
                    </article>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Newsletter CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            Don't miss future articles
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Subscribe to get the latest Disney cruise news and tips delivered to your inbox
          </p>
          <button className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200">
            Subscribe Now
          </button>
        </div>
      </div>
    </main>
  )
}
