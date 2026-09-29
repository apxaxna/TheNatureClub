import type { IconType } from "react-icons"
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
  FaLink,
} from "react-icons/fa6"
import { CONTACT, type SocialLink } from "@/data/site"

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

export function SiteFooter({ socialLinks = [] }: { socialLinks?: SocialLink[] }) {
  return (
    <footer id="contact" className="mt-auto bg-slate text-mist">
      {/* Contact band */}
      <div className="bg-black px-4 py-16 text-center sm:py-20">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-mist/70">
          Contact Me
        </p>
        <a
          href={`mailto:${CONTACT.email}`}
          className="mt-4 inline-block break-all font-serif text-2xl text-white underline-offset-8 transition-colors hover:text-gold hover:underline sm:text-4xl"
        >
          {CONTACT.email}
        </a>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:grid-cols-3 sm:gap-8 sm:py-20">
        <section>
          <h2 className="font-serif text-2xl">Business Hours</h2>
          <dl className="mt-5 space-y-1.5 text-mist/80">
            {CONTACT.hours.map(({ day, time }) => (
              <div key={day} className="flex gap-2">
                <dt>{day}:</dt>
                <dd>{time}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2 className="font-serif text-2xl">Get Social</h2>
          <ul className="mt-5 flex flex-wrap gap-3">
            {socialLinks.map((link) => {
              const Icon = iconFor(link.platform)
              return (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.platform}
                    className="flex size-10 items-center justify-center rounded-full bg-white text-black transition-colors hover:bg-gold"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              )
            })}
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl">Location</h2>
          <address className="mt-5 not-italic text-mist/80">
            {CONTACT.location}
            <br />
            <a href={`mailto:${CONTACT.email}`} className="hover:text-white">
              {CONTACT.email}
            </a>
          </address>
        </section>
      </div>

      <p className="border-t border-white/10 px-6 py-6 text-center text-xs text-mist/50">
        © {new Date().getFullYear()} The Nature Club. All rights reserved.
      </p>
    </footer>
  )
}
