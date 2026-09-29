import { StarIcon } from "@phosphor-icons/react/dist/ssr"
import { cn } from "@/lib/utils"

export function Stars({
  rating,
  className,
}: {
  rating: number
  className?: string
}) {
  const filled = Math.round(rating)
  return (
    <div
      role="img"
      aria-label={`Rated ${rating.toFixed(1)} out of 5`}
      className={cn("flex items-center gap-0.5", className)}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon
          key={i}
          weight="fill"
          className={cn("size-4", i < filled ? "text-gold" : "text-stone/60")}
        />
      ))}
    </div>
  )
}
