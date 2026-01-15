"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export default function Markdown({ content }) {
  if (!content) return null;

  // Component to render images using Next.js Image component
  const ImageRenderer = ({ src, alt }) => {
    // Only use next/image for absolute URLs (e.g., https://...)
    if (src && src.startsWith("http")) {
      return (
        <span className="relative my-6 block h-auto w-full rounded-lg overflow-hidden">
          <Image
            src={src}
            alt={alt || "Article image"}
            width={800}
            height={500}
            className="w-full h-auto"
          />
        </span>
      );
    }

    // Fallback for relative paths or other cases
    return (
      <img src={src} alt={alt} className="my-6 max-w-full h-auto rounded-lg" />
    );
  };

  // Component to render links
  const LinkRenderer = ({ href, children }) => {
    // Use Next.js Link for internal links
    if (href && href.startsWith("/")) {
      return <Link href={href}>{children}</Link>;
    }

    // Use regular anchor tag for external links
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline"
      >
        {children}
      </a>
    );
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        img: ImageRenderer,
        a: LinkRenderer,
        h1: ({ node, ...props }) => (
          <h1
            className="mb-6 mt-8 text-3xl font-bold tracking-tight"
            {...props}
          />
        ),
        h2: ({ node, ...props }) => (
          <h2
            className="mb-4 mt-8 text-2xl font-bold tracking-tight"
            {...props}
          />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="mb-4 mt-6 text-xl font-bold" {...props} />
        ),
        h4: ({ node, ...props }) => (
          <h4 className="mb-4 mt-6 text-lg font-semibold" {...props} />
        ),
        p: ({ node, ...props }) => (
          <p className="mb-4 leading-relaxed" {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul className="mb-4 ml-6 list-disc" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="mb-4 ml-6 list-decimal" {...props} />
        ),
        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
        blockquote: ({ node, ...props }) => (
          <blockquote
            className="mb-4 border-l-4 border-primary/50 pl-4 italic text-muted-foreground"
            {...props}
          />
        ),
        code: ({ node, ...props }) => (
          <code
            className="rounded bg-muted px-1 py-0.5 font-mono text-sm"
            {...props}
          />
        ),
        pre: ({ node, ...props }) => (
          <pre
            className="mb-4 overflow-x-auto rounded-lg bg-muted p-4 font-mono text-sm"
            {...props}
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
