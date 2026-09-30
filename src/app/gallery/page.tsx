import type { Metadata } from "next";
import { getSiteSettings } from "@/data/site";
import { client } from "@/sanity/client";
import { GALLERY_ITEMS_QUERY } from "@/sanity/queries";
import { MasonryGallery } from "@/components/gallery/masonry-gallery";
import { SanityGalleryRawItem, normalizeSanityGalleryItems } from "@/lib/gallery-utils";
import { JsonLd } from "@/components/json-ld";
import { ORGANIZATION_ID, absoluteUrl, pageOpenGraph, pageAlternates } from "@/lib/seo";

const DESCRIPTION =
  "Photographs and short films from our landscape, travel and wildlife photography tours across India.";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: "Gallery",
    description: DESCRIPTION,
    alternates: pageAlternates("/gallery"),
    openGraph: pageOpenGraph({
      path: "/gallery",
      title: "Gallery",
      description: DESCRIPTION,
      image: settings?.heroImageUrl,
      imageAlt: settings?.heroImageAlt,
    }),
  };
}

export const revalidate = 60;

export default async function GalleryPage() {
  let sanityItems: SanityGalleryRawItem[] = [];

  try {
    sanityItems = await client.fetch<SanityGalleryRawItem[]>(GALLERY_ITEMS_QUERY);
  } catch (err) {
    console.error("Error fetching gallery items from Sanity:", err);
  }

  const items = normalizeSanityGalleryItems(sanityItems);
  const jsonLd = {
    "@type": "ImageGallery",
    "@id": absoluteUrl("/gallery"),
    url: absoluteUrl("/gallery"),
    name: "Gallery",
    description: DESCRIPTION,
    author: { "@id": ORGANIZATION_ID },
    associatedMedia: items.map((item) =>
      item.mediaType === "video"
        ? {
            "@type": "VideoObject",
            name: item.title || "Gallery video",
            description: item.alt,
            contentUrl: item.src,
            ...(item.poster && { thumbnailUrl: item.poster }),
          }
        : {
            "@type": "ImageObject",
            name: item.title,
            description: item.alt,
            contentUrl: item.src,
            width: item.width,
            height: item.height,
          }
    ),
  };

  return (
    <>
      {items.length > 0 && <JsonLd data={jsonLd} />}
      <MasonryGallery initialSanityItems={sanityItems} />
    </>
  );
}
