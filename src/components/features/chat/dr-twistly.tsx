"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Bot, ArrowRight, MessageSquare, Star, Beaker, Brain, Sparkles, Activity, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

// Define the response categories and their specialized responses
const specializedResponses = {
  health: [
    "Based on your symptoms, our Full Spectrum CBD Oil might be beneficial. It contains the full range of cannabinoids that work together for enhanced effectiveness.",
    "For anxiety management, I recommend our CBD Calm Capsules with adaptogens. They're specifically formulated to promote relaxation without drowsiness.",
    "To support better sleep, our Sleep CBD Formula with melatonin and CBN would be ideal. These compounds work synergistically.",
    "For general wellness, starting with our Daily Balance CBD Oil at 500mg strength would be perfect for beginners."
  ],
  sport: [
    "For post-workout recovery, our Sport CBD Balm would be ideal. It contains 1000mg of CBD plus cooling menthol for targeted muscle relief.",
    "Based on your training intensity, I recommend our Performance CBD Oil. It's formulated with higher CBD concentration for better recovery.",
    "To support joint health during training, our Sport CBD Capsules provide precise dosing and sustained release throughout your workout.",
    "For immediate post-exercise relief, try our Cooling CBD Gel with menthol and arnica for fast-acting comfort."
  ],
  beauty: [
    "For anti-aging concerns, our CBD Face Serum with hyaluronic acid would be perfect. It helps reduce fine lines while improving skin elasticity.",
    "To address acne-prone skin, try our CBD Facial Cream. It helps regulate oil production and reduce inflammation.",
    "For sensitive skin, our gentle CBD Body Lotion is ideal. It's formulated without harsh chemicals and includes soothing botanicals.",
    "To enhance your skincare routine, our CBD Bath Bombs provide relaxation while nourishing your skin."
  ],
  hybrid: [
    "For cognitive support, I recommend our Lion's Mane CBD Capsules. They combine the neurotropic benefits of mushrooms with CBD.",
    "Our Chaga Immune Support formula would be perfect for immune system enhancement. It combines powerful antioxidants with CBD.",
    "For stress management, try our Reishi Calm Gummies. They combine the adaptogenic properties of Reishi with calming CBD.",
    "To boost energy and performance, our Cordyceps Energy Blend is ideal. It supports stamina and oxygen utilization."
  ],
  pet: [
    "For anxious pets, our Pet CBD Calming Drops are perfect. They're specially formulated to promote relaxation without sedation.",
    "To support aging pets' mobility, try our Joint Support CBD Treats. They combine CBD with glucosamine for comprehensive joint health.",
    "For sensitive pets, our Pet CBD Oil is ideal. It's gentle and can be easily mixed with food or given directly.",
    "To address skin issues, our Pet CBD Balm can help soothe irritation and support a healthy coat."
  ]
}

// Define product recommendations that correspond to each response
const productRecommendations = {
  health: [
    {
      name: "Full Spectrum CBD Oil",
      description: "Our premium full-spectrum formula for complete relief",
      price: "$59.99",
      image: "/products/cbd-oil-full.png",
      link: "/product/full-spectrum-cbd-oil"
    },
    {
      name: "CBD Calm Capsules",
      description: "Formulated with adaptogens for anxiety relief",
      price: "$49.99",
      image: "/products/cbd-capsules.png",
      link: "/product/cbd-calm-capsules"
    },
    {
      name: "Sleep CBD Formula",
      description: "With melatonin and CBN for better sleep",
      price: "$54.99",
      image: "/products/sleep-formula.png",
      link: "/product/sleep-cbd-formula"
    },
    {
      name: "Daily Balance CBD Oil",
      description: "Perfect for beginners - 500mg strength",
      price: "$39.99",
      image: "/products/daily-balance.png",
      link: "/product/daily-balance-oil"
    }
  ],
  sport: [
    {
      name: "Sport CBD Balm",
      description: "1000mg CBD with cooling menthol for recovery",
      price: "$49.99",
      image: "/products/sport-balm.png",
      link: "/product/sport-cbd-balm"
    },
    {
      name: "Performance CBD Oil",
      description: "Higher concentration for intense training",
      price: "$64.99",
      image: "/products/performance-oil.png",
      link: "/product/performance-cbd-oil"
    },
    {
      name: "Sport CBD Capsules",
      description: "Precise dosing for sustained release",
      price: "$54.99",
      image: "/products/sport-capsules.png",
      link: "/product/sport-cbd-capsules"
    },
    {
      name: "Cooling CBD Gel",
      description: "Fast-acting relief with menthol and arnica",
      price: "$44.99",
      image: "/products/cooling-gel.png",
      link: "/product/cooling-cbd-gel"
    }
  ],
  beauty: [
    {
      name: "CBD Face Serum",
      description: "With hyaluronic acid for anti-aging",
      price: "$69.99",
      image: "/products/face-serum.png",
      link: "/product/cbd-face-serum"
    },
    {
      name: "CBD Facial Cream",
      description: "Regulates oil production for acne-prone skin",
      price: "$59.99",
      image: "/products/facial-cream.png",
      link: "/product/cbd-facial-cream"
    },
    {
      name: "CBD Body Lotion",
      description: "Gentle formula for sensitive skin",
      price: "$49.99",
      image: "/products/body-lotion.png",
      link: "/product/cbd-body-lotion"
    },
    {
      name: "CBD Bath Bombs",
      description: "Relaxation while nourishing your skin",
      price: "$29.99",
      image: "/products/bath-bombs.png",
      link: "/product/cbd-bath-bombs"
    }
  ],
  hybrid: [
    {
      name: "Lion's Mane CBD Capsules",
      description: "Cognitive support with neurotropic benefits",
      price: "$64.99",
      image: "/products/lions-mane.png",
      link: "/product/lions-mane-capsules"
    },
    {
      name: "Chaga Immune Support",
      description: "Powerful antioxidants with CBD",
      price: "$59.99",
      image: "/products/chaga.png",
      link: "/product/chaga-immune-support"
    },
    {
      name: "Reishi Calm Gummies",
      description: "Adaptogenic properties for stress management",
      price: "$44.99",
      image: "/products/reishi-gummies.png",
      link: "/product/reishi-gummies"
    },
    {
      name: "Cordyceps Energy Blend",
      description: "Supports stamina and oxygen utilization",
      price: "$54.99",
      image: "/products/cordyceps.png",
      link: "/product/cordyceps-energy-blend"
    }
  ],
  pet: [
    {
      name: "Pet CBD Calming Drops",
      description: "Specially formulated for anxious pets",
      price: "$49.99",
      image: "/products/pet-drops.png",
      link: "/product/pet-cbd-drops"
    },
    {
      name: "Joint Support CBD Treats",
      description: "With glucosamine for aging pets",
      price: "$39.99",
      image: "/products/joint-treats.png",
      link: "/product/joint-support-treats"
    },
    {
      name: "Pet CBD Oil",
      description: "Gentle formula for sensitive pets",
      price: "$44.99",
      image: "/products/pet-oil.png",
      link: "/product/pet-cbd-oil"
    },
    {
      name: "Pet CBD Balm",
      description: "Soothes skin irritation for a healthy coat",
      price: "$34.99",
      image: "/products/pet-balm.png",
      link: "/product/pet-cbd-balm"
    }
  ]
};

const placeholderQuestions = [
  "What CBD product is best for sleep issues?",
  "Can CBD help with anxiety and stress?",
  "What's the recommended dosage for beginners?",
  "Are there any side effects I should know about?",
  "How long does it take to feel the effects?"
]

interface DrTwistlyProps {
  category?: 'health' | 'sport' | 'beauty' | 'hybrid' | 'pet'
  variant?: 'dialog' | 'inline'
  className?: string
}

export function DrTwistly({ category = 'health', variant = 'dialog', className }: DrTwistlyProps) {
  const [aiResponse, setAiResponse] = useState<string>("")
  const [userQuestion, setUserQuestion] = useState<string>("")
  const [isAiTyping, setIsAiTyping] = useState<boolean>(false)
  const [selectedResponseIndex, setSelectedResponseIndex] = useState<number>(-1)

  const categoryStyles = {
    health: {
      color: 'green',
      icon: <Beaker className="h-5 w-5" />,
      title: 'CBD Health Expert'
    },
    sport: {
      color: 'blue',
      icon: <Activity className="h-5 w-5" />,
      title: 'Sports Performance Expert'
    },
    beauty: {
      color: 'purple',
      icon: <Sparkles className="h-5 w-5" />,
      title: 'Beauty & Skincare Expert'
    },
    hybrid: {
      color: 'amber',
      icon: <Brain className="h-5 w-5" />,
      title: 'Hybrid & Mushroom Expert'
    },
    pet: {
      color: 'orange',
      icon: <Bot className="h-5 w-5" />,
      title: 'Pet CBD Expert'
    }
  }

  const handleAskDoctor = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userQuestion.trim()) return

    setIsAiTyping(true)
    setAiResponse("")

    // Get category-specific responses
    const responses = specializedResponses[category]
    const responseIndex = Math.floor(Math.random() * responses.length)
    setSelectedResponseIndex(responseIndex)
    const randomResponse = responses[responseIndex]
    let displayText = ""

    const typeWriter = (text: string, i: number = 0) => {
      if (i < text.length) {
        displayText += text.charAt(i)
        setAiResponse(displayText)
        setTimeout(() => typeWriter(text, i + 1), 30)
      } else {
        setIsAiTyping(false)
      }
    }

    setTimeout(() => typeWriter(randomResponse), 1000)
    setUserQuestion("")
  }

  const content = (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className={cn(
          "p-2 rounded-lg",
          `bg-${categoryStyles[category].color}-600 text-white`
        )}>
          {categoryStyles[category].icon}
        </div>
        <div>
          <h3 className="font-semibold text-lg">Dr. Twistly</h3>
          <p className="text-sm text-gray-500">{categoryStyles[category].title}</p>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg min-h-[280px] max-h-[350px] overflow-y-auto">
        {aiResponse ? (
          <div className="space-y-4">
            <div className="text-gray-800">
              {aiResponse}
              {isAiTyping && (
                <span className={cn(
                  "inline-block w-1.5 h-4 ml-1 animate-pulse",
                  `bg-${categoryStyles[category].color}-600`
                )} />
              )}
            </div>
            
            {!isAiTyping && selectedResponseIndex > -1 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="mb-2 text-sm font-medium text-gray-700">Recommended Product:</div>
                <a 
                  href={productRecommendations[category][selectedResponseIndex].link}
                  className="block p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                      <Leaf className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {productRecommendations[category][selectedResponseIndex].name}
                      </div>
                      <div className="text-sm text-gray-500 line-clamp-1">
                        {productRecommendations[category][selectedResponseIndex].description}
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {productRecommendations[category][selectedResponseIndex].price}
                    </div>
                  </div>
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-500 italic">
              Ask me about which CBD products might be right for your needs...
            </p>
            <div className="grid gap-2">
              {placeholderQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setUserQuestion(question)}
                  className={cn(
                    "text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors",
                    "text-gray-600 hover:text-gray-900",
                    "border border-gray-200 hover:border-gray-300"
                  )}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleAskDoctor} className="flex gap-2">
        <input
          type="text"
          value={userQuestion}
          onChange={(e) => setUserQuestion(e.target.value)}
          placeholder="Type your question here..."
          className={cn(
            "flex-1 border rounded-md px-3 py-2 text-sm",
            "focus:outline-none focus:ring-2",
            `focus:ring-${categoryStyles[category].color}-600/30`
          )}
          disabled={isAiTyping}
        />
        <Button 
          type="submit"
          className={cn(
            `bg-${categoryStyles[category].color}-600`,
            `hover:bg-${categoryStyles[category].color}-700`,
            "text-white"
          )}
          disabled={isAiTyping || !userQuestion.trim()}
        >
          {isAiTyping ? "Thinking..." : "Ask"}
        </Button>
      </form>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-3.5 w-3.5" />
          <span>24/7 Available</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span>4.9 (2,156 consultations)</span>
        </div>
      </div>
    </div>
  )

  if (variant === 'inline') {
    return (
      <Card className={cn("shadow-lg", className)}>
        <CardContent className="p-6">
          {content}
        </CardContent>
      </Card>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          className={cn(
            "gap-2",
            `bg-${categoryStyles[category].color}-600`,
            `hover:bg-${categoryStyles[category].color}-700`,
            "text-white",
            className
          )}
          data-dr-twistly-trigger
        >
          <Bot className="h-4 w-4" />
          Ask Dr. Twistly
          <ArrowRight className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        {content}
      </DialogContent>
    </Dialog>
  )
} 