import { notFound } from 'next/navigation';
import { getCategoryBySlug, getAllCategories } from '@/lib/categories';
import {
  getAllCategoriesServer,
  getCategoryBySlugServer,
} from "@/lib/categories.server";
import { getArticlesByCategory } from '@/lib/articles';
import ArticleList from '@/components/article/ArticleList';


// Generate static params for all categories
export async function generateStaticParams() {
  const categories = await getAllCategoriesServer();

  return categories.map((category) => ({
    slug: `${category.slug}`,
  }));
}

// Generate metadata for each category page
export async function generateMetadata({ params }) {
  const category = await getCategoryBySlugServer(params.slug);
  
  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found.',
    };
  }
  
  return {
    title: `${category.name} - CeramicPro`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }) {
  const category = await getCategoryBySlugServer(params.slug);
  
  if (!category) {
    notFound();
  }
  
  const articles = await getArticlesByCategory(category.id);
  
  return (
    <main className="container mx-auto px-4 py-8 sm:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{category.name}</h1>
        <p className="mt-2 text-muted-foreground">{category.description}</p>
      </div>
      
      {articles.length > 0 ? (
        <ArticleList articles={articles} columns={3} />
      ) : (
        <p className="text-center text-muted-foreground">No articles found in this category.</p>
      )}
    </main>
  );
}