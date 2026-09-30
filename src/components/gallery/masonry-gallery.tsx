"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { GalleryItem, GalleryItemInstance } from "@/types/gallery";
import {
  normalizeSanityGalleryItems,
  generateLoopedBatch,
  distributeToColumns,
  SanityGalleryRawItem,
} from "@/lib/gallery-utils";
import { GalleryCard } from "./gallery-card";
import { GalleryLightbox } from "./gallery-lightbox";
import { PageHeading } from "@/components/page-heading";
import { PageBreadcrumb } from "@/components/page-breadcrumb";

interface MasonryGalleryProps {
  initialSanityItems?: SanityGalleryRawItem[];
}

const BATCH_SIZE = 12;

export function MasonryGallery({ initialSanityItems = [] }: MasonryGalleryProps) {
  // Normalize base items from Sanity or fallback
  const baseItems: GalleryItem[] = useMemo(() => {
    return normalizeSanityGalleryItems(initialSanityItems);
  }, [initialSanityItems]);

  // Total loaded items counter for infinite scroll
  // Capped at the item count so the page ends and the footer stays reachable.
  const [loadedCount, setLoadedCount] = useState<number>(() =>
    Math.min(BATCH_SIZE * 2, baseItems.length)
  );
  const hasMore = loadedCount < baseItems.length;

  // Responsive column count
  const [columnCount, setColumnCount] = useState<number>(3);

  // Active item in Lightbox
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItemInstance | null>(null);

  // Loading indicator for infinite scroll
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Track window resize to adjust Pinterest columns dynamically
  useEffect(() => {
    const updateColumns = () => {
      const w = window.innerWidth;
      if (w < 520) {
        setColumnCount(1);
      } else if (w < 860) {
        setColumnCount(2);
      } else if (w < 1400) {
        setColumnCount(3); // 3 columns matching reference layout
      } else {
        setColumnCount(4);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // Instances of the items loaded so far
  const renderedItems: GalleryItemInstance[] = useMemo(() => {
    return generateLoopedBatch(baseItems, 0, loadedCount);
  }, [baseItems, loadedCount]);

  // Distribute items into balanced Pinterest columns
  const columns = useMemo(() => {
    return distributeToColumns(renderedItems, columnCount);
  }, [renderedItems, columnCount]);

  // Infinite Scroll Handler: loads more items and seamlessly repeats when ending
  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);

    setTimeout(() => {
      setLoadedCount((prev) => Math.min(prev + BATCH_SIZE, baseItems.length));
      setIsLoadingMore(false);
    }, 250);
  }, [isLoadingMore, hasMore, baseItems.length]);

  // IntersectionObserver for bottom sentinel
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "600px 0px" } // Pre-load before reaching bottom
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <main className="w-full bg-ink text-white">
      <section className="px-gutter py-section">
        <div className="relative z-10 mx-auto w-full">
          <PageBreadcrumb
            tone="dark"
            className="mb-8"
            items={[
              { name: "Home", path: "/" },
              { name: "Gallery", path: "/gallery" },
            ]}
          />
          <PageHeading
            title="Gallery"
            subtitle="Moments captured from the wild"
            className="mb-[clamp(2.5rem,5vw,4rem)]"
          />

          {baseItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-white/60 text-sm">No gallery items uploaded yet.</p>
              <p className="text-white/30 text-xs mt-1">
                Upload photos or videos in Sanity Studio to see them appear here.
              </p>
            </div>
          ) : (
            <>
              {/* Pinterest Multi-Column Masonry Grid */}
              <div className="flex w-full flex-row gap-3 sm:gap-4 md:gap-5 items-start">
                {columns.map((colItems, colIndex) => (
                  <div
                    key={`col-${colIndex}`}
                    className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-5 min-w-0"
                  >
                    {colItems.map((item) => (
                      <GalleryCard
                        key={item.instanceId}
                        item={item}
                        onOpenLightbox={setActiveLightboxItem}
                      />
                    ))}
                  </div>
                ))}
              </div>

              {/* Infinite Scroll Sentinel */}
              <div
                ref={sentinelRef}
                className="mt-12 flex h-24 w-full items-center justify-center text-white/40"
              >
                {isLoadingMore && (
                  <div className="flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-white/50">
                    <span className="size-2 animate-ping rounded-full bg-gold" />
                    <span>Loading more moments…</span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <GalleryLightbox
        item={activeLightboxItem}
        items={renderedItems}
        onClose={() => setActiveLightboxItem(null)}
        onSelect={setActiveLightboxItem}
      />
    </main>
  );
}
