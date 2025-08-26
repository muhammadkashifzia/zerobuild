import { defineField, defineType } from 'sanity'

export const resourcesPageType = defineType({
  name: 'resourcesPage',
  title: 'Resources Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'string',
      description: 'The main heading of the resources page banner',
      validation: (Rule) => Rule.required(),
      initialValue: 'Explore our resources across the built and natural environments',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'The subtitle/description text below the main title',
      validation: (Rule) => Rule.required(),
      initialValue: 'We offer a wide range of resources that address every priority in the built and natural environments. Search below or use the filters to explore resources by purpose and focus area.',
    }),
 
    defineField({
      name: 'ctaTitle',
      title: 'CTA Title',
      type: 'string',
      description: 'Title shown in the resource detail CTA box',
      initialValue: 'Get in touch with our team',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA Button Text',
      type: 'string',
      description: 'Button text for the resource detail CTA',
      initialValue: 'Contact',
    }),
    defineField({
      name: 'ctaButtonLink',
      title: 'CTA Button Link',
      type: 'string',
      description: 'Internal link path for the CTA button (e.g. /contact)',
      initialValue: '/contact',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Only one resources page configuration should be active at a time',
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
        title: title || 'Resources Page Banner',
        subtitle: isActive ? 'Active' : 'Inactive',
      }
    },
  },
})
