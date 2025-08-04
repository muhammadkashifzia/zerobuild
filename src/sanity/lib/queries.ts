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