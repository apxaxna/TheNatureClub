"use client";

import { CommandMenu, type CommandMenuGroupDef } from "@/components/ui/command-menu";
import Image from "next/image";
import {
  Compass,
  MapPin,
  BookOpen,
  Image as ImageIcon,
  Users,
  Phone,
  Calendar,
} from "lucide-react";
import { TextAnimate } from "@/components/ui/text-animate";
import { Carousel, type CarouselItem } from "@/components/carousel";
import { DestinationCarousel, type DestinationItem } from "@/components/destination-cards";
import { ContactCard } from "@/components/contact-card";
import { Footer } from "@/components/footer";
import { AboutUs } from "@/components/about-us";

const commandGroups: CommandMenuGroupDef[] = [
  {
    heading: "Navigation",
    items: [
      { label: "Home", href: "/", icon: Compass, keywords: ["main", "landing"] },
      { label: "Discovery", href: "/#discover", icon: Compass, keywords: ["explore", "discover", "nature"] },
      { label: "Destinations", href: "/#destinations", icon: MapPin, keywords: ["safari", "tanzania", "places", "camps"] },
      { label: "Blogs", href: "/blogs", icon: BookOpen, keywords: ["stories", "articles", "news"] },
      { label: "Gallery", href: "/gallery", icon: ImageIcon, keywords: ["photos", "pictures", "wildlife"] },
      { label: "About us", href: "/#why-us", icon: Users, keywords: ["story", "team", "mission"] },
      { label: "Contact us", href: "/#contact", icon: Phone, keywords: ["support", "email", "call"] },
    ],
  },
  {
    heading: "Actions",
    items: [
      { label: "Book a trip", href: "/#contact", icon: Calendar, keywords: ["reserve", "booking", "tour"] },
    ],
  },
];

export interface HomeViewProps {
  discoverItems: CarouselItem[];
  destinationItems: DestinationItem[];
  heroHeadline: string;
  heroImageUrl: string;
  footerImageUrl: string;
  aboutHeadline?: string;
  aboutParagraph?: string;
  aboutImageTopRightUrl?: string;
  aboutImageBottomLeftUrl?: string;
}

export function HomeView({
  discoverItems,
  destinationItems,
  heroHeadline,
  heroImageUrl,
  footerImageUrl,
  aboutHeadline,
  aboutParagraph,
  aboutImageTopRightUrl,
  aboutImageBottomLeftUrl,
}: HomeViewProps) {
  return (
    <main className="min-h-svh w-full">
      {/* hero */}
      <section id="hero" className="relative min-h-svh w-full">
        <Image
          src={heroImageUrl}
          alt="hero-page"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Centered Title & Command Menu */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-4 text-center">
          <TextAnimate animation="blurIn" as="h1" className="text-white text-2xl sm:text-3xl md:text-4xl font-normal drop-shadow-md">
            {heroHeadline}
          </TextAnimate>

          <div className="w-full max-w-sm sm:max-w-md">
            <CommandMenu
              placeholder="Search destinations, tours, pages…"
              triggerProps={{
                label: "Search destinations, tours…",
                className:
                  "w-full bg-white/20 hover:bg-white/30 text-white placeholder:text-white/70 border-white/20 backdrop-blur-md shadow-lg transition-all rounded-full px-4 py-2.5",
              }}
              groups={commandGroups}
              showThemeGroup={false}
            />
          </div>
        </div>
      </section>

      {/* Discovery */}
      <section id="discover" className="min-h-svh w-full">
        <div className="h-full w-full flex px-4 sm:px-8 py-6 sm:py-8 lg:py-10">
          <div className="w-full h-full flex flex-col gap-3 sm:gap-4">
            <TextAnimate animation="slideLeft" by="character" as="h1" className="text-black text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight drop-shadow-sm">
              DISCOVER
            </TextAnimate>
            <TextAnimate animation="slideLeft" by="word" as="p" className="text-sm sm:text-base text-neutral-600 max-w-full lg:whitespace-nowrap break-normal">
              Find tours from our curated selection based on seasons, animals, landscapes and more
            </TextAnimate>
            <Carousel items={discoverItems} />
          </div>
        </div>
      </section>

      {/* Why us / About us */}
      <section id="why-us" className="min-h-svh w-full flex flex-col justify-between">
        <div className="w-full flex flex-col px-4 sm:px-8 py-6 sm:py-8 lg:py-10">
          <TextAnimate animation="slideLeft" by="character" as="h1" className="text-black text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight drop-shadow-sm">
            ABOUT US
          </TextAnimate>
        </div>
        <AboutUs
          headline={aboutHeadline}
          paragraph={aboutParagraph}
          topRightImageUrl={aboutImageTopRightUrl}
          bottomLeftImageUrl={aboutImageBottomLeftUrl}
        />
      </section>

      {/* Destinations */}
      <section id="destinations" className="min-h-svh w-full">
        <div className="h-full w-full flex px-4 sm:px-8 py-6 sm:py-8 lg:py-10">
          <div className="w-full h-full flex flex-col gap-3 sm:gap-4">
            <TextAnimate animation="slideLeft" by="character" as="h1" className="text-black text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight drop-shadow-sm">
              DESTINATIONS
            </TextAnimate>
            <TextAnimate animation="slideLeft" by="word" as="p" className="text-sm sm:text-base text-neutral-600 max-w-full lg:whitespace-nowrap break-normal">
              Explore our most popular tours with breath taking experience.
            </TextAnimate>
            <DestinationCarousel items={destinationItems} />
          </div>
        </div>
      </section>

      {/* Footer / Contact Section */}
      <section
        id="contact"
        className="relative min-h-svh w-full flex flex-col items-center justify-start pt-14 sm:pt-20 md:pt-24 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <Image
          src={footerImageUrl}
          alt="footer-page"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, black 20%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%)",
          }}
        />

        {/* Top Transparent Fade */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-44 sm:h-64 z-10 bg-linear-to-b from-background via-background/60 to-transparent"
        />

        {/* Gradient Overlay: #6A7F1A */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to top, #6A7F1A 0%, #6A7F1A 35%, rgba(106, 127, 26, 0) 100%)",
          }}
        />

        {/* Contact Form Card */}
        <ContactCard />

        {/* actual footer */}
        <Footer />
      </section>
    </main>
  );
}
