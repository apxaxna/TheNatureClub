import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react"

import {
  getAllArticles,
  getSanityPostBySlugOrId,
} from "@/data/articles"
import { PortableText } from "@/components/portable-text"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return getAllArticles().map((article) => ({
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
    <div className="min-h-svh w-full bg-[#271b15] text-[#f5f1eb]">
      <div className="max-w-180 mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-24">
        {/* Back Link */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm text-stone-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Back to Blogs
        </Link>

        {/* Category Badge */}
        {article.tags.length > 0 && (
          <div className="mb-3">
            <span className="text-xs uppercase tracking-widest text-[#c2d385] font-semibold">
              {article.tags[0]}
            </span>
          </div>
        )}

        {/* Article Title (shadcn h1) */}
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-white">
          {article.title}
        </h1>

        {/* Subtitle / Excerpt (shadcn lead) */}
        <p className="text-xl text-stone-300 leading-relaxed mt-4">
          {article.excerpt}
        </p>

        {/* Medium-style Metadata Bar (No author name) */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-white/10 py-3.5 my-8 text-xs sm:text-sm text-stone-400">
          <div className="inline-flex items-center gap-1.5">
            <Calendar className="size-3.5 text-stone-400" />
            <time dateTime={article.createdAt}>
              {format(new Date(article.createdAt), "MMMM d, yyyy")}
            </time>
          </div>
          <span>·</span>
          <div className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5 text-stone-400" />
            <span>{article.readTime}</span>
          </div>
          {article.tags[0] && (
            <>
              <span>·</span>
              <div className="inline-flex items-center gap-1.5">
                <Tag className="size-3 text-[#c2d385]" />
                <span className="text-[#c2d385] font-medium">{article.tags[0]}</span>
              </div>
            </>
          )}
        </div>

        {/* Hero Cover Image */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-10 shadow-2xl ring-1 ring-white/10">
          <img
            src={article.coverUrl}
            alt={article.title}
            className="size-full object-cover"
          />
        </div>

        {/* Article Body Rendered via PortableText (Shadcn Typography standard for Sanity) */}
        <article className="text-stone-300">
          <PortableText value={article.body} />

          {/* Tag Pills */}
          <div className="flex flex-wrap gap-2 pt-10 mt-12 border-t border-white/10">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/5 border border-white/10 px-3.5 py-1 text-xs text-stone-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Bottom Back Navigation */}
          <div className="mt-12 flex justify-between items-center pt-8 border-t border-white/10">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm text-stone-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="size-4" /> Back to all stories
            </Link>
          </div>
        </article>
      </div>
    </div>
  )
}
