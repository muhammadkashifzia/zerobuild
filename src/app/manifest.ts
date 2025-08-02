import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ZeroBuild - Net Zero Decarbonisation Solutions',
    short_name: 'ZeroBuild',
    description: 'Accelerating the decarbonisation of the built environment with proprietary analytics and data-driven tools for Whole Life Carbon assessments and energy modelling.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#484AB7',
    icons: [
      {
        src: '/assets/images/5CZLogo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/assets/images/5CZLogo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['business', 'productivity', 'utilities'],
    lang: 'en',
    dir: 'ltr',
    orientation: 'portrait',
    scope: '/',
    prefer_related_applications: false,
  }
} 