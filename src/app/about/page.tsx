import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Leaf, Droplets, PlaneTakeoff, Heart, Award, Sprout, ChevronRight, ArrowRight } from 'lucide-react'
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="relative mb-32">
        <div className="absolute inset-0 bg-gradient-to-b from-green-50 to-transparent -z-10 rounded-3xl max-h-[500px]" />
        <div className="text-center max-w-3xl mx-auto">
          <Badge className="px-4 py-1.5 text-sm bg-green-100 text-green-800 hover:bg-green-200 mb-4">Our Journey</Badge>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-green-800 tracking-tight mb-6">
            From Seed to <span className="text-green-600">Twistly</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A fairy tale of passion, innovation, and a deep commitment to natural wellness that grew into the brand we are today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-green-700 hover:bg-green-800 text-white">
              Explore Our Products
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="text-green-700 border-green-200 hover:bg-green-50">
              Our Values
            </Button>
          </div>
          
          <div className="max-w-2xl mx-auto relative">
            <AspectRatio ratio={16/9} className="bg-muted overflow-hidden rounded-2xl shadow-xl">
              <Image 
                src="/images/hemp-background.jpg" 
                alt="Twistly CBD fields" 
                fill 
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent flex items-end">
                <div className="p-6 text-white w-full">
                  <p className="text-2xl font-light italic leading-relaxed">
                    "Every drop of our CBD oil carries the story of nature's wisdom."
                  </p>
                  <p className="text-sm mt-4 font-medium">Sarah Johnson, Founder</p>
                </div>
              </div>
            </AspectRatio>
          </div>
        </div>
      </section>

      {/* Story Navigation */}
      <section className="mb-24">
        <Tabs defaultValue="journey" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-3 w-full max-w-2xl">
              <TabsTrigger value="journey" className="text-base">Our Journey</TabsTrigger>
              <TabsTrigger value="values" className="text-base">Core Values</TabsTrigger>
              <TabsTrigger value="team" className="text-base">Our Team</TabsTrigger>
            </TabsList>
          </div>
          
          {/* Journey Tab */}
          <TabsContent value="journey" className="space-y-16">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-green-800 mb-4">The Tale of Twistly</h2>
              <p className="text-gray-600">Our story unfolds through five chapters, each representing a key milestone in our evolution from a simple idea to a thriving wellness brand.</p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {/* Chapter 1 */}
                <AccordionItem value="chapter-1" className="border border-green-100 rounded-lg mb-6 px-6 py-2 data-[state=open]:bg-green-50/50">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center p-3 bg-green-100 rounded-full">
                        <Sprout className="h-6 w-6 text-green-700" />
                      </div>
                      <h3 className="text-xl font-bold text-green-700">Chapter 1: The Seed of an Idea</h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="pl-16">
                      <p className="text-gray-700 mb-4">
                        Once upon a time, in a small farmhouse nestled between rolling green hills, our founder Sarah discovered her grandmother's journal filled with herbal remedies. Among the yellowed pages was a special note about the hemp plant and its remarkable properties.
                      </p>
                      <p className="text-gray-700 mb-4">
                        Inspired by these ancient wellness secrets and driven by her own struggles with chronic stress, Sarah planted the first seeds that would eventually grow into Twistly CBD.
                      </p>
                      <div className="bg-white rounded-xl p-6 border border-green-100 mt-6">
                        <p className="italic text-green-700">"My grandmother always said that nature provides everything we need to heal. I just had to find the right way to harness that power." – Sarah Johnson</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Chapter 2 */}
                <AccordionItem value="chapter-2" className="border border-green-100 rounded-lg mb-6 px-6 py-2 data-[state=open]:bg-green-50/50">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center p-3 bg-green-100 rounded-full">
                        <Leaf className="h-6 w-6 text-green-700" />
                      </div>
                      <h3 className="text-xl font-bold text-green-700">Chapter 2: Growing Strong Roots</h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="pl-16">
                      <p className="text-gray-700 mb-4">
                        The first harvest was small but promising. Sarah partnered with local farmers who shared her passion for organic, sustainable growing practices. Together, they cultivated hemp plants under the warm sun, nurtured by pure rainwater and rich soil.
                      </p>
                      <p className="text-gray-700 mb-4">
                        Word of their exceptional crop spread through the valley, attracting the attention of Michael, a biochemist seeking natural alternatives to traditional medicine. His expertise in extraction techniques became the perfect complement to Sarah's vision.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Chapter 3 */}
                <AccordionItem value="chapter-3" className="border border-green-100 rounded-lg mb-6 px-6 py-2 data-[state=open]:bg-green-50/50">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center p-3 bg-green-100 rounded-full">
                        <Droplets className="h-6 w-6 text-green-700" />
                      </div>
                      <h3 className="text-xl font-bold text-green-700">Chapter 3: The First Drops</h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="pl-16">
                      <p className="text-gray-700 mb-4">
                        In a converted barn that became their first laboratory, Sarah and Michael created their first CBD oil. The process was meticulous - preserving the full spectrum of beneficial compounds while ensuring the highest purity standards.
                      </p>
                      <p className="text-gray-700 mb-4">
                        They shared their creation with friends and family suffering from various ailments. The stories of relief and renewed vitality that followed convinced them they were on a path worth pursuing.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Chapter 4 */}
                <AccordionItem value="chapter-4" className="border border-green-100 rounded-lg mb-6 px-6 py-2 data-[state=open]:bg-green-50/50">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center p-3 bg-green-100 rounded-full">
                        <PlaneTakeoff className="h-6 w-6 text-green-700" />
                      </div>
                      <h3 className="text-xl font-bold text-green-700">Chapter 4: Taking Flight</h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="pl-16">
                      <p className="text-gray-700 mb-4">
                        The name "Twistly" was born from a moment of inspiration - watching the hemp leaves twist toward the sun, constantly seeking growth and light. It symbolized the company's commitment to always reaching higher.
                      </p>
                      <p className="text-gray-700 mb-4">
                        With a small but dedicated team, Twistly launched its first line of CBD products. What began as a local phenomenon quickly spread beyond their small town as customers shared their experiences of better sleep, reduced anxiety, and relief from discomfort.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Chapter 5 */}
                <AccordionItem value="chapter-5" className="border border-green-100 rounded-lg mb-6 px-6 py-2 data-[state=open]:bg-green-50/50">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center p-3 bg-green-100 rounded-full">
                        <Heart className="h-6 w-6 text-green-700" />
                      </div>
                      <h3 className="text-xl font-bold text-green-700">Chapter 5: Blossoming Community</h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="pl-16">
                      <p className="text-gray-700 mb-4">
                        Today, Twistly has grown beyond a product line into a community of wellness seekers. We've expanded our offerings to include specialized formulations for different needs - from active lifestyles to beauty routines.
                      </p>
                      <p className="text-gray-700 mb-4">
                        But at our heart, we remain true to Sarah's original vision: harnessing nature's wisdom to help people live better, more balanced lives. Every product is still crafted with the same care as that very first batch in the converted barn.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="flex justify-center pt-8">
              <div className="flex items-center gap-3 text-green-700 hover:text-green-800">
                <span className="font-medium cursor-pointer">Discover our products</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </TabsContent>
          
          {/* Values Tab */}
          <TabsContent value="values" className="space-y-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-green-800 mb-4">Our Guiding Principles</h2>
              <p className="text-gray-600">The core values that guide every decision we make and every product we create at Twistly CBD.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Value 1 */}
              <Card className="border-green-100 hover:shadow-md transition-all duration-300 hover:border-green-200">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-green-700" />
                  </div>
                  <CardTitle className="text-xl text-green-700">Quality Without Compromise</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Every product undergoes rigorous testing to ensure purity, potency, and safety. We're transparent about our ingredients and processes.
                  </p>
                </CardContent>
                <CardFooter>
                  <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200">Premium Grade</Badge>
                </CardFooter>
              </Card>
              
              {/* Value 2 */}
              <Card className="border-green-100 hover:shadow-md transition-all duration-300 hover:border-green-200">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Leaf className="h-6 w-6 text-green-700" />
                  </div>
                  <CardTitle className="text-xl text-green-700">Sustainable Stewardship</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We honor the earth that provides our ingredients by practicing sustainable agriculture and using eco-friendly packaging and processes.
                  </p>
                </CardContent>
                <CardFooter>
                  <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200">Eco-Conscious</Badge>
                </CardFooter>
              </Card>
              
              {/* Value 3 */}
              <Card className="border-green-100 hover:shadow-md transition-all duration-300 hover:border-green-200">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-green-700" />
                  </div>
                  <CardTitle className="text-xl text-green-700">Compassionate Innovation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We continuously explore new formulations and delivery methods to better serve our diverse community's wellness needs.
                  </p>
                </CardContent>
                <CardFooter>
                  <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200">Forward-Thinking</Badge>
                </CardFooter>
              </Card>
            </div>

            <div className="bg-green-50 rounded-2xl p-8 mt-12">
              <div className="max-w-3xl mx-auto text-center">
                <h3 className="text-2xl font-bold text-green-800 mb-4">Our Commitment</h3>
                <p className="text-gray-700 mb-6">
                  At Twistly, our commitment to quality, sustainability, and innovation goes beyond words. We live these values in every aspect of our business, from seed to shelf.
                </p>
                <Button className="bg-green-700 hover:bg-green-800 text-white">
                  Learn About Our Process
                </Button>
              </div>
            </div>
          </TabsContent>
          
          {/* Team Tab */}
          <TabsContent value="team" className="space-y-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-green-800 mb-4">The Characters in Our Story</h2>
              <p className="text-gray-600">Meet the passionate individuals who bring the Twistly vision to life every day.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl mx-auto">
              {/* Founder */}
              <Card className="border-0 shadow-none">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto">
                    <Avatar className="h-40 w-40 border-4 border-green-100">
                      <AvatarFallback className="bg-green-50 text-green-700 text-4xl">
                        <Leaf className="h-16 w-16 text-green-600" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="mt-6">
                    <CardTitle className="text-2xl text-green-700">Sarah Johnson</CardTitle>
                    <CardDescription className="text-green-600 text-lg mt-1">Founder & Visionary</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">
                    With a background in botany and a passion for natural wellness, Sarah leads Twistly with heart and purpose.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="ghost" className="text-green-700 hover:text-green-800 hover:bg-green-50">
                    Read Sarah's Story
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Co-founder */}
              <Card className="border-0 shadow-none">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto">
                    <Avatar className="h-40 w-40 border-4 border-green-100">
                      <AvatarFallback className="bg-green-50 text-green-700 text-4xl">
                        <Droplets className="h-16 w-16 text-green-600" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="mt-6">
                    <CardTitle className="text-2xl text-green-700">Michael Chen</CardTitle>
                    <CardDescription className="text-green-600 text-lg mt-1">Co-founder & Chief Scientist</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">
                    Michael's expertise in biochemistry ensures our products maintain the highest standards of efficacy and safety.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="ghost" className="text-green-700 hover:text-green-800 hover:bg-green-50">
                    Read Michael's Story
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="mt-16 max-w-3xl mx-auto text-center">
              <Separator className="mb-12 bg-green-100" />
              <h3 className="text-2xl font-bold text-green-800 mb-4">Join Our Team</h3>
              <p className="text-gray-700 mb-6">
                We're always looking for passionate individuals who share our vision of wellness through nature's wisdom. Explore our current opportunities.
              </p>
              <Button variant="outline" className="text-green-700 border-green-200 hover:bg-green-50">
                View Open Positions
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Call to Action */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-green-700 rounded-3xl -z-10" />
        <div className="absolute inset-0 opacity-10 -z-10">
          <Image src="/images/hemp-flower.svg" alt="Hemp pattern" fill className="object-cover" />
        </div>
        <div className="py-20 px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Join Our Journey</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            The story of Twistly is still being written, and we invite you to be part of our next chapter. Explore our range of premium CBD products designed to enhance your daily wellness routine.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/shop">
              <Button size="lg" className="bg-white text-green-700 hover:bg-green-50">
                Shop Our Collection
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="text-white border-green-500 hover:bg-green-600">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 