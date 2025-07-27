// config/client-config.ts
export default {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID! || '7xgcerpq',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET! || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-07-23',
  useCdn: true,
  token: process.env.SANITY_WRITE_TOKEN || 'skFLjj3rc2pAnHBLrJUzlRIRyx0SJ4ajimJJEdX1EwRAl8e2FmsIPx1ZDH4nb8zsgFy19U6K9Gim7SFeGROWlYIP9sMowtZ8lZlzaMTeDgHk2r6f51xj8FmMN9xATi5Fn7RgRPUDJTJt6ocLbOiDGHNLfDKEOUGGd2wFkovunkpSXSXkNd8x',
}

