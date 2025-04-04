export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: string[];
  image: string;
  category: 'health' | 'beauty' | 'sport' | 'hybrid' | 'pet';
  tags: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  featured?: boolean;
  bestSeller?: boolean;
  new?: boolean;
  discount?: number;
  slug?: string;
  details: {
    size: string;
    concentration: string;
    ingredients: string[];
    usage: string;
    benefits: string[];
    forWho?: string;
    dosage?: string;
    usageTime?: string;
    additionalInfo?: string;
  };
} 