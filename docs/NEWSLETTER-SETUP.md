# Newsletter, digest + lead capture — setup and operations

Everything below runs off **Airtable base `applSFcQkOus2fFsx`** (the same base as
the client portal and referral program) plus **Resend** for delivery.

Before this change, newsletter subscribers lived in a module-level array inside
`/api/subscribe`. That array was wiped on every redeploy and every serverless
cold start, so the list the crons read was effectively always empty — and the
Sunday digest send was commented out on top of that.

## 1. Airtable — `Subscribers` table

Create a table named **`Subscribers`** in base `applSFcQkOus2fFsx` (or set
`AIRTABLE_SUBSCRIBERS_TABLE` to whatever it's called).

| Column | Type | Purpose |
| --- | --- | --- |
| `Email` | Single line text | Dedupe key. Required. |
| `Name` | Single line text | Used in email greetings. |
| `Source` | Single line text | Which form captured them, e.g. `newsletter-popup`. |
| `Status` | Single select — `Active`, `Unsubscribed` | Only `Active` records receive mail. |
| `Subscribed At` | Date (include time) or single line text | ISO 8601; drives drip timing. |
| `Unsubscribe Token` | Single line text | Opaque token in every email footer. |
| `Preferences` | Long text | JSON blob of the signup payload. |
| `Drip Stage` | Single select — (blank), `Welcome Sent`, `Day 3 Sent`, `Completed` | Welcome-sequence progress. |
| `Last Email Sent` | Date (include time) or single line text | Diagnostics. |
| `Last Digest Sent` | Date (include time) or single line text | Blocks a repeat weekly digest. |
| `Last Alert Sailing` | Single line text | Blocks re-alerting the same price drop. |
| `Unsubscribed At` | Date (include time) or single line text | Audit trail for opt-outs. |

Only `Email` is strictly required. Writes use `typecast: true`, and a column the
base doesn't have yet is dropped with a `[airtable] … wrote record without
missing field(s) …` warning rather than failing the signup — so a partially
built table still captures subscribers, it just loses the extra data. Add every
column to get the de-dupe guards working.

## 2. Airtable — leads

Inquiries write straight into the existing **GatGrid Leads** table
(`tblc8JHpcgEOnmCoj`) using its field IDs. No new table needed. Optional detail
columns are addressed by name and dropped if absent: `Source`, `Phone`, `Notes`,
`Sailing Interest`, `Guests`, `Referral Code`, `UTM Source`, `UTM Medium`,
`UTM Campaign`.

This is deliberately independent of the Make.com webhook. With that scenario
paused, leads reached Grayson's inbox but never reached this table — which is
what `/api/cron/lead-nurture` drips from, so the nurture sequence had no new
leads to work.

## 3. Environment variables

| Variable | Required | Notes |
| --- | --- | --- |
| `AIRTABLE_API_KEY` | Yes | Needs `data.records:read` **and** `data.records:write` on the base. A read-only token will 403 every signup. |
| `RESEND_API_KEY` | Yes | Delivery for welcome, drip, digest, deal alerts. |
| `CRON_SECRET` | Yes | Required by every cron route and by the admin subscriber list. |
| `AIRTABLE_SUBSCRIBERS_TABLE` | No | Defaults to `Subscribers`. |
| `AIRTABLE_LEAD_NEW_STAGE` | No | Defaults to `New Lead`. |
| `BREVO_API_KEY` / `BREVO_LIST_ID` | No | Optional contact mirror; unrelated to persistence. |

## 4. Routes

| Route | Schedule | What it does |
| --- | --- | --- |
| `POST /api/subscribe` | — | Idempotent signup → Airtable, then welcome email. Returns 409 on a duplicate, 503 if the store isn't configured, 500 if the write fails (never a false success). |
| `GET /api/subscribe` | — | Admin list read. **Requires `CRON_SECRET`** — it used to be open to anyone. |
| `POST`/`GET /api/unsubscribe` | — | Flips `Status` to `Unsubscribed`; the row is kept for the audit trail. |
| `GET /api/cron/digest` | `0 15 * * 0` | Weekly digest to every active subscriber. Skips anyone mailed within 3 days. |
| `GET /api/cron/drip` | `0 14 * * *` | Welcome drip, day 3 and day 7, tracked by `Drip Stage`. |
| `GET /api/deal-alerts` | `0 12 * * *` | Price-drop alert; skips subscribers already alerted about that sailing. |
| `GET /api/cron/lead-nurture` | `0 13 * * *` | Unchanged; now has fresh leads to work. |

Auth accepts `Authorization: Bearer $CRON_SECRET` (what Vercel Cron sends),
`x-cron-secret: $CRON_SECRET`, or `?secret=$CRON_SECRET`.

## 5. Verifying without mailing anyone

Every send route takes `?preview=1`, which builds the audience and the email
body from the live store and returns counts **without sending**:

```bash
curl -s -H "x-cron-secret: $CRON_SECRET" \
  'https://gatgridcruises.com/api/cron/digest?preview=1'
# → { "recipients": 12, "stats": { ... } }   nothing sent

curl -s -H "x-cron-secret: $CRON_SECRET" \
  'https://gatgridcruises.com/api/cron/drip?preview=1'
# → { "subscribers": 12, "due": ["day3:someone@example.com"] }
```

End-to-end check with a real address you control:

```bash
curl -s -X POST https://gatgridcruises.com/api/subscribe \
  -H 'Content-Type: application/json' \
  -d '{"email":"you+test@yourdomain.com","preferences":{"source":"manual-test"}}'
# → row appears in Subscribers, welcome email arrives

curl -s -X POST https://gatgridcruises.com/api/subscribe \
  -H 'Content-Type: application/json' \
  -d '{"email":"you+test@yourdomain.com"}'
# → 409 Already subscribed, still one row

curl -s -H "x-cron-secret: $CRON_SECRET" https://gatgridcruises.com/api/subscribe
# → { "count": 1, "subscribers": [ ... ] }
```

## 6. Sending limits

Sends are paced at ~1.8/second (Resend's default cap is 2/s) and stop at a 45s
wall-clock budget, reporting `truncated` and `remaining`. Progress is recorded
per recipient as it's sent, so re-triggering the route resumes rather than
re-sending. Roughly 80 recipients fit in one invocation; above that, trigger the
route again (or raise `maxDuration`) until `truncated` is `false`.

## 7. Known gap (not a code issue)

`getBiggestPriceDrops()` derives drops from scraper price snapshots. There are
currently no snapshots, so it returns zero sailings: the digest ships with its
"biggest drops" section empty (featured sailings still populate it), and
`/api/deal-alerts` finds nothing to alert on and sends nothing. That resolves
itself once `/api/cron/scrape` has accumulated more than one snapshot per
sailing. The digest refuses to send at all if both drops and featured sailings
are empty.
