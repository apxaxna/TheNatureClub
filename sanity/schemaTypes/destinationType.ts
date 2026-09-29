import { defineArrayMember, defineField, defineType } from 'sanity'

export const destinationType = defineType({
  name: 'destination',
  title: 'Destination',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Destination Name',
      type: 'string',
      description: 'Name of the park, reserve, or sanctuary (e.g. Pench, Kotagiri)',
      validation: (rule) => rule.required().error('Destination name is required'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('Slug is required for the destination URL'),
    }),
    defineField({
      name: 'locationLabel',
      title: 'Location Label',
      type: 'string',
      description: 'Shown under the name on the card (e.g. "Tiger Reserve, Madhya Pradesh")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          validation: (rule) => rule.required().warning('Adding alt text improves SEO and accessibility'),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Habitat Category',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Primary ecosystem/habitat category (e.g. Tiger Reserve, Himalayas)',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Overview of the destination, habitat, and safari experience',
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            }),
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Caption',
            }),
          ],
        }),
      ],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Sort order on the Destinations page (e.g. 1, 2, 3)',
    }),

    // Stay details shown on the destination card
    defineField({
      name: 'rating',
      title: 'Guest Rating',
      type: 'number',
      description: 'Rating out of 5.0 (e.g. 4.9)',
      validation: (rule) => rule.min(1.0).max(5.0).precision(1),
    }),
    defineField({
      name: 'pricePerNight',
      title: 'Starting Price Per Night ($)',
      type: 'number',
      description: 'Shown on the card as "from $X/night"',
      validation: (rule) => rule.positive(),
    }),
    defineField({
      name: 'maxGuests',
      title: 'Maximum Guests',
      type: 'number',
      description: 'Shown on the card as "Max X Guests"',
      validation: (rule) => rule.integer().positive(),
    }),
    defineField({
      name: 'bedsDescription',
      title: 'Bedding Configuration',
      type: 'string',
      description: 'e.g. "2 King Beds" or "1 Queen or 2 Single Beds"',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'locationLabel',
      media: 'coverImage',
    },
  },
})
