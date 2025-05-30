import fs from "fs";
import path from "path";

export async function getAllCategoriesServer() {
  try {
    const filePath = path.join(process.cwd(), "public", "categories.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContents);
    return data.categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}



// Get category by slug
export async function getCategoryBySlugServer(slug) {
  try {
    const categories = await getAllCategoriesServer();
    return categories.find(category => category.slug === slug) || null;
  } catch (error) {
    console.error('Error finding category by slug:', error);
    return null;
  }
}