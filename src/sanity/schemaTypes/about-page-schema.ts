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

    // Project Type Section
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
      name: 'retrofitSelectorButtonText',
      title: 'Retrofit Button Text (Project Type Selector)',
      type: 'string',
      initialValue: 'Retrofit',
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
      initialValue: "We eliminate poor-performing and non-compliant options and score the remaining against the client's priorities. This helps us get clear, evidence-based rationale for the design decisions. We recommend using these outputs to develop brief for architects and engineers.",
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
      initialValue: 'The result: a clear pathway to improvement that\'s aligned with both project\'s values and Net Zero goals.',
    }),
    defineField({
      name: 'retrofitButtonText',
      title: 'Retrofit Button Text (Retrofit Section)',
      type: 'string',
      initialValue: 'Explore retrofit projects',
    }),
    defineField({
      name: 'retrofitButtonUrl',
      title: 'Retrofit Button URL',
      type: 'url',
      description: 'URL for the retrofit button',
    }),

    // Active Flag
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Only one about page configuration should be active at a time',
      initialValue: true,
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
      initialValue: 'Deepak Sadhwani',
    }),
    defineField({
      name: 'profileTitle',
      title: 'Profile Title',
      type: 'text',
      description: 'Short title/description for the profile',
      initialValue: 'Zero Build was founded by Deepak Sadhwani, an architect turned building performance specialist, with a deep belief that good design must be backed by good data.',
    }),
    defineField({
      name: 'profileBio',
      title: 'Profile Bio',
      type: 'text',
      description: 'Detailed biography for the profile',
      initialValue: 'After completing his MSc in Sustainable Mega-Buildings with distinction at Welsh School of Architecture, Cardiff University, Deepak\'s research was awarded the prestigious CIBSE President\'s Prize, recognising his ability to bridge building physics and design thinking. He is the co-author of the CIBSE Building Physics Guide. His work has been recognised through two interdisciplinary design challenge wins, including the TDUK University Design Challenge 2023 and the Southside Net Zero Design Challenge. In both, he played a leading role in building physics, cost and carbon analysis, and interdisciplinary coordination. He has since led and contributed to national Net Zero initiatives, working with local authorities, developers, architects and engineers in the UK, Greece, Italy, USA, Japan, Turkey, and China. From early architectural projects in India to pioneering holistic sustainable developments across the globe, focusing on comfort, carbon, cost, circularity and compliance, Deepak\'s journey reflects the ethos of Zero Build: a drive to make buildings truly perfect.',
    }),

    defineField({
      name: 'contactButtonText',
      title: 'Contact Button Text',
      type: 'string',
      description: 'Text for the contact button',
      initialValue: 'Contact our experts',
    }),
    defineField({
      name: 'contactButtonUrl',
      title: 'Contact Button URL',
      type: 'url',
      description: 'URL for the contact button',
      initialValue: 'https://outlook.office.com/book/ZeroBuildDiscoveryCall@zerobuild.io/s/0j-Jsl27BUuEcZ2ortBjhA2?ismsaljsauthenabled',
    }),

    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
      description: 'LinkedIn profile URL',
      initialValue: 'https://www.linkedin.com/company/5c-zero/about/',
    }),
    defineField({
      name: 'linkedinButtonText',
      title: 'LinkedIn Button Text',
      type: 'string',
      description: 'Text for the LinkedIn button',
      initialValue: 'Connect on LinkedIn',
    }),

    // CTA Section
    defineField({
      name: 'ctaTitle',
      title: 'CTA Title',
      type: 'string',
      description: 'Title for the call-to-action section',
      initialValue: 'Ready to take the next step?',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA Description',
      type: 'text',
      description: 'Description for the call-to-action section',
      initialValue: 'Let\'s talk about how we can support your Net Zero ambitions — whether you need strategic advice or a full sustainability strategy.',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA Button Text',
      type: 'string',
      description: 'Text for the CTA button',
      initialValue: 'Talk to an expert',
    }),
    defineField({
      name: 'ctaButtonUrl',
      title: 'CTA Button URL',
      type: 'url',
      description: 'URL for the CTA button',
      initialValue: 'https://outlook.office.com/book/ZeroBuildDiscoveryCall@zerobuild.io/s/0j-Jsl27BUuEcZ2ortBjhA2?ismsaljsauthenabled',
    }),
    defineField({
      name: 'ctaTypewriterWords',
      title: 'CTA Typewriter Words',
      type: 'array',
      description: 'Words for the typewriter effect in the CTA button',
      of: [{ type: 'string' }],
      initialValue: ['Expert'],
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
