import Image from "next/image"
import Link from "next/link"
import { LogoMark, Wordmark } from "@/components/brand/logo"

/*
 * Mirrors thenatureclub.in: the composition never reflows, it scales.
 * Same height as the original: a 16:9 frame that stops growing at 768px (from ~1366px wide),
 * whatever the viewport height. The lockup sits top-left and the tagline bottom-right.
 * Like the original, the photo bleeds edge to edge but the composition stops
 * growing at 1440px and stays centred.
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
      className="relative isolate h-[min(56.25vw,48rem)] w-full overflow-hidden bg-ink text-white"
    >
      <Image
        src={imageUrl}
        alt={imageAlt ?? ""}
        fill
        preload
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      <div className="@container absolute inset-y-0 right-0 left-0 mx-auto max-w-360">
        {/* Keep both text corners legible over any photo; anchored to the composition, not the viewport. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(0,0,0,0.6),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(0,0,0,0.55),transparent_55%)]"
        />

        <div className="absolute top-[14%] left-[clamp(0.5rem,14cqw-4rem,12%)] flex items-center gap-[1.2cqw]">
          <LogoMark className="size-[calc(9cqw+2rem)] max-h-56 max-w-56 shrink-0" />
          <h1
            id="hero-heading"
            className="text-[clamp(1rem,3cqw,4rem)] text-mist drop-shadow-sm"
          >
            <Wordmark />
          </h1>
        </div>

        <div className="absolute top-[60%] right-[3%] left-[60%]">
          <p className="font-display text-[clamp(0.8rem,2.25cqw+0.25rem,3.25rem)] leading-[1.2]">
            {headline}
          </p>
          <Link
            href="#contact"
            className="mt-[1.2cqw] inline-flex items-center rounded-full border border-white/90 px-[clamp(0.6rem,1cqw,1rem)] py-[clamp(0.2rem,0.45cqw,0.5rem)] text-[clamp(0.65rem,0.5rem+0.4cqw,0.95rem)] transition-[color,background-color,scale] duration-150 ease-out hover:bg-white hover:text-ink active:scale-[0.97]"
          >
            Book Now
          </Link>
        </div>
      </div>
    </section>
  )
}
