import type { MetadataRoute } from "next"
import { absoluteUrl } from "@/lib/seo"

// Search engines and AI assistants are both welcome: being cited is the point.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
  }
}
