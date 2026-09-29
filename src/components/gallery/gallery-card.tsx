"use client";

import { useState, useRef, useEffect } from "react";
import { GalleryItemInstance } from "@/types/gallery";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";

interface GalleryCardProps {
  item: GalleryItemInstance;
  onOpenLightbox: (item: GalleryItemInstance) => void;
}

export function GalleryCard({ item, onOpenLightbox }: GalleryCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const isVideo = item.mediaType === "video";

  // IntersectionObserver to auto-play/pause video when scrolled into view
  useEffect(() => {
    if (!isVideo || !videoRef.current || !cardRef.current) return;

    const currentVideo = videoRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          currentVideo.play().catch(() => {
            // Autoplay with audio might fail; muted is safe
          });
          setIsPlaying(true);
        } else {
          currentVideo.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [isVideo]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <div
      ref={cardRef}
      onClick={() => onOpenLightbox(item)}
      className="group relative w-full cursor-pointer overflow-hidden rounded-sm border border-white/5 bg-white/5 transition-all duration-300 hover:border-white/25 hover:shadow-2xl hover:shadow-black/60"
      style={{
        aspectRatio: item.aspectRatio || 1,
      }}
    >
      {/* Background LQIP or Shimmer */}
      <div
        className={`absolute inset-0 bg-white/5 transition-opacity duration-700 ${
          isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={
          item.lqip
            ? {
                backgroundImage: `url(${item.lqip})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(20px)",
              }
            : undefined
        }
      >
        <div className="absolute inset-0 animate-pulse bg-linear-to-r from-transparent via-white/4 to-transparent" />
      </div>

      {/* Video Element */}
      {isVideo ? (
        <>
          <video
            ref={videoRef}
            src={item.src}
            poster={item.poster}
            muted={isMuted}
            loop
            playsInline
            preload="metadata"
            onLoadedData={() => setIsLoaded(true)}
            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />

          {/* Quick Video Controls on Card */}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause video" : "Play video"}
              className="flex size-7 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white/90 backdrop-blur-md transition-transform hover:scale-110 active:scale-95"
            >
              {isPlaying ? <Pause className="size-3.5" /> : <Play className="size-3.5 fill-current ml-0.5" />}
            </button>
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              className="flex size-7 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white/90 backdrop-blur-md transition-transform hover:scale-110 active:scale-95"
            >
              {isMuted ? <VolumeX className="size-3.5 text-white/70" /> : <Volume2 className="size-3.5 text-gold" />}
            </button>
          </div>
        </>
      ) : (
        /* Image Element */
        <img
          src={item.src}
          alt={item.alt || item.title || "Gallery image"}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className={`size-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.03] ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* Hover Overlay with Caption & Title */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-x-0 bottom-0 p-4 transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
          {item.title && (
            <h3 className="text-sm font-semibold tracking-wide text-white drop-shadow-md sm:text-base">
              {item.title}
            </h3>
          )}
          {item.caption && item.caption !== item.title && (
            <p className="mt-1 line-clamp-2 text-xs text-white/70 drop-shadow">
              {item.caption}
            </p>
          )}
        </div>

        {/* Expand Icon in top right */}
        <div className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/90 backdrop-blur-md opacity-0 transition-all duration-300 group-hover:opacity-100">
          <Maximize2 className="size-4" />
        </div>
      </div>
    </div>
  );
}
