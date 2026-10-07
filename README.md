# LHC Builders — Website

Marketing website for LHC Builders — a residential contractor in Old Metairie
building custom homes in Old Metairie and New Orleans. The site exists to turn
visitors into project enquiries and calls.

Content, photography, contact details and brand assets are LHC's own, imported
from their previous site at lhcbuildersnola.com.

---

## Stack

| | |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Plain CSS — design tokens in `globals.css`, CSS Modules per component |
| Fonts | Instrument Serif + Inter, self-hosted by `next/font` |
| Images | `next/image`, AVIF/WebP; 81 real LHC photographs served locally |
| Email | Optional Resend integration via `fetch` (no SDK) |
| Hosting | Vercel (recommended) |

There is no CSS framework, no component library and no animation library. Three
runtime dependencies: `next`, `react`, `react-dom`. That is deliberate — this is
a marketing site, and every dependency added is one more thing to maintain and
one more thing that can break a build in two years.

---

## Commands

```bash
npm install          # install dependencies
npm run dev          # development server at http://localhost:3000
npm run build        # production build
npm run start        # serve the production build
npm run typecheck    # TypeScript check without emitting
npm run brand-assets # rebuild logo variants, favicons and the social card
npm run fetch-images # re-import project photography (rarely needed)
```

> Do not run `npm run build` while `npm run dev` is running — the build
> rewrites `.next/` and the dev server will start throwing `ENOENT` errors.
> Stop the dev server first, or build in a separate checkout.

---

## Where the content lives

All editable content is separated from layout. To change what the site says,
you almost never need to touch a component.

| File | Holds |
|---|---|
| `src/data/company.ts` | Name, phone, email, address, service area, hours, licence, social links |
| `src/data/services.ts` | The six service lines, their descriptions and the photograph each uses |
| `src/data/projects.ts` | The six completed homes, and the three current projects |
| `src/data/content.ts` | Hero, intro, approach, philosophy, process, FAQ and About copy |
| `src/data/navigation.ts` | Navbar and footer links |

### The placeholder system

Any value written as `[SOMETHING IN BRACKETS]` is an unconfirmed placeholder.
`isPlaceholder()` in `src/data/company.ts` detects them, and the site reacts:

- A placeholder phone number renders as plain text, never as a dead `tel:` link.
- A placeholder value is **omitted entirely from the structured data**, so the
  site never publishes a fabricated fact to a search engine.
- The mobile call button only appears once a real phone number exists.

To go live, replace the bracketed strings with real values. Nothing else needs
to change. `CLIENT-INFO.md` tracks every outstanding item.

---

## Images

```
public/images/
  projects/<slug>/   78 photographs of the six completed homes
  current/            3 images for the homes in progress
  branding/           logo lockups
public/
  icon.png, apple-icon.png, og-image.jpg
```

**All photography is LHC's own**, imported from their previous site and stored
locally so production does not depend on a third-party CDN. Provenance for
every file — source URL and original dimensions — is in
`scripts/project-images.json`.

Images were downloaded at the largest size that did not upscale the original,
capped at 2400px and re-encoded as progressive JPEG. Next.js serves AVIF and
WebP variants at request time.

### Adding photographs to a project

1. Drop files into `public/images/projects/<slug>/`, named so they sort into
   the order you want them displayed (`01-…`, `02-…`).
2. Add entries to that project's `images` array in `src/data/projects.ts`.
3. **Write alt text describing what is actually in the photograph.** The first
   image is the cover and the page hero.

`npm run fetch-images` re-runs the original import. It does not need to run
again unless the manifest changes.

### The logo

The logo is LHC's own artwork. `scripts/build-brand-assets.mjs` downloads it,
knocks the white paper out to transparency and produces every variant:

| File | Used by |
|---|---|
| `lhc-logo.png` / `lhc-logo-light.png` | full lockup — footer |
| `lhc-logo-compact*.png` | gable + LHC + BUILDERS — navbar |
| `lhc-logo-original.jpg` | untouched download, for reference |
| `icon.png`, `apple-icon.png` | favicons |
| `og-image.jpg` | social card, built over a real project photo |

The compact lockup exists because the third line of the full mark
("RESIDENTIAL CONTRACTORS") is illegible at navbar height.

Run `npm run brand-assets` to regenerate. If LHC supplies vector artwork,
replace the source and re-run.

### Brand colours

Sampled directly from the logo artwork:

- **Teal `#58B8B8`** — the brand accent. Used for rules, numerals and marks.
- **Grey `#686868`** — the logo's secondary text colour.

`#58B8B8` only reaches about 2.1:1 against the warm-white page, so it is never
used behind text. `--teal-deep` (`#2A7272`) carries buttons, links and focus
rings at above 5:1.

---

## The contact form

The form at `/contact` posts JSON to `src/app/api/contact/route.ts`.

**It never fakes a success.** If email delivery is not configured, the route
returns `503` and the form tells the visitor plainly that the message was not
sent, offering the direct phone and email instead (once those exist).

### Turning on delivery

1. Create an account at [resend.com](https://resend.com) and verify the sending
   domain.
2. Set three environment variables in the hosting dashboard — see `.env.example`:
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL` — the inbox that receives enquiries
   - `CONTACT_FROM_EMAIL` — a verified address on the sending domain
3. Redeploy. No code changes are needed.

Any provider with an HTTPS API can be swapped in by editing the `sendEmail`
function in that file.

The route validates and length-caps every field, escapes all HTML, and drops
bot submissions silently via a honeypot field.

**Never commit `.env.local`.** It is already in `.gitignore`.

---

## SEO

- Per-page `title`, `description` and canonical URL via `pageMetadata()` in
  `src/lib/seo.ts`
- Open Graph and Twitter cards, with a generated 1200×630 image
- `sitemap.xml` and `robots.txt` generated at build time from the same data the
  pages use; all six project pages are indexable and included
- Structured data in `src/lib/schema.ts`: `HomeAndConstructionBusiness` (with
  the real NAP), `WebSite`, `BreadcrumbList`, `ItemList` for both services and
  projects, and `FAQPage`
- Project pages use their own cover photograph as the social card

The schema builder prunes every unconfirmed value, so no rating, price range,
opening hours or founding date is published. Only facts LHC states themselves
reach a search engine.

**Before launch:** set `NEXT_PUBLIC_SITE_URL` to the real domain. It is used for
canonical URLs, the sitemap and Open Graph tags.

---

## Accessibility

- Semantic landmarks, a skip link, and a logical heading hierarchy on every page
- Visible focus outlines everywhere (`:focus-visible`, deep teal, 2px)
- The mobile menu is `inert` when closed, traps focus when open, closes on
  Escape and returns focus to the toggle
- Form fields have real labels, `aria-invalid` and linked error messages
- All decorative images are `aria-hidden`; meaningful images have alt text
- `prefers-reduced-motion` disables every transition and animation

---

## Deployment

**Vercel is the simplest route**, because the contact form is a server route.

1. Push the repository to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new). The framework is
   detected automatically — no build configuration needed.
3. Add the environment variables from `.env.example` in Project Settings.
4. Add the custom domain and set `NEXT_PUBLIC_SITE_URL` to match it.

Netlify works equally well. A purely static host (GitHub Pages, S3) would
require either removing `/api/contact` and pointing the form at a third-party
form service, or adding `output: "export"` to `next.config.ts` — at which point
the API route stops working.

---

## Project structure

```
src/
  app/
    layout.tsx              root layout: fonts, metadata, navbar, footer, schema
    page.tsx                home
    about/ services/ projects/ current-projects/ contact/ faq/ privacy/
    projects/[slug]/        project detail pages, statically generated
    api/contact/route.ts    enquiry endpoint
    sitemap.ts robots.ts not-found.tsx globals.css
  components/               one .tsx + one .module.css each
  data/                     all editable content
  lib/                      seo.ts, schema.ts
scripts/
  fetch-project-images.mjs  one-off photography import (provenance)
  build-brand-assets.mjs    logo variants, favicons, social card
  project-images.json       source URL + dimensions for every photograph
```
