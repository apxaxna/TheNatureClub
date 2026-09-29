import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { GALLERY_ITEMS_QUERY } from "@/sanity/queries";
import { MasonryGallery } from "@/components/gallery/masonry-gallery";
import { SanityGalleryRawItem } from "@/lib/gallery-utils";

export const metadata: Metadata = {
  title: "Gallery | The Nature Club",
  description: "Immersive visual chronicles and motion reels of the untamed natural world.",
};

export const revalidate = 60;

export default async function GalleryPage() {
  let sanityItems: SanityGalleryRawItem[] = [];

  try {
    sanityItems = await client.fetch<SanityGalleryRawItem[]>(GALLERY_ITEMS_QUERY);
  } catch (err) {
    console.error("Error fetching gallery items from Sanity:", err);
  }

  return <MasonryGallery initialSanityItems={sanityItems} />;
}
