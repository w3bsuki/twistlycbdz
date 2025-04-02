'use client'

import React, { useState, useEffect } from 'react'
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  BookOpen, 
  ThumbsUp, 
  Brain, 
  HeartPulse, 
  Zap,
  UserCircle2
} from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"
import { BlogSectionSkeleton } from './blog-section-skeleton'

// Blog article data
const blogArticles = [
  {
    title: "CBD for Anxiety and Stress Management: What Science Says",
    date: "May 15, 2024",
    readTime: "8 min read",
    image: "/images/hemp-background.jpg",
    category: "Mental Health",
    categoryColor: "bg-green-600",
    excerpt: "Explore the scientific evidence behind CBD's potential to reduce anxiety and manage stress in everyday life.",
    author: "Dr. Emma Wilson",
    authorRole: "Neuroscientist",
    icon: <Brain className="h-6 w-6 text-green-500" />,
    href: "/blog/cbd-anxiety-stress-management",
    tags: ["Anxiety", "Stress Relief", "Mental Health"]
  },
  {
    title: "How CBD Supports Recovery After Intense Workouts",
    date: "June 2, 2024",
    readTime: "6 min read",
    image: "/images/2.png",
    category: "Sport & Recovery",
    categoryColor: "bg-red-600",
    excerpt: "Discover how CBD helps athletes recover faster and reduce inflammation and muscle soreness after intense training sessions.",
    author: "Mark Stevens",
    authorRole: "Sports Physiologist",
    icon: <Zap className="h-6 w-6 text-red-500" />,
    href: "/blog/cbd-workout-recovery",
    tags: ["Recovery", "Inflammation", "Performance"]
  },
  {
    title: "CBD and Sleep: Improving Your Nightly Rest Naturally",
    date: "April 28, 2024",
    readTime: "7 min read",
    image: "/images/3.png",
    category: "Wellness",
    categoryColor: "bg-indigo-600",
    excerpt: "Learn how CBD could help improve sleep quality and address common sleep issues without the side effects of traditional sleep medications.",
    author: "Dr. Sarah Chen",
    authorRole: "Sleep Specialist",
    icon: <HeartPulse className="h-6 w-6 text-indigo-500" />,
    href: "/blog/cbd-sleep-improvement",
    tags: ["Sleep", "Relaxation", "Wellness"]
  }
]

export function BlogSection() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return <BlogSectionSkeleton />;
  }

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white to-green-50 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />
      
      <Container>
        <div className="flex flex-col items-center mb-8">
          <Badge className="bg-green-600 text-white hover:bg-green-700 px-3 py-0.5 rounded-full text-xs mb-3">
            <BookOpen className="mr-1 h-3 w-3" />
            Featured Articles
          </Badge>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-800 via-green-600 to-green-700 mb-2">
            Learn About CBD Benefits
          </h2>
          <p className="text-green-700 text-sm md:text-base max-w-3xl mx-auto text-center">
            Discover the latest research and insights about how CBD can enhance your wellness journey
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          {blogArticles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              whileHover={{ y: -3, transition: { duration: 0.15 } }}
              className="transition-all"
            >
              <Card className="group overflow-hidden border border-green-100 hover:border-green-300 shadow-sm transition-all duration-200 h-full flex flex-col">
                <div className="relative">
                  <div className="relative h-44 w-full overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.2 }}
                      className="h-full w-full"
                    >
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        className="object-cover"
                        priority={index === 0}
                        loading={index === 0 ? "eager" : "lazy"}
                        quality={80}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </motion.div>
                    <div className="absolute top-2 left-2 z-10">
                      <Badge className={`${article.categoryColor} text-white text-xs px-2 py-0.5`}>
                        {article.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <CardContent className="flex-1 p-4">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-base mb-2 group-hover:text-green-700 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-auto">
                    <div className="rounded-full w-6 h-6 bg-green-100 flex items-center justify-center">
                      <div className="scale-75">{article.icon}</div>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-900">{article.author}</p>
                      <p className="text-[10px] text-gray-500">{article.authorRole}</p>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                  <div className="w-full flex justify-between items-center">
                    <div className="flex gap-1.5">
                      {article.tags.slice(0, 2).map((tag, i) => (
                        <Badge key={i} variant="outline" className="bg-gray-50 text-[10px] px-1.5 py-0">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Link 
                      href={article.href} 
                      className="text-green-700 font-medium text-xs flex items-center gap-1 group-hover:gap-1.5 transition-all"
                    >
                      Read More <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Explore Button */}
        <div className="flex justify-center">
          <Button 
            asChild 
            size="sm" 
            className="bg-green-700 hover:bg-green-800 text-white text-sm rounded-full px-6 py-1.5 shadow-sm group"
          >
            <Link href="/blog" className="flex items-center">
              Explore All Articles
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  )
} 