"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ListIcon, XIcon } from "@phosphor-icons/react"
import { LogoMark } from "@/components/brand/logo"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/#destinations" },
  { label: "Blogs", href: "/blogs" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "#contact" },
]

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  if (href.includes("#")) return false
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-ink/10 bg-cream">
      <div className="flex h-14 items-stretch justify-between pl-4 sm:pl-6">
        <Link
          href="/"
          aria-label="The Nature Club — home"
          className={cn(
            "flex items-center gap-2.5 transition-opacity duration-300",
            // The hero carries the full lockup, so keep the bar quiet on the home page.
            pathname === "/" && "md:pointer-events-none md:opacity-0"
          )}
        >
          <LogoMark className="size-8" />
          <span className="font-serif text-sm font-bold tracking-tight">
            The Nature Club.
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-stretch md:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href)
            return (
              <Link
                key={link.label}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center border-x border-transparent px-4 text-[15px] text-navy/80 transition-colors hover:text-ink lg:px-5",
                  active && "border-line font-bold text-ink"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex w-14 items-center justify-center text-navy md:hidden"
        >
          {open ? <XIcon className="size-6" /> : <ListIcon className="size-6" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-t border-ink/10 bg-cream md:hidden"
        >
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href)
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "block border-b border-ink/5 px-6 py-3.5 text-navy",
                  active && "font-bold text-ink"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      )}
    </header>
  )
}
