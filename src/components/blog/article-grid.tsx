"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import type { Article } from "@/data/articles"

const PAGE_SIZE = 6

export function ArticleGrid({ articles }: { articles: Article[] }) {
  const [visible, setVisible] = useState(PAGE_SIZE)

  if (articles.length === 0) {
    return (
      <p className="py-24 text-center text-stone">No stories published yet.</p>
    )
  }

  return (
    <>
      <ul className="mx-auto grid max-w-400 grid-cols-1 gap-x-[clamp(1rem,3vw,2.5rem)] gap-y-[clamp(2.5rem,5vw,3.5rem)] min-[480px]:grid-cols-2 lg:grid-cols-3">
        {articles.slice(0, visible).map((article, i) => (
          // Each batch (first load or "Load more") cascades in rather than popping in at once.
          <li
            key={article.id}
            style={{ transitionDelay: `${(i % PAGE_SIZE) * 60}ms` }}
            className="transition-[opacity,translate] duration-500 ease-out-strong starting:opacity-0 motion-safe:starting:translate-y-3"
          >
            <article className="group">
              <Link href={`/blogs/${article.slug || article.id}`} className="block active:scale-[0.99] transition-transform duration-150 ease-out">
                <div className="relative aspect-3/2 overflow-hidden bg-line">
                  {article.coverUrl && (
                    <Image
                      src={article.coverUrl}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out-strong motion-safe:group-hover:scale-[1.03]"
                    />
                  )}
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-widest text-stone">
                  {article.tags[0] && <span className="font-bold text-gold">{article.tags[0]}</span>}
                  {article.tags[0] && <span aria-hidden="true">·</span>}
                  <time dateTime={article.createdAt}>
                    {format(new Date(article.createdAt), "MMM d, yyyy")}
                  </time>
                </div>
                {/* The underline fades in (rather than snapping on), and wraps with multi-line titles. */}
                <h2 className="mt-2 font-serif text-xl leading-snug font-bold text-balance underline decoration-transparent decoration-1 underline-offset-4 transition-[text-decoration-color] duration-200 group-hover:decoration-gold">
                  {article.title}
                </h2>
                {article.excerpt && (
                  <p className="mt-2 line-clamp-3 leading-relaxed text-ink/75">{article.excerpt}</p>
                )}
              </Link>
            </article>
          </li>
        ))}
      </ul>

      {visible < articles.length && (
        <div className="mt-[clamp(3rem,6vw,4.5rem)] flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="rounded-full border border-ink px-6 py-2.5 text-sm transition-[color,background-color,scale] duration-150 ease-out hover:bg-ink hover:text-cream active:scale-[0.97]"
          >
            Load more stories
          </button>
        </div>
      )}
    </>
  )
}
