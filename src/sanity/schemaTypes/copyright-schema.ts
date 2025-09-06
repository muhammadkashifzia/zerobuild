import { defineField, defineType } from 'sanity'

export const copyrightType = defineType({
  name: 'copyright',
  title: 'Copyright Text',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Copyright Text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Whether this Copyright Text should be displayed',
      initialValue: true,
    }),
  ],

})

