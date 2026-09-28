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
    src: "/images/tiger.jpg",
    alt: "Wild safari encounter in the savannah",
    ratioClass: "aspect-3/4",
    maxWClass: "max-w-xs sm:max-w-sm lg:max-w-[270px] xl:max-w-[300px]",
  },
  {
    id: "bottom-left",
    type: "image",
    src: "/images/rhino.jpg",
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

export const AboutUs = () => {
  return (
    <div className="w-full flex-1 flex items-center justify-center py-6 sm:py-10 lg:py-12">
      <div className="w-full max-w-[1560px] mx-auto">
        {/*
          Responsive Layout:
          - Mobile (< lg):
              Flex column layout:
              1. Photo 1 (order-1)
              2. Photo 2 (order-2)
              3. About Us text block in the middle (order-3)
              4. Photo 3 (order-4)
              5. Photo 4 (order-5)
          - Desktop (lg:):
              12-column grid layout with variable size photo frames spread to the 4 corners:
              - Top-Left: ele.webm video (4:3 aspect, compact)
              - Top-Right: tiger.jpg (3:4 vertical portrait)
              - Center: Text block (col-start-4 col-span-6 row-start-1 row-span-2)
              - Bottom-Left: rhino.jpg (8:7)
              - Bottom-Right: fish.webm video (16:10 wide landscape)
        */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-x-8 xl:gap-x-12 lg:gap-y-16 xl:gap-y-24 items-center w-full">
          {/* 1. Top-Left: ele.webm video */}
          <div className={`order-1 w-full ${defaultMedia[0].maxWClass} lg:col-span-3 lg:col-start-1 lg:row-start-1 lg:self-start lg:justify-self-start`}>
            <MediaCard item={defaultMedia[0]} />
          </div>

          {/* 2. Top-Right: tiger.jpg photo */}
          <div className={`order-2 w-full ${defaultMedia[1].maxWClass} lg:col-span-3 lg:col-start-10 lg:row-start-1 lg:self-start lg:justify-self-end`}>
            <MediaCard item={defaultMedia[1]} />
          </div>

          {/* 3. Center Text Block */}
          <div className="order-3 w-full lg:col-span-6 lg:col-start-4 lg:row-start-1 lg:row-span-2 lg:self-center text-center px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-10 lg:py-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.25em] text-neutral-900 uppercase">
              THE NATURE CLUB
            </h2>

            <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-neutral-600 font-light leading-relaxed max-w-lg mx-auto">
              At The Nature Club, we create thoughtfully planned journeys that help you
              discover beautiful destinations, meaningful experiences, and unforgettable
              memories.
            </p>
          </div>

          {/* 4. Bottom-Left: rhino.jpg photo */}
          <div className={`order-4 w-full ${defaultMedia[2].maxWClass} lg:col-span-3 lg:col-start-1 lg:row-start-2 lg:self-end lg:justify-self-start`}>
            <MediaCard item={defaultMedia[2]} />
          </div>

          {/* 5. Bottom-Right: fish.webm video */}
          <div className={`order-5 w-full ${defaultMedia[3].maxWClass} lg:col-span-3 lg:col-start-10 lg:row-start-2 lg:self-end lg:justify-self-end`}>
            <MediaCard item={defaultMedia[3]} />
          </div>
        </div>
      </div>
    </div>
  );
};

