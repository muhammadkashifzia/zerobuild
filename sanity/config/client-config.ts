// config/client-config.ts
export default {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID! || '7xgcerpq',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET! || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-07-23',
  useCdn: true,
}
