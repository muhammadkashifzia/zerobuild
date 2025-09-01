import { defineField, defineType } from 'sanity'

export const featureHeadingType = defineType({
  name: 'featureMainHeading',
  title: 'Feature Main Heading',
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
      title: 'Sub Text',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
   
    defineField({
      name: 'highlightText',
      title: 'Highlight Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
   
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Whether this feature should be displayed',
      initialValue: true,
    }),
  ],
 
})
