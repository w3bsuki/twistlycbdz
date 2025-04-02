'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface NewsletterProps {
  title?: string
  description?: string
  buttonText?: string
  backgroundColor?: string
  buttonClasses?: string
}

export function Newsletter({
  title = "Subscribe to Our Newsletter",
  description = "Get the latest news, product updates, and exclusive offers delivered to your inbox.",
  buttonText = "Subscribe",
  backgroundColor = "bg-white",
  buttonClasses = "bg-blue-600 hover:bg-blue-700 text-white",
}: NewsletterProps) {
  return (
    <section className={`py-12 relative overflow-hidden ${backgroundColor}`}>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-50/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-50/20 rounded-full blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg p-6 md:p-8"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {title}
            </h3>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              {description}
            </p>
          </div>
          
          <form onSubmit={(e) => e.preventDefault()} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="rounded-lg border-gray-200 flex-grow"
                required
              />
              <Button 
                type="submit" 
                className={`rounded-lg px-6 ${buttonClasses}`}
              >
                {buttonText}
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </motion.div>
      </Container>
    </section>
  )
} 