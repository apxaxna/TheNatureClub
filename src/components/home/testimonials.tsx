import { Reveal } from "@/components/reveal"
import { Stars } from "@/components/stars"
import type { Testimonial } from "@/data/site"

export function Testimonials({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-slate px-[clamp(1rem,4vw,6rem)] py-[clamp(2.5rem,7vw,6rem)] text-mist"
    >
      <Reveal
        as="h2"
        id="testimonials-heading"
        className="text-center font-serif text-[clamp(1.5rem,1rem+2.4vw,3.1rem)]"
      >
        What Our Guests Say
      </Reveal>
      <ul className="mx-auto mt-[clamp(2rem,5vw,4rem)] grid max-w-400 grid-cols-1 gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-[clamp(2.5rem,5vw,3.5rem)] min-[560px]:grid-cols-2 xl:grid-cols-4">
        {items.map((t, i) => (
          <Reveal as="li" key={t.id} delay={(i % 4) * 80}>
            <figure className="border-t border-white/10 pt-6">
              <Stars rating={t.rating} />
              <blockquote className="mt-4 text-[clamp(0.95rem,0.85rem+0.35vw,1.15rem)] leading-relaxed text-mist/90">
                <p>“{t.quote}”</p>
              </blockquote>
              <figcaption className="mt-5 text-sm">
                <cite className="font-bold not-italic">{t.name}</cite>
                {t.place && <span className="text-mist/60"> – {t.place}</span>}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
