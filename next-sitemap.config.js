/** @type {import('next-sitemap').IConfig} */
// const blogPost = require("./public/posts/blogPosts");
module.exports = {
  siteUrl: "https://ceramic-coating-neon.vercel.app",
  generateRobotsTxt: true,
  transform: async (config, path) => {
    return {
      loc: path, // generated url
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: 0.8,
    };
  },
  additionalPaths: async (config) => {
    // 🔥 Fetch dynamic routes (e.g., blog posts)
    const res = await fetch(
      "https://raw.githubusercontent.com/farad-alam/ceramic-coating/refs/heads/main/public/articles.json"
    ); // Replace with your API endpoint
    const posts = await res.json(); // Must return array like [{ slug: 'baby-care' }, ...]

    return posts.articles.map((post) => {
      return {
        loc: `${config.siteUrl}/${post.slug}`,
        changefreq: "weekly",
        priority: 0.9,
        lastmod: new Date().toISOString(),
      };
    });
  },
};
