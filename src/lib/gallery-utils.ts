import { GalleryItem, GalleryItemInstance } from "@/types/gallery";
import { FALLBACK_GALLERY_ITEMS } from "@/remove/fallback-gallery";

export interface SanityGalleryRawItem {
  _id: string;
  title?: string;
  mediaType?: "image" | "video";
  aspectRatio?: string;
  displayOrder?: number;
  imageUrl?: string;
  image?: {
    alt?: string;
    caption?: string;
    asset?: {
      _id: string;
      url: string;
      metadata?: {
        dimensions?: {
          width: number;
          height: number;
          aspectRatio: number;
        };
        lqip?: string;
      };
    };
  };
  videoFileUrl?: string;
  videoUrl?: string;
  posterUrl?: string;
  videoPoster?: {
    alt?: string;
    asset?: {
      _id: string;
      url: string;
      metadata?: {
        dimensions?: {
          width: number;
          height: number;
          aspectRatio: number;
        };
      };
    };
  };
}

export function parseAspectRatioString(ratioStr?: string): number | null {
  if (!ratioStr) return null;
  const parts = ratioStr.split("/").map((p) => parseFloat(p.trim()));
  if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1]) && parts[1] !== 0) {
    return parts[0] / parts[1];
  }
  const directNum = parseFloat(ratioStr);
  if (!isNaN(directNum) && directNum > 0) {
    return directNum;
  }
  return null;
}

export function normalizeSanityGalleryItems(rawItems: SanityGalleryRawItem[]): GalleryItem[] {
  if (!rawItems || rawItems.length === 0) {
    return FALLBACK_GALLERY_ITEMS;
  }

  const items: GalleryItem[] = [];

  for (const item of rawItems) {
    const isVideo = item.mediaType === "video";
    const customRatio = parseAspectRatioString(item.aspectRatio);

    if (isVideo) {
      const videoSrc = item.videoFileUrl || item.videoUrl;
      if (!videoSrc) continue;

      const posterDimensions = item.videoPoster?.asset?.metadata?.dimensions;
      const ratio =
        customRatio ||
        posterDimensions?.aspectRatio ||
        (posterDimensions ? posterDimensions.width / posterDimensions.height : 16 / 9);

      items.push({
        _id: item._id,
        title: item.title,
        mediaType: "video",
        src: videoSrc,
        poster: item.posterUrl,
        aspectRatio: ratio || 16 / 9,
        width: posterDimensions?.width || 1920,
        height: posterDimensions?.height || 1080,
        alt: item.videoPoster?.alt || item.title || "Gallery video",
        caption: item.title,
      });
    } else {
      const imageSrc = item.imageUrl || item.image?.asset?.url;
      if (!imageSrc) continue;

      const imgDimensions = item.image?.asset?.metadata?.dimensions;
      const ratio =
        customRatio ||
        imgDimensions?.aspectRatio ||
        (imgDimensions ? imgDimensions.width / imgDimensions.height : 4 / 3);

      items.push({
        _id: item._id,
        title: item.title,
        mediaType: "image",
        src: imageSrc,
        aspectRatio: ratio || 4 / 3,
        width: imgDimensions?.width || 1200,
        height: imgDimensions?.height || 900,
        alt: item.image?.alt || item.title || "Gallery image",
        caption: item.image?.caption || item.title,
        lqip: item.image?.asset?.metadata?.lqip,
      });
    }
  }

  // If Sanity only has 1 or 2 items, blend with fallback so the infinite grid is visually rich
  if (items.length < 6) {
    return [...items, ...FALLBACK_GALLERY_ITEMS];
  }

  return items;
}

/**
 * Generates next batch of items, repeating from start if items end
 */
export function generateLoopedBatch(
  baseItems: GalleryItem[],
  startIndex: number,
  count: number
): GalleryItemInstance[] {
  if (!baseItems.length) return [];
  const batch: GalleryItemInstance[] = [];

  for (let i = 0; i < count; i++) {
    const currentIndex = startIndex + i;
    const baseIndex = currentIndex % baseItems.length;
    const loopIndex = Math.floor(currentIndex / baseItems.length);
    const item = baseItems[baseIndex];

    batch.push({
      ...item,
      instanceId: `${item._id}-loop-${loopIndex}-${currentIndex}`,
      loopIndex,
    });
  }

  return batch;
}

/**
 * Distributes items across N columns using shortest-column heuristic (Pinterest-style)
 */
export function distributeToColumns(
  items: GalleryItemInstance[],
  numColumns: number
): GalleryItemInstance[][] {
  const columns: GalleryItemInstance[][] = Array.from({ length: numColumns }, () => []);
  const heights = new Array(numColumns).fill(0);

  items.forEach((item) => {
    // find column with smallest height
    let minCol = 0;
    for (let c = 1; c < numColumns; c++) {
      if (heights[c] < heights[minCol]) {
        minCol = c;
      }
    }

    columns[minCol].push(item);
    // Relative height is 1 / aspectRatio (height / width)
    const relativeHeight = 1 / (item.aspectRatio > 0 ? item.aspectRatio : 1);
    heights[minCol] += relativeHeight;
  });

  return columns;
}
