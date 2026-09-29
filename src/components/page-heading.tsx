import { cn } from "@/lib/utils"

export function PageHeading({
  title,
  subtitle,
  className,
}: {
  title: string
  subtitle?: string
  className?: string
}) {
  return (
    <header className={cn("text-center", className)}>
      <h1 className="font-display text-4xl sm:text-5xl">{title}</h1>
      {subtitle && <p className="mt-3 text-lg opacity-70">{subtitle}</p>}
    </header>
  )
}
