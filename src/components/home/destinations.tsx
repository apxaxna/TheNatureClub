import Image from "next/image"
import { Stars } from "@/components/stars"

export type Destination = {
  id: string
  name: string
  location?: string
  imageUrl?: string
  alt?: string
  rating?: number
  maxGuests?: number
  bedsDescription?: string
  pricePerNight?: number
}

export function Destinations({ items }: { items: Destination[] }) {
  if (items.length === 0) return null

  return (
    <section
      id="destinations"
      className="border-t border-line bg-white px-6 py-20 sm:px-12 lg:px-[8%] lg:py-28"
    >
      <h2 className="text-center font-serif text-4xl text-slate sm:text-5xl">
        Destinations
      </h2>
      <ul className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.id}>
            <article>
              <div className="relative aspect-3/2 overflow-hidden bg-line">
                {item.imageUrl && (
                  <Image
                    src={item.imageUrl}
                    alt={item.alt || item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="font-serif text-3xl text-slate">{item.name}</h3>
                  {item.location && (
                    <p className="mt-1 text-sm text-stone">{item.location}</p>
                  )}
                </div>
                {item.rating != null && <Stars rating={item.rating} className="mt-2.5 shrink-0" />}
              </div>
              {(item.maxGuests || item.bedsDescription) && (
                <p className="mt-3 text-slate">
                  {[item.maxGuests && `Max ${item.maxGuests} Guests`, item.bedsDescription]
                    .filter(Boolean)
                    .join(" / ")}
                </p>
              )}
              {item.pricePerNight != null && (
                <p className="mt-1 font-bold text-slate">
                  from ${item.pricePerNight.toLocaleString("en-US")}/night
                </p>
              )}
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
