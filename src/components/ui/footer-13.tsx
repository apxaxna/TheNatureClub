"use client";

import { type ReactNode } from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from 'react-icons/fa6';
import LogoIcon from '@/assets/logo-icon';

export interface Footer13Link {
  label: string;
  href: string;
}

export interface Footer13Column {
  title: string;
  links: Footer13Link[];
}

export interface Footer13SocialLink {
  label: string;
  href: string;
  icon: ReactNode;
}

export interface Footer13BottomLink {
  label: string;
  href: string;
}

export interface Footer13Props {
  /** Custom logo mark element */
  logoIcon?: ReactNode;
  brandName?: string;
  tagline?: string;
  /** Navigation columns */
  columns?: Footer13Column[];
  copyright?: string;
  socialLinks?: Footer13SocialLink[];
  bottomLinks?: Footer13BottomLink[];
  className?: string;
}

export const defaultColumns: Footer13Column[] = [
  {
    title: 'Plan your trip',
    links: [
      { label: 'Destination', href: '#destinations' },
      { label: 'Discovery', href: '#discovery' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Gallery', href: '#gallery' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', href: '#about' },
      { label: 'Blogs', href: '#blogs' },
      { label: 'Testimonials', href: '#testimonials' },
    ],
  },
];

const defaultSocials: Footer13SocialLink[] = [
  { label: 'Facebook', href: 'https://facebook.com', icon: <FaFacebookF /> },
  { label: 'Twitter / X', href: 'https://x.com', icon: <FaXTwitter /> },
  { label: 'Instagram', href: 'https://instagram.com', icon: <FaInstagram /> },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: <FaLinkedinIn /> },
];

const defaultBottomLinks: Footer13BottomLink[] = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Cookie Policy', href: '#' },
];

export function Footer13({
  logoIcon,
  brandName = 'The Nature Club',
  tagline = 'Curated wildlife safaris, wilderness expeditions & mindful travel.',
  columns = defaultColumns,
  copyright = '© 2026 The Nature Club. All rights reserved.',
  socialLinks = defaultSocials,
  bottomLinks = defaultBottomLinks,
  className = '',
}: Footer13Props) {
  return (
    <footer className={`w-full relative z-20 font-sans antialiased text-white ${className}`}>
      <div className="w-full max-w-7xl 2xl:max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-8 pb-4">
        {/* Four Columns Layout:
            1. Logo & Agency Name + Tagline (in one single line)
            2. Plan your trip
            3. Explore
            4. Company
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.55fr_1fr_1fr_1fr] w-full gap-8 sm:gap-10 lg:gap-8 xl:gap-12 items-start border-b border-white/20 pb-10 lg:pb-12">
          {/* Column 1: Logo & Agency Name + Tagline */}
          <div className="flex flex-col sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3.5 sm:gap-4">
              <span className="shrink-0">
                {logoIcon ?? (
                  <LogoIcon className="w-24 h-24 sm:w-24 sm:h-24 lg:w-36 lg:h-36 object-contain drop-shadow-md -ml-4 lg:-ml-6 -mt-12" />
                )}
              </span>
              <span className="text-2xl font-black tracking-wider text-white uppercase select-none leading-none -mt-12">
                {brandName}
              </span>
            </div>

            {tagline && (
              <p className="mt-3.5 text-xs sm:text-sm lg:text-[13px] xl:text-[14.5px] font-light text-white/80 whitespace-normal sm:whitespace-nowrap tracking-wide leading-relaxed">
                {tagline}
              </p>
            )}
          </div>

          {/* Columns 2, 3, 4: Plan your trip, Explore, Company */}
          {columns.map((col) => (
            <div
              key={col.title}
              className="flex flex-col lg:justify-self-center last:lg:justify-self-end"
            >
              <h3 className="text-lg sm:text-xl font-semibold tracking-wide text-white">
                {col.title}
              </h3>
              <ul className="mt-4 sm:mt-5 space-y-3 sm:space-y-3.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm sm:text-base font-normal text-white/80 transition-colors duration-200 hover:text-white inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar: Copyright, Socials, Policy Links */}
        <div className="flex flex-col gap-4 pt-6 pb-2 text-xs sm:text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-6 w-full">
          <p className="font-normal text-white/80">{copyright}</p>

          <div className="flex items-center gap-1.5">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-9 min-w-9 items-center justify-center text-white/80 transition-colors duration-200 hover:text-white hover:bg-white/10 rounded-full"
              >
                <span className="text-base">{link.icon}</span>
              </a>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {bottomLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs sm:text-sm font-normal text-white/70 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
