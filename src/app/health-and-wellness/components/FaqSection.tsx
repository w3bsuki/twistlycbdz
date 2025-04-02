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
    question: "What is CBD and how does it work?",
    answer: "CBD (cannabidiol) is a non-psychoactive compound found in cannabis plants. It works with your body's endocannabinoid system, which helps regulate functions like mood, sleep, pain, and immune response. Unlike THC, CBD doesn't cause a 'high' and is legal in most states when derived from hemp with less than 0.3% THC."
  },
  {
    question: "What are the benefits of using CBD for wellness?",
    answer: "Many people use CBD to help manage stress, anxiety, sleep issues, and discomfort. Research suggests that CBD may have anti-inflammatory properties, help regulate mood, and promote better sleep quality. Everyone's experience varies, and scientific research is still emerging on CBD's full range of benefits."
  },
  {
    question: "How should I choose the right CBD product?",
    answer: "When choosing a CBD product, consider your specific wellness goals, preferred consumption method, and potency needs. For sleep support, products containing CBN may work best. For daily wellness, a regular CBD oil may be sufficient. Start with lower strengths if you're new to CBD, and always look for third-party tested products with clear labeling of CBD content."
  },
  {
    question: "Will CBD make me feel intoxicated?",
    answer: "No, CBD won't make you feel high or intoxicated. It's non-psychoactive, meaning it doesn't alter your mental state like THC does. Many users report feeling more relaxed or experiencing relief from discomfort without any cognitive impairment. You can use our CBD products during your normal daily activities."
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
      "For stress and anxiety relief, our Full Spectrum CBD Oil is most effective as it contains the full range of beneficial cannabinoids.",
      "Based on what you've described, I would recommend our Sleep Formula with CBD and CBN for your sleep difficulties.",
      "Our Wellness Plus CBD is perfect for everyday use to support your overall health and balance.",
      "Try our Broad Spectrum CBD Oil if you're looking for the benefits of multiple cannabinoids without any THC."
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
    <section className="py-6 relative overflow-hidden bg-gradient-to-b from-white to-green-50" id="faq">
      {/* Simple background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-10 w-60 h-60 bg-green-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-emerald-50 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-xl shadow-md p-4 overflow-hidden">
          <div className="text-center mb-4">
            <div className="inline-flex bg-gradient-to-br from-green-50/80 to-white rounded-full border border-green-200/40 shadow-sm p-1">
              <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5 font-medium">
                <HelpCircle className="h-3.5 w-3.5" />
                <span>FAQ</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3 mb-2">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Common questions about CBD for wellness and natural health support
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion 
              type="multiple" 
              value={expandedFaqs} 
              onValueChange={setExpandedFaqs}
              className="rounded-lg border border-green-100 shadow-sm overflow-hidden mb-6 bg-white/50"
            >
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-b border-green-100 last:border-0"
                >
                  <AccordionTrigger 
                    className={cn(
                      "hover:bg-green-50/50 px-4 py-3 text-left font-medium text-sm text-gray-900",
                      expandedFaqs.includes(`item-${index}`) ? "bg-green-50/60" : ""
                    )}
                  >
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-3 text-xs text-gray-700 bg-green-50/30">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          
            <div className="bg-green-50/70 rounded-lg p-5 border border-green-100">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-base font-bold text-gray-900 mb-1">Still Have Questions?</h3>
                  <p className="text-gray-600 text-xs mb-3">
                    Our wellness experts are ready to help you find the right CBD product for your specific needs.
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white text-xs">
                        Ask Our Wellness Experts
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-base">
                          <Bot className="h-4 w-4 text-green-600" />
                          <span>Ask Our Wellness Experts</span>
                        </DialogTitle>
                      </DialogHeader>
                      <div className="bg-gray-50 p-3 rounded-md my-4 max-h-[200px] overflow-y-auto text-sm">
                        {aiResponse ? (
                          <div className="text-gray-800">
                            {aiResponse}
                            {isAiTyping && <span className="inline-block w-1 h-3 ml-0.5 bg-green-600 animate-pulse" />}
                          </div>
                        ) : (
                          <div className="text-gray-500 italic">
                            Ask about which CBD wellness product might be right for your needs...
                          </div>
                        )}
                      </div>
                      <form onSubmit={handleAskExpert} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={userQuestion}
                          onChange={(e) => setUserQuestion(e.target.value)}
                          placeholder="Type your question..."
                          className="flex-1 border border-gray-300 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-green-600/30 h-8"
                          disabled={isAiTyping}
                        />
                        <Button 
                          type="submit"
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white h-8 text-xs"
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