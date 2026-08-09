# Jhoenil Labs launch checklist

Use this checklist before pointing `jhoenil.com` at the site. Do not launch until every **Launch blocker** is checked.

## 1. Domain and hosting — Launch blockers

- [ ] Purchase `jhoenil.com` and enable WHOIS privacy.
- [ ] Confirm the registrar renewal price and auto-renewal settings.
- [ ] Connect `jhoenil.com` to the Netlify site.
- [ ] Configure the preferred hostname (`https://jhoenil.com` or `https://www.jhoenil.com`).
- [ ] Redirect the non-preferred hostname to the preferred hostname.
- [ ] Confirm HTTPS is active and HTTP redirects to HTTPS.
- [ ] Confirm the Netlify deploy is green from the production branch.
- [ ] Confirm `/`, `/projects`, and at least one `/projects/:slug` route load directly.
- [ ] Confirm the SPA fallback does not return a hosting 404 on direct project URLs.
- [ ] Keep the current Netlify URL available as a rollback/reference URL.

## 2. Brand and content — Launch blockers

- [ ] Confirm the logo, favicon, social preview image, and “Jhoenil Labs” naming are final.
- [ ] Confirm the public identity is consistently “Jhoenil Wahid” and “Jhoenil Labs.”
- [ ] Review every client/project name for permission to publish.
- [ ] Review private/offline project descriptions for confidential details.
- [ ] Confirm the homepage promise is accurate: software and systems that replace manual work.
- [ ] Confirm the 30-minute discovery-call wording matches the Cal.com event.
- [ ] Remove placeholder copy, stale claims, and unfinished TODOs visible to visitors.
- [ ] Verify email, LinkedIn, resume, and public project links are correct.
- [ ] Proofread the homepage, project pages, error page, and footer on a final content pass.

## 3. Conversion flow — Launch blockers

- [ ] Click every homepage booking CTA and confirm it opens the exact Cal.com event.
- [ ] Confirm booking CTAs say “Book a 30-minute call.”
- [ ] Confirm project detail pages show “Talk about a similar project.”
- [ ] Confirm the contact form submit action says “Send message.”
- [ ] Confirm Cal.com opens in light mode with the Jhoenil Labs blue theme.
- [ ] Confirm the Cal.com event title, duration, description, availability, timezone, and confirmation email are correct.
- [ ] Complete a test booking using a test slot, then cancel it if appropriate.
- [ ] Submit a real test contact-form message and confirm it arrives at the intended inbox.
- [ ] Verify required fields and invalid email validation work.
- [ ] Verify the form success and failure messages are understandable.
- [ ] Verify the form’s spam protection is active.
- [ ] Confirm the response-time promise is realistic.
- [ ] Confirm booking and form paths are both usable without requiring the other.

## 4. Analytics and privacy — Launch blockers

- [ ] Confirm PostHog is pointed at the intended production project.
- [ ] Verify booking CTA clicks are recorded with the correct label and calendar destination.
- [ ] Verify form starts, successful submissions, and failed submissions are recorded.
- [ ] Confirm analytics does not capture message contents, email addresses, or unnecessary personal data.
- [ ] Add or review the site privacy notice appropriate for the analytics and contact form.
- [ ] Verify cookie/analytics consent requirements for the intended audience and deployment region.
- [ ] Confirm external Cal.com, LinkedIn, resume, and project links open safely.

## 5. SEO and sharing — Launch blockers

- [ ] Update the canonical URL from the Netlify URL to the preferred custom domain.
- [ ] Verify the homepage title and meta description match the visible offer.
- [ ] Verify each project page has a unique title, description, canonical URL, and social image.
- [ ] Verify `robots.txt` points to the production sitemap.
- [ ] Verify `sitemap.xml` contains only intended public routes and uses the custom domain.
- [ ] Verify Open Graph and Twitter previews using the production URL.
- [ ] Verify the favicon, page title, and description appear correctly in a fresh browser tab.
- [ ] Submit the sitemap to Google Search Console and Bing Webmaster Tools after launch.
- [ ] Confirm structured data contains the correct name, URL, and LinkedIn profile.

## 6. Desktop and mobile QA — Launch blockers

- [ ] Test Chrome or Safari at desktop width.
- [ ] Test the site at 390px mobile width.
- [ ] Confirm there is no horizontal overflow.
- [ ] Confirm the mobile header CTA remains visible and tappable.
- [ ] Open and close the mobile menu; verify every link navigates and the menu closes.
- [ ] Verify hero, current-work, services, portfolio, about, and contact sections have sensible spacing.
- [ ] Verify all buttons have visible hover, focus, and disabled states where applicable.
- [ ] Keyboard-tab through navigation, CTAs, form fields, and the Cal.com modal.
- [ ] Confirm visible text and controls meet a readable contrast level.
- [ ] Verify images have useful alt text and decorative images are hidden from assistive technology.
- [ ] Test at least one project page on desktop and mobile.
- [ ] Test the invalid project route and confirm it offers a working route home.

## 7. Performance and reliability

- [ ] Run `npm run lint`.
- [ ] Run `npx tsc -b`.
- [ ] Run `npm run build`.
- [ ] Preview the production build locally with `npm run preview`.
- [ ] Check the production site with Lighthouse or PageSpeed Insights.
- [ ] Confirm images are compressed and load without broken requests.
- [ ] Confirm the Cal.com script is lazy-loaded only after a booking CTA is clicked.
- [ ] Check the browser console for errors on the homepage, project page, form flow, and booking flow.
- [ ] Check the Network panel for failed requests, mixed-content warnings, and unexpected third-party requests.

## 8. Launch and rollback

- [ ] Create a final release commit/tag or record the commit SHA being deployed.
- [ ] Confirm the production branch contains only intended launch changes.
- [ ] Deploy to Netlify.
- [ ] Verify the custom domain and HTTPS immediately after deployment.
- [ ] Run the smoke test again against the live custom domain.
- [ ] Send one booking test and one form test after the domain switch.
- [ ] Monitor form submissions, Cal.com bookings, and error reports for the first 24 hours.
- [ ] Keep the previous deploy available in Netlify for one-click rollback.
- [ ] If a blocker appears, roll back first, then diagnose in a separate change.

## 9. First-week follow-up

- [ ] Review CTA clicks, booking starts, completed bookings, form starts, and form submissions.
- [ ] Check which CTA placement produces the most qualified conversations.
- [ ] Review search indexing and sitemap status.
- [ ] Review real visitor questions and update unclear copy.
- [ ] Confirm the domain renews correctly and DNS is documented.
- [ ] Record any follow-up improvements as separate issues rather than changing the launch scope.
