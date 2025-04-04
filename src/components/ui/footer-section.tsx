"use client"

import * as React from "react"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Facebook, Instagram, Linkedin, Send, Twitter } from "lucide-react"
import Link from "next/link"

export function FooterSection() {
  return (
    <footer className="w-full border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950" role="contentinfo" aria-label="Site footer">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-4 lg:px-8">
        <div className="space-y-3">
          <h4 className="text-lg font-semibold">Shop</h4>
          <nav className="flex flex-col space-y-2" aria-label="Shop navigation">
            <Link href="/shop" className="text-gray-700 hover:text-green-600 dark:text-gray-400 dark:hover:text-gray-300">
              All Products
            </Link>
            <Link href="/health-and-wellness" className="text-gray-700 hover:text-green-600 dark:text-gray-400 dark:hover:text-gray-300">
              Health & Wellness
            </Link>
            <Link href="/beauty-and-cosmetics" className="text-gray-700 hover:text-green-600 dark:text-gray-400 dark:hover:text-gray-300">
              Beauty & Cosmetics
            </Link>
            <Link href="/sport-and-recovery" className="text-gray-700 hover:text-green-600 dark:text-gray-400 dark:hover:text-gray-300">
              Sport & Recovery
            </Link>
            <Link href="/pet-cbd" className="text-gray-700 hover:text-green-600 dark:text-gray-400 dark:hover:text-gray-300">
              Pet CBD
            </Link>
            <Link href="/hybrid-and-mushrooms" className="text-gray-700 hover:text-green-600 dark:text-gray-400 dark:hover:text-gray-300">
              Hybrid & Mushrooms
            </Link>
          </nav>
        </div>
        <div className="space-y-3">
          <h4 className="text-lg font-semibold">Company</h4>
          <nav className="flex flex-col space-y-2" aria-label="Company navigation">
            <Link href="/about" className="text-gray-700 hover:text-green-600 dark:text-gray-400 dark:hover:text-gray-300">
              About Us
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-green-600 dark:text-gray-400 dark:hover:text-gray-300">
              Contact
            </Link>
            <Link href="/lab" className="text-gray-700 hover:text-green-600 dark:text-gray-400 dark:hover:text-gray-300">
              Lab Results
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-green-600 dark:text-gray-400 dark:hover:text-gray-300">
              Blog
            </Link>
          </nav>
        </div>
        <div className="space-y-3">
          <h4 className="text-lg font-semibold">Legal</h4>
          <nav className="flex flex-col space-y-2" aria-label="Legal navigation">
            <Link href="/privacy" className="text-gray-700 hover:text-green-600 dark:text-gray-400 dark:hover:text-gray-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-700 hover:text-green-600 dark:text-gray-400 dark:hover:text-gray-300">
              Terms of Service
            </Link>
            <Link href="/shipping" className="text-gray-700 hover:text-green-600 dark:text-gray-400 dark:hover:text-gray-300">
              Shipping Policy
            </Link>
            <Link href="/faq" className="text-gray-700 hover:text-green-600 dark:text-gray-400 dark:hover:text-gray-300">
              FAQ
            </Link>
          </nav>
        </div>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold">Subscribe to our newsletter</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Get the latest updates on new products and upcoming sales.
            </p>
          </div>
          <form className="flex space-x-2" aria-labelledby="newsletter-heading">
            <span id="newsletter-heading" className="sr-only">Newsletter signup</span>
            <Input
              className="max-w-[180px] flex-1"
              placeholder="Enter your email"
              type="email"
              aria-label="Email address"
              required
            />
            <Button type="submit">Subscribe</Button>
          </form>
          <div className="flex space-x-4">
            <a href="https://twitter.com/twistlycbd" className="text-gray-700 hover:text-blue-400 dark:text-gray-400 dark:hover:text-gray-300" aria-label="Twitter">
              <Twitter className="h-5 w-5" aria-hidden="true" />
            </a>
            <a href="https://facebook.com/twistlycbd" className="text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-gray-300" aria-label="Facebook">
              <Facebook className="h-5 w-5" aria-hidden="true" />
            </a>
            <a href="https://instagram.com/twistlycbd" className="text-gray-700 hover:text-pink-600 dark:text-gray-400 dark:hover:text-gray-300" aria-label="Instagram">
              <Instagram className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto flex w-full max-w-7xl flex-col justify-between gap-4 px-4 py-6 text-sm md:flex-row lg:px-8">
          <p className="text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Twistly CBD. All rights reserved.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            <span className="font-medium">Disclaimer:</span> Products are not intended to diagnose,
            treat, cure or prevent any disease.
          </p>
        </div>
      </div>
    </footer>
  )
} 