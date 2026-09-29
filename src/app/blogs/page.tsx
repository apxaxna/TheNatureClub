import type { Metadata } from "next";
import { ArticleGrid } from "@/components/blog/article-grid";
import { PageHeading } from "@/components/page-heading";
import { getSanityPosts } from "@/data/articles";

export const metadata: Metadata = {
  title: "Stories | The Nature Club",
  description: "Field notes and stories from the wild.",
};

export const revalidate = 60;

export default async function BlogsPage() {
  const articles = await getSanityPosts();

  return (
    <main className="px-6 py-20 sm:px-12 lg:px-[8%] lg:py-24">
      <PageHeading title="Stories" subtitle="Field notes from the wild" className="mb-14" />
      <ArticleGrid articles={articles} />
    </main>
  );
}
