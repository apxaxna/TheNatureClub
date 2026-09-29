import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { Intro } from "@/components/home/intro";
import { Exhibits } from "@/components/home/exhibits";
import { Testimonials } from "@/components/home/testimonials";
import { JsonLd } from "@/components/json-ld";
import { getExhibits } from "@/data/exhibits";
import { getSiteSettings, getTestimonials } from "@/data/site";
import { ORGANIZATION_ID, absoluteUrl } from "@/lib/seo";

export const revalidate = 60;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const FALLBACK_HERO_IMAGE =
  "https://cdn.sanity.io/images/gnfni9vb/production/8d8c6ebc4077be17d4d6742db469483e5b26a83a-6000x4000.jpg";

const FALLBACK_INTRO =
  "We are into landscape and travel photography, specialising in capturing the nuances of different seasons.\n\nWe have traveled extensively, photographing the world's most breathtaking views.";

export default async function HomePage() {
  const [settings, exhibits, testimonials] = await Promise.all([
    getSiteSettings(),
    getExhibits(),
    getTestimonials(),
  ]);

  // Each exhibit is a photo series by the club (placeholder photos are left out).
  const exhibitsJsonLd = exhibits
    .map((exhibit) => ({ ...exhibit, photos: exhibit.photos.filter((p) => !p.placeholder) }))
    .filter((exhibit) => exhibit.photos.length > 0)
    .map((exhibit) => ({
    "@type": "ImageGallery",
    "@id": absoluteUrl(`/#${exhibit.slug}`),
    name: exhibit.title,
    ...(exhibit.description && { description: exhibit.description }),
    url: absoluteUrl(`/#${exhibit.slug}`),
    author: { "@id": ORGANIZATION_ID },
    associatedMedia: exhibit.photos.map((photo) => ({
      "@type": "ImageObject",
      contentUrl: photo.imageUrl,
      name: photo.title,
      caption: photo.caption,
      description: photo.alt,
      ...(photo.location && {
        contentLocation: { "@type": "Place", name: photo.location },
      }),
    })),
  }));

  return (
    <main>
      {exhibitsJsonLd.length > 0 && <JsonLd data={exhibitsJsonLd} />}
      <Hero
        headline={settings?.heroHeadline || "Landscape & Travel Photography Tours"}
        imageUrl={settings?.heroImageUrl || FALLBACK_HERO_IMAGE}
      />
      <Intro
        heading={settings?.aboutHeadline || "Hi, What are we into?"}
        paragraph={settings?.aboutParagraph || FALLBACK_INTRO}
        imageUrl={settings?.aboutImageTopRightUrl}
        imageAlt={settings?.aboutImageTopRightAlt}
      />
      <Exhibits items={exhibits} />
      <Testimonials items={testimonials} />
    </main>
  );
}
