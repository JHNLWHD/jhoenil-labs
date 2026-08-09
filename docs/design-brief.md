# Jhoenil Labs — Redesign Brief & Decisions Record

_Recorded 2026-07-20. Outcome of a grilling + domain-modeling session. This is the
source of truth for the redesign; update it if a decision changes._

## Goal

Generate more **B2B leads** and genuinely **showcase current + past work**.

- **Leads wanted:** freelance _project_ clients **and** ongoing _retainer / consulting_ engagements.
- **Not** optimizing for recruiters / full-time job hunting.

## Audience

Business decision-makers — a mix of **technical buyers** (respect engineering signals)
and **non-technical owners** (e.g. the Ajinomoto/Coca-Cola distributor, Rotary clubs).
The design must serve both: premium and clear, not cold/jargon-heavy.

## Ubiquitous language

| Term | Meaning on this site |
|------|----------------------|
| **Engagement** | A client relationship. Either _active_ (ongoing) or _delivered_ (finished). |
| **Active engagement** | Current, usually private work (CRM, migration, internal portal). Shown as client + outcome, **no live-demo link**. |
| **Showcase project** | A current or completed piece of work, shown with an explicit status so active maintenance is not confused with archived work. |
| **Outcome line** | One sentence stating the business result, not the tech. Every project/service has one. |
| **Primary CTA** | The single repeated call to action: **"Book a call."** |
| **Distributor work** | FMCG sales/inventory systems built for _distributors_ of Ajinomoto / Coca-Cola product lines — **never** implying direct engagement with those brands. |

## Decisions

1. **Positioning:** outcome-led, not title-led. Hero leads with what Jhoenil builds and the result.
2. **Services:** consolidated 5 → **3 outcome offers** — Web & Mobile Apps · Systems & Automation · Technical Leadership & Cloud. AI is a cross-cutting capability, not its own card.
3. **Proof:** all **fabricated testimonials deleted permanently**. The fake `/projects` listing is likewise replaced with real work. Proof = real metrics (Kodigo: 3.57K unique visitors, 15.1K page views) + real named clients.
4. **Current work:** dedicated **"Currently working with"** section, high on the page (after hero). Signals in-demand.
5. **Portfolio:** **screenshot-led** cards + an outcome line each. No-public-URL work shown as a "private system" card, not a dead link.
6. **Conversion:** one **"Book a call"** primary CTA everywhere; contact form kept as fallback. Social row = LinkedIn + **GitHub** (Facebook removed for B2B credibility).
7. **Design:** **full redesign**, art direction = **minimal / editorial** (big type, whitespace, near-monochrome + one bold accent, screenshots supply the color). Stack unchanged: React + Vite + Tailwind + shadcn.

## Clients & confidentiality guardrail

All client names live in a **single data file** (`src/data/content.ts`). Each name can be
flipped to an anonymized label (e.g. "a national FMCG distributor") with a one-line edit.

**Nothing client-named is considered cleared for public deploy until Jhoenil signs off per name.**
Names are included now for build/preview; public exposure is pending confirmation.

| Client | Status | Named? | Work |
|--------|--------|--------|------|
| i3pl Al Arabia | Active | pending sign-off | Sole developer — CRM platform for operations + Hetzner server migration |
| SolarTech PH | Active (upcoming) | pending sign-off | Operations portal + customer mobile app |
| Ajinomoto distributor | Delivered | as "distributor" only | Sales & inventory system (FMCG) |
| Coca-Cola distributor | Delivered | as "distributor" only | Sales & inventory system (FMCG) |
| Rotary Club of Zamboanga City West | Active maintenance | yes | Website |
| Rotaract Club of Zamboanga City West | Active maintenance | yes | Website |
| Pilipinas Rotaract MDIO | Turned over | yes | Website |
| Kodigo Eleksyon 2025 | Archived | yes | Voting-guide platform (3.57K visitors / 15.1K views) |
| Spayce | Archived | yes | Rent-collection startup I led |
| COVID19 ZC | Archived | yes | COVID tracker |
| SALN Tracker PH | Active | pending sign-off | Public SALN transparency platform |
| Shop N Eat | Delivered | pending sign-off | Mobile food and shopping marketplace |
| ZApp | Delivered | pending sign-off | Civic engagement platform |
| City Document Tracking System | Delivered | pending sign-off | Government document workflow |
| Mobile Access Control Pilot | Delivered | anonymized | Phone-based access and foot-traffic analytics |

## Open inputs (placeholders in build until supplied)

1. **Calendly / Cal.com link** → CTA falls back to the contact form until supplied.
2. **GitHub URL** → placeholder until supplied.
3. **Ajinomoto/Coca-Cola system screenshot** (private) → placeholder tile; other 6 live projects can be screenshotted from their URLs.
4. **Accent color** → locked to the Jhoenil Labs logo blue (`#2b7fdb`, `hsl(212 74% 51%)`), set via one CSS variable (`--brand`).
5. **Custom domain** (recommended over `*.netlify.app`) → decision pending.
