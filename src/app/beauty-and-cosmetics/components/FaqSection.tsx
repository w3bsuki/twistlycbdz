'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Container } from '@/components/ui/container'
import { Bot, ArrowRight, HelpCircle } from 'lucide-react'

// Theme interface
interface PageTheme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    border: string;
    borderHover: string;
    background: string;
  };
  gradients: {
    section: string;
    button: string;
  };
}

interface FaqSectionProps {
  pageTheme: PageTheme;
}

// Static data for FAQ
const faqItems = [
  {
    question: "How does CBD benefit the skin?",
    answer: "CBD has powerful antioxidant and anti-inflammatory properties that help neutralize free radicals, reduce redness and irritation (like acne/eczema), and regulate oil production for balanced hydration."
  },
  {
    question: "Will CBD beauty products make me feel high?",
    answer: "No. CBD (cannabidiol) is non-psychoactive and doesn't produce intoxicating effects like THC. Our beauty products use broad-spectrum CBD (0.0% THC) or CBD isolate, ensuring they are safe for daily use."
  },
  {
    question: "How do I incorporate CBD into my skincare routine?",
    answer: "Use CBD cleansers first, followed by toners, then serums. Apply creams/moisturizers last. Spot treatments can be used directly on problem areas. Introduce one CBD product at a time to monitor skin response."
  },
  {
    question: "Are CBD beauty products suitable for sensitive skin?",
    answer: "Often, yes. CBD's anti-inflammatory properties can soothe sensitive skin. Our formulas are gentle, using clean ingredients without common irritants. However, patch testing is always recommended for sensitive skin."
  }
];

export function FaqSection({ pageTheme }: FaqSectionProps) {
  const [expandedValue, setExpandedValue] = useState<string[]>([]);
  const [aiResponse, setAiResponse] = useState<string>("");
  const [userQuestion, setUserQuestion] = useState<string>("");
  const [isAiTyping, setIsAiTyping] = useState<boolean>(false);

  // Theme setup
  const primaryColor = pageTheme.colors.primary || 'pink-600'
  const primaryColorName = primaryColor.split('-')[0]
  const primaryLight = `${primaryColorName}-50`
  const primaryLighter = `${primaryColorName}-100`
  const primaryLightest = `${primaryColorName}-200`
  const primaryDark = `${primaryColorName}-700`

  const sectionBg = `bg-gradient-to-b from-white to-${primaryLight}` // Reverse gradient for variety
  const borderLight = `border-${primaryLightest}`
  const borderLighter = `border-${primaryLighter}`
  const buttonGradient = pageTheme.gradients.button
  const bgPrimaryLight = `bg-${primaryLight}`
  const textPrimaryDark = `text-${primaryDark}`

  // MATCH: Sport AI response logic
  const handleAskExpert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuestion.trim() || isAiTyping) return;

    setIsAiTyping(true);
    setAiResponse("");

    const demoResponses = [
      "For anti-aging, our CBD Face Serum combines CBD's antioxidants with hyaluronic acid to hydrate and reduce fine lines.",
      "For acne-prone skin, the CBD Facial Cream helps regulate oil and reduce inflammation without harsh chemicals.",
      "Our gentle CBD Body Lotion is great for sensitive skin, offering soothing hydration with botanical extracts.",
      "Try our CBD Bath Bombs for a relaxing experience that also nourishes your skin with CBD and essential oils."
    ];
    const randomResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)];
    let currentText = "";
    let index = 0;

    const intervalId = setInterval(() => {
      if (index < randomResponse.length) {
        currentText += randomResponse[index];
        setAiResponse(currentText);
        index++;
      } else {
        clearInterval(intervalId);
        setIsAiTyping(false);
      }
    }, 30);

    setUserQuestion("");
  };

  return (
    // MATCH: Sport Section Styling
    <section className={`py-6 relative overflow-hidden ${sectionBg}`} id="faq">
      {/* MATCH: Sport Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-40 right-10 w-60 h-60 bg-${primaryLighter} rounded-full opacity-20 blur-3xl`}></div>
        <div className={`absolute bottom-20 left-10 w-60 h-60 bg-${primaryColorName}-50 rounded-full opacity-20 blur-3xl`}></div>
      </div>
      
      <Container className="relative z-10">
        {/* MATCH: Sport Container Wrapper */}
        <div className={`bg-white/80 backdrop-blur-sm ${borderLight} rounded-xl shadow-md p-4 overflow-hidden`}>
          {/* MATCH: Sport Title Section */}
          <div className="text-center mb-4">
            <div className={`inline-flex bg-gradient-to-br from-${primaryLight}/80 to-white rounded-full border ${borderLight}/40 shadow-sm p-1`}>
              <div className={`${buttonGradient} text-white px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5 font-medium`}>
                <HelpCircle className="h-3.5 w-3.5" />
                <span>FAQ</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3 mb-2">Beauty Questions Answered</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Common questions about CBD in skincare and our beauty products.
            </p>
          </div>
          
          {/* MATCH: Sport Single Column Layout */}
          <div className="max-w-3xl mx-auto">
            {/* MATCH: Sport Accordion Styling */}
            <Accordion 
              type="multiple" 
              value={expandedValue} 
              onValueChange={setExpandedValue}
              className={`rounded-lg border ${borderLighter} shadow-sm overflow-hidden mb-6 bg-white/50`}
            >
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className={`border-b ${borderLighter} last:border-0`} // Use lighter border
                >
                  <AccordionTrigger 
                    className={cn(
                      `hover:${bgPrimaryLight}/50 px-4 py-3 text-left font-medium text-sm text-gray-900`, // Use theme hover
                      expandedValue.includes(`item-${index}`) ? `${bgPrimaryLight}/60` : ""
                    )}
                  >
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className={`px-4 py-3 text-xs text-gray-700 ${bgPrimaryLight}/30`}>
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          
            {/* MATCH: Sport Ask Experts Block Styling */}
            <div className={`${bgPrimaryLight}/70 rounded-lg p-5 border ${borderLighter}`}>
              <div className="flex flex-col md:flex-row items-center gap-4">
                {/* MATCH: Sport Icon Circle */}
                <div className={`${buttonGradient} w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-md`}>
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-base font-bold text-gray-900 mb-1">Still Have Questions?</h3>
                  <p className="text-gray-600 text-xs mb-3">
                    Get instant beauty advice from our knowledgeable AI assistant.
                  </p>
                  {/* MATCH: Sport Dialog Structure */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className={`${buttonGradient} text-white text-xs`}>
                        Ask Our Beauty AI
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-base">
                          <Bot className={`h-4 w-4 ${textPrimaryDark}`} /> {/* Use theme color */}
                          <span>Ask Our Beauty AI</span>
                        </DialogTitle>
                      </DialogHeader>
                      {/* MATCH: Sport AI Response Area */}
                      <div className="bg-gray-50 p-3 rounded-md my-4 max-h-[200px] overflow-y-auto text-sm">
                        {aiResponse ? (
                          <div className="text-gray-800">
                            {aiResponse}
                            {isAiTyping && <span className={`inline-block w-1 h-3 ml-0.5 ${bgPrimaryLight.replace('bg','bg')} animate-pulse`} />} {/* Use theme color */}
                          </div>
                        ) : (
                          <div className="text-gray-500 italic">
                            Ask about ingredients, product recommendations, or skincare routines...
                          </div>
                        )}
                      </div>
                      {/* MATCH: Sport Input Form */}
                      <form onSubmit={handleAskExpert} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={userQuestion}
                          onChange={(e) => setUserQuestion(e.target.value)}
                          placeholder="Type your question..."
                          className={`flex-1 border border-gray-300 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-${primaryColor}/30 h-8`}
                          disabled={isAiTyping}
                        />
                        <Button 
                          type="submit"
                          size="sm"
                          className={`${buttonGradient} text-white h-8 text-xs`}
                          disabled={isAiTyping || !userQuestion.trim()} // Disable if empty
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