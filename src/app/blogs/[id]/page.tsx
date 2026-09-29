import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr"

import {
  getAllArticles,
  getSanityPostBySlugOrId,
} from "@/data/articles"
import { PortableText } from "@/components/portable-text"

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
      title: "Story Not Found | The Nature Club",
    }
  }

  return {
    title: `${article.title} | The Nature Club`,
    description: article.excerpt,
  }
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { id } = await params
  const article = await getSanityPostBySlugOrId(id)

  if (!article) {
    notFound()
  }

  return (
    <main className="px-6 pt-12 pb-24 sm:pt-16">
      <article className="mx-auto max-w-180">
        <Link
          href="/blogs"
          className="group inline-flex items-center gap-2 text-sm text-stone transition-colors hover:text-ink"
        >
          <ArrowLeftIcon className="size-4 transition-transform group-hover:-translate-x-1" />
          All stories
        </Link>

        <header className="mt-10 text-center">
          {article.tags[0] && (
            <p className="text-xs font-bold uppercase tracking-widest text-gold">
              {article.tags[0]}
            </p>
          )}
          <h1 className="mt-4 font-serif text-3xl leading-tight font-bold text-balance sm:text-5xl">
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
      </article>

      {article.coverUrl && (
        <div className="relative mx-auto mt-12 aspect-video max-w-6xl overflow-hidden bg-line">
          <Image
            src={article.coverUrl}
            alt=""
            fill
            preload
            sizes="(max-width: 1152px) 100vw, 1152px"
            className="object-cover"
          />
        </div>
      )}

      <div className="mx-auto mt-12 max-w-180">
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
    </main>
  )
}
