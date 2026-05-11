import { Metadata } from 'next'
import Link from 'next/link'
import { getSailTogetherGroups } from '@/lib/data'
import { GroupBrowser } from './group-browser'
import { Users, Heart, TrendingUp, Gift, MessageCircle, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sail Together | Find Your Cruise Crew',
  description: 'Connect with fellow Disney cruisers sailing on the same dates. Share excursion tips, split costs, make lifelong friends.',
  openGraph: {
    title: 'Sail Together | Find Your Cruise Crew',
    description: 'Connect with fellow Disney cruisers sailing on the same dates. Share excursion tips, split costs, make lifelong friends.',
    url: 'https://gatgridcruises.com/community/sail-together',
    images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'GatGridCruises' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sail Together | Find Your Cruise Crew',
    description: 'Connect with fellow Disney cruisers on your sailing. Share tips, split costs, make friends.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

export default function SailTogetherPage() {
  const groups = getSailTogetherGroups()

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-[#1E3A5F] to-slate-900 relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-white/10">
              <Users className="h-8 w-8 text-[#D4AF37]" />
            </div>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Sail Together
          </h1>

          <p className="text-xl text-blue-200 max-w-2xl mx-auto mb-8">
            Find your cruise crew. Connect with fellow passengers sailing on the same dates, share excursion
            recommendations, coordinate Fish Extender gifts, and make lifelong friends.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="#browse-groups"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-[#1E3A5F] bg-[#D4AF37] hover:bg-yellow-300 transition-colors"
            >
              Browse Groups
            </a>
            <a
              href="/auth/signup"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white border-2 border-white/30 hover:bg-white/10 transition-colors"
            >
              Create Account
            </a>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-[#1E3A5F]/20 text-[#1E3A5F] font-display font-bold text-lg mb-4">
                1
              </div>
              <h3 className="font-display text-xl font-semibold text-slate-900 mb-2">
                Find Your Sailing
              </h3>
              <p className="text-slate-600">
                Search for your cruise date and ship. Browse active groups or create a new one if no group
                exists yet.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-cyan-100 text-cyan-600 font-display font-bold text-lg mb-4">
                2
              </div>
              <h3 className="font-display text-xl font-semibold text-slate-900 mb-2">
                Join the Group
              </h3>
              <p className="text-slate-600">
                Create a free account and join the community for your sailing. See who else is sailing with
                you.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-amber-100 text-amber-600 font-display font-bold text-lg mb-4">
                3
              </div>
              <h3 className="font-display text-xl font-semibold text-slate-900 mb-2">
                Connect & Plan
              </h3>
              <p className="text-slate-600">
                Chat with fellow cruisers, plan excursions together, share tips, and build your cruise crew
                before you sail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">
            Why Join Sail Together?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Benefit 1 */}
            <div className="p-6 rounded-xl border border-slate-200 bg-white hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <MapPin className="h-6 w-6 text-[#1E3A5F] mt-1" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-slate-900 mb-1">
                    Excursion Recommendations
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Get insider tips on the best shore excursions, hidden gems at ports, and local
                    recommendations from experienced cruisers.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="p-6 rounded-xl border border-slate-200 bg-white hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-emerald-600 mt-1" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-slate-900 mb-1">
                    Split Costs & Save
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Coordinate group excursions, share cabanas, split ground transportation, and save money
                    together.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="p-6 rounded-xl border border-slate-200 bg-white hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Heart className="h-6 w-6 text-[#D4AF37] mt-1" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-slate-900 mb-1">
                    Make Lifelong Friends
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Build meaningful connections with fellow cruisers. Many groups stay in touch long after
                    the cruise.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="p-6 rounded-xl border border-slate-200 bg-white hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Gift className="h-6 w-6 text-[#D4AF37] mt-1" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-slate-900 mb-1">
                    Fish Extender Exchange
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Coordinate gift exchanges, organize group door decorations, and participate in ship-wide
                    celebrations.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefit 5 */}
            <div className="p-6 rounded-xl border border-slate-200 bg-white hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <MessageCircle className="h-6 w-6 text-cyan-600 mt-1" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-slate-900 mb-1">
                    Real-Time Crew Chat
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Connect with your cruise family before and during your sailing. Share photos, coordinate
                    meetups, and stay connected.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefit 6 */}
            <div className="p-6 rounded-xl border border-slate-200 bg-white hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Users className="h-6 w-6 text-[#1E3A5F] mt-1" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-slate-900 mb-1">
                    Dining Coordination
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Organize group dinner reservations, find dining buddies, and plan special celebrations
                    with your group.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse Groups Section */}
      <section id="browse-groups" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Browse Cruise Groups
            </h2>
            <p className="text-lg text-slate-600">
              Find groups for sailings across all our featured ships and dates.
            </p>
          </div>

          <GroupBrowser groups={groups} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-[#1E3A5F]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Join Your Crew?
          </h2>

          <p className="text-lg text-blue-200 mb-8">
            Create a free account to start connecting with fellow Disney cruisers sailing on your dates.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold text-[#1E3A5F] bg-[#D4AF37] hover:bg-yellow-300 transition-colors"
            >
              Create Free Account
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold text-white border-2 border-white/30 hover:bg-white/10 transition-colors"
            >
              Sign In
            </Link>
          </div>

          <p className="text-sm text-blue-400 mt-6">
            No credit card required. Join thousands of cruise friends already planning their next voyage.
          </p>
        </div>
      </section>
    </main>
  )
}
