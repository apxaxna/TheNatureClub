"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogoMark } from "@/components/brand/logo"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Blogs", href: "/blogs" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "#contact" },
]

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  if (href.startsWith("#")) return false
  return pathname === href || pathname.startsWith(`${href}/`)
}

// Like thenatureclub.in, the links stay inline at every width and just scale down.
export function SiteHeader() {
  const pathname = usePathname()
  const onHome = pathname === "/"

  return (
    <header className="fixed inset-x-0 top-0 z-40 h-(--header-h) border-b border-ink/10 bg-cream">
      <div className="flex h-full items-stretch justify-between gap-2">
        <Link
          href="/"
          aria-label="The Nature Club — home"
          className={cn(
            "flex shrink-0 items-center gap-2 pl-[clamp(0.5rem,2vw,1.5rem)]",
            // The hero carries the full lockup, so keep the bar quiet on the home page.
            onHome && "invisible"
          )}
        >
          <LogoMark className="size-[clamp(1.6rem,4vw,2.1rem)]" />
          <span className="hidden font-serif text-sm font-bold tracking-tight lg:inline">
            The Nature Club.
          </span>
        </Link>

        <nav aria-label="Main" className="flex min-w-0 items-stretch">
          <ul className="flex items-stretch">
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href)
              return (
                <li key={link.label} className="flex">
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center border-x border-transparent px-[clamp(0.35rem,1.6vw,1.25rem)] text-[clamp(0.75rem,0.55rem+0.9vw,1rem)] whitespace-nowrap text-navy/75 transition-colors hover:text-ink",
                      active && "border-line font-bold text-ink"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
