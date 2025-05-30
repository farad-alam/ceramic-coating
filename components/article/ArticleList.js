"use client";

import { useEffect, useState } from "react";
import ArticleCard from "@/components/article/ArticleCard";
import { getAllCategories } from "@/lib/categories";

export default function ArticleList({ articles = [], columns = 3 }) {
  const [articleData, setArticleData] = useState(articles);
  const [categories, setCategories] = useState({});

  useEffect(() => {
    async function fetchCategories() {
      const categoryList = await getAllCategories();
      const categoryMap = {};
      categoryList.forEach((cat) => {
        categoryMap[cat.id] = cat;
      });
      setCategories(categoryMap);
    }

    fetchCategories();
  }, []);

  if (!articles || articles.length === 0) {
    return (
      <p className="text-center text-muted-foreground">No articles found.</p>
    );
  }

  const columnClass =
    {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    }[columns] || "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  // Function to get category names for an article
  const getCategoryNames = (categoryIds) => {
    if (!categoryIds || !Array.isArray(categoryIds)) return [];

    return categoryIds
      .map((id) => {
        const category = categories[id];
        return category ? category.name : "";
      })
      .filter((name) => name !== "");
  };

  return (
    <div className={`grid gap-6 ${columnClass}`}>
      {articles.map((article) => {
        // Add category names to article for display
        const enrichedArticle = {
          ...article,
          categoryNames: getCategoryNames(article.categories),
        };

        return <ArticleCard key={article.id} article={enrichedArticle} />;
      })}
    </div>
  );
}
