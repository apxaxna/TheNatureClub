import Image from "next/image"

export function Intro({
  paragraph,
  imageUrl,
}: {
  paragraph: string
  imageUrl?: string
}) {
  return (
    <section
      id="about"
      className="grid bg-ink text-white md:grid-cols-2"
    >
      <div className="flex flex-col justify-center px-6 py-20 sm:px-12 lg:px-[12%] lg:py-28">
        <h2 className="font-display text-3xl sm:text-4xl">Hi, What are we into?</h2>
        <p className="mt-6 text-lg leading-relaxed text-mist/90 sm:text-2xl sm:leading-relaxed">
          {paragraph}
        </p>
      </div>
      {imageUrl && (
        <div className="relative min-h-80 md:min-h-full">
          <Image
            src={imageUrl}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      )}
    </section>
  )
}
