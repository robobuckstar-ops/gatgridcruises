# GatGridCruises

**Magically Valuable Disney Cruises**

A Disney cruise planning and deal discovery platform. Not a booking site — an ad-supported media and tools property for families who want transparent, honest information before committing to a Disney cruise.

## Tech Stack

- **Framework**: Next.js 15 (App Router, Server Components)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + custom design tokens (navy #0A2540, gold #D4AF37)
- **Database**: Supabase (Postgres + Auth + RLS) — local seed data for MVP
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Fonts**: Inter (body) + Fraunces (headings)
- **Email**: Resend (transactional + weekly digest)
- **Hosting**: Vercel (with cron jobs)

## Quick Start

```bash
# 1. Clone and install
git clone <repo-url>
cd gatgridcruises
npm install

# 2. Set up environment (optional — app works without it using local seed data)
cp .env.local.example .env.local

# 3. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The app runs fully with local seed data out of the box — no Supabase or API keys needed for development.

## Project Structure

```
src/
├── app/                        # Next.js App Router (40 pages)
│   ├── page.tsx                # Homepage
│   ├── deals/                  # Deal grid with filters + sorting
│   ├── sailing/[id]/           # Sailing detail (price chart, itinerary, CTA)
│   ├── ships/                  # Ship index + detail pages
│   ├── guides/                 # 10 SEO pillar content pages
│   ├── tools/
│   │   ├── cost-calculator/    # True cost calculator (15+ categories)
│   │   ├── flights/            # Flight finder for departure ports
│   │   ├── staterooms/         # Stateroom finder + reviews
│   │   ├── transfers/          # Transfer decision tool
│   │   └── compare/            # Side-by-side sailing comparison
│   ├── hotels/                 # Pre-cruise hotel guides by port
│   ├── subscribe/              # Email newsletter signup
│   ├── account/watchlist/      # Saved sailings (localStorage → Supabase)
│   ├── auth/                   # Login/signup (magic link)
│   ├── admin/                  # Admin panel (dashboard, CRUD, ads)
│   ├── api/                    # API routes (subscribe, cron, reviews, alerts)
│   ├── go/[...slug]/           # Affiliate link wrapper with click tracking
│   ├── about/                  # About page
│   ├── disclosures/            # FTC affiliate disclosures
│   ├── privacy/                # Privacy policy
│   └── terms/                  # Terms of use
├── components/
│   ├── layout/                 # Header, Footer
│   └── ui/                     # Ad slots, chatbot, charts, cards, etc.
├── data/                       # Local seed data (ships, ports, sailings, etc.)
├── lib/                        # Utils, data access, auth, scraper, email templates
└── types/                      # TypeScript interfaces
supabase/
└── migrations/                 # Production database schema
docs/
└── boardwalk-compliance-email.html  # Boardwalk Travel Agency email draft
```

## All Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with featured deals, stats, newsletter CTA |
| `/deals` | All sailings with filters, search, sorting, score badges |
| `/sailing/[id]` | Price breakdown, history chart, itinerary, hotels, transfers |
| `/ships` | Fleet index (8 ships) |
| `/ships/[slug]` | Ship detail with staterooms, sailings, amenities |
| `/hotels` | Port hotel index |
| `/hotels/[port]` | Port-specific hotel recommendations |
| `/tools/cost-calculator` | True trip cost calculator (15+ line items) |
| `/tools/flights` | Flight search for departure ports |
| `/tools/staterooms` | Stateroom finder with noise ratings |
| `/tools/staterooms/reviews` | User stateroom reviews |
| `/tools/transfers` | Transfer guide index |
| `/tools/transfers/[port]` | Port-specific transfer recommendations |
| `/tools/compare` | Side-by-side sailing comparison |
| `/guides` | Guide hub (10 articles) |
| `/guides/disney-cruise-cost-guide` | True cost breakdown |
| `/guides/best-disney-cruise-staterooms` | Category-by-category guide |
| `/guides/port-canaveral-vs-miami` | Port comparison |
| `/guides/first-time-disney-cruise-tips` | 25 essential first-timer tips |
| `/guides/disney-cruise-with-toddlers` | Parents guide (ages 0-4) |
| `/guides/castaway-cay-guide` | Private island guide |
| `/guides/disney-cruise-packing-list` | Complete packing list |
| `/guides/disney-cruise-vs-royal-caribbean` | Line comparison |
| `/guides/best-time-to-book-disney-cruise` | Booking timing + price data |
| `/guides/disney-cruise-food-guide` | Every restaurant ranked |
| `/subscribe` | Newsletter signup |
| `/account/watchlist` | Saved sailings |
| `/auth/login` | Magic link login |
| `/auth/signup` | Account creation |
| `/admin` | Admin dashboard |
| `/admin/sailings` | Manage sailings |
| `/admin/ships` | Manage ships |
| `/admin/ports` | Manage ports |
| `/admin/hotels` | Manage hotels |
| `/admin/staterooms` | Manage staterooms |
| `/admin/transfers` | Manage transfers |
| `/admin/subscribers` | Manage subscribers |
| `/admin/ads` | Ad slot management + revenue dashboard |
| `/about` | About page |
| `/disclosures` | FTC disclosures |
| `/privacy` | Privacy policy |
| `/terms` | Terms of use |

## Key Features

- **Sailing Score Algorithm**: Weighted formula (60% price, 20% urgency, 20% ship rating)
- **Price History Charts**: Recharts-powered visualization of price trends over time
- **AI Chatbot**: Floating concierge with 12+ rule-based responses
- **Affiliate Link Tracking**: `/go/[provider]/[target]` wrapper with click logging
- **Price Scraper**: Automated daily scraping via Vercel cron (6 AM EST)
- **Weekly Digest**: Automated Sunday email with top deals (10 AM EST)
- **JSON-LD Structured Data**: TouristTrip, Vehicle, BreadcrumbList, FAQPage schemas
- **Accessibility**: Skip navigation, ARIA labels, semantic HTML, keyboard navigation

## Seed Data

The MVP includes comprehensive local seed data:
- 8 Disney ships with full metadata
- 10 departure ports worldwide
- 18 sample sailings with realistic pricing
- 810 price snapshots (45 days × 18 sailings, 5 price patterns)
- 242 staterooms across all 8 ships
- 42 pre-cruise hotels across 7 ports
- Transfer options for all ports

## Deployment to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add RESEND_API_KEY
vercel env add CRON_SECRET
vercel env add ADMIN_ALLOWED_EMAILS
```

Or connect your GitHub repo to Vercel for automatic deployments on every push.

## Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Go to SQL Editor → paste contents of `supabase/migrations/001_initial_schema.sql`
3. Run the migration — creates 10 tables with RLS policies, indexes, and triggers
4. Copy your project URL and keys to `.env.local`
5. Update `src/lib/data.ts` to use Supabase queries instead of local data

## Legal

- Independently owned and operated
- Not affiliated with The Walt Disney Company or Disney Cruise Line
- Disney Cruise Line® and related ship names are registered trademarks of The Walt Disney Company

---

Built with care by Grayson Starbuck.
