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

const page = () => {
  return (
    <main className="min-h-svh w-full">
      {/* hero */}
      <section className="relative min-h-svh w-full">
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
    </main>
  );
};

export default page;