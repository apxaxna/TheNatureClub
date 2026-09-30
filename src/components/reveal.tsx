"use client"

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from "react"

/**
 * Eases its content in the first time it scrolls into view (see [data-reveal] in globals.css).
 * For content below the fold; anything visible on load should use `animate-enter` instead,
 * so it never waits on hydration.
 */
export function Reveal({
  as: Tag = "div",
  variant = "rise",
  delay = 0,
  className,
  children,
  ...props
}: {
  as?: ElementType
  variant?: "rise" | "fade" | "unveil"
  /** Stagger offset in ms; keep steps between 60 and 80. */
  delay?: number
  className?: string
  children: ReactNode
} & Omit<HTMLAttributes<HTMLElement>, "style" | "children">) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        // Set directly: revealing once needs no re-render.
        el.dataset.revealed = ""
        observer.disconnect()
      },
      { rootMargin: "0px 0px -8% 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
      className={className}
      {...props}
    >
      {children}
    </Tag>
  )
}
