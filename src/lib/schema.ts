import { company, isPlaceholder, realValue } from "@/data/company";
import { faqItems } from "@/data/content";
import type { Project } from "@/data/projects";
import { siteUrl } from "@/lib/seo";

/**
 * ---------------------------------------------------------------------------
 * STRUCTURED DATA (schema.org)
 * ---------------------------------------------------------------------------
 * Only verified facts are published. Every value runs through `realValue()`,
 * which returns undefined for anything still in placeholder form, and
 * undefined keys are stripped before output.
 *
 * Deliberately never emitted, because LHC does not publish them:
 * aggregateRating, review, priceRange, openingHoursSpecification, foundingDate,
 * numberOfEmployees, award.
 */

type Json = Record<string, unknown>;

/** Recursively drops undefined, null and empty values. */
function prune<T extends Json>(input: T): T {
  const output: Json = {};
  for (const [key, value] of Object.entries(input)) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) {
      if (value.length === 0) continue;
      output[key] = value;
      continue;
    }
    if (typeof value === "object") {
      const nested = prune(value as Json);
      if (Object.keys(nested).length === 0) continue;
      output[key] = nested;
      continue;
    }
    output[key] = value;
  }
  return output as T;
}

export function generalContractorSchema(): Json {
  const street = realValue(company.address.street);
  const postalCode = realValue(company.address.postalCode);

  return prune({
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    additionalType: "https://schema.org/GeneralContractor",
    "@id": `${siteUrl}/#organization`,
    name: company.name,
    legalName: company.legalName,
    url: siteUrl,
    description: company.positioning,
    image: `${siteUrl}/og-image.jpg`,
    logo: `${siteUrl}/images/branding/lhc-logo.png`,
    telephone: realValue(company.phone),
    email: realValue(company.email),
    founder: company.principal,
    address:
      street && postalCode
        ? {
            "@type": "PostalAddress",
            streetAddress: street,
            addressLocality: company.address.city,
            addressRegion: company.address.state,
            postalCode,
            addressCountry: company.address.country,
          }
        : undefined,
    areaServed: [
      { "@type": "Place", name: "Old Metairie, Louisiana" },
      { "@type": "City", name: "New Orleans, Louisiana" },
    ],
    knowsAbout: [
      "Custom home building",
      "Custom cabinetry",
      "Luxury kitchens",
      "Tile and stone work",
      "Outdoor living",
    ],
    sameAs: Object.values(company.social).filter((url) => !isPlaceholder(url)),
  });
}

export function websiteSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: company.name,
    url: siteUrl,
    publisher: { "@id": `${siteUrl}/#organization` },
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.path === "/" ? "" : crumb.path}`,
    })),
  };
}

export function servicesSchema(
  items: { title: string; summary: string; slug: string }[],
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Services offered by ${company.name}`,
    itemListElement: items.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.summary,
        serviceType: service.title,
        provider: { "@id": `${siteUrl}/#organization` },
        areaServed: { "@type": "City", name: "New Orleans, Louisiana" },
        url: `${siteUrl}/services#${service.slug}`,
      },
    })),
  };
}

/** The completed-project portfolio, as a list of creative works. */
export function projectsSchema(items: Project[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Homes built by ${company.name}`,
    itemListElement: items.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        description: project.summary,
        url: `${siteUrl}/projects/${project.slug}`,
        image: `${siteUrl}${project.images[0].src}`,
        creator: { "@id": `${siteUrl}/#organization` },
        locationCreated: { "@type": "Place", name: project.location },
      },
    })),
  };
}

export function faqSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        // Strip the bracketed confirm-this markers out of published answers.
        text: item.answer.replace(/\s*\[[^\]]+\]/g, "").trim(),
      },
    })),
  };
}
