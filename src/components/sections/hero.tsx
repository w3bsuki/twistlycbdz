"use client";

import { useState, useEffect, memo, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { 
  ArrowRightIcon, 
  Leaf, 
  Mail, 
  ChevronLeft, 
  ChevronRight, 
  ShoppingBag, 
  CheckCircle, 
  Star,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Container } from "@/components/ui/container";
import { useAnimationConfig } from "@/hooks";

// Extracted to avoid re-creation on each render
const FEATURED_COLLECTIONS = [
  {
    id: 1,
    title: "Health & Wellness",
    benefits: [
      "Stress reduction",
      "Better sleep quality",
      "Relief from discomfort",
      "Mood improvement"
    ],
    bestSeller: {
      name: "Full Spectrum CBD Oil",
      image: "/images/tincture2.png",
      rating: 4.9,
      reviews: 128,
      price: "$59.99",
      discount: "$69.99"
    },
    href: "/health-and-wellness",
    color: "green",
    gradient: "from-green-50 via-green-100/50 to-green-50/30",
    buttonGradient: "from-green-600 to-green-700",
    accentColor: "bg-green-600",
    textColor: "text-green-800",
    lightBg: "bg-green-50"
  },
  {
    id: 2,
    title: "Sport & Recovery",
    benefits: [
      "Muscle recovery",
      "Joint support",
      "Inflammation reduction",
      "Performance enhancement"
    ],
    bestSeller: {
      name: "Sport Recovery Gel",
      image: "/images/tincture2.png",
      rating: 4.8,
      reviews: 94,
      price: "$54.99",
      discount: "$64.99"
    },
    href: "/sport-and-recovery",
    color: "blue",
    gradient: "from-blue-50 via-blue-100/50 to-blue-50/30",
    buttonGradient: "from-blue-600 to-blue-700",
    accentColor: "bg-blue-600",
    textColor: "text-blue-800",
    lightBg: "bg-blue-50"
  },
  {
    id: 3,
    title: "Beauty & Cosmetics",
    benefits: [
      "Anti-aging properties",
      "Skin inflammation relief",
      "Natural moisturizing",
      "Acne reduction"
    ],
    bestSeller: {
      name: "CBD Face Serum",
      image: "/images/tincture2.png",
      rating: 4.9,
      reviews: 76,
      price: "$69.99",
      discount: "$79.99"
    },
    href: "/beauty-and-cosmetics",
    color: "purple",
    gradient: "from-purple-50 via-purple-100/50 to-purple-50/30",
    buttonGradient: "from-purple-600 to-purple-700",
    accentColor: "bg-purple-600",
    textColor: "text-purple-800",
    lightBg: "bg-purple-50"
  },
  {
    id: 4,
    title: "Hybrid & Mushrooms",
    benefits: [
      "Enhanced focus",
      "Immune system boost",
      "Natural energy",
      "Cognitive support"
    ],
    bestSeller: {
      name: "CBD + Lion's Mane Blend",
      image: "/images/tincture2.png",
      rating: 4.7,
      reviews: 52,
      price: "$64.99",
      discount: "$74.99"
    },
    href: "/hybrid-and-mushrooms",
    color: "indigo",
    gradient: "from-indigo-50 via-indigo-100/50 to-indigo-50/30",
    buttonGradient: "from-indigo-600 to-indigo-700",
    accentColor: "bg-indigo-600",
    textColor: "text-indigo-800",
    lightBg: "bg-indigo-50"
  },
  {
    id: 5,
    title: "Pet CBD",
    benefits: [
      "Anxiety relief",
      "Joint health support",
      "Better sleep",
      "Calming effect"
    ],
    bestSeller: {
      name: "Pet CBD Oil Drops",
      image: "/images/tincture2.png",
      rating: 4.8,
      reviews: 64,
      price: "$44.99",
      discount: "$49.99"
    },
    href: "/pet-cbd",
    color: "amber",
    gradient: "from-amber-50 via-amber-100/50 to-amber-50/30",
    buttonGradient: "from-amber-600 to-amber-700",
    accentColor: "bg-amber-600",
    textColor: "text-amber-800",
    lightBg: "bg-amber-50"
  }
];

interface HeroAction {
  text: string;
  href: string;
  icon?: React.ReactNode;
  variant?: "default" | "outline" | "secondary";
}

interface HeroProps {
  badge?: {
    text: string;
    action?: {
      text: string;
      href: string;
    };
  };
  title: string;
  description: string;
  actions: HeroAction[];
  newsletterPlaceholder?: string;
}

// Optimized animation variants
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 500 : -500,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      type: "spring",
      stiffness: 250,
      damping: 25
    }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 500 : -500,
    opacity: 0,
    transition: {
      duration: 0.3
    }
  })
};

// Fade animation variants (reusable)
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      delay,
      ease: "easeOut" 
    }
  })
};

function HeroContent({ 
  badge, 
  title, 
  description, 
  actions, 
  newsletterPlaceholder 
}: HeroProps) {
  const [email, setEmail] = useState("");
  const animConfig = useAnimationConfig();
  
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    // Would connect to API
    alert(`Thank you for subscribing with ${email}! Check your email for a confirmation.`);
    setEmail("");
  };

  return (
    <div className="max-w-3xl mx-auto text-center mb-16">
      {/* Badge */}
      {badge && (
        <motion.div 
          {...animConfig.getMotionProps({
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 }
          })}
          className="inline-block"
          suppressHydrationWarning
        >
          <Badge
            variant="outline"
            className="px-3 py-1 flex items-center gap-2 text-sm rounded-md bg-white border-green-200 shadow-sm"
          >
            <div className="relative h-6 w-6 flex-shrink-0">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="h-full w-full"
              >
                <Image 
                  src="/images/logos/1.png" 
                  alt="Twistly CBD Logo" 
                  width={24} 
                  height={24}
                  className="object-contain"
                />
              </motion.div>
            </div>
            <span className="text-gray-900 font-medium">{badge.text}</span>
            {badge.action && (
              <>
                <span className="mx-2 text-gray-300">•</span>
                <a
                  href={badge.action.href}
                  className="text-green-700 hover:text-green-800 font-medium"
                >
                  {badge.action.text}
                </a>
              </>
            )}
          </Badge>
        </motion.div>
      )}

      {/* Title */}
      <motion.h1
        {...animConfig.getMotionProps({
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.1 } 
        })}
        className="text-4xl md:text-5xl lg:text-6xl font-bold mt-6 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-800 via-green-700 to-green-800"
        suppressHydrationWarning
      >
        {title}
      </motion.h1>

      {/* Description */}
      <motion.p
        {...animConfig.getMotionProps({
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.2 }
        })}
        className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
        suppressHydrationWarning
      >
        {description}
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        {...animConfig.getMotionProps({
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.3 }
        })}
        className="flex flex-wrap gap-4 justify-center mb-10"
        suppressHydrationWarning
      >
        {actions.map((action, index) => (
          <Button
            key={index}
            size="lg"
            variant={action.variant || "default"}
            asChild
          >
            <a href={action.href} className="gap-2">
              {action.icon}
              {action.text}
            </a>
          </Button>
        ))}
      </motion.div>

      {/* Newsletter */}
      {newsletterPlaceholder && (
        <motion.div 
          {...animConfig.getMotionProps({
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, delay: 0.4 }
          })}
          className="max-w-md mx-auto"
          suppressHydrationWarning
        >
          <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="email"
                placeholder={newsletterPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            <Button type="submit" className="shrink-0 bg-gradient-to-r from-green-600 to-green-700">
              Subscribe
            </Button>
          </form>
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <Sparkles className="h-4 w-4 text-yellow-500 mr-2" />
              <p className="text-sm text-gray-700">Get 10% off your first order when you sign up</p>
            </div>
            <Button size="sm" variant="secondary" className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 border-yellow-300">
              Copy Code
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Memoized ProductSlider component for better performance
const ProductSlider = memo(function ProductSlider() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [autoplay, setAutoplay] = useState(true);
  const animConfig = useAnimationConfig();
  const prefersReducedMotion = useReducedMotion();

  // CSS for ribbon clip-path
  const ribbonStyle = {
    clipPath: "polygon(0 0, 100% 0, 100% 70%, 90% 100%, 0 100%)"
  };

  const nextCollection = useCallback(() => {
    setPage(([current, _]) => [(current + 1) % FEATURED_COLLECTIONS.length, 1]);
  }, []);

  const previousCollection = useCallback(() => {
    setPage(([current, _]) => [(current - 1 + FEATURED_COLLECTIONS.length) % FEATURED_COLLECTIONS.length, -1]);
  }, []);

  // Auto-advance the slider only if not hovered and auto-play is enabled
  useEffect(() => {
    if (!autoplay) return;
    
    const timer = setTimeout(() => {
      nextCollection();
    }, 6000);
    
    return () => clearTimeout(timer);
  }, [page, autoplay, nextCollection]);

  // Pause auto-advance on hover
  const handleMouseEnter = useCallback(() => {
    setAutoplay(false);
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    setAutoplay(true);
  }, []);

  const collection = FEATURED_COLLECTIONS[page];
  
  return (
    <div 
      className="relative h-[400px] w-full overflow-hidden rounded-xl shadow-sm border border-gray-100"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={page}
          custom={direction}
          variants={animConfig.getVariants(slideVariants)}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: animConfig.shouldReduceMotion ? 0.1 : 0.4 }}
          className="absolute top-0 left-0 right-0 w-full h-full flex items-center justify-center"
          suppressHydrationWarning
        >
          <div className={`absolute inset-0 bg-gradient-to-b ${collection.gradient}`} />
          
          {/* Best Seller Badge - Top Center */}
          <div className="absolute top-4 right-4 z-30">
            <div className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-md shadow-sm flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-white" />
              <span className="uppercase tracking-wide">Best Seller</span>
            </div>
          </div>
          
          <div className="absolute inset-0 flex flex-col md:flex-row">
            {/* Collection Info - Left Side */}
            <div className="w-full md:w-1/2 flex flex-col justify-center p-4 md:p-8 relative">
              {/* Collection badge */}
              <div className="mb-3">
                <Badge 
                  className={`px-3 py-1 rounded-full ${collection.accentColor} text-white text-xs font-medium shadow-sm`}
                >
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                      <path d="M7.5 12H15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M11.5 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    {collection.title}
                  </span>
                </Badge>
              </div>
              
              <h2 className={`text-2xl md:text-3xl font-bold mb-5 ${collection.textColor}`}>
                Explore {collection.title} Collection
              </h2>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-6">
                {collection.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className={`h-4 w-4 text-green-600 flex-shrink-0`} />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
              
              {/* Info badges */}
              <div className="flex flex-wrap gap-2 mb-5">
                <div className="px-2 py-1 bg-green-50 text-green-800 text-xs rounded-md">
                  THC-Free
                </div>
                <div className="px-2 py-1 bg-green-50 text-green-800 text-xs rounded-md">
                  Fast Shipping
                </div>
                <div className="px-2 py-1 bg-green-50 text-green-800 text-xs rounded-md">
                  30-Day Returns
                </div>
              </div>
              
              <Button
                className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
              >
                <span className="flex items-center justify-center gap-2">
                  Explore Collection
                  <ArrowRightIcon className="h-4 w-4" />
                </span>
              </Button>
            </div>
            
            {/* Product Image - Right Side */}
            <div className="w-full md:w-1/2 relative p-6 flex items-center justify-center">              
              <motion.div 
                className="relative w-full flex items-center justify-center"
                animate={prefersReducedMotion ? {} : { 
                  y: [0, -5, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 4,
                  ease: "easeInOut"
                }}
                suppressHydrationWarning
              >
                <Image
                  src="/images/tincture2.png"
                  alt={collection.bestSeller.name}
                  width={240}
                  height={240}
                  className="object-contain drop-shadow-xl max-h-[220px] z-10"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
              
              {/* Product Info Card */}
              <motion.div 
                className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-[calc(100%-40px)] max-w-[280px] bg-white rounded-lg shadow-md border border-gray-100 p-4 z-20"
                whileHover={prefersReducedMotion ? {} : { 
                  y: -3,
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-sm font-bold text-gray-800">
                      {collection.bestSeller.name}
                    </h3>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "w-3 h-3",
                              i < Math.floor(collection.bestSeller.rating)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-200"
                            )}
                          />
                        ))}
                      </div>
                      <span className="ml-1 text-xs text-gray-500">
                        ({collection.bestSeller.reviews})
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-gray-900">
                      {collection.bestSeller.price}
                    </span>
                    {collection.bestSeller.discount && (
                      <span className="block text-xs text-red-500 line-through">
                        {collection.bestSeller.discount}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-2 mb-3">
                  <div className="flex items-center text-xs text-gray-600">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></div>
                    <span>Full Spectrum</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></div>
                    <span>Lab Tested</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></div>
                    <span>Organic</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></div>
                    <span>Non-GMO</span>
                  </div>
                </div>
                
                <Button
                  size="sm"
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <ShoppingBag className="mr-1.5 h-3.5 w-3.5" />
                  Add to Cart
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Controls */}
      <div className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20">
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 rounded-full bg-white/90 border border-gray-200 text-gray-700 hover:bg-white hover:text-gray-900 shadow-sm"
          onClick={previousCollection}
          aria-label="Previous collection"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20">
        <Button
          size="icon"
          variant="ghost" 
          className="h-8 w-8 rounded-full bg-white/90 border border-gray-200 text-gray-700 hover:bg-white hover:text-gray-900 shadow-sm"
          onClick={nextCollection}
          aria-label="Next collection"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Navigation dots */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1.5 z-10">
        {FEATURED_COLLECTIONS.map((_, index) => (
          <button
            key={index}
            onClick={() => setPage([index, index > page ? 1 : -1])}
            className={`h-2 rounded-full transition-all ${
              page === index 
                ? "w-6 bg-green-600" 
                : "w-2 bg-gray-300"
            }`}
            aria-label={`Go to collection ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
});

export function CBDHeroSection({
  badge = {
    text: "Premium CBD Products",
    action: {
      text: "Learn more",
      href: "/about",
    },
  },
  title = "Natural Wellness Through Premium CBD",
  description = "Discover our range of high-quality, lab-tested CBD products designed to enhance your wellbeing. From oils to edibles, we have everything you need for a balanced lifestyle.",
  actions = [
    {
      text: "Shop Now",
      href: "/products",
      variant: "default",
    },
    {
      text: "Learn More",
      href: "/about",
      variant: "outline",
      icon: <Leaf className="h-4 w-4" />,
    },
  ],
  newsletterPlaceholder = "Enter your email",
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-green-50/80 to-white border-b border-green-100">
      {/* Decorative background elements - Reduced number for better performance */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-green-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 left-1/4 w-72 h-72 bg-blue-100/20 rounded-full blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="py-12 md:py-16 lg:py-20">
          {/* Hero Content - Using memoized components for better performance */}
          <HeroContent 
            badge={badge}
            title={title}
            description={description}
            actions={actions}
            newsletterPlaceholder={newsletterPlaceholder}
          />
          
          {/* Product Slider - Memoized component */}
          <div className="mt-8 px-1">
            <ProductSlider />
          </div>
        </div>
      </Container>
    </section>
  );
} 