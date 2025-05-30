import Hero from '@/components/home/Hero';
import FeaturedArticles from '@/components/home/FeaturedArticles';
import CategorySection from '@/components/home/CategorySection';
import Benefits from '@/components/home/Benefits';
import NewsletterSignup from '@/components/home/NewsletterSignup';

export const metadata = {
  title: 'CeramicPro - Your Ultimate Guide to Ceramic Coating',
  description: 'Expert advice, step-by-step guides, and professional tips to help you protect your vehicle with ceramic coating technology.',
  keywords: 'ceramic coating, car protection, paint protection, ceramic pro, auto detailing, car care',
};

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedArticles />
      <Benefits />
      <CategorySection />
      
      <section className="container mx-auto px-4 py-12 sm:px-6 lg:py-16">
        <NewsletterSignup />
      </section>
    </main>
  );
}