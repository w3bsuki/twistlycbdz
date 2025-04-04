import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-8">Sorry, the page you are looking for does not exist.</p>
        <Link 
          href="/" 
          className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-md transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
} 