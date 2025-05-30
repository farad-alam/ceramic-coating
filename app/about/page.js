import Image from 'next/image';

export const metadata = {
  title: 'About Us - CeramicPro',
  description: 'Learn about CeramicPro, your trusted source for ceramic coating information, guides, and maintenance tips for car owners.',
};

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-8 sm:px-6 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">About Us</h1>
        <p className="mt-2 text-muted-foreground">
          Your trusted source for ceramic coating information
        </p>
      </div>
      
      <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
        <div>
          <div className="relative h-72 w-full overflow-hidden rounded-lg sm:h-80 md:h-96">
            <Image
              src="https://images.pexels.com/photos/3807333/pexels-photo-3807333.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Professional car detailer applying ceramic coating"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
        
        <div>
          <h2 className="mb-4 text-2xl font-bold">Our Mission</h2>
          <p className="mb-4 text-muted-foreground">
            At CeramicPro, our mission is to provide car owners with accurate, practical, and trustworthy information about ceramic coating technology. We believe that every vehicle deserves the best protection possible, and we're committed to helping you make informed decisions about your car's care.
          </p>
          <p className="text-muted-foreground">
            Founded by a team of automotive enthusiasts and professional detailers, we combine technical expertise with real-world experience to deliver content that's both informative and accessible to everyone from DIY beginners to seasoned professionals.
          </p>
        </div>
      </div>
      
      <div className="mt-12 grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
        <div className="order-2 md:order-1">
          <h2 className="mb-4 text-2xl font-bold">What We Offer</h2>
          <p className="mb-4 text-muted-foreground">
            Our website serves as a comprehensive resource for everything related to ceramic coatings. Whether you're looking for step-by-step application guides, troubleshooting advice, product comparisons, or maintenance tips, we've got you covered.
          </p>
          <p className="text-muted-foreground">
            We take pride in our commitment to accuracy and detail. All our articles are thoroughly researched, fact-checked, and regularly updated to reflect the latest developments in ceramic coating technology. We're not just sharing information—we're sharing knowledge that can help you protect your investment for years to come.
          </p>
        </div>
        
        <div className="order-1 md:order-2">
          <div className="relative h-72 w-full overflow-hidden rounded-lg sm:h-80 md:h-96">
            <Image
              src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Ceramic coated car with water beading"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
      
      <div className="mt-16">
        <h2 className="mb-6 text-center text-2xl font-bold">Our Values</h2>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-3 text-lg font-semibold">Accuracy</h3>
            <p className="text-muted-foreground">
              We ensure all information is thoroughly researched and verified before publication.
            </p>
          </div>
          
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-3 text-lg font-semibold">Transparency</h3>
            <p className="text-muted-foreground">
              We're honest about the benefits and limitations of ceramic coatings and related products.
            </p>
          </div>
          
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-3 text-lg font-semibold">Accessibility</h3>
            <p className="text-muted-foreground">
              We explain complex topics in clear, easy-to-understand language for all experience levels.
            </p>
          </div>
          
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-3 text-lg font-semibold">Community</h3>
            <p className="text-muted-foreground">
              We foster a supportive environment where car enthusiasts can learn and share knowledge.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-16 rounded-lg bg-muted p-8 text-center">
        <h2 className="mb-4 text-2xl font-bold">Join Our Community</h2>
        <p className="mb-6 text-muted-foreground">
          Whether you're a professional detailer, a car enthusiast, or simply someone who wants to keep their vehicle looking its best, CeramicPro is here to support you on your ceramic coating journey.
        </p>
        <p className="text-muted-foreground">
          Have questions or suggestions? We'd love to hear from you! Visit our <a href="/contact" className="text-primary hover:underline">Contact Us</a> page to get in touch.
        </p>
      </div>
    </main>
  );
}