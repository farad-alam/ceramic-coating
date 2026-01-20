/**
 * Article data utility functions
 */

import { client, urlForImage } from './sanity';

const articleURL =
  "https://raw.githubusercontent.com/farad-alam/ceramic-coating/refs/heads/main/public/articles.json";

// Helper to normalize Sanity posts
function normalizeSanityPost(post) {
  try {
    return {
      id: post._id,
      title: post.title,
      slug: post.slug.current,
      excerpt: post.excerpt || "", // Fallback if no excerpt
      content: post.body,
      publishDate: post.publishedAt || new Date().toISOString(), // Fallback date
      featuredImage: post.mainImage ? urlForImage(post.mainImage).url() : null,
      categories: post.categories ? post.categories.map(cat => {
        // Handle if it's just a string (legacy/edge case) or an object (new)
        if (typeof cat === 'string') return { title: cat, slug: null };
        return { title: cat.title, slug: cat.slug || null };
      }) : [],
      tags: post.tags || [],
      authorId: post.author?._ref || "admin",
      metadata: post.metadata || null,
      source: 'sanity',
      readTime: "5 min read"
    };
  } catch (err) {
    console.error("Error normalizing Sanity post:", post._id, err);
    return null; // Return null so we can filter it out later
  }
}

// Get all articles
export async function getAllArticles() {
  try {
    // Fetch JSON articles
    const jsonPromise = fetch(articleURL, { next: { revalidate: 3600 } }).then(res => res.json());

    // Fetch Sanity articles (exclude drafts)
    const sanityPromise = client.fetch(`*[_type == "post" && !(_id in path("drafts.**"))]{
      _id,
      title,
      slug,
      excerpt,
      body,
      publishedAt,
      mainImage,
      "categories": categories[]->{title, "slug": slug.current},
      tags,
      author,
      metadata {
        description
      }
    }`);

    const [jsonData, sanityData] = await Promise.all([jsonPromise, sanityPromise]);

    // console.log('Fetched Sanity Data:', JSON.stringify(sanityData, null, 2));

    const validSanityPosts = Array.isArray(sanityData)
      ? sanityData.map(normalizeSanityPost).filter(Boolean)
      : [];
    const validJsonArticles = Array.isArray(jsonData.articles) ? jsonData.articles : [];

    const allArticles = [...validJsonArticles, ...validSanityPosts];

    // Sort by publish date (newest first)
    return allArticles.sort((a, b) =>
      new Date(b.publishDate) - new Date(a.publishDate)
    );
  } catch (error) {
    console.error('CRITICAL Error fetching articles:', error);
    if (error.source) console.error('Error Source:', error.source);
    if (error.stack) console.error('Error Stack:', error.stack);
    return [];
  }
}

// Get article by slug
export async function getArticleBySlug(slug) {
  try {
    const articles = await getAllArticles();
    return articles.find(article => article.slug === slug) || null;
  } catch (error) {
    console.error('Error finding article by slug:', error);
    return null;
  }
}

// Get related articles
export async function getRelatedArticles(currentArticle, limit = 4) {
  try {
    if (!currentArticle) return [];

    const allArticles = await getAllArticles();

    // Filter out the current article
    const otherArticles = allArticles.filter(article =>
      article.id !== currentArticle.id
    );

    // Find articles with matching categories
    const relatedByCategory = otherArticles.filter(article =>
      article.categories.some(category =>
        currentArticle.categories.includes(category)
      )
    );

    // If we have enough related by category, return those
    if (relatedByCategory.length >= limit) {
      return relatedByCategory.slice(0, limit);
    }

    // Otherwise, add more recent articles to fill the limit
    const remainingNeeded = limit - relatedByCategory.length;
    const recentArticles = otherArticles
      .filter(article => !relatedByCategory.includes(article))
      .slice(0, remainingNeeded);

    return [...relatedByCategory, ...recentArticles];
  } catch (error) {
    console.error('Error finding related articles:', error);
    return [];
  }
}

// Get articles by category
export async function getArticlesByCategory(categoryId) {
  try {
    const articles = await getAllArticles();
    return articles.filter(article =>
      article.categories.includes(categoryId)
    );
  } catch (error) {
    console.error('Error finding articles by category:', error);
    return [];
  }
}

// Get featured articles (most recent)
export async function getFeaturedArticles(limit = 3) {
  try {
    const articles = await getAllArticles();
    return articles.slice(0, limit);
  } catch (error) {
    console.error('Error getting featured articles:', error);
    return [];
  }
}

// Search articles
export async function searchArticles(query) {
  try {
    if (!query || query.trim() === '') return [];

    const articles = await getAllArticles();
    const searchTerms = query.toLowerCase().split(' ');

    return articles.filter(article => {
      const titleMatch = searchTerms.some(term =>
        article.title.toLowerCase().includes(term)
      );

      const contentMatch = searchTerms.some(term =>
        article.content.toLowerCase().includes(term)
      );

      const tagMatch = article.tags && searchTerms.some(term =>
        article.tags.some(tag => tag.toLowerCase().includes(term))
      );

      return titleMatch || contentMatch || tagMatch;
    });
  } catch (error) {
    console.error('Error searching articles:', error);
    return [];
  }
}