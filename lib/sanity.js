import { createClient } from 'next-sanity'
import createImageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-14',
  useCdn: false,
})

const builder = createImageUrlBuilder(client)

export function urlForImage(source) {
  if (!builder) {
    console.warn('Sanity Image Builder is NOT initialized. Source:', source);
    return { url: () => null }
  }
  return builder.image(source)
}
