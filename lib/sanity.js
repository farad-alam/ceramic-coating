import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-14',
  useCdn: false,
})

let builder
try {
  // Defensive builder creation
  builder = imageUrlBuilder(client)
} catch (e) {
  // If default export fails, try named export or .default access if generic object
  if (imageUrlBuilder && typeof imageUrlBuilder.default === 'function') {
    builder = imageUrlBuilder.default(client)
  } else if (imageUrlBuilder && typeof imageUrlBuilder.createImageUrlBuilder === 'function') {
    builder = imageUrlBuilder.createImageUrlBuilder(client)
  }
}

export function urlForImage(source) {
  if (!builder) {
    console.warn('Sanity Image Builder is NOT initialized. Source:', source);
    return { url: () => null }
  }
  return builder.image(source)
}
