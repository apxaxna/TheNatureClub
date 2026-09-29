import { Hero } from "@/components/home/hero";
import { Intro } from "@/components/home/intro";
import { Exhibits, type Exhibit } from "@/components/home/exhibits";
import { Destinations, type Destination } from "@/components/home/destinations";
import { Testimonials } from "@/components/home/testimonials";
import { client } from "@/sanity/client";
import { DESTINATIONS_QUERY, DISCOVERIES_QUERY } from "@/sanity/queries";
import { getSiteSettings, TESTIMONIALS } from "@/data/site";

export const dynamic = "force-dynamic";

type RawDiscovery = {
  _id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  image?: { alt?: string };
};

type RawDestination = {
  _id: string;
  name: string;
  locationLabel?: string;
  imageUrl?: string;
  coverImage?: { alt?: string };
  rating?: number | null;
  maxGuests?: number | null;
  bedsDescription?: string | null;
  pricePerNight?: number | null;
};

const FALLBACK_HERO_IMAGE =
  "https://cdn.sanity.io/images/gnfni9vb/production/8d8c6ebc4077be17d4d6742db469483e5b26a83a-6000x4000.jpg";

const FALLBACK_INTRO =
  "We are into landscape and travel photography, specialising in capturing the nuances of different seasons. We have traveled extensively, photographing the world's most breathtaking views.";

export default async function HomePage() {
  const [sanityDestinations, sanityDiscoveries, settings] = await Promise.all([
    client.fetch<RawDestination[]>(DESTINATIONS_QUERY).catch(() => []),
    client.fetch<RawDiscovery[]>(DISCOVERIES_QUERY).catch(() => []),
    getSiteSettings(),
  ]);

  const exhibits: Exhibit[] = (sanityDiscoveries || []).map((d) => ({
    id: d._id,
    title: d.title,
    description: d.description,
    imageUrl: d.imageUrl,
    alt: d.image?.alt,
  }));

  const destinations: Destination[] = (sanityDestinations || []).map((d) => ({
    id: d._id,
    name: d.name,
    location: d.locationLabel,
    imageUrl: d.imageUrl,
    alt: d.coverImage?.alt,
    rating: d.rating ?? undefined,
    maxGuests: d.maxGuests ?? undefined,
    bedsDescription: d.bedsDescription ?? undefined,
    pricePerNight: d.pricePerNight ?? undefined,
  }));

  return (
    <main>
      <Hero
        headline={settings?.heroHeadline || "Landscape & Travel Photography Tours"}
        imageUrl={settings?.heroImageUrl || FALLBACK_HERO_IMAGE}
      />
      <Intro
        paragraph={settings?.aboutParagraph || FALLBACK_INTRO}
        imageUrl={settings?.aboutImageTopRightUrl}
      />
      <Exhibits items={exhibits} />
      <Destinations items={destinations} />
      <Testimonials items={TESTIMONIALS} />
    </main>
  );
}
