import { defineField, defineType } from 'sanity'

export const projectsPageType = defineType({
  name: 'projectsPage',
  title: 'Projects Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'string',
      description: 'The main heading of the projects page banner',
      validation: (Rule) => Rule.required(),
      initialValue: 'Explore our projects across the built and natural environments',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'The subtitle/description text below the main title',
      validation: (Rule) => Rule.required(),
      initialValue: 'From metro systems to concert halls, our sustainability projects demonstrate real-world impact across the built and natural environments.',
    }),
    defineField({
      name: 'faqSection',
      title: 'FAQ Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'FAQ Section Title',
          type: 'string',
          initialValue: 'Frequently Asked Questions',
        }),
        defineField({
          name: 'faqs',
          title: 'FAQ Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Question',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'content',
                  title: 'Answer',
                  type: 'array',
                  of: [{ type: 'block' }],
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'isOpen',
                  title: 'Open by Default',
                  type: 'boolean',
                  initialValue: false,
                }),
              ],
              preview: {
                select: {
                  title: 'title',
                  isOpen: 'isOpen',
                },
                prepare({ title, isOpen }) {
                  return {
                    title: title || 'FAQ Item',
                    subtitle: isOpen ? 'Open by default' : 'Closed by default',
                  }
                },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Only one projects page configuration should be active at a time',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      isActive: 'isActive',
    },
    prepare({ title, isActive }) {
      return {
        title: title || 'Projects Page Banner',
        subtitle: isActive ? 'Active' : 'Inactive',
      }
    },
  },
})
