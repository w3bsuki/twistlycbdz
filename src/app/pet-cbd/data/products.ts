import { ProductItem } from '@/components/shared/category/CategoryFeaturedProducts';

// Pet CBD products
export const petProducts: ProductItem[] = [
  {
    id: "dog-cbd-oil",
    name: "Calming CBD Oil for Dogs",
    strength: "300mg CBD",
    image: "/images/logos/1.png",
    price: "$44.99",
    rating: 4.9,
    reviews: 145,
    description: "Soothing formula to reduce anxiety and promote relaxation in dogs",
    benefits: ["Reduces anxiety", "Calms hyperactivity", "Eases noise phobias"],
    badgeColor: "bg-amber-600",
    featured: true
  },
  {
    id: "joint-treats",
    name: "Joint Support CBD Treats",
    strength: "5mg CBD/treat",
    image: "/images/logos/1.png",
    price: "$34.99",
    rating: 4.8,
    reviews: 117,
    description: "Delicious treats formulated for aging pets with joint discomfort",
    benefits: ["Supports mobility", "Eases joint pain", "Improves quality of life"],
    badgeColor: "bg-amber-600",
    featured: true
  },
  {
    id: "multi-pet-spray",
    name: "Multi-Pet CBD Spray",
    strength: "200mg CBD",
    image: "/images/logos/1.png",
    price: "$39.99",
    rating: 4.7,
    reviews: 98,
    description: "Easy-to-use spray for cats, dogs and other small pets",
    benefits: ["Versatile formula", "Easy application", "Fast absorption"],
    badgeColor: "bg-amber-700",
    featured: true
  },
  {
    id: "cat-drops",
    name: "Feline Comfort CBD Drops",
    strength: "150mg CBD",
    image: "/images/logos/1.png",
    price: "$32.99",
    rating: 4.6,
    reviews: 84,
    description: "Specially formulated for cats with a mild flavor they love",
    benefits: ["Cat-specific", "Stress reduction", "Supports older cats"],
    badgeColor: "bg-amber-500",
    featured: true
  },
  {
    id: "senior-pet",
    name: "Senior Pet Wellness CBD",
    strength: "500mg CBD",
    image: "/images/logos/1.png",
    price: "$54.99",
    rating: 4.8,
    reviews: 103,
    description: "Higher strength formula for aging pets with multiple needs",
    benefits: ["Comprehensive care", "Anti-inflammatory", "Supports vitality"],
    badgeColor: "bg-amber-800",
    featured: false
  }
]; 