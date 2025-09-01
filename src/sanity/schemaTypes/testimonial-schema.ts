import { defineField, defineType } from "sanity";

export const testimonialType = defineType({
  name: "testimonialSlider",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Main Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      description: "Whether this feature should be displayed",
      initialValue: true,
    }),
  ],
});
