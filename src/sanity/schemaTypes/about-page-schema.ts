import { defineField, defineType } from 'sanity'

export const aboutPageType = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [

    // Banner Section
    defineField({
      name: 'title',
      title: 'Banner Title',
      type: 'string',
      description: 'The main heading of the about page banner',
      validation: (Rule) => Rule.required(),
  
    }),
    defineField({
      name: 'description',
      title: 'Banner Description',
      type: 'text',
      description: 'The subtitle/description text below the main title',
      validation: (Rule) => Rule.required(),
     
    }),
    defineField({
      name: 'introContent',
      title: 'Introductory Content',
      type: 'array',
      description: 'Rich content below the banner; supports text, headings, lists, and images',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              description: 'Accessible description of image for screen readers',
              validation: (Rule) => Rule.required().warning('Provide alt text for accessibility'),
            },
          ],
        },
      ],
    }),

    // Project Type Section
    defineField({
      name: 'mainHeading',
      title: 'Project Type Heading',
      type: 'string',
      description: 'Heading above the project type selector',
    
    }),
    defineField({
      name: 'newBuildButtonText',
      title: 'New Build Button Text',
      type: 'string',
    
    }),
    defineField({
      name: 'retrofitSelectorButtonText',
      title: 'Retrofit Button Text (Project Type Selector)',
      type: 'string',
      
    }),

    // New Build Section
    defineField({
      name: 'newBuildIntroText',
      title: 'New Build Intro Text',
      type: 'array',
      description: 'Rich content below the banner; supports text, headings, lists, and images',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              description: 'Accessible description of image for screen readers',
              validation: (Rule) => Rule.required().warning('Provide alt text for accessibility'),
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'newBuildSummaryText',
      title: 'New Build Summary Text',
      type: 'text',
    }),
    defineField({
      name: 'newBuildResultText',
      title: 'New Build Result Text',
      type: 'string',
    }),
    defineField({
      name: 'newBuildResultCta',
      title: 'New Build Result CTA',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
        },
        {
          name: 'link',
          title: 'Button Link URL',
          type: 'url',
        },
      ],
    }),

    // Retrofit Section
    defineField({
      name: 'retrofitIntroSteps',
      title: 'Retrofit Intro Steps',
      type: 'array',
      description: 'We then simulate and compare retrofit pathways:',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              description: 'Accessible description of image for screen readers',
              validation: (Rule) => Rule.required().warning('Provide alt text for accessibility'),
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'retrofitContent',
      title: 'Retrofit Content',
      type: 'array',
      description: 'Rich content below retrofit intro text',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              description: 'Accessible description of image for screen readers',
              validation: (Rule) => Rule.required().warning('Provide alt text for accessibility'),
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'retrofitSlider',
      title: 'Retrofit Slider',
      type: 'array',
      description: 'Slider images for retrofit section',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
            },
            {
              name: 'altText',
              title: 'Alt Text',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'retrofitResultText',
      title: 'Retrofit Result Text',
      type: 'string',
    
    }),
    defineField({
      name: 'retrofitButtonText',
      title: 'Retrofit Button Text (Retrofit Section)',
      type: 'string',
    }),
    defineField({
      name: 'retrofitButtonUrl',
      title: 'Retrofit Button URL',
      type: 'url',
      description: 'URL for the retrofit button',
    }),


   

    // Profile Section
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Profile image for the about section',
    }),
    defineField({
      name: 'profileName',
      title: 'Profile Name',
      type: 'string',
      description: 'Name of the person in the profile',
    }),
    defineField({
      name: 'profileTitle',
      title: 'Profile Title',
      type: 'text',
      description: 'Short title/description for the profile',
    
    }),
    defineField({
      name: 'profileBio',
      title: 'Profile Bio',
      type: 'text',
      description: 'Detailed biography for the profile',
    }),

    defineField({
      name: 'contactButtonText',
      title: 'Contact Button Text',
      type: 'string',
      description: 'Text for the contact button',
    }),
    defineField({
      name: 'contactButtonUrl',
      title: 'Contact Button URL',
      type: 'url',
      description: 'URL for the contact button',
   
    }),

    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
      description: 'LinkedIn profile URL',

    }),

  
    defineField({
      name: 'linkedinButtonText',
      title: 'LinkedIn Button Text',
      type: 'string',
      description: 'Text for the LinkedIn button',

    }),
    // Global Section
    defineField({
      name: 'globallyTitle',
      title: 'Globally Heading',
      type: 'string',
      description: 'Globally Heading Text',

    }),

     defineField({
      name: 'globallyDescription',
      title: 'Globally Description',
      type: 'text',
      description: 'Globally Description Text',

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
