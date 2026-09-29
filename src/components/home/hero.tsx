import Image from "next/image"
import Link from "next/link"
import { LogoMark, Wordmark } from "@/components/brand/logo"

export function Hero({
  headline,
  imageUrl,
}: {
  headline: string
  imageUrl: string
}) {
  return (
    <section
      aria-label="Introduction"
      className="relative isolate flex min-h-[calc(100svh-3.5rem)] w-full flex-col justify-between overflow-hidden bg-ink px-6 py-12 text-white sm:px-12 lg:px-[12%] lg:py-[8vh]"
    >
      <Image
        src={imageUrl}
        alt=""
        fill
        preload
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      {/* Keep both text corners legible over any photo. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(0,0,0,0.65),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(0,0,0,0.6),transparent_55%)]"
      />

      <div className="flex items-center gap-4 sm:gap-6">
        <LogoMark className="size-24 shrink-0 sm:size-36 lg:size-44" />
        <h1 className="text-3xl text-mist sm:text-5xl lg:text-[3.4rem]">
          <Wordmark />
        </h1>
      </div>

      <div className="mt-16 max-w-xl self-end">
        <p className="font-display text-3xl leading-tight sm:text-4xl lg:text-[2.7rem]">
          {headline}
        </p>
        <Link
          href="#contact"
          className="mt-6 inline-flex items-center rounded-full border border-white/90 px-4 py-2 text-sm transition-colors hover:bg-white hover:text-ink"
        >
          Book Now
        </Link>
      </div>
    </section>
  )
}
