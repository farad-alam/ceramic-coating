import { getAllCategories } from '@/lib/categories';
import { getAllArticles } from '@/lib/articles';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Categories - CeramicPro',
  description: 'Browse ceramic coating articles by category. Find application guides, maintenance tips, troubleshooting advice, and product knowledge.',
};

const CATEGORY_IMAGES = {
  'application-removal': 'https://images.pexels.com/photos/3807338/pexels-photo-3807338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'maintenance': 'https://images.pexels.com/photos/6869083/pexels-photo-6869083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'troubleshooting': 'https://images.pexels.com/photos/6868683/pexels-photo-6868683.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'product-knowledge': 'https://images.pexels.com/photos/3806258/pexels-photo-3806258.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
};

export default async function CategoriesPage() {
  const categories = await getAllCategories();
  const articles = await getAllArticles();
  
  // Count articles per category
  const categoryCounts = {};
  articles.forEach(article => {
    if (article.categories && Array.isArray(article.categories)) {
      article.categories.forEach(categoryId => {
        categoryCounts[categoryId] = (categoryCounts[categoryId] || 0) + 1;
      });
    }
  });
  
  return (
    <main className="container mx-auto px-4 py-8 sm:px-6 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Categories</h1>
        <p className="mt-2 text-muted-foreground">
          Browse ceramic coating content by topic to find exactly what you need
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={CATEGORY_IMAGES[category.slug] || 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                <p className="mt-1 text-sm text-white/80">
                  {categoryCounts[category.id] || 0} article{categoryCounts[category.id] !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            
            <div className="p-4">
              <p className="text-muted-foreground line-clamp-2">{category.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}