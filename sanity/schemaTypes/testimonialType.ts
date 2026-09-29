import { defineField, defineType } from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 5,
      description: 'The guest’s words, without surrounding quotation marks',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Guest Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'place',
      title: 'Trip Location',
      type: 'string',
      description: 'e.g. Kabini, Karnataka',
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      initialValue: 5,
      validation: (rule) => rule.required().integer().min(1).max(5),
    }),
    defineField({
      name: 'destination',
      title: 'Related Destination',
      type: 'reference',
      to: [{ type: 'destination' }],
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'place' },
  },
})
