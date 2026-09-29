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
      description: 'Displayed in the card location pill (e.g. "Tiger Reserve, Madhya Pradesh")',
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
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle whether this destination appears in the homepage carousel',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Used to sort destinations on the homepage (e.g. 1, 2, 3)',
    }),

    // Accommodation / Card Details (Optional, matching existing card UI)
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
      description: 'Displayed in card as "FROM $X/NIGHT"',
      validation: (rule) => rule.positive(),
    }),
    defineField({
      name: 'maxGuests',
      title: 'Maximum Guests',
      type: 'number',
      description: 'Displayed in card as "MAX X GUESTS"',
      validation: (rule) => rule.integer().positive(),
    }),
    defineField({
      name: 'bedsDescription',
      title: 'Bedding Configuration',
      type: 'string',
      description: 'e.g. "2 King Beds" or "1 Queen or 2 Single Beds"',
    }),
    defineField({
      name: 'bedCount',
      title: 'Bed Icon Count',
      type: 'number',
      description: 'Number of bed icons rendered in the card (1-4)',
      validation: (rule) => rule.integer().min(1).max(4),
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
