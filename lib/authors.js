/**
 * Author data utility functions
 */

import { client, urlForImage } from './sanity';

const authorURL =
  "https://raw.githubusercontent.com/farad-alam/ceramic-coating/refs/heads/main/public/authors.json";

// Get all authors
export async function getAllAuthors() {
  try {
    const jsonPromise = fetch(authorURL).then(res => res.json());
    const sanityPromise = client.fetch(`*[_type == "author"]{
      _id,
      name,
      slug,
      image,
      bio,
      social
    }`);

    const [jsonData, sanityData] = await Promise.all([jsonPromise, sanityPromise]);

    const legacyAuthors = jsonData?.authors || [];
    const sanityAuthors = sanityData.map(author => ({
      id: author._id,
      name: author.name,
      slug: author.slug?.current || '',
      avatar: author.image ? urlForImage(author.image).url() : '/images/authors/placeholder.jpg',
      bio: author.bio ? (author.bio[0]?.children[0]?.text || '') : '',
      role: 'Content Creator', // Default role
      social: author.social || {}
    }));

    return [...legacyAuthors, ...sanityAuthors];
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