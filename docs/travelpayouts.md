# Travelpayouts affiliate setup

**Marker (partner ID):** `766218` · **Traffic-source ID (trs):** `563685`
**Account:** robobuckstar@gmail.com · **Channel:** gatgridcruises.com

All links are built in [`src/lib/travelpayouts.ts`](../src/lib/travelpayouts.ts). The marker
is declared there once — don't hardcode it anywhere else.

## Drive verification script

Already live. It's injected into `<head>` from the root layout
(`src/app/layout.tsx`, the `travelpayouts-drive` `<Script>` block), which is where
Travelpayouts' "Check Drive connection" looks. Nothing further is needed for the
account to verify.

## Where the links are placed

| Category | Brand | Page |
|---|---|---|
| Flights | Aviasales (MCO / FLL / MIA + homepage) | `/flights` → "Getting to your port" |
| Hotels | Hotellook (Cocoa Beach, Fort Lauderdale, Miami + homepage) | `/flights` → "Getting to your port" |
| Airport transfers | Kiwitaxi, GetTransfer | `/tools/transfers` → "Book a private airport transfer" |
| Travel insurance | EKTA | `InsurancePartners` component → `/guides/travel-insurance` and `/concierge` |

Note: airport-transfer links live on **`/tools/transfers`** (the airport-to-port
guide), *not* `/transfer`. `/transfer` is the reservation-transfer capture page —
different thing entirely, despite the similar name.

Every placement carries a `TravelAffiliateDisclosure` (or the insurance
component's own disclosure block) directly alongside the links, and
`/disclosures` names Travelpayouts and marker 766218.

## Attribution confidence

- **Aviasales and Hotellook** read `marker=` natively. These are solid.
- **Kiwitaxi, GetTransfer, and EKTA** are documented by Travelpayouts as
  *sometimes* requiring a link minted through the official builder or the
  `POST https://api.travelpayouts.com/links/v1/create` API rather than a raw
  `marker=` append. They're wired up with the marker because a tagged link beats
  an untagged one, but **swap in official builder links when convenient** and
  confirm a test click registers in the dashboard.

## Follow-ups

1. Confirm per-program approval status in the Travelpayouts dashboard (Tools →
   each brand shows *generated* / *waiting for approval* / *declined*).
2. Replace the three lower-confidence links above with builder- or API-minted
   URLs, then update `src/lib/travelpayouts.ts`.
3. Optional: the Aviasales search-form widget is a better on-page experience
   than a text link for `/flights` — grab the embed from the builder.
