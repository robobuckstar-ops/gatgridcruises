# Brevo Email Templates

These HTML files are pre-rendered exports of the email templates in
`src/lib/email-templates.ts`. They are intended for upload into Brevo as
reusable **Marketing templates** so the same copy can be triggered via
Automation / Campaigns instead of (or in addition to) the transactional cron
at `src/app/api/cron/lead-nurture/route.ts`.

## Upload procedure

1. In Brevo → **Campaigns → Email → Templates**, click **Create a new
   template**.
2. Choose **Import HTML file**, paste the contents of the file, and use the
   suggested subject line.
3. Save the template and note the template ID — Brevo Automation can then
   reference it.

## Personalization

The exports use Brevo's Twig-style placeholders so contact attributes flow
through automatically:

- `{{ contact.FIRSTNAME | default: "there" }}` — the lead's first name.
- `{{ contact.UNSUB_TOKEN | default: "" }}` — unsubscribe token (newsletter
  templates only).

If you upload the file as-is, Brevo will substitute these on send.

## Template index

| File | Subject | When to trigger |
| ---- | ------- | --------------- |
| `00-lead-magnet-delivery.html` | Your free Disney Cruise Insider's Guide is here | Submission of lead-magnet form (POST /api/lead-magnet) |
| `01-lead-nurture-day-1-welcome.html` | Thanks for reaching out — here are some resources | Day 1 after first contact (lead created in Airtable / Brevo) |
| `02-lead-nurture-day-3-value.html` | Quick question about your Disney cruise plans | Day 3 after first contact |
| `03-lead-nurture-day-7-social-proof.html` | What other families are saying about GatGrid Cruises | Day 7 after first contact |
| `04-lead-nurture-day-14-urgency.html` | Disney cruise prices are moving — here's what to know | Day 14 after first contact |
| `05-lead-nurture-day-21-ship-choice.html` | Which Disney ship is right for your family? | Day 21 after first contact |
| `06-lead-nurture-day-30-last-chance.html` | Still thinking about a Disney cruise? | Day 30 after first contact |
| `07-lead-nurture-day-45-soft-close.html` | A friendly goodbye for now — keep in touch | Day 45 after first contact |
| `10-newsletter-welcome-1.html` | Welcome to GatGrid Cruises — your first deal alert is ready | Confirmed subscribe to the weekly newsletter |
| `11-newsletter-welcome-2.html` | How GatGrid finds Disney cruise deals | Day 3 after newsletter subscribe |
| `12-newsletter-welcome-3.html` | Ready to book? Here's how it works | Day 7 after newsletter subscribe |

## Lead-magnet flow

The PDF lead-magnet at `/guides/insiders-guide` is wired to
`POST /api/lead-magnet`. That route currently sends the
`leadMagnetDeliveryEmail` template via Brevo's transactional API. If you'd
rather drive the same delivery through a Brevo Automation, upload
`00-lead-magnet-delivery.html` and switch the route to add the contact only
(letting the automation handle delivery).

## Regenerating

Templates are exported from `src/lib/email-templates.ts` — when copy changes
there, re-run the export so the HTML stays in sync:

```bash
npx tsx scripts/export-brevo-templates.ts
```
