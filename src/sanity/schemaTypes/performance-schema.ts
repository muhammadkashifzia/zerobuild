import { defineField, defineType } from 'sanity'

export const performanceType = defineType({
  name: 'performance',
  title: 'Performance Section',
  type: 'document',
  fields: [
    defineField({
      name: 'mainTitle',
      title: 'Main Title',
      type: 'string',
      description: 'The main heading above the graph',
      validation: (Rule) => Rule.required(),
    }),
   
    defineField({
      name: 'contentAboveGraph',
      title: 'Content Above Graph',
      type: 'array',
      description: 'Rich text displayed above the graph/buttons',
      of: [{ type: 'block' }],
    }),

    defineField({
      name: 'contentBelowGraph',
      title: 'Content Below Graph',
      type: 'array',
      description: 'Rich text displayed below the graph',
      of: [{ type: 'block' }],
    }),

    defineField({
      name: 'cta',
      title: 'Build CTA',
      type: 'object',
      description: 'Configurable call-to-action button',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Build'
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'url',
          initialValue: '/contact'
        },
      ],
    }),

    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Only one performance section should be active at a time',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'mainTitle',
      isActive: 'isActive',
    },
    prepare({ title, isActive }) {
      return {
        title: title || 'Untitled Performance Section',
        subtitle: isActive ? 'Active' : 'Inactive',
      }
    },
  },
}) 