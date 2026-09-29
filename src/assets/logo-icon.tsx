import Image from "next/image";

export default function LogoIcon({ className }: { className?: string }) {
  return (
    <Image
      src="/images/logo.png"
      alt="The Nature Club"
      width={180}
      height={180}
      className={className ?? "size-16 sm:size-20 object-contain"}
      priority
    />
  );
}
