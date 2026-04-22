import type { Sailing, Ship } from '@/types/database'

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GatGridCruises',
    url: 'https://gatgridcruises.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://gatgridcruises.com/favicon.svg',
    },
    description: 'Disney cruise planning tools, deal tracking, and honest advice updated daily.',
    sameAs: [],
  }
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'GatGridCruises',
    url: 'https://gatgridcruises.com',
    description: 'Disney cruise planning tools, deal tracking, and honest advice.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://gatgridcruises.com/deals?search={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generateSailingSchema(sailing: Sailing) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: sailing.itinerary_name,
    description: `${sailing.itinerary_name} aboard Disney ${sailing.ship?.name?.replace('Disney ', '') ?? 'Cruise Line'}. ${sailing.length_nights} nights departing ${sailing.sail_date}.`,
    touristType: 'Family',
    provider: {
      '@type': 'Organization',
      name: 'Disney Cruise Line',
    },
    offers: {
      '@type': 'Offer',
      price: sailing.current_lowest_price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString(),
    },
    itinerary: {
      '@type': 'ItemList',
      itemListElement: sailing.itinerary_details?.map((day, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `Day ${day.day}: ${day.port}`,
        description: day.description,
      })),
    },
  }
}

export function generateShipSchema(ship: Ship) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Vehicle',
    name: ship.name,
    description: ship.editorial_take,
    manufacturer: {
      '@type': 'Organization',
      name: 'Disney Cruise Line',
    },
    vehicleConfiguration: `${ship.capacity} passengers, ${ship.tonnage.toLocaleString()} GT`,
    dateVehicleFirstRegistered: ship.year_launched.toString(),
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateFAQSchema(questions: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  }
}

export function generateArticleSchema(post: {
  title: string
  description: string
  content: string
  slug: string
  publishedAt: string
  updatedAt?: string
  author?: { name: string }
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.image || 'https://gatgridcruises.com/favicon.svg',
    url: `https://gatgridcruises.com/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: post.author
      ? {
          '@type': 'Person',
          name: post.author.name,
        }
      : {
          '@type': 'Organization',
          name: 'GatGridCruises',
        },
    publisher: {
      '@type': 'Organization',
      name: 'GatGridCruises',
      logo: {
        '@type': 'ImageObject',
        url: 'https://gatgridcruises.com/favicon.svg',
      },
    },
    mainEntity: {
      '@type': 'Article',
      headline: post.title,
    },
  }
}

export function generateTouristTripSchema(sailing: Sailing) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: sailing.itinerary_name,
    description: `${sailing.itinerary_name} aboard Disney ${sailing.ship?.name?.replace('Disney ', '') ?? 'Cruise Line'}. ${sailing.length_nights} nights departing ${sailing.sail_date}.`,
    touristType: 'Family',
    url: `https://gatgridcruises.com/sailing/${sailing.id}`,
    provider: {
      '@type': 'Organization',
      name: 'Disney Cruise Line',
    },
    offers: {
      '@type': 'Offer',
      price: sailing.current_lowest_price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString(),
      url: `https://gatgridcruises.com/sailing/${sailing.id}`,
    },
    itinerary: sailing.itinerary_details
      ? {
          '@type': 'ItemList',
          itemListElement: sailing.itinerary_details.map((day, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: `Day ${day.day}: ${day.port}`,
            description: day.description,
          })),
        }
      : undefined,
  }
}
