# Operations-focused homepage conversion

## Changes

- Published and implemented the operations-focused homepage spec.
- Reframed the homepage around owners and operations leaders replacing manual operations.
- Added three anonymized priority case studies: logistics CRM, FMCG sales and inventory, and solar operations portal/mobile app.
- Moved the broader portfolio behind `/projects` and added project-specific catalog metadata.
- Added a required workflow-context prompt before opening Cal.com, passed as booking metadata, and recorded booking-created analytics.
- Added case-study detail content, text-led private proof treatment, route metadata, and sitemap entries.

## Verification

- `npm run build`
- `npx tsc -p tsconfig.app.json --noEmit`
- `npm run lint`
- Browser acceptance at desktop and 390px mobile widths.
- Verified no mobile horizontal overflow, required booking context, three priority routes, and `/projects` metadata.

## Risks

- Cal.com booking-created events are observable from the embed; attended-call status remains an external scheduling/operations metric.
- Solar outcomes are intentionally limited to the current in-progress description until approved results are available.

## Next checks

- Confirm the booking metadata appears in the Cal.com booking/webhook payload.
- Replace current case-study copy with approved ranges or relative outcomes when available.
- After deployment, monitor attended qualified calls and inquiry-to-call conversion against the 4–8 monthly target.
