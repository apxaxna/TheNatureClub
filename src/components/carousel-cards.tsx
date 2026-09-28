import { ArrowRightIcon } from "@phosphor-icons/react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export type CarouselCardProps = {
  image: string | StaticImageData;
  title: string;
  href?: string;
};

export const CarouselCard = ({
  image,
  title,
  href,
}: CarouselCardProps) => {
  const cardBody = (
    <div className="group/card relative w-45 sm:w-70 md:w-75 lg:w-85 2xl:w-95 shrink-0 select-none cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1.5 active:scale-[0.98]">
      <div className="relative h-62.5 sm:h-95 md:h-100 lg:h-115 2xl:h-125 w-full overflow-hidden rounded-xl sm:rounded-2xl bg-neutral-100 shadow-sm transition-all duration-300 ease-out group-hover/card:shadow-xl group-hover/card:shadow-black/10">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 180px, (max-width: 1024px) 280px, (max-width: 1536px) 340px, 380px"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover/card:scale-105"
        />
        {/* Subtle bottom vignette to ground the image */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover/card:opacity-80" />
      </div>

      <div className="flex w-full items-center justify-between gap-1.5 px-1 pt-2 sm:px-1.5 sm:pt-3">
        <span className="text-xs sm:text-base lg:text-lg font-medium tracking-tight text-foreground transition-colors duration-200 group-hover/card:text-black">
          {title}
        </span>

        <div className="flex items-center gap-0.5 sm:gap-1 text-[11px] sm:text-sm font-medium text-neutral-600 transition-colors duration-200 group-hover/card:text-black shrink-0">
          <span className="group-hover/card:underline underline-offset-4">
            see more
          </span>
          <ArrowRightIcon
            size={13}
            className="transition-transform duration-200 ease-out group-hover/card:translate-x-1"
          />
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block shrink-0 focus-visible:outline-none">
        {cardBody}
      </Link>
    );
  }

  return cardBody;
};