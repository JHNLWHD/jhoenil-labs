# Jhoenil Labs deployment checklist

## Before deploying

- [ ] Confirm the logo, name, copy, project details, email, LinkedIn, and resume link are correct.
- [ ] Confirm no private client information or placeholder copy is visible.
- [ ] Confirm `jhoenil.com` is connected to Netlify.
- [ ] Confirm the preferred hostname and HTTPS are configured.
- [ ] Confirm Cal.com shows the correct 30-minute event, availability, timezone, and description.
- [ ] Confirm the Cal.com booking page opens in light mode with the site theme.
- [ ] Confirm the contact-form recipient is correct.
- [ ] Confirm the homepage title, description, canonical URL, favicon, and social preview are correct.
- [ ] Confirm `robots.txt` and `sitemap.xml` use the production domain.

## Run checks

- [ ] Run `npm run lint`.
- [ ] Run `npx tsc -b`.
- [ ] Run `npm run build`.

## Test the live site

- [ ] Open the homepage directly.
- [ ] Test the header, hero, current-work, project-page, and contact-section booking CTAs.
- [ ] Confirm each booking CTA opens the exact Cal.com event.
- [ ] Confirm project pages show “Talk about a similar project.”
- [ ] Submit a test contact form and confirm the message arrives.
- [ ] Test required fields and invalid email validation.
- [ ] Check the homepage at desktop width.
- [ ] Check the homepage at 390px mobile width.
- [ ] Confirm there is no horizontal overflow.
- [ ] Open and close the mobile menu.
- [ ] Open one public and one private project page.
- [ ] Open an invalid project URL and confirm it provides a route home.
- [ ] Test email, LinkedIn, resume, and public project links.
- [ ] Check the browser console for errors.

## After deploying

- [ ] Confirm `https://jhoenil.com` loads correctly.
- [ ] Confirm the non-preferred hostname redirects correctly.
- [ ] Confirm direct project URLs do not return a hosting 404.
- [ ] Send one real booking test and one real form test, then clean them up if needed.
- [ ] Check PostHog records booking clicks and form submissions.
- [ ] Check the site once more from a phone.
