import { ProductDetail } from '@/components/features/products/ProductDetail';
import { getProductById, getProductsByCategory } from '@/lib/products';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Detail Example | Twistly CBD',
  description: 'Example product detail page showcasing the ProductDetail component.',
};

export default function ProductDetailExample() {
  // Get a featured product from the health category
  const product = getProductById('full-spectrum-cbd-oil');
  
  // Get related products from the same category
  const relatedProducts = getProductsByCategory('health')
    .filter(p => p.id !== product?.id)
    .slice(0, 4);
  
  if (!product) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p>Sorry, the example product could not be loaded.</p>
      </div>
    );
  }
  
  return (
    <main>
      <div className="container mx-auto p-4 sm:p-6 md:p-8 bg-white">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Product Detail Example</h1>
          <p className="text-gray-600">
            This page demonstrates the ProductDetail component in action with a real product.
          </p>
        </div>
      </div>
      
      <ProductDetail product={product} relatedProducts={relatedProducts} />
    </main>
  );
} 