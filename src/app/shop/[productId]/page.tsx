'use client'

import React from 'react'
import { getProductById, getBestSellerProducts } from '@/lib/products'
import { ProductDetail } from '@/components/features/products/product-detail'
import { ProductCard } from '@/components/features/products/product-card'

export default function ProductPage({ params }: { params: { productId: string } }) {
  // Unwrap params with React.use() to fix hydration error
  const unwrappedParams = React.use(params);
  const productId = unwrappedParams.productId;
  
  const product = getProductById(productId)
  const relatedProducts = getBestSellerProducts(4)
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <a
          href="/shop"
          className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-green-700 hover:bg-green-800 focus:shadow-outline focus:outline-none"
        >
          Back to Shop
        </a>
      </div>
    )
  }

  return (
    <>
      <ProductDetail product={product} relatedProducts={relatedProducts} />
      
      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </>
  )
} 