import { defineField, defineType } from 'sanity'

export const companyType = defineType({
  name: 'company',
  title: 'Company Information',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Company Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'footerDescription',
      title: 'Footer Description',
      type: 'text',
      description: 'Description shown in the footer about the company',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Company Tagline',
      type: 'string',
      description: 'Short company tagline or motto',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Whether this company information should be displayed',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'tagline',
    },
  },
})

