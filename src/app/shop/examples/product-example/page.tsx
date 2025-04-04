import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Product Example | Twistly CBD',
  description: 'View our product example and see how we showcase our CBD products.',
};

// This is a simple placeholder example product
const exampleProduct = {
  id: 'example-product',
  name: 'CBD Oil Tincture',
  description: 'Our premium CBD oil tincture is perfect for daily wellness support.',
  price: 49.99,
  discountPrice: 39.99,
  rating: 4.5,
  reviewCount: 127,
  image: '/images/products/placeholder.jpg',
  discount: 20,
  new: true,
  category: 'wellness'
};

export default function ProductExamplePage() {  
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Product Example</h1>
        <p className="text-gray-600 mb-4">
          This is an example of how our product detail page looks.
        </p>
        
        <div className="flex flex-wrap gap-4 mb-8">
          <Button asChild variant="outline">
            <Link href="/shop">Back to Shop</Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="bg-gray-100 relative rounded-lg overflow-hidden aspect-square flex items-center justify-center p-8">
          <div className="relative h-full w-full">
            <Image
              src="/images/products/placeholder.jpg"
              alt={exampleProduct.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
              priority
            />
          </div>
          
          {exampleProduct.discount && (
            <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              {exampleProduct.discount}% OFF
            </span>
          )}
          
          {exampleProduct.new && (
            <span className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              NEW
            </span>
          )}
        </div>
        
        {/* Product Details */}
        <div>
          <h2 className="text-2xl font-bold mb-2">{exampleProduct.name}</h2>
          
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={16}
                className={i < Math.floor(exampleProduct.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}
              />
            ))}
            <span className="text-sm text-gray-500 ml-2">({exampleProduct.reviewCount} reviews)</span>
          </div>
          
          <div className="flex items-baseline gap-2 mb-4">
            {exampleProduct.discountPrice ? (
              <>
                <span className="text-2xl font-bold">${exampleProduct.discountPrice.toFixed(2)}</span>
                <span className="text-gray-500 text-lg line-through">${exampleProduct.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-2xl font-bold">${exampleProduct.price.toFixed(2)}</span>
            )}
          </div>
          
          <p className="text-gray-700 mb-6">{exampleProduct.description}</p>
          
          <div className="space-y-4">
            <Button className="w-full" size="lg">Add to Cart</Button>
            <Button variant="outline" className="w-full" size="lg">Buy Now</Button>
          </div>
        </div>
      </div>
    </main>
  );
} 