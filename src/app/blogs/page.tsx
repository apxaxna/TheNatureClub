import type { Metadata } from "next";
import { ArticleGrid } from "@/components/blog/article-grid";
import { PageHeading } from "@/components/page-heading";
import { JsonLd } from "@/components/json-ld";
import { getSanityPosts } from "@/data/articles";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { ORGANIZATION_ID, absoluteUrl } from "@/lib/seo";

const DESCRIPTION =
  "Field notes and stories from our wildlife and photography tours across India — tiger tracking, birding, monsoon forests and more.";

export const metadata: Metadata = {
  title: "Stories",
  description: DESCRIPTION,
  alternates: { canonical: "/blogs" },
  openGraph: { url: "/blogs", title: "Stories", description: DESCRIPTION },
};

export const revalidate = 60;

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
        ...(a.coverUrl && { image: a.coverUrl }),
      })),
    },
  ];

  return (
    <main className="px-[clamp(1rem,4vw,6rem)] py-[clamp(2.5rem,7vw,6rem)]">
      <JsonLd data={jsonLd} />
      <PageBreadcrumb
        className="mb-8"
        items={[
          { name: "Home", path: "/" },
          { name: "Stories", path: "/blogs" },
        ]}
      />
      <PageHeading title="Stories" subtitle="Field notes from the wild" className="mb-14" />
      <ArticleGrid articles={articles} />
    </main>
  );
}
