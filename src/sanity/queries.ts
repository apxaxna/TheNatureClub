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
  *[_type == "destination"] | order(displayOrder asc, name asc) {
    _id,
    name,
    "slug": slug.current,
    locationLabel,
    description,
    rating,
    maxGuests,
    bedsDescription,
    pricePerNight,
    "imageUrl": coverImage.asset->url,
    "imageAlt": coverImage.alt
  }
`

export const EXHIBITS_QUERY = groq`
  *[_type == "exhibit"] | order(displayOrder asc, _createdAt asc) {
    _id,
    title,
    "slug": slug.current,
    season,
    description,
    photos[]{
      _key,
      title,
      caption,
      alt,
      location,
      wide,
      "imageUrl": image.asset->url
    }
  }
`

export const TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial"] | order(displayOrder asc, _createdAt asc) {
    _id,
    quote,
    name,
    place,
    rating
  }
`

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    siteTitle,
    tagline,
    description,
    heroHeadline,
    "heroImageUrl": heroImage.asset->url,
    aboutHeadline,
    aboutParagraph,
    "aboutImageTopRightUrl": aboutImageTopRight.asset->url,
    "aboutImageTopRightAlt": aboutImageTopRight.alt,
    "logoUrl": logo.asset->url,
    contactEmail,
    address,
    businessHours[]{ day, opens, closes },
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

