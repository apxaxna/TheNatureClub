"use client"

import { ReactLenis } from "lenis/react"
import "lenis/dist/lenis.css"

/*
 * Lenis smooths wheel scrolling on the window. Touch scrolling stays native, and Lenis already
 * honours prefers-reduced-motion. autoToggle pauses it whenever <html> is locked
 * (overflow: hidden while a dialog or the lightbox is open), so those scroll on their own.
 */
export function SmoothScroll() {
  return (
    <ReactLenis
      root
      options={{ lerp: 0.12, anchors: true, autoToggle: true, allowNestedScroll: true }}
    />
  )
}
