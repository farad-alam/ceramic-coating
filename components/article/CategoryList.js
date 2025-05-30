import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function CategoryList({ categories = [], className }) {
  if (!categories || categories.length === 0) {
    return null;
  }
  
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.slug}`}
          className="rounded-full border bg-card px-3 py-1 text-sm hover:bg-primary/10 hover:text-primary"
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}