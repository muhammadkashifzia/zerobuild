import { defineField, defineType } from 'sanity'

export const featureType = defineType({
  name: 'feature',
  title: 'Feature',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Optional icon identifier (e.g., "shield", "chart", "calendar")',
    }),
    defineField({
      name: 'logoColors',
      title: 'Logo Colors',
      type: 'object',
      fields: [
        defineField({
          name: 'primaryColor',
          title: 'Primary Color',
          type: 'string',
          description: 'Primary color for the logo (hex, rgb, or CSS color)',
          initialValue: '#3B82F6',
        }),
        defineField({
          name: 'secondaryColor',
          title: 'Secondary Color',
          type: 'string',
          description: 'Secondary color for gradient effect (hex, rgb, or CSS color)',
          initialValue: '#8B5CF6',
        }),
        defineField({
          name: 'gradientDirection',
          title: 'Gradient Direction',
          type: 'string',
          options: {
            list: [
              { title: 'To Right', value: 'to right' },
              { title: 'To Bottom', value: 'to bottom' },
              { title: 'To Bottom Right', value: 'to bottom right' },
              { title: 'To Top Right', value: 'to top right' },
              { title: 'Radial', value: 'radial' },
            ],
          },
          initialValue: 'to bottom right',
        }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this feature should appear (lower numbers appear first)',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Whether this feature should be displayed',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      order: 'order',
    },
    prepare({ title, order }) {
      return {
        title: title,
        subtitle: `Order: ${order}`,
      }
    },
  },
})
