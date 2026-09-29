"use client";

import { useMemo } from "react";
import { CarouselCard } from "./carousel-cards";
import { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

export type CarouselItem = {
  id: string;
  title: string;
  image: string | StaticImageData;
  href?: string;
};

type CarouselProps = {
  items: CarouselItem[];
  speed?: number; // duration in seconds (default: 35)
  pauseOnHover?: boolean;
  reverse?: boolean;
  fadeEdges?: boolean;
  className?: string;
};

export const Carousel = ({
  items,
  speed = 35,
  pauseOnHover = true,
  reverse = false,
  fadeEdges = true,
  className,
}: CarouselProps) => {
  // If no items, return null
  if (!items || items.length === 0) return null;

  // Duplicate items within each track to ensure track width exceeds wide screens
  const repeatCount = Math.max(2, Math.ceil(8 / items.length));
  const trackItems = useMemo(() => {
    return Array.from({ length: repeatCount }, (_, setIdx) =>
      items.map((item, itemIdx) => ({
        ...item,
        uniqueKey: `${item.id}-${setIdx}-${itemIdx}`,
      }))
    ).flat();
  }, [items, repeatCount]);

  const animationStyle = {
    animationDuration: `${speed}s`,
  };

  return (
    <div
      role="region"
      aria-label="Tours and destinations showcase"
      className={cn(
        "marquee-container group relative flex w-full max-w-full min-w-0 overflow-hidden py-3 sm:py-6 lg:py-8 select-none",
        pauseOnHover ? "hover:[&_.animate-marquee]:paused" : "",
        className
      )}
    >
      {/* Left gradient fade mask - minimized for mobile */}
      {fadeEdges && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-3 sm:w-8 md:w-14 lg:w-20 bg-linear-to-r from-background to-transparent"
        />
      )}

      {/* Track 1: primary track */}
      <div
        className={cn(
          "flex shrink-0 items-center gap-3 sm:gap-6 lg:gap-8 pr-3 sm:pr-6 lg:pr-8 animate-marquee",
          reverse && "marquee-reverse"
        )}
        style={animationStyle}
      >
        {trackItems.map((item) => (
          <CarouselCard
            key={`t1-${item.uniqueKey}`}
            image={item.image}
            title={item.title}
            href={item.href}
          />
        ))}
      </div>

      {/* Track 2: duplicate track for seamless infinite loop */}
      <div
        aria-hidden="true"
        className={cn(
          "flex shrink-0 items-center gap-3 sm:gap-6 lg:gap-8 pr-3 sm:pr-6 lg:pr-8 animate-marquee",
          reverse && "marquee-reverse"
        )}
        style={animationStyle}
      >
        {trackItems.map((item) => (
          <CarouselCard
            key={`t2-${item.uniqueKey}`}
            image={item.image}
            title={item.title}
            href={item.href}
          />
        ))}
      </div>

      {/* Right gradient fade mask - minimized for mobile */}
      {fadeEdges && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-3 sm:w-8 md:w-14 lg:w-20 bg-linear-to-l from-background to-transparent"
        />
      )}
    </div>
  );
};



