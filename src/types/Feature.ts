export interface Feature {
  _id: string
  _createdAt: string
  title: string
  description: string
  icon?: string
  logoColors?: {
    primaryColor: string
    secondaryColor: string
    gradientDirection: string
  }
  order: number
  isActive: boolean
}
