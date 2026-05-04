import { MetadataRoute } from 'next'
import { getSailings, getShips, getPorts, getHotelsForPort, getBlogPosts } from '@/lib/data'
import { destinationPorts } from '@/data/destination-ports'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gatgridcruises.com'

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/deals`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/deals/last-minute`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/alerts`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/ships`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/ports`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/guides`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/travel-hacks`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/solo-cruising`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/community`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/community/sail-together`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/hotels`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/tools/cost-calculator`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
{ url: `${baseUrl}/tools/flights`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/tools/staterooms`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/tools/staterooms/reviews`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/tools/transfers`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/tools/compare`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/book`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/newsletter`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/subscribe`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.4 },
    { url: `${baseUrl}/disclosures`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
  ]

  // Sailing pages
  const sailings = getSailings()
  const sailingPages = sailings.map(s => ({
    url: `${baseUrl}/sailing/${s.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  // Ship pages
  const ships = getShips()
  const shipPages = ships.map(s => ({
    url: `${baseUrl}/ships/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Port hotel pages
  const ports = getPorts()
  const hotelPages = ports
    .filter(p => getHotelsForPort(p.id).length > 0)
    .map(p => ({
      url: `${baseUrl}/hotels/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

  // Transfer pages
  const transferPages = ports
    .filter(p => getHotelsForPort(p.id).length > 0)
    .map(p => ({
      url: `${baseUrl}/tools/transfers/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

  // Guide pages
  const guidePages = [
    'disney-cruise-cost-guide',
    'best-disney-cruise-staterooms',
    'port-canaveral-vs-miami',
    'first-time-disney-cruise-tips',
    'disney-cruise-with-toddlers',
    'castaway-cay-guide',
    'disney-cruise-packing-list',
    'disney-cruise-vs-royal-caribbean',
    'best-time-to-book-disney-cruise',
    'disney-cruise-food-guide',
    'travel-hacks-credit-cards',
    'packing-gear',
    'travel-insurance',
  ].map(slug => ({
    url: `${baseUrl}/guides/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Travel Hacks pages
  const travelHacksPages = [
    'fly-free-to-cruise-port',
    'free-trip-insurance',
    'best-cards-for-cruises',
    'compare-cards',
    'stack-points-free-cruise',
    'cruise-port-lounge-access',
  ].map(slug => ({
    url: `${baseUrl}/travel-hacks/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Port guide pages
  const portGuidePages = ['castaway-cay', 'lookout-cay', 'cozumel', 'nassau', 'port-canaveral'].map(slug => ({
    url: `${baseUrl}/guides/ports/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))
  portGuidePages.push({
    url: `${baseUrl}/guides/ports`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  })

  // Destination port guide pages (/ports/[slug])
  const destinationPortPages = destinationPorts.map(p => ({
    url: `${baseUrl}/ports/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  // Blog pages
  const posts = getBlogPosts()
  const blogPages = posts.map(p => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...sailingPages, ...shipPages, ...hotelPages, ...transferPages, ...guidePages, ...portGuidePages, ...destinationPortPages, ...travelHacksPages, ...blogPages]
}
