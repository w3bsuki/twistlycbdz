'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Bot, ArrowRight, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

interface FaqSectionProps {
  pageTheme: {
    colors: {
      primary: string;
      accent: string;
      border: string;
      background: string;
    }
  }
}

// FAQ items data
const faqItems = [
  {
    question: "What makes mushroom and CBD combinations so effective?",
    answer: "The synergy between CBD and functional mushrooms enhances their individual benefits. CBD's calming and anti-inflammatory properties complement the cognitive, immune, and adaptogenic effects of mushrooms, creating a more holistic wellness solution."
  },
  {
    question: "Are these products psychoactive? Will they make me high?",
    answer: "No. Our CBD is derived from hemp and contains less than 0.3% THC. Functional mushrooms like Lion's Mane, Reishi, and Chaga are not psychoactive. These products are designed for wellness benefits without intoxication."
  },
  {
    question: "Which hybrid product is right for me?",
    answer: "It depends on your goals. For cognitive support, try Lion's Mane blends. For stress and sleep, Reishi combinations are ideal. For energy and performance, look for Cordyceps. For immune support, Chaga or Turkey Tail blends are great choices. Read product descriptions for specific benefits."
  },
  {
    question: "How long does it take to feel the effects?",
    answer: "Effects can vary based on the individual, dosage, and product type. Tinctures may offer faster effects (15-45 minutes), while capsules and edibles take longer (45-90 minutes) as they pass through the digestive system. Consistent use often yields the best long-term results."
  },
  {
    question: "Can I take these products with other medications?",
    answer: "If you are taking any medications or have underlying health conditions, it's crucial to consult with your healthcare provider before adding any new supplements, including CBD and mushroom products, to your routine."
  }
];

export function FaqSection({ pageTheme }: FaqSectionProps) {
  const [expandedFaqs, setExpandedFaqs] = React.useState<string[]>([]);
  const [aiResponse, setAiResponse] = React.useState<string>("");
  const [userQuestion, setUserQuestion] = React.useState<string>("");
  const [isAiTyping, setIsAiTyping] = React.useState<boolean>(false);
  
  const handleAskExpert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;
    
    setIsAiTyping(true);
    setAiResponse("");
    
    // Simulate AI typing response (placeholder)
    const demoResponses = [
      "Based on your interest in cognitive support, I recommend our Lion's Mane CBD Capsules which combine the neurotropic benefits of Lion's Mane mushroom with the balancing effects of CBD.",
      "For immune system support, our Chaga Immune Support formula would be ideal. It combines the powerful antioxidant properties of Chaga mushroom with CBD's anti-inflammatory benefits.",
      "If you're looking for help with stress management, our Reishi Calm Gummies would be perfect. Reishi is known as the 'mushroom of immortality' for its adaptogenic properties.",
      "For energy and performance support, I'd suggest our Cordyceps Energy Blend. Cordyceps is traditionally used to improve stamina and oxygen utilization."
    ];
    
    const randomResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)];
    let displayText = "";
    
    const typeWriter = (text: string, i: number = 0) => {
      if (i < text.length) {
        displayText += text.charAt(i);
        setAiResponse(displayText);
        setTimeout(() => typeWriter(text, i + 1), 30);
      } else {
        setIsAiTyping(false);
      }
    };
    
    setTimeout(() => typeWriter(randomResponse), 500); // Shortened delay
    setUserQuestion("");
  };

  return (
    <section className="py-6 relative overflow-hidden bg-gradient-to-b from-white to-amber-50" id="faq">
      {/* Simple background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-10 w-60 h-60 bg-amber-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-amber-50 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="bg-white/80 backdrop-blur-sm border border-amber-200 rounded-xl shadow-md p-4 overflow-hidden">
          <div className="text-center mb-4">
            <div className="inline-flex bg-gradient-to-br from-amber-50/80 to-white rounded-full border border-amber-200/40 shadow-sm p-1">
              <div className="bg-gradient-to-r from-amber-800 to-amber-700 text-white px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5 font-medium">
                <HelpCircle className="h-3.5 w-3.5" />
                <span>FAQ</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3 mb-2">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Find answers to common questions about our CBD and functional mushroom hybrid products
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion 
              type="multiple" 
              value={expandedFaqs} 
              onValueChange={setExpandedFaqs}
              className="rounded-lg border border-amber-100 shadow-sm overflow-hidden mb-6 bg-white/50"
            >
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-b border-amber-100 last:border-0"
                >
                  <AccordionTrigger 
                    className={cn(
                      "hover:bg-amber-50/50 px-4 py-3 text-left font-medium text-sm text-gray-900",
                      expandedFaqs.includes(`item-${index}`) ? "bg-amber-50/60" : ""
                    )}
                  >
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-3 text-xs text-gray-700 bg-amber-50/30">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          
            <div className="bg-amber-50/70 rounded-lg p-5 border border-amber-100">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-800 flex items-center justify-center flex-shrink-0 shadow-md">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-base font-bold text-gray-900 mb-1">Still Have Questions?</h3>
                  <p className="text-gray-600 text-xs mb-3">
                    Our CBD & mushroom experts are ready to help you find the perfect product for your specific needs.
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="bg-amber-800 hover:bg-amber-700 text-white text-xs">
                        Ask Our Mushroom Experts
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-base">
                          <Bot className="h-4 w-4 text-amber-700" />
                          <span>Ask Our Mushroom & CBD Experts</span>
                        </DialogTitle>
                      </DialogHeader>
                      <div className="bg-gray-50 p-3 rounded-md my-4 max-h-[200px] overflow-y-auto text-sm">
                        {aiResponse ? (
                          <div className="text-gray-800">
                            {aiResponse}
                            {isAiTyping && <span className="inline-block w-1 h-3 ml-0.5 bg-amber-600 animate-pulse" />}
                          </div>
                        ) : (
                          <div className="text-gray-500 italic">
                            Ask about which mushroom-CBD combination is right for your needs...
                          </div>
                        )}
                      </div>
                      <form onSubmit={handleAskExpert} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={userQuestion}
                          onChange={(e) => setUserQuestion(e.target.value)}
                          placeholder="Type your question..."
                          className="flex-1 border border-gray-300 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-amber-600/30 h-8"
                          disabled={isAiTyping}
                        />
                        <Button 
                          type="submit"
                          size="sm"
                          className="bg-amber-800 hover:bg-amber-700 text-white h-8 text-xs"
                          disabled={isAiTyping}
                        >
                          {isAiTyping ? "Thinking..." : "Ask"}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
} 