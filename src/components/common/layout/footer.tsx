'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FC, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube,
  MessageCircle,
  Mail, 
  Phone, 
  MapPin,
  ArrowRight,
  Leaf,
  Shield,
  CheckCircle
} from 'lucide-react'

export const Footer: FC = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter submission
    console.log('Subscribed:', email)
    setEmail('')
  }

  return (
    <footer className="bg-green-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Top Section with Newsletter */}
        <div className="border-b border-green-800 pb-12 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Join our CBD community</h3>
              <p className="text-green-100 mb-2 max-w-lg">
                Subscribe to our newsletter for exclusive offers, CBD tips, new product releases, and wellness insights.
              </p>
              <div className="flex items-center gap-3 mt-6">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-green-200 text-sm">Never share your email</span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md ml-auto">
              <div className="flex-grow">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="h-12 bg-white/10 border-green-700 text-white placeholder:text-green-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="h-12 px-6 bg-white text-green-800 hover:bg-green-100 rounded-md"
              >
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="relative h-8 w-8 overflow-hidden">
                <Image
                  src="/images/logo.svg"
                  alt="Twistly CBD"
                  width={32}
                  height={32}
                  className="object-contain invert"
                />
              </div>
              <span className="font-bold text-xl">Twistly CBD</span>
            </div>
            <p className="text-green-100 mb-6">
              Premium organic CBD products designed to enhance your wellbeing and improve your quality of life, sourced sustainably.
            </p>
            <div className="flex items-center gap-4">
              <Link href="https://instagram.com" className="text-green-200 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="https://facebook.com" className="text-green-200 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="https://twitter.com" className="text-green-200 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://youtube.com" className="text-green-200 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-3">
              <li><Link href="/shop" className="text-green-100 hover:text-white transition-colors flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />All Products
              </Link></li>
              <li><Link href="/health" className="text-green-100 hover:text-white transition-colors flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />Health & Wellness
              </Link></li>
              <li><Link href="/sport" className="text-green-100 hover:text-white transition-colors flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />Sport & Recovery
              </Link></li>
              <li><Link href="/beauty" className="text-green-100 hover:text-white transition-colors flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />Beauty & Skincare
              </Link></li>
              <li><Link href="/bundles" className="text-green-100 hover:text-white transition-colors flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />CBD Bundles
              </Link></li>
              <li><Link href="/new" className="text-green-100 hover:text-white transition-colors flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />New Arrivals
              </Link></li>
            </ul>
          </div>
          
          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-green-100 hover:text-white transition-colors flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />About Us
              </Link></li>
              <li><Link href="/lab-results" className="text-green-100 hover:text-white transition-colors flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />Lab Results
              </Link></li>
              <li><Link href="/sustainability" className="text-green-100 hover:text-white transition-colors flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />Sustainability
              </Link></li>
              <li><Link href="/blog" className="text-green-100 hover:text-white transition-colors flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />Blog
              </Link></li>
              <li><Link href="/careers" className="text-green-100 hover:text-white transition-colors flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />Careers
              </Link></li>
              <li><Link href="/press" className="text-green-100 hover:text-white transition-colors flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />Press
              </Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-green-400 mt-0.5" />
                <div>
                  <p className="text-white">Email Us</p>
                  <a href="mailto:info@twistly.com" className="text-green-100 hover:text-white transition-colors">info@twistly.com</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-green-400 mt-0.5" />
                <div>
                  <p className="text-white">Call Us</p>
                  <a href="tel:+15551234567" className="text-green-100 hover:text-white transition-colors">(555) 123-4567</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-green-400 mt-0.5" />
                <div>
                  <p className="text-white">Visit Us</p>
                  <address className="text-green-100 not-italic">
                    123 Hemp Street<br />
                    Wellness City, WC 12345
                  </address>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 text-green-400 mt-0.5" />
                <div>
                  <p className="text-white">Live Chat</p>
                  <a href="#" className="text-green-100 hover:text-white transition-colors">Open chat support</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-green-800 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="text-green-200 text-sm">
              <p>© {new Date().getFullYear()} Twistly CBD. All rights reserved.</p>
              <div className="flex flex-wrap gap-4 mt-2">
                <Link href="/privacy" className="text-green-200 hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="text-green-200 hover:text-white transition-colors">Terms of Service</Link>
                <Link href="/shipping" className="text-green-200 hover:text-white transition-colors">Shipping Policy</Link>
              </div>
            </div>
            
            <div className="flex gap-6 md:justify-end">
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-green-400" />
                <span className="text-green-100 text-sm">Organic Hemp</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-400" />
                <span className="text-green-100 text-sm">3rd Party Tested</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 