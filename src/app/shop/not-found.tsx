import Link from 'next/link'

export default function ShopNotFound() {
  return (
    <div className="container mx-auto px-4 py-24 flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Product Not Found</h1>
        <p className="text-lg mb-8">Sorry, the product you are looking for does not exist or has been removed.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link 
            href="/shop" 
            className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-md transition-colors"
          >
            Return to Shop
          </Link>
          <Link 
            href="/" 
            className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-md transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
} 