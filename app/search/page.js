'use client';

import { useSearchParams } from 'next/navigation';
import SearchResults from '@/components/article/SearchResults';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  return (
    <main className="container mx-auto px-4 py-8 sm:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Search Results</h1>
        {query && (
          <p className="mt-2 text-muted-foreground">
            Showing results for: <span className="font-medium">{query}</span>
          </p>
        )}
      </div>
      
      <SearchResults query={query} />
    </main>
  );
}