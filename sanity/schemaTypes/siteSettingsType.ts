import { defineArrayMember, defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      initialValue: 'The Nature Club',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      initialValue: 'Curated wildlife safaris, wilderness expeditions & mindful travel.',
      description: 'Short line used in site metadata',
    }),
    defineField({
      name: 'description',
      title: 'Site Description (SEO)',
      type: 'text',
      rows: 3,
      description:
        'One or two plain sentences saying who you are and what you offer. Used by search engines, link previews and AI assistants.',
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      initialValue: 'Landscape & Travel Photography Tours',
      description: 'Shown at the bottom right of the homepage hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
        }),
      ],
      description: 'Hero background image on the landing page',
    }),
    defineField({
      name: 'aboutHeadline',
      title: 'Intro Heading',
      type: 'string',
      initialValue: 'Hi, What are we into?',
      description: 'Heading of the intro block under the hero',
    }),
    defineField({
      name: 'aboutParagraph',
      title: 'Intro Paragraph',
      type: 'text',
      rows: 4,
      initialValue:
        'At The Nature Club, we create thoughtfully planned journeys that help you discover beautiful destinations, meaningful experiences, and unforgettable memories.',
      description: 'Body text of the intro block under the hero',
    }),
    defineField({
      name: 'aboutImageTopRight',
      title: 'Intro Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
        }),
      ],
      description: 'Landscape photo beside the intro text',
    }),
    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      description: 'Square brand logo used in search results and link previews',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'mail@thenatureclub.in',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'address',
      title: 'Location',
      type: 'object',
      options: { columns: 3 },
      fields: [
        defineField({ name: 'locality', title: 'City', type: 'string', initialValue: 'Bangalore' }),
        defineField({ name: 'region', title: 'State', type: 'string', initialValue: 'Karnataka' }),
        defineField({ name: 'country', title: 'Country Code', type: 'string', initialValue: 'IN' }),
      ],
    }),
    defineField({
      name: 'businessHours',
      title: 'Business Hours',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'day',
              title: 'Day',
              type: 'string',
              options: {
                list: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'opens',
              title: 'Opens (24h)',
              type: 'string',
              description: 'e.g. 08:00',
              validation: (rule) => rule.required().regex(/^([01]\d|2[0-3]):[0-5]\d$/, { name: 'HH:MM' }),
            }),
            defineField({
              name: 'closes',
              title: 'Closes (24h)',
              type: 'string',
              description: 'e.g. 19:00',
              validation: (rule) => rule.required().regex(/^([01]\d|2[0-3]):[0-5]\d$/, { name: 'HH:MM' }),
            }),
          ],
          preview: {
            select: { day: 'day', opens: 'opens', closes: 'closes' },
            prepare: ({ day, opens, closes }) => ({ title: day, subtitle: `${opens} – ${closes}` }),
          },
        }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              description: 'e.g. Instagram, Facebook, LinkedIn, X',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) =>
                rule.required().uri({ scheme: ['http', 'https'] }),
            }),
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'siteTitle',
      subtitle: 'tagline',
    },
  },
})
