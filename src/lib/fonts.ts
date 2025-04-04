import { Inter } from 'next/font/google'

// Define the Inter font with proper caching and performance settings
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Use 'swap' to ensure text remains visible during font loading
  variable: '--font-sans',
  preload: true,
  fallback: ['system-ui', 'Arial', 'sans-serif'],
  adjustFontFallback: true,
  weight: ['400', '500', '600', '700'], // Only load the weights we need
}) 