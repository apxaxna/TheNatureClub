import type { Contact, SiteSettings } from "@/data/site"
import { DEFAULT_DESCRIPTION, SITE_NAME } from "@/data/site"

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://thenatureclub.in").replace(/\/$/, "")

export const ORGANIZATION_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`

export const absoluteUrl = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`

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
    ...(settings?.logoUrl && { logo: settings.logoUrl, image: settings.logoUrl }),
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
