'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, SlidersHorizontal, Search, ChevronDown, X, Grid3X3, List, ArrowUpDown, ShoppingCart, Award, Package, BadgePercent, Eye, Check, Star, User, Droplet, Info, Clock } from 'lucide-react'
import { products, Product } from '@/lib/products'
import { ProductCard } from '@/components/features/products/product-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { ShoppingCart as ShoppingCartIcon } from 'lucide-react'
import { OptimizedImage } from '@/components/ui/optimized-image'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import Image from 'next/image'
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { useCart } from '@/context/cart-context';

type SortOption = 'featured' | 'price-low' | 'price-high' | 'newest' | 'best-selling'
type ViewMode = 'grid' | 'list'

export default function ShopPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState<SortOption>('featured')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [gridColumns, setGridColumns] = useState(3)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  
  // Get all tags from products
  const allTags = Array.from(new Set(products.flatMap(product => product.tags || [])))
  
  // Filter and sort products
  useEffect(() => {
    let result = [...products]
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query) ||
          (product.tags && product.tags.some(tag => tag.toLowerCase().includes(query)))
      )
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter(product => 
        selectedCategories.includes(product.category)
      )
    }
    
    // Apply tags filter
    if (selectedTags.length > 0) {
      result = result.filter(product => 
        product.tags && product.tags.some(tag => selectedTags.includes(tag))
      )
    }
    
    // Apply price range filter
    result = result.filter(
      product => {
        const price = product.discountPrice || product.price
        return price >= priceRange[0] && price <= priceRange[1]
      }
    )
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price))
        break
      case 'price-high':
        result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price))
        break
      case 'best-selling':
        result.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
        break
      case 'newest':
        result = result.filter(product => product.new).concat(
          result.filter(product => !product.new)
        )
        break
      case 'featured':
      default:
        result = result.filter(product => product.featured).concat(
          result.filter(product => !product.featured)
        )
        break
    }
    
    setFilteredProducts(result)
  }, [searchQuery, sortOption, selectedCategories, selectedTags, priceRange])
  
  useEffect(() => {
    console.log("Products loaded:", products.length);
    console.log("Filtered products:", filteredProducts.length);
    console.log("First product sample:", products[0]);
  }, [filteredProducts]);
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }
  
  const handleTagChange = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }
  
  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategories([])
    setSelectedTags([])
    setPriceRange([0, 100])
    setSortOption('featured')
  }
  
  // Modified categories to include "all" and "pet"
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'health', name: 'Health & Wellness' },
    { id: 'beauty', name: 'Beauty & Skincare' },
    { id: 'sport', name: 'Sport & Recovery' },
    { id: 'pet', name: 'Pet Products' },
    { id: 'hybrid', name: 'Hybrid Solutions' },
  ]
  
  // Handle category tab click
  const handleCategoryTabClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    
    if (categoryId === 'all') {
      setSelectedCategories([]);
    } else {
      setSelectedCategories([categoryId]);
    }
  };
  
  const getProductImage = (product: Product) => {
    if (!product.image || product.image.includes('placeholder')) {
      return "/images/tincture2.png";
    }
    return product.image;
  }
  
  const getCategoryColor = (category: string) => {
    const categoryColors = {
      health: 'green',
      beauty: 'pink',
      sport: 'blue',
      hybrid: 'purple',
    };
    return categoryColors[category as keyof typeof categoryColors] || 'gray';
  };
  
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  // Implement handleQuickView function to show product quick view dialog
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  
  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setQuickViewOpen(true);
  };
  
  // Implement handleAddToCart function with toast notification
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add to cart using cart context
    addItem(product, 1);
    
    // Show success toast
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
      variant: "default",
    });
  };
  
  // Add state for info dialog
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [activeInfo, setActiveInfo] = useState<{
    title: string;
    content: string;
    productName: string;
  } | null>(null);
  
  // Handle info button click
  const handleInfoButtonClick = (
    e: React.MouseEvent,
    product: Product,
    infoTitle: string,
    infoContent: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    
    setActiveInfo({
      title: infoTitle,
      content: infoContent,
      productName: product.name
    });
    
    setInfoDialogOpen(true);
  };
  
  return (
    <div className="bg-white dark:bg-gray-950">
      {/* Hero section - SMALLER */}
      <div className="relative bg-gradient-to-r from-green-50 to-green-100 py-8 md:py-12 dark:from-green-950/50 dark:to-green-900/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-3 dark:text-white"
            >
              Premium CBD Products
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base text-gray-600 mb-4 dark:text-gray-300"
            >
              Discover our collection of high-quality CBD products designed to enhance your wellness routine.
            </motion.p>
          </div>
        </div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]" />
        </div>
      </div>
      
      {/* Category Tabs - LARGER */}
      <div className="border-b border-gray-200 sticky top-0 bg-white z-20 shadow-sm">
        <div className="container mx-auto px-4">
          <Tabs defaultValue={activeCategory} onValueChange={handleCategoryTabClick} className="w-full">
            <TabsList className="flex w-full h-16 bg-transparent justify-start overflow-x-auto md:justify-center space-x-4 py-3">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className={cn(
                    "px-6 py-2.5 rounded-full text-base font-medium transition-all min-w-[120px]",
                    activeCategory === category.id 
                      ? "bg-green-100 text-green-800" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  )}
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Mobile filter button */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <h2 className="text-xl font-semibold dark:text-white">
            {filteredProducts.length} Products
          </h2>
          <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter & Sort
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md">
              <SheetHeader className="mb-4">
                <SheetTitle>Filter & Sort</SheetTitle>
                <SheetDescription>
                  Refine your product selection
                </SheetDescription>
              </SheetHeader>
              
              <div className="space-y-6 overflow-y-auto h-[calc(100vh-10rem)]">
                {/* Sort options */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Sort By</h3>
                  <Select value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="best-selling">Best Selling</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator />
                
                {/* Categories */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`mobile-category-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => handleCategoryTabClick(category.id)}
                        />
                        <label 
                          htmlFor={`mobile-category-${category.id}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                {/* Tags */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Benefits</h3>
                  <div className="space-y-2">
                    {allTags.slice(0, 10).map((tag) => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`mobile-tag-${tag}`}
                          checked={selectedTags.includes(tag)}
                          onCheckedChange={() => handleTagChange(tag)}
                        />
                        <label 
                          htmlFor={`mobile-tag-${tag}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {tag}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                {/* Price range */}
                <div>
                  <h3 className="text-sm font-medium mb-4">Price Range: ${priceRange[0]} - ${priceRange[1]}</h3>
                  <Slider
                    defaultValue={[0, 100]}
                    value={[priceRange[0], priceRange[1]]}
                    max={100}
                    step={5}
                    onValueChange={(value) => setPriceRange([value[0], value[1]])}
                    className="py-4"
                  />
                </div>
              </div>
              
              <SheetFooter className="pt-4">
                <div className="flex justify-between w-full">
                  <Button variant="outline" onClick={clearFilters}>
                    Clear All
                  </Button>
                  <Button onClick={() => setIsMobileFilterOpen(false)}>
                    Apply Filters
                  </Button>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop sidebar filters */}
          <div className="hidden md:block w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4 dark:text-white">Filters</h3>
                
                {/* Search */}
                <div className="relative mb-6">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
                
                {/* Categories */}
                <Accordion type="single" collapsible defaultValue="categories">
                  <AccordionItem value="categories">
                    <AccordionTrigger className="text-sm font-medium">
                      Categories
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pt-1">
                        {categories.map((category) => (
                          <div key={category.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`category-${category.id}`}
                              checked={selectedCategories.includes(category.id)}
                              onCheckedChange={() => handleCategoryTabClick(category.id)}
                            />
                            <label 
                              htmlFor={`category-${category.id}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {category.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                {/* Tags */}
                <Accordion type="single" collapsible defaultValue="tags">
                  <AccordionItem value="tags">
                    <AccordionTrigger className="text-sm font-medium">
                      Benefits
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pt-1">
                        {allTags.slice(0, 10).map((tag) => (
                          <div key={tag} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`tag-${tag}`}
                              checked={selectedTags.includes(tag)}
                              onCheckedChange={() => handleTagChange(tag)}
                            />
                            <label 
                              htmlFor={`tag-${tag}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {tag}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                {/* Price range */}
                <Accordion type="single" collapsible defaultValue="price">
                  <AccordionItem value="price">
                    <AccordionTrigger className="text-sm font-medium">
                      Price Range
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-1">
                        <p className="text-sm">
                          ${priceRange[0]} - ${priceRange[1]}
                        </p>
                        <Slider
                          defaultValue={[0, 100]}
                          value={[priceRange[0], priceRange[1]]}
                          max={100}
                          step={5}
                          onValueChange={(value) => setPriceRange([value[0], value[1]])}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                {/* Active filters */}
                {(selectedCategories.length > 0 || selectedTags.length > 0 || searchQuery || priceRange[0] > 0 || priceRange[1] < 100) && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium mb-2 dark:text-white">Active Filters</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCategories.map((category) => (
                        <Badge key={category} variant="outline" className="flex items-center gap-1">
                          {categories.find(c => c.id === category)?.name}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => handleCategoryTabClick(category)}
                          />
                        </Badge>
                      ))}
                      
                      {selectedTags.map((tag) => (
                        <Badge key={tag} variant="outline" className="flex items-center gap-1">
                          {tag}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => handleTagChange(tag)}
                          />
                        </Badge>
                      ))}
                      
                      {searchQuery && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          Search: {searchQuery}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => setSearchQuery('')}
                          />
                        </Badge>
                      )}
                      
                      {(priceRange[0] > 0 || priceRange[1] < 100) && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          Price: ${priceRange[0]} - ${priceRange[1]}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => setPriceRange([0, 100])}
                          />
                        </Badge>
                      )}
                    </div>
                    
                    <Button 
                      variant="link" 
                      className="px-0 text-sm mt-2" 
                      onClick={clearFilters}
                    >
                      Clear all filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Product grid */}
          <div className="flex-1">
            {/* Desktop sort options and view toggles */}
            <div className="hidden md:flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold dark:text-white">
                {filteredProducts.length} Products
              </h2>
              
              <div className="flex items-center gap-4">
                {/* View mode */}
                <div className="border rounded-md flex">
                  <Button 
                    variant="ghost" 
                    className={cn(
                      "rounded-none px-2 h-8",
                      viewMode === "grid" && "bg-muted"
                    )} 
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                    <span className="sr-only">Grid view</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    className={cn(
                      "rounded-none px-2 h-8",
                      viewMode === "list" && "bg-muted"
                    )} 
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                    <span className="sr-only">List view</span>
                  </Button>
                </div>
                
                {/* Grid density - only show when in grid mode */}
                {viewMode === 'grid' && (
                  <div className="border rounded-md flex">
                    <Button 
                      variant="ghost" 
                      className={cn(
                        "rounded-none px-2 h-8 text-xs font-medium",
                        gridColumns === 2 && "bg-muted"
                      )} 
                      onClick={() => setGridColumns(2)}
                    >
                      2
                    </Button>
                    <Button 
                      variant="ghost" 
                      className={cn(
                        "rounded-none px-2 h-8 text-xs font-medium",
                        gridColumns === 3 && "bg-muted"
                      )} 
                      onClick={() => setGridColumns(3)}
                    >
                      3
                    </Button>
                    <Button 
                      variant="ghost" 
                      className={cn(
                        "rounded-none px-2 h-8 text-xs font-medium",
                        gridColumns === 4 && "bg-muted"
                      )} 
                      onClick={() => setGridColumns(4)}
                    >
                      4
                    </Button>
                  </div>
                )}
                
                {/* Sort options */}
              <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                <Select value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="best-selling">Best Selling</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              </div>
            </div>
            
            {/* Quick sort buttons */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 md:hidden">
              <Button 
                variant={sortOption === "featured" ? "default" : "outline"} 
                size="sm" 
                className="whitespace-nowrap"
                onClick={() => setSortOption("featured")}
              >
                Featured
              </Button>
              <Button 
                variant={sortOption === "price-low" ? "default" : "outline"} 
                size="sm" 
                className="whitespace-nowrap"
                onClick={() => setSortOption("price-low")}
              >
                Price: Low to High
              </Button>
              <Button 
                variant={sortOption === "price-high" ? "default" : "outline"} 
                size="sm" 
                className="whitespace-nowrap"
                onClick={() => setSortOption("price-high")}
              >
                Price: High to Low
              </Button>
              <Button 
                variant={sortOption === "best-selling" ? "default" : "outline"} 
                size="sm" 
                className="whitespace-nowrap"
                onClick={() => setSortOption("best-selling")}
              >
                Best Selling
              </Button>
              <Button 
                variant={sortOption === "newest" ? "default" : "outline"} 
                size="sm" 
                className="whitespace-nowrap"
                onClick={() => setSortOption("newest")}
              >
                New Arrivals
              </Button>
            </div>
            
            {/* Products grid with proper e-commerce cards */}
            <AnimatePresence mode="wait">
            {filteredProducts.length > 0 ? (
                <motion.div
                  key={`${viewMode}-${gridColumns}-${filteredProducts.length}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {viewMode === 'grid' ? (
                    <div className={cn(
                      "grid gap-6",
                      gridColumns === 2 && "grid-cols-1 sm:grid-cols-2",
                      gridColumns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
                      gridColumns === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    )}>
                      {filteredProducts.map((product, index) => {
                        const categoryColor = getCategoryColor(product.category);
                        
                        return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.6) }}
                            className="h-full"
                          >
                            <Card 
                              className={`group h-full overflow-hidden border-2 relative transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer
                                border-${categoryColor}-100 hover:border-${categoryColor}-200 dark:border-${categoryColor}-900 dark:hover:border-${categoryColor}-800`}
                              onClick={() => handleQuickView(product)}
                            >
                              {/* Product badges */}
                              <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                                {product.bestSeller && (
                                  <Badge className="bg-amber-500 text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
                                    <Award className="h-3 w-3" />
                                    <span>Best Seller</span>
                                  </Badge>
                                )}
                                {product.new && (
                                  <Badge className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
                                    <Package className="h-3 w-3" />
                                    <span>New Arrival</span>
                                  </Badge>
                                )}
                                {product.discount && (
                                  <Badge className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
                                    <BadgePercent className="h-3 w-3" />
                                    <span>{product.discount}% Off</span>
                                  </Badge>
                                )}
                              </div>
                              
                              {/* Quick view button */}
                              <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button 
                                        size="icon" 
                                        variant="secondary" 
                                        className="h-8 w-8 rounded-full shadow-md"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleQuickView(product);
                                        }}
                                      >
                                        <Eye className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Quick View</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                              
                              {/* Product image */}
                              <div className={`relative overflow-hidden bg-gradient-to-b from-${categoryColor}-50 to-white dark:from-${categoryColor}-900/20 dark:to-gray-900 pt-3`}>
                                <div className="relative h-48 sm:h-52 mx-auto transition-transform duration-500 group-hover:scale-110 p-3">
                                  <Image
                                    src={getProductImage(product)}
                                    alt={product.name}
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                                
                                {product.details?.concentration && (
                                  <div className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10 px-3 py-1 rounded-full text-xs bg-white/80 backdrop-blur-sm shadow-sm border border-${categoryColor}-100 text-${categoryColor}-700`}>
                                    {product.details.concentration}
                                  </div>
                                )}
                              </div>
                              
                              <CardContent className="p-5 flex flex-col space-y-4">
                                {/* Category badge */}
                                <div className="flex justify-between items-start">
                                  <Badge 
                                    variant="outline" 
                                    className={`text-xs border-${categoryColor}-200 bg-${categoryColor}-50 text-${categoryColor}-700 dark:border-${categoryColor}-900 dark:bg-${categoryColor}-900/30 dark:text-${categoryColor}-400`}
                                  >
                                    {capitalizeFirstLetter(product.category)}
                                  </Badge>
                                  
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <Star 
                                        key={i} 
                                        className={cn(
                                          "h-3.5 w-3.5",
                                          i < Math.floor(product.rating)
                                            ? "text-yellow-400 fill-yellow-400"
                                            : "text-gray-200 fill-gray-200"
                                        )}
                                      />
                                    ))}
                                    <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
                                  </div>
                                </div>
                                
                                {/* Product name and description */}
                                <div>
                                  <h3 className={`font-semibold text-base text-gray-900 group-hover:text-${categoryColor}-700 transition-colors mb-1`}>
                                    {product.name}
                                  </h3>
                                  <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                                </div>
                                
                                {/* Benefits */}
                                {product.details?.benefits && (
                                  <div className="space-y-1.5">
                                    {product.details.benefits.slice(0, 2).map((benefit, i) => (
                                      <div key={i} className="flex items-start gap-1.5">
                                        <div className={`rounded-full p-0.5 text-${categoryColor}-600 flex-shrink-0 mt-0.5`}>
                                          <Check className="h-3 w-3" />
                                        </div>
                                        <span className="text-xs text-gray-600">{benefit}</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                                
                                {/* Price and actions */}
                                <div className="mt-auto pt-3 flex justify-between items-center border-t border-gray-100">
                                  <div className="flex flex-col">
                                    {product.discountPrice ? (
                                      <>
                                        <span className="text-xs text-gray-500 line-through">${product.price.toFixed(2)}</span>
                                        <span className={`font-bold text-${categoryColor}-700`}>${product.discountPrice.toFixed(2)}</span>
                                      </>
                                    ) : (
                                      <span className={`font-bold text-${categoryColor}-700`}>${product.price.toFixed(2)}</span>
                                    )}
                                  </div>
                                  
                                  <div className="flex items-center gap-1.5">
                                    {getProductInfoButtons(product).slice(0, 2).map((info) => (
                                      <TooltipProvider key={info.id}>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button
                                              size="icon"
                                              variant="outline"
                                              className={`h-8 w-8 rounded-full border-${categoryColor}-200 text-${categoryColor}-700 hover:bg-${categoryColor}-50`}
                                              onClick={(e) => handleInfoButtonClick(e, product, info.label, info.content)}
                                            >
                                              {info.icon}
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p>{info.label}</p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    ))}
                                    
                                    <motion.div
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <Button
                                        size="sm"
                                        variant={categoryColor === "green" ? "green" : 
                                               categoryColor === "blue" ? "blue" :
                                               categoryColor === "purple" ? "purple" :
                                               "amber"}
                                        rounded="full"
                                        onClick={(e) => handleAddToCart(product, e)}
                                      >
                                        <ShoppingCartIcon className="h-3.5 w-3.5 mr-1" />
                                        Add to Cart
                                      </Button>
                                    </motion.div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                  </motion.div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {filteredProducts.map((product, index) => {
                        const categoryColor = getCategoryColor(product.category);
                        
                        return (
                          <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.6) }}
                            className={`border rounded-lg overflow-hidden bg-white dark:bg-gray-900 dark:border-gray-800 border-${categoryColor}-100 hover:border-${categoryColor}-200 transition-all hover:shadow-lg`}
                          >
                            <div className="flex flex-col md:flex-row">
                              <div className="md:w-1/4 relative">
                                <div className={`absolute inset-0 bg-gradient-to-br from-${categoryColor}-50/50 to-${categoryColor}-100/20 z-0`}></div>
                                <div className="relative h-full aspect-square">
                                  <Image
                                    src={getProductImage(product)}
                                    alt={product.name}
                                    fill
                                    priority={index < 2}
                                    className="object-contain p-4 transition-transform hover:scale-105 z-10"
                                  />
                                </div>
                                
                                <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
                                  {product.bestSeller && (
                                    <Badge className="bg-amber-500 text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
                                      <Award className="h-3 w-3" />
                                      <span>Best Seller</span>
                                    </Badge>
                                  )}
                                  {product.new && (
                                    <Badge className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
                                      <Package className="h-3 w-3" />
                                      <span>New</span>
                                    </Badge>
                                  )}
                                  {product.discount && (
                                    <Badge className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
                                      <BadgePercent className="h-3 w-3" />
                                      <span>{product.discount}% Off</span>
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              
                              <div className="p-6 md:w-3/4 flex flex-col relative">
                                <div className="mb-2 flex items-center justify-between">
                                  <Badge 
                                    variant="outline" 
                                    className={`text-xs border-${categoryColor}-200 bg-${categoryColor}-50 text-${categoryColor}-700 dark:border-${categoryColor}-900 dark:bg-${categoryColor}-900/30 dark:text-${categoryColor}-400`}
                                  >
                                    {capitalizeFirstLetter(product.category)}
                                  </Badge>
                                  
                                  <div className="flex items-center">
                                    <div className="flex">
                                      {[...Array(5)].map((_, i) => (
                                        <Star 
                                          key={i} 
                                          className={cn(
                                            "h-4 w-4",
                                            i < Math.floor(product.rating)
                                              ? "text-yellow-400 fill-yellow-400"
                                              : "text-gray-200 fill-gray-200"
                                          )}
                                        />
                                      ))}
                                    </div>
                                    <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">{product.rating}</span>
                                    {product.reviewCount && (
                                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({product.reviewCount} reviews)</span>
                                    )}
                                  </div>
                                </div>
                                
                                <h3 className={`text-lg font-medium text-gray-900 dark:text-white mb-2 group-hover:text-${categoryColor}-700`}>
                                  {product.name}
                                </h3>
                                
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                  {product.description}
                                </p>
                                
                                {product.details?.benefits && (
                                  <div className="grid grid-cols-2 gap-2 mb-4">
                                    {product.details.benefits.slice(0, 4).map((benefit, i) => (
                                      <div key={i} className="flex items-start gap-1.5">
                                        <div className={`rounded-full p-0.5 text-${categoryColor}-600 flex-shrink-0 mt-0.5`}>
                                          <Check className="h-3.5 w-3.5" />
                                        </div>
                                        <span className="text-sm text-gray-600">{benefit}</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                                
                                {product.tags && product.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-2 mb-4">
                                    {product.tags.map(tag => (
                                      <span 
                                        key={tag} 
                                        className={`inline-flex items-center rounded-full bg-${categoryColor}-50 px-2.5 py-0.5 text-xs font-medium text-${categoryColor}-700`}
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                )}
                                
                                <div className="flex items-center justify-between mt-auto">
                                  <div className="flex items-center">
                                    {product.discount ? (
                                      <>
                                        <span className={`text-xl font-semibold text-${categoryColor}-700 dark:text-${categoryColor}-500`}>
                                          ${(product.price - (product.price * product.discount / 100)).toFixed(2)}
                                        </span>
                                        <span className="ml-2 text-sm text-gray-500 line-through dark:text-gray-400">
                                          ${product.price.toFixed(2)}
                                        </span>
                                      </>
                                    ) : (
                                      <span className={`text-xl font-semibold text-${categoryColor}-700 dark:text-${categoryColor}-500`}>
                                        ${product.price.toFixed(2)}
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex gap-3">
                                    <Button 
                                      variant={categoryColor === "green" ? "outlineGreen" : 
                                             categoryColor === "blue" ? "outlineBlue" :
                                             categoryColor === "purple" ? "outlinePurple" :
                                             "outlineAmber"}
                                      rounded="full"
                                      asChild
                                    >
                                      <Link href={`/shop/${product.id}`}>
                                        View Details
                                      </Link>
                                    </Button>
                                    <motion.div
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <Button
                                        size="sm"
                                        variant={categoryColor === "green" ? "green" : 
                                               categoryColor === "blue" ? "blue" :
                                               categoryColor === "purple" ? "purple" :
                                               "amber"}
                                        rounded="full"
                                        onClick={(e) => handleAddToCart(product, e)}
                                      >
                                        <ShoppingCartIcon className="h-3.5 w-3.5 mr-1" />
                                        Add to Cart
                                      </Button>
                                    </motion.div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16 px-4 rounded-lg border border-dashed"
                >
                  <h3 className="text-lg font-medium mb-2 dark:text-white">No products found</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    We couldn't find any products matching your current filters. Try adjusting your search criteria or browse our categories.
                  </p>
                  <Button onClick={clearFilters}>Clear All Filters</Button>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Pagination or Load More */}
            {filteredProducts.length > 12 && (
              <div className="mt-12 flex justify-center">
                <Button variant="outline" size="lg" className="px-8">
                  Load More Products
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Dialog */}
      <Dialog open={quickViewOpen} onOpenChange={setQuickViewOpen}>
        {quickViewProduct && (
          <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden bg-white border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Product image */}
              <div className={`relative bg-gradient-to-br from-${getCategoryColor(quickViewProduct.category)}-50 to-white p-8`}>
                <div className="relative h-[300px] w-full">
                  <Image
                    src={getProductImage(quickViewProduct)}
                    alt={quickViewProduct.name}
                    fill
                    className="object-contain"
                  />
                </div>
                
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {quickViewProduct.bestSeller && (
                    <Badge className="bg-amber-500 text-white">Best Seller</Badge>
                  )}
                  {quickViewProduct.new && (
                    <Badge className="bg-blue-500 text-white">New</Badge>
                  )}
                  {quickViewProduct.discount && (
                    <Badge className="bg-red-500 text-white">{quickViewProduct.discount}% Off</Badge>
                  )}
                </div>
              </div>
              
              {/* Product details */}
              <div className="p-6 flex flex-col h-full bg-white">
                <DialogHeader className="mb-4">
                  <div className="flex justify-between items-start">
                    <DialogTitle className="text-xl font-bold text-gray-900">
                      {quickViewProduct.name}
                    </DialogTitle>
                    <Badge variant="outline" className={`border-${getCategoryColor(quickViewProduct.category)}-200 bg-${getCategoryColor(quickViewProduct.category)}-50 text-${getCategoryColor(quickViewProduct.category)}-700`}>
                      {capitalizeFirstLetter(quickViewProduct.category)}
                    </Badge>
                  </div>
                  <p className="text-base mt-1 text-gray-600">
                    {quickViewProduct.description}
                  </p>
                </DialogHeader>
                
                <div className="space-y-5 flex-1">
                  {/* Ratings */}
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={cn(
                            "h-4 w-4",
                            i < Math.floor(quickViewProduct.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-200 fill-gray-200"
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">
                      {quickViewProduct.rating} ({quickViewProduct.reviewCount} reviews)
                    </span>
                  </div>
                  
                  {/* Product details */}
                  {quickViewProduct.details && (
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {quickViewProduct.details.size && (
                        <div className="space-y-1">
                          <p className="text-gray-500">Size</p>
                          <p className="font-medium text-gray-900">{quickViewProduct.details.size}</p>
                        </div>
                      )}
                      {quickViewProduct.details.concentration && (
                        <div className="space-y-1">
                          <p className="text-gray-500">Concentration</p>
                          <p className="font-medium text-gray-900">{quickViewProduct.details.concentration}</p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Benefits */}
                  {quickViewProduct.details?.benefits && quickViewProduct.details.benefits.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">Key Benefits</h4>
                      <ul className="grid grid-cols-1 gap-2">
                        {quickViewProduct.details.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className={`rounded-full p-0.5 flex-shrink-0 text-${getCategoryColor(quickViewProduct.category)}-600 mt-0.5`}>
                              <Check className="h-4 w-4" />
                            </div>
                            <span className="text-sm text-gray-600">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Usage instructions */}
                  {quickViewProduct.details?.usage && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">How to Use</h4>
                      <p className="text-sm text-gray-600">{quickViewProduct.details.usage}</p>
                    </div>
                  )}
                </div>
                
                <DialogFooter className="mt-6 block">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                      {quickViewProduct.discount ? (
                        <>
                          <span className="text-sm text-gray-500 line-through">${quickViewProduct.price.toFixed(2)}</span>
                          <span className={`text-xl font-bold text-${getCategoryColor(quickViewProduct.category)}-700`}>
                            ${(quickViewProduct.price - (quickViewProduct.price * quickViewProduct.discount / 100)).toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className={`text-xl font-bold text-${getCategoryColor(quickViewProduct.category)}-700`}>
                          ${quickViewProduct.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      {quickViewProduct.stock > 10 ? (
                        <span className="text-green-600">In Stock</span>
                      ) : quickViewProduct.stock > 0 ? (
                        <span className="text-amber-600">Low Stock ({quickViewProduct.stock} left)</span>
                      ) : (
                        <span className="text-red-600">Out of Stock</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      className={`bg-${getCategoryColor(quickViewProduct.category)}-600 hover:bg-${getCategoryColor(quickViewProduct.category)}-700 text-white`}
                      onClick={() => {
                        handleAddToCart(quickViewProduct, new MouseEvent('click') as unknown as React.MouseEvent);
                        setQuickViewOpen(false);
                      }}
                    >
                      <ShoppingCartIcon className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    
                    <Button
                      variant="outline"
                      className={`border-${getCategoryColor(quickViewProduct.category)}-200 text-${getCategoryColor(quickViewProduct.category)}-700 hover:bg-${getCategoryColor(quickViewProduct.category)}-50`}
                      asChild
                    >
                      <Link href={`/shop/${quickViewProduct.id}`}>
                        View Full Details
                      </Link>
                    </Button>
                  </div>
                </DialogFooter>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* Info Dialog */}
      <Dialog open={infoDialogOpen} onOpenChange={setInfoDialogOpen}>
        {activeInfo && (
          <DialogContent className="sm:max-w-[500px] p-6 bg-white border border-gray-200">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-gray-900">
                {activeInfo.title}
              </DialogTitle>
              <p className="text-sm text-gray-500 mt-1">
                For {activeInfo.productName}
              </p>
            </DialogHeader>
            
            <div className="mt-4 text-gray-700">
              <p className="whitespace-pre-line">{activeInfo.content}</p>
            </div>
            
            <DialogFooter className="mt-6">
              <Button
                variant="outline"
                onClick={() => setInfoDialogOpen(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}

// Add new helper function for getting info button data
const getProductInfoButtons = (product: Product) => {
  const infoButtons = [];
  
  // Who is it for
  if (product.details?.forWho) {
    infoButtons.push({
      id: 'who',
      label: 'Who is it for',
      icon: <User className="h-3 w-3" />,
      content: product.details.forWho
    });
  }
  
  // Dosage information
  if (product.details?.dosage) {
    infoButtons.push({
      id: 'dosage',
      label: 'Dosage',
      icon: <Droplet className="h-3 w-3" />,
      content: product.details.dosage
    });
  }
  
  // Usage time
  if (product.details?.usageTime) {
    infoButtons.push({
      id: 'time',
      label: 'When to use',
      icon: <Clock className="h-3 w-3" />,
      content: product.details.usageTime
    });
  }
  
  // Additional info
  if (product.details?.additionalInfo) {
    infoButtons.push({
      id: 'info',
      label: 'More info',
      icon: <Info className="h-3 w-3" />,
      content: product.details.additionalInfo
    });
  }
  
  return infoButtons;
}; 