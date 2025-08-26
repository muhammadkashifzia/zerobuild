
import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'string',
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: 'location',
      title: 'Location (right side header)',
      type: 'string',
      description: 'Shown on the right side of the project header',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{ type: 'image' }],
    }),
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  
     defineField({
      name: 'accordion',
      title: 'Project Accordion',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'accordionItem',
          title: 'Project Accordion Item',
          fields: [
            {
              name: 'title',
              title: 'Question/Title',
              type: 'string',
              validation: (rule) => rule.required(),
            },
            {
              name: 'content',
              title: 'Answer/Content',
              type: 'array',
              of: [{ type: 'block' }],
              validation: (rule) => rule.required(),
            },
            {
              name: 'isOpen',
              title: 'Open by Default',
              type: 'boolean',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              title: 'title',
              isOpen: 'isOpen',
            },
            prepare({ title, isOpen }) {
              return {
                title: title,
                subtitle: isOpen ? 'Open by default' : 'Closed by default',
              }
            },
          },
        },
      ],
    }),
  ],
})
