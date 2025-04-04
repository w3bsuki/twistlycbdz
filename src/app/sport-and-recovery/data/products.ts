import { type Product } from '@/components/shared/category/types'

export const sportProducts: Product[] = [
  {
    id: "recovery-balm",
    name: "Recovery CBD Balm",
    strength: "1000mg CBD",
    image: "/images/logos/1.png",
    price: "$49.99",
    rating: 4.9,
    reviews: 134,
    description: "Fast-acting topical balm for muscle recovery and joint pain",
    benefits: ["Reduces inflammation", "Muscle recovery", "Joint support"],
    featured: true
  },
  {
    id: "sport-oil",
    name: "Sport CBD Oil",
    strength: "1500mg CBD",
    image: "/images/logos/1.png",
    price: "$59.99",
    rating: 4.8,
    reviews: 92,
    description: "High-strength CBD oil formulated for athletes and active lifestyles",
    benefits: ["Performance", "Endurance", "Recovery"],
    featured: true
  },
  {
    id: "muscle-gel",
    name: "CBD Muscle Gel",
    strength: "750mg CBD",
    image: "/images/logos/1.png",
    price: "$39.99",
    rating: 4.7,
    reviews: 78,
    description: "Cooling gel with menthol and CBD for immediate muscle relief",
    benefits: ["Cooling effect", "Fast absorption", "Targeted relief"],
    featured: true
  },
  {
    id: "sport-capsules",
    name: "CBD Sport Capsules",
    strength: "25mg x 30 caps",
    image: "/images/logos/1.png",
    price: "$44.99",
    rating: 4.6,
    reviews: 67,
    description: "Convenient daily CBD capsules with added nutrients for active individuals",
    benefits: ["Convenient", "Precise dosing", "Daily support"],
    featured: true
  },
  {
    id: "protein-powder",
    name: "CBD Protein Powder",
    strength: "500mg CBD",
    image: "/images/logos/1.png",
    price: "$54.99",
    rating: 4.5,
    reviews: 45,
    description: "Premium protein powder with added CBD for enhanced recovery",
    benefits: ["Muscle building", "Recovery", "20g protein"],
    featured: false
  }
] 