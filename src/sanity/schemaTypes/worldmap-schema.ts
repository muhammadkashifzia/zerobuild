import { defineField, defineType } from 'sanity'

export const worldMapType = defineType({
  name: 'worldMapHeading',
  title: 'World Map Heading',
  type: 'document',
  fields: [
    defineField({
      name: 'mainheading',
      title: 'Main Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
     defineField({
      name: 'bluehighlight',
      title: 'Text Highlight',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtext',
      title: 'Sub Text',
      type: 'text',
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
