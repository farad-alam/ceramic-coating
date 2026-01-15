import { PortableText } from '@portabletext/react';
import { client } from '@/lib/sanity';
import Image from 'next/image';
import { urlForImage } from '@/lib/sanity';

// Component to render images from Sanity
const SampleImageComponent = ({ value, isInline }) => {
    const { width, height } = value;
    const imageUrl = urlForImage(value).url();

    if (!imageUrl) return null;

    return (
        <div className="my-8 relative w-full h-96">
            <Image
                src={imageUrl}
                alt={value.alt || 'Article image'}
                fill
                className="object-cover rounded-lg"
            />
        </div>
    );
};

const components = {
    types: {
        image: SampleImageComponent,
    },
    marks: {
        link: ({ children, value }) => {
            const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
            return (
                <a href={value.href} rel={rel} className="text-primary hover:underline">
                    {children}
                </a>
            );
        },
    },
    block: {
        // Custom styles for headings using existing prose classes
        h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
        h2: ({ children }) => <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>,
        h3: ({ children }) => <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>,
        h4: ({ children }) => <h4 className="text-lg font-bold mt-4 mb-2">{children}</h4>,
        blockquote: ({ children }) => <blockquote className="border-l-4 border-primary pl-4 italic my-4">{children}</blockquote>,
        normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
    },
    list: {
        bullet: ({ children }) => <ul className="list-disc pl-5 mb-4 space-y-2">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal pl-5 mb-4 space-y-2">{children}</ol>,
    },
};

export default function PortableTextRenderer({ content }) {
    return (
        <div className="portable-text-content">
            <PortableText value={content} components={components} />
        </div>
    );
}
