import type { MetadataRoute } from "next"
import { getAllArticles } from "@/data/articles"
import { getExhibits } from "@/data/exhibits"
import { absoluteUrl } from "@/lib/seo"

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, exhibits] = await Promise.all([getAllArticles(), getExhibits()])
  const latestStory = articles.reduce<string | undefined>(
    (latest, a) => (!latest || a.updatedAt > latest ? a.updatedAt : latest),
    undefined
  )

  return [
    {
      url: absoluteUrl("/"),
      changeFrequency: "weekly",
      priority: 1,
      // Placeholder exhibit photos aren't ours, so they're not advertised to search engines.
      images: exhibits.flatMap((e) => e.photos.filter((p) => !p.placeholder).map((p) => p.imageUrl)),
    },
    { url: absoluteUrl("/destinations"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/blogs"), lastModified: latestStory, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/gallery"), changeFrequency: "weekly", priority: 0.6 },
    ...articles.map((a) => ({
      url: absoluteUrl(`/blogs/${a.slug || a.id}`),
      lastModified: a.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      ...(a.coverUrl && { images: [a.coverUrl] }),
    })),
  ]
}
