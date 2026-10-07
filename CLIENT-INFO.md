# Client Information Checklist — LHC Builders

Updated after the content pass that imported LHC Builders' real business
information, project photography and brand assets from
[lhcbuildersnola.com](https://www.lhcbuildersnola.com/).

**Status key:** `[x] Done` · `[~] Partial` · `[ ] Still needed`

---

## 1. Verified and live on the site

Everything here was taken from LHC's own website and is now in use.

| Status | Item | Value in use | Where it lives |
|---|---|---|---|
| [x] | Business name | LHC Builders | `src/data/company.ts` |
| [x] | Principal | Leslie Cheatham | `src/data/company.ts` → `principal` |
| [x] | Address | 323 Orion Ave, Metairie, LA 70005 | `src/data/company.ts` → `address` |
| [x] | Phone | (504) 236-4689 — live `tel:` link | `src/data/company.ts` → `phone` |
| [x] | Email | lhcbuilders@gmail.com — live `mailto:` link | `src/data/company.ts` → `email` |
| [x] | Service area | Old Metairie and New Orleans | `src/data/company.ts` → `serviceArea` |
| [x] | Instagram | instagram.com/lhcbuilders | `src/data/company.ts` → `social` |
| [x] | Logo | Real LHC artwork, white knocked out | `public/images/branding/` |
| [x] | Brand colour | Teal `#58B8B8`, sampled from the logo | `src/app/globals.css` |
| [x] | Services (6) | Custom Cabinetry, Designer Lighting, Luxury Kitchens, Statement Bathrooms, Custom Tile & Stone Work, Outdoor Living | `src/data/services.ts` |
| [x] | Process (5 stages) | Consultation & Vision → Final Finishes & Delivery | `src/data/content.ts` |
| [x] | Completed projects (6) | 78 real photographs | `src/data/projects.ts` |
| [x] | Current projects (3) | 249 Brockenbraugh, 102 Sycamore, 231 Beverly | `src/data/projects.ts` |
| [x] | Positioning copy | LHC's own wording, verbatim where marked | `src/data/content.ts` |

### Where the Facebook link went

A `facebook.com/...` string appears in the old site's HTML, but it is part of
the Facebook SDK rather than a link to an LHC page. **No Facebook account was
added.** If LHC has one, add it to `social` in `src/data/company.ts` and the
footer icon appears automatically.

---

## 2. Still needed

| Status | Item | Placeholder in use | Impact |
|---|---|---|---|
| [ ] | Louisiana contractor licence number | `[CONFIRM LOUISIANA CONTRACTOR LICENSE NUMBER]` | Not shown anywhere on the site yet. Homeowners look for this — worth publishing. |
| [ ] | Insurance details suitable for publication | `[CONFIRM LICENSE AND INSURANCE DETAILS]` (FAQ answer) | The FAQ currently says to ask directly. |
| [ ] | Business hours | `[CONFIRM BUSINESS HOURS]` | Omitted from the contact page and from structured data rather than guessed. |
| [ ] | Exact registered entity name | assumed "LHC Builders" | Only matters for legal/footer accuracy. |
| [ ] | Domain name | `NEXT_PUBLIC_SITE_URL` defaults to `https://www.lhcbuilders.com` | **Must be set before launch** — drives canonicals, sitemap and social cards. |
| [ ] | Inbox for enquiries | — | Needed for `CONTACT_TO_EMAIL`. Likely lhcbuilders@gmail.com. |

---

## 3. Worth asking for

These would materially improve the site. None is blocking.

| Item | Why |
|---|---|
| Completion year for each of the six homes | The project pages currently show builder, location and photo count. A year would strengthen them. |
| Square footage for completed homes | Published for 249 Brockenbraugh only (read off their own for-sale board). |
| A cleaner rendering for 249 Brockenbraugh | The only image available is a marketing poster with a "FOR SALE" board and contact details burned in. It sits slightly apart from the other two. |
| Higher-resolution photos for 344 Elmeer, 425 Arlington, 312 Sena | Those galleries came off the old site at 665×441 and 1024×682. They are sharp at card size but soft when a gallery image runs full width. 220 Arlington, 413 Phosphor and 116 Brockenbraugh were available at 2400px and look markedly better. |
| Pricing / availability for current projects | The page says to email, which matches the old site. Published pricing would convert better. |
| Testimonials or client quotes | No testimonial section exists, because there is nothing real to put in one. |
| A photograph of Leslie Cheatham, and a short bio | The About page describes the company's approach. It does not invent a founder story. |
| Architect credits | If the homes were designed by named architects, they should probably be credited. |

---

## 4. Copy sign-off

Copy on the site falls into two groups.

**Verbatim from LHC's own site** — no sign-off needed, but worth a read:
hero line, "Built with intention. Designed to last.", the intro paragraphs, the
seven focus areas, "Our goal is always the same…", the design-philosophy
paragraphs, the five process stage names, "Let's build something beautiful…".

**Written for this build, in LHC's voice** — needs Leslie's sign-off:

| Item | File |
|---|---|
| Service descriptions (6) | `src/data/services.ts` |
| Process stage descriptions | `src/data/content.ts` → `processSteps` |
| About page philosophy and four pillars | `src/data/content.ts` → `aboutCopy` |
| FAQ answers | `src/data/content.ts` → `faqItems` |
| Project summary lines | `src/data/projects.ts` |

Project summaries describe only what is visible in the photographs. They make
no claim about size, cost, duration, architect or client.

---

## 5. Deliberately NOT on the site

Listed so it is clear these were omitted on purpose, not forgotten. Each one is
common on builder websites and each would be a fabrication:

- Years in business, founding date, "serving Old Metairie since…"
- Number of homes built
- Crew size or employee count
- Awards, ratings, review counts, star ratings
- Client names or testimonials
- Price ranges or "homes from $X"
- Guarantees or warranty periods
- Licence, bonding or insurance claims
- Square footage, lot size or completion dates for the six completed homes
- Architect, designer, subcontractor or supplier credits
- Named neighbourhoods beyond Old Metairie and New Orleans, which LHC states itself

The one exception: **249 Brockenbraugh Ct.** shows lot size (90×120), living
area (5,946 sq ft) and total area (7,078 sq ft). Those are read directly off
the for-sale board in LHC's own marketing image on their Current Projects page.

---

## 6. Photography provenance

All 78 project photographs and 3 current-project images were downloaded from
LHC's Squarespace CDN and are stored locally in `public/images/`, so the site
does not depend on the old site staying up.

- Downloaded at the largest size that did not upscale the original
- Resized to a 2400px maximum and re-encoded as progressive JPEG (quality 82)
- Served as AVIF/WebP by Next.js at request time
- **Alt text was written by looking at each photograph** and describes what is
  actually in the frame
- Photographs are never shown as representing a project they are not from; the
  services page names the house each image was taken in

Provenance is recorded in `scripts/project-images.json` (source URL and
original dimensions for every file) and the import is reproducible via
`npm run fetch-images`.
