# What's blocked on credentials / decisions

Status as of 2026-08-22. Everything below is **code-complete** — the blockers are
environment variables and one Airtable table, not missing implementation.

---

## 1. Email subscribers — code done, needs env + a table

**The audit item said:** subscribers are stored in memory and wiped on redeploy;
the weekly digest send is commented out.

**Both were true and both are already fixed in code.** `src/lib/subscriber-store.ts`
persists to Airtable, and `/api/cron/digest` sends through Resend (the send is no
longer commented out — see the header comment in that route). What remains is
purely operational.

### Required

| Env var | Where to get it | If unset |
| --- | --- | --- |
| `AIRTABLE_API_KEY` | airtable.com/create/tokens — PAT with `data.records:read` + `data.records:write` on base `applSFcQkOus2fFsx` | Signups throw `SubscriberStoreNotConfiguredError`; nothing persists |
| `RESEND_API_KEY` | resend.com/api-keys | Digest builds but cannot send |
| `CRON_SECRET` | `openssl rand -hex 32` | **In production the cron routes return 401 to everyone, including Vercel Cron.** `isAuthorizedCronRequest` returns `false` when the secret is unset and `NODE_ENV === 'production'`, so the digest/drip/nurture crons silently never run |

Optional: `AIRTABLE_SUBSCRIBERS_TABLE` (defaults to `Subscribers`).

### Also required: the Airtable table itself

A table named **`Subscribers`** must exist in base `applSFcQkOus2fFsx`. Columns are
specified in `docs/NEWSLETTER-SETUP.md` §1. Only `Email` is strictly required —
writes use `typecast` and drop unknown fields with a warning rather than failing —
but a partial table loses the de-dupe guards, which is how you end up double-mailing
the list.

### How to verify without mailing anyone

```
curl "https://gatgridcruises.com/api/cron/digest?preview=1&secret=$CRON_SECRET"
```

`?preview=1` builds the digest and reports the real audience size **without
sending**. If that returns a plausible subscriber count, the pipeline is live.

### Decision needed

Nothing blocking. Worth knowing: `Subscribers` is a second list alongside Brevo
(`BREVO_API_KEY` / `BREVO_LIST_ID`, wired into the flight-deals form as a
best-effort sync). Airtable is the system of record; Brevo is a mirror. If you'd
rather run the list from Brevo, that's a real decision — I did not make it.

---

## 2. Leads → Airtable — code done, needs the same key

**The audit item said:** the leads→Airtable write is broken because Make.com is paused.

**Already worked around.** `src/lib/airtable-leads.ts` writes the CRM record
directly from the app, so a lead no longer depends on the Make.com scenario's
state. The webhook stays wired where it exists; it just isn't load-bearing anymore.

Two separate bugs were fixed on this path already (both documented in that file's
header): the dedupe formula was passing a field **ID** where Airtable requires a
field **name**, which 422'd every lookup and meant leads emailed fine but never
reached the CRM.

### Required

- `AIRTABLE_API_KEY` — same token as above. This is the only hard blocker.

### Optional but worth setting deliberately

| Env var | Default | Why you might set it |
| --- | --- | --- |
| `AIRTABLE_LEAD_NEW_STAGE` | `New Lead` | Must **not** be one of `Converted`, `Lost`, `Unsubscribed`, `Ready to Book` — `/api/cron/lead-nurture` excludes those, so a wrong value makes the nurture drip skip every new lead |
| `AIRTABLE_LEAD_EMAIL_FIELD` | `Email` | Only if the email column in `GatGrid Leads` was renamed |
| `CONCIERGE_WEBHOOK_URL` | — | The Make.com webhook. Leave unset if that scenario stays paused; nothing breaks |
| `AGENT_NOTIFY_EMAILS` | `robobuckstar@gmail.com,bookings@gatgridcruises.com` | Internal new-lead alerts |

### Decision needed

**Is the Make.com scenario coming back?** Right now the app writes to Airtable
*and* posts to the webhook when `CONCIERGE_WEBHOOK_URL` is set. If you un-pause
Make.com while that env var is set and the scenario also writes to `GatGrid Leads`,
every lead lands twice. Pick one writer.

---

## 3. Not blocked, but worth knowing

- **Indexing.** The canonical bug was real but was fixed on 2026-08-21 (`616890f`),
  one day before this pass. I verified live: `/`, `/ports/nassau`, `/transfer`,
  `/deals/last-minute`, `/book` and `/refer` each self-reference correctly.
  Re-indexing lags a fix by days to weeks, so the ~11/94 number is expected to be
  stale rather than evidence the fix didn't land. Re-check Search Console in a
  couple of weeks before treating it as an open bug.
- **Sitemap size.** `sitemap.xml` currently lists **774** URLs, most of them
  individual `/sailing/*` pages. That is a lot of thin, fast-expiring pages for a
  site with 94 real content pages, and it dilutes crawl budget. Worth a decision on
  whether sailing detail pages belong in the sitemap at all. I did not change this.
- **Itinerary data.** 525 of 590 sailings have gaps in `itinerary_details` — the
  Apify import dropped days. The page now says so instead of rendering a hole, but
  the underlying fix is a re-scrape, which needs the Apify credentials.
