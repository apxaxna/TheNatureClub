import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { format } from "date-fns"

import {
  getAllArticles,
  getSanityPostBySlugOrId,
} from "@/data/articles"
import { PortableText } from "@/components/portable-text"
import { JsonLd } from "@/components/json-ld"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { ORGANIZATION_ID, WEBSITE_ID, absoluteUrl } from "@/lib/seo"

export const revalidate = 60

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const articles = await getAllArticles()
  return articles.map((article) => ({
    id: article.slug || article.id,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const article = await getSanityPostBySlugOrId(id)
  if (!article) {
    return {
      title: "Story not found",
      robots: { index: false },
    }
  }

  const path = `/blogs/${article.slug || article.id}`
  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.tags,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      title: article.title,
      description: article.excerpt,
      publishedTime: article.createdAt,
      tags: article.tags,
      ...(article.coverUrl && {
        images: [{ url: `${article.coverUrl}?w=1200&h=630&fit=crop&auto=format`, width: 1200, height: 630 }],
      }),
    },
  }
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { id } = await params
  const article = await getSanityPostBySlugOrId(id)

  if (!article) {
    notFound()
  }

  const path = `/blogs/${article.slug || article.id}`
  const jsonLd = [
    {
      "@type": "BlogPosting",
      "@id": `${absoluteUrl(path)}#article`,
      mainEntityOfPage: absoluteUrl(path),
      headline: article.title,
      description: article.excerpt,
      datePublished: article.createdAt,
      ...(article.coverUrl && { image: article.coverUrl }),
      keywords: article.tags.join(", "),
      inLanguage: "en-IN",
      author: { "@id": ORGANIZATION_ID },
      publisher: { "@id": ORGANIZATION_ID },
      isPartOf: { "@id": WEBSITE_ID },
    },
  ]

  return (
    <main className="px-[clamp(1rem,4vw,3rem)] pt-[clamp(1.5rem,4vw,3rem)] pb-24">
      <JsonLd data={jsonLd} />
      <PageBreadcrumb
        className="mx-auto max-w-180"
        items={[
          { name: "Home", path: "/" },
          { name: "Stories", path: "/blogs" },
          { name: article.title, path },
        ]}
      />

      <article className="mx-auto max-w-180" aria-labelledby="article-title">
        <header className="mt-10 text-center">
          {article.tags[0] && (
            <p className="text-xs font-bold uppercase tracking-widest text-gold">
              {article.tags[0]}
            </p>
          )}
          <h1 id="article-title" className="mt-4 font-serif text-3xl leading-tight font-bold text-balance sm:text-5xl">
            {article.title}
          </h1>
          {article.excerpt && (
            <p className="mt-5 text-lg text-ink/70 sm:text-xl">{article.excerpt}</p>
          )}
          <p className="mt-6 text-sm text-stone">
            <time dateTime={article.createdAt}>
              {format(new Date(article.createdAt), "MMMM d, yyyy")}
            </time>
            <span aria-hidden="true"> · </span>
            {article.readTime}
          </p>
        </header>

      {article.coverUrl && (
        <figure className="relative mt-12 aspect-video overflow-hidden bg-line">
          <Image
            src={article.coverUrl}
            alt=""
            fill
            preload
            sizes="(max-width: 720px) 100vw, 720px"
            className="object-cover"
          />
        </figure>
      )}

      <div className="mt-12">
        <PortableText value={article.body} />

        {article.tags.length > 0 && (
          <ul className="mt-14 flex flex-wrap gap-2 border-t border-line pt-8">
            {article.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-line px-3.5 py-1 text-xs text-ink/70"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
      </article>
    </main>
  )
}
