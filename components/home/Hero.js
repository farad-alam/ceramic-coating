import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-background py-12 sm:py-16 lg:py-20">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60">
        <Image
          src="https://images.pexels.com/photos/3807329/pexels-photo-3807329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Ceramic coating application"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      <div className="container relative mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Your Ultimate Guide to <span className="text-primary">Ceramic Coating</span>
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Expert advice, step-by-step guides, and professional tips to help you protect 
            your vehicle with the most advanced coating technology available.
          </p>
          
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/articles"
              className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-center text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Browse Articles
            </Link>
            
            <Link
              href="/categories"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-5 py-2.5 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Explore Categories
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}