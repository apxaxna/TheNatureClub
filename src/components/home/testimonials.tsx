import { Stars } from "@/components/stars"
import type { Testimonial } from "@/data/site"

export function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <section className="bg-slate px-6 py-20 text-mist sm:px-12 lg:px-[8%] lg:py-28">
      <h2 className="text-center font-serif text-4xl sm:text-5xl">What Our Guests Say</h2>
      <ul className="mx-auto mt-14 grid max-w-6xl gap-x-16 gap-y-14 md:grid-cols-2">
        {items.map((t) => (
          <li key={t.name}>
            <figure>
              <Stars rating={t.rating} />
              <blockquote className="mt-4 text-lg leading-relaxed text-mist/90">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-4 font-bold">
                {t.name} – {t.place}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}
