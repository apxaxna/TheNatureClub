import { client } from "@/sanity/client"
import { DESTINATIONS_QUERY } from "@/sanity/queries"

export type Destination = {
  id: string
  slug?: string
  name: string
  location?: string
  description?: string
  imageUrl?: string
  imageAlt?: string
  rating?: number
  maxGuests?: number
  bedsDescription?: string
  pricePerNight?: number
}

type RawDestination = {
  _id: string
  slug?: string
  name: string
  locationLabel?: string
  description?: string
  imageUrl?: string
  imageAlt?: string
  rating?: number | null
  maxGuests?: number | null
  bedsDescription?: string | null
  pricePerNight?: number | null
}

export async function getDestinations(): Promise<Destination[]> {
  try {
    const rows = await client.fetch<RawDestination[]>(DESTINATIONS_QUERY)
    return (rows ?? []).map((d) => ({
      id: d._id,
      slug: d.slug,
      name: d.name,
      location: d.locationLabel,
      description: d.description,
      imageUrl: d.imageUrl,
      imageAlt: d.imageAlt,
      rating: d.rating ?? undefined,
      maxGuests: d.maxGuests ?? undefined,
      bedsDescription: d.bedsDescription ?? undefined,
      pricePerNight: d.pricePerNight ?? undefined,
    }))
  } catch (err) {
    console.error("Failed to fetch destinations from Sanity:", err)
    return []
  }
}
