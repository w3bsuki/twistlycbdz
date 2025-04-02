export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: string[];
  image: string;
  category: 'health' | 'beauty' | 'sport' | 'hybrid';
  tags: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  featured?: boolean;
  bestSeller?: boolean;
  new?: boolean;
  discount?: number;
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

export const products: Product[] = [
  {
    id: "cbd-oil-full-spectrum",
    name: "Full Spectrum CBD Oil",
    description: "Our premium full-spectrum CBD oil is crafted from organically grown hemp plants, providing a complete profile of beneficial cannabinoids and terpenes for maximum effectiveness.",
    price: 89.99,
    discountPrice: 79.99,
    images: ["/images/tincture2.png", "/images/tincture2.png", "/images/tincture2.png"],
    image: "/images/tincture2.png",
    category: "health",
    tags: ["oil", "full-spectrum", "organic", "tincture"],
    rating: 4.8,
    reviewCount: 124,
    stock: 50,
    featured: true,
    bestSeller: true,
    new: true,
    discount: 10,
    details: {
      size: "30ml",
      concentration: "1000mg CBD",
      ingredients: ["Organic Hemp Extract", "MCT Oil", "Natural Flavors", "Terpenes"],
      usage: "Place 1ml under tongue and hold for 60 seconds before swallowing. Use once or twice daily.",
      benefits: [
        "Promotes relaxation and calm",
        "Supports healthy sleep cycles",
        "Helps manage everyday stress",
        "Supports joint and muscle comfort"
      ],
      forWho: "Ideal for adults seeking natural support for everyday stress, sleep issues, or general wellness. Perfect for CBD beginners and experienced users alike.",
      dosage: "Start with 0.5ml (16.7mg CBD) and adjust as needed. Most users find 0.5-1ml (16.7-33.3mg CBD) per dose effective. Maximum daily recommendation: 3ml (100mg CBD).",
      usageTime: "Morning dose for daytime calm, evening dose for sleep support. Can be taken with or without food, though absorption may be enhanced when taken with fatty foods.",
      additionalInfo: "Full-spectrum formula contains <0.3% THC along with beneficial cannabinoids and terpenes for enhanced entourage effect. Third-party tested for purity and potency."
    }
  },
  {
    id: "cbd-wellness-drops",
    name: "CBD Wellness Drops",
    description: "A balanced blend of CBD and adaptogenic herbs for daily wellness support.",
    price: 69.99,
    discountPrice: 59.99,
    images: ["/images/tincture2.png", "/images/tincture2.png", "/images/tincture2.png"],
    image: "/images/tincture2.png",
    category: "health",
    tags: ["wellness", "drops", "daily", "adaptogenic"],
    rating: 4.7,
    reviewCount: 98,
    stock: 45,
    featured: true,
    details: {
      size: "30ml",
      concentration: "750mg CBD",
      ingredients: ["Broad Spectrum CBD", "Adaptogenic Herbs", "MCT Oil"],
      usage: "Take 1ml daily for optimal wellness support.",
      benefits: [
        "Daily wellness support",
        "Enhanced vitality",
        "Natural balance",
        "Stress management"
      ],
      forWho: "Perfect for health-conscious individuals seeking daily wellness support. Ideal for those with active lifestyles or anyone experiencing daily stress.",
      dosage: "Standard dose is 1ml (25mg CBD) daily. Can be increased to 2ml for enhanced effects. Start with lower doses if new to CBD products.",
      usageTime: "Best taken in the morning to support energy and vitality throughout the day. Can also be divided into morning and evening doses.",
      additionalInfo: "Features our unique adaptogenic blend including ashwagandha, rhodiola, and holy basil to complement CBD's effects. THC-free formula suitable for those concerned about THC exposure."
    }
  },
  {
    id: "cbd-sleep-formula",
    name: "CBD Sleep Formula",
    description: "Advanced sleep support combining CBD with melatonin and calming herbs.",
    price: 79.99,
    images: ["/images/tincture2.png", "/images/tincture2.png", "/images/tincture2.png"],
    image: "/images/tincture2.png",
    category: "health",
    tags: ["sleep", "melatonin", "relaxation"],
    rating: 4.9,
    reviewCount: 156,
    stock: 35,
    featured: true,
    details: {
      size: "30ml",
      concentration: "1000mg CBD + 3mg Melatonin",
      ingredients: ["Broad Spectrum CBD", "Melatonin", "Chamomile", "Valerian Root"],
      usage: "Take 1ml 30 minutes before bedtime.",
      benefits: [
        "Promotes restful sleep",
        "Natural sleep support",
        "Gentle formula",
        "Wake up refreshed"
      ]
    }
  },
  {
    id: "cbd-recovery-balm",
    name: "CBD Recovery Balm",
    description: "This powerful recovery balm delivers targeted relief to sore muscles and joints with a potent combination of CBD, arnica, and menthol for cooling comfort.",
    price: 54.99,
    discountPrice: 49.99,
    images: [
      "/images/products/placeholder.jpg",
      "/images/products/placeholder.jpg",
      "/images/products/placeholder.jpg"
    ],
    image: "/images/products/placeholder.jpg",
    category: "sport",
    tags: ["balm", "recovery", "muscle", "topical"],
    rating: 4.9,
    reviewCount: 156,
    stock: 42,
    bestSeller: true,
    details: {
      size: "60ml",
      concentration: "1500mg CBD",
      ingredients: ["CBD Isolate", "Shea Butter", "Coconut Oil", "Arnica Extract", "Menthol", "Lavender Oil", "Eucalyptus Oil"],
      usage: "Apply generously to affected areas and massage until absorbed. Use up to 3-4 times daily as needed.",
      benefits: [
        "Targets muscle soreness",
        "Soothes joint discomfort",
        "Cooling sensation for immediate comfort",
        "Non-greasy formula absorbs quickly"
      ]
    }
  },
  {
    id: "cbd-sleep-gummies",
    name: "CBD Sleep Gummies",
    description: "Our CBD Sleep Gummies combine premium CBD with melatonin and calming herbs to promote restful sleep and help you wake up refreshed.",
    price: 49.99,
    images: [
      "/images/products/placeholder.jpg",
      "/images/products/placeholder.jpg",
      "/images/products/placeholder.jpg"
    ],
    image: "/images/products/placeholder.jpg",
    category: "health",
    tags: ["gummies", "sleep", "melatonin", "edible"],
    rating: 4.7,
    reviewCount: 203,
    stock: 78,
    bestSeller: true,
    details: {
      size: "30 gummies",
      concentration: "25mg CBD + 2mg Melatonin per gummy",
      ingredients: ["Broad Spectrum CBD", "Melatonin", "Chamomile Extract", "Passion Flower Extract", "L-Theanine", "Natural Flavors", "Organic Cane Sugar"],
      usage: "Take 1 gummy 30-60 minutes before bedtime.",
      benefits: [
        "Promotes faster sleep onset",
        "Supports deeper, more restful sleep",
        "Helps regulate sleep cycles",
        "Non-habit forming formula"
      ]
    }
  },
  {
    id: "cbd-face-serum",
    name: "CBD Radiance Face Serum",
    description: "Lightweight serum with CBD and vitamin C for bright, glowing skin.",
    price: 69.99,
    images: ["/images/tincture2.png", "/images/tincture2.png", "/images/tincture2.png"],
    image: "/images/tincture2.png",
    category: "beauty",
    tags: ["serum", "vitamin c", "glow", "radiance"],
    rating: 4.8,
    reviewCount: 84,
    stock: 28,
    featured: true,
    details: {
      size: "30ml",
      concentration: "200mg CBD",
      ingredients: ["CBD Isolate", "Vitamin C", "Niacinamide", "Hyaluronic Acid"],
      usage: "Apply to clean face morning and evening before moisturizer.",
      benefits: [
        "Brightens complexion",
        "Evens skin tone",
        "Boosts collagen",
        "Antioxidant protection"
      ]
    }
  },
  {
    id: "cbd-beauty-oil",
    name: "CBD Beauty Elixir Oil",
    description: "Multi-purpose beauty oil for face, hair, and body.",
    price: 59.99,
    images: ["/images/tincture2.png", "/images/tincture2.png", "/images/tincture2.png"],
    image: "/images/tincture2.png",
    category: "beauty",
    tags: ["beauty", "oil", "multi-purpose"],
    rating: 4.6,
    reviewCount: 62,
    stock: 35,
    featured: true,
    details: {
      size: "50ml",
      concentration: "250mg CBD",
      ingredients: ["CBD Isolate", "Jojoba Oil", "Argan Oil", "Vitamin E"],
      usage: "Apply to face, hair, or body as needed.",
      benefits: [
        "Versatile beauty oil",
        "Nourishes skin and hair",
        "Promotes radiance",
        "Natural ingredients"
      ]
    }
  },
  {
    id: "cbd-sport-drops",
    name: "CBD Sport Performance Drops",
    description: "Formulated specifically for athletes, our Sport Performance Drops combine CBD with BCAAs and electrolytes to support recovery, endurance and optimal performance.",
    price: 74.99,
    discountPrice: 64.99,
    images: ["/images/tincture2.png", "/images/tincture2.png", "/images/tincture2.png"],
    image: "/images/tincture2.png",
    category: "sport",
    tags: ["sport", "performance", "recovery", "tincture"],
    rating: 4.7,
    reviewCount: 118,
    stock: 30,
    featured: true,
    details: {
      size: "30ml",
      concentration: "1500mg CBD",
      ingredients: ["Broad Spectrum CBD", "BCAAs", "Electrolyte Complex", "Tart Cherry Extract", "Turmeric Extract", "MCT Oil"],
      usage: "Take 1ml before or after workouts, or as needed for recovery.",
      benefits: [
        "Supports muscle recovery",
        "Enhances endurance",
        "Helps maintain electrolyte balance",
        "Promotes joint mobility"
      ]
    }
  },
  {
    id: "cbd-muscle-gel",
    name: "CBD Recovery Muscle Gel",
    description: "Fast-acting topical gel with cooling menthol and CBD for muscle recovery.",
    price: 54.99,
    images: ["/images/tincture2.png", "/images/tincture2.png", "/images/tincture2.png"],
    image: "/images/tincture2.png",
    category: "sport",
    tags: ["muscle", "recovery", "topical", "cooling"],
    rating: 4.8,
    reviewCount: 92,
    stock: 40,
    featured: true,
    details: {
      size: "100ml",
      concentration: "1000mg CBD",
      ingredients: ["CBD Isolate", "Menthol", "Arnica", "Aloe Vera"],
      usage: "Apply directly to sore muscles and joints as needed.",
      benefits: [
        "Rapid muscle relief",
        "Cooling sensation",
        "Targeted recovery",
        "Non-greasy formula"
      ]
    }
  },
  {
    id: "cbd-sport-capsules",
    name: "CBD Sport Performance Capsules",
    description: "Pre-workout capsules combining CBD with performance-enhancing compounds.",
    price: 64.99,
    images: ["/images/tincture2.png", "/images/tincture2.png", "/images/tincture2.png"],
    image: "/images/tincture2.png",
    category: "sport",
    tags: ["sport", "capsules", "pre-workout"],
    rating: 4.6,
    reviewCount: 78,
    stock: 25,
    featured: true,
    details: {
      size: "60 capsules",
      concentration: "25mg CBD per capsule",
      ingredients: ["CBD Isolate", "L-Theanine", "Caffeine", "B-Vitamins"],
      usage: "Take 2 capsules 30 minutes before workout.",
      benefits: [
        "Enhanced focus",
        "Improved endurance",
        "Clean energy",
        "Better performance"
      ]
    }
  },
  {
    id: "cbd-calm-capsules",
    name: "CBD Calm Capsules",
    description: "Our CBD Calm Capsules deliver a precise dose of CBD combined with calming adaptogens to help you manage stress and maintain focus throughout your day.",
    price: 64.99,
    images: [
      "/images/products/placeholder.jpg",
      "/images/products/placeholder.jpg",
      "/images/products/placeholder.jpg"
    ],
    image: "/images/products/placeholder.jpg",
    category: "health",
    tags: ["capsules", "calm", "stress", "focus"],
    rating: 4.6,
    reviewCount: 84,
    stock: 45,
    details: {
      size: "30 capsules",
      concentration: "25mg CBD per capsule",
      ingredients: ["CBD Isolate", "Ashwagandha", "L-Theanine", "Lemon Balm Extract", "Magnesium", "Vegetable Cellulose Capsule"],
      usage: "Take 1 capsule daily with water, preferably with a meal.",
      benefits: [
        "Promotes calm without drowsiness",
        "Supports mental clarity and focus",
        "Helps manage everyday stress",
        "Supports overall mood balance"
      ]
    }
  },
  {
    id: "cbd-relief-roll-on",
    name: "CBD Relief Roll-On",
    description: "This convenient roll-on applicator delivers targeted CBD relief for on-the-go use, perfect for sore muscles, tension, and discomfort wherever you need it.",
    price: 39.99,
    images: [
      "/images/products/placeholder.jpg",
      "/images/products/placeholder.jpg",
      "/images/products/placeholder.jpg"
    ],
    image: "/images/products/placeholder.jpg",
    category: "sport",
    tags: ["roll-on", "relief", "topical", "travel"],
    rating: 4.5,
    reviewCount: 67,
    stock: 55,
    new: true,
    details: {
      size: "10ml",
      concentration: "500mg CBD",
      ingredients: ["CBD Isolate", "Menthol", "Camphor", "Arnica Extract", "Peppermint Oil", "Eucalyptus Oil", "Aloe Vera"],
      usage: "Roll directly onto affected areas as needed. Can be applied up to 4 times daily.",
      benefits: [
        "Provides targeted relief",
        "Convenient on-the-go application",
        "Fast-acting formula",
        "Non-greasy and quick-drying"
      ]
    }
  },
  {
    id: "cbd-night-cream",
    name: "CBD Regenerative Night Cream",
    description: "This rich night cream works while you sleep, combining CBD with retinol and peptides to rejuvenate your skin, reduce signs of aging, and wake up with a refreshed complexion.",
    price: 84.99,
    discountPrice: 74.99,
    images: ["/images/tincture2.png", "/images/tincture2.png", "/images/tincture2.png"],
    image: "/images/tincture2.png",
    category: "beauty",
    tags: ["night cream", "anti-aging", "skincare", "beauty"],
    rating: 4.7,
    reviewCount: 76,
    stock: 32,
    featured: true,
    details: {
      size: "50ml",
      concentration: "300mg CBD",
      ingredients: ["CBD Isolate", "Retinol", "Peptide Complex", "Hyaluronic Acid", "Ceramides", "Squalane", "Vitamin E", "Shea Butter"],
      usage: "Apply a small amount to clean face and neck before bedtime. Use nightly for best results.",
      benefits: [
        "Reduces appearance of fine lines and wrinkles",
        "Improves skin texture and firmness",
        "Enhances skin's natural repair process",
        "Deeply hydrates and nourishes"
      ]
    }
  },
  {
    id: "cbd-pet-tincture",
    name: "CBD Pet Wellness Tincture",
    description: "Specially formulated for your furry friends, our Pet Wellness Tincture helps support your pet's overall health, calm, and comfort with a gentle, pet-safe CBD formula.",
    price: 59.99,
    images: ["/images/tincture2.png", "/images/tincture2.png", "/images/tincture2.png"],
    image: "/images/tincture2.png",
    category: "pet",
    tags: ["pet", "tincture", "wellness", "animal"],
    rating: 4.9,
    reviewCount: 112,
    stock: 40,
    featured: true,
    details: {
      size: "30ml",
      concentration: "500mg CBD",
      ingredients: ["Broad Spectrum CBD", "MCT Oil", "Natural Bacon Flavor"],
      usage: "Add to food or administer directly into pet's mouth. Dosage varies by weight - see included guide.",
      benefits: [
        "Supports pet comfort and mobility",
        "Helps maintain calm during stressful situations",
        "Promotes overall wellness",
        "Supports healthy sleep patterns"
      ]
    }
  },
  {
    id: "cbd-pet-treats",
    name: "CBD Calming Pet Treats",
    description: "Delicious CBD-infused treats to help pets stay calm and relaxed.",
    price: 34.99,
    images: ["/images/tincture2.png", "/images/tincture2.png", "/images/tincture2.png"],
    image: "/images/tincture2.png",
    category: "pet",
    tags: ["pet", "treats", "calming"],
    rating: 4.8,
    reviewCount: 96,
    stock: 50,
    featured: true,
    details: {
      size: "30 treats",
      concentration: "5mg CBD per treat",
      ingredients: ["Broad Spectrum CBD", "Natural Ingredients", "Peanut Butter"],
      usage: "Give 1-2 treats daily based on pet size.",
      benefits: [
        "Promotes calmness",
        "Reduces anxiety",
        "Tasty formula",
        "Easy to administer"
      ]
    }
  },
  {
    id: "cbd-pet-balm",
    name: "CBD Pet Care Balm",
    description: "Soothing balm for pet skin, paw, and nose care.",
    price: 29.99,
    images: ["/images/tincture2.png", "/images/tincture2.png", "/images/tincture2.png"],
    image: "/images/tincture2.png",
    category: "pet",
    tags: ["pet", "balm", "topical"],
    rating: 4.7,
    reviewCount: 84,
    stock: 45,
    featured: true,
    details: {
      size: "60ml",
      concentration: "150mg CBD",
      ingredients: ["CBD Isolate", "Coconut Oil", "Shea Butter", "Vitamin E"],
      usage: "Apply to affected areas as needed.",
      benefits: [
        "Soothes skin",
        "Protects paws",
        "Moisturizes nose",
        "Safe if licked"
      ]
    }
  },
  {
    id: "cbd-bath-bombs",
    name: "CBD Relaxation Bath Bombs",
    description: "Transform your bath into a therapeutic experience with our CBD-infused bath bombs, combining essential oils and Epsom salts for the ultimate relaxation and skin nourishment.",
    price: 44.99,
    images: [
      "/images/products/placeholder.jpg",
      "/images/products/placeholder.jpg",
      "/images/products/placeholder.jpg"
    ],
    image: "/images/products/placeholder.jpg",
    category: "beauty",
    tags: ["bath", "relaxation", "spa", "beauty"],
    rating: 4.6,
    reviewCount: 58,
    stock: 65,
    new: true,
    details: {
      size: "4 bath bombs",
      concentration: "50mg CBD per bath bomb",
      ingredients: ["CBD Isolate", "Epsom Salt", "Baking Soda", "Citric Acid", "Shea Butter", "Essential Oils", "Natural Colorants"],
      usage: "Drop one bath bomb into warm bath water and enjoy a 20-30 minute soak.",
      benefits: [
        "Promotes deep relaxation",
        "Soothes tired muscles",
        "Nourishes and softens skin",
        "Creates an aromatic spa experience"
      ]
    }
  }
];

export function getProductsByCategory(category: Product['category']) {
  return products.filter(product => product.category === category);
}

export function getFeaturedProducts() {
  return products.filter(product => product.featured);
}

export function getBestSellerProducts(limit: number = 4): Product[] {
  return products
    .filter(product => product.bestSeller)
    .slice(0, limit)
}

export function getNewProducts() {
  return products.filter(product => product.new);
}

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id)
} 