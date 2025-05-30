import { useState, useEffect } from 'react';
import ArticleList from '@/components/article/ArticleList';
import { searchArticles } from '@/lib/articles';

export default function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function performSearch() {
      setLoading(true);
      if (!query || query.trim() === '') {
        setResults([]);
        setLoading(false);
        return;
      }
      
      const searchResults = await searchArticles(query);
      setResults(searchResults);
      setLoading(false);
    }
    
    performSearch();
  }, [query]);
  
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!query || query.trim() === '') {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-muted-foreground">Please enter a search term to find articles.</p>
      </div>
    );
  }
  
  if (results.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-muted-foreground">No articles found matching "{query}".</p>
        <p className="mt-2 text-muted-foreground">Try different keywords or browse our categories.</p>
      </div>
    );
  }
  
  return (
    <div>
      <p className="mb-6 text-muted-foreground">
        Found {results.length} article{results.length === 1 ? '' : 's'} matching "{query}":
      </p>
      <ArticleList articles={results} columns={3} />
    </div>
  );
}