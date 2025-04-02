import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ChevronLeft, Share2, Bookmark, Heart, MessageSquare } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

// Sample blog content - in a real app, this would come from a CMS or API
const posts = {
  'cbd-for-sleep': {
    title: 'How CBD Can Improve Your Sleep Quality',
    excerpt: 'Discover the science behind CBD\'s effects on sleep cycles and how it can help you achieve deeper, more restful sleep naturally.',
    coverImage: '/images/hemp-background.jpg',
    date: 'May 15, 2023',
    readTime: '7 min read',
    author: {
      name: 'Sarah Johnson',
      avatar: '',
      bio: 'Founder & CBD Specialist at Twistly, with a background in botany and natural wellness solutions.'
    },
    category: 'Wellness',
    content: `
      <p class="text-lg mb-6">Getting a good night's sleep is essential for overall health and wellbeing. Yet, for millions of people, quality sleep remains elusive. If you're one of the many individuals struggling with sleep issues, CBD might offer a natural solution worth exploring.</p>
      
      <h2 class="text-2xl font-bold text-green-800 mb-4 mt-8">Understanding Sleep Problems</h2>
      
      <p class="mb-4">Before diving into how CBD can help with sleep, it's important to understand the common causes of sleep problems:</p>
      
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Anxiety and stress</li>
        <li>Pain and discomfort</li>
        <li>Environmental factors (noise, light, temperature)</li>
        <li>Irregular sleep schedules</li>
        <li>Medical conditions and medications</li>
      </ul>
      
      <p class="mb-6">Many conventional sleep aids can cause side effects like grogginess, dependency, or altered sleep architecture. This has led many to seek natural alternatives, with CBD emerging as a promising option.</p>
      
      <h2 class="text-2xl font-bold text-green-800 mb-4 mt-8">How CBD Affects Sleep</h2>
      
      <p class="mb-4">CBD, or cannabidiol, interacts with the body's endocannabinoid system (ECS), which plays a role in regulating various physiological processes, including sleep. Here's how CBD may help improve sleep quality:</p>
      
      <h3 class="text-xl font-semibold text-green-700 mb-3 mt-6">Anxiety Reduction</h3>
      
      <p class="mb-6">One of the primary ways CBD may improve sleep is by addressing anxiety. Research suggests that CBD has anxiolytic (anxiety-reducing) properties. By calming the mind and reducing racing thoughts, CBD can help create the mental state conducive to falling asleep.</p>
      
      <div class="bg-green-50 p-6 rounded-xl mb-8">
        <p class="italic text-green-800">"In our clinical observations, patients who use CBD for anxiety often report improved sleep as a secondary benefit. The calming effect seems to create an ideal condition for sleep onset." — Dr. James Hartfield, Neurologist</p>
      </div>
      
      <h3 class="text-xl font-semibold text-green-700 mb-3 mt-6">Pain Management</h3>
      
      <p class="mb-6">For many people, physical discomfort prevents quality sleep. CBD has shown promise as an analgesic (pain-relieving) compound. By reducing pain, CBD may help remove a significant barrier to restful sleep.</p>
      
      <h3 class="text-xl font-semibold text-green-700 mb-3 mt-6">Direct Effects on Sleep Cycles</h3>
      
      <p class="mb-6">Some research indicates that CBD might directly influence sleep cycles. Preliminary studies suggest that CBD could increase overall sleep amounts and improve REM sleep behavior disorder symptoms. It may also reduce excessive daytime sleepiness and promote alertness during waking hours, which helps maintain a healthy sleep-wake cycle.</p>
      
      <h2 class="text-2xl font-bold text-green-800 mb-4 mt-8">Finding the Right CBD Product for Sleep</h2>
      
      <p class="mb-4">Not all CBD products are created equal, especially when it comes to supporting sleep. Here are some considerations when choosing a CBD product for sleep improvement:</p>
      
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li><strong>Full-spectrum vs. Isolate:</strong> Full-spectrum CBD contains multiple cannabinoids and terpenes that work together in what's known as the "entourage effect." For sleep, full-spectrum products may be more effective than CBD isolate.</li>
        <li><strong>Delivery Method:</strong> Tinctures and oils are absorbed quickly, while capsules and edibles provide longer-lasting effects. For sleep, a longer-acting form might be preferable.</li>
        <li><strong>Dosage:</strong> Start with a low dose and gradually increase until you find what works for you. Everyone's optimal dosage is different.</li>
        <li><strong>Timing:</strong> Take CBD about 30-60 minutes before bedtime for optimal effects on sleep.</li>
      </ul>
      
      <h2 class="text-2xl font-bold text-green-800 mb-4 mt-8">Our Recommended Products for Sleep</h2>
      
      <p class="mb-6">At Twistly, we've developed specialized CBD formulations designed to support quality sleep:</p>
      
      <div class="mb-8">
        <p class="font-semibold text-green-700 mb-2">Twistly Sleep Tincture</p>
        <p class="mb-2">Our premium full-spectrum CBD oil enhanced with calming terpenes and a touch of melatonin for optimal sleep support.</p>
      </div>
      
      <div class="mb-8">
        <p class="font-semibold text-green-700 mb-2">Tranquility Softgels</p>
        <p class="mb-2">Easy-to-take capsules combining CBD with sleep-supporting herbs like valerian root and chamomile.</p>
      </div>
      
      <h2 class="text-2xl font-bold text-green-800 mb-4 mt-8">Tips for Maximizing CBD's Sleep Benefits</h2>
      
      <p class="mb-4">To get the most out of CBD for sleep, combine it with good sleep hygiene practices:</p>
      
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Maintain a regular sleep schedule</li>
        <li>Create a relaxing bedtime routine</li>
        <li>Limit screen time before bed</li>
        <li>Create a comfortable sleep environment</li>
        <li>Avoid caffeine and heavy meals close to bedtime</li>
      </ul>
      
      <h2 class="text-2xl font-bold text-green-800 mb-4 mt-8">Conclusion</h2>
      
      <p class="mb-6">While more research is needed, existing evidence suggests that CBD has potential as a natural sleep aid, particularly when sleep issues are related to anxiety, pain, or certain sleep disorders. Its relatively low side effect profile makes it an attractive option for those seeking alternatives to conventional sleep medications.</p>
      
      <p class="mb-8">Remember to consult with a healthcare provider before starting any new supplement, especially if you have existing health conditions or take other medications.</p>
      
      <p class="text-sm italic text-gray-500 mb-4">Note: This article is for informational purposes only and is not intended as medical advice. Always consult with a qualified healthcare provider about your specific circumstances.</p>
    `,
    relatedPosts: ['cbd-anxiety', 'cbd-dosage', 'cbd-myths']
  },
  'cbd-anxiety': {
    title: 'CBD for Anxiety: What the Research Shows',
    excerpt: 'An evidence-based look at how cannabidiol interacts with your body\'s stress response system.',
    coverImage: '/images/tincture2.png',
    date: 'April 28, 2023',
    readTime: '5 min read',
    author: {
      name: 'Michael Chen',
      avatar: '',
      bio: 'Co-founder & Chief Scientist at Twistly with expertise in biochemistry and plant medicine.'
    },
    category: 'Health',
    content: '<p>This is a placeholder for the full article content.</p>',
    relatedPosts: ['cbd-for-sleep', 'cbd-dosage', 'cbd-myths']
  },
  'cbd-dosage': {
    title: 'Finding Your Optimal CBD Dosage: A Personalized Approach',
    excerpt: 'Learn how to determine the right CBD dosage based on your unique body chemistry and wellness goals.',
    coverImage: '/images/softgel.png',
    date: 'February 25, 2023',
    readTime: '7 min read',
    author: {
      name: 'Michael Chen',
      avatar: '',
      bio: 'Co-founder & Chief Scientist at Twistly with expertise in biochemistry and plant medicine.'
    },
    category: 'Wellness',
    content: '<p>This is a placeholder for the full article content.</p>',
    relatedPosts: ['cbd-for-sleep', 'cbd-anxiety', 'cbd-myths']
  },
  'cbd-myths': {
    title: 'Debunking Common CBD Myths and Misconceptions',
    excerpt: 'Separating fact from fiction when it comes to CBD\'s effects, legality, and usage.',
    coverImage: '/images/3.png',
    date: 'March 12, 2023',
    readTime: '9 min read',
    author: {
      name: 'Sarah Johnson',
      avatar: '',
      bio: 'Founder & CBD Specialist at Twistly, with a background in botany and natural wellness solutions.'
    },
    category: 'Education',
    content: '<p>This is a placeholder for the full article content.</p>',
    relatedPosts: ['cbd-for-sleep', 'cbd-anxiety', 'cbd-dosage']
  }
};

// This would typically be a server-side function that fetches the post data
const getPostData = (slug: string) => {
  return posts[slug as keyof typeof posts] || null;
};

// In Next.js 13+, this would be used for generating static paths
export async function generateStaticParams() {
  return Object.keys(posts).map(slug => ({
    slug
  }));
}

type BlogPostPageProps = {
  params: { 
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
  const post = getPostData(slug);
  
  if (!post) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Article not found</h1>
        <p className="mt-4 text-gray-600">The article you're looking for doesn't exist or has been moved.</p>
        <Button asChild className="mt-6 bg-green-700 hover:bg-green-800">
          <Link href="/blog">Return to Blog</Link>
        </Button>
      </div>
    );
  }

  // Get related posts data
  const relatedPostsData = post.relatedPosts
    .map(slug => posts[slug as keyof typeof posts])
    .filter(Boolean);

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <div className="mb-8">
        <Button variant="ghost" asChild className="text-green-700 hover:text-green-800 hover:bg-green-50 -ml-3">
          <Link href="/blog">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>
      
      {/* Article Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <Badge className="mb-4 bg-green-700">{post.category}</Badge>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-800 mb-6">
          {post.title}
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarFallback className="bg-green-100 text-green-700">
                {post.author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{post.author.name}</p>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-3 w-3 mr-1" />
                <span className="mr-3">{post.date}</span>
                <Clock className="h-3 w-3 mr-1" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-green-200 text-green-700 hover:bg-green-50">
              <Share2 className="mr-1 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="border-green-200 text-green-700 hover:bg-green-50">
              <Bookmark className="mr-1 h-4 w-4" />
              Save
            </Button>
          </div>
        </div>
      </div>
      
      {/* Featured Image */}
      <div className="max-w-5xl mx-auto mb-10">
        <AspectRatio ratio={21/9} className="bg-muted overflow-hidden rounded-xl">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </AspectRatio>
      </div>
      
      {/* Article Content */}
      <div className="max-w-3xl mx-auto">
        <div 
          className="prose prose-green prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        {/* Article Footer */}
        <div className="border-t border-gray-200 pt-8 mb-12">
          <div className="flex justify-between items-center mb-8">
            <div className="flex gap-4">
              <Button variant="outline" size="sm" className="border-green-200 text-green-700 hover:bg-green-50">
                <Heart className="mr-1 h-4 w-4" />
                Found this helpful
              </Button>
              <Button variant="outline" size="sm" className="border-green-200 text-green-700 hover:bg-green-50">
                <MessageSquare className="mr-1 h-4 w-4" />
                Leave a comment
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-green-200 text-green-700 hover:bg-green-50">
                <Share2 className="mr-1 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
          
          {/* Author Bio */}
          <div className="bg-green-50 rounded-xl p-6 mb-12">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-green-100 text-green-700 text-xl">
                  {post.author.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-lg text-green-800 mb-1">About {post.author.name}</h3>
                <p className="text-gray-600 mb-3">{post.author.bio}</p>
                <Button variant="ghost" size="sm" className="text-green-700 hover:text-green-800 hover:bg-green-100 px-0">
                  View all articles
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Articles */}
      {relatedPostsData.length > 0 && (
        <div className="max-w-5xl mx-auto mt-16">
          <Separator className="mb-12" />
          
          <h2 className="text-2xl font-bold text-green-800 mb-8">Related Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPostsData.map((relatedPost) => (
              <Card key={relatedPost.title} className="overflow-hidden hover:shadow-md transition-shadow border-green-100">
                <div className="relative">
                  <AspectRatio ratio={16/9}>
                    <Image
                      src={relatedPost.coverImage}
                      alt={relatedPost.title}
                      fill
                      className="object-cover"
                    />
                  </AspectRatio>
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-green-700 hover:bg-green-800">
                      {relatedPost.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-bold text-lg text-green-800 mb-2 line-clamp-2 hover:text-green-700">
                    <Link href={`/blog/${relatedPost.title.toLowerCase().replace(/ /g, '-')}`} className="hover:underline">
                      {relatedPost.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {relatedPost.excerpt}
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>{relatedPost.date}</span>
                    <span className="mx-2">•</span>
                    <span>{relatedPost.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {/* Newsletter CTA */}
      <div className="max-w-4xl mx-auto mt-20 bg-green-50 rounded-2xl p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-800 mb-3">Enjoy this article?</h2>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter for more CBD insights, research, and wellness tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex h-10 w-full rounded-md border border-green-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
            />
            <Button className="bg-green-700 hover:bg-green-800 text-white">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 