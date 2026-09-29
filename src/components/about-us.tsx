"use client";

import React from "react";
import Image from "next/image";

interface MediaItem {
  id: string;
  type: "image" | "video";
  src: string;
  alt: string;
  ratioClass: string;
  maxWClass: string;
}

const defaultMedia: MediaItem[] = [
  {
    id: "top-left",
    type: "video",
    src: "/videos/ele.webm",
    alt: "Elephant in the wild",
    ratioClass: "aspect-4/3",
    maxWClass: "max-w-sm sm:max-w-md lg:max-w-[280px] xl:max-w-[320px]",
  },
  {
    id: "top-right",
    type: "image",
    src: "https://cdn.sanity.io/images/gnfni9vb/production/86bad80a1bba2aeedf8fff3b58fa9a809fb69fd7-2865x3581.jpg",
    alt: "Wild safari encounter in the savannah",
    ratioClass: "aspect-3/4",
    maxWClass: "max-w-xs sm:max-w-sm lg:max-w-[270px] xl:max-w-[300px]",
  },
  {
    id: "bottom-left",
    type: "image",
    src: "https://cdn.sanity.io/images/gnfni9vb/production/f5bedd4c6d4be145d84bcb4f10fa44c5708a33f1-3200x4000.jpg",
    alt: "Rhino in natural habitat",
    ratioClass: "aspect-8/7",
    maxWClass: "max-w-sm sm:max-w-md lg:max-w-[340px] xl:max-w-[390px]",
  },
  {
    id: "bottom-right",
    type: "video",
    src: "/videos/fish.webm",
    alt: "Fish swimming in river",
    ratioClass: "aspect-16/10",
    maxWClass: "max-w-sm sm:max-w-lg lg:max-w-[360px] xl:max-w-[420px]",
  },
];

function MediaCard({ item }: { item: MediaItem }) {
  return (
    <div className="p-2 sm:p-2.5 lg:p-3 bg-white border border-stone-200/90 shadow-md sm:shadow-lg rounded-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className={`relative w-full ${item.ratioClass} overflow-hidden rounded-xs bg-neutral-100`}>
        {item.type === "video" ? (
          <video
            src={item.src}
            aria-label={item.alt}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover"
          />
        )}
      </div>
    </div>
  );
}

export interface AboutUsProps {
  headline?: string;
  paragraph?: string;
  topRightImageUrl?: string;
  topRightImageAlt?: string;
  bottomLeftImageUrl?: string;
  bottomLeftImageAlt?: string;
}

export const AboutUs = ({
  headline = "THE NATURE CLUB",
  paragraph = "At The Nature Club, we create thoughtfully planned journeys that help you discover beautiful destinations, meaningful experiences, and unforgettable memories.",
  topRightImageUrl,
  topRightImageAlt = "Wild safari encounter in the savannah",
  bottomLeftImageUrl,
  bottomLeftImageAlt = "Rhino in natural habitat",
}: AboutUsProps) => {
  const mediaItems: MediaItem[] = [
    defaultMedia[0],
    {
      ...defaultMedia[1],
      src: topRightImageUrl || defaultMedia[1].src,
      alt: topRightImageAlt,
    },
    {
      ...defaultMedia[2],
      src: bottomLeftImageUrl || defaultMedia[2].src,
      alt: bottomLeftImageAlt,
    },
    defaultMedia[3],
  ];

  return (
    <div className="w-full flex-1 flex items-center justify-center py-6 sm:py-10 lg:py-12">
      <div className="w-full max-w-[1560px] mx-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-x-8 xl:gap-x-12 lg:gap-y-16 xl:gap-y-24 items-center w-full">
          {/* 1. Top-Left: ele.webm video */}
          <div className={`order-1 w-full ${mediaItems[0].maxWClass} lg:col-span-3 lg:col-start-1 lg:row-start-1 lg:self-start lg:justify-self-start`}>
            <MediaCard item={mediaItems[0]} />
          </div>

          {/* 2. Top-Right: photo */}
          <div className={`order-2 w-full ${mediaItems[1].maxWClass} lg:col-span-3 lg:col-start-10 lg:row-start-1 lg:self-start lg:justify-self-end`}>
            <MediaCard item={mediaItems[1]} />
          </div>

          {/* 3. Center Text Block */}
          <div className="order-3 w-full lg:col-span-6 lg:col-start-4 lg:row-start-1 lg:row-span-2 lg:self-center text-center px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-10 lg:py-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.25em] text-neutral-900 uppercase">
              {headline}
            </h2>

            <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-neutral-600 font-light leading-relaxed max-w-lg mx-auto">
              {paragraph}
            </p>
          </div>

          {/* 4. Bottom-Left: photo */}
          <div className={`order-4 w-full ${mediaItems[2].maxWClass} lg:col-span-3 lg:col-start-1 lg:row-start-2 lg:self-end lg:justify-self-start`}>
            <MediaCard item={mediaItems[2]} />
          </div>

          {/* 5. Bottom-Right: fish.webm video */}
          <div className={`order-5 w-full ${mediaItems[3].maxWClass} lg:col-span-3 lg:col-start-10 lg:row-start-2 lg:self-end lg:justify-self-end`}>
            <MediaCard item={mediaItems[3]} />
          </div>
        </div>
      </div>
    </div>
  );
};

