import fs from "fs";
import path from "path";

export async function getAllArticlesServer() {
  try {
    const filePath = path.join(process.cwd(), "public", "articles.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContents);

    // Sort by publish date (newest first)
    return data.articles.sort(
      (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
    );
  } catch (error) {
    console.error("Error reading articles.json:", error);
    return [];
  }
}
