import { MetadataRoute } from 'next'
import { getSailings, getShips, getPorts, getHotelsForPort, getBlogPosts } from '@/lib/data'
import { destinationPorts } from '@/data/destination-ports'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gatgridcruises.com'
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    // Top-level
    { url: baseUrl, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/search`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },

    // Deals
    { url: `${baseUrl}/deals`, lastModified: now, changeFrequency: 'daily', priority: 0.95 },
    { url: `${baseUrl}/deals/last-minute`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/deals/flash-deals`, lastModified: now, changeFrequency: 'daily', priority: 0.85 },
    { url: `${baseUrl}/deals/military`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/flight-deals`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/flights`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },

    // Alerts / tracking
    { url: `${baseUrl}/alerts`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/deal-alerts`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/price-tracker`, lastModified: now, changeFrequency: 'weekly', priority: 0.75 },

    // Concierge / OBC funnel
    { url: `${baseUrl}/concierge`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/onboard-credit`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/already-booked`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/giving-back`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/my-trip`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },

    // Content hubs
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/ships`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/ports`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/guides`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/travel-hacks`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/solo-cruising`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/community`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/community/sail-together`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/hotels`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },

    // Tools
    { url: `${baseUrl}/tools`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/tools/obc-calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/tools/cost-calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/tools/cruise-cost-calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/tools/credit-cards`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/tools/flights`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/tools/staterooms`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/tools/staterooms/reviews`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/tools/transfers`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/tools/compare`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },

    // Referral / mailing
    { url: `${baseUrl}/referral`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/newsletter`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/subscribe`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },

    // Static / company
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/book`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/disclosures`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  // Sailing pages
  const sailings = getSailings()
  const sailingPages: MetadataRoute.Sitemap = sailings.map(s => ({
    url: `${baseUrl}/sailing/${s.id}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.8,
  }))

  // Ship pages
  const ships = getShips()
  const shipPages: MetadataRoute.Sitemap = ships.map(s => ({
    url: `${baseUrl}/ships/${s.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  // Port hotel pages
  const ports = getPorts()
  const hotelPages: MetadataRoute.Sitemap = ports
    .filter(p => getHotelsForPort(p.id).length > 0)
    .map(p => ({
      url: `${baseUrl}/hotels/${p.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    }))

  // Transfer pages
  const transferPages: MetadataRoute.Sitemap = ports
    .filter(p => getHotelsForPort(p.id).length > 0)
    .map(p => ({
      url: `${baseUrl}/tools/transfers/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    }))

  // Guide pages
  const guidePages: MetadataRoute.Sitemap = [
    'disney-cruise-cost-guide',
    'best-disney-cruise-staterooms',
    'port-canaveral-vs-miami',
    'first-time-disney-cruise-tips',
    'first-time-disney-cruise',
    'disney-cruise-with-toddlers',
    'castaway-cay-guide',
    'disney-cruise-packing-list',
    'disney-cruise-vs-royal-caribbean',
    'best-time-to-book-disney-cruise',
    'disney-cruise-food-guide',
    'travel-hacks-credit-cards',
    'packing-gear',
    'travel-insurance',
    'comped-cruises',
    'cruise-countdown',
    'excursion-savings',
    'stateroom-comparison',
  ].map(slug => ({
    url: `${baseUrl}/guides/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // Travel Hacks pages
  const travelHacksPages: MetadataRoute.Sitemap = [
    'fly-free-to-cruise-port',
    'free-trip-insurance',
    'best-cards-for-cruises',
    'best-cruise-credit-cards',
    'compare-cards',
    'stack-points-free-cruise',
    'cruise-port-lounge-access',
  ].map(slug => ({
    url: `${baseUrl}/travel-hacks/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // Port guide pages
  const portGuidePages: MetadataRoute.Sitemap = ['castaway-cay', 'lookout-cay', 'cozumel', 'nassau', 'port-canaveral'].map(slug => ({
    url: `${baseUrl}/guides/ports/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))
  portGuidePages.push({
    url: `${baseUrl}/guides/ports`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  })

  // Destination port guide pages (/ports/[slug])
  const destinationPortPages: MetadataRoute.Sitemap = destinationPorts.map(p => ({
    url: `${baseUrl}/ports/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.85,
  }))

  // Blog pages
  const posts = getBlogPosts()
  const blogPages: MetadataRoute.Sitemap = posts.map(p => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...sailingPages,
    ...shipPages,
    ...hotelPages,
    ...transferPages,
    ...guidePages,
    ...portGuidePages,
    ...destinationPortPages,
    ...travelHacksPages,
    ...blogPages,
  ]
}
