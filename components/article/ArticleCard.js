import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function ArticleCard({ article, className = '' }) {
  if (!article) return null;
  
  return (
    <div className={`group overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md ${className}`}>
      <Link href={`/${article.slug}`} className="block">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>
      </Link>
      
      <div className="p-4 sm:p-6">
        <div className="mb-2 flex flex-wrap gap-2">
          {article.categories && article.categories.slice(0, 2).map((categoryId) => (
            <span 
              key={categoryId}
              className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
            >
              {/* We'll dynamically replace this with actual category names in the page component */}
              Category {categoryId}
            </span>
          ))}
        </div>
        
        <h3 className="mb-2 text-xl font-semibold leading-tight tracking-tight">
          <Link href={`/${article.slug}`} className="hover:text-primary">
            {article.title}
          </Link>
        </h3>
        
        <p className="mb-4 line-clamp-2 text-muted-foreground">
          {article.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formatDate(article.publishDate)}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{article.readTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}