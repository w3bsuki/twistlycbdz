"use client";

import { Container } from '@/components/ui/container'
import { DrTwistly } from '@/components/features/chat/dr-twistly'
import { Sparkles, Bot, MessageCircle, Star, CheckCircle, Brain, ArrowRight, User, Beaker } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

// Sample chat bubbles for visual display
const sampleChat = [
  { 
    type: 'user', 
    message: 'I\'ve been having trouble sleeping. Any CBD products that could help?'
  },
  { 
    type: 'ai', 
    message: 'Based on your sleep concerns, I\'d recommend our Sleep CBD Formula with melatonin and CBN. These compounds work synergistically to promote better sleep quality.',
    product: {
      name: 'Sleep CBD Formula',
      description: 'With melatonin and CBN for better sleep',
      price: '$54.99'
    }
  },
  { 
    type: 'user', 
    message: 'What\'s the recommended dosage?'
  },
  { 
    type: 'ai', 
    message: 'For our Sleep CBD Formula, we recommend taking 1-2 capsules about 30 minutes before bedtime. Start with one capsule and adjust as needed based on your response.'
  }
];

// Health benefits of CBD
const healthBenefits = [
  'Better sleep quality',
  'Reduced anxiety & stress',
  'Pain & inflammation relief',
  'Improved mood & focus'
];

export function DrTwistlySection() {
  return (
    <section className="w-full py-6 md:py-8 lg:py-10 bg-gradient-to-b from-emerald-50 to-white">
      {/* Background decoration - simplified for mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full opacity-30 blur-3xl bg-emerald-500/40"></div>
        <div className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full opacity-30 blur-3xl bg-emerald-500/30"></div>
      </div>
      
      {/* Main container - matching responsive approach used in other sections */}
      <Container className="relative z-10 bg-white backdrop-blur-sm rounded-xl shadow-md border border-green-200/90 p-3 sm:p-4 w-full mx-auto">
        {/* Header with nested container design */}
        <div className="mb-3">
          {/* Nested container for the section header - matching category styling */}
          <div className="bg-gradient-to-b from-green-50/80 to-white p-2 rounded-xl border border-green-100/80 shadow-sm relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20 blur-2xl bg-green-200/30"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full opacity-20 blur-2xl bg-emerald-100/30"></div>
            </div>
            
            <div className="text-center relative z-10">
              {/* Spinning logo with improved styling */}
              <div className="flex justify-center mb-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full relative bg-transparent transition-all duration-500 shadow-[0_10px_20px_rgba(var(--emerald-rgb)/0.15),_inset_0_0_0_1px_rgba(var(--emerald-rgb)/0.2)] p-0.5">
                  <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden bg-transparent after:absolute after:inset-0 after:rounded-full after:shadow-inner">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ 
                        duration: 20, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }}
                      className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center relative z-10"
                    >
                      <Bot className="h-4 w-4 text-emerald-500 drop-shadow-md" />
                    </motion.div>
                  </div>
                </div>
              </div>
              
              <div className="relative z-10 px-2 py-1 inline-block rounded-lg bg-white/80 backdrop-blur-sm shadow-sm border border-gray-100/50 mb-2">
                <div className="inline-flex bg-gradient-to-br from-green-50/80 to-white rounded-full border border-green-200/40 shadow-sm p-0.5 mb-1">
                  <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1 text-xs font-medium">
                    <Sparkles className="h-2.5 w-2.5" />
                    <span>AI-Powered Guidance</span>
                  </div>
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 drop-shadow-sm">
                  Meet Dr. Twistly, Your Personal CBD Consultant
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto mt-0.5">
                  Not sure which CBD products are right for you? Our AI expert can help find the perfect match
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content area - improved layout with modern chat interface */}
        <div className="grid md:grid-cols-12 gap-3 items-center">
          {/* Left column with AI info and benefits */}
          <div className="md:col-span-5 space-y-3">
            {/* Dr Twistly Profile Card */}
            <Card className="overflow-hidden border-green-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-2.5 text-white">
                <div className="flex items-center gap-2.5">
                  <div className="h-10 w-10 rounded-full overflow-hidden relative border-2 border-white/50 shadow-md">
                    <Image
                      src="/images/logos/1.png" 
                      alt="Dr. Twistly" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">Dr. Twistly</h3>
                    <div className="flex items-center text-xs text-white/90">
                      <Beaker className="h-3 w-3 mr-1" />
                      <span>CBD Health Expert</span>
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">4.9 stars (2,000+ consultations)</span>
                </div>
                
                <div className="space-y-2">
                  {healthBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-4 w-4 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-2.5 w-2.5 text-green-600" />
                      </div>
                      <span className="ml-2 text-gray-700 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-2 mt-2">
                  <Button 
                    className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white shadow-md border-0 w-full flex items-center justify-center gap-1.5 h-8 text-sm"
                    onClick={() => document.querySelector('[data-dr-twistly-trigger]')?.dispatchEvent(
                      new MouseEvent('click', { bubbles: true })
                    )}
                  >
                    Ask Dr. Twistly
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* AI Chat Showcase in right column */}
          <div className="md:col-span-7">
            <Card className="border-green-200 shadow-lg hover:shadow-xl transition-shadow overflow-hidden rounded-xl">
              {/* Chat header */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-2 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-medium">Dr. Twistly</div>
                    <div className="text-[10px] text-white/80 flex items-center">
                      <span className="inline-block h-1 w-1 rounded-full bg-green-300 mr-1"></span>
                      Online now
                    </div>
                  </div>
                </div>
                <Badge className="bg-white/20 text-white hover:bg-white/30 transition-colors border-0 h-5 text-[10px] px-1.5">
                  AI Powered
                </Badge>
              </div>
              
              {/* Chat area */}
              <div className="p-2.5 bg-gray-50 min-h-[220px] max-h-[220px] overflow-auto">
                <div className="space-y-2">
                  {sampleChat.map((message, index) => (
                    <div key={index} className={cn(
                      "flex",
                      message.type === 'user' ? "justify-end" : "justify-start"
                    )}>
                      <div className={cn(
                        "max-w-[85%] rounded-xl p-2",
                        message.type === 'user' 
                          ? "bg-green-600 text-white rounded-tr-none"
                          : "bg-white border border-gray-200 shadow-sm rounded-tl-none"
                      )}>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <div className="h-4 w-4 rounded-full flex items-center justify-center bg-white/20">
                            {message.type === 'user' 
                              ? <User className="h-2.5 w-2.5 text-white" />
                              : <Bot className="h-2.5 w-2.5 text-green-600" />
                            }
                          </div>
                          <div className={cn(
                            "text-[10px] font-medium",
                            message.type === 'user' ? "text-white/90" : "text-gray-500"
                          )}>
                            {message.type === 'user' ? 'You' : 'Dr. Twistly'}
                          </div>
                        </div>
                        
                        <p className={cn(
                          "text-[11px] sm:text-xs",
                          message.type === 'user' ? "text-white" : "text-gray-700"
                        )}>
                          {message.message}
                        </p>
                        
                        {message.product && (
                          <div className="mt-1 pt-1 border-t border-gray-200">
                            <div className="flex items-center justify-between text-[10px] font-medium text-gray-900">
                              <span>{message.product.name}</span>
                              <span className="text-green-600">{message.product.price}</span>
                            </div>
                            <p className="text-[10px] text-gray-500">{message.product.description}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Input area */}
              <div className="p-2 border-t border-gray-200 flex items-center gap-2">
                <div className="flex-1 relative">
                  <input 
                    type="text" 
                    placeholder="Ask about CBD products..." 
                    className="w-full text-sm py-1.5 px-3 rounded-full border border-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <Button 
                  size="sm" 
                  className="rounded-full h-8 w-8 p-0 flex items-center justify-center bg-green-600 hover:bg-green-700 shadow-sm"
                  data-dr-twistly-trigger
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
} 