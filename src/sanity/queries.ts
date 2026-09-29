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

export const DESTINATIONS_QUERY = groq`
  *[_type == "destination" && featured != false] | order(displayOrder asc) {
    _id,
    name,
    "slug": slug.current,
    locationLabel,
    rating,
    maxGuests,
    bedsDescription,
    bedCount,
    pricePerNight,
    "imageUrl": coverImage.asset->url,
    coverImage {
      alt,
      asset-> {
        _id,
        url
      }
    },
    description
  }
`

export const DISCOVERIES_QUERY = groq`
  *[_type == "discovery" && featured != false] | order(displayOrder asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "imageUrl": image.asset->url,
    image {
      alt,
      asset-> {
        _id,
        url
      }
    }
  }
`

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    siteTitle,
    tagline,
    heroHeadline,
    "heroImageUrl": heroImage.asset->url,
    heroImage {
      alt,
      asset-> { _id, url }
    },
    aboutHeadline,
    aboutParagraph,
    "aboutImageTopRightUrl": aboutImageTopRight.asset->url,
    aboutImageTopRight {
      alt,
      asset-> { _id, url }
    },
    "aboutImageBottomLeftUrl": aboutImageBottomLeft.asset->url,
    aboutImageBottomLeft {
      alt,
      asset-> { _id, url }
    },
    "footerImageUrl": footerImage.asset->url,
    footerImage {
      alt,
      asset-> { _id, url }
    },
    "logoUrl": logo.asset->url,
    logo {
      alt,
      asset-> { _id, url }
    },
    socialLinks[]{
      platform,
      url
    }
  }
`

export const GALLERY_ITEMS_QUERY = groq`
  *[_type == "galleryItem"] | order(displayOrder asc, _createdAt desc) {
    _id,
    title,
    mediaType,
    aspectRatio,
    displayOrder,
    "imageUrl": image.asset->url,
    image {
      alt,
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height,
            aspectRatio
          },
          lqip
        }
      }
    },
    "videoFileUrl": videoFile.asset->url,
    videoUrl,
    "posterUrl": videoPoster.asset->url,
    videoPoster {
      alt,
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height,
            aspectRatio
          }
        }
      }
    }
  }
`

