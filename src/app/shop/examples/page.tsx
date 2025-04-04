import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { getFeaturedProducts, getProductsByCategory } from '@/lib/products';
import { QuickViewModal } from '@/components/features/products/QuickViewModal';

export const metadata: Metadata = {
  title: 'Product Examples | Twistly CBD',
  description: 'Browse our product examples and see the ProductDetail component in action.',
};

export default function ProductExamplesPage() {
  // Get products from different categories for variety
  const healthProducts = getProductsByCategory('health').slice(0, 3);
  const beautyProducts = getProductsByCategory('beauty').slice(0, 3);
  const sportProducts = getProductsByCategory('sport').slice(0, 3);
  const hybridProducts = getProductsByCategory('hybrid').slice(0, 3);
  
  // Combine and ensure uniqueness
  const allProducts = [...healthProducts, ...beautyProducts, ...sportProducts, ...hybridProducts];
  
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Product Examples</h1>
        <p className="text-gray-600 mb-4">
          Browse our product examples to see the ProductDetail component in action with different products.
        </p>
        
        <div className="flex flex-wrap gap-4 mb-8">
          <Button asChild variant="outline">
            <Link href="/shop/examples/product-example">View Example Product</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/shop">Back to Shop</Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden flex flex-col h-full group">
            <div className="relative h-48 bg-gray-100 flex items-center justify-center p-4">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain transition-transform duration-300 group-hover:scale-105"
              />
              
              {product.discount && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  {product.discount}% OFF
                </span>
              )}
              
              {product.new && (
                <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                  NEW
                </span>
              )}
              
              <QuickViewModal product={product} />
            </div>
            
            <CardContent className="flex-grow py-4">
              <h3 className="font-medium text-lg mb-1 line-clamp-1">{product.name}</h3>
              <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={14}
                    className={i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}
                  />
                ))}
                <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
              </div>
              
              <div className="flex items-baseline gap-2">
                {product.discountPrice ? (
                  <>
                    <span className="font-bold">${product.discountPrice.toFixed(2)}</span>
                    <span className="text-gray-500 text-sm line-through">${product.price.toFixed(2)}</span>
                  </>
                ) : (
                  <span className="font-bold">${product.price.toFixed(2)}</span>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="pt-0 pb-4">
              <div className="w-full grid grid-cols-2 gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/shop/${product.id}`}>View Details</Link>
                </Button>
                <Button asChild variant="default" size="sm">
                  <Link href={`/shop/examples/product-example`}>View Example</Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
} 