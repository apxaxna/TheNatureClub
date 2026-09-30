"use client"

import type { ImageLoaderProps } from "next/image"

// Every photo is hosted on an image CDN that resizes on the fly, so resize there instead of
// round-tripping multi-megapixel originals through the Next.js optimizer.
export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  const q = String(quality || 75)
  let url: URL
  try {
    url = new URL(src)
  } catch {
    return src
  }

  switch (url.hostname) {
    // https://www.sanity.io/docs/image-urls
    case "cdn.sanity.io":
      url.searchParams.set("w", String(width))
      url.searchParams.set("q", q)
      url.searchParams.set("fit", "max")
      url.searchParams.set("auto", "format")
      return url.href
    // https://unsplash.com/documentation#dynamically-resizable-images
    case "images.unsplash.com":
      url.searchParams.set("w", String(width))
      url.searchParams.set("q", q)
      url.searchParams.set("fit", "max")
      url.searchParams.set("auto", "format")
      return url.href
    // Placeholders: /seed/<seed>/<w>/<h>, scaled to the requested width.
    case "picsum.photos": {
      const match = url.pathname.match(/^(.*)\/(\d+)\/(\d+)$/)
      if (!match) return src
      const [, base, w, h] = match
      const height = Math.round((width * Number(h)) / Number(w))
      return `${url.origin}${base}/${width}/${height}.webp`
    }
    default:
      return src
  }
}
