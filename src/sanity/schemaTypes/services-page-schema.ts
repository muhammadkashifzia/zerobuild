import { defineField, defineType } from 'sanity'

export const servicesBannerType = defineType({
  name: 'servicesBanner',
  title: 'Services Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'string',
      description: 'The main heading of the services page banner',
      validation: (Rule) => Rule.required(),
    
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'The subtitle/description text below the main title',
      validation: (Rule) => Rule.required(),
   
    }),
    defineField({
      name: 'ctaTitle',
      title: 'CTA Title',
      type: 'string',
      description: 'Title shown in the service detail CTA box',

    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA Button Text',
      type: 'string',
      description: 'Button text for the service detail CTA',

    }),
    defineField({
      name: 'ctaButtonLink',
      title: 'CTA Button Link',
      type: 'string',
      description: 'Internal link path for the CTA button (e.g. /contact)',
    
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Only one services page configuration should be active at a time',
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
        title: title || 'Services Page Banner',
        subtitle: isActive ? 'Active' : 'Inactive',
      }
    },
  },
})

