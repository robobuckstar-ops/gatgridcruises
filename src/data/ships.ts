import type { Ship } from '@/types/database'

export const ships: Ship[] = [
  {
    id: 'ship-0001',
    name: 'Disney Magic',
    slug: 'disney-magic',
    year_launched: 1998,
    capacity: 2713,
    tonnage: 83969,
    highlights: [
      'The original Disney cruise ship with timeless elegance',
      'Intimate atmosphere perfect for families seeking classic Disney magic',
      'Multiple themed dining venues including The Animator\'s Palate',
      'Beautiful atrium and classic interior design',
      'Excellent for first-time cruisers'
    ],
    whats_included: [
      {
        category: 'Dining',
        items: [
          'Rotational dining across themed restaurants',
          'Room service (breakfast and light fare)',
          'Buffet dining at Lido Deck',
          'Coffee and tea service',
          'Complimentary soft drinks'
        ]
      },
      {
        category: 'Entertainment',
        items: [
          'Broadway-style theatrical productions',
          'Nightly deck parties and fireworks',
          'Live music and comedy shows',
          'Family game shows and activities',
          'Movie nights under the stars'
        ]
      },
      {
        category: 'Kids\' Clubs',
        items: [
          'Oceaneer Club (ages 3-12)',
          'Oceaneer Lab (ages 3-12)',
          'Edge (ages 11-14)',
          'Vibe (ages 14-17)',
          'Nursery services'
        ]
      },
      {
        category: 'Pools & Recreation',
        items: [
          'Multiple swimming pools',
          'Waterslides',
          'Hot tubs',
          'Fitness center access',
          'Deck games and sports'
        ]
      },
      {
        category: 'Character Meet & Greets',
        items: [
          'Daily character appearances',
          'Scheduled meet and greet times',
          'Character dining experiences',
          'Photo opportunities with beloved Disney characters'
        ]
      }
    ],
    whats_extra: [
      {
        category: 'Adult Dining',
        items: [
          { name: 'Palo (Italian)', price_range: '$45 per person' }
        ]
      },
      {
        category: 'Beverages',
        items: [
          { name: 'Alcoholic beverages', price_range: '$8-15 per drink' },
          { name: 'Beverage package', price_range: '$69 per day' }
        ]
      },
      {
        category: 'Spa & Fitness',
        items: [
          { name: 'Massages', price_range: '$150-250 per session' },
          { name: 'Facials', price_range: '$180-250 per session' },
          { name: 'Specialty treatments', price_range: '$200-350 per session' }
        ]
      },
      {
        category: 'Port Adventures',
        items: [
          { name: 'Shore excursions', price_range: '$50-500 per person' }
        ]
      },
      {
        category: 'Photo Package',
        items: [
          { name: 'Digital or physical photos', price_range: '$199-349' }
        ]
      },
      {
        category: 'Internet',
        items: [
          { name: 'Daily WiFi pass', price_range: '$12 per day' },
          { name: 'Unlimited WiFi (full cruise)', price_range: '$69-89 per cruise' }
        ]
      },
      {
        category: 'Kids\' Extras',
        items: [
          { name: 'Bibbidi Bobbidi Boutique', price_range: '$70-200' }
        ]
      }
    ],
    editorial_take: 'The Disney Magic is where the Disney Cruise Line dream began, and it still delivers all the charm and character you\'d expect from the original. While smaller than its newer siblings, that\'s actually its greatest strength—the ship feels intimate and personal rather than overwhelming. Perfect for first-timers or anyone who prefers a cozier cruise experience.',
    hero_image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Disney_Magic_%28ship%2C_1998%29_001.jpg/1280px-Disney_Magic_%28ship%2C_1998%29_001.jpg',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z'
  },
  {
    id: 'ship-0002',
    name: 'Disney Wonder',
    slug: 'disney-wonder',
    year_launched: 1999,
    capacity: 2713,
    tonnage: 83969,
    highlights: [
      'Sister ship to Disney Magic with proven cruise excellence',
      'Stunning art collection throughout the ship',
      'Exceptional value for classic Disney cruise experience',
      'Wonder-ful theming and attention to detail',
      'Perfect for guests who love traditional elegance'
    ],
    whats_included: [
      {
        category: 'Dining',
        items: [
          'Rotational dining across themed restaurants',
          'Room service (breakfast and light fare)',
          'Buffet dining at Lido Deck',
          'Coffee and tea service',
          'Complimentary soft drinks'
        ]
      },
      {
        category: 'Entertainment',
        items: [
          'Broadway-style theatrical productions',
          'Nightly deck parties and fireworks',
          'Live music performances',
          'Comedy shows and entertainment',
          'Movie nights under the stars'
        ]
      },
      {
        category: 'Kids\' Clubs',
        items: [
          'Oceaneer Club (ages 3-12)',
          'Oceaneer Lab (ages 3-12)',
          'Edge (ages 11-14)',
          'Vibe (ages 14-17)',
          'Nursery services'
        ]
      },
      {
        category: 'Pools & Recreation',
        items: [
          'Multiple swimming pools',
          'Waterslides',
          'Hot tubs',
          'Fitness center access',
          'Deck activities and tournaments'
        ]
      },
      {
        category: 'Character Meet & Greets',
        items: [
          'Daily character appearances',
          'Scheduled meet and greet times',
          'Character dining experiences',
          'Photo opportunities with beloved Disney characters'
        ]
      }
    ],
    whats_extra: [
      {
        category: 'Adult Dining',
        items: [
          { name: 'Palo (Italian)', price_range: '$45 per person' }
        ]
      },
      {
        category: 'Beverages',
        items: [
          { name: 'Alcoholic beverages', price_range: '$8-15 per drink' },
          { name: 'Beverage package', price_range: '$69 per day' }
        ]
      },
      {
        category: 'Spa & Fitness',
        items: [
          { name: 'Massages', price_range: '$150-250 per session' },
          { name: 'Facials', price_range: '$180-250 per session' },
          { name: 'Body treatments', price_range: '$200-350 per session' }
        ]
      },
      {
        category: 'Port Adventures',
        items: [
          { name: 'Shore excursions', price_range: '$50-500 per person' }
        ]
      },
      {
        category: 'Photo Package',
        items: [
          { name: 'Digital or physical photos', price_range: '$199-349' }
        ]
      },
      {
        category: 'Internet',
        items: [
          { name: 'Daily WiFi pass', price_range: '$12 per day' },
          { name: 'Unlimited WiFi (full cruise)', price_range: '$69-89 per cruise' }
        ]
      },
      {
        category: 'Kids\' Extras',
        items: [
          { name: 'Bibbidi Bobbidi Boutique', price_range: '$70-200' }
        ]
      }
    ],
    editorial_take: 'The Disney Wonder proves that bigger isn\'t always better. This beautifully maintained classic delivers an authentic Disney cruise experience without the sensory overload of mega-ships. If you\'ve watched the Disney Cruise Line grow and miss the original magic, the Wonder is your ship.',
    hero_image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Disney_Wonder_at_Port_Canaveral.jpg/1280px-Disney_Wonder_at_Port_Canaveral.jpg',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z'
  },
  {
    id: 'ship-0003',
    name: 'Disney Dream',
    slug: 'disney-dream',
    year_launched: 2011,
    capacity: 4000,
    tonnage: 129690,
    highlights: [
      'Interactive AquaDuck watercoaster spanning four decks',
      'Cutting-edge entertainment with immersive shows',
      'Midship Bar serving craft cocktails',
      'Modern technology with touchscreen dining menus',
      'Perfect blend of innovation and Disney magic'
    ],
    whats_included: [
      {
        category: 'Dining',
        items: [
          'Rotational dining across themed restaurants',
          'Room service (breakfast and light fare)',
          'Buffet dining at Lido Deck',
          'Coffee and tea service',
          'Complimentary soft drinks and juice'
        ]
      },
      {
        category: 'Entertainment',
        items: [
          'Broadway-caliber theatrical shows',
          'Nightly deck parties and fireworks',
          'Live music venues and entertainment',
          'Family-friendly shows and activities',
          'Poolside movies and entertainment'
        ]
      },
      {
        category: 'Kids\' Clubs',
        items: [
          'Oceaneer Club (ages 3-12)',
          'Oceaneer Lab (ages 3-12)',
          'Edge (ages 11-14)',
          'Vibe (ages 14-17)',
          'Nursery services with programming'
        ]
      },
      {
        category: 'Pools & Recreation',
        items: [
          'Multiple themed pools',
          'AquaDuck watercoaster',
          'Splash pad for young children',
          'Fitness center with classes',
          'Basketball court and mini golf'
        ]
      },
      {
        category: 'Character Meet & Greets',
        items: [
          'Daily character appearances',
          'Scheduled meet and greet times',
          'Character dining experiences',
          'Photo opportunities with Disney characters'
        ]
      }
    ],
    whats_extra: [
      {
        category: 'Adult Dining',
        items: [
          { name: 'Palo (Italian)', price_range: '$45 per person' },
          { name: 'Remy (French)', price_range: '$125 per person' }
        ]
      },
      {
        category: 'Beverages',
        items: [
          { name: 'Alcoholic beverages', price_range: '$8-15 per drink' },
          { name: 'Beverage package', price_range: '$69 per day' }
        ]
      },
      {
        category: 'Spa & Fitness',
        items: [
          { name: 'Spa treatments', price_range: '$150-300 per session' },
          { name: 'Personal training', price_range: '$75-150 per session' },
          { name: 'Thermal suite access', price_range: '$20-35 per day' }
        ]
      },
      {
        category: 'Port Adventures',
        items: [
          { name: 'Shore excursions', price_range: '$50-500 per person' }
        ]
      },
      {
        category: 'Photo Package',
        items: [
          { name: 'Digital or physical photos', price_range: '$199-349' }
        ]
      },
      {
        category: 'Internet',
        items: [
          { name: 'Daily WiFi pass', price_range: '$12 per day' },
          { name: 'Unlimited WiFi (full cruise)', price_range: '$69-89 per cruise' }
        ]
      },
      {
        category: 'Kids\' Extras',
        items: [
          { name: 'Bibbidi Bobbidi Boutique', price_range: '$70-200' },
          { name: 'Flounder\'s Reef Nursery', price_range: '$15-18 per hour' }
        ]
      }
    ],
    editorial_take: 'The Disney Dream represented a quantum leap in ship size and technology when it launched, and it still feels modern today. The AquaDuck is genuinely thrilling, and the entertainment here is next-level. This is the sweet spot for families who want innovation without losing the Disney magic.',
    hero_image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Disney_Dream_%28ship%2C_2011%29_001.jpg/1280px-Disney_Dream_%28ship%2C_2011%29_001.jpg',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z'
  },
  {
    id: 'ship-0004',
    name: 'Disney Fantasy',
    slug: 'disney-fantasy',
    year_launched: 2012,
    capacity: 4000,
    tonnage: 129750,
    highlights: [
      'Remy restaurant with French culinary excellence',
      'Enchanted Garden dining with magical ambiance',
      'AquaDuck watercoaster with thrilling drops',
      'Stunning atrium and contemporary design',
      'Advanced Castaway Club personalization'
    ],
    whats_included: [
      {
        category: 'Dining',
        items: [
          'Rotational dining across themed restaurants',
          'Room service (breakfast and light fare)',
          'Buffet dining at Lido Deck',
          'Coffee and tea service',
          'Complimentary soft drinks and beverages'
        ]
      },
      {
        category: 'Entertainment',
        items: [
          'Broadway-style theatrical shows',
          'Nightly entertainment and deck parties',
          'Live music venues',
          'Family shows and entertainment',
          'Movie nights and poolside events'
        ]
      },
      {
        category: 'Kids\' Clubs',
        items: [
          'Oceaneer Club (ages 3-12)',
          'Oceaneer Lab (ages 3-12)',
          'Edge (ages 11-14)',
          'Vibe (ages 14-17)',
          'Nursery with activities and nap time'
        ]
      },
      {
        category: 'Pools & Recreation',
        items: [
          'Multiple themed swimming pools',
          'AquaDuck watercoaster',
          'Splash pad for toddlers',
          'Fitness center with group classes',
          'Sports deck activities'
        ]
      },
      {
        category: 'Character Meet & Greets',
        items: [
          'Daily character appearances throughout ship',
          'Scheduled meet and greet times',
          'Character dining experiences',
          'Photo opportunities with Disney characters'
        ]
      }
    ],
    whats_extra: [
      {
        category: 'Adult Dining',
        items: [
          { name: 'Palo (Italian)', price_range: '$45 per person' },
          { name: 'Remy (French)', price_range: '$125 per person' }
        ]
      },
      {
        category: 'Beverages',
        items: [
          { name: 'Alcoholic beverages', price_range: '$8-15 per drink' },
          { name: 'Beverage package', price_range: '$69 per day' }
        ]
      },
      {
        category: 'Spa & Fitness',
        items: [
          { name: 'Spa and wellness treatments', price_range: '$150-300 per session' },
          { name: 'Salon services', price_range: '$50-150 per service' },
          { name: 'Thermal suite access', price_range: '$20-35 per day' }
        ]
      },
      {
        category: 'Port Adventures',
        items: [
          { name: 'Shore excursions', price_range: '$50-500 per person' }
        ]
      },
      {
        category: 'Photo Package',
        items: [
          { name: 'Digital or physical photos', price_range: '$199-349' }
        ]
      },
      {
        category: 'Internet',
        items: [
          { name: 'Daily WiFi pass', price_range: '$12 per day' },
          { name: 'Unlimited WiFi (full cruise)', price_range: '$69-89 per cruise' }
        ]
      },
      {
        category: 'Kids\' Extras',
        items: [
          { name: 'Bibbidi Bobbidi Boutique', price_range: '$70-200' },
          { name: 'Flounder\'s Reef Nursery', price_range: '$15-18 per hour' }
        ]
      }
    ],
    editorial_take: 'The Disney Fantasy is where Disney Cruise Line proved they could innovate with confidence. Remy is genuinely one of the best restaurants at sea, and the overall experience balances luxury with family-friendly fun beautifully. If you\'re willing to spend a bit extra, this ship will reward you with exceptional memories.',
    hero_image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/AIDAblu_and_Disney_Fantasy.jpg/1280px-AIDAblu_and_Disney_Fantasy.jpg',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z'
  },
  {
    id: 'ship-0005',
    name: 'Disney Wish',
    slug: 'disney-wish',
    year_launched: 2022,
    capacity: 4000,
    tonnage: 144000,
    highlights: [
      'First-ever Disney attraction at sea with Rapunzel\'s Tower climb',
      'Enchanté by Chef Jérôme Bompard representing finest French cuisine',
      'Marvel-themed dining and entertainment',
      'Advanced digital personalization throughout ship',
      'The most technologically advanced Disney ship'
    ],
    whats_included: [
      {
        category: 'Dining',
        items: [
          'Rotational dining across themed restaurants',
          'Room service with expanded menu',
          'Buffet at Lido Deck',
          'Coffee and tea service',
          'Complimentary soft drinks and juice'
        ]
      },
      {
        category: 'Entertainment',
        items: [
          'Immersive theatrical productions',
          'Nightly deck parties and pyrotechnics',
          'Live music and entertainment venues',
          'Disney original shows',
          'Interactive family entertainment'
        ]
      },
      {
        category: 'Kids\' Clubs',
        items: [
          'Oceaneer Club (ages 3-12)',
          'Oceaneer Lab (ages 3-12)',
          'Edge (ages 11-14)',
          'Vibe (ages 14-17)',
          'Nursery with expanded hours'
        ]
      },
      {
        category: 'Pools & Recreation',
        items: [
          'Multiple themed pools',
          'Rapunzel\'s Tower climbing experience',
          'Splash pad and play areas',
          'State-of-the-art fitness center',
          'Deck games and sports activities'
        ]
      },
      {
        category: 'Character Meet & Greets',
        items: [
          'Daily character appearances and experiences',
          'Scheduled meet and greet times',
          'Character dining opportunities',
          'Photo experiences with Disney characters'
        ]
      }
    ],
    whats_extra: [
      {
        category: 'Adult Dining',
        items: [
          { name: 'Palo (Italian)', price_range: '$45 per person' },
          { name: 'Enchanté by Chef Jérôme Bompard (French)', price_range: '$145 per person' }
        ]
      },
      {
        category: 'Beverages',
        items: [
          { name: 'Alcoholic beverages', price_range: '$8-16 per drink' },
          { name: 'Beverage package', price_range: '$74 per day' }
        ]
      },
      {
        category: 'Spa & Fitness',
        items: [
          { name: 'Spa treatments and wellness', price_range: '$150-350 per session' },
          { name: 'Salon services', price_range: '$50-200 per service' },
          { name: 'Thermal suite', price_range: '$20-35 per day' }
        ]
      },
      {
        category: 'Port Adventures',
        items: [
          { name: 'Shore excursions and experiences', price_range: '$50-500 per person' }
        ]
      },
      {
        category: 'Photo Package',
        items: [
          { name: 'Digital and physical photos', price_range: '$199-399' }
        ]
      },
      {
        category: 'Internet',
        items: [
          { name: 'Daily WiFi pass', price_range: '$15 per day' },
          { name: 'Unlimited WiFi (full cruise)', price_range: '$79-99 per cruise' }
        ]
      },
      {
        category: 'Kids\' Extras',
        items: [
          { name: 'Bibbidi Bobbidi Boutique', price_range: '$85-300' },
          { name: 'Flounder\'s Reef Nursery', price_range: '$15-18 per hour' }
        ]
      }
    ],
    editorial_take: 'The Disney Wish is what happens when Disney decides to dream big—literally, Rapunzel\'s Tower is a real climbing experience at sea. This is the most advanced ship in the fleet with technology that actually enhances rather than distracts from the magic. Fair warning: it\'s also the most expensive, but if you want the cutting edge of Disney cruising, this is it.',
    hero_image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Disney_Wish_arriving_at_Port_Canaveral_%2802%29_%28cropped%29.jpg/1280px-Disney_Wish_arriving_at_Port_Canaveral_%2802%29_%28cropped%29.jpg',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z'
  },
  {
    id: 'ship-0006',
    name: 'Disney Treasure',
    slug: 'disney-treasure',
    year_launched: 2024,
    capacity: 4000,
    tonnage: 144000,
    highlights: [
      'Adventure-themed design with exploration spirit',
      'Treasure Ketch interactive dining experience',
      'Adventure Ocean kids club with expanded programming',
      'Modern sustainability features',
      'Live-action entertainment inspired by Disney adventures'
    ],
    whats_included: [
      {
        category: 'Dining',
        items: [
          'Rotational dining across themed restaurants',
          'Room service with expanded offerings',
          'Buffet dining at Lido Deck',
          'Coffee and tea service',
          'Complimentary soft drinks and beverages'
        ]
      },
      {
        category: 'Entertainment',
        items: [
          'Live theatrical shows with adventure themes',
          'Nightly entertainment and deck celebrations',
          'Live music venues and performances',
          'Family-friendly shows and entertainment',
          'Movie nights and entertainment experiences'
        ]
      },
      {
        category: 'Kids\' Clubs',
        items: [
          'Adventure Ocean (ages 3-12) - new club concept',
          'Oceaneer Lab (ages 3-12)',
          'Edge (ages 11-14)',
          'Vibe (ages 14-17)',
          'Nursery services and programming'
        ]
      },
      {
        category: 'Pools & Recreation',
        items: [
          'Multiple themed pools',
          'Water play areas for all ages',
          'Modern fitness center',
          'Sports and recreation activities',
          'Outdoor deck activities'
        ]
      },
      {
        category: 'Character Meet & Greets',
        items: [
          'Daily character appearances',
          'Adventure-themed meet and greets',
          'Character dining experiences',
          'Photo opportunities with Disney characters'
        ]
      }
    ],
    whats_extra: [
      {
        category: 'Adult Dining',
        items: [
          { name: 'Palo (Italian)', price_range: '$45 per person' },
          { name: 'Enchanté by Chef Jérôme Bompard (French)', price_range: '$145 per person' }
        ]
      },
      {
        category: 'Beverages',
        items: [
          { name: 'Alcoholic beverages', price_range: '$8-16 per drink' },
          { name: 'Beverage package', price_range: '$74 per day' }
        ]
      },
      {
        category: 'Spa & Fitness',
        items: [
          { name: 'Spa and wellness treatments', price_range: '$150-350 per session' },
          { name: 'Salon services', price_range: '$50-200 per service' },
          { name: 'Thermal suite access', price_range: '$20-35 per day' }
        ]
      },
      {
        category: 'Port Adventures',
        items: [
          { name: 'Shore excursions and experiences', price_range: '$50-500 per person' }
        ]
      },
      {
        category: 'Photo Package',
        items: [
          { name: 'Digital and physical photo packages', price_range: '$199-399' }
        ]
      },
      {
        category: 'Internet',
        items: [
          { name: 'Daily WiFi pass', price_range: '$15 per day' },
          { name: 'Unlimited WiFi (full cruise)', price_range: '$79-99 per cruise' }
        ]
      },
      {
        category: 'Kids\' Extras',
        items: [
          { name: 'Bibbidi Bobbidi Boutique', price_range: '$85-300' },
          { name: 'Flounder\'s Reef Nursery', price_range: '$15-18 per hour' }
        ]
      }
    ],
    editorial_take: 'The Disney Treasure shows Disney learning from the Wish while charting its own course. The adventure-theme resonates more than some might expect, and the ship manages to feel fresh without feeling like a rehash. If you want cutting-edge experiences at a slightly better price point than the Wish, this is genuinely worth considering.',
    hero_image_url: '',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z'
  },
  {
    id: 'ship-0007',
    name: 'Disney Destiny',
    slug: 'disney-destiny',
    year_launched: 2025,
    capacity: 4000,
    tonnage: 144000,
    highlights: [
      'Next-generation Wish-class ship with enhanced design',
      'Destiny-themed deck parties and entertainment',
      'Integrated technology for seamless guest experience',
      'Exclusive dining venues with diverse menus',
      'Premium family-first design philosophy'
    ],
    whats_included: [
      {
        category: 'Dining',
        items: [
          'Rotational dining across themed restaurants',
          'Room service with contemporary menu options',
          'Buffet at Lido Deck',
          'Coffee and tea throughout the day',
          'Complimentary soft drinks and beverages'
        ]
      },
      {
        category: 'Entertainment',
        items: [
          'Original theatrical productions',
          'Nightly deck parties and entertainment',
          'Live music venues and performances',
          'Family shows and entertainment programming',
          'Interactive entertainment experiences'
        ]
      },
      {
        category: 'Kids\' Clubs',
        items: [
          'Oceaneer Club (ages 3-12) with themed activities',
          'Oceaneer Lab (ages 3-12)',
          'Edge (ages 11-14) with tech activities',
          'Vibe (ages 14-17) with cool entertainment',
          'Nursery services with flexible scheduling'
        ]
      },
      {
        category: 'Pools & Recreation',
        items: [
          'Multiple themed and activity pools',
          'Water play areas and splash pads',
          'Advanced fitness center',
          'Sports deck and recreational activities',
          'Outdoor deck experiences'
        ]
      },
      {
        category: 'Character Meet & Greets',
        items: [
          'Daily character appearances throughout ship',
          'Scheduled meet and greet experiences',
          'Character dining and interactions',
          'Professional photo opportunities'
        ]
      }
    ],
    whats_extra: [
      {
        category: 'Adult Dining',
        items: [
          { name: 'Palo (Italian)', price_range: '$45 per person' },
          { name: 'Enchanté by Chef Jérôme Bompard (French)', price_range: '$145 per person' }
        ]
      },
      {
        category: 'Beverages',
        items: [
          { name: 'Alcoholic beverages', price_range: '$8-16 per drink' },
          { name: 'Beverage package', price_range: '$74 per day' }
        ]
      },
      {
        category: 'Spa & Fitness',
        items: [
          { name: 'Spa treatments and wellness', price_range: '$150-350 per session' },
          { name: 'Salon services', price_range: '$50-200 per service' },
          { name: 'Thermal suite access', price_range: '$20-35 per day' }
        ]
      },
      {
        category: 'Port Adventures',
        items: [
          { name: 'Shore excursions and guided experiences', price_range: '$50-500 per person' }
        ]
      },
      {
        category: 'Photo Package',
        items: [
          { name: 'Digital and physical photo memories', price_range: '$199-399' }
        ]
      },
      {
        category: 'Internet',
        items: [
          { name: 'Daily WiFi pass', price_range: '$15 per day' },
          { name: 'Unlimited WiFi (full cruise)', price_range: '$79-99 per cruise' }
        ]
      },
      {
        category: 'Kids\' Extras',
        items: [
          { name: 'Bibbidi Bobbidi Boutique', price_range: '$85-300' },
          { name: 'Flounder\'s Reef Nursery', price_range: '$15-18 per hour' }
        ]
      }
    ],
    editorial_take: 'The Disney Destiny represents everything Disney has learned about modern family cruising distilled into one ship. It\'s the most refined version of the newer fleet, with all the tech and entertainment bells and whistles but without feeling experimental. This is Disney saying "we know how to do this really, really well now."',
    hero_image_url: '',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z'
  },
  {
    id: 'ship-0008',
    name: 'Disney Adventure',
    slug: 'disney-adventure',
    year_launched: 2025,
    capacity: 6700,
    tonnage: 208000,
    highlights: [
      'Revolutionary mega-ship design with innovative spaces',
      'Seven-deck family neighborhoods creating intimate communities',
      'Immersive multiverse-themed entertainment',
      'Significantly expanded dining and beverage venues',
      'The largest Disney Cruise ship ever built'
    ],
    whats_included: [
      {
        category: 'Dining',
        items: [
          'Rotational dining across multiple themed restaurants',
          'Room service with extensive menu options',
          'Buffet dining with international cuisine',
          'Coffee and tea service throughout the day',
          'Complimentary soft drinks and beverages'
        ]
      },
      {
        category: 'Entertainment',
        items: [
          'Large-scale theatrical productions',
          'Nightly deck parties with advanced production',
          'Multiple live music venues',
          'Original Disney entertainment programming',
          'Interactive immersive experiences'
        ]
      },
      {
        category: 'Kids\' Clubs',
        items: [
          'Expanded Oceaneer Club with neighborhood setting',
          'Oceaneer Lab with themed areas',
          'Edge (ages 11-14) with expanded programming',
          'Vibe (ages 14-17) with teen-focused activities',
          'Nursery services with flexible hours'
        ]
      },
      {
        category: 'Pools & Recreation',
        items: [
          'Multiple themed pool areas',
          'Water play zones and splash pads',
          'Full-service fitness center',
          'Sports facilities and activities',
          'Outdoor recreational deck areas'
        ]
      },
      {
        category: 'Character Meet & Greets',
        items: [
          'Daily character appearances and interactions',
          'Scheduled meet and greet experiences',
          'Character dining opportunities',
          'Photo experiences with beloved characters'
        ]
      }
    ],
    whats_extra: [
      {
        category: 'Adult Dining',
        items: [
          { name: 'Palo (Italian)', price_range: '$45 per person' },
          { name: 'Enchanté by Chef Jérôme Bompard (French)', price_range: '$145 per person' },
          { name: 'additional specialty dining', price_range: '$50-150 per person' }
        ]
      },
      {
        category: 'Beverages',
        items: [
          { name: 'Alcoholic beverages', price_range: '$8-16 per drink' },
          { name: 'Beverage package', price_range: '$74 per day' },
          { name: 'Premium wine and spirits', price_range: '$15-30 per drink' }
        ]
      },
      {
        category: 'Spa & Fitness',
        items: [
          { name: 'Spa treatments and wellness services', price_range: '$150-400 per session' },
          { name: 'Salon services', price_range: '$50-250 per service' },
          { name: 'Thermal suite and relaxation areas', price_range: '$20-40 per day' }
        ]
      },
      {
        category: 'Port Adventures',
        items: [
          { name: 'Shore excursions and guided tours', price_range: '$50-500 per person' }
        ]
      },
      {
        category: 'Photo Package',
        items: [
          { name: 'Digital and physical photo packages', price_range: '$199-449' }
        ]
      },
      {
        category: 'Internet',
        items: [
          { name: 'Daily WiFi pass', price_range: '$15 per day' },
          { name: 'Unlimited WiFi (full cruise)', price_range: '$79-99 per cruise' }
        ]
      },
      {
        category: 'Kids\' Extras',
        items: [
          { name: 'Bibbidi Bobbidi Boutique', price_range: '$85-450' },
          { name: 'Flounder\'s Reef Nursery', price_range: '$15-18 per hour' }
        ]
      }
    ],
    editorial_take: 'The Disney Adventure redefines what a cruise ship can be—it\'s so massive that Disney had to rethink how to make it feel personal. The neighborhood concept is genuinely clever, and with over 6,700 passengers, you\'d expect chaos but somehow it works. This is the future of cruising, whether you\'re excited or intimidated by the scale.',
    hero_image_url: '',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z'
  }
]
