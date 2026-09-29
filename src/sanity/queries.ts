import { groq } from "next-sanity"

export const POSTS_QUERY = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    readTime,
    excerpt,
    tags,
    "coverUrl": mainImage.asset->url,
    mainImage {
      alt,
      caption,
      asset-> {
        _id,
        url
      }
    },
    body[]{
      ...,
      _type == "image" => {
        ...,
        asset-> {
          _id,
          url
        }
      }
    }
  }
`

export const POST_BY_SLUG_OR_ID_QUERY = groq`
  *[_type == "post" && (slug.current == $slugOrId || _id == $slugOrId)][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    readTime,
    excerpt,
    tags,
    "coverUrl": mainImage.asset->url,
    mainImage {
      alt,
      caption,
      asset-> {
        _id,
        url
      }
    },
    body[]{
      ...,
      _type == "image" => {
        ...,
        asset-> {
          _id,
          url
        }
      }
    }
  }
`
