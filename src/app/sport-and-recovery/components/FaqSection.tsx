'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Bot, ArrowRight, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
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
    question: "Is CBD legal for athletes?",
    answer: "Yes, in 2018 the World Anti-Doping Agency (WADA) removed CBD from its list of prohibited substances. However, other cannabinoids like THC remain prohibited. Our sport-specific products are formulated with pure CBD isolate or broad-spectrum CBD that contains no detectable THC."
  },
  {
    question: "How can CBD help with exercise recovery?",
    answer: "CBD may help reduce exercise-induced inflammation and oxidative stress, which can speed up recovery between training sessions. Many athletes report that CBD helps manage soreness and improves sleep quality, both crucial factors in the recovery process."
  },
  {
    question: "When should I use CBD for training?",
    answer: "For general recovery, many athletes take CBD oil daily. For acute muscle soreness, topical CBD products like our Recovery Balm or Muscle Gel work best when applied directly after training. Pre-workout CBD may help reduce exercise anxiety without affecting performance."
  },
  {
    question: "Will CBD affect my athletic performance?",
    answer: "CBD doesn't appear to negatively impact performance metrics. Unlike THC, CBD doesn't cause intoxication or impairment. Some athletes report that CBD helps them maintain focus and manage pre-competition anxiety, potentially improving performance."
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
      "For post-workout recovery, our Recovery CBD Balm is ideal. It contains 1000mg of CBD and cooling menthol.",
      "Based on your training, I recommend our Sport CBD Oil for overall recovery support.",
      "Our CBD Sport Capsules are great for pre-competition focus and managing jitters.",
      "Try our CBD Muscle Gel for immediate, targeted relief with a cooling sensation."
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
    <section className="py-6 relative overflow-hidden bg-gradient-to-b from-white to-blue-50" id="faq">
      {/* Simple background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-10 w-60 h-60 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-cyan-50 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-xl shadow-md p-4 overflow-hidden">
          <div className="text-center mb-4">
            <div className="inline-flex bg-gradient-to-br from-blue-50/80 to-white rounded-full border border-blue-200/40 shadow-sm p-1">
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5 font-medium">
                <HelpCircle className="h-3.5 w-3.5" />
                <span>FAQ</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3 mb-2">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Common questions about CBD for athletes and active individuals
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion 
              type="multiple" 
              value={expandedFaqs} 
              onValueChange={setExpandedFaqs}
              className="rounded-lg border border-blue-100 shadow-sm overflow-hidden mb-6 bg-white/50"
            >
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-b border-blue-100 last:border-0"
                >
                  <AccordionTrigger 
                    className={cn(
                      "hover:bg-blue-50/50 px-4 py-3 text-left font-medium text-sm text-gray-900",
                      expandedFaqs.includes(`item-${index}`) ? "bg-blue-50/60" : ""
                    )}
                  >
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-3 text-xs text-gray-700 bg-blue-50/30">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          
            <div className="bg-blue-50/70 rounded-lg p-5 border border-blue-100">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-base font-bold text-gray-900 mb-1">Still Have Questions?</h3>
                  <p className="text-gray-600 text-xs mb-3">
                    Our sports recovery experts are ready to help you find the perfect product for your athletic needs.
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs">
                        Ask Our Sport Experts
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-base">
                          <Bot className="h-4 w-4 text-blue-600" />
                          <span>Ask Our Sports Performance Experts</span>
                        </DialogTitle>
                      </DialogHeader>
                      <div className="bg-gray-50 p-3 rounded-md my-4 max-h-[200px] overflow-y-auto text-sm">
                        {aiResponse ? (
                          <div className="text-gray-800">
                            {aiResponse}
                            {isAiTyping && <span className="inline-block w-1 h-3 ml-0.5 bg-blue-600 animate-pulse" />}
                          </div>
                        ) : (
                          <div className="text-gray-500 italic">
                            Ask about which CBD sport product might be right for your training needs...
                          </div>
                        )}
                      </div>
                      <form onSubmit={handleAskExpert} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={userQuestion}
                          onChange={(e) => setUserQuestion(e.target.value)}
                          placeholder="Type your question..."
                          className="flex-1 border border-gray-300 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-600/30 h-8"
                          disabled={isAiTyping}
                        />
                        <Button 
                          type="submit"
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white h-8 text-xs"
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