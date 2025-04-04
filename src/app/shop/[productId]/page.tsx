import { Metadata } from 'next';
import { getProductById, getProductsByCategory, getBestSellerProducts } from '@/lib/products';
import { ProductDetail } from '@/components/features/products/ProductDetail';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

interface ProductPageProps {
  params: {
    productId: string;
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  try {
    const productId = params.productId;
    
    const product = await getProductById(productId);
    
    if (!product) {
      return {
        title: 'Product Not Found | Twistly CBD',
        description: 'The requested product could not be found.',
      };
    }
    
    return {
      title: `${product.name} | Twistly CBD`,
      description: product.description,
      openGraph: {
        title: `${product.name} | Twistly CBD`,
        description: product.description,
        images: [
          {
            url: product.image,
            width: 1200,
            height: 630,
            alt: product.name,
          },
        ],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Product Details | Twistly CBD',
      description: 'View our premium CBD products.',
    };
  }
}

function ProductSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="h-6 w-32 bg-gray-200 rounded mb-6"></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="aspect-square bg-gray-200 rounded-lg"></div>
        <div className="space-y-4">
          <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
          <div className="flex space-x-2">
            <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
            <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
            <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
            <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
            <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
          </div>
          <div className="h-7 w-24 bg-gray-200 rounded"></div>
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
          <div className="flex space-x-3">
            <div className="h-10 w-full bg-gray-200 rounded-md"></div>
            <div className="h-10 w-10 bg-gray-200 rounded-md"></div>
            <div className="h-10 w-10 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function ProductPageContent({ productId }: { productId: string }) {
  try {
    const product = await getProductById(productId);
    
    if (!product) {
      notFound();
    }
    
    // Get related products from the same category
    let relatedProducts = await getProductsByCategory(product.category);
    relatedProducts = relatedProducts.filter(p => p.id !== product.id);
    
    // If not enough related products in the same category, add some bestsellers
    if (relatedProducts.length < 4) {
      const bestsellers = await getBestSellerProducts(4);
      const filteredBestsellers = bestsellers.filter(p => 
        p.id !== product.id && !relatedProducts.some(rp => rp.id === p.id)
      );
      relatedProducts = [...relatedProducts, ...filteredBestsellers].slice(0, 4);
    } else {
      relatedProducts = relatedProducts.slice(0, 4);
    }
    
    return <ProductDetail product={product} relatedProducts={relatedProducts} />;
  } catch (error) {
    console.error('Error fetching product:', error);
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Product</h2>
        <p className="text-gray-600 mb-6">We encountered an issue while loading this product. Please try again later.</p>
        <a href="/shop" className="inline-flex items-center justify-center rounded-md bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300">
          Return to Shop
        </a>
      </div>
    );
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const productId = params.productId;
  
  return (
    <main>
      <Suspense fallback={<ProductSkeleton />}>
        <ProductPageContent productId={productId} />
      </Suspense>
    </main>
  );
} 