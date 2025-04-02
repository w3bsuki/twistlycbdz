'use client'

import React from 'react'
import Image from 'next/image'
import { Bot, SendHorizonal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface AiChatHeroProps {
  title?: string
  subtitle?: string
  className?: string
  containerClassName?: string
  shadowClassName?: string
  position?: 'left' | 'center' | 'right'
}

export function AiChatHero({
  title = 'Get Personalized CBD Recommendations',
  subtitle = 'Ask Dr. Twistly about CBD products for your health and wellness needs',
  className = '',
  containerClassName = '',
  shadowClassName = 'bg-green-900/10',
  position = 'left',
}: AiChatHeroProps) {
  return (
    <div className={`relative ${containerClassName}`}>
      {/* Shadow element */}
      <div className={`absolute -inset-1 rounded-xl blur-xl ${shadowClassName} z-0`} />
      
      <div className="relative z-10 bg-gradient-to-br from-white/80 to-green-50/90 border border-green-100 backdrop-blur-md p-6 rounded-xl shadow-lg">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 rounded-full ring-4 ring-green-200 bg-white p-1 flex items-center justify-center overflow-hidden">
            <Image 
              src="/images/logos/1.png"
              alt="Dr. Twistly"
              width={56}
              height={56}
              className="object-contain"
            />
          </div>
          
          <div className="flex-1">
            <h3 className="font-bold text-white text-lg">
              <span className="bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                {title}
              </span>
            </h3>
            <p className="text-green-800 text-sm mb-4">
              {subtitle}
            </p>
          </div>
        </div>
        
        <Card className="mt-3 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-3">
            <div className="p-3 rounded-md bg-green-50 text-green-700 text-sm max-w-[80%] mb-3 shadow-sm border border-green-100">
              <div className="overflow-hidden text-ellipsis">Hi, I am Dr. Twistly, your CBD and Wellness Guide. How can I help you today? 😊</div>
            </div>
            
            <div className="flex gap-2 mt-2">
              <Input 
                className="flex-1 bg-white border-green-100 text-sm" 
                placeholder="Ask about CBD wellness products..."
              />
              <Button 
                size="icon" 
                className="bg-green-600 hover:bg-green-700 text-white"
                aria-label="Send message"
              >
                <SendHorizonal className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 