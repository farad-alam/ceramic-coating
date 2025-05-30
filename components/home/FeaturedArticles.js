'use client';

import { useState, useEffect } from 'react';
import ArticleList from '@/components/article/ArticleList';
import { getFeaturedArticles } from '@/lib/articles';

export default function FeaturedArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadArticles() {
      try {
        const featuredArticles = await getFeaturedArticles(3);
        setArticles(featuredArticles);
      } catch (error) {
        console.error('Error loading featured articles:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadArticles();
  }, []);
  
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:py-16">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">Featured Articles</h2>
        <p className="mt-2 text-muted-foreground">
          The latest insights and guides on ceramic coating for your vehicle
        </p>
      </div>
      
      <ArticleList articles={articles} columns={3} />
    </div>
  );
}