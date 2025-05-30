'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllCategories } from '@/lib/categories';

const CATEGORY_IMAGES = {
  'application-removal': 'https://images.pexels.com/photos/3807338/pexels-photo-3807338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'maintenance': 'https://images.pexels.com/photos/6869083/pexels-photo-6869083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'troubleshooting': 'https://images.pexels.com/photos/6868683/pexels-photo-6868683.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'product-knowledge': 'https://images.pexels.com/photos/3806258/pexels-photo-3806258.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
};

export default function CategorySection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadCategories() {
      try {
        const allCategories = await getAllCategories();
        setCategories(allCategories);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadCategories();
  }, []);
  
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <div className="bg-muted py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Explore Categories</h2>
          <p className="mt-2 text-muted-foreground">
            Find exactly what you're looking for with our categorized content
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={CATEGORY_IMAGES[category.slug] || 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-xl font-semibold text-white">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}