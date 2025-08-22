import { defineField, defineType } from 'sanity'

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Banner Title',
      type: 'string',
      description: 'The main heading of the about page banner',
      validation: (Rule) => Rule.required(),
      initialValue: 'About Us',
    }),
    defineField({
      name: 'description',
      title: 'Banner Description',
      type: 'text',
      description: 'The subtitle/description text below the main title',
      validation: (Rule) => Rule.required(),
      initialValue: 'From metro systems to concert halls, our sustainability projects shape a better world.',
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

    // Project type section (for ObservabilityRadarChart)
    defineField({
      name: 'mainHeading',
      title: 'Project Type Heading',
      type: 'string',
      description: 'Heading above the project type selector',
      initialValue: 'Pick your Project Type',
    }),
    defineField({
      name: 'newBuildButtonText',
      title: 'New Build Button Text',
      type: 'string',
      initialValue: 'New Build',
    }),
    defineField({
      name: 'retrofitButtonText',
      title: 'Retrofit Button Text',
      type: 'string',
      initialValue: 'Retrofit',
    }),
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
      initialValue: "We eliminate poor-performing and non-compliant options and score the remaining against the client's priorities. This helps us get clear, evidence-based rationale for the design decisions. We recommend using these outputs to develop brief for architects and engineers",
    }),
    defineField({
      name: 'newBuildResultText',
      title: 'New Build Result Text',
      type: 'string',
      initialValue: 'The result: A confident, futureproof path to Net Zero from day one.',
    }),
    defineField({
      name: 'newBuildResultCta',
      title: 'New Build Result CTA',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
        }),
        defineField({
          name: 'link',
          title: 'Button Link URL',
          type: 'url',
        })
      ]
    }),
    defineField({
      name: 'retrofitIntroText',
      title: 'Retrofit Intro Text',
      type: 'text',
      initialValue: 'We then simulate and compare retrofit pathways:',
    }),
    defineField({
      name: 'retrofitDescription',
      title: 'Retrofit Description',
      type: 'text',
      initialValue: "Each is evaluated across the building's future lifecycle, scored against the 5Cs, and mapped to your priorities.",
    }),
    defineField({
      name: 'retrofitResultText',
      title: 'Retrofit Result Text',
      type: 'text',
      initialValue: "The result: a clear pathway to improvement that's aligned with both project's values and Net Zero goals.",
    }),
    defineField({
      name: 'exploreNewBuildButtonText',
      title: 'Explore New Build Button Text',
      type: 'string',
      initialValue: 'Explore new build projects',
    }),
    defineField({
      name: 'exploreRetrofitButtonText',
      title: 'Explore Retrofit Button Text',
      type: 'string',
      initialValue: 'Explore retrofit projects',
    }),
    defineField({
      name: 'defaultHeading',
      title: 'Default Heading',
      type: 'string',
      initialValue: 'Select a project type to view the optioneering visualization',
    }),
    defineField({
      name: 'defaultDescription',
      title: 'Default Description',
      type: 'text',
      initialValue: 'Choose between New Build or Retrofit to explore different design options and performance scenarios.',
    }),
    defineField({
      name: 'swiperImages',
      title: 'Swiper Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'altText',
              title: 'Alt Text',
              type: 'string',
            }),
          ],
        },
      ],
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
