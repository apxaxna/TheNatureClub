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
      <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {articles.slice(0, visible).map((article) => (
          <li key={article.id}>
            <Link href={`/blogs/${article.slug || article.id}`} className="group block">
              <article>
                <div className="relative aspect-3/2 overflow-hidden bg-line">
                  {article.coverUrl && (
                    <Image
                      src={article.coverUrl}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
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
                <h2 className="mt-2 font-serif text-xl leading-snug font-bold text-balance group-hover:underline group-hover:underline-offset-4">
                  {article.title}
                </h2>
                {article.excerpt && (
                  <p className="mt-2 line-clamp-3 text-ink/75">{article.excerpt}</p>
                )}
              </article>
            </Link>
          </li>
        ))}
      </ul>

      {visible < articles.length && (
        <div className="mt-16 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="rounded-full border border-ink px-6 py-2.5 text-sm transition-colors hover:bg-ink hover:text-cream"
          >
            Load more stories
          </button>
        </div>
      )}
    </>
  )
}
