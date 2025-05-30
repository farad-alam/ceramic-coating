/**
 * Article data utility functions
 */

// Get all articles
export async function getAllArticles() {
  try {
    const response = await fetch('/articles.json');
    const data = await response.json();
    
    // Sort by publish date (newest first)
    return data.articles.sort((a, b) => 
      new Date(b.publishDate) - new Date(a.publishDate)
    );
  } catch (error) {
    console.error('Error fetching articles:', error);
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