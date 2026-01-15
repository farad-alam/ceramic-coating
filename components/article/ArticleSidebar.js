import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

export default function ArticleSidebar({ title, articles = [] }) {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">{title || 'Related Articles'}</h3>

      <div className="space-y-4">
        {articles.map((article) => (
          <div key={article.id} className="flex gap-3">
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
              {article.featuredImage ? (
                <Image
                  src={article.featuredImage}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-200">
                  <span className="text-[10px] text-gray-400">N/A</span>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium leading-snug line-clamp-2">
                <Link href={`/${article.slug}`} className="hover:text-primary">
                  {article.title}
                </Link>
              </h4>

              <p className="mt-1 text-xs text-muted-foreground">
                {formatDate(article.publishDate)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <Link
          href="/articles"
          className="text-sm font-medium text-primary hover:underline"
        >
          View All Articles
        </Link>
      </div>
    </div>
  );
}