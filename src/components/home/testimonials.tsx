import { Stars } from "@/components/stars"
import type { Testimonial } from "@/data/site"

export function Testimonials({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-slate px-[clamp(1rem,4vw,6rem)] py-[clamp(2.5rem,7vw,6rem)] text-mist"
    >
      <h2
        id="testimonials-heading"
        className="text-center font-serif text-[clamp(1.5rem,1rem+2.4vw,3.1rem)]"
      >
        What Our Guests Say
      </h2>
      <ul className="mx-auto mt-[clamp(2rem,5vw,4rem)] grid max-w-400 grid-cols-1 gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-10 min-[560px]:grid-cols-2 xl:grid-cols-4">
        {items.map((t) => (
          <li key={t.id}>
            <figure>
              <Stars rating={t.rating} />
              <blockquote className="mt-4 text-[clamp(0.95rem,0.85rem+0.35vw,1.15rem)] leading-relaxed text-mist/90">
                <p>“{t.quote}”</p>
              </blockquote>
              <figcaption className="mt-4 text-sm font-bold">
                <cite className="not-italic">{t.name}</cite>
                {t.place && <> – {t.place}</>}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}
