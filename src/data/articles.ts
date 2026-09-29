import type { PortableTextBlock } from "@/components/portable-text"

/**
 * Standard Sanity CMS Article Document Schema (`post` or `article`)
 * Formatted to match Sanity schemas and GROQ queries so it will drop directly
 * into Sanity Content Lake without schema refactoring.
 */
export type SanityPost = {
  _id: string
  _type: "post"
  title: string
  slug: {
    current: string
  }
  publishedAt: string
  estimatedReadingTime: number
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

// Backward-compatible interface for list view cards
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

export const SANITY_POSTS: SanityPost[] = [
  {
    _id: "1",
    _type: "post",
    title: "Tracking the Royal Bengal Tiger: Dawn Patrol Through Pench Tiger Reserve",
    slug: { current: "tracking-royal-bengal-tiger-pench" },
    publishedAt: "2025-09-18",
    estimatedReadingTime: 6,
    readTime: "6 min read",
    excerpt: "A silent morning drive through mist-shrouded teak forests reveals the raw pulse of India's big cat country.",
    tags: ["Pench Reserve", "Bengal Tiger", "Field Tracking", "Wildlife Safari"],
    mainImage: {
      asset: { url: "/images/tiger.jpg" },
      alt: "Royal Bengal Tiger resting in the forest",
      caption: "Turia Gate zone, Pench Tiger Reserve at dawn",
    },
    body: [
      {
        _key: "lead",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "lead-span",
            _type: "span",
            text: "At 5:30 AM in the heart of Pench, the world belongs to the cold mist and the sentinels of the canopy. The engine of our open 4x4 falls silent as a sudden, sharp alarm bark cuts through the silence.",
          },
        ],
      },
      {
        _key: "h2-1",
        _type: "block",
        style: "h2",
        children: [{ _key: "h2-1-span", _type: "span", text: "The Language of the Canopy" }],
      },
      {
        _key: "p-1",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "p-1-span",
            _type: "span",
            text: "Before you ever catch sight of an apex predator in the dense sal and teak forests of Central India, the forest will have announced its presence dozens of times over. A spotted deer doe stamps her hoof, head turned rigid toward a dry riverbed. Seconds later, a langur monkey seventy feet up a mahua tree screams a staccato chattering.",
          },
        ],
      },
      {
        _key: "p-2",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "p-2-span",
            _type: "span",
            text: "Every animal in this ecosystem understands the hierarchy. The langur has the vantage point; the chital has the ground hearing. Together, they form an early-warning network that no tiger can easily slip past.",
          },
        ],
      },
      {
        _key: "q-1",
        _type: "block",
        style: "blockquote",
        children: [
          {
            _key: "q-1-span",
            _type: "span",
            text: "You don't search for a tiger with your eyes alone. You listen to the forest holding its breath, and let the jungle tell you where the king walks.",
          },
        ],
      },
      {
        _key: "h2-2",
        _type: "block",
        style: "h2",
        children: [{ _key: "h2-2-span", _type: "span", text: "Pugmarks in the Red Dust" }],
      },
      {
        _key: "p-3",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "p-3-span",
            _type: "span",
            text: "Our tracker leaps down to inspect fresh impressions pressed into the fine soil of the fireline. The pugmark is broad, with distinct lobes on the main pad—a mature male, not more than twenty minutes ahead of us, moving straight toward the Junewani waterhole.",
          },
        ],
      },
      {
        _key: "li-1",
        _type: "block",
        listItem: "bullet",
        level: 1,
        children: [{ _key: "li-1-s", _type: "span", text: "Check wind direction to ensure scent does not precede the vehicle." }],
      },
      {
        _key: "li-2",
        _type: "block",
        listItem: "bullet",
        level: 1,
        children: [{ _key: "li-2-s", _type: "span", text: "Monitor langur alarm calls to map predator velocity and trajectory." }],
      },
      {
        _key: "li-3",
        _type: "block",
        listItem: "bullet",
        level: 1,
        children: [{ _key: "li-3-s", _type: "span", text: "Maintain strict engine silence near natural water bodies and culverts." }],
      },
      {
        _key: "li-4",
        _type: "block",
        listItem: "bullet",
        level: 1,
        children: [{ _key: "li-4-s", _type: "span", text: "Position the vehicle for natural light without cutting off wildlife corridors." }],
      },
      {
        _key: "h2-3",
        _type: "block",
        style: "h2",
        children: [{ _key: "h2-3-span", _type: "span", text: "The Golden Glimpse" }],
      },
      {
        _key: "p-4",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "p-4-span",
            _type: "span",
            text: "As we round the bend beneath an ancient banyan tree, the amber light strikes the grass—and there he lies. Massive, muscular, and completely unbothered by our presence. His eyes sweep past our vehicle as if acknowledging part of the scenery, before settling back on the tree line.",
          },
        ],
      },
      {
        _key: "p-5",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "p-5-span",
            _type: "span",
            text: "Minutes tick by in utter stillness. Nobody moves; nobody speaks. To share space with a wild Bengal tiger in his ancestral home is to understand what true wildness feels like.",
          },
        ],
      },
    ],
  },
  {
    _id: "2",
    _type: "post",
    title: "Into the Tall Grass: Encounters with the Greater One-Horned Rhinoceros",
    slug: { current: "tall-grass-one-horned-rhinoceros" },
    publishedAt: "2025-08-24",
    estimatedReadingTime: 5,
    readTime: "5 min read",
    excerpt: "Navigating the floodplain marshes and elephant-grass corridors of the Brahmaputra valley.",
    tags: ["Assam", "One-Horned Rhino", "Wetlands", "Conservation"],
    mainImage: {
      asset: { url: "/images/rhino.jpg" },
      alt: "Greater One-Horned Rhinoceros grazing in wetlands",
    },
    body: [
      {
        _key: "lead",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "lead-span",
            _type: "span",
            text: "Rising out of the swirling morning fog of the Brahmaputra river basin, a prehistoric silhouette takes shape. Armored, ancient, and quietly grazing on wet reeds.",
          },
        ],
      },
      {
        _key: "h2-1",
        _type: "block",
        style: "h2",
        children: [{ _key: "h2-1-span", _type: "span", text: "A Living Relic of the Pleistocene" }],
      },
      {
        _key: "p-1",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "p-1-span",
            _type: "span",
            text: "The Greater One-Horned Rhino resembles an animal carved from living stone. Its thick, folded hide looks like armor plating studded with rivets, yet beneath that heavy exterior is an animal capable of sprinting through dense thickets at nearly forty kilometers per hour.",
          },
        ],
      },
      {
        _key: "q-1",
        _type: "block",
        style: "blockquote",
        children: [
          {
            _key: "q-1-span",
            _type: "span",
            text: "Seeing a rhino grazing undisturbed in the morning mist is living proof that concerted conservation and community dedication can pull a species back from the brink.",
          },
        ],
      },
      {
        _key: "h2-2",
        _type: "block",
        style: "h2",
        children: [{ _key: "h2-2-span", _type: "span", text: "Coexistence in the Floodplains" }],
      },
      {
        _key: "p-2",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "p-2-span",
            _type: "span",
            text: "Watching a mother rhino escort her calf across a shallow lagoon while wild water buffalo graze on the far bank is a reminder of the delicate balance sustaining one of Earth's richest wetland ecosystems.",
          },
        ],
      },
    ],
  },
  {
    _id: "3",
    _type: "post",
    title: "The Art of the Safari Drive: Reading Alarm Calls and Animal Tracks",
    slug: { current: "art-of-safari-drive-tracking" },
    publishedAt: "2025-07-15",
    estimatedReadingTime: 7,
    readTime: "7 min read",
    excerpt: "How master trackers interpret subtle signs, broken twigs, and bird calls to decode wilderness movements.",
    tags: ["Safari Skills", "Tracking", "Bushcraft", "Wildlife Behavior"],
    mainImage: {
      asset: { url: "/images/wildlife.jpg" },
      alt: "Wildlife safari landscape and animal movements",
    },
    body: [
      {
        _key: "lead",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "lead-span",
            _type: "span",
            text: "A safari is not a sightseeing tour; it is an open-air detective story written in sand, scents, and sound. Here is how expert trackers turn invisible trails into unforgettable sightings.",
          },
        ],
      },
      {
        _key: "h2-1",
        _type: "block",
        style: "h2",
        children: [{ _key: "h2-1-span", _type: "span", text: "The Warning Chorus" }],
      },
      {
        _key: "li-1",
        _type: "block",
        listItem: "bullet",
        level: 1,
        children: [{ _key: "li-1-s", _type: "span", text: "Spotted Deer (Chital): Sharp, repetitive 'peow' whistle signals predator on the move." }],
      },
      {
        _key: "li-2",
        _type: "block",
        listItem: "bullet",
        level: 1,
        children: [{ _key: "li-2-s", _type: "span", text: "Sambar Deer: Resonant, hollow bell-bark indicates close proximity to tiger or leopard." }],
      },
      {
        _key: "li-3",
        _type: "block",
        listItem: "bullet",
        level: 1,
        children: [{ _key: "li-3-s", _type: "span", text: "Grey Langur: Loud coughing bark with frantic shaking of uppermost branches." }],
      },
      {
        _key: "li-4",
        _type: "block",
        listItem: "bullet",
        level: 1,
        children: [{ _key: "li-4-s", _type: "span", text: "Peafowl: Piercing 'ka-aan' alarm issued when feline moves across open clearings." }],
      },
      {
        _key: "h2-2",
        _type: "block",
        style: "h2",
        children: [{ _key: "h2-2-span", _type: "span", text: "Patience Over Speed" }],
      },
      {
        _key: "p-1",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "p-1-span",
            _type: "span",
            text: "The most common mistake made in the field is chasing every distant vehicle. Real magic happens when you choose an active intersection, cut the ignition, and let the wild come to you.",
          },
        ],
      },
    ],
  },
  {
    _id: "4",
    _type: "post",
    title: "Mowgli's Land Revisited: Exploring the Deep Sal Forests of Madhya Pradesh",
    slug: { current: "mowglis-land-sal-forests" },
    publishedAt: "2025-06-29",
    estimatedReadingTime: 6,
    readTime: "6 min read",
    excerpt: "Retracing the classic habitats of Kipling's tales through the heart of Indian wilderness reserves.",
    tags: ["Pench", "Sal Forests", "Kipling Trail", "Madhya Pradesh"],
    mainImage: {
      asset: { url: "/images/pench.jpg" },
      alt: "Dense sal forest canopy in Pench",
    },
    body: [
      {
        _key: "lead",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "lead-span",
            _type: "span",
            text: "The sal tree is the true pillar of the central Indian wilderness. Standing up to thirty meters tall, these forests create cathedrals of dappled light that filter down to emerald undergrowth.",
          },
        ],
      },
      {
        _key: "h2-1",
        _type: "block",
        style: "h2",
        children: [{ _key: "h2-1-span", _type: "span", text: "The River that Breathes Life" }],
      },
      {
        _key: "p-1",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "p-1-span",
            _type: "span",
            text: "Meandering through the heart of the park, the river provides lifelines during scorching summer months. Sandbars host basks of marsh crocodiles, while herds of gaur emerge at sunset to drink alongside wild boar.",
          },
        ],
      },
    ],
  },
  {
    _id: "5",
    _type: "post",
    title: "The Grey Ghost Expedition: Tracking Elusive Snow Leopards in High Ladakh",
    slug: { current: "snow-leopard-expedition-ladakh" },
    publishedAt: "2025-05-12",
    estimatedReadingTime: 8,
    readTime: "8 min read",
    excerpt: "Enduring sub-zero temperatures and high altitude in search of the legendary mountain monarch.",
    tags: ["Ladakh", "Snow Leopard", "Himalayas", "High Altitude"],
    mainImage: {
      asset: { url: "/images/ladakh.jpg" },
      alt: "High altitude mountain passes in Ladakh",
    },
    body: [
      {
        _key: "lead",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "lead-span",
            _type: "span",
            text: "At 4,200 meters above sea level in the Rumbak Valley, every breath is a conscious effort. The wind howls across jagged ridgelines of shale and ice, where the world's most elusive feline rules in solitary silence.",
          },
        ],
      },
      {
        _key: "h2-1",
        _type: "block",
        style: "h2",
        children: [{ _key: "h2-1-span", _type: "span", text: "The Kingdom of Rock and Ice" }],
      },
      {
        _key: "p-1",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "p-1-span",
            _type: "span",
            text: "The snow leopard is nature's greatest master of camouflage. Its thick smoky-grey coat, dappled with dark rosettes, matches the jagged granite scree so flawlessly that an animal sitting thirty yards away can remain completely invisible until it blinks.",
          },
        ],
      },
      {
        _key: "q-1",
        _type: "block",
        style: "blockquote",
        children: [
          {
            _key: "q-1-span",
            _type: "span",
            text: "You don't spot a snow leopard. The mountain decides whether to reveal its ghost to you.",
          },
        ],
      },
    ],
  },
  {
    _id: "6",
    _type: "post",
    title: "Ridgetop Safaris: Spotting the Red Panda Across the Eastern Himalayas",
    slug: { current: "red-panda-safari-singalila" },
    publishedAt: "2025-04-03",
    estimatedReadingTime: 5,
    readTime: "5 min read",
    excerpt: "Trekking through moss-draped bamboo forests in Singalila along the borderlands of India and Nepal.",
    tags: ["Singalila", "Red Panda", "Bamboo Forests", "Himalayas"],
    mainImage: {
      asset: { url: "/images/singalila.jpg" },
      alt: "Singalila national park misty mountains",
    },
    body: [
      {
        _key: "lead",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "lead-span",
            _type: "span",
            text: "Perched on a narrow ridge looking out toward Kangchenjunga, Singalila National Park is a cloud-drenched sanctuary where the arboreal red panda makes its home.",
          },
        ],
      },
      {
        _key: "h2-1",
        _type: "block",
        style: "h2",
        children: [{ _key: "h2-1-span", _type: "span", text: "Life in the High Canopy" }],
      },
      {
        _key: "p-1",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "p-1-span",
            _type: "span",
            text: "Unlike giant pandas, the red panda is petite, agile, and spends ninety percent of its time high in the canopy. It feasts on tender bamboo shoots, wrapping its bushy ringed tail around itself like a scarf against freezing gusts.",
          },
        ],
      },
    ],
  },
  {
    _id: "7",
    _type: "post",
    title: "Rainforest Night Walks: King Cobras, Bioluminescent Fungi, and Canopy Life",
    slug: { current: "rainforest-night-walks-agumbe" },
    publishedAt: "2025-03-19",
    estimatedReadingTime: 6,
    readTime: "6 min read",
    excerpt: "When dusk falls over Agumbe, an entirely different world awakens in the drenched evergreen foliage.",
    tags: ["Agumbe", "Rainforest", "Nocturnal Safari", "Herpetology"],
    mainImage: {
      asset: { url: "/images/agumbe.jpg" },
      alt: "Lush tropical rainforest canopy",
    },
    body: [
      {
        _key: "lead",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "lead-span",
            _type: "span",
            text: "With headlamps dimmed to a warm amber glow, we step off the veranda and into the dense curtain of the Western Ghats rainforest. The air is thick with petrichor and the chorus of nocturnal life.",
          },
        ],
      },
      {
        _key: "h2-1",
        _type: "block",
        style: "h2",
        children: [{ _key: "h2-1-span", _type: "span", text: "The World After Dark" }],
      },
      {
        _key: "p-1",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "p-1-span",
            _type: "span",
            text: "Daytime safaris belong to megafauna; nighttime walks belong to the micro-miracles. Turn off your light for two minutes, and the forest floor begins to glow with emerald luminescence from fungal mycelium clinging to decaying timber.",
          },
        ],
      },
    ],
  },
  {
    _id: "8",
    _type: "post",
    title: "High in the Blue Mountains: Nilgiri Tahr and Endemic Birds of Kotagiri",
    slug: { current: "blue-mountains-nilgiri-kotagiri" },
    publishedAt: "2025-02-08",
    estimatedReadingTime: 5,
    readTime: "5 min read",
    excerpt: "Ascending the shola grasslands where endemic species thrive on misty mountain plateaus.",
    tags: ["Kotagiri", "Nilgiris", "Shola Grasslands", "Birding"],
    mainImage: {
      asset: { url: "/images/kotageri.jpg" },
      alt: "Kotagiri mountain mist and grasslands",
    },
    body: [
      {
        _key: "lead",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "lead-span",
            _type: "span",
            text: "Rolling hills cloaked in tea plantations give way to the ancient montane shola-grassland mosaic of the Nilgiri biosphere, home to creatures found nowhere else on planet Earth.",
          },
        ],
      },
      {
        _key: "h2-1",
        _type: "block",
        style: "h2",
        children: [{ _key: "h2-1-span", _type: "span", text: "Cliffside Acrobats" }],
      },
      {
        _key: "p-1",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "p-1-span",
            _type: "span",
            text: "The Nilgiri Tahr is a mountain ungulate built for sheer precipices. Watching a herd effortlessly navigate near-vertical rocky bluffs against a backdrop of swirling cloud is an unforgettable sight.",
          },
        ],
      },
    ],
  },
  {
    _id: "9",
    _type: "post",
    title: "Boulders and Sloth Bears: Wildlife Safaris Across the Ancient Hampi Plains",
    slug: { current: "boulders-and-sloth-bears-hampi" },
    publishedAt: "2025-01-20",
    estimatedReadingTime: 5,
    readTime: "5 min read",
    excerpt: "Beyond the ruins of empires lies Daroji, Asia's premier sanctuary for the enigmatic sloth bear.",
    tags: ["Hampi", "Sloth Bear", "Daroji", "Karnataka"],
    mainImage: {
      asset: { url: "/images/hampi.jpg" },
      alt: "Ancient boulder landscape of Hampi",
    },
    body: [
      {
        _key: "lead",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "lead-span",
            _type: "span",
            text: "Centuries-old granite monoliths balancing on scrub plains create a rugged dreamscape where sloth bears emerge at twilight to feast on termites and wild berries.",
          },
        ],
      },
      {
        _key: "h2-1",
        _type: "block",
        style: "h2",
        children: [{ _key: "h2-1-span", _type: "span", text: "Masters of the Boulder Caves" }],
      },
      {
        _key: "p-1",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "p-1-span",
            _type: "span",
            text: "Equipped with long ivory claws and a specialized snout that operates like a vacuum cleaner, the sloth bear is one of the subcontinent's most fascinating forest residents.",
          },
        ],
      },
    ],
  },
  {
    _id: "10",
    _type: "post",
    title: "Riverbank Ambush: Wetland Birding and Marsh Crocodile Boat Safaris",
    slug: { current: "riverbank-wetlands-crocodiles" },
    publishedAt: "2024-12-14",
    estimatedReadingTime: 6,
    readTime: "6 min read",
    excerpt: "Drifting silently along quiet estuaries where migratory waterbirds congregate in thousands.",
    tags: ["Water Safari", "Wetlands", "Crocodiles", "Birding"],
    mainImage: {
      asset: { url: "/images/lakes.jpg" },
      alt: "Lakes and wetland wildlife habitat",
    },
    body: [
      {
        _key: "lead",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "lead-span",
            _type: "span",
            text: "The electric motor glides through still morning waters without a sound. Kingfishers dart like blue arrows above water lilies, while mugger crocodiles sunbathe motionless on muddy shoals.",
          },
        ],
      },
      {
        _key: "h2-1",
        _type: "block",
        style: "h2",
        children: [{ _key: "h2-1-span", _type: "span", text: "Silent Approaches by Boat" }],
      },
      {
        _key: "p-1",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "p-1-span",
            _type: "span",
            text: "Water safaris offer unique angles impossible from a jeep. Without engine vibration or tyre noise, waterfowl permit remarkably close vantage points for observation.",
          },
        ],
      },
    ],
  },
  {
    _id: "11",
    _type: "post",
    title: "Golden Hour in the Wild: Essential Field Guide for Safari Photography",
    slug: { current: "safari-photography-field-guide" },
    publishedAt: "2024-11-28",
    estimatedReadingTime: 7,
    readTime: "7 min read",
    excerpt: "Practical techniques for capturing fast wildlife action under challenging bush light conditions.",
    tags: ["Photography", "Field Guide", "Camera Gear", "Safari Tips"],
    mainImage: {
      asset: { url: "/images/autumn.jpg" },
      alt: "Autumn forest bathed in golden sunrise light",
    },
    body: [
      {
        _key: "lead",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "lead-span",
            _type: "span",
            text: "That glorious twenty-minute window when dawn touches the savannah can make or break your portfolio. Here is how to master camera settings when the animal of a lifetime steps into view.",
          },
        ],
      },
      {
        _key: "h2-1",
        _type: "block",
        style: "h2",
        children: [{ _key: "h2-1-span", _type: "span", text: "Mastering Speed and Stability" }],
      },
      {
        _key: "li-1",
        _type: "block",
        listItem: "bullet",
        level: 1,
        children: [{ _key: "li-1-s", _type: "span", text: "Keep minimum shutter speed at 1/1600s for moving animals and 1/3200s for birds in flight." }],
      },
      {
        _key: "li-2",
        _type: "block",
        listItem: "bullet",
        level: 1,
        children: [{ _key: "li-2-s", _type: "span", text: "Use beanbags on jeep roll bars rather than unwieldy tripods for fast stability." }],
      },
      {
        _key: "li-3",
        _type: "block",
        listItem: "bullet",
        level: 1,
        children: [{ _key: "li-3-s", _type: "span", text: "Shoot at eye level whenever topography allows for intimate, empathetic portraits." }],
      },
    ],
  },
  {
    _id: "12",
    _type: "post",
    title: "Winter Safari Chronicles: Crisp Morning Mist, Frost, and Forest Canopies",
    slug: { current: "winter-safari-chronicles" },
    publishedAt: "2024-10-30",
    estimatedReadingTime: 6,
    readTime: "6 min read",
    excerpt: "Why November through February offers the most atmospheric and dramatic safari conditions.",
    tags: ["Winter Safari", "Atmosphere", "Weather", "Season Guide"],
    mainImage: {
      asset: { url: "/images/winter.jpg" },
      alt: "Winter morning mist through forest trees",
    },
    body: [
      {
        _key: "lead",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "lead-span",
            _type: "span",
            text: "Biting frost coats the wooden seats of the open jeep as breath plumes into crystal air. Winter transforms the Indian wilderness into a stage of dramatic mists and golden light rays.",
          },
        ],
      },
      {
        _key: "h2-1",
        _type: "block",
        style: "h2",
        children: [{ _key: "h2-1-span", _type: "span", text: "The Charm of the Winter Jungle" }],
      },
      {
        _key: "p-1",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "p-1-span",
            _type: "span",
            text: "Unlike dry summer months when wildlife congregates strictly at water holes, winter spreads activity throughout the day. Big cats bask on open firelines till late morning, seeking the warming touch of the low-angled sun.",
          },
        ],
      },
    ],
  },
]

/**
 * Normalizes a SanityPost into the Article shape consumed by list views and pages.
 */
function normalizePost(post: SanityPost): Article {
  return {
    id: post._id,
    slug: post.slug.current,
    title: post.title,
    coverUrl: post.mainImage.asset.url,
    createdAt: post.publishedAt,
    readTime: post.readTime,
    tags: post.tags,
    excerpt: post.excerpt,
    body: post.body,
  }
}

export const ARTICLES: Article[] = SANITY_POSTS.map(normalizePost)

export function getArticleById(idOrSlug: string): Article | undefined {
  const post = SANITY_POSTS.find(
    (p) => p._id === idOrSlug || p.slug.current === idOrSlug
  )
  return post ? normalizePost(post) : undefined
}

export function getAllArticles(): Article[] {
  return ARTICLES
}

export async function getSanityPosts(): Promise<Article[]> {
  try {
    const { client } = await import("@/sanity/client")
    const { POSTS_QUERY } = await import("@/sanity/queries")
    const sanityPosts = await client.fetch(POSTS_QUERY)
    if (sanityPosts && sanityPosts.length > 0) {
      const normalizedSanityPosts: Article[] = sanityPosts.map((post: any) => ({
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
      const sanitySlugs = new Set(normalizedSanityPosts.map((p) => p.slug))
      const remainingLocal = ARTICLES.filter(
        (p) => !sanitySlugs.has(p.slug) && !sanitySlugs.has(p.id)
      )
      return [...normalizedSanityPosts, ...remainingLocal]
    }
  } catch (err) {
    console.error(
      "Failed to fetch posts from Sanity, falling back to local posts",
      err
    )
  }
  return ARTICLES
}

export async function getSanityPostBySlugOrId(
  slugOrId: string
): Promise<Article | undefined> {
  try {
    const { client } = await import("@/sanity/client")
    const { POST_BY_SLUG_OR_ID_QUERY } = await import("@/sanity/queries")
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
    console.error(
      "Failed to fetch post by slug from Sanity, checking local posts",
      err
    )
  }
  return getArticleById(slugOrId)
}
