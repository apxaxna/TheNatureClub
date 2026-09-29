import Image from "next/image"
import type { Exhibit, ExhibitPhoto } from "@/data/exhibits"
import { cn } from "@/lib/utils"

// Photos run up to three per row; a "wide" photo takes a row to itself.
function toRows(photos: ExhibitPhoto[]) {
  const rows: ExhibitPhoto[][] = []
  let current: ExhibitPhoto[] = []
  for (const photo of photos) {
    if (photo.wide) {
      if (current.length) rows.push(current)
      rows.push([photo])
      current = []
    } else {
      current.push(photo)
      if (current.length === 3) {
        rows.push(current)
        current = []
      }
    }
  }
  if (current.length) rows.push(current)
  return rows
}

// Same proportions as the live site: portrait in threes, landscape in twos, panoramic alone.
const ROW_LAYOUT: Record<number, { grid: string; aspect: string; sizes: string }> = {
  1: { grid: "grid-cols-1", aspect: "aspect-[2/1]", sizes: "94vw" },
  2: { grid: "grid-cols-2", aspect: "aspect-[5/4]", sizes: "47vw" },
  3: { grid: "grid-cols-3", aspect: "aspect-[4/5]", sizes: "31vw" },
}

function Photo({ photo, aspect, sizes }: { photo: ExhibitPhoto; aspect: string; sizes: string }) {
  return (
    <figure>
      <div className={cn("relative overflow-hidden bg-line", aspect)}>
        <Image
          src={photo.imageUrl}
          alt={photo.alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
        />
      </div>
      <figcaption className="mt-[0.9vw] leading-tight">
        <h3 className="text-[clamp(0.62rem,1.5vw,1.5rem)] font-bold">“{photo.title}”</h3>
        {photo.caption && (
          <p className="mt-0.5 text-[clamp(0.55rem,1.25vw,1.25rem)] text-ink/85">
            {photo.caption}
          </p>
        )}
      </figcaption>
    </figure>
  )
}

export function Exhibits({ items }: { items: Exhibit[] }) {
  return items.map((exhibit, i) => {
    const headingId = `${exhibit.slug}-heading`
    return (
      <section
        key={exhibit.id}
        id={exhibit.slug}
        aria-labelledby={headingId}
        className={cn(
          "px-[clamp(0.75rem,3.6vw,6rem)] py-[clamp(1.5rem,5vw,5.5rem)]",
          i % 2 === 0 ? "bg-white" : "bg-cream"
        )}
      >
        <h2
          id={headingId}
          className="text-center font-display text-[clamp(1.05rem,3.4vw,3.25rem)]"
        >
          {exhibit.title}
        </h2>
        {exhibit.description && <p className="sr-only">{exhibit.description}</p>}

        <div className="mt-[clamp(1rem,4vw,4rem)] space-y-[clamp(1.25rem,4.5vw,4.5rem)]">
          {toRows(exhibit.photos).map((row) => {
            const layout = ROW_LAYOUT[row.length]
            return (
              <div key={row[0].id} className={cn("grid gap-[clamp(0.75rem,3.2vw,3.5rem)]", layout.grid)}>
                {row.map((photo) => (
                  <Photo key={photo.id} photo={photo} aspect={layout.aspect} sizes={layout.sizes} />
                ))}
              </div>
            )
          })}
        </div>
      </section>
    )
  })
}
