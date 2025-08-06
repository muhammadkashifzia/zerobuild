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
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'The descriptive text below the main title',
      validation: (Rule) => Rule.required(),
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