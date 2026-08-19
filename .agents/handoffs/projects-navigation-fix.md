# Projects navigation fix

- Changed shared header/footer section links to use `/#...` targets from non-home routes.
- Added the missing `about` anchor on the homepage.
- Replaced the homepage-only footer with the shared `Footer` component.
- Routed every `/projects` catalog card to its internal `/projects/:slug` detail page; public URLs remain available from the detail page.
- Verified navigation from `/projects` for Work, Services, About, and footer Contact; build, typecheck, lint, and diff checks pass.
- Verified `/` and `/projects` render identical footer links.
- Verified a catalog click opens the expected Logistics Operations CRM detail route.
- No known follow-up risk; leave uncommitted until explicitly requested.
