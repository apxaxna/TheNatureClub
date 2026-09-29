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
      description: 'Used in footer and site metadata',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      initialValue: 'Pack Your Bags. Chase the World.',
      description: 'Main headline displayed over the hero banner on the homepage',
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
      title: 'About Section Headline',
      type: 'string',
      initialValue: 'THE NATURE CLUB',
      description: 'Main heading in the About Us section',
    }),
    defineField({
      name: 'aboutParagraph',
      title: 'About Section Paragraph',
      type: 'text',
      rows: 4,
      initialValue:
        'At The Nature Club, we create thoughtfully planned journeys that help you discover beautiful destinations, meaningful experiences, and unforgettable memories.',
      description: 'Main body text in the About Us section',
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
