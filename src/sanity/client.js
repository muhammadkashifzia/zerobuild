import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'your_project_id',  // from sanity.json or sanity.io/manage
  dataset: 'production',         // or your chosen dataset
  useCdn: true,                  // `false` if you want fresh data
  apiVersion: '2023-01-01',      // use current date or latest API version
});