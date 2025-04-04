/**
 * Product API Route
 * 
 * Mock API endpoint to fetch products with filtering, sorting, and pagination.
 * This will be replaced with a real Supabase implementation later.
 */

import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/lib/products';

// Sample product data
const sampleProducts = [
  {
    id: '1',
    name: 'CBD Tincture - Full Spectrum',
    description: 'Our premium full-spectrum CBD oil, made with organic hemp.',
    price: 49.99,
    image: '/images/1.png',
    category: 'tinctures',
    featured: true,
    rating: 4.8,
  },
  {
    id: '2',
    name: 'CBD Gummies - 25mg',
    description: 'Delicious gummies with 25mg of CBD per serving.',
    price: 29.99,
    image: '/images/gummies.png',
    category: 'edibles',
    featured: true,
    rating: 4.7,
  },
  {
    id: '3',
    name: 'CBD Wellness Bundle',
    description: 'Complete wellness set with tincture, balm, and gummies.',
    price: 89.99,
    image: '/images/bundle.png',
    category: 'bundles',
    featured: true,
    rating: 4.9,
  },
  {
    id: '4',
    name: 'CBD Balm - Extra Strength',
    description: 'Targeted relief with our extra-strength CBD balm.',
    price: 39.99,
    image: '/images/balm.png',
    category: 'topicals',
    featured: true,
    rating: 4.6,
  },
  {
    id: '5',
    name: 'Pet CBD Oil',
    description: 'Specially formulated CBD oil for your furry friends.',
    price: 34.99,
    image: '/images/pet-oil.png',
    category: 'pets',
    featured: true,
    rating: 4.8,
  },
  {
    id: '6',
    name: 'Wellness CBD Capsules',
    description: 'Easy-to-take CBD capsules for daily wellness.',
    price: 44.99,
    image: '/images/wellness.png',
    category: 'capsules',
    featured: true,
    rating: 4.5,
  },
  {
    id: '7',
    name: 'CBD Sleep Gummies',
    description: 'CBD gummies with melatonin for better sleep.',
    price: 39.99,
    image: '/images/gummies.png',
    category: 'edibles',
    featured: false,
    rating: 4.7,
  },
  {
    id: '8',
    name: 'CBD Muscle Relief Cream',
    description: 'Fast-acting relief for sore muscles with CBD and arnica.',
    price: 49.99,
    image: '/images/balm.png',
    category: 'topicals',
    featured: false,
    rating: 4.6,
  }
];

/**
 * GET handler for products API
 * Supports filtering by category, featured, bestSeller, and new
 */
export async function GET(request: Request) {
  // Get URL parameters
  const url = new URL(request.url);
  const category = url.searchParams.get('category');
  const featured = url.searchParams.get('featured') === 'true';
  const bestSeller = url.searchParams.get('bestSeller') === 'true';
  const newProducts = url.searchParams.get('new') === 'true';
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = parseInt(url.searchParams.get('limit') || '12');
  
  console.log('API Request params:', { category, featured, bestSeller, newProducts, page, limit });
  console.log('Total products in database:', products.length);
  
  // Set up filtering
  let filteredProducts = [...products];
  
  // Apply category filter
  if (category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === category
    );
    console.log(`After category filter (${category}):`, filteredProducts.length);
  }
  
  // Apply featured filter
  if (featured) {
    filteredProducts = filteredProducts.filter(
      (product) => product.featured === true
    );
    console.log('After featured filter:', filteredProducts.length);
  }
  
  // Apply bestSeller filter
  if (bestSeller) {
    filteredProducts = filteredProducts.filter(
      (product) => product.bestSeller === true
    );
    console.log('After bestSeller filter:', filteredProducts.length);
  }
  
  // Apply new products filter
  if (newProducts) {
    filteredProducts = filteredProducts.filter(
      (product) => product.new === true
    );
    console.log('After new filter:', filteredProducts.length);
  }
  
  // Handle pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  
  // Return the filtered products with pagination info
  return NextResponse.json({
    products: paginatedProducts,
    hasMore: endIndex < filteredProducts.length,
    total: filteredProducts.length,
    page,
    limit
  });
} 