export interface SanityImage {
  _id: string
  url: string
  metadata: {
    dimensions: {
      width: number
      height: number
    }
  }
}

export interface YouTubeVideo {
  _id: string
  title: string
  youtubeUrl: string
  channelName: string
  description: string
  gradient: string
  order: number
  isActive: boolean
  thumbnail?: {
    asset: SanityImage
  }
}

export interface VideoFeatureProps {
  title: string
  gradient: string
  videoSrc: string
  channelName: string
  description: string
  thumbnail?: string
} 