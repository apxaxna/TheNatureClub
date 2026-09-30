"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogoMark } from "@/components/brand/logo"
import { ContactButton } from "@/components/contact/contact-dialog"
import { MobileMenu } from "@/components/site/mobile-menu"
import type { SocialLink } from "@/data/site"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Blogs", href: "/blogs" },
  { label: "Gallery", href: "/gallery" },
]

// A gold rule under the link grows from its centre on hover and stays put on the current page.
const LINK_CLASS = cn(
  "relative flex items-center border-x border-transparent px-[clamp(0.35rem,1.6vw,1.25rem)] text-[clamp(0.75rem,0.55rem+0.9vw,1rem)] whitespace-nowrap text-navy/75 transition-colors duration-200 hover:text-ink",
  "after:absolute after:inset-x-[clamp(0.35rem,1.6vw,1.25rem)] after:bottom-3 after:h-px after:scale-x-0 after:bg-gold after:transition-transform after:duration-200 after:ease-out-strong hover:after:scale-x-100"
)

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

// From md up the links sit inline and scale with the viewport; below that they fold into a menu.
export function SiteHeader({ socialLinks }: { socialLinks: SocialLink[] }) {
  const pathname = usePathname()
  const onHome = pathname === "/"

  return (
    <header className="header-elevate fixed inset-x-0 top-0 z-40 h-(--header-h) border-b border-ink/10 bg-cream">
      <div className="flex h-full items-stretch justify-between gap-2">
        <Link
          href="/"
          aria-label="The Nature Club — home"
          className={cn(
            "group flex shrink-0 items-center gap-2 pl-[clamp(0.5rem,2vw,1.5rem)]",
            // The hero carries the full lockup, so the bar's logo only arrives once it scrolls away.
            onHome && "header-logo-reveal invisible"
          )}
        >
          <LogoMark className="size-[clamp(1.6rem,4vw,2.1rem)] transition-transform duration-500 ease-out-strong group-hover:rotate-[-8deg]" />
          <span className="hidden font-serif text-sm font-bold tracking-tight lg:inline">
            The Nature Club.
          </span>
        </Link>

        <nav aria-label="Main" className="hidden min-w-0 items-stretch md:flex">
          <ul className="flex items-stretch">
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href)
              return (
                <li key={link.label} className="flex">
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(LINK_CLASS, active && "border-line font-bold text-ink after:scale-x-100")}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
            <li className="flex">
              <ContactButton className={LINK_CLASS}>Contact</ContactButton>
            </li>
          </ul>
        </nav>

        <MobileMenu
          links={NAV_LINKS}
          isActive={(href) => isActive(pathname, href)}
          socialLinks={socialLinks}
        />
      </div>
    </header>
  )
}
