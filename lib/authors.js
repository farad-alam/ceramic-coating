/**
 * Author data utility functions
 */

const authorURL =
  "https://raw.githubusercontent.com/farad-alam/ceramic-coating/refs/heads/main/public/authors.json";


// Get all authors
export async function getAllAuthors() {
  try {
    const response = await fetch(authorURL);
    const data = await response.json();
    return data.authors;
  } catch (error) {
    console.error('Error fetching authors:', error);
    return [];
  }
}

// Get author by ID
export async function getAuthorById(id) {
  try {
    const authors = await getAllAuthors();
    return authors.find(author => author.id === id) || null;
  } catch (error) {
    console.error('Error finding author by id:', error);
    return null;
  }
}

// Get author by slug
export async function getAuthorBySlug(slug) {
  try {
    const authors = await getAllAuthors();
    return authors.find(author => author.slug === slug) || null;
  } catch (error) {
    console.error('Error finding author by slug:', error);
    return null;
  }
}

// Get articles by author
export async function getArticlesByAuthor(authorId, allArticles) {
  try {
    if (!allArticles) {
      // If articles aren't provided, we need to fetch them
      const articlesModule = await import('./articles');
      allArticles = await articlesModule.getAllArticles();
    }
    
    return allArticles.filter(article => article.authorId === authorId);
  } catch (error) {
    console.error('Error finding articles by author:', error);
    return [];
  }
}