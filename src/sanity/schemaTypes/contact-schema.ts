
import { defineField, defineType } from 'sanity'

export const contactType = defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
     defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
     defineField({
      name: 'phone',
      title: 'Phone no',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})
