"use client";

import { Navbar } from "@/components/navbar";
import { CommandMenu, type CommandMenuGroupDef } from "@/components/ui/command-menu";
import Image from "next/image";
import {
  Compass,
  MapPin,
  BookOpen,
  Image as ImageIcon,
  Star,
  Users,
  Phone,
  Calendar,
} from "lucide-react";
import { TextAnimate } from "@/components/ui/text-animate";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { Carousel, type CarouselItem } from "@/components/carousel";
import { DestinationCarousel } from "@/components/destination-cards";

const commandGroups: CommandMenuGroupDef[] = [
  {
    heading: "Navigation",
    items: [
      { label: "Home", href: "/", icon: Compass, keywords: ["main", "landing"] },
      { label: "Discovery", href: "/discovery", icon: Compass, keywords: ["explore", "discover", "nature"] },
      { label: "Destinations", href: "/destinations", icon: MapPin, keywords: ["safari", "tanzania", "places", "camps"] },
      { label: "Blogs", href: "/blogs", icon: BookOpen, keywords: ["stories", "articles", "news"] },
      { label: "Gallery", href: "/gallery", icon: ImageIcon, keywords: ["photos", "pictures", "wildlife"] },
      { label: "Testimonials", href: "/testimonial", icon: Star, keywords: ["reviews", "ratings", "feedback"] },
      { label: "About us", href: "/about", icon: Users, keywords: ["story", "team", "mission"] },
      { label: "Contact us", href: "/contact", icon: Phone, keywords: ["support", "email", "call"] },
    ],
  },
  {
    heading: "Actions",
    items: [
      { label: "Book a trip", href: "/contact", icon: Calendar, keywords: ["reserve", "booking", "tour"] },
    ],
  },
];

const discoverItems: CarouselItem[] = [
  {
    id: "1",
    title: "Winter Exhibit",
    image: "/images/winter.jpg",
    href: "#",
  },
  {
    id: "2",
    title: "Autumn Wilderness",
    image: "/images/autumn.jpg",
    href: "#",
  },
  {
    id: "3",
    title: "Mountain Expedition",
    image: "/images/mountain.jpg",
    href: "#",
  },
  {
    id: "4",
    title: "Wildlife Safari",
    image: "/images/wildlife.jpg",
    href: "#",
  },
  {
    id: "5",
    title: "Lakes & Waterfalls",
    image: "/images/lakes.jpg",
    href: "#",
  },
];

const page = () => {
  return (
    <main className="min-h-svh w-full">
      {/* hero */}
      <section id="hero" className="relative min-h-svh w-full">
        <Image
          src={"/images/hero.jpg"}
          alt="hero-page"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Centered Title & Command Menu */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-4 text-center">
          <TextAnimate animation="blurIn" as="h1" className="text-white text-2xl sm:text-3xl md:text-4xl font-normal drop-shadow-md">
            Pack Your Bags. Chase the World.
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

      {/*Navbar*/}
      <Navbar />

      {/*Discovery*/}
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

      {/*Why us*/}
      <section id="why-us" className="min-h-svh w-full">
        <div className="w-full h-full flex flex-col px-4 sm:px-8 py-6 sm:py-8 lg:py-10">
          <TextAnimate animation="slideLeft" by="character" as="h1" className="text-black text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight drop-shadow-sm">
            WHY US?
          </TextAnimate>
        </div>
      </section>
      {/*Destinations*/}
      <section id="destinations" className="min-h-svh w-full">
        <div className="h-full w-full flex px-4 sm:px-8 py-6 sm:py-8 lg:py-10">
          <div className="w-full h-full flex flex-col gap-3 sm:gap-4">
            <TextAnimate animation="slideLeft" by="character" as="h1" className="text-black text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight drop-shadow-sm">
              DESTINATIONS
            </TextAnimate>
            <TextAnimate animation="slideLeft" by="word" as="p" className="text-sm sm:text-base text-neutral-600 max-w-full lg:whitespace-nowrap break-normal">
              Explore our most popular tours with breath taking experience.
            </TextAnimate>
            <DestinationCarousel />
          </div>
        </div>
      </section>


      <ProgressiveBlur height="50%" position="bottom" />
    </main>
  );
};

export default page;