export interface Feature {
  _id: string
  _createdAt: string
  title: string
  description: string
  order: number
  isActive: boolean
}

export interface FeatureHeading {
  _id: string
  _createdAt: string
  heading: string
  description: string
  highlightText: string
  isActive: boolean
}