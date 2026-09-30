import type { Metadata } from "next";
import { getSiteSettings } from "@/data/site";
import { ArticleGrid } from "@/components/blog/article-grid";
import { PageHeading } from "@/components/page-heading";
import { JsonLd } from "@/components/json-ld";
import { getSanityPosts } from "@/data/articles";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { ORGANIZATION_ID, absoluteUrl, pageOpenGraph, pageAlternates } from "@/lib/seo";

const DESCRIPTION =
  "Field notes and stories from our wildlife and photography tours across India — tiger tracking, birding, monsoon forests and more.";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: "Stories",
    description: DESCRIPTION,
    alternates: pageAlternates("/blogs"),
    openGraph: pageOpenGraph({
      path: "/blogs",
      title: "Stories",
      description: DESCRIPTION,
      image: settings?.heroImageUrl,
      imageAlt: settings?.heroImageAlt,
    }),
  };
}

export const revalidate = 3600;

export default async function BlogsPage() {
  const articles = await getSanityPosts();

  const jsonLd = [
    {
      "@type": "Blog",
      "@id": absoluteUrl("/blogs"),
      url: absoluteUrl("/blogs"),
      name: "The Nature Club Stories",
      description: DESCRIPTION,
      publisher: { "@id": ORGANIZATION_ID },
      blogPost: articles.map((a) => ({
        "@type": "BlogPosting",
        "@id": `${absoluteUrl(`/blogs/${a.slug || a.id}`)}#article`,
        url: absoluteUrl(`/blogs/${a.slug || a.id}`),
        headline: a.title,
        datePublished: a.createdAt,
        dateModified: a.updatedAt,
        ...(a.coverUrl && { image: a.coverUrl }),
      })),
    },
  ];

  return (
    <main className="px-gutter py-section">
      <JsonLd data={jsonLd} />
      <PageBreadcrumb
        // Aligned to the grid's edge, not the viewport's, on wide screens.
        className="mx-auto mb-8 max-w-400"
        items={[
          { name: "Home", path: "/" },
          { name: "Stories", path: "/blogs" },
        ]}
      />
      <PageHeading
        title="Stories"
        subtitle="Field notes from the wild"
        className="mx-auto mb-[clamp(2.5rem,5vw,4rem)] max-w-400"
      />
      <ArticleGrid articles={articles} />
    </main>
  );
}
