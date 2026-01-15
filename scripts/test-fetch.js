
const { createClient } = require('next-sanity');
const imageUrlBuilder = require('@sanity/image-url');
console.log('DEBUG: imageUrlBuilder export:', imageUrlBuilder);

// Mock client setup (copying from lib/sanity.js adapted for Node execution)
const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-01-14',
    useCdn: false,
});

const builder = imageUrlBuilder.default(client);

function urlForImage(source) {
    return builder.image(source);
}

const articleURL = "https://raw.githubusercontent.com/farad-alam/ceramic-coating/refs/heads/main/public/articles.json";

function normalizeSanityPost(post) {
    try {
        return {
            id: post._id,
            title: post.title,
            slug: post.slug.current,
            excerpt: post.excerpt || "",
            content: post.body,
            publishDate: post.publishedAt,
            featuredImage: post.mainImage ? urlForImage(post.mainImage).url() : null,
            categories: post.categories || [],
            tags: post.tags || [],
            authorId: post.author?._ref || "admin",
            source: 'sanity',
            readTime: "5 min read"
        };
    } catch (err) {
        console.error("FAILED TO NORMALIZE POST:", post, err);
        throw err;
    }
}

async function run() {
    console.log('--- STARTING TEST ---');
    try {
        console.log('1. Fetching JSON...');
        const jsonRes = await fetch(articleURL);
        const jsonData = await jsonRes.json();
        console.log(`   > Fetched ${jsonData.articles.length} JSON articles.`);

        console.log('2. Fetching Sanity...');
        const sanityData = await client.fetch(`*[_type == "post"]{
      _id,
      title,
      slug,
      excerpt,
      body,
      publishedAt,
      mainImage,
      "categories": categories[]->title,
      tags,
      author
    }`);
        console.log(`   > Fetched ${sanityData.length} Sanity posts.`);

        console.log('3. Normalizing...');
        const validSanityPosts = sanityData.map(normalizeSanityPost);
        console.log('   > Normalization SUCCESS.');

        console.log('Sample Sanity Article:', JSON.stringify(validSanityPosts[0], null, 2));

    } catch (error) {
        console.error('CRITICAL TEST ERROR:', error);
    }
    console.log('--- END TEST ---');
}

run();
