import { Metadata } from 'next'
import Link from 'next/link'
import { Users, MessageSquare, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Community — Disney Cruisers Hub',
  description: 'Join the GatGrid Cruises community. Connect with fellow Disney cruisers, share tips, and plan your next adventure together.',
}

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-[#1E3A5F]/20">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Community
          </h1>

          <p className="text-xl text-slate-600">
            Join thousands of Disney cruisers planning, sharing, and celebrating together.
          </p>
        </div>
      </section>

      {/* Community Features */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sail Together */}
            <Link
              href="/community/sail-together"
              className="group p-8 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-[#1E3A5F]/20 group-hover:bg-blue-200 transition-colors">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Popular
                </span>
              </div>

              <h2 className="font-display text-2xl font-bold text-slate-900 mb-2 group-hover:text-[#D4AF37] transition-colors">
                Sail Together
              </h2>

              <p className="text-slate-600 mb-4">
                Find your cruise crew. Connect with fellow passengers sailing on the same dates, share
                excursion tips, coordinate Fish Extender gifts, and make lifelong friends.
              </p>

              <div className="text-sm text-blue-600 font-semibold group-hover:text-blue-700">
                Browse Groups →
              </div>
            </Link>

            {/* Future Feature 1 */}
            <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50 opacity-50">
              <div className="flex items-start justify-between mb-4">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-slate-200">
                  <MessageSquare className="h-6 w-6 text-slate-400" />
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-200 text-slate-600">
                  Coming Soon
                </span>
              </div>

              <h2 className="font-display text-2xl font-bold text-slate-600 mb-2">
                Discussion Forums
              </h2>

              <p className="text-slate-600 mb-4">
                Share tips, ask questions, and connect with the broader cruise community.
              </p>

              <div className="text-sm text-slate-400 font-semibold">
                Coming in Summer 2026
              </div>
            </div>

            {/* Future Feature 2 */}
            <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50 opacity-50">
              <div className="flex items-start justify-between mb-4">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-slate-200">
                  <Heart className="h-6 w-6 text-slate-400" />
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-200 text-slate-600">
                  Coming Soon
                </span>
              </div>

              <h2 className="font-display text-2xl font-bold text-slate-600 mb-2">
                Ship Reviews
              </h2>

              <p className="text-slate-600 mb-4">
                Read and write reviews about dining, entertainment, staterooms, and shore experiences.
              </p>

              <div className="text-sm text-slate-400 font-semibold">
                Coming in Summer 2026
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a1628] to-[#1E3A5F]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Join the Community
          </h2>

          <p className="text-lg text-white/80 mb-8">
            Create your free GatGrid Cruises account to start connecting with fellow Disney cruisers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold text-[#0a1628] bg-[#D4AF37] hover:bg-[#c9a430] transition-colors"
            >
              Create Account
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold text-[#D4AF37] border-2 border-[#D4AF37] hover:bg-white/10 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
