import { cache } from "react"
import { client } from "@/sanity/client"
import { SITE_SETTINGS_QUERY, TESTIMONIALS_QUERY } from "@/sanity/queries"

export type SocialLink = { platform: string; url: string }
export type BusinessHours = { day: string; opens: string; closes: string }

export type SiteSettings = {
  siteTitle?: string
  tagline?: string
  description?: string
  heroHeadline?: string
  heroImageUrl?: string
  heroImageAlt?: string
  aboutHeadline?: string
  aboutParagraph?: string
  aboutImageTopRightUrl?: string
  aboutImageTopRightAlt?: string
  logoUrl?: string
  contactEmail?: string
  address?: { locality?: string; region?: string; country?: string }
  businessHours?: BusinessHours[]
  socialLinks?: SocialLink[]
}

// Shared by the root layout and pages, deduped per request.
export const getSiteSettings = cache(async (): Promise<SiteSettings | null> => {
  try {
    return await client.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY)
  } catch (err) {
    console.error("Failed to fetch site settings from Sanity:", err)
    return null
  }
})

export const SITE_NAME = "The Nature Club"

export const DEFAULT_DESCRIPTION =
  "The Nature Club runs landscape, travel and wildlife photography tours across India from Bangalore — seasonal expeditions to Ladakh, the Western Ghats, Pench, Hampi and more."

// Contact details from thenatureclub.in, used until they are filled in Site Settings.
const FALLBACK_CONTACT = {
  email: "mail@thenatureclub.in",
  address: { locality: "Bangalore", region: "Karnataka", country: "IN" },
  hours: [
    { day: "Monday", opens: "08:00", closes: "19:00" },
    { day: "Tuesday", opens: "08:00", closes: "17:00" },
    { day: "Wednesday", opens: "08:00", closes: "17:00" },
    { day: "Thursday", opens: "08:00", closes: "19:00" },
    { day: "Friday", opens: "08:00", closes: "17:00" },
  ] satisfies BusinessHours[],
}

export type Contact = {
  email: string
  address: { locality: string; region: string; country: string }
  hours: BusinessHours[]
  socialLinks: SocialLink[]
}

export function getContact(settings: SiteSettings | null): Contact {
  return {
    email: settings?.contactEmail || FALLBACK_CONTACT.email,
    address: {
      locality: settings?.address?.locality || FALLBACK_CONTACT.address.locality,
      region: settings?.address?.region || FALLBACK_CONTACT.address.region,
      country: settings?.address?.country || FALLBACK_CONTACT.address.country,
    },
    hours: settings?.businessHours?.length ? settings.businessHours : FALLBACK_CONTACT.hours,
    socialLinks: settings?.socialLinks ?? [],
  }
}

/** "08:00" → "8am", "17:30" → "5:30pm" */
export function formatTime(value: string) {
  const [h, m] = value.split(":").map(Number)
  const suffix = h >= 12 ? "pm" : "am"
  const hour = h % 12 || 12
  return m ? `${hour}:${String(m).padStart(2, "0")}${suffix}` : `${hour}${suffix}`
}

export type Testimonial = {
  id: string
  quote: string
  name: string
  place?: string
  rating: number
}

// Guest testimonials from thenatureclub.in, used until testimonials are added in Sanity.
const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: "rohan-mehta",
    quote:
      "Our stay in Kabini was exceptional. The naturalist’s knowledge and tracking skills made every safari exciting, and we were fortunate to witness a tigress with cubs near the backwaters. The hospitality, food, and peaceful atmosphere made it a memorable wildlife experience for our family.",
    name: "Rohan Mehta",
    place: "Kabini, Karnataka",
    rating: 5,
  },
  {
    id: "ananya-iyer",
    quote:
      "I had always dreamed of visiting Ranthambore National Park, and this trip exceeded all expectations. From spotting a majestic tiger to enjoying beautiful landscapes and birdlife, everything was perfectly organised. The guides were patient, informative, and passionate about conservation.",
    name: "Ananya Iyer",
    place: "Ranthambore, Rajasthan",
    rating: 5,
  },
  {
    id: "vikram-singh",
    quote:
      "Our journey to Kaziranga National Park was absolutely unforgettable. Seeing the one-horned rhinoceros in the wild was a once-in-a-lifetime experience. The arrangements were seamless, and the team ensured we were comfortable throughout the trip. Highly recommended for wildlife enthusiasts.",
    name: "Vikram Singh",
    place: "Kaziranga, Assam",
    rating: 5,
  },
  {
    id: "priya-nair",
    quote:
      "The safari experience in Jim Corbett National Park was fantastic. We spotted elephants, tigers, a yellow-throated marten, and an incredible variety of birds. The stay was comfortable, and the overall itinerary was thoughtfully planned. It was the perfect mix of adventure and relaxation.",
    name: "Priya Nair",
    place: "Corbett, Uttarakhand",
    rating: 5,
  },
]

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const rows = await client.fetch<(Omit<Testimonial, "id"> & { _id: string })[]>(
      TESTIMONIALS_QUERY
    )
    if (rows?.length) return rows.map(({ _id, ...t }) => ({ id: _id, ...t }))
  } catch (err) {
    console.error("Failed to fetch testimonials from Sanity:", err)
  }
  return FALLBACK_TESTIMONIALS
}
