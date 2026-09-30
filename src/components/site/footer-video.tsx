"use client"

import { useEffect, useRef } from "react"

// The footer sits at the bottom of every page, so the footage is only fetched once it
// scrolls near the viewport, and pauses off screen. Reduced-motion users never load it.
export function FooterVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) video.src = src
          video.play().catch(() => {})
        } else if (video.src) {
          video.pause()
        }
      },
      { rootMargin: "200px 0px" },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [src])

  return (
    <video
      ref={videoRef}
      loop
      muted
      playsInline
      preload="none"
      aria-hidden="true"
      className="absolute inset-0 -z-10 size-full object-cover motion-reduce:hidden"
    />
  )
}
