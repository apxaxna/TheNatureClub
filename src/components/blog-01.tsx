"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ArticleItem } from "@/components/article-item"
import { ARTICLES, type Article } from "@/data/articles"

export default function Blog01() {
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>(() =>
    ARTICLES.slice(0, 6)
  )

  const handleLoadMore = () => {
    setDisplayedArticles((prev) => {
      const currentLength = prev.length
      if (currentLength < ARTICLES.length) {
        return ARTICLES.slice(0, currentLength + 6)
      }
      // If we've shown all base articles, cycle through and generate new items with unique IDs
      const nextBatch: Article[] = ARTICLES.slice(0, 6).map((article, idx) => ({
        ...article,
        id: `${currentLength + idx + 1}`,
      }))
      return [...prev, ...nextBatch]
    })
  }

  return (
    <div className="w-full flex flex-col gap-8 px-4 sm:px-8 py-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {displayedArticles.map((article) => (
          <Link
            key={article.id}
            className="block h-full transition-transform duration-200 hover:-translate-y-1"
            href={`/blogs/${article.id}`}
          >
            <ArticleItem
              title={article.title}
              coverUrl={article.coverUrl}
              createdAt={article.createdAt}
            />
          </Link>
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          type="button"
          onClick={handleLoadMore}
          className="gap-2 pr-2.5 pl-3 cursor-pointer"
        >
          Load More
          <ArrowRightIcon />
        </Button>
      </div>
    </div>
  )
}
