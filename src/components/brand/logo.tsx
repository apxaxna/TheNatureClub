import { cn } from "@/lib/utils"

// Line-art leaf inside a double ring, redrawn from the thenatureclub.in emblem.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("text-leaf", className)}
    >
      <circle cx="50" cy="50" r="47" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="40" strokeWidth="2.5" />
      {/* leaf outline, tip up-right */}
      <path
        strokeWidth="2.5"
        d="M31 70 C 27 56, 32 42, 44 34 C 53 28, 63 27, 71 26 C 72 35, 71 46, 64 56 C 57 65, 45 71, 31 70 Z"
      />
      {/* midrib + stem */}
      <path strokeWidth="2.5" d="M25 76 L 34 67 L 66 32" />
      {/* veins */}
      <path
        strokeWidth="2"
        d="M41 59 L 40 47 M41 59 L 53 60 M48 51 L 48 40 M48 51 L 59 52 M55 43 L 56 34 M55 43 L 65 43"
      />
    </svg>
  )
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-serif font-black leading-[1.15] *:block", className)}>
      <span>The</span> <span>Nature</span> <span>Club.</span>
    </span>
  )
}
