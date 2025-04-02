/**
 * Product API Route
 * 
 * Mock API endpoint to fetch products with filtering, sorting, and pagination.
 * This will be replaced with a real Supabase implementation later.
 */

import { NextRequest, NextResponse } from 'next/server';
import { 
  getBestSellerProducts, 
  getFeaturedProducts, 
  getNewProducts, 
  getProductsByCategory,
  products as allProducts
} from '@/lib/products';

// Sample product data
const products = [
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
 * GET handler for product data
 */
export async function GET(request: NextRequest) {
  // Get URL parameters
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const sort = searchParams.get('sort') || 'newest';
  const category = searchParams.get('category') || undefined;
  const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined;
  const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined;
  const search = searchParams.get('search') || undefined;
  const inStock = searchParams.get('inStock') === 'true';
  const featured = searchParams.get('featured') === 'true';
  
  // Filter products
  let filteredProducts = [...products];
  
  if (featured) {
    filteredProducts = filteredProducts.filter(product => product.featured);
  }
  
  if (category) {
    filteredProducts = filteredProducts.filter(product => product.category === category);
  }
  
  // Sort products
  if (sort === 'newest') {
    // For demo, we'll just use the current order
  } else if (sort === 'price-low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }
  
  // Paginate
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  
  // Add a small delay to simulate network latency
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return NextResponse.json({
    products: paginatedProducts,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(filteredProducts.length / limit),
      totalProducts: filteredProducts.length
    }
  });
} 