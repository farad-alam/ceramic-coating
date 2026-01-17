/** @type {import('next-sitemap').IConfig} */
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('next-sanity');

// Sanity Client Setup
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-14',
  useCdn: false,
});

module.exports = {
  siteUrl: "https://ceramic-coating-neon.vercel.app",
  generateRobotsTxt: true,
  sitemapSize: 5000, // Default is 5000. This splits 50k posts into ~10 files (sitemap-0.xml, sitemap-1.xml...)
  transform: async (config, path) => {
    return {
      loc: path, // generated url
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: 0.8,
    };
  },
  additionalPaths: async (config) => {
    const paths = [];

    // 1. Fetch JSON articles
    try {
      const res = await fetch(
        "https://raw.githubusercontent.com/farad-alam/ceramic-coating/refs/heads/main/public/articles.json"
      );
      const data = await res.json();

      if (data.articles) {
        data.articles.forEach((post) => {
          paths.push({
            loc: `${config.siteUrl}/${post.slug}`,
            changefreq: "weekly",
            priority: 0.9,
            lastmod: new Date().toISOString(),
          });
        });
      }
    } catch (error) {
      console.error("Error fetching JSON articles for sitemap:", error);
    }

    // 2. Fetch Sanity articles
    console.log("DEBUG: Sanity Project ID:", process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
    try {
      const sanityPosts = await client.fetch('*[_type == "post"] { "slug": slug.current, _updatedAt }');
      console.log(`DEBUG: Found ${sanityPosts.length} Sanity posts.`);

      sanityPosts.forEach((post) => {
        if (post.slug) {
          paths.push({
            loc: `${config.siteUrl}/${post.slug}`,
            changefreq: "weekly",
            priority: 0.9,
            // Use Sanity's update time or fallback
            lastmod: post._updatedAt || new Date().toISOString(),
          });
        }
      });
    } catch (error) {
      console.error("Error fetching Sanity articles for sitemap:", error);
    }

    return paths;
  },
};
