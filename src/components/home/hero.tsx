import Image from "next/image"
import Link from "next/link"
import { LogoMark, Wordmark } from "@/components/brand/logo"

/*
 * Mirrors thenatureclub.in: the composition never reflows, it scales.
 * Height runs from ~56vw on phones to ~44vw on desktop (capped at the viewport),
 * the lockup sits top-left and the tagline bottom-right at every width.
 */
export function Hero({
  headline,
  imageUrl,
  imageAlt,
}: {
  headline: string
  imageUrl: string
  imageAlt?: string
}) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate h-[min(calc(39vw+6.3rem),calc(100svh-var(--header-h)))] min-h-64 w-full overflow-hidden bg-ink text-white"
    >
      <Image
        src={imageUrl}
        alt={imageAlt ?? ""}
        fill
        preload
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      {/* Keep both text corners legible over any photo. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(0,0,0,0.6),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(0,0,0,0.55),transparent_55%)]"
      />

      <div className="absolute top-[14%] left-[clamp(0.5rem,14vw-4rem,12%)] flex items-center gap-[1.2vw]">
        <LogoMark className="size-[calc(9vw+2rem)] max-h-56 max-w-56 shrink-0" />
        <h1
          id="hero-heading"
          className="text-[clamp(1rem,3vw,4rem)] text-mist drop-shadow-sm"
        >
          <Wordmark />
        </h1>
      </div>

      <div className="absolute top-[60%] right-[3%] left-[60%]">
        <p className="font-display text-[clamp(0.8rem,2.25vw+0.25rem,3.25rem)] leading-[1.2]">
          {headline}
        </p>
        <Link
          href="#contact"
          className="mt-[1.2vw] inline-flex items-center rounded-full border border-white/90 px-[clamp(0.6rem,1vw,1rem)] py-[clamp(0.2rem,0.45vw,0.5rem)] text-[clamp(0.65rem,0.5rem+0.4vw,0.95rem)] transition-colors hover:bg-white hover:text-ink"
        >
          Book Now
        </Link>
      </div>
    </section>
  )
}
