import Link from 'next/link';
import Image from 'next/image';
import { Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

export default function AuthorCard({ author, className = '' }) {
  if (!author) return null;

  const renderSocialLinks = () => {
    if (!author.socialLinks) return null;

    const icons = {
      twitter: <Twitter className="h-4 w-4" />,
      instagram: <Instagram className="h-4 w-4" />,
      linkedin: <Linkedin className="h-4 w-4" />,
      youtube: <Youtube className="h-4 w-4" />
    };

    return (
      <div className="mt-2 flex gap-2">
        {Object.entries(author.socialLinks).map(([platform, url]) => (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-1.5 text-muted-foreground hover:bg-primary/10 hover:text-primary"
            aria-label={`${author.name}'s ${platform}`}
          >
            {icons[platform]}
          </a>
        ))}
      </div>
    );
  };

  return (
    <div className={`flex flex-col items-center rounded-lg border bg-card p-4 text-center shadow-sm sm:flex-row sm:items-start sm:text-left ${className}`}>
      <div className="relative mb-3 h-16 w-16 overflow-hidden rounded-full bg-muted sm:mb-0 sm:mr-4">
        {author.avatar ? (
          <Image
            src={author.avatar}
            alt={author.name}
            fill
            className="object-cover"
            sizes="64px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary/10 text-xl font-bold text-primary">
            {author.name ? author.name.charAt(0).toUpperCase() : 'A'}
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold">
          <Link href={`/authors/${author.slug}`} className="hover:text-primary">
            {author.name}
          </Link>
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">{author.bio}</p>

        {renderSocialLinks()}
      </div>
    </div>
  );
}