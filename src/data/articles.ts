import type { PortableTextBlock } from "@/components/portable-text"
import { client } from "@/sanity/client"
import { POSTS_QUERY, POST_BY_SLUG_OR_ID_QUERY } from "@/sanity/queries"

export type Article = {
  id: string
  slug: string
  title: string
  coverUrl: string
  coverAlt?: string
  createdAt: string
  updatedAt: string
  readTime: string
  tags: string[]
  excerpt: string
  body: PortableTextBlock[]
}

// Shape returned by POSTS_QUERY / POST_BY_SLUG_OR_ID_QUERY.
type RawPost = {
  _id: string
  _updatedAt: string
  title: string
  slug?: string
  publishedAt: string
  readTime?: string
  excerpt?: string
  tags?: string[]
  coverUrl?: string
  coverAlt?: string
  body?: PortableTextBlock[]
}

function toArticle(post: RawPost): Article {
  return {
    id: post.slug || post._id,
    slug: post.slug ?? "",
    title: post.title,
    coverUrl: post.coverUrl ?? "",
    coverAlt: post.coverAlt,
    createdAt: post.publishedAt,
    updatedAt: post._updatedAt || post.publishedAt,
    readTime: post.readTime || "5 min read",
    tags: post.tags || [],
    excerpt: post.excerpt || "",
    body: post.body ?? [],
  }
}

export async function getSanityPosts(): Promise<Article[]> {
  try {
    const posts = await client.fetch<RawPost[]>(POSTS_QUERY)
    return (posts ?? []).map(toArticle)
  } catch (err) {
    console.error("Failed to fetch posts from Sanity Content Lake:", err)
  }
  return []
}

export async function getSanityPostBySlugOrId(slugOrId: string): Promise<Article | undefined> {
  try {
    const post = await client.fetch<RawPost | null>(POST_BY_SLUG_OR_ID_QUERY, { slugOrId })
    if (post) return toArticle(post)
  } catch (err) {
    console.error(`Failed to fetch post "${slugOrId}" from Sanity:`, err)
  }
  return undefined
}

export async function getAllArticles(): Promise<Article[]> {
  return getSanityPosts()
}
