import { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, ArrowRight } from 'lucide-react'
import { GetQuoteCTA } from '@/components/get-quote-cta'

export const metadata: Metadata = {
  title: 'Disney Cruise Guides & Tips',
  description: 'In-depth guides to help you plan the perfect Disney cruise. From first-timer tips to stateroom comparisons, packing lists, and destination guides.',
}

const guides = [
  {
    slug: 'packing-gear',
    title: 'The Ultimate Disney Cruise Packing List (With Our Top Picks)',
    description: 'The 30 Amazon picks that veteran Disney cruisers swear by — from magnetic hooks and non-surge power strips to reef-safe sunscreen and Sea-Band wristbands.',
    category: 'Gear',
    readTime: '10 min read',
  },
  {
    slug: 'travel-insurance',
    title: 'Do You Need Travel Insurance for a Disney Cruise?',
    description: 'Disney\'s own plan vs. third-party options, what Amex Business Platinum covers, and how to think about the medical-at-sea risk most families overlook.',
    category: 'Planning',
    readTime: '8 min read',
  },
  {
    slug: 'ports',
    title: 'Disney Cruise Port Guides — What to Know Before You Dock',
    description: 'In-depth guides for Port Canaveral, Nassau, Castaway Cay, and Cozumel — top excursions, nearby hotels, and insider tips for every Disney cruise port.',
    category: 'Ports',
    readTime: '5 min read',
  },
  {
    slug: 'disney-cruise-cost-guide',
    title: 'The True Cost of a Disney Cruise (2025 Breakdown)',
    description: 'What a Disney cruise really costs beyond the sticker price — gratuities, excursions, drink packages, Wi-Fi, and every hidden fee explained.',
    category: 'Planning',
    readTime: '12 min read',
  },
  {
    slug: 'best-disney-cruise-staterooms',
    title: 'Best Disney Cruise Staterooms: Category-by-Category Guide',
    description: 'A deep dive into every stateroom category across the Disney fleet — from inside cabins to concierge suites, with noise ratings and location tips.',
    category: 'Staterooms',
    readTime: '15 min read',
  },
  {
    slug: 'port-canaveral-vs-miami',
    title: 'Port Canaveral vs. Miami: Which Disney Cruise Port Is Better?',
    description: 'Comparing Disney\'s two Florida departure ports — driving distance, parking, pre-cruise hotels, nearby attractions, and which sailings depart from each.',
    category: 'Ports',
    readTime: '10 min read',
  },
  {
    slug: 'first-time-disney-cruise-tips',
    title: '25 Things to Know Before Your First Disney Cruise',
    description: 'Everything first-timers need to know — from rotational dining to Pirate Night, Castaway Cay, tips for embarkation day, and common mistakes to avoid.',
    category: 'First Timers',
    readTime: '14 min read',
  },
  {
    slug: 'disney-cruise-with-toddlers',
    title: 'Disney Cruise with Toddlers: The Complete Parent\'s Guide',
    description: 'Ages 0–4 on a Disney cruise — nursery details, splash zones, nap-friendly strategies, stroller tips, dining hacks, and the best sailings for little ones.',
    category: 'Family',
    readTime: '13 min read',
  },
  {
    slug: 'castaway-cay-guide',
    title: 'Castaway Cay: The Ultimate Guide to Disney\'s Private Island',
    description: 'Everything you need to know about Castaway Cay — beaches, excursions, Cookies BBQ, Serenity Bay, snorkeling, and how to make the most of your island day.',
    category: 'Destinations',
    readTime: '11 min read',
  },
  {
    slug: 'disney-cruise-packing-list',
    title: 'The Ultimate Disney Cruise Packing List (Printable)',
    description: 'What to pack for a Disney cruise — essentials, formal night outfits, Castaway Cay gear, Fish Extender gifts, and the items most people forget.',
    category: 'Planning',
    readTime: '9 min read',
  },
  {
    slug: 'disney-cruise-vs-royal-caribbean',
    title: 'Disney Cruise vs. Royal Caribbean: Honest Comparison',
    description: 'An unbiased side-by-side comparison — pricing, kids clubs, dining, entertainment, cabins, private islands, and which line is better for different travelers.',
    category: 'Comparisons',
    readTime: '16 min read',
  },
  {
    slug: 'best-time-to-book-disney-cruise',
    title: 'Best Time to Book a Disney Cruise (Price Data Analysis)',
    description: 'When prices drop, when to book for the best deals, how far in advance to reserve, and seasonal pricing patterns based on real price tracking data.',
    category: 'Deals',
    readTime: '10 min read',
  },
  {
    slug: 'disney-cruise-food-guide',
    title: 'Disney Cruise Food Guide: Every Restaurant Ranked',
    description: 'A complete guide to dining on Disney Cruise Line — rotational restaurants, adult-only dining, room service, buffets, and the best dishes to try.',
    category: 'Dining',
    readTime: '14 min read',
  },
]

export default function GuidesPage() {
  return (
    <main>
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="font-fraunces text-4xl md:text-5xl font-bold text-slate-900">
              Disney Cruise Guides
            </h1>
          </div>
          <p className="font-inter text-lg text-slate-600 max-w-2xl mx-auto">
            In-depth, honest guides to help you plan the perfect Disney cruise.
            No fluff, no affiliate pressure — just the information you need.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {guides.map((guide, index) => (
              <div key={guide.slug}>
                <Link
                  href={`/guides/${guide.slug}`}
                  className="group block p-6 rounded-xl border-2 border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {guide.category}
                    </span>
                    <span className="text-xs text-slate-400">{guide.readTime}</span>
                  </div>
                  <h2 className="font-fraunces text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {guide.title}
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {guide.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                    Read Guide <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>

                {index === 3 && (
                  <div className="mt-8 mb-4">
                    <a
                      href="https://americanexpress.com/en-us/referral/business-platinum-charge-card?ref=CRYSTSGCNM&XL=MIMNS"
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="block rounded-xl overflow-hidden border border-[#D4AF37] shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2a4f7a] px-6 py-4 flex items-center justify-between gap-4">
                        <div>
                          <p className="text-[#D4AF37] font-bold text-base leading-tight">Earn 150K+ Membership Rewards Points</p>
                          <p className="text-blue-200 text-sm mt-0.5">Enough for your next Disney cruise upgrade — Amex Business Platinum</p>
                        </div>
                        <span className="flex-shrink-0 bg-[#D4AF37] text-[#1E3A5F] font-bold text-sm px-4 py-2 rounded-lg whitespace-nowrap">
                          Learn More →
                        </span>
                      </div>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <GetQuoteCTA />
    </main>
  )
}
