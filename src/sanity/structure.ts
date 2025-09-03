import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Divider (optional)
      S.divider(),

      // Home Section
      S.listItem()
        .title("Home")
        .child(
          S.list()
            .title("Home Sections")
            .items([
              // Hero Section
              S.listItem()
                .title("Hero Section Banner")
                .child(S.document().schemaType("hero").documentId("hero")),

              S.divider(),

              // Performance Section
              S.listItem()
                .title("Performance Section")
                .schemaType("performance")
                .child(
                  S.documentTypeList("performance").title("Performance Section")
                ),

              S.divider(),

              // Feature Section
              S.listItem()
                .title("Feature Section")
                .child(
                  S.list()
                    .title("Feature Section")
                    .items([
                      // Feature Heading (single doc)
                      S.listItem()
                        .title("Feature Heading")
                        .child(
                          S.document()
                            .schemaType("featureMainHeading")
                            .documentId("featureMainHeadings")
                        ),

                      S.divider(),

                      // Feature List (multi docs)
                      S.listItem()
                        .title("Feature List")
                        .schemaType("feature")
                        .child(
                          S.documentTypeList("feature")
                            .title("Feature List")
                            .filter('_type == "feature"')
                        ),
                    ])
                ),

              S.divider(),

              // YouTube Video Section
              S.listItem()
                .title("YouTube Video Section")
                .schemaType("youtubeVideo")
                .child(
                  S.documentTypeList("youtubeVideo").title("YouTube Video")
                ),

              S.divider(),

              // WorldMap Section
              S.listItem()
                .title("WorldMap Section")
                .child(
                  S.list()
                    .title("WorldMap Section")
                    .items([
                      // WorldMap Heading (single doc)
                      S.listItem()
                        .title("WorldMap Heading")
                        .child(
                          S.document()
                            .schemaType("worldMapHeading")
                            .documentId("WorldMapHeadings")
                        ),
                    ])
                ),
            ])
        ),
      S.divider(),

      S.listItem()
        .title("About")
        .schemaType("about")
        .child(S.documentTypeList("about").title("About Us Page")),
      // Divider (optional)
      S.divider(),

      // Resource
      S.listItem()
        .title("Service")
        .child(
          S.list()
            .title("Service")
            .items([
              S.listItem()
                .title("Service Banner")
                .child(
                  S.document()
                    .schemaType("servicesBanner")
                    .documentId("servicesBanners")
                ),

              S.divider(),

              S.listItem()
                .title("Service List")
                .schemaType("service")
                .child(
                  S.documentTypeList("servicesBanner").title("Service List")
                ),
              // CTA Sidebar Box
              S.listItem()
                .title("CTA Sidebar Box")
                .schemaType("ctaSidebarBox")
                .child(
                  S.documentTypeList("ctaSidebarBox").title(
                    "Call To Action Box"
                  )
                ),
            ])
        ),
      S.divider(),
      // Projects
      S.listItem()
        .title("Projects")
        .child(
          S.list()
            .title("Projects")
            .items([
              // Projects Page Banner (single document)
              S.listItem()
                .title("Projects Page Banner")
                .child(
                  S.document()
                    .schemaType("projectsPage")
                    .documentId("projectsPage")
                ),

              S.divider(),

              // Projects (multiple docs)
              S.listItem()
                .title("Project List")
                .schemaType("project")
                .child(S.documentTypeList("project").title("Project List")),
            ])
        ),

      // Divider (optional)
      S.divider(),

      // Resource
      S.listItem()
        .title("Resource")
        .child(
          S.list()
            .title("Resource")
            .items([
              S.listItem()
                .title("Resource Page Banner")
                .child(
                  S.document()
                    .schemaType("resourcesPage")
                    .documentId("resourcesPage")
                ),

              S.divider(),

              S.listItem()
                .title("Resource List")
                .schemaType("resource")
                .child(S.documentTypeList("resource").title("Resource List")),
            ])
        ),

      // Global
      S.listItem()
        .title("Global Sections")
        .child(
          S.list()
            .title("CTA Section")
            .items([
              S.listItem()
                .title("CTA Section")
                .child(S.document().schemaType("cta").documentId("ctaSection")),

              S.divider(),

              // Testimonial Section
              S.listItem()
                .title("Testimonial Section")
                .child(
                  S.list()
                    .title("Testimonial Section")
                    .items([
                      // Testimonial Slides (multi docs)
                      S.listItem()
                        .title("Testimonial Slides")
                        .schemaType("testimonialSlider")
                        .child(
                          S.documentTypeList("testimonialSlider")
                            .title("Testimonial Slides")
                            .filter('_type == "testimonialSlider"')
                        ),
                    ])
                ),
              S.divider(),
              S.listItem()
                .title("Company Information")
                .child(
                  S.document().schemaType("company").documentId("company")
                ),
            ])
        ),
      S.divider(),

      // Resource
      S.listItem()
        .title("Contact Page")
        .child(
          S.list()
            .title("Contact Page")
            .items([
              S.listItem()
                .title("Contact Us")
                .child(
                  S.document().schemaType("contactPage").documentId("contactUs")
                ),

              S.divider(),

              S.listItem()
                .title("Contact Form Submission")
                .schemaType("contactSubmission")
                .child(
                  S.documentTypeList("contactSubmission").title(
                    "Contact Form Submission"
                  )
                ),
            ])
        ),
    ]);
