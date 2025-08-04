import { defineField, defineType } from 'sanity'

export const youtubeVideoType = defineType({
  name: 'youtubeVideo',
  title: 'YouTube Video',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Video Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      description: 'The full YouTube video URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID)',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'channelName',
      title: 'Channel Name',
      type: 'string',
      description: 'The name of the YouTube channel',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A brief description of what the video is about',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'gradient',
      title: 'Background Gradient',
      type: 'string',
      description: 'Tailwind CSS gradient classes (e.g., from-indigo-500 to-indigo-300)',
      options: {
        list: [
          { title: 'Indigo', value: 'from-indigo-500 to-indigo-300' },
          { title: 'Pink', value: 'from-pink-500 to-pink-300' },
          { title: 'Blue', value: 'from-blue-500 to-blue-300' },
          { title: 'Purple', value: 'from-purple-500 to-purple-300' },
          { title: 'Green', value: 'from-green-500 to-green-300' },
          { title: 'Orange', value: 'from-orange-500 to-orange-300' },
          { title: 'Red', value: 'from-red-500 to-red-300' },
          { title: 'Teal', value: 'from-teal-500 to-teal-300' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'The order in which this video should appear (lower numbers appear first)',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Whether this video should be displayed on the website',
      initialValue: true,
    }),
    defineField({
      name: 'thumbnail',
      title: 'Custom Thumbnail',
      type: 'image',
      description: 'Optional custom thumbnail image (if not provided, YouTube thumbnail will be used)',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      channelName: 'channelName',
      media: 'thumbnail',
    },
    prepare(selection) {
      const { title, channelName, media } = selection
      return {
        title: title,
        subtitle: `by ${channelName}`,
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
}) 