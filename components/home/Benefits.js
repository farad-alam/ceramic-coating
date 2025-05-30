import { Shield, DropletIcon, Clock, Coins } from 'lucide-react';

const benefits = [
  {
    icon: <Shield className="h-10 w-10 text-primary" />,
    title: 'Superior Protection',
    description:
      'Ceramic coatings provide unmatched protection against UV rays, oxidation, chemicals, and environmental contaminants.',
  },
  {
    icon: <DropletIcon className="h-10 w-10 text-primary" />,
    title: 'Hydrophobic Properties',
    description:
      'Water beads and rolls off easily, taking dirt with it for a self-cleaning effect that keeps your vehicle cleaner longer.',
  },
  {
    icon: <Clock className="h-10 w-10 text-primary" />,
    title: 'Long-Lasting Durability',
    description:
      'Quality ceramic coatings can last 2-5 years, providing much longer protection than traditional waxes and sealants.',
  },
  {
    icon: <Coins className="h-10 w-10 text-primary" />,
    title: 'Investment Protection',
    description:
      "Protect your vehicle's value with a coating that preserves paint quality and appearance for years to come.",
  },
];

export default function Benefits() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:py-16">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">
          Why Choose Ceramic Coating?
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
          Discover the advantages that make ceramic coating the premium choice for vehicle protection
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="flex flex-col items-center rounded-lg border bg-card p-6 text-center shadow-sm transition-all hover:shadow-md"
          >
            <div className="mb-4 rounded-full bg-primary/10 p-3">
              {benefit.icon}
            </div>
            <h3 className="mb-2 text-lg font-semibold">{benefit.title}</h3>
            <p className="text-muted-foreground">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}