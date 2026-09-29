import type { IconType } from "react-icons"
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
  FaLink,
} from "react-icons/fa6"
import { formatTime, type Contact } from "@/data/site"

const SOCIAL_ICONS: Record<string, IconType> = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
  x: FaXTwitter,
  twitter: FaXTwitter,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
}

function iconFor(platform: string) {
  return SOCIAL_ICONS[platform.trim().toLowerCase()] ?? FaLink
}

const REGION_NAMES = new Intl.DisplayNames(["en"], { type: "region" })

export function SiteFooter({ contact }: { contact: Contact }) {
  const { email, address, hours, socialLinks } = contact

  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="relative isolate mt-auto overflow-hidden bg-slate text-mist"
    >
      {/* Background video; hidden for reduced-motion users, who get the solid slate. */}
      <video
        src="/videos/fish.webm"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 -z-10 size-full object-cover motion-reduce:hidden"
      />
      {/* Darkening scrim so the footer text stays legible over the footage. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-slate/75" />

      {/* Contact band */}
      <div className="bg-black/50 px-4 py-[clamp(2.5rem,6vw,5rem)] text-center">
        <h2
          id="contact-heading"
          className="text-[clamp(0.75rem,0.6rem+0.5vw,0.9rem)] font-bold uppercase tracking-[0.25em] text-mist/70"
        >
          Contact Me
        </h2>
        <a
          href={`mailto:${email}`}
          className="mt-3 inline-block font-serif text-[clamp(1.1rem,0.6rem+2.4vw,2.5rem)] break-all text-white underline-offset-8 transition-colors hover:text-gold hover:underline"
        >
          {email}
        </a>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-[clamp(1rem,4vw,3rem)] py-[clamp(2.5rem,6vw,5rem)] min-[480px]:grid-cols-2 md:grid-cols-3 md:gap-8">
        <section aria-labelledby="hours-heading">
          <h2 id="hours-heading" className="font-serif text-[clamp(1.1rem,0.9rem+0.8vw,1.5rem)]">
            Business Hours
          </h2>
          <dl className="mt-4 space-y-1 text-sm text-mist/80 sm:text-base">
            {hours.map((h) => (
              <div key={h.day} className="flex gap-2">
                <dt>{h.day}:</dt>
                <dd>
                  <time dateTime={h.opens}>{formatTime(h.opens)}</time> –{" "}
                  <time dateTime={h.closes}>{formatTime(h.closes)}</time>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {socialLinks.length > 0 && (
          <section aria-labelledby="social-heading">
            <h2 id="social-heading" className="font-serif text-[clamp(1.1rem,0.9rem+0.8vw,1.5rem)]">
              Get Social
            </h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {socialLinks.map((link) => {
                const Icon = iconFor(link.platform)
                return (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer me"
                      aria-label={`The Nature Club on ${link.platform}`}
                      className="flex size-10 items-center justify-center rounded-full bg-white text-black transition-colors hover:bg-gold"
                    >
                      <Icon className="size-4" aria-hidden="true" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </section>
        )}

        <section aria-labelledby="location-heading">
          <h2 id="location-heading" className="font-serif text-[clamp(1.1rem,0.9rem+0.8vw,1.5rem)]">
            Location
          </h2>
          <address className="mt-4 text-sm not-italic text-mist/80 sm:text-base">
            {address.locality}, {address.region}
            <br />
            {REGION_NAMES.of(address.country) ?? address.country}
            <br />
            <a href={`mailto:${email}`} className="hover:text-white">
              {email}
            </a>
          </address>
        </section>
      </div>

      <p className="border-t border-white/10 px-6 py-5 text-center text-xs text-mist/50">
        © {new Date().getFullYear()} The Nature Club. All rights reserved.
      </p>
    </footer>
  )
}
