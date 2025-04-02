import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, User, Tag, ArrowRight, ChevronRight, Search } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample blog post data
const featuredPost = {
  id: 'cbd-for-sleep',
  title: 'How CBD Can Improve Your Sleep Quality',
  excerpt: 'Discover the science behind CBD\'s effects on sleep cycles and how it can help you achieve deeper, more restful sleep naturally.',
  coverImage: '/images/hemp-background.jpg',
  date: 'May 15, 2023',
  readTime: '7 min read',
  author: {
    name: 'Sarah Johnson',
    avatar: '/images/founder.jpg'
  },
  category: 'Wellness'
}

const recentPosts = [
  {
    id: 'cbd-anxiety',
    title: 'CBD for Anxiety: What the Research Shows',
    excerpt: 'An evidence-based look at how cannabidiol interacts with your body\'s stress response system.',
    coverImage: '/images/tincture2.png',
    date: 'April 28, 2023',
    readTime: '5 min read',
    author: {
      name: 'Michael Chen',
      avatar: '/images/cofounder.jpg'
    },
    category: 'Health'
  },
  {
    id: 'topical-cbd',
    title: 'The Complete Guide to Topical CBD Products',
    excerpt: 'From creams to balms, learn how to choose the right topical CBD product for your needs.',
    coverImage: '/images/5.png',
    date: 'April 15, 2023',
    readTime: '8 min read',
    author: {
      name: 'Emma Reynolds',
      avatar: ''
    },
    category: 'Beauty'
  },
  {
    id: 'athletes-cbd',
    title: 'Why Professional Athletes Are Turning to CBD',
    excerpt: 'How CBD is revolutionizing recovery routines for elite athletes across various sports.',
    coverImage: '/images/4.png',
    date: 'March 30, 2023',
    readTime: '6 min read',
    author: {
      name: 'Carlos Rivera',
      avatar: ''
    },
    category: 'Sport'
  },
  {
    id: 'cbd-myths',
    title: 'Debunking Common CBD Myths and Misconceptions',
    excerpt: 'Separating fact from fiction when it comes to CBD\'s effects, legality, and usage.',
    coverImage: '/images/3.png',
    date: 'March 12, 2023',
    readTime: '9 min read',
    author: {
      name: 'Sarah Johnson',
      avatar: '/images/founder.jpg'
    },
    category: 'Education'
  },
  {
    id: 'cbd-dosage',
    title: 'Finding Your Optimal CBD Dosage: A Personalized Approach',
    excerpt: 'Learn how to determine the right CBD dosage based on your unique body chemistry and wellness goals.',
    coverImage: '/images/softgel.png',
    date: 'February 25, 2023',
    readTime: '7 min read',
    author: {
      name: 'Michael Chen',
      avatar: '/images/cofounder.jpg'
    },
    category: 'Wellness'
  },
  {
    id: 'cbd-skincare',
    title: 'CBD in Skincare: Benefits for Acne, Aging, and Sensitive Skin',
    excerpt: 'The science behind CBD\'s anti-inflammatory and antioxidant properties for skin health.',
    coverImage: '/images/5.png',
    date: 'February 10, 2023',
    readTime: '6 min read',
    author: {
      name: 'Emma Reynolds',
      avatar: ''
    },
    category: 'Beauty'
  }
]

const categories = [
  { name: 'All', count: 12 },
  { name: 'Wellness', count: 5 },
  { name: 'Health', count: 3 },
  { name: 'Beauty', count: 2 },
  { name: 'Sport', count: 3 },
  { name: 'Education', count: 4 }
]

export default function BlogPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
          The Twistly Blog
        </h1>
        <p className="text-xl text-gray-600">
          Insights, research, and stories exploring the world of CBD wellness.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search articles..." 
              className="pl-10 bg-white/80 border-green-100 focus:border-green-300 h-12" 
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge 
                key={category.name}
                variant={category.name === 'All' ? 'default' : 'outline'} 
                className={category.name === 'All' 
                  ? "bg-green-700 hover:bg-green-800 text-white"
                  : "bg-white hover:bg-green-50 border-green-200 text-green-700 cursor-pointer"
                }
              >
                {category.name}
                <span className="ml-1.5 text-xs">{category.count}</span>
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Post */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-green-800 mb-6">Featured Article</h2>
        <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative h-64 md:h-auto">
              <Image
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-green-700 hover:bg-green-800">
                  {featuredPost.category}
                </Badge>
              </div>
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-between">
              <div>
                <CardTitle className="text-2xl lg:text-3xl font-bold text-green-800 mb-4">
                  {featuredPost.title}
                </CardTitle>
                <CardDescription className="text-gray-600 text-base mb-4">
                  {featuredPost.excerpt}
                </CardDescription>
              </div>
              
              <div>
                <div className="flex items-center mb-5 text-sm text-gray-500">
                  <div className="flex items-center mr-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarFallback className="bg-green-100 text-green-700">
                        {featuredPost.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{featuredPost.author.name}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="text-green-700 hover:text-green-800 hover:bg-green-50 p-0"
                  >
                    Read more <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Recent Posts */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-green-800">Recent Articles</h2>
          <Button variant="ghost" className="text-green-700 hover:text-green-800 hover:bg-green-50">
            View all <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow border-green-100">
              <div className="relative">
                <AspectRatio ratio={16/9}>
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </AspectRatio>
                <div className="absolute top-3 left-3">
                  <Badge className="bg-green-700 hover:bg-green-800">
                    {post.category}
                  </Badge>
                </div>
              </div>
              <CardHeader className="pt-5 px-5 pb-0">
                <CardTitle className="text-xl font-bold text-green-800 line-clamp-2 hover:text-green-700 transition-colors">
                  <Link href={`/blog/${post.id}`} className="hover:underline">
                    {post.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-5 pt-3">
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarFallback className="bg-green-100 text-green-700 text-xs">
                        {post.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-xs font-medium">{post.author.name}</p>
                    </div>
                  </div>
                  <div className="flex text-xs text-gray-500">
                    <span>{post.date}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0 px-5 pb-5">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-green-700 hover:text-green-800 hover:bg-green-50 px-0"
                >
                  Read article <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="mt-20 bg-green-50 rounded-2xl p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">Stay Updated with CBD Insights</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest research, wellness tips, and exclusive content delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input 
              placeholder="Your email address" 
              className="h-12 bg-white border-green-100"
            />
            <Button className="bg-green-700 hover:bg-green-800 text-white h-12">
              Subscribe
            </Button>
          </div>
          <p className="mt-4 text-xs text-gray-500">
            By subscribing, you agree to receive marketing emails from Twistly CBD. You can unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  )
} 