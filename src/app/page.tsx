import { HomeView } from "@/components/home-view";
import { type CarouselItem } from "@/components/carousel";
import { type DestinationItem } from "@/components/destination-cards";
import { client } from "@/sanity/client";
import {
  DESTINATIONS_QUERY,
  DISCOVERIES_QUERY,
  SITE_SETTINGS_QUERY,
} from "@/sanity/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [sanityDestinations, sanityDiscoveries, siteSettings] = await Promise.all([
    client.fetch(DESTINATIONS_QUERY).catch(() => []),
    client.fetch(DISCOVERIES_QUERY).catch(() => []),
    client.fetch(SITE_SETTINGS_QUERY).catch(() => null),
  ]);

  const discoverItems: CarouselItem[] = (sanityDiscoveries || []).map((d: any) => ({
    id: d.slug || d._id,
    title: d.title,
    image: d.imageUrl,
    href: `#discover`,
  }));

  const destinationItems: DestinationItem[] = (sanityDestinations || []).map((d: any) => ({
    id: d.slug || d._id,
    title: d.name,
    location: d.locationLabel,
    image: d.imageUrl,
    rating: d.rating ?? 5.0,
    maxGuests: d.maxGuests ?? 4,
    bedsDescription: d.bedsDescription ?? "Luxury Bedding",
    bedCount: d.bedCount ?? 2,
    pricePerNight: d.pricePerNight ?? 2500,
    href: `#destinations`,
  }));

  const heroHeadline = siteSettings?.heroHeadline || "Pack Your Bags. Chase the World.";
  const heroImageUrl =
    siteSettings?.heroImageUrl ||
    "https://cdn.sanity.io/images/gnfni9vb/production/8d8c6ebc4077be17d4d6742db469483e5b26a83a-6000x4000.jpg";
  const footerImageUrl =
    siteSettings?.footerImageUrl ||
    "https://cdn.sanity.io/images/gnfni9vb/production/352ed95f6722fcbcedef3a922730257f082f4ba0-6960x3904.jpg";

  return (
    <HomeView
      discoverItems={discoverItems}
      destinationItems={destinationItems}
      heroHeadline={heroHeadline}
      heroImageUrl={heroImageUrl}
      footerImageUrl={footerImageUrl}
      aboutHeadline={siteSettings?.aboutHeadline}
      aboutParagraph={siteSettings?.aboutParagraph}
      aboutImageTopRightUrl={siteSettings?.aboutImageTopRightUrl}
      aboutImageBottomLeftUrl={siteSettings?.aboutImageBottomLeftUrl}
    />
  );
}