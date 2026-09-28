"use client";

import { useMemo } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import {
  MapPinIcon,
  StarIcon,
  BedIcon,
  ArrowRightIcon,
  CameraIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export type DestinationItem = {
  id: string;
  title: string;
  location: string;
  image?: string | StaticImageData;
  rating: number;
  maxGuests: number;
  bedsDescription: string;
  bedCount: number;
  pricePerNight: number;
  href?: string;
};

export const DESTINATIONS_DATA: DestinationItem[] = [
  {
    id: "kotageri",
    title: "KOTAGERI",
    location: "Nilgiris, Tamil Nadu",
    image: "/images/kotageri.jpg",
    rating: 4.9,
    maxGuests: 4,
    bedsDescription: "1 Queen or 2 Single Beds",
    bedCount: 3,
    pricePerNight: 2000,
    href: "#",
  },
  {
    id: "singalila",
    title: "SINGALILA",
    location: "Eastern Himalayas, West Bengal",
    image: "/images/singalila.jpg",
    rating: 4.8,
    maxGuests: 6,
    bedsDescription: "1 Queen or 2 Single Beds",
    bedCount: 3,
    pricePerNight: 2500,
    href: "#",
  },
  {
    id: "ladakh",
    title: "LADAKH",
    location: "High Desert, Ladakh",
    image: "/images/ladakh.jpg",
    rating: 4.9,
    maxGuests: 4,
    bedsDescription: "1 Queen or 1 King Bed",
    bedCount: 2,
    pricePerNight: 3000,
    href: "#",
  },
  {
    id: "hampi",
    title: "HAMPI",
    location: "Heritage Plains, Karnataka",
    image: "/images/hampi.jpg",
    rating: 5.0,
    maxGuests: 12,
    bedsDescription: "1 King Bed or 2 Single Beds",
    bedCount: 3,
    pricePerNight: 3500,
    href: "#",
  },
  {
    id: "agumbe",
    title: "AGUMBE",
    location: "Rainforest, Western Ghats",
    image: "/images/agumbe.jpg",
    rating: 4.8,
    maxGuests: 4,
    bedsDescription: "2 Queen Beds",
    bedCount: 2,
    pricePerNight: 4500,
    href: "#",
  },
  {
    id: "pench",
    title: "PENCH",
    location: "Tiger Reserve, Madhya Pradesh",
    image: "/images/pench.jpg",
    rating: 4.9,
    maxGuests: 5,
    bedsDescription: "2 King Beds",
    bedCount: 2,
    pricePerNight: 5000,
    href: "#",
  },
];

export const DestinationCard = ({
  title,
  location,
  image,
  rating,
  maxGuests,
  bedsDescription,
  bedCount,
  pricePerNight,
  href,
}: DestinationItem) => {
  const cardBody = (
    <div className="group/card relative flex flex-col justify-between w-56 sm:w-70 md:w-75 lg:w-85 2xl:w-95 h-70 sm:h-104 md:h-110 lg:h-125 2xl:h-135 shrink-0 select-none cursor-pointer rounded-xl sm:rounded-2xl bg-white shadow-sm hover:shadow-md hover:shadow-black/5 transition-all duration-300 ease-out hover:-translate-y-2 active:scale-[0.99] overflow-hidden">
      {/* Top Image / Placeholder Container */}
      <div className="relative w-full flex-1 min-h-0 overflow-hidden bg-neutral-100">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 224px, (max-width: 1024px) 300px, 380px"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover/card:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-linear-to-b from-stone-100 via-neutral-100 to-stone-200 text-neutral-400 group-hover/card:text-neutral-600 transition-colors duration-300">
            <div className="size-12 rounded-2xl bg-white/80 flex items-center justify-center transition-transform duration-300 group-hover/card:scale-110">
              <CameraIcon size={22} weight="light" className="text-neutral-500" />
            </div>
            <span className="mt-2 text-[10px] font-semibold tracking-widest uppercase text-neutral-400">
              Photo Coming Soon
            </span>
          </div>
        )}

        {/* Subtle bottom vignette to ground the image */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-40 transition-opacity duration-300 group-hover/card:opacity-60" />

        {/* Location pill */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-medium text-neutral-800">
          <MapPinIcon size={13} weight="fill" className="text-emerald-700" />
          <span className="truncate max-w-36">{location}</span>
        </div>

        {/* Rating pill */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-semibold text-neutral-800">
          <StarIcon size={12} weight="fill" className="text-amber-500" />
          <span>{rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Card Content Details */}
      <div className="p-3.5 sm:p-4 lg:p-5 flex flex-col justify-between gap-2 sm:gap-2.5 shrink-0 bg-white">
        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold tracking-tight text-neutral-900 group-hover/card:text-[#184e34] transition-colors duration-200 truncate">
          {title}
        </h3>

        {/* Capacity & Beds Information (inspired by the trip specification) */}
        <div className="flex items-center justify-between text-[11px] sm:text-xs text-neutral-500 font-medium">
          <span className="truncate max-w-44 sm:max-w-48 lg:max-w-56 uppercase tracking-tight">
            MAX {maxGuests} GUESTS / {bedsDescription}
          </span>
          <div className="flex items-center gap-1 text-neutral-400 shrink-0">
            {Array.from({ length: Math.min(bedCount, 4) }).map((_, i) => (
              <BedIcon key={i} size={15} weight="regular" />
            ))}
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="pt-2.5 sm:pt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-[10px] text-neutral-500 uppercase font-semibold">FROM</span>
            <span className="text-sm sm:text-base md:text-lg font-bold text-neutral-900 tracking-tight">
              ${pricePerNight.toLocaleString()}
            </span>
            <span className="text-[11px] text-neutral-500 font-normal">/NIGHT</span>
          </div>

          <div className="flex items-center gap-1 text-xs font-semibold text-neutral-800 group-hover/card:text-[#184e34] transition-colors duration-200">
            <span className="tracking-tight uppercase">EXPLORE</span>
            <ArrowRightIcon
              size={13}
              weight="bold"
              className="transition-transform duration-200 ease-out group-hover/card:translate-x-1"
            />
          </div>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block shrink-0 focus-visible:outline-none">
        {cardBody}
      </Link>
    );
  }

  return cardBody;
};

export type DestinationCarouselProps = {
  items?: DestinationItem[];
  speed?: number; // duration in seconds (default: 40)
  pauseOnHover?: boolean;
  reverse?: boolean;
  fadeEdges?: boolean;
  className?: string;
};

export const DestinationCarousel = ({
  items = DESTINATIONS_DATA,
  speed = 40,
  pauseOnHover = true,
  reverse = false,
  fadeEdges = true,
  className,
}: DestinationCarouselProps) => {
  const safeItems = items || [];
  const repeatCount = safeItems.length > 0 ? Math.max(2, Math.ceil(8 / safeItems.length)) : 0;
  const trackItems = useMemo(() => {
    if (safeItems.length === 0) return [];
    return Array.from({ length: repeatCount }, (_, setIdx) =>
      safeItems.map((item, itemIdx) => ({
        ...item,
        uniqueKey: `${item.id}-${setIdx}-${itemIdx}`,
      }))
    ).flat();
  }, [safeItems, repeatCount]);

  if (!items || items.length === 0) return null;

  const animationStyle = {
    animationDuration: `${speed}s`,
  };

  return (
    <div
      role="region"
      aria-label="Destinations showcase"
      className={cn(
        "marquee-container group relative flex w-full max-w-full min-w-0 overflow-hidden py-3 sm:py-6 select-none",
        pauseOnHover ? "hover:[&_.animate-marquee]:paused" : "",
        className
      )}
    >
      {/* Left gradient fade mask */}
      {fadeEdges && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-3 sm:w-8 md:w-14 lg:w-20 bg-linear-to-r from-background to-transparent"
        />
      )}

      {/* Track 1 */}
      <div
        className={cn(
          "flex shrink-0 items-center gap-4 sm:gap-6 lg:gap-8 pr-4 sm:pr-6 lg:pr-8 animate-marquee",
          reverse && "marquee-reverse"
        )}
        style={animationStyle}
      >
        {trackItems.map((item) => (
          <DestinationCard key={`t1-${item.uniqueKey}`} {...item} />
        ))}
      </div>

      {/* Track 2 */}
      <div
        aria-hidden="true"
        className={cn(
          "flex shrink-0 items-center gap-4 sm:gap-6 lg:gap-8 pr-4 sm:pr-6 lg:pr-8 animate-marquee",
          reverse && "marquee-reverse"
        )}
        style={animationStyle}
      >
        {trackItems.map((item) => (
          <DestinationCard key={`t2-${item.uniqueKey}`} {...item} />
        ))}
      </div>

      {/* Right gradient fade mask */}
      {fadeEdges && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-3 sm:w-8 md:w-14 lg:w-20 bg-linear-to-l from-background to-transparent"
        />
      )}
    </div>
  );
};
