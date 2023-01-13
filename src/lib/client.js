import sanityClient from '@sanity/client';

export default sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: true,
  apiVersion: '2021-10-21',
  token: process.env.SANITY_TOKEN,
});
