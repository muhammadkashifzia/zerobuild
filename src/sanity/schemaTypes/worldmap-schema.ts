import { defineField, defineType } from 'sanity'

export const worldMapType = defineType({
  name: 'worldMapHeading',
  title: 'World Map Heading',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'MainHeading',
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
