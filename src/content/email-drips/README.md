# GatGrid Cruises — Welcome Drip Sequence

This is the 6-email welcome series for new subscribers who download the Disney
Cruise Planning Guide. Copy is brand-aware (navy + gold tone), warm, and
helpful — not pushy. GatGrid is an information / advisory service, not a
booking platform; copy must not promise "book through us" or "price match."

## Sequence overview

| #   | Trigger              | Send delay      | File                                          |
| --- | -------------------- | --------------- | --------------------------------------------- |
| 1   | Signup / opt-in      | Immediate       | `01-welcome-guide-delivery.md`                |
| 2   | After email 1        | + 2 days        | `02-why-use-a-travel-advisor.md`              |
| 3   | After email 2        | + 3 days        | `03-stateroom-guide.md`                       |
| 4   | After email 3        | + 3 days        | `04-dining-entertainment-castaway-cay.md`     |
| 5   | After email 4        | + 4 days        | `05-packing-tips-forgotten.md`                |
| 6   | After email 5        | + 4 days        | `06-soft-cta-free-consultation.md`            |

Total run: ~16 days from signup to soft CTA.

## Brevo setup notes

- From name: **GatGrid Cruises**
- From address: **hello@gatgridcruises.com** (or whichever address is
  authenticated)
- Reply-to: a real, monitored inbox — these emails invite replies
- Personalization tokens: `{{contact.FIRSTNAME | default: "there"}}` — Brevo
  syntax. If first name is unknown, the default reads naturally.
- Footer: include physical address + one-click unsubscribe (Brevo handles)

## Tone guidelines

- Plainspoken. Short paragraphs. Real sentences.
- Brand colors used sparingly in HTML versions: navy `#1E3A5F`, gold `#D4AF37`
- No "BOOK NOW" caps-lock urgency. No fake scarcity.
- Every email earns the next email by being genuinely useful.
