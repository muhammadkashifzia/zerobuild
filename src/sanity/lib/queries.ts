import { groq } from 'next-sanity'

export const youtubeVideosQuery = groq`
  *[_type == "youtubeVideo" && isActive == true] | order(order asc) {
    _id,
    title,
    youtubeUrl,
    channelName,
    description,
    gradient,
    order,
    isActive,
    thumbnail {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    }
  }
`

export const youtubeVideoByIdQuery = groq`
  *[_type == "youtubeVideo" && _id == $id][0] {
    _id,
    title,
    youtubeUrl,
    channelName,
    description,
    gradient,
    order,
    isActive,
    thumbnail {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    }
  }
`

export const heroQuery = groq`
  *[_type == "hero" && isActive == true][0] {
    _id,
    title,
    titleHighlight,
    description,
    primaryButton {
      text,
      link
    },
    secondaryButton {
      text,
      link
    }
  }
`

export const servicesPageQuery = groq`
  *[_type == "servicesPage" && isActive == true][0] {
    _id,
    title,
    description,
    ctaTitle,
    ctaButtonText,
    ctaButtonLink
  }
`

export const performanceQuery = groq`
  *[_type == "performance" && isActive == true][0] {
    _id,
    mainTitle,
    description,
    contentAboveGraph,
    contentBelowGraph,
    cta { text, link }
  }
` 

export const projectsPageQuery = groq`
  *[_type == "projectsPage" && isActive == true][0] {
    _id,
    title,
    description
  }
`

export const aboutPageQuery = groq`
  *[_type == "aboutPage" && (isActive == true][0]  {
    _id,
    title,
    description,
    introContent,
    mainHeading,
    newBuildButtonText,
    retrofitSelectorButtonText,
    retrofitButtonText,

    newBuildIntroText,
    newBuildSummaryText,
    newBuildResultText,
    newBuildResultCta { text, link },
    retrofitIntroText,
    retrofitContent,
    retrofitSlider[] {
      image {
        asset-> {
          _id,
          url,
          metadata { dimensions { width, height } }
        }
      },
      altText
    },

    retrofitResultText,
    retrofitButtonText,
    retrofitButtonUrl,

    // Profile Section
    profileImage {
      asset-> {
        _id,
        url,
        metadata { dimensions { width, height } }
      },
      alt
    },
    profileName,
    profileTitle,
    profileBio,
    contactButtonText,
    contactButtonUrl,
    linkedinUrl,
    linkedinButtonText,

    // CTA Section
    ctaTitle,
    ctaDescription,
    ctaButtonText,
    ctaButtonUrl,
    ctaTypewriterWords
  }
`
