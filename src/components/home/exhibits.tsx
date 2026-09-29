import Image from "next/image"

export type Exhibit = {
  id: string
  title: string
  description?: string
  imageUrl?: string
  alt?: string
}

export function Exhibits({ items }: { items: Exhibit[] }) {
  if (items.length === 0) return null

  return (
    <section id="discover" className="bg-cream px-6 py-20 sm:px-12 lg:px-[8%] lg:py-28">
      <h2 className="text-center font-display text-4xl sm:text-5xl">The Exhibits</h2>
      <ul className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.id}>
            <figure>
              <div className="relative aspect-4/5 overflow-hidden bg-line">
                {item.imageUrl && (
                  <Image
                    src={item.imageUrl}
                    alt={item.alt || item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                  />
                )}
              </div>
              <figcaption className="mt-5">
                <p className="text-2xl font-bold">{item.title}</p>
                {item.description && (
                  <p className="mt-1.5 text-lg leading-snug text-ink/80">
                    {item.description}
                  </p>
                )}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}
