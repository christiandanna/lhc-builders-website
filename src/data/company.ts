/**
 * ---------------------------------------------------------------------------
 * COMPANY INFORMATION — single source of truth
 * ---------------------------------------------------------------------------
 * Every value below is taken from LHC Builders' own website
 * (lhcbuildersnola.com). Nothing here is assumed or inferred.
 *
 * HOW PLACEHOLDERS WORK
 * Any value wrapped in square brackets, e.g. "[CONFIRM HOURS]", is treated as
 * an unconfirmed placeholder. `isPlaceholder()` detects them and the UI reacts:
 *   - A placeholder value renders as plain text, never as a broken link.
 *   - A placeholder value is skipped entirely in structured data (schema.org),
 *     so the site never publishes an unverified fact to a search engine.
 *
 * See CLIENT-INFO.md for what is still outstanding.
 */

export const PLACEHOLDER_PATTERN = /^\s*\[.*\]\s*$/;

/** True when a value is still an unconfirmed placeholder. */
export function isPlaceholder(value: string | undefined | null): boolean {
  return !value || PLACEHOLDER_PATTERN.test(value);
}

/** Returns the value only when it is real, otherwise undefined. */
export function realValue(value: string | undefined | null): string | undefined {
  return isPlaceholder(value) ? undefined : (value as string);
}

export const company = {
  name: "LHC Builders",
  legalName: "LHC Builders",
  shortName: "LHC",
  /** From the logo artwork: "LHC Builders — Residential Contractors". */
  descriptor: "Residential Contractors",
  /** Named on every page of the existing site as "LHC Builders - Leslie Cheatham". */
  principal: "Leslie Cheatham",

  tagline: "Custom homes in Old Metairie and New Orleans",

  /** Drawn from the existing site's own positioning line. */
  positioning:
    "Custom homes in Old Metairie and New Orleans defined by timeless design, thoughtful details, and elevated craftsmanship.",

  city: "Metairie",
  state: "Louisiana",
  stateAbbr: "LA",
  /** The two areas the existing site names. */
  region: "Old Metairie and New Orleans",

  // --- Contact (verified from lhcbuildersnola.com) ------------------------
  phone: "(504) 236-4689",
  /** Digits only, for tel: links. */
  phoneHref: "+15042364689",
  email: "lhcbuilders@gmail.com",

  address: {
    street: "323 Orion Ave",
    city: "Metairie",
    state: "LA",
    postalCode: "70005",
    country: "US",
  },

  /** As stated on the existing site. */
  serviceArea: "Old Metairie and New Orleans",

  /** Not published on the existing site. */
  hours: "[CONFIRM BUSINESS HOURS]",
  license: "[CONFIRM LOUISIANA CONTRACTOR LICENSE NUMBER]",

  // --- Social (only accounts found on the existing site) -------------------
  social: {
    instagram: "https://www.instagram.com/lhcbuilders",
  },
} as const;

/** Every social link that has a real URL behind it. */
export const activeSocialLinks = (
  Object.entries(company.social) as [keyof typeof company.social, string][]
)
  .filter(([, url]) => !isPlaceholder(url))
  .map(([platform, url]) => ({ platform, url }));

/** Human-readable one-line address. */
export const addressLine = `${company.address.street}, ${company.address.city}, ${company.address.state} ${company.address.postalCode}`;

/** Multi-line address, as the existing site presents it. */
export const addressLines = [
  company.address.street,
  `${company.address.city}, ${company.address.state} ${company.address.postalCode}`,
];
