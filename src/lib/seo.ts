import type { Metadata } from "next";
import { company } from "@/data/company";

/**
 * Canonical origin for the site. Set NEXT_PUBLIC_SITE_URL in the hosting
 * environment before launch — Open Graph and sitemap URLs must be absolute.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.lhcbuilders.com"
).replace(/\/$/, "");

export const siteName = company.name;

type PageMetaInput = {
  title: string;
  description: string;
  /** Path with a leading slash, e.g. "/services". */
  path: string;
};

/**
 * Builds per-page metadata with a canonical URL and matching social cards, so
 * every page differs rather than inheriting one generic set of tags.
 */
export function pageMetadata({ title, description, path }: PageMetaInput): Metadata {
  const url = `${siteUrl}${path === "/" ? "" : path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url,
      siteName,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: `${siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${siteName} — custom homes in Old Metairie and New Orleans`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteName}`,
      description,
      images: [`${siteUrl}/og-image.jpg`],
    },
  };
}
