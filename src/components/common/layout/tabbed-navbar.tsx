'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ShoppingCart, User, Search, ChevronDown, ChevronRight, Menu, X, Bitcoin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { CartDrawer } from '@/components/features/cart/cart-drawer'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from '@/components/ui/input'
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

// Product categories data with colors
const productCategories = [
  {
    name: "Health",
    fullName: "Health & Wellness",
    color: "green",
    path: "/health-and-wellness",
    bgClass: "bg-green-50",
    textClass: "text-green-700", 
    hoverClass: "hover:text-green-900",
    activeClass: "bg-green-600",
    borderClass: "border-green-100"
  },
  {
    name: "Sport",
    fullName: "Sport & Recovery",
    color: "blue",
    path: "/sport-and-recovery",
    bgClass: "bg-blue-50",
    textClass: "text-blue-700",
    hoverClass: "hover:text-blue-900",
    activeClass: "bg-blue-600",
    borderClass: "border-blue-100"
  },
  {
    name: "Beauty",
    fullName: "Beauty & Cosmetics",
    color: "purple",
    path: "/beauty-and-cosmetics",
    bgClass: "bg-purple-50",
    textClass: "text-purple-700",
    hoverClass: "hover:text-purple-900",
    activeClass: "bg-purple-600",
    borderClass: "border-purple-100"
  },
  {
    name: "Hybrid",
    fullName: "Hybrid & Mushrooms",
    color: "brown",
    path: "/hybrid-and-mushrooms",
    bgClass: "bg-amber-50",
    textClass: "text-amber-900",
    hoverClass: "hover:text-amber-950",
    activeClass: "bg-amber-800",
    borderClass: "border-amber-200"
  },
  {
    name: "Pet",
    fullName: "Pet CBD",
    color: "amber",
    path: "/pet-cbd",
    bgClass: "bg-amber-50",
    textClass: "text-amber-700",
    hoverClass: "hover:text-amber-800",
    activeClass: "bg-amber-600",
    borderClass: "border-amber-100"
  }
]

// Navigation links
const navLinks = [
  { name: "Shop", path: "/shop" },
  { name: "About", path: "/about" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
  { name: "Lab", path: "/lab" }
]

export function TabbedNavbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [logoIndex, setLogoIndex] = useState(3)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { toast } = useToast()
  
  // Find active category path or default to empty string
  const activeTabValue = productCategories.find(category => 
    pathname === category.path || pathname.startsWith(`${category.path}/`)
  )?.path || ""
  
  // Handle category tab change
  const handleTabChange = (value: string) => {
    if (value) {
      router.push(value)
    }
  }
  
  // Detect scroll for header shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Cycle through logos
  const cycleLogo = () => {
    setLogoIndex(prev => {
      if (prev >= 5) return 3
      return prev + 1
    })
  }
  
  // Button click handler for wallet connect
  const handleWalletConnect = () => {
    toast({
      title: 'Wallet Connection',
      description: 'Wallet connection feature coming soon.',
    })
    setIsMobileMenuOpen(false)
  }
  
  return (
    <header className="relative z-50">
      {/* Main navbar */}
      <div className={cn(
        "sticky top-0 z-50 w-full border-b bg-white h-20 backdrop-blur-sm bg-white/95",
        isScrolled ? "shadow-sm" : "border-gray-100"
      )}>
        <div className="container mx-auto h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-3"
              onClick={cycleLogo}
            >
              <div className="relative h-12 w-12 overflow-hidden">
                <Image
                  src={`/images/${logoIndex}.png`}
                  alt="Twistly"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-black text-2xl hidden sm:inline-block tracking-tight">
                Twistly<span className="text-green-600">.</span>
              </span>
            </Link>
            
            {/* Desktop Right Side Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Info Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="px-4 py-2 text-base font-medium rounded-md flex items-center gap-1.5">
                    Info <ChevronDown className="h-4 w-4 opacity-70" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-lg p-1">
                  {navLinks.slice(1).map((link) => (
                    <DropdownMenuItem key={link.path} asChild className="rounded-md">
                      <Link href={link.path} className="font-medium text-sm">
                        {link.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Shop Button */}
              <Button asChild variant="default" className="relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full h-10 px-5 text-[14px] font-medium transition-all duration-300 shadow-md hover:shadow-green-700/30 border border-green-400/20">
                <Link href="/shop" className="flex items-center gap-3">
                  <motion.div
                    className="relative flex items-center justify-center w-9 h-9"
                    animate={{ rotate: 360 }}
                    transition={{
                      ease: "linear",
                      duration: 20,
                      repeat: Infinity
                    }}
                  >
                    <Image 
                      src="/images/logos/1.png"
                      alt="Twistly Icon" 
                      width={26}
                      height={26}
                      className="object-contain brightness-0 invert"
                    />
                  </motion.div>
                  <Separator orientation="vertical" className="h-4 bg-white/30" />
                  <span className="tracking-wide uppercase">Shop</span>
                </Link>
              </Button>
              
              {/* Desktop Search Button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 relative rounded-full h-10 w-10"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
              >
                <Search className="h-[18px] w-[18px]" />
              </Button>
              
              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 relative rounded-full h-10 w-10"
                    aria-label="User account"
                  >
                    <User className="h-[18px] w-[18px]" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-lg p-1">
                  <DropdownMenuItem asChild className="rounded-md">
                    <Link href="/account" className="font-medium text-sm">My Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-md">
                    <Link href="/orders" className="font-medium text-sm">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="rounded-md">
                    <button
                      onClick={handleWalletConnect}
                      className="font-medium text-sm w-full text-left flex items-center"
                    >
                      <Bitcoin className="h-4 w-4 mr-2" />
                      Connect Wallet
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="rounded-md">
                    <Link href="/signin" className="font-medium text-sm">Sign In</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Cart */}
              <CartDrawer />
            </div>
            
            {/* Mobile Menu and Cart */}
            <div className="flex md:hidden items-center space-x-2">
              <Button 
                variant="ghost" 
                size="icon"
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 relative rounded-full h-10 w-10"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
              >
                <Search className="h-[18px] w-[18px]" />
              </Button>
              
              {/* Mobile Cart */}
              <CartDrawer />
              
              {/* Mobile Menu */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    aria-label="Menu" 
                    className="relative text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full h-10 w-10"
                  >
                    <Menu className="h-[18px] w-[18px]" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:w-80 p-0">
                  <div className="flex flex-col h-full">
                    <SheetHeader className="p-4 border-b">
                      <SheetTitle className="flex items-center">
                        <div className="relative h-8 w-8 mr-2">
                          <Image
                            src="/images/3.png"
                            alt="Twistly"
                            width={32}
                            height={32}
                            className="object-contain"
                          />
                        </div>
                        <span>Twistly</span>
                      </SheetTitle>
                    </SheetHeader>
                    
                    <div className="overflow-y-auto flex-1 py-4">
                      <div className="px-4 space-y-4">
                        {/* Categories for mobile */}
                        <div className="space-y-1">
                          <h3 className="text-sm font-medium text-gray-500 px-2">Categories</h3>
                          {productCategories.map((category) => (
                            <SheetClose asChild key={category.path}>
                              <Link
                                href={category.path}
                                className={cn(
                                  "flex items-center justify-between w-full p-2 rounded-md",
                                  pathname === category.path ? 
                                    `${category.bgClass} ${category.textClass} font-medium` : 
                                    "text-gray-800 hover:bg-gray-100"
                                )}
                              >
                                <span>{category.fullName}</span>
                                <ChevronRight className="h-4 w-4 opacity-50" />
                              </Link>
                            </SheetClose>
                          ))}
                        </div>
                        
                        <Separator />
                        
                        {/* Info links for mobile */}
                        <div className="space-y-1">
                          <h3 className="text-sm font-medium text-gray-500 px-2">Info</h3>
                          {navLinks.map((link) => (
                            <SheetClose asChild key={link.path}>
                              <Link
                                href={link.path}
                                className={cn(
                                  "flex items-center justify-between w-full p-2 rounded-md",
                                  pathname === link.path ? 
                                    "bg-gray-100 font-medium" : 
                                    "text-gray-800 hover:bg-gray-100"
                                )}
                              >
                                <span>{link.name}</span>
                                <ChevronRight className="h-4 w-4 opacity-50" />
                              </Link>
                            </SheetClose>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border-t mt-auto">
                      <Button 
                        variant="outline" 
                        className="w-full justify-center"
                        onClick={handleWalletConnect}
                      >
                        <Bitcoin className="h-4 w-4 mr-2" />
                        Connect Wallet
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
      
      {/* Category Tabs - only visible on desktop */}
      <div className="hidden md:block sticky top-20 z-40 bg-background border-b border-gray-100 shadow-sm">
        <div className="container mx-auto">
          <Tabs 
            value={activeTabValue} 
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="h-14 w-full bg-transparent justify-start">
              {productCategories.map((category) => {
                const isActive = pathname === category.path || pathname.startsWith(`${category.path}/`)
                
                return (
                  <TabsTrigger
                    key={category.path}
                    value={category.path}
                    className={cn(
                      "relative h-full rounded-none border-b-2 border-transparent data-[state=active]:border-b-2 px-8 data-[state=active]:shadow-none",
                      "text-[15px] font-medium hover:bg-gray-50 transition-all",
                      isActive ? `data-[state=active]:${category.textClass} data-[state=active]:border-${category.color}-600 data-[state=active]:font-semibold` : "",
                    )}
                  >
                    {category.fullName}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-current"
                        layoutId="activeTab"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Search Overlay */}
      <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <SheetContent side="top" className="h-auto max-h-[300px]">
          <div className="flex flex-col space-y-4 pt-8 pb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400" />
              <Input 
                placeholder="Search products..." 
                className="pl-10 h-11 text-base rounded-full border-gray-200 focus-visible:ring-green-600"
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <div className="text-xs uppercase font-semibold tracking-wide text-gray-500 px-2">Popular Searches</div>
              <div className="flex flex-wrap gap-2">
                {["CBD Oil", "Softgels", "Sleep Aid", "Pain Relief", "Mushroom Extract"].map((term) => (
                  <Button 
                    key={term}
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIsSearchOpen(false)}
                    className="text-xs h-9 font-medium px-3 rounded-full border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
} 