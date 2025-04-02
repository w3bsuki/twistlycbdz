import { ProductItem } from '@/components/shared/category/CategoryFeaturedProducts';

// Health products data
export const healthProducts: ProductItem[] = [
  {
    id: 'full-spectrum-oil',
    name: "Full Spectrum CBD Oil",
    strength: "1000mg CBD",
    image: "/images/logos/1.png",
    price: "$49.99",
    rating: 4.8,
    reviews: 124,
    description: "Our premium full-spectrum CBD oil for daily wellness support",
    benefits: ["Stress relief", "Balance", "Wellness"],
    badgeColor: "bg-green-600",
    featured: true
  },
  {
    id: 'broad-spectrum-oil',
    name: "Broad Spectrum CBD Oil",
    strength: "750mg CBD",
    image: "/images/logos/1.png",
    price: "$39.99",
    rating: 4.7,
    reviews: 98,
    description: "THC-free broad spectrum formula for balanced wellness",
    benefits: ["THC-free", "Clarity", "Focus"],
    badgeColor: "bg-blue-600",
    featured: true
  },
  {
    id: 'sleep-formula',
    name: "Sleep CBD Formula",
    strength: "1500mg CBD",
    image: "/images/logos/1.png",
    price: "$59.99",
    rating: 4.9,
    reviews: 156,
    description: "Enhanced with melatonin and CBN for better sleep quality",
    benefits: ["Better sleep", "Relaxation", "Calmness"],
    badgeColor: "bg-indigo-600",
    featured: true
  },
  {
    id: 'wellness-plus',
    name: "Wellness Plus CBD",
    strength: "2000mg CBD",
    image: "/images/logos/1.png",
    price: "$79.99",
    rating: 4.8,
    reviews: 87,
    description: "Our highest potency formula for maximum therapeutic benefits",
    benefits: ["High potency", "Recovery", "Relief"],
    badgeColor: "bg-purple-600",
    featured: true
  },
  {
    id: 'daily-wellness',
    name: "Daily Wellness CBD",
    strength: "500mg CBD",
    image: "/images/logos/1.png",
    price: "$29.99",
    rating: 4.6,
    reviews: 112,
    description: "Perfect starter strength for CBD beginners",
    benefits: ["Gentle", "Entry level", "Daily use"],
    badgeColor: "bg-teal-600",
    featured: false
  }
]; 