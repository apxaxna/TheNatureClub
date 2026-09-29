import { Fragment } from "react"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbJsonLd } from "@/lib/seo"
import { cn } from "@/lib/utils"

export type Crumb = { name: string; path: string }

/**
 * Visible breadcrumb trail plus matching BreadcrumbList structured data.
 * The last crumb is the current page.
 */
export function PageBreadcrumb({
  items,
  className,
  tone = "light",
}: {
  items: Crumb[]
  className?: string
  tone?: "light" | "dark"
}) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(items)} />
      <Breadcrumb className={className}>
        <BreadcrumbList className={cn(tone === "dark" && "text-mist/60")}>
          {items.map((item, i) => {
            const isLast = i === items.length - 1
            return (
              <Fragment key={item.path}>
                <BreadcrumbItem className={cn(isLast && "min-w-0")}>
                  {isLast ? (
                    <BreadcrumbPage className={cn("line-clamp-1", tone === "dark" && "text-mist")}>
                      {item.name}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink
                      className={cn(tone === "dark" && "hover:text-white")}
                      render={<Link href={item.path} />}
                    >
                      {item.name}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  )
}
