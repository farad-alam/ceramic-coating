import { client } from './sanity'

export async function getSiteSettings() {
    try {
        const data = await client.fetch(`*[_type == "siteSettings"][0]{
      title,
      headerMenu,
      footerDescription,
      footerLinks,
      socialLinks
    }`, {}, { next: { revalidate: 60 } }) // Cache for 60 seconds

        return data || null
    } catch (error) {
        console.error('Error fetching site settings:', error)
        return null
    }
}
