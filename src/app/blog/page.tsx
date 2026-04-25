import Link from 'next/link'
import { Newspaper } from 'lucide-react'
import { getBlogPosts, getFeaturedBlogPost } from '@/lib/data'
import { BlogList } from './blog-list'

export const metadata = {
  title: 'Disney Cruise News, Tips & Deals',
  description: 'Disney cruise news, tips, deals, and reviews from the crew at GatGridCruises.',
  title: 'Blog — Disney Cruise Tips, Deals & News',
  description:
    'Disney cruise news, money-saving tips, deal analyses, and first-hand reviews. Practical advice for planning the perfect Disney Cruise Line vacation.',
  openGraph: {
    title: 'Blog — Disney Cruise Tips, Deals & News',
    description:
      'Practical Disney cruise advice: money-saving tips, deal analyses, ship reviews, and planning guides.',
    url: 'https://gatgridcruises.com/blog',
  },
}

export default function BlogPage() {
  const allPosts = getBlogPosts()
  const featuredPost = getFeaturedBlogPost()

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 sm:py-32">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-blue-100 rounded-full">
                <Newspaper className="h-8 w-8 text-blue-600" />
              </div>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl font-bold text-slate-900 mb-6">
              The GatGrid Blog
            </h1>

            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Disney cruise news, tips, and deals from the crew at GatGridCruises
            </p>
          </div>
        </div>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-4">
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Featured Post
            </h2>
          </div>

          <Link href={`/blog/${featuredPost.slug}`} className="block group">
            <article className="rounded-2xl overflow-hidden border border-slate-200 bg-white hover:shadow-xl transition-all duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Featured Image */}
                {featuredPost.featured_image_url && (
                  <div className="h-80 md:h-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                    <img
                      src={featuredPost.featured_image_url}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
                      {featuredPost.category}
                    </span>

                    <h3 className="font-display text-3xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                      {featuredPost.title}
                    </h3>

                    <p className="text-lg text-slate-600 mb-6">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="space-y-3 text-slate-600 border-t border-slate-100 pt-6">
                    <div className="flex flex-wrap gap-6 text-sm">
                      <div>
                        <span className="font-semibold text-slate-900">{featuredPost.author}</span>
                      </div>
                      <div>
                        {new Date(featuredPost.published_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                      <div>{featuredPost.read_time}</div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        </div>
      )}

      {/* All Posts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-2">
            All Articles
          </h2>
          <p className="text-slate-600">
            Explore our complete library of Disney cruise articles
          </p>
        </div>

        <BlogList posts={allPosts} />
      </div>

      {/* Newsletter CTA */}
      <div className="bg-gradient-to-r from-[#1E3A5F] to-[#0a1628] text-white py-16 sm:py-20 mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Get the latest Disney cruise news and exclusive tips delivered to your inbox
          </p>
          <button className="inline-block px-8 py-3 bg-[#D4AF37] text-[#0a1628] font-semibold rounded-lg hover:bg-yellow-300 transition-colors duration-200">
            Subscribe to Our Newsletter
          </button>
        </div>
      </div>
    </main>
  )
}
