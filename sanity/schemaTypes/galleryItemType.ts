import { defineField, defineType } from 'sanity'

export const galleryItemType = defineType({
  name: 'galleryItem',
  title: 'Gallery Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title / Caption',
      type: 'string',
      description: 'Optional title or caption displayed on hover or in lightbox',
    }),
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
      },
      initialValue: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
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
      hidden: ({ parent }) => parent?.mediaType === 'video',
    }),
    defineField({
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      description: 'Upload a short video or clip (MP4, WebM)',
      hidden: ({ parent }) => parent?.mediaType !== 'video',
    }),
    defineField({
      name: 'videoUrl',
      title: 'External Video URL',
      type: 'url',
      description: 'Optional direct external video URL (e.g. WebM, MP4, stream)',
      hidden: ({ parent }) => parent?.mediaType !== 'video',
    }),
    defineField({
      name: 'videoPoster',
      title: 'Video Poster / Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Thumbnail preview before video loads or when paused',
      hidden: ({ parent }) => parent?.mediaType !== 'video',
    }),
    defineField({
      name: 'aspectRatio',
      title: 'Custom Aspect Ratio (optional)',
      type: 'string',
      description: 'Optional ratio e.g. 16/9, 9/16, 4/5, 1/1. Leave blank to auto-detect natural ratio.',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Sort order in gallery (lower numbers show first)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      mediaType: 'mediaType',
      image: 'image',
      videoPoster: 'videoPoster',
    },
    prepare({ title, mediaType, image, videoPoster }) {
      return {
        title: title || (mediaType === 'video' ? 'Untitled Video' : 'Untitled Image'),
        subtitle: (mediaType || 'image').toUpperCase(),
        media: image || videoPoster,
      }
    },
  },
})
