'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // For demo purposes, just show success message
    // In a real app, you would send this to your API
    setSubmitted(true);
    setError('');
  };
  
  if (submitted) {
    return (
      <div className="rounded-lg bg-primary/10 p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
          <Check className="h-6 w-6 text-primary-foreground" />
        </div>
        <h3 className="mb-2 text-xl font-semibold">Thank You!</h3>
        <p className="text-muted-foreground">
          You've been successfully subscribed to our newsletter.
        </p>
      </div>
    );
  }
  
  return (
    <div className="rounded-lg bg-muted p-8">
      <div className="mx-auto max-w-md text-center">
        <h3 className="mb-2 text-xl font-semibold">Stay Updated</h3>
        <p className="mb-6 text-muted-foreground">
          Subscribe to our newsletter for the latest ceramic coating tips, guides, and product reviews.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              required
            />
            <button
              type="submit"
              className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Subscribe
            </button>
          </div>
          
          {error && (
            <p className="mt-2 text-sm text-destructive">{error}</p>
          )}
          
          <p className="mt-3 text-xs text-muted-foreground">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      </div>
    </div>
  );
}