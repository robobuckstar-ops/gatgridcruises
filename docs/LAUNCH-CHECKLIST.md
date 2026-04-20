# GatGridCruises — Launch Checklist

## Phase 1: Local Setup (Day 1)

- [ ] Unpack project (`tar -xzf gatgridcruises.tar.gz`)
- [ ] Run `npm install`
- [ ] Run `npm run dev` — confirm site loads at localhost:3000
- [ ] Browse all major pages: homepage, deals, sailing detail, cost calculator, guides
- [ ] Copy `.env.local.example` to `.env.local`

## Phase 2: GitHub (Day 1)

- [ ] Create new repo at github.com/[your-username]/gatgridcruises (private recommended until launch)
- [ ] `git remote add origin git@github.com:[your-username]/gatgridcruises.git`
- [ ] `git push -u origin main`
- [ ] Verify all files appear in GitHub

## Phase 3: Vercel Deployment (Day 1-2)

- [ ] Sign up / log in at [vercel.com](https://vercel.com)
- [ ] Click "Import Project" → select your GitHub repo
- [ ] Framework preset: Next.js (auto-detected)
- [ ] Add environment variables (from .env.local.example):
  - [ ] `NEXT_PUBLIC_SITE_URL` = `https://gatgridcruises.com` (or your Vercel URL initially)
  - [ ] `CRON_SECRET` = generate with `openssl rand -hex 32`
  - [ ] `ADMIN_ALLOWED_EMAILS` = `robobuckstar@gmail.com`
- [ ] Deploy — confirm build succeeds
- [ ] Test the deployed site on [your-project].vercel.app

## Phase 4: Domain (Day 2)

- [ ] Purchase gatgridcruises.com (if not already owned)
- [ ] In Vercel: Settings → Domains → Add `gatgridcruises.com`
- [ ] Update DNS records as Vercel instructs (either nameservers or CNAME)
- [ ] Wait for DNS propagation (can take up to 48 hours)
- [ ] Verify HTTPS works at https://gatgridcruises.com
- [ ] Update `NEXT_PUBLIC_SITE_URL` in Vercel env vars to production domain

## Phase 5: Supabase (Day 3-5)

- [ ] Create project at [supabase.com](https://supabase.com)
- [ ] Run `scripts/setup-supabase.sh` or paste `supabase/migrations/001_initial_schema.sql` in SQL Editor
- [ ] Add Supabase env vars to Vercel:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Seed production database with data from `src/data/` files
- [ ] Update `src/lib/data.ts` to use Supabase queries instead of local data
- [ ] Test auth flow (signup, login, admin access)
- [ ] Verify RLS policies work (public can read, admin can write)
- [ ] Redeploy

## Phase 6: Email (Day 5-7)

- [ ] Sign up at [resend.com](https://resend.com)
- [ ] Verify your sending domain (gatgridcruises.com)
- [ ] Add `RESEND_API_KEY` to Vercel env vars
- [ ] Test subscription flow (sign up → confirmation email)
- [ ] Trigger a test digest email via `/api/cron/digest`
- [ ] Verify cron job runs on schedule (Vercel dashboard → Cron Jobs)

## Phase 7: Compliance (Day 7-10)

- [ ] **Send the Boardwalk compliance email** — review `docs/boardwalk-compliance-email.html`
  - Copy HTML into your email client or send via Resend
  - Address to: Boardwalk Travel Agency compliance team
  - Wait for written approval before going public
- [ ] Review all disclosures page content (`/disclosures`)
- [ ] Review privacy policy (`/privacy`)
- [ ] Review terms of use (`/terms`)
- [ ] Ensure all affiliate links have proper disclosure badges
- [ ] Add Google Analytics / privacy-friendly analytics (optional)

## Phase 8: Monetization (Day 10-14)

- [ ] Apply for Google AdSense at [google.com/adsense](https://www.google.com/adsense)
  - Site needs some traffic + content indexed first — may take 1-2 weeks for approval
  - Add `GOOGLE_ADSENSE_CLIENT_ID` to Vercel env vars once approved
- [ ] Sign up for affiliate programs:
  - [ ] [Booking.com Affiliate](https://www.booking.com/affiliate-program) → add `BOOKING_AFFILIATE_ID`
  - [ ] [Skyscanner Partners](https://partners.skyscanner.net) → add `SKYSCANNER_API_KEY`
  - [ ] [Expedia Affiliate](https://www.expediapartnersolutions.com) → add `EXPEDIA_AFFILIATE_ID`
- [ ] Update affiliate URLs in `src/app/go/[...slug]/route.ts` with real partner IDs

## Phase 9: SEO & Launch (Day 14+)

- [ ] Submit sitemap to Google Search Console (`https://gatgridcruises.com/sitemap.xml`)
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify robots.txt is accessible (`/robots.txt`)
- [ ] Test Open Graph tags with [opengraph.xyz](https://www.opengraph.xyz/)
- [ ] Test structured data with [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Share on social media / Disney cruise communities
- [ ] Monitor Google Search Console for indexing progress
- [ ] Set up uptime monitoring (UptimeRobot, Vercel, etc.)

## Ongoing Maintenance

- [ ] Monitor cron job health in Vercel dashboard
- [ ] Check scraper logs for errors weekly
- [ ] Update sailing data as new Disney sailings are announced
- [ ] Publish new guide content monthly for SEO growth
- [ ] Review ad revenue and optimize placements
- [ ] Respond to subscriber feedback

---

Estimated timeline: **2 weeks from start to full launch**
Minimum viable launch (local data, no Supabase): **Same day**
