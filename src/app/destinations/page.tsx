import type { Metadata } from "next";
import { getSiteSettings } from "@/data/site";
import Image from "next/image";
import { PageHeading } from "@/components/page-heading";
import { Stars } from "@/components/stars";
import { JsonLd } from "@/components/json-ld";
import { getDestinations, type Destination } from "@/data/destinations";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { ORGANIZATION_ID, absoluteUrl, pageOpenGraph, pageAlternates } from "@/lib/seo";

export const revalidate = 60;

const DESCRIPTION =
  "Photography and wildlife destinations we guide across India — with stay details, guest capacity and nightly prices for each.";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: "Destinations",
    description: DESCRIPTION,
    alternates: pageAlternates("/destinations"),
    openGraph: pageOpenGraph({
      path: "/destinations",
      title: "Destinations",
      description: DESCRIPTION,
      image: settings?.heroImageUrl,
      imageAlt: settings?.heroImageAlt,
    }),
  };
}

const priceFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function DestinationCard({ item }: { item: Destination }) {
  const headingId = `destination-${item.slug ?? item.id}`
  return (
    <article aria-labelledby={headingId} className="group flex h-full flex-col">
      <div className="relative aspect-3/2 overflow-hidden bg-line">
        {item.imageUrl && (
          <Image
            src={item.imageUrl}
            alt={item.imageAlt || item.name}
            fill
            sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out-strong motion-safe:group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 id={headingId} className="font-serif text-[clamp(1.35rem,1rem+1.2vw,1.9rem)] leading-tight text-slate">
            {item.name}
          </h2>
          {item.location && <p className="mt-1 text-sm text-stone">{item.location}</p>}
        </div>
        {item.rating != null && <Stars rating={item.rating} className="mt-2 shrink-0" />}
      </div>
      {item.description && (
        <p className="mt-3 line-clamp-3 text-[0.95rem] leading-relaxed text-ink/75">{item.description}</p>
      )}
      {/* Pinned to the card's foot so stay details line up across a row. */}
      {(item.maxGuests || item.bedsDescription || item.pricePerNight != null) && (
        <div className="mt-auto pt-5">
          <dl className="border-t border-line pt-4 text-sm text-slate sm:text-base">
            {(item.maxGuests || item.bedsDescription) && (
              <div>
                <dt className="sr-only">Stay</dt>
                <dd>
                  {[item.maxGuests && `Max ${item.maxGuests} Guests`, item.bedsDescription]
                    .filter(Boolean)
                    .join(" / ")}
                </dd>
              </div>
            )}
            {item.pricePerNight != null && (
              <div className="mt-1 font-bold">
                <dt className="sr-only">Price</dt>
                <dd>from {priceFormat.format(item.pricePerNight)}/night</dd>
              </div>
            )}
          </dl>
        </div>
      )}
    </article>
  );
}

export default async function DestinationsPage() {
  const destinations = await getDestinations();

  const jsonLd = [
    {
      "@type": "CollectionPage",
      "@id": absoluteUrl("/destinations"),
      url: absoluteUrl("/destinations"),
      name: "Destinations",
      description: DESCRIPTION,
      publisher: { "@id": ORGANIZATION_ID },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: destinations.length,
        itemListElement: destinations.map((d, i) => ({
          "@type": "ListItem",
          position: i + 1,
          // A guided trip to the destination: TouristTrip can carry the offer, a Place can't.
          item: {
            "@type": "TouristTrip",
            name: d.name,
            ...(d.description && { description: d.description }),
            ...(d.imageUrl && { image: d.imageUrl }),
            provider: { "@id": ORGANIZATION_ID },
            itinerary: {
              "@type": "TouristDestination",
              name: d.name,
              ...(d.location && { address: d.location }),
            },
            ...(d.pricePerNight != null && {
              offers: {
                "@type": "Offer",
                price: d.pricePerNight,
                priceCurrency: "USD",
                description: "Starting price per night",
                offeredBy: { "@id": ORGANIZATION_ID },
              },
            }),
          },
        })),
      },
    },
  ];

  return (
    <main className="bg-white px-gutter py-section">
      <JsonLd data={jsonLd} />
      <PageBreadcrumb
        className="mx-auto mb-8 max-w-400"
        items={[
          { name: "Home", path: "/" },
          { name: "Destinations", path: "/destinations" },
        ]}
      />
      <PageHeading
        title="Destinations"
        subtitle="Where we take our photography and wildlife tours"
        className="mx-auto mb-[clamp(2.5rem,5vw,4rem)] max-w-400 [&_h1]:font-serif [&_h1]:text-slate"
      />

      {destinations.length === 0 ? (
        <p className="py-16 text-center text-stone">Destinations are coming soon.</p>
      ) : (
        <ul className="mx-auto grid max-w-400 grid-cols-1 gap-x-[clamp(1rem,3vw,2.5rem)] gap-y-[clamp(2.5rem,5vw,3.5rem)] min-[480px]:grid-cols-2 lg:grid-cols-3">
          {destinations.map((item, i) => (
            // Cards cascade in on load (CSS only, so nothing waits on JavaScript); the stagger is capped.
            <li
              key={item.id}
              style={{ transitionDelay: `${Math.min(i, 5) * 60}ms` }}
              className="transition-[opacity,translate] duration-500 ease-out-strong starting:opacity-0 motion-safe:starting:translate-y-3"
            >
              <DestinationCard item={item} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
