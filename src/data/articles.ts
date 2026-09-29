import type { PortableTextBlock } from "@/components/portable-text"
import { client } from "@/sanity/client"
import { POSTS_QUERY, POST_BY_SLUG_OR_ID_QUERY } from "@/sanity/queries"

export type SanityPost = {
  _id: string
  _type: "post"
  title: string
  slug: {
    current: string
  }
  publishedAt: string
  estimatedReadingTime?: number
  readTime: string
  excerpt: string
  tags: string[]
  mainImage: {
    asset: {
      url: string
    }
    alt: string
    caption?: string
  }
  body: PortableTextBlock[]
}

export type Article = {
  id: string
  slug: string
  title: string
  coverUrl: string
  createdAt: string
  readTime: string
  tags: string[]
  excerpt: string
  body: PortableTextBlock[]
}

// Deprecated empty array retained for backwards compatibility
export const ARTICLES: Article[] = []

export async function getSanityPosts(): Promise<Article[]> {
  try {
    const sanityPosts = await client.fetch(POSTS_QUERY)
    if (sanityPosts && sanityPosts.length > 0) {
      return sanityPosts.map((post: any) => ({
        id: post.slug || post._id,
        slug: post.slug,
        title: post.title,
        coverUrl: post.coverUrl,
        createdAt: post.publishedAt,
        readTime: post.readTime || "5 min read",
        tags: post.tags || [],
        excerpt: post.excerpt || "",
        body: post.body,
      }))
    }
  } catch (err) {
    console.error("Failed to fetch posts from Sanity Content Lake:", err)
  }
  return []
}

export async function getSanityPostBySlugOrId(
  slugOrId: string
): Promise<Article | undefined> {
  try {
    const post = await client.fetch(POST_BY_SLUG_OR_ID_QUERY, { slugOrId })
    if (post) {
      return {
        id: post.slug || post._id,
        slug: post.slug,
        title: post.title,
        coverUrl: post.coverUrl,
        createdAt: post.publishedAt,
        readTime: post.readTime || "5 min read",
        tags: post.tags || [],
        excerpt: post.excerpt || "",
        body: post.body,
      }
    }
  } catch (err) {
    console.error(`Failed to fetch post "${slugOrId}" from Sanity:`, err)
  }
  return undefined
}

export async function getAllArticles(): Promise<Article[]> {
  return getSanityPosts()
}

export async function getArticleById(id: string): Promise<Article | undefined> {
  return getSanityPostBySlugOrId(id)
}
