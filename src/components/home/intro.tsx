import Image from "next/image"

// Text left, photo right at every width — scaled rather than stacked, as on thenatureclub.in.
// Like the original, the composition scales with the viewport up to 1440px, then stays centred.
export function Intro({
  heading,
  paragraph,
  imageUrl,
  imageAlt,
}: {
  heading: string
  paragraph: string
  imageUrl?: string
  imageAlt?: string
}) {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-ink text-white"
    >
      <div className="@container mx-auto max-w-360">
        <div className="grid grid-cols-[37fr_63fr] items-center py-[clamp(1.75rem,7.5cqw,7rem)]">
          <div className="px-[clamp(0.75rem,3.2cqw,5rem)]">
            <h2
              id="about-heading"
              className="font-display text-[clamp(0.8rem,2.2cqw,2.4rem)] leading-tight"
            >
              {heading}
            </h2>
            <p className="mt-[1.6cqw] text-[clamp(0.68rem,1.85cqw,1.6rem)] leading-relaxed whitespace-pre-line text-mist/90">
              {paragraph}
            </p>
          </div>
          {imageUrl && (
            <div className="relative aspect-3/2">
              <Image
                src={imageUrl}
                alt={imageAlt ?? ""}
                fill
                sizes="(min-width: 1440px) 907px, 63vw"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
