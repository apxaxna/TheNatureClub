"use client"

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { LogoMark } from "@/components/brand/logo"
import { useContactDialog } from "@/components/contact/contact-dialog"
import { iconFor } from "@/components/site/social-icons"
import type { SocialLink } from "@/data/site"
import { cn } from "@/lib/utils"

type NavLink = { label: string; href: string }

// Stagger index for the panel's contents (see .menu-item in globals.css).
const item = (i: number) => ({ "--i": i }) as CSSProperties

// Same duration and curve as the opening slide in globals.css (.menu-panel[open]).
const SLIDE_MS = 500
const EASE_DRAWER = "cubic-bezier(0.32, 0.72, 0, 1)"

/*
 * Small-screen navigation, after jamesgodber.com: a quiet "Menu" label in the bar opens a
 * full-screen panel that slides in from the right, with the links stacked in the centre.
 * A modal <dialog> gives focus trapping, Escape to close and page inertness for free.
 */
export function MobileMenu({
  links,
  isActive,
  socialLinks,
}: {
  links: NavLink[]
  isActive: (href: string) => boolean
  socialLinks: SocialLink[]
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState(false)
  const openContact = useContactDialog()

  const closing = useRef<Animation | null>(null)

  /*
   * Slide the panel back out the way it came, then close the dialog. Driven by WAAPI rather than
   * CSS exit transitions: those rely on transition-behavior for display/overlay, which not every
   * browser supports, and without it the panel just vanishes.
   */
  const close = useCallback(() => {
    const dialog = dialogRef.current
    if (!dialog?.open || closing.current) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const slide = dialog.animate(
      reduce
        ? [{ opacity: 1 }, { opacity: 0 }]
        : [{ translate: getComputedStyle(dialog).translate }, { translate: "100% 0" }],
      { duration: reduce ? 200 : SLIDE_MS, easing: reduce ? "ease" : EASE_DRAWER, fill: "forwards" }
    )
    closing.current = slide
    slide.finished
      .then(() => dialog.close())
      .catch(() => {}) // cancelled
      .finally(() => {
        slide.cancel()
        closing.current = null
      })
  }, [])

  // The panel only exists below md; if the window grows past that while it's open, close it.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 48rem)")
    const onChange = () => {
      if (!desktop.matches) return
      closing.current?.cancel()
      dialogRef.current?.close()
    }
    desktop.addEventListener("change", onChange)
    return () => desktop.removeEventListener("change", onChange)
  }, [])

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="group flex items-center gap-2.5 px-[clamp(1rem,4vw,1.5rem)] text-[0.7rem] font-bold tracking-[0.25em] text-navy/75 uppercase transition-colors duration-200 hover:text-ink md:hidden"
      >
        Menu
        {/* Two rules; the short one stretches to meet the long one on hover. */}
        <span aria-hidden="true" className="flex w-5 flex-col items-end gap-1.25">
          <span className="h-px w-5 bg-current" />
          <span className="h-px w-3 bg-current transition-[width] duration-200 ease-out-strong group-hover:w-5" />
        </span>
      </button>

      <dialog
        ref={dialogRef}
        id="mobile-menu"
        aria-label="Menu"
        data-lenis-prevent
        // Escape: run the same slide-out instead of the browser's instant close.
        onCancel={(e) => {
          e.preventDefault()
          close()
        }}
        onClose={() => setOpen(false)}
        onToggle={(e) => setOpen(e.currentTarget.open)}
        // Explicitly fixed, so it can never fall back to the non-modal position: absolute.
        className="menu-panel fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto bg-ink text-mist backdrop:bg-transparent"
      >
        <div className="flex min-h-full flex-col">
          {/* Mirrors the bar it covers, so opening feels like the header turning over. */}
          <div className="flex h-(--header-h) shrink-0 items-center justify-between border-b border-white/10">
            <Link
              href="/"
              onClick={close}
              aria-label="The Nature Club — home"
              className="flex items-center gap-2 pl-[clamp(0.5rem,2vw,1.5rem)]"
            >
              <LogoMark className="size-[clamp(1.6rem,4vw,2.1rem)]" />
              <span className="font-serif text-sm font-bold tracking-tight text-white">The Nature Club.</span>
            </Link>
            <button
              type="button"
              onClick={close}
              className="group flex h-full items-center gap-2 px-[clamp(1rem,4vw,1.5rem)] text-[0.7rem] font-bold tracking-[0.25em] text-mist/70 uppercase transition-colors duration-200 hover:text-white"
            >
              Close
              <X
                aria-hidden="true"
                className="size-4 transition-transform duration-300 ease-out-strong group-hover:rotate-90"
              />
            </button>
          </div>

          <nav
            aria-label="Main"
            className="flex flex-1 flex-col items-center justify-center px-gutter py-12 text-center"
          >
            <ul className="flex flex-col items-center gap-7">
              {links.map((link, i) => {
                const active = isActive(link.href)
                return (
                  <li key={link.href} className="menu-item" style={item(i)}>
                    <Link
                      href={link.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "inline-block py-1 font-display text-2xl tracking-[0.2em] uppercase transition-colors duration-200 active:scale-[0.97]",
                        active ? "text-gold" : "text-mist/85 hover:text-white"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>

            <div aria-hidden="true" className="menu-item my-10 h-px w-8 bg-white/20" style={item(links.length)} />

            <div className="menu-item" style={item(links.length + 1)}>
              <button
                type="button"
                onClick={() => {
                  close()
                  openContact()
                }}
                className="py-1 text-xs tracking-[0.25em] text-mist/60 uppercase transition-colors duration-200 hover:text-white"
              >
                Contact
              </button>
            </div>

            {socialLinks.length > 0 && (
              <ul className="menu-item mt-10 flex justify-center gap-6" style={item(links.length + 2)}>
                {socialLinks.map((social) => {
                  const Icon = iconFor(social.platform)
                  return (
                    <li key={social.url}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer me"
                        aria-label={`The Nature Club on ${social.platform}`}
                        className="flex size-10 items-center justify-center text-mist/50 transition-colors duration-200 hover:text-gold"
                      >
                        <Icon className="size-4.5" aria-hidden="true" />
                      </a>
                    </li>
                  )
                })}
              </ul>
            )}
          </nav>

          <p
            className="menu-item px-gutter pb-8 text-center text-[0.65rem] leading-loose tracking-[0.2em] text-mist/35 uppercase"
            style={item(links.length + 3)}
          >
            Landscape &amp; travel photography tours
          </p>
        </div>
      </dialog>
    </>
  )
}
