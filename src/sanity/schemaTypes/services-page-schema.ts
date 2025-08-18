import { defineField, defineType } from 'sanity'

export const servicesPageType = defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'string',
      description: 'The main heading of the services page banner',
      validation: (Rule) => Rule.required(),
      initialValue: 'Explore our services across the built and natural environments',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'The subtitle/description text below the main title',
      validation: (Rule) => Rule.required(),
      initialValue: 'We offer a wide range of services that address every priority in the built and natural environments. Search below or use the filters to explore services by discipline and project stage.',
    }),
    defineField({
      name: 'ctaTitle',
      title: 'CTA Title',
      type: 'string',
      description: 'Title shown in the service detail CTA box',
      initialValue: 'Get in touch with our team',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA Button Text',
      type: 'string',
      description: 'Button text for the service detail CTA',
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
