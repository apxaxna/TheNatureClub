import { client } from "@/sanity/client"
import { EXHIBITS_QUERY } from "@/sanity/queries"

export type ExhibitPhoto = {
  id: string
  title: string
  caption?: string
  alt: string
  location?: string
  wide?: boolean
  imageUrl: string
  /** True while no photo has been uploaded and a random placeholder is shown instead. */
  placeholder?: boolean
}

export type Exhibit = {
  id: string
  slug: string
  title: string
  season?: string
  description?: string
  photos: ExhibitPhoto[]
}

// Placeholder photo until the real one is uploaded in Sanity.
const placeholder = (seed: string) => `https://picsum.photos/seed/tnc-${seed}/1600/1200`

// The three seasonal exhibits from thenatureclub.in, shown if Sanity has no exhibits.
const EXHIBIT_TEMPLATES: Exhibit[] = [
  {
    id: "winter",
    slug: "the-winter-exhibit",
    title: "The Winter Exhibit",
    season: "winter",
    description: "Snowbound wildlife and high-altitude landscapes from Drass and Leh in Ladakh.",
    photos: [
      {
        id: "icy-bear-happiness",
        title: "Icy Bear Happiness",
        caption: "A winter scene captured in Drass",
        alt: "A bear crossing a snow-covered slope in Drass, Ladakh",
        location: "Drass, Ladakh",
        imageUrl: placeholder("icy-bear-happiness"),
      },
      {
        id: "white-loneliness",
        title: "White Loneliness",
        caption: "Vast emptiness blanketed by grasslands",
        alt: "A lone wild dog standing in golden grassland",
        imageUrl: placeholder("white-loneliness"),
      },
      {
        id: "chilly-evenings",
        title: "Chilly Evenings",
        caption: "Motherhood scenes from Leh",
        alt: "A small animal resting among weathered rocks near Leh",
        location: "Leh, Ladakh",
        imageUrl: placeholder("chilly-evenings"),
      },
    ],
  },
  {
    id: "summer",
    slug: "the-summer-exhibit",
    title: "The Summer Exhibit",
    season: "summer",
    description: "Monsoon-green backwaters, tigers in dense foliage and vivid reptiles of the Western Ghats.",
    photos: [
      {
        id: "backwaters",
        title: "Backwaters",
        caption: "Indian backwaters",
        alt: "A tiger moving through dense green foliage near the backwaters",
        imageUrl: placeholder("backwaters"),
      },
      {
        id: "the-brightest-blue",
        title: "The Brightest Blue",
        caption: "Unforgettable crystal clear monsoon expeditions",
        alt: "A blue pit viper coiled on a dark rock",
        imageUrl: placeholder("the-brightest-blue"),
      },
      {
        id: "summer-scene",
        title: "Summer Scene",
        caption: "Vast empty green lands",
        alt: "Wide view of empty green grasslands in summer",
        wide: true,
        imageUrl: placeholder("summer-scene"),
      },
    ],
  },
  {
    id: "autumn",
    slug: "the-autumn-exhibit",
    title: "The Autumn Exhibit",
    season: "autumn",
    description: "Orange foliage, backwaters and rolling hills from the Western Ghats to Gir.",
    photos: [
      {
        id: "infinite-orange",
        title: "Infinite Orange",
        caption: "Leaves turned orange for the season",
        alt: "Forest canopy with leaves turned orange in autumn",
        imageUrl: placeholder("infinite-orange"),
      },
      {
        id: "western-ghats",
        title: "Western Ghats",
        caption: "Autumn foliage across the backwater",
        alt: "Autumn foliage reflected across a backwater in the Western Ghats",
        location: "Western Ghats",
        imageUrl: placeholder("western-ghats"),
      },
      {
        id: "picturesque-gir",
        title: "Picturesque Gir",
        caption: "Rolling hills in vibrant color",
        alt: "Rolling hills in vibrant autumn colour at Gir",
        location: "Gir, Gujarat",
        imageUrl: placeholder("picturesque-gir"),
      },
    ],
  },
]

type RawExhibit = Omit<Exhibit, "id" | "photos"> & {
  _id: string
  photos?: (Omit<ExhibitPhoto, "id" | "imageUrl"> & { _key: string; imageUrl?: string })[]
}

export async function getExhibits(): Promise<Exhibit[]> {
  try {
    const rows = await client.fetch<RawExhibit[]>(EXHIBITS_QUERY)
    if (rows?.length) {
      return rows.map(({ _id, photos = [], ...exhibit }) => ({
        ...exhibit,
        id: _id,
        photos: photos
          .filter((p) => p.title)
          .map(({ _key, imageUrl, ...photo }) => ({
            ...photo,
            id: _key,
            alt: photo.alt || photo.title,
            // Slots without an upload yet keep a placeholder so the layout stays intact.
            imageUrl: imageUrl || placeholder(_key),
            placeholder: !imageUrl,
          })),
      }))
    }
  } catch (err) {
    console.error("Failed to fetch exhibits from Sanity:", err)
  }
  return EXHIBIT_TEMPLATES.map((exhibit) => ({
    ...exhibit,
    photos: exhibit.photos.map((photo) => ({ ...photo, placeholder: true })),
  }))
}
