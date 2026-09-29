/**
 * Brings Sanity content in line with the thenatureclub.in copy:
 * site settings text, contact details, business hours and guest testimonials.
 * Safe to re-run: settings are patched and testimonials use fixed ids.
 *
 *   npx tsx scripts/seed-content.ts
 */
import * as dotenv from "dotenv"
dotenv.config()

import { createClient } from "next-sanity"

const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN
if (!token) {
  console.error("❌ SANITY_API_WRITE_TOKEN is missing in environment!")
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "gnfni9vb",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-03-01",
  useCdn: false,
  token,
})

const SETTINGS = {
  heroHeadline: "Landscape & Travel Photography Tours",
  aboutHeadline: "Hi, What are we into?",
  aboutParagraph:
    "We are into landscape and travel photography, specialising in capturing the nuances of different seasons.\n\nWe have traveled extensively, photographing the world's most breathtaking views.",
  description:
    "The Nature Club runs landscape, travel and wildlife photography tours across India from Bangalore — seasonal expeditions to Ladakh, the Western Ghats, Pench, Hampi and more.",
  contactEmail: "mail@thenatureclub.in",
  address: { locality: "Bangalore", region: "Karnataka", country: "IN" },
  businessHours: [
    { day: "Monday", opens: "08:00", closes: "19:00" },
    { day: "Tuesday", opens: "08:00", closes: "17:00" },
    { day: "Wednesday", opens: "08:00", closes: "17:00" },
    { day: "Thursday", opens: "08:00", closes: "19:00" },
    { day: "Friday", opens: "08:00", closes: "17:00" },
  ].map((h) => ({ _key: h.day.toLowerCase(), ...h })),
}

const TESTIMONIALS = [
  {
    name: "Rohan Mehta",
    place: "Kabini, Karnataka",
    quote:
      "Our stay in Kabini was exceptional. The naturalist’s knowledge and tracking skills made every safari exciting, and we were fortunate to witness a tigress with cubs near the backwaters. The hospitality, food, and peaceful atmosphere made it a memorable wildlife experience for our family.",
  },
  {
    name: "Ananya Iyer",
    place: "Ranthambore, Rajasthan",
    quote:
      "I had always dreamed of visiting Ranthambore National Park, and this trip exceeded all expectations. From spotting a majestic tiger to enjoying beautiful landscapes and birdlife, everything was perfectly organised. The guides were patient, informative, and passionate about conservation.",
  },
  {
    name: "Vikram Singh",
    place: "Kaziranga, Assam",
    quote:
      "Our journey to Kaziranga National Park was absolutely unforgettable. Seeing the one-horned rhinoceros in the wild was a once-in-a-lifetime experience. The arrangements were seamless, and the team ensured we were comfortable throughout the trip. Highly recommended for wildlife enthusiasts.",
  },
  {
    name: "Priya Nair",
    place: "Corbett, Uttarakhand",
    quote:
      "The safari experience in Jim Corbett National Park was fantastic. We spotted elephants, tigers, a yellow-throated marten, and an incredible variety of birds. The stay was comfortable, and the overall itinerary was thoughtfully planned. It was the perfect mix of adventure and relaxation.",
  },
]

async function main() {
  // Patch the published settings doc and any unpublished draft of it, so Studio shows the same text.
  const ids = await client.fetch<string[]>(`*[_type == "siteSettings"]._id`)
  if (ids.length === 0) throw new Error("No siteSettings document found")

  const tx = client.transaction()
  for (const id of ids) tx.patch(id, (p) => p.set(SETTINGS))

  TESTIMONIALS.forEach((t, i) => {
    tx.createOrReplace({
      _id: `testimonial-${t.name.toLowerCase().replace(/\s+/g, "-")}`,
      _type: "testimonial",
      ...t,
      rating: 5,
      displayOrder: i + 1,
    })
  })

  await tx.commit()
  console.log(`✅ Updated site settings (${ids.join(", ")}) and ${TESTIMONIALS.length} testimonials`)
}

main().catch((err) => {
  console.error("❌", err.message)
  process.exit(1)
})
