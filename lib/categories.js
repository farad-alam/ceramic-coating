/**
 * Category data utility functions
 */

const categoriURL =
  "https://raw.githubusercontent.com/farad-alam/ceramic-coating/refs/heads/main/public/categories.json";

// Get all categories
export async function getAllCategories() {
  try {
    const response = await fetch(categoriURL);
    const data = await response.json();
    return data.categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}


// Get category by ID
export async function getCategoryById(id) {
  try {
    const categories = await getAllCategories();
    return categories.find(category => category.id === id) || null;
  } catch (error) {
    console.error('Error finding category by id:', error);
    return null;
  }
}

// Get category by slug
export async function getCategoryBySlug(slug) {
  try {
    const categories = await getAllCategories();
    return categories.find(category => category.slug === slug) || null;
  } catch (error) {
    console.error('Error finding category by slug:', error);
    return null;
  }
}

// Get category names for article display
export async function getCategoryNamesForArticle(categoryIds) {
  try {
    if (!categoryIds || !Array.isArray(categoryIds)) return [];
    
    const categories = await getAllCategories();
    return categoryIds.map(id => {
      const category = categories.find(cat => cat.id === id);
      return category ? category.name : '';
    }).filter(name => name !== '');
  } catch (error) {
    console.error('Error getting category names:', error);
    return [];
  }
}