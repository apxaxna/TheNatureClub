import { getAllArticles } from "@/data/articles"
import { getDestinations } from "@/data/destinations"
import { getExhibits } from "@/data/exhibits"
import { DEFAULT_DESCRIPTION, formatTime, getContact, getSiteSettings } from "@/data/site"
import { absoluteUrl } from "@/lib/seo"

export const revalidate = 3600

// Plain-language site summary for AI assistants (https://llmstxt.org).
export async function GET() {
  const [settings, destinations, exhibits, articles] = await Promise.all([
    getSiteSettings(),
    getDestinations(),
    getExhibits(),
    getAllArticles(),
  ])
  const contact = getContact(settings)

  const lines = [
    `# ${settings?.siteTitle || "The Nature Club"}`,
    "",
    `> ${settings?.description || DEFAULT_DESCRIPTION}`,
    "",
    `The Nature Club is a landscape and travel photography tour operator based in ${contact.address.locality}, ${contact.address.region}, India. Contact: ${contact.email}.`,
    "",
    "## Pages",
    `- [Home](${absoluteUrl("/")}): seasonal photo exhibits and guest testimonials`,
    `- [Destinations](${absoluteUrl("/destinations")}): destinations we guide, with stay details and prices`,
    `- [Stories](${absoluteUrl("/blogs")}): field notes from our tours`,
    `- [Gallery](${absoluteUrl("/gallery")}): photographs and short films`,
    `- [Stories feed](${absoluteUrl("/feed.xml")}): RSS feed of new stories`,
    "",
    "## Destinations",
    ...destinations.map((d) =>
      [
        `- ${d.name}`,
        d.location && ` (${d.location})`,
        d.pricePerNight != null && `: from $${d.pricePerNight}/night`,
        d.maxGuests && `, max ${d.maxGuests} guests`,
      ]
        .filter(Boolean)
        .join("")
    ),
    "",
    "## Exhibits",
    ...exhibits.map((e) => `- ${e.title}: ${e.photos.map((p) => p.title).join(", ")}`),
    "",
    "## Stories",
    ...articles.map((a) => `- [${a.title}](${absoluteUrl(`/blogs/${a.slug || a.id}`)})${a.excerpt ? `: ${a.excerpt}` : ""}`),
    "",
    "## Business hours",
    ...contact.hours.map((h) => `- ${h.day}: ${formatTime(h.opens)} – ${formatTime(h.closes)}`),
    "",
  ]

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
