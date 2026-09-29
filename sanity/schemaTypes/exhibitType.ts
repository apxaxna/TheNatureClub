import { defineArrayMember, defineField, defineType } from 'sanity'

export const exhibitType = defineType({
  name: 'exhibit',
  title: 'Exhibit',
  type: 'document',
  description: 'A seasonal photo series shown on the homepage (e.g. The Winter Exhibit)',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. "The Winter Exhibit"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'season',
      title: 'Season',
      type: 'string',
      options: {
        list: [
          { title: 'Winter', value: 'winter' },
          { title: 'Spring', value: 'spring' },
          { title: 'Summer', value: 'summer' },
          { title: 'Monsoon', value: 'monsoon' },
          { title: 'Autumn', value: 'autumn' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description:
        'Optional one or two sentences about this series. Not shown on the page, but used by search engines and AI assistants.',
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      description:
        'Photos sit up to three per row. Turn on "Full width" to give a photo a row of its own.',
      of: [
        defineArrayMember({
          name: 'exhibitPhoto',
          title: 'Photo',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              description: 'Until a photo is uploaded, the site shows a placeholder in this slot.',
              validation: (rule) =>
                rule.required().warning('No photo yet — the site shows a placeholder until you upload one'),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'Shown in quotes under the photo, e.g. Icy Bear Happiness',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'e.g. A winter scene captured in Drass',
            }),
            defineField({
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
              description: 'Describe what is in the photo for screen readers and search engines',
              validation: (rule) => rule.required().warning('Adding alt text improves SEO and accessibility'),
            }),
            defineField({
              name: 'location',
              title: 'Location',
              type: 'string',
              description: 'Where the photo was taken, e.g. Drass, Ladakh',
            }),
            defineField({
              name: 'wide',
              title: 'Full width',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'caption', media: 'image' },
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Sort order on the homepage (lower numbers show first)',
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'displayOrderAsc',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'season', media: 'photos.0.image' },
  },
})
