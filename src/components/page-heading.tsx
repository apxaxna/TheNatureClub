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
      <h1 className="animate-enter font-display text-[clamp(2.25rem,1.6rem+2.6vw,3.5rem)] leading-tight text-balance">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 animate-enter text-[clamp(1rem,0.9rem+0.4vw,1.2rem)] text-balance opacity-70 [animation-delay:100ms]">
          {subtitle}
        </p>
      )}
      {/* The same short gold rule as the contact form, drawn out from the centre. */}
      <div aria-hidden="true" className="mx-auto mt-6 h-px w-12 animate-rule bg-gold [animation-delay:250ms]" />
    </header>
  )
}
