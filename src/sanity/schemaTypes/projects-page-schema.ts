import { defineField, defineType } from 'sanity'

export const projectsPageType = defineType({
  name: 'projectsPage',
  title: 'Projects Banner',
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
