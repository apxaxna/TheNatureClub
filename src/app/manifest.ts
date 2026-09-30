import type { MetadataRoute } from "next"
import { DEFAULT_DESCRIPTION, SITE_NAME } from "@/data/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#fff7f1",
    theme_color: "#fff7f1",
    icons: [
      { src: "/favicon.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
      { src: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
  }
}
