import Image from "next/image"

// Text left, photo right at every width — scaled rather than stacked, as on thenatureclub.in.
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
      className="grid grid-cols-[37fr_63fr] items-center bg-ink py-[clamp(1.75rem,7.5vw,7rem)] text-white"
    >
      <div className="px-[clamp(0.75rem,3.2vw,5rem)]">
        <h2
          id="about-heading"
          className="font-display text-[clamp(0.8rem,2.2vw,2.4rem)] leading-tight"
        >
          {heading}
        </h2>
        <p className="mt-[1.6vw] text-[clamp(0.68rem,1.85vw,1.6rem)] leading-relaxed whitespace-pre-line text-mist/90">
          {paragraph}
        </p>
      </div>
      {imageUrl && (
        <div className="relative aspect-3/2">
          <Image
            src={imageUrl}
            alt={imageAlt ?? ""}
            fill
            sizes="63vw"
            className="object-cover"
          />
        </div>
      )}
    </section>
  )
}
