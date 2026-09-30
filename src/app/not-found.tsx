import type { Metadata } from "next"
import Link from "next/link"
import { PageHeading } from "@/components/page-heading"

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
}

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Stories", href: "/blogs" },
  { label: "Gallery", href: "/gallery" },
]

export default function NotFound() {
  return (
    <main className="px-[clamp(1rem,4vw,6rem)] py-[clamp(4rem,12vw,9rem)] text-center">
      <PageHeading title="Page not found" subtitle="This trail doesn’t lead anywhere — try one of these instead." />
      <nav aria-label="Site pages" className="mt-10">
        <ul className="flex flex-wrap justify-center gap-3">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-flex rounded-full border border-ink px-5 py-2 text-sm transition-[color,background-color,scale] duration-150 ease-out hover:bg-ink hover:text-cream active:scale-[0.97]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  )
}
