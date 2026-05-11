/**
 * Exports the lead-nurture and welcome email templates as standalone HTML files
 * that can be uploaded into Brevo as reusable templates.
 *
 * Output: docs/brevo-templates/*.html  (one file per template)
 *
 * Run with: npx tsx scripts/export-brevo-templates.ts
 *
 * Brevo template variables (the parts populated per-recipient) are emitted as
 * Brevo personalization placeholders like {{ contact.FIRSTNAME }} so they can
 * be wired directly to contact attributes in the Brevo UI. The transactional
 * cron at src/app/api/cron/lead-nurture/route.ts ignores these HTML files and
 * sends inline HTML — these files exist for the Brevo Marketing campaign UI.
 */
import { writeFile, mkdir, rm } from 'node:fs/promises'
import { join } from 'node:path'
import {
  leadNurtureDay1,
  leadNurtureDay3,
  leadNurtureDay7,
  leadNurtureDay14,
  leadNurtureDay21,
  leadNurtureDay30,
  leadNurtureDay45,
  leadMagnetDeliveryEmail,
  welcomeEmail1,
  welcomeEmail2,
  welcomeEmail3,
} from '../src/lib/email-templates'

const OUT_DIR = join(process.cwd(), 'docs', 'brevo-templates')

const NAME_PLACEHOLDER = '{{ contact.FIRSTNAME | default: "there" }}'
const UNSUB_PLACEHOLDER = '{{ contact.UNSUB_TOKEN | default: "" }}'
const PDF_URL = 'https://gatgridcruises.com/downloads/disney-cruise-insiders-guide.pdf'

interface Template {
  filename: string
  subject: string
  html: string
  description: string
  trigger: string
}

const templates: Template[] = [
  {
    filename: '00-lead-magnet-delivery.html',
    subject: "Your free Disney Cruise Insider's Guide is here",
    description: 'Sent immediately after a contact submits the lead-magnet form on /guides/insiders-guide. Delivers the PDF download link.',
    trigger: 'Submission of lead-magnet form (POST /api/lead-magnet)',
    html: leadMagnetDeliveryEmail(NAME_PLACEHOLDER, PDF_URL),
  },
  {
    filename: '01-lead-nurture-day-1-welcome.html',
    subject: 'Thanks for reaching out — here are some resources',
    description: 'First touch after a lead is created. Welcome + soft-CTA to free resources.',
    trigger: 'Day 1 after first contact (lead created in Airtable / Brevo)',
    html: leadNurtureDay1(NAME_PLACEHOLDER),
  },
  {
    filename: '02-lead-nurture-day-3-value.html',
    subject: 'Quick question about your Disney cruise plans',
    description: 'Day 3 follow-up. Surfaces common questions, invites a reply.',
    trigger: 'Day 3 after first contact',
    html: leadNurtureDay3(NAME_PLACEHOLDER),
  },
  {
    filename: '03-lead-nurture-day-7-social-proof.html',
    subject: 'What other families are saying about GatGrid Cruises',
    description: 'Day 7. Two short client testimonials plus the CURE.org giving angle.',
    trigger: 'Day 7 after first contact',
    html: leadNurtureDay7(NAME_PLACEHOLDER),
  },
  {
    filename: '04-lead-nurture-day-14-urgency.html',
    subject: 'Disney cruise prices are moving — here\'s what to know',
    description: 'Day 14. Why booking earlier wins; post-booking price monitoring perk.',
    trigger: 'Day 14 after first contact',
    html: leadNurtureDay14(NAME_PLACEHOLDER),
  },
  {
    filename: '05-lead-nurture-day-21-ship-choice.html',
    subject: 'Which Disney ship is right for your family?',
    description: 'Day 21. Editorial guidance on picking a ship for different traveller types.',
    trigger: 'Day 21 after first contact',
    html: leadNurtureDay21(NAME_PLACEHOLDER),
  },
  {
    filename: '06-lead-nurture-day-30-last-chance.html',
    subject: 'Still thinking about a Disney cruise?',
    description: 'Day 30. Last active nudge before the soft-close. Lists ways we can help.',
    trigger: 'Day 30 after first contact',
    html: leadNurtureDay30(NAME_PLACEHOLDER),
  },
  {
    filename: '07-lead-nurture-day-45-soft-close.html',
    subject: 'A friendly goodbye for now — keep in touch',
    description: 'Day 45. Polite end-of-sequence. Offers passive opt-ins (price alerts, digest).',
    trigger: 'Day 45 after first contact',
    html: leadNurtureDay45(NAME_PLACEHOLDER),
  },
  {
    filename: '10-newsletter-welcome-1.html',
    subject: 'Welcome to GatGrid Cruises — your first deal alert is ready',
    description: 'Newsletter welcome email #1. Sent on initial subscribe to the weekly digest.',
    trigger: 'Confirmed subscribe to the weekly newsletter',
    html: welcomeEmail1(NAME_PLACEHOLDER, UNSUB_PLACEHOLDER, [
      { name: 'Disney Wish 4-Night Bahamas', ship: 'Disney Wish', sailDate: '2026-09-12', nights: 4, price: 1899, percentBelow: 22 },
      { name: 'Disney Fantasy 7-Night Eastern Caribbean', ship: 'Disney Fantasy', sailDate: '2026-10-03', nights: 7, price: 2799, percentBelow: 18 },
      { name: 'Disney Treasure 6-Night Western Caribbean', ship: 'Disney Treasure', sailDate: '2026-11-14', nights: 6, price: 2349, percentBelow: 15 },
    ]),
  },
  {
    filename: '11-newsletter-welcome-2.html',
    subject: 'How GatGrid finds Disney cruise deals',
    description: 'Newsletter welcome email #2. Educates on our deal-scoring system.',
    trigger: 'Day 3 after newsletter subscribe',
    html: welcomeEmail2(NAME_PLACEHOLDER, UNSUB_PLACEHOLDER),
  },
  {
    filename: '12-newsletter-welcome-3.html',
    subject: 'Ready to book? Here\'s how it works',
    description: 'Newsletter welcome email #3. Explains the concierge booking process.',
    trigger: 'Day 7 after newsletter subscribe',
    html: welcomeEmail3(NAME_PLACEHOLDER, UNSUB_PLACEHOLDER),
  },
]

function readme(): string {
  const rows = templates
    .map(
      (t) =>
        `| \`${t.filename}\` | ${t.subject} | ${t.trigger} |`
    )
    .join('\n')

  return `# Brevo Email Templates

These HTML files are pre-rendered exports of the email templates in
\`src/lib/email-templates.ts\`. They are intended for upload into Brevo as
reusable **Marketing templates** so the same copy can be triggered via
Automation / Campaigns instead of (or in addition to) the transactional cron
at \`src/app/api/cron/lead-nurture/route.ts\`.

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

- \`{{ contact.FIRSTNAME | default: "there" }}\` — the lead's first name.
- \`{{ contact.UNSUB_TOKEN | default: "" }}\` — unsubscribe token (newsletter
  templates only).

If you upload the file as-is, Brevo will substitute these on send.

## Template index

| File | Subject | When to trigger |
| ---- | ------- | --------------- |
${rows}

## Lead-magnet flow

The PDF lead-magnet at \`/guides/insiders-guide\` is wired to
\`POST /api/lead-magnet\`. That route currently sends the
\`leadMagnetDeliveryEmail\` template via Brevo's transactional API. If you'd
rather drive the same delivery through a Brevo Automation, upload
\`00-lead-magnet-delivery.html\` and switch the route to add the contact only
(letting the automation handle delivery).

## Regenerating

Templates are exported from \`src/lib/email-templates.ts\` — when copy changes
there, re-run the export so the HTML stays in sync:

\`\`\`bash
npx tsx scripts/export-brevo-templates.ts
\`\`\`
`
}

async function main() {
  await rm(OUT_DIR, { recursive: true, force: true })
  await mkdir(OUT_DIR, { recursive: true })

  for (const tpl of templates) {
    const annotated = `<!--
  Brevo template export — do not edit by hand.
  Source: src/lib/email-templates.ts
  Subject: ${tpl.subject}
  Trigger: ${tpl.trigger}
-->
${tpl.html}
`
    await writeFile(join(OUT_DIR, tpl.filename), annotated, 'utf8')
  }

  await writeFile(join(OUT_DIR, 'README.md'), readme(), 'utf8')

  // eslint-disable-next-line no-console
  console.log(`✓ Exported ${templates.length} Brevo templates to ${OUT_DIR}`)
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})
