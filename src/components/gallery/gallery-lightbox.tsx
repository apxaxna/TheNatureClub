"use client";

import { useEffect, useCallback } from "react";
import { GalleryItemInstance } from "@/types/gallery";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

interface GalleryLightboxProps {
  item: GalleryItemInstance | null;
  items: GalleryItemInstance[];
  onClose: () => void;
  onSelect: (item: GalleryItemInstance) => void;
}

export function GalleryLightbox({ item, items, onClose, onSelect }: GalleryLightboxProps) {
  const currentIndex = item ? items.findIndex((i) => i.instanceId === item.instanceId) : -1;

  const handleNext = useCallback(() => {
    if (currentIndex === -1 || items.length === 0) return;
    const nextIdx = (currentIndex + 1) % items.length;
    onSelect(items[nextIdx]);
  }, [currentIndex, items, onSelect]);

  const handlePrev = useCallback(() => {
    if (currentIndex === -1 || items.length === 0) return;
    const prevIdx = (currentIndex - 1 + items.length) % items.length;
    onSelect(items[prevIdx]);
  }, [currentIndex, items, onSelect]);

  // Keyboard navigation
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    // Lock scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [item, onClose, handleNext, handlePrev]);

  if (!item) return null;

  const isVideo = item.mediaType === "video";

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl transition-all duration-300 animate-in fade-in"
    >
      {/* Top Header Bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-0 inset-x-0 z-20 flex items-center justify-between p-4 sm:p-6 bg-linear-to-b from-black/80 to-transparent"
      >
        <div className="flex items-center gap-3">
          {item.title && (
            <h2 className="text-sm font-medium text-white/90">
              {item.title}
            </h2>
          )}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={item.src}
            target="_blank"
            rel="noopener noreferrer"
            title="Open original in new tab"
            className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/15 hover:text-white"
          >
            <ExternalLink className="size-4" />
          </a>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close lightbox"
            className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/15 hover:text-white active:scale-95"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        aria-label="Previous item"
        className="absolute left-3 sm:left-6 z-20 flex size-11 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/80 backdrop-blur-md transition hover:bg-white/20 hover:text-white active:scale-95"
      >
        <ChevronLeft className="size-6" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        aria-label="Next item"
        className="absolute right-3 sm:right-6 z-20 flex size-11 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/80 backdrop-blur-md transition hover:bg-white/20 hover:text-white active:scale-95"
      >
        <ChevronRight className="size-6" />
      </button>

      {/* Main Content Area */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[85vh] max-w-[92vw] sm:max-w-[85vw] flex-col items-center justify-center"
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-[#0d0d11]">
          {isVideo ? (
            <video
              src={item.src}
              poster={item.poster}
              controls
              autoPlay
              playsInline
              className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain"
            />
          ) : (
            <img
              src={item.src}
              alt={item.alt || item.title || "Gallery preview"}
              className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain"
            />
          )}
        </div>

        {/* Caption beneath media */}
        {(item.title || item.caption) && (
          <div className="mt-4 text-center">
            {item.title && (
              <h3 className="text-base font-semibold text-white tracking-wide sm:text-lg">
                {item.title}
              </h3>
            )}
            {item.caption && item.caption !== item.title && (
              <p className="mt-1 max-w-xl text-xs sm:text-sm text-white/60">
                {item.caption}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
