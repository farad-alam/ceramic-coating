import { getAllArticles } from '@/lib/articles';
import ArticleList from '@/components/article/ArticleList';

export const metadata = {
  title: 'All Articles - CeramicPro',
  description: 'Browse our complete collection of articles about ceramic coating, including application guides, maintenance tips, and troubleshooting advice.',
};

export default async function ArticlesPage() {
  const articles = await getAllArticles();
  console.log(articles);
  
  return (
    <main className="container mx-auto px-4 py-8 sm:px-6 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">All Articles</h1>
        <p className="mt-2 text-muted-foreground">
          Browse our complete collection of ceramic coating guides and resources
        </p>
      </div>
      
      <ArticleList articles={articles} columns={3} />
    </main>
  );
}