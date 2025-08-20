import { defineField, defineType } from 'sanity'

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'string',
      description: 'The main heading of the about page banner',
      validation: (Rule) => Rule.required(),
      initialValue: 'About Us',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'The subtitle/description text below the main title',
      validation: (Rule) => Rule.required(),
      initialValue: 'From metro systems to concert halls, our sustainability projects shape a better world.',
    }),
    defineField({
      name: 'introText',
      title: 'Introductory Text',
      type: 'text',
      description: 'Longer paragraph below the banner explaining the company mission',
      initialValue:
        'We believe buildings can be perfect, because they are built on data, Data that can shape perfectly comfortable homes for every age group, weather and location Data that can help us choose materials with the lowest environmental impact. Data that can optimise how we use resources, and Data that can help even generate income from energy rather than simply paying for it Data that can inform all functional, and technical design decisions with measurable outcomes. Our mission is to harness this data to create buildings that are not just compliant, but outstanding in comfort, carbon performance, cost efficiency, and circularity. We bring clarity to Net Zero by turning complexity into simple, confident decisions.',
    }),
    defineField({
      name: 'introImage',
      title: 'Introductory Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Image displayed below the introductory text',
    }),
  
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Only one about page configuration should be active at a time',
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
        title: title || 'About Page Banner',
        subtitle: isActive ? 'Active' : 'Inactive',
      }
    },
  },
})
