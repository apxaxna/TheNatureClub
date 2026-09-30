import { getAllArticles } from "@/data/articles"
import { DEFAULT_DESCRIPTION, SITE_NAME, getContact, getSiteSettings } from "@/data/site"
import { absoluteUrl } from "@/lib/seo"

export const revalidate = 3600

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")

// RSS 2.0 feed of the stories, so readers, aggregators and other blogs can follow and link to them.
export async function GET() {
  const [settings, articles] = await Promise.all([getSiteSettings(), getAllArticles()])
  const name = settings?.siteTitle || SITE_NAME
  const contact = getContact(settings)

  const items = articles.map((a) => {
    const url = absoluteUrl(`/blogs/${a.slug || a.id}`)
    return [
      "    <item>",
      `      <title>${escape(a.title)}</title>`,
      `      <link>${url}</link>`,
      `      <guid isPermaLink="true">${url}</guid>`,
      `      <pubDate>${new Date(a.createdAt).toUTCString()}</pubDate>`,
      a.excerpt && `      <description>${escape(a.excerpt)}</description>`,
      ...a.tags.map((tag) => `      <category>${escape(tag)}</category>`),
      a.coverUrl &&
        `      <enclosure url="${escape(`${a.coverUrl}?w=1200&auto=format`)}" type="image/jpeg" length="0" />`,
      "    </item>",
    ]
      .filter(Boolean)
      .join("\n")
  })

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escape(`${name} Stories`)}</title>`,
    `    <link>${absoluteUrl("/blogs")}</link>`,
    `    <description>${escape(settings?.description || DEFAULT_DESCRIPTION)}</description>`,
    "    <language>en-IN</language>",
    `    <managingEditor>${escape(`${contact.email} (${name})`)}</managingEditor>`,
    `    <atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml" />`,
    articles[0] && `    <lastBuildDate>${new Date(articles[0].updatedAt).toUTCString()}</lastBuildDate>`,
    ...items,
    "  </channel>",
    "</rss>",
    "",
  ]
    .filter(Boolean)
    .join("\n")

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  })
}
