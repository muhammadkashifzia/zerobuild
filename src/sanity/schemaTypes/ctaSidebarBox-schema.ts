import { defineField, defineType } from "sanity";

export const ctaBoxType = defineType({
  name: 'ctaSidebarBox',
  title: 'CTA Sidebar Box',
  type: 'document',
  fields: [
   defineField( {
      name: 'ctaTitle',
      title: 'CTA Title',
      type: 'string',
      validation: Rule => Rule.required()
   }),
  
   defineField( {
      name: 'ctaButtonText',
      title: 'Button Text',
      type: 'string',
      validation: Rule => Rule.required()
    }),
  defineField( {
      name: 'ctaButtonLink',
      title: 'Button Link',
      type: 'string',
      validation: Rule => Rule.required()
  }),
  ],
});