"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User } from "lucide-react";

import {
  getArticleBySlug,
  getRelatedArticles,
  getAllArticles,
} from "@/lib/articles";
import { getAuthorById } from "@/lib/authors";
import { getCategoryNamesForArticle } from "@/lib/categories";
import { formatDate } from "@/lib/utils";

import Markdown from "@/components/article/Markdown";
import ArticleSidebar from "@/components/article/ArticleSidebar";
import AuthorCard from "@/components/article/AuthorCard";

// Generate static params for all articles
export async function generateStaticParams() {
  const articles = await getAllArticles();

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Generate metadata for each article
export async function generateMetadata({ params }) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: `${article.title} | CeramicPro`,
    description: article.excerpt,
    keywords: article.tags ? article.tags.join(", ") : "",
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [
        {
          url: article.featuredImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
  };
}

export default async function ArticlePage({ params }) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const author = await getAuthorById(article.authorId);
  const relatedArticles = await getRelatedArticles(article, 4);
  const categoryNames = await getCategoryNamesForArticle(article.categories);

  return (
    <main className="container mx-auto px-4 py-8 sm:px-6 md:py-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Sidebar - For larger screens */}
        <div className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-24">
            <ArticleSidebar
              title="Related Articles"
              articles={relatedArticles.slice(0, 2)}
            />
          </div>
        </div>

        {/* Main Content */}
        <article className="lg:col-span-6">
          {/* Categories */}
          <div className="mb-4 flex flex-wrap gap-2">
            {categoryNames.map((category, index) => (
              <span
                key={index}
                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
              >
                {category}
              </span>
            ))}
          </div>

          {/* Article Title */}
          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {article.title}
          </h1>

          {/* Article Meta */}
          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(article.publishDate)}</span>
            </div>

            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{article.readTime}</span>
            </div>

            {author && (
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <Link
                  href={`/authors/${author.slug}`}
                  className="hover:text-primary hover:underline"
                >
                  {author.name}
                </Link>
              </div>
            )}
          </div>

          {/* Featured Image */}
          <div className="relative mb-8 h-64 w-full overflow-hidden rounded-lg sm:h-96">
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <Markdown content={article.content} />
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-8 border-t border-border pt-6">
              <h3 className="mb-3 text-lg font-semibold">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <Link
                    key={index}
                    href={`/tags/${tag.replace(/\s+/g, "-").toLowerCase()}`}
                    className="rounded-full bg-muted px-3 py-1 text-xs font-medium hover:bg-muted/80"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Author Card */}
          {author && (
            <div className="mt-8 border-t border-border pt-6">
              <h3 className="mb-3 text-lg font-semibold">About the Author</h3>
              <AuthorCard author={author} />
            </div>
          )}

          {/* Mobile Related Articles */}
          <div className="mt-8 border-t border-border pt-6 lg:hidden">
            <h3 className="mb-3 text-lg font-semibold">Related Articles</h3>
            <ArticleSidebar articles={relatedArticles} />
          </div>
        </article>

        {/* Right Sidebar - For larger screens */}
        <div className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-24">
            <ArticleSidebar
              title="More to Read"
              articles={relatedArticles.slice(2)}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
