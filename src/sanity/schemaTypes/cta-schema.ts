import { defineField, defineType } from "sanity";

export const ctaType = defineType({
  name: "cta",
  title: "CTA Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Main Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtext",
      title: "Sub Text",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctabtntext",
      title: "CTA Button Text",
      type: "string", // better as string instead of text for short content
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctabtntextanimation",
      title: "CTA Button Animation Text",
      type: "string", // same here, string works better
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctabtnurl",
      title: "CTA Button URL",
      type: "url",
      validation: (Rule) =>
        Rule.required().uri({
          allowRelative: true, // allows internal links like /contact
          scheme: ["http", "https", "mailto", "tel"],
        }),
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
