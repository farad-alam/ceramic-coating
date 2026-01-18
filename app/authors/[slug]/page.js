
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllAuthors, getAuthorBySlug, getArticlesByAuthor } from "@/lib/authors";
import ArticleCard from "@/components/article/ArticleCard";

export async function generateStaticParams() {
    const authors = await getAllAuthors();
    return authors.map((author) => ({
        slug: author.slug,
    }));
}

export async function generateMetadata({ params }) {
    const author = await getAuthorBySlug(params.slug);

    if (!author) {
        return {
            title: "Author Not Found",
        };
    }

    return {
        title: `${author.name} - Author Profile | CeramicPro`,
        description: author.bio || `Read articles by ${author.name} on CeramicPro.`,
    };
}

export default async function AuthorPage({ params }) {
    const author = await getAuthorBySlug(params.slug);

    if (!author) {
        notFound();
    }

    const authorArticles = await getArticlesByAuthor(author.id);

    return (
        <main className="container mx-auto px-4 py-8 sm:px-6 md:py-12">
            {/* Author Header */}
            <div className="mb-12 flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
                <div className="mb-4 relative h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-primary/10 sm:mb-0 sm:mr-8">
                    <Image
                        src={author.avatar}
                        alt={author.name}
                        fill
                        className="object-cover"
                    />
                </div>
                <div>
                    <h1 className="text-3xl font-bold mb-2">{author.name}</h1>
                    <p className="text-muted-foreground text-lg mb-4 max-w-2xl">
                        {author.bio || "Content Creator at CeramicPro."}
                    </p>
                    {/* Social Links could go here if available in the author object */}
                </div>
            </div>

            <div className="border-t pt-12">
                <h2 className="text-2xl font-bold mb-8">Articles by {author.name}</h2>

                {authorArticles.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {authorArticles.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground">No articles published yet.</p>
                )}
            </div>
        </main>
    );
}
