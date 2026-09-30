import type { IconType } from "react-icons"
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
  FaLink,
} from "react-icons/fa6"

const SOCIAL_ICONS: Record<string, IconType> = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
  x: FaXTwitter,
  twitter: FaXTwitter,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
}

export function iconFor(platform: string) {
  return SOCIAL_ICONS[platform.trim().toLowerCase()] ?? FaLink
}
