/**
 * Article data utility functions
 */

import { client, urlForImage } from './sanity';

const articleURL =
  "https://raw.githubusercontent.com/farad-alam/ceramic-coating/refs/heads/main/public/articles.json";

// Helper to generate an excerpt from content
function generateExcerpt(content, maxLength = 150) {
  if (!content) return '';
  const text = content.replace(/<[^>]*>?/gm, ''); // Remove HTML tags if any
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

// Helper to normalize Sanity posts
function normalizeSanityPost(post) {
  try {
    // Fallback for missing fields
    const content = post.body || post.content || '';

    // Heuristic: Check if Portable Text is actually just raw Markdown wrapped in blocks
    let finalContent = content;
    if (Array.isArray(content)) {
      // Check if the content looks like Markdown (starts with # or contains common markdown patterns)
      // and convert to string if so.
      const hasMarkdown = content.some(block =>
        block._type === 'block' &&
        block.children?.some(child =>
          child.text && (child.text.trim().startsWith('#') || child.text.includes('**'))
        )
      );

      if (hasMarkdown) {
        // Flatten to string
        finalContent = content
          .map(block => {
            if (block._type !== 'block' || !block.children) return '';
            return block.children.map(child => child.text).join('');
          })
          .join('\n\n');
      }
    }

    return {
      id: post._id,
      title: post.title,
      slug: post.slug?.current || '',
      excerpt: post.excerpt || generateExcerpt(typeof finalContent === 'string' ? finalContent : ''),
      content: finalContent,
      publishDate: post.publishedAt || post._createdAt || new Date().toISOString(),
      // Fallback date
      featuredImage: post.mainImage ? urlForImage(post.mainImage).url() : null,
      categories: post.categories || [],
      tags: post.tags || [],
      authorId: post.author?._ref || "admin",
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

    // Fetch Sanity articles
    const sanityPromise = client.fetch(`*[_type == "post"]{
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