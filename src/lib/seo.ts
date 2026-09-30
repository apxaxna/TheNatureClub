import type { Metadata } from "next"
import type { Contact, SiteSettings } from "@/data/site"
import { DEFAULT_DESCRIPTION, SITE_NAME } from "@/data/site"

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://thenatureclub.in").replace(/\/$/, "")

export const ORGANIZATION_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`

export const absoluteUrl = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`

/** Sanity CDN crop sized for link previews (Open Graph / X cards). */
export const shareImage = (url: string) => ({
  url: `${url}?w=1200&h=630&fit=crop&auto=format`,
  width: 1200,
  height: 630,
})

/**
 * A page's `openGraph` replaces the root layout's wholesale (metadata merges shallowly),
 * so every page builds the full object here to keep site name and locale. Pages without
 * a photo of their own pass the Site Settings hero image as `image`.
 */
export function pageOpenGraph({
  path,
  title,
  description,
  image,
  imageAlt,
  ...rest
}: {
  path: string
  title?: string
  description?: string
  image?: string
  imageAlt?: string
} & Partial<NonNullable<Metadata["openGraph"]>>): Metadata["openGraph"] {
  return {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_IN",
    url: path,
    title,
    description,
    ...(image && { images: [{ ...shareImage(image), alt: imageAlt || title || SITE_NAME }] }),
    ...rest,
  } as Metadata["openGraph"]
}

/** Canonical URL plus the stories feed (a page's `alternates` also replaces the layout's). */
export const pageAlternates = (path: string): Metadata["alternates"] => ({
  canonical: path,
  types: { "application/rss+xml": [{ url: "/feed.xml", title: `${SITE_NAME} Stories` }] },
})

const DAY_URI = (day: string) => `https://schema.org/${day}`

// TravelAgency is a LocalBusiness subtype, so it carries address, hours and contact.
export function organizationJsonLd(settings: SiteSettings | null, contact: Contact) {
  return {
    "@type": "TravelAgency",
    "@id": ORGANIZATION_ID,
    name: settings?.siteTitle || SITE_NAME,
    url: SITE_URL,
    description: settings?.description || DEFAULT_DESCRIPTION,
    slogan: settings?.heroHeadline,
    logo: settings?.logoUrl || absoluteUrl("/icon.png"),
    ...(settings?.heroImageUrl && { image: settings.heroImageUrl }),
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: contact.address.locality,
      addressRegion: contact.address.region,
      addressCountry: contact.address.country,
    },
    areaServed: { "@type": "Country", name: "India" },
    knowsAbout: [
      "Landscape photography",
      "Travel photography",
      "Wildlife photography",
      "Wildlife safaris in India",
    ],
    openingHoursSpecification: contact.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: DAY_URI(h.day),
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: contact.socialLinks.map((l) => l.url),
  }
}

export function websiteJsonLd(settings: SiteSettings | null) {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: settings?.siteTitle || SITE_NAME,
    description: settings?.description || DEFAULT_DESCRIPTION,
    inLanguage: "en-IN",
    publisher: { "@id": ORGANIZATION_ID },
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
