import * as dotenv from "dotenv"
dotenv.config()

import fs from "fs"
import path from "path"
import { createClient } from "next-sanity"
import { SANITY_POSTS } from "./initial-posts"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "gnfni9vb"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-03-01"
const token = process.env.SANITY_API_WRITE_TOKEN || "sk7PE7UoF4wxr0LgB5tAniJvXmOHlTyDyILGigFf3IVW2pe6L4gQEXr3MKf8xX5UTL5zGW5FBrosVn3zoBCG5z3qbPAm5pDSl0zxNyo5ehi2KrOHhO6G5u2Eo1aeEkhyPYoH3eLv60uLNLTjJwTLtMG9Ysg9udwhDBt9Y4Jl9zOLzZT35ObZ"

if (!token) {
  console.error("❌ SANITY_API_WRITE_TOKEN is missing in environment!")
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
})

const IMAGES_DIR = path.resolve(process.cwd(), "public/images")

async function getExistingAssets(): Promise<Map<string, string>> {
  console.log("🔍 Checking existing image assets in Sanity Content Lake...")
  const query = `*[_type == "sanity.imageAsset"]{ _id, originalFilename }`
  const assets: Array<{ _id: string; originalFilename?: string }> = await client.fetch(query)
  const map = new Map<string, string>()
  for (const asset of assets) {
    if (asset.originalFilename) {
      map.set(asset.originalFilename, asset._id)
    }
  }
  console.log(`Found ${map.size} existing image assets in Sanity.`)
  return map
}

async function uploadLocalImages(existingMap: Map<string, string>): Promise<Map<string, string>> {
  const assetMap = new Map<string, string>(existingMap)
  if (!fs.existsSync(IMAGES_DIR)) {
    console.warn(`Images directory ${IMAGES_DIR} does not exist!`)
    return assetMap
  }

  const files = fs.readdirSync(IMAGES_DIR)
  console.log(`\n📸 Processing ${files.length} files from ${IMAGES_DIR}...`)

  for (const file of files) {
    const ext = path.extname(file).toLowerCase()
    if (![".jpg", ".jpeg", ".png", ".webp", ".svg"].includes(ext)) {
      continue
    }

    if (assetMap.has(file)) {
      console.log(`  ✓ Image already in Sanity: ${file} -> ${assetMap.get(file)}`)
      continue
    }

    const filePath = path.join(IMAGES_DIR, file)
    console.log(`  ⬆️ Uploading ${file} to Sanity...`)
    try {
      const stream = fs.createReadStream(filePath)
      const uploaded = await client.assets.upload("image", stream, {
        filename: file,
      })
      assetMap.set(file, uploaded._id)
      console.log(`    ✅ Uploaded ${file} -> ${uploaded._id}`)
    } catch (err) {
      console.error(`    ❌ Failed to upload ${file}:`, err)
    }
  }

  return assetMap
}

async function migrateCategories() {
  console.log("\n📁 Upserting Categories...")
  const categories = [
    {
      _id: "category-tiger-reserve",
      _type: "category",
      title: "Tiger Reserve",
      slug: { _type: "slug", current: "tiger-reserve" },
      description: "Dense deciduous and teak forests of Central India harboring the royal Bengal tiger.",
    },
    {
      _id: "category-eastern-himalayas",
      _type: "category",
      title: "Eastern Himalayas",
      slug: { _type: "slug", current: "eastern-himalayas" },
      description: "Subalpine forests, rhododendron ridges, and mist-wrapped heights of Singalila and beyond.",
    },
    {
      _id: "category-high-altitude-desert",
      _type: "category",
      title: "High-Altitude Desert",
      slug: { _type: "slug", current: "high-altitude-desert" },
      description: "Barren passes, sacred high-altitude lakes, and rugged terrain of the trans-Himalayas.",
    },
    {
      _id: "category-heritage-plains",
      _type: "category",
      title: "Heritage Plains",
      slug: { _type: "slug", current: "heritage-plains" },
      description: "Boulder-strewn landscapes, ancient monolithic monuments, and scrub wilderness.",
    },
    {
      _id: "category-western-ghats-rainforest",
      _type: "category",
      title: "Western Ghats Rainforest",
      slug: { _type: "slug", current: "western-ghats-rainforest" },
      description: "Verdant evergreen rainforests, heavy monsoons, and rich biodiversity.",
    },
    {
      _id: "category-nilgiri-biosphere",
      _type: "category",
      title: "Nilgiri Biosphere",
      slug: { _type: "slug", current: "nilgiri-biosphere" },
      description: "Montane evergreen shola-grassland mosaic and tea slopes in Southern India.",
    },
    {
      _id: "category-wetlands-marshes",
      _type: "category",
      title: "Wetlands & Marshes",
      slug: { _type: "slug", current: "wetlands-marshes" },
      description: "Expansive freshwater lakes, river systems, and migratory bird hotspots.",
    },
    {
      _id: "category-mountain-expedition",
      _type: "category",
      title: "Mountain Expedition",
      slug: { _type: "slug", current: "mountain-expedition" },
      description: "High mountain treks, rugged wilderness, and scenic alpine plateaus.",
    },
  ]

  for (const cat of categories) {
    await client.createOrReplace(cat)
    console.log(`  ✓ Category upserted: ${cat.title} (${cat._id})`)
  }
}

async function migrateDestinations(assetMap: Map<string, string>) {
  console.log("\n📍 Upserting Safari Destinations...")
  const destinations = [
    {
      _id: "destination-kotageri",
      _type: "destination",
      name: "Kotagiri",
      slug: { _type: "slug", current: "kotageri" },
      locationLabel: "Nilgiris, Tamil Nadu",
      rating: 4.9,
      maxGuests: 4,
      bedsDescription: "1 Queen or 2 Single Beds",
      bedCount: 3,
      pricePerNight: 2000,
      displayOrder: 1,
      featured: true,
      category: { _type: "reference", _ref: "category-nilgiri-biosphere" },
      description: "Perched among rolling tea plantations and mist-shrouded shola forests, Kotagiri offers peaceful highland walking, rich endemic birdlife, and breathtaking Nilgiri views.",
      imageFilename: "kotageri.jpg",
      alt: "Kotagiri tea estates and cloud forest",
    },
    {
      _id: "destination-singalila",
      _type: "destination",
      name: "Singalila",
      slug: { _type: "slug", current: "singalila" },
      locationLabel: "Eastern Himalayas, West Bengal",
      rating: 4.8,
      maxGuests: 6,
      bedsDescription: "1 Queen or 2 Single Beds",
      bedCount: 3,
      pricePerNight: 2500,
      displayOrder: 2,
      featured: true,
      category: { _type: "reference", _ref: "category-eastern-himalayas" },
      description: "High-altitude wilderness flanking the Indo-Nepal border, famed for red panda tracking, vibrant rhododendron blooms, and panoramic views of Mt. Kanchenjunga.",
      imageFilename: "singalila.jpg",
      alt: "Singalila ridge overlooking Kanchenjunga",
    },
    {
      _id: "destination-ladakh",
      _type: "destination",
      name: "Ladakh",
      slug: { _type: "slug", current: "ladakh" },
      locationLabel: "High Desert, Ladakh",
      rating: 4.9,
      maxGuests: 4,
      bedsDescription: "1 Queen or 1 King Bed",
      bedCount: 2,
      pricePerNight: 3000,
      displayOrder: 3,
      featured: true,
      category: { _type: "reference", _ref: "category-high-altitude-desert" },
      description: "A dramatic lunar landscape of high mountain passes, frozen river trails, ancient monasteries, and winter snow leopard tracking expeditions.",
      imageFilename: "ladakh.jpg",
      alt: "High mountain pass in Ladakh desert",
    },
    {
      _id: "destination-hampi",
      _type: "destination",
      name: "Hampi",
      slug: { _type: "slug", current: "hampi" },
      locationLabel: "Heritage Plains, Karnataka",
      rating: 5.0,
      maxGuests: 12,
      bedsDescription: "1 King Bed or 2 Single Beds",
      bedCount: 3,
      pricePerNight: 3500,
      displayOrder: 4,
      featured: true,
      category: { _type: "reference", _ref: "category-heritage-plains" },
      description: "Surreal boulder hills overlooking ancient Vijayanagara ruins and the Tungabhadra River, home to sloth bear sanctuaries, leopards, and over 200 bird species.",
      imageFilename: "hampi.jpg",
      alt: "Ancient boulder ruins of Hampi",
    },
    {
      _id: "destination-agumbe",
      _type: "destination",
      name: "Agumbe",
      slug: { _type: "slug", current: "agumbe" },
      locationLabel: "Rainforest, Western Ghats",
      rating: 4.8,
      maxGuests: 4,
      bedsDescription: "2 Queen Beds",
      bedCount: 2,
      pricePerNight: 4500,
      displayOrder: 5,
      featured: true,
      category: { _type: "reference", _ref: "category-western-ghats-rainforest" },
      description: "Known as the Cherrapunji of the South, Agumbe is a pristine rainforest canopy sanctuary known for king cobra research, bioluminescent fungi, and torrential monsoon trails.",
      imageFilename: "agumbe.jpg",
      alt: "Dense misty canopy of Agumbe rainforest",
    },
    {
      _id: "destination-pench",
      _type: "destination",
      name: "Pench",
      slug: { _type: "slug", current: "pench" },
      locationLabel: "Tiger Reserve, Madhya Pradesh",
      rating: 4.9,
      maxGuests: 5,
      bedsDescription: "2 King Beds",
      bedCount: 2,
      pricePerNight: 5000,
      displayOrder: 6,
      featured: true,
      category: { _type: "reference", _ref: "category-tiger-reserve" },
      description: "The classic Kipling country of teak forests, open meadows, and the meandering Pench River, renowned for frequent tiger and leopard sightings.",
      imageFilename: "pench.jpg",
      alt: "Pench river and teak forest reserve",
    },
  ]

  for (const dest of destinations) {
    const assetId = assetMap.get(dest.imageFilename)
    if (!assetId) {
      console.warn(`  ⚠️ Missing asset for destination image ${dest.imageFilename}`)
      continue
    }

    const doc: any = {
      _id: dest._id,
      _type: "destination",
      name: dest.name,
      slug: dest.slug,
      locationLabel: dest.locationLabel,
      rating: dest.rating,
      maxGuests: dest.maxGuests,
      bedsDescription: dest.bedsDescription,
      bedCount: dest.bedCount,
      pricePerNight: dest.pricePerNight,
      displayOrder: dest.displayOrder,
      featured: dest.featured,
      category: dest.category,
      description: dest.description,
      coverImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetId },
        alt: dest.alt,
      },
    }

    await client.createOrReplace(doc)
    console.log(`  ✓ Destination upserted: ${dest.name} (${dest._id})`)
  }
}

async function migrateDiscoveries(assetMap: Map<string, string>) {
  console.log("\n🧭 Upserting Discoveries...")
  const discoveries = [
    {
      _id: "discovery-winter",
      _type: "discovery",
      title: "Winter Exhibit",
      slug: { _type: "slug", current: "winter-exhibit" },
      imageFilename: "winter.jpg",
      alt: "Snow-covered wilderness landscape",
      description: "Crisp mountain air, high altitude passes, and snow leopard winter tracking expeditions.",
      displayOrder: 1,
      featured: true,
    },
    {
      _id: "discovery-autumn",
      _type: "discovery",
      title: "Autumn Wilderness",
      slug: { _type: "slug", current: "autumn-wilderness" },
      imageFilename: "autumn.jpg",
      alt: "Golden autumn foliage in the wild",
      description: "Golden grasslands, rutting stags, and migratory bird arrivals across central reserves.",
      displayOrder: 2,
      featured: true,
    },
    {
      _id: "discovery-mountain",
      _type: "discovery",
      title: "Mountain Expedition",
      slug: { _type: "slug", current: "mountain-expedition" },
      imageFilename: "mountain.jpg",
      alt: "Rugged alpine mountain peaks",
      description: "High-altitude ridges, trans-Himalayan passes, and rugged wilderness trails.",
      displayOrder: 3,
      featured: true,
    },
    {
      _id: "discovery-wildlife",
      _type: "discovery",
      title: "Wildlife Safari",
      slug: { _type: "slug", current: "wildlife-safari" },
      imageFilename: "wildlife.jpg",
      alt: "Wild elephant herd in nature",
      description: "Intimate encounters with big cats, one-horned rhinos, and wild elephant herds.",
      displayOrder: 4,
      featured: true,
    },
    {
      _id: "discovery-lakes",
      _type: "discovery",
      title: "Lakes & Waterfalls",
      slug: { _type: "slug", current: "lakes-waterfalls" },
      imageFilename: "lakes.jpg",
      alt: "Pristine emerald forest lake",
      description: "Pristine freshwater cascades, tranquil lakes, and river valley trails.",
      displayOrder: 5,
      featured: true,
    },
  ]

  for (const disc of discoveries) {
    const assetId = assetMap.get(disc.imageFilename)
    if (!assetId) {
      console.warn(`  ⚠️ Missing asset for discovery image ${disc.imageFilename}`)
      continue
    }

    const doc = {
      _id: disc._id,
      _type: "discovery",
      title: disc.title,
      slug: disc.slug,
      description: disc.description,
      displayOrder: disc.displayOrder,
      featured: disc.featured,
      image: {
        _type: "image",
        asset: { _type: "reference", _ref: assetId },
        alt: disc.alt,
      },
    }

    await client.createOrReplace(doc)
    console.log(`  ✓ Discovery upserted: ${disc.title} (${disc._id})`)
  }
}

async function migrateSiteSettings(assetMap: Map<string, string>) {
  console.log("\n⚙️ Upserting Site Settings...")

  const heroAssetId = assetMap.get("hero.jpg")
  const footerAssetId = assetMap.get("footer.jpg")
  const tigerAssetId = assetMap.get("tiger.jpg")
  const rhinoAssetId = assetMap.get("rhino.jpg")
  const logoAssetId = assetMap.get("logo.png")

  const siteSettingsDoc: any = {
    _id: "siteSettings",
    _type: "siteSettings",
    siteTitle: "The Nature Club",
    tagline: "Curated wildlife safaris, wilderness expeditions & mindful travel.",
    heroHeadline: "Pack Your Bags. Chase the World.",
    aboutHeadline: "THE NATURE CLUB",
    aboutParagraph:
      "At The Nature Club, we create thoughtfully planned journeys that help you discover beautiful destinations, meaningful experiences, and unforgettable memories.",
    socialLinks: [
      { _key: "ig", platform: "Instagram", url: "https://instagram.com/thenatureclub" },
      { _key: "fb", platform: "Facebook", url: "https://facebook.com/thenatureclub" },
      { _key: "x", platform: "X", url: "https://x.com/thenatureclub" },
    ],
  }

  if (heroAssetId) {
    siteSettingsDoc.heroImage = {
      _type: "image",
      asset: { _type: "reference", _ref: heroAssetId },
      alt: "Scenic mountain wilderness",
    }
  }

  if (footerAssetId) {
    siteSettingsDoc.footerImage = {
      _type: "image",
      asset: { _type: "reference", _ref: footerAssetId },
      alt: "Misty nature scenery",
    }
  }

  if (tigerAssetId) {
    siteSettingsDoc.aboutImageTopRight = {
      _type: "image",
      asset: { _type: "reference", _ref: tigerAssetId },
      alt: "Wild Bengal Tiger in safari reserve",
    }
  }

  if (rhinoAssetId) {
    siteSettingsDoc.aboutImageBottomLeft = {
      _type: "image",
      asset: { _type: "reference", _ref: rhinoAssetId },
      alt: "Greater One-Horned Rhinoceros in grassland",
    }
  }

  if (logoAssetId) {
    siteSettingsDoc.logo = {
      _type: "image",
      asset: { _type: "reference", _ref: logoAssetId },
      alt: "The Nature Club Logo",
    }
  }

  await client.createOrReplace(siteSettingsDoc)
  console.log("  ✓ Site Settings document upserted.")
}

async function migrateBlogPosts(assetMap: Map<string, string>) {
  console.log(`\n📝 Upserting ${SANITY_POSTS.length} Blog Posts...`)

  // Category mapping helper
  const getCategoryRef = (tags: string[] = []): string => {
    const t = tags.join(" ").toLowerCase()
    if (t.includes("tiger") || t.includes("pench")) return "category-tiger-reserve"
    if (t.includes("singalila") || t.includes("panda") || t.includes("himalaya")) return "category-eastern-himalayas"
    if (t.includes("ladakh") || t.includes("desert") || t.includes("snow leopard")) return "category-high-altitude-desert"
    if (t.includes("hampi") || t.includes("heritage")) return "category-heritage-plains"
    if (t.includes("agumbe") || t.includes("rainforest") || t.includes("ghats")) return "category-western-ghats-rainforest"
    if (t.includes("nilgiri") || t.includes("kotagiri")) return "category-nilgiri-biosphere"
    if (t.includes("wetlands") || t.includes("lakes") || t.includes("bird")) return "category-wetlands-marshes"
    return "category-tiger-reserve"
  }

  // Destination mapping helper
  const getDestinationRef = (slug: string): string | undefined => {
    if (slug.includes("pench")) return "destination-pench"
    if (slug.includes("singalila")) return "destination-singalila"
    if (slug.includes("ladakh")) return "destination-ladakh"
    if (slug.includes("hampi")) return "destination-hampi"
    if (slug.includes("agumbe")) return "destination-agumbe"
    if (slug.includes("kotagiri") || slug.includes("kotageri")) return "destination-kotageri"
    return undefined
  }

  for (const post of SANITY_POSTS) {
    const slugStr = post.slug.current
    const filename = path.basename(post.mainImage.asset.url)
    const assetId = assetMap.get(filename)

    if (!assetId) {
      console.warn(`  ⚠️ Missing image asset for post ${post.title} (${filename})`)
    }

    const docId = `post-${slugStr}`
    const categoryRef = getCategoryRef(post.tags)
    const destinationRef = getDestinationRef(slugStr)

    const doc: any = {
      _id: docId,
      _type: "post",
      title: post.title,
      slug: { _type: "slug", current: slugStr },
      publishedAt: post.publishedAt.includes("T") ? post.publishedAt : `${post.publishedAt}T06:00:00Z`,
      readTime: post.readTime,
      excerpt: post.excerpt,
      tags: post.tags,
      category: { _type: "reference", _ref: categoryRef },
      body: post.body,
    }

    if (destinationRef) {
      doc.destination = { _type: "reference", _ref: destinationRef }
    }

    if (assetId) {
      doc.mainImage = {
        _type: "image",
        asset: { _type: "reference", _ref: assetId },
        alt: post.mainImage.alt,
        caption: post.mainImage.caption,
      }
    }

    await client.createOrReplace(doc)
    console.log(`  ✓ Blog post upserted: "${post.title}" (${docId})`)
  }
}

async function main() {
  console.log("==========================================")
  console.log("🌿 THE NATURE CLUB - SANITY CMS MIGRATION")
  console.log("==========================================")

  // 1. Upload local images to Sanity
  const existingAssets = await getExistingAssets()
  const assetMap = await uploadLocalImages(existingAssets)

  // 2. Migrate Categories
  await migrateCategories()

  // 3. Migrate Destinations
  await migrateDestinations(assetMap)

  // 4. Migrate Discoveries
  await migrateDiscoveries(assetMap)

  // 5. Migrate Site Settings
  await migrateSiteSettings(assetMap)

  // 6. Migrate Blog Posts
  await migrateBlogPosts(assetMap)

  console.log("\n🎉 MIGRATION COMPLETED SUCCESSFULLY!")
  console.log("All media, destinations, discoveries, blog posts, and site settings are now live in Sanity!")
}

main().catch((err) => {
  console.error("❌ Migration failed with error:", err)
  process.exit(1)
})
