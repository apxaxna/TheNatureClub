import Image from "next/image";

export default function LogoIcon({ className }: { className?: string }) {
  return (
    <Image
      src="https://cdn.sanity.io/images/gnfni9vb/production/3023c21884fe24c0b12286009ee20eedb9ffb337-3375x4219.png"
      alt="The Nature Club"
      width={180}
      height={180}
      className={className ?? "size-16 sm:size-20 object-contain"}
      priority
    />
  );
}
