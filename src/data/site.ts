import { cache } from "react"
import { client } from "@/sanity/client"
import { SITE_SETTINGS_QUERY } from "@/sanity/queries"

export type SocialLink = { platform: string; url: string }

export type SiteSettings = {
  siteTitle?: string
  tagline?: string
  heroHeadline?: string
  heroImageUrl?: string
  aboutHeadline?: string
  aboutParagraph?: string
  aboutImageTopRightUrl?: string
  aboutImageBottomLeftUrl?: string
  footerImageUrl?: string
  logoUrl?: string
  socialLinks?: SocialLink[]
}

// Shared by the root layout (footer) and the home page, deduped per request.
export const getSiteSettings = cache(async (): Promise<SiteSettings | null> => {
  try {
    return await client.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY)
  } catch (err) {
    console.error("Failed to fetch site settings from Sanity:", err)
    return null
  }
})

// Static contact details from thenatureclub.in (not modelled in Sanity yet).
export const CONTACT = {
  email: "mail@thenatureclub.in",
  location: "Bangalore, Karnataka",
  hours: [
    { day: "Monday", time: "8am – 7pm" },
    { day: "Tuesday", time: "8am – 5pm" },
    { day: "Wednesday", time: "8am – 5pm" },
    { day: "Thursday", time: "8am – 7pm" },
    { day: "Friday", time: "8am – 5pm" },
  ],
}

export type Testimonial = {
  quote: string
  name: string
  place: string
  rating: number
}

// Guest testimonials from thenatureclub.in (not modelled in Sanity yet).
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Our stay in Kabini was exceptional. The naturalist’s knowledge and tracking skills made every safari exciting, and we were fortunate to witness a tigress with cubs near the backwaters. The hospitality, food, and peaceful atmosphere made it a memorable wildlife experience for our family.",
    name: "Rohan Mehta",
    place: "Kabini, Karnataka",
    rating: 5,
  },
  {
    quote:
      "I had always dreamed of visiting Ranthambore National Park, and this trip exceeded all expectations. From spotting a majestic tiger to enjoying beautiful landscapes and birdlife, everything was perfectly organised. The guides were patient, informative, and passionate about conservation.",
    name: "Ananya Iyer",
    place: "Ranthambore, Rajasthan",
    rating: 5,
  },
  {
    quote:
      "Our journey to Kaziranga National Park was absolutely unforgettable. Seeing the one-horned rhinoceros in the wild was a once-in-a-lifetime experience. The arrangements were seamless, and the team ensured we were comfortable throughout the trip. Highly recommended for wildlife enthusiasts.",
    name: "Vikram Singh",
    place: "Kaziranga, Assam",
    rating: 5,
  },
  {
    quote:
      "The safari experience in Jim Corbett National Park was fantastic. We spotted elephants, tigers, a yellow-throated marten, and an incredible variety of birds. The stay was comfortable, and the overall itinerary was thoughtfully planned. It was the perfect mix of adventure and relaxation.",
    name: "Priya Nair",
    place: "Corbett, Uttarakhand",
    rating: 5,
  },
]
