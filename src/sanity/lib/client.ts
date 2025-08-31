import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production', 
  token: process.env.SANITY_WRITE_TOKEN,
  ignoreBrowserTokenWarning: true, 
  withCredentials: true, 
})
