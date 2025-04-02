'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { HelpCircle, Bot, ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { CategoryTheme } from './CategoryHero'
import { FaqItem } from './types'

export interface CategoryFaqProps {
  theme: CategoryTheme;
  sectionTitle: string;
  sectionDescription: string;
  faqs: FaqItem[];
  showAiChat?: boolean;
  aiChatTitle?: string;
  aiChatDescription?: string;
  aiChatBtnText?: string;
  accordionType?: 'single' | 'multiple';
  className?: string;
}

export function CategoryFaq({
  theme,
  sectionTitle,
  sectionDescription,
  faqs,
  showAiChat = false,
  aiChatTitle = "Still Have Questions?",
  aiChatDescription = "Our experts are ready to help you find the right CBD product for your specific needs.",
  aiChatBtnText = "Ask Our Experts",
  accordionType = 'single',
  className
}: CategoryFaqProps) {
  // State for multiple accordion
  const [expandedFaqs, setExpandedFaqs] = React.useState<string[]>([]);
  
  // State for AI chat feature
  const [aiResponse, setAiResponse] = React.useState<string>("");
  const [userQuestion, setUserQuestion] = React.useState<string>("");
  const [isAiTyping, setIsAiTyping] = React.useState<boolean>(false);
  
  // Handle AI chat functionality
  const handleAskExpert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;
    
    setIsAiTyping(true);
    setAiResponse("");
    
    // Simulate AI typing response (placeholder)
    const demoResponses = [
      "Based on what you're asking, our most popular product for this situation is the Full Spectrum CBD Oil. It provides comprehensive support with all beneficial cannabinoids.",
      "From what you've described, I would recommend our CBD isolate products if you're concerned about THC sensitivity or drug testing.",
      "For your specific needs, our Enhanced CBD formula with additional terpenes might be the most effective option.",
      "It sounds like you're looking for targeted relief. Our topical CBD cream applied directly to the area might work best for your situation."
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
    
    setTimeout(() => typeWriter(randomResponse), 500);
    setUserQuestion("");
  };

  // Map theme color properties to actual tailwind classes
  const getClasses = () => {
    const { colors } = theme;
    
    return {
      section: cn(
        "py-6 relative overflow-hidden",
        colors.gradientFrom === 'green-50' ? 'bg-gradient-to-b from-green-50 to-white' :
        colors.gradientFrom === 'amber-50' ? 'bg-gradient-to-b from-amber-50 to-white' :
        colors.gradientFrom === 'blue-50' ? 'bg-gradient-to-b from-blue-50 to-white' :
        colors.gradientFrom === 'purple-50' ? 'bg-gradient-to-b from-purple-50 to-white' :
        colors.gradientFrom === 'indigo-50' ? 'bg-gradient-to-b from-indigo-50 to-white' :
        'bg-gradient-to-b from-gray-50 to-white'
      ),
      
      bgDecorationPrimary: cn(
        "absolute top-40 right-10 w-60 h-60 rounded-full opacity-20 blur-3xl",
        colors.background === 'green-100' ? 'bg-green-100' :
        colors.background === 'amber-100' ? 'bg-amber-100' :
        colors.background === 'blue-100' ? 'bg-blue-100' :
        colors.background === 'purple-100' ? 'bg-purple-100' :
        colors.background === 'indigo-100' ? 'bg-indigo-100' :
        'bg-gray-100'
      ),
      
      bgDecorationAccent: cn(
        "absolute bottom-20 left-10 w-60 h-60 rounded-full opacity-20 blur-3xl",
        colors.accent === 'emerald-500' ? 'bg-emerald-50' :
        colors.accent === 'amber-500' ? 'bg-amber-50' :
        colors.accent === 'blue-500' ? 'bg-blue-50' :
        colors.accent === 'purple-500' ? 'bg-purple-50' :
        colors.accent === 'violet-500' ? 'bg-violet-50' :
        'bg-gray-50'
      ),
      
      cardBorder: cn(
        "bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 overflow-hidden border",
        colors.border === 'green-200' ? 'border-green-200' :
        colors.border === 'amber-200' ? 'border-amber-200' :
        colors.border === 'blue-200' ? 'border-blue-200' :
        colors.border === 'purple-200' ? 'border-purple-200' :
        colors.border === 'indigo-200' ? 'border-indigo-200' :
        'border-gray-200'
      ),
      
      badgeOuter: cn(
        "inline-flex bg-gradient-to-br to-white rounded-full shadow-sm p-1 border",
        colors.gradientFrom === 'green-50' ? 'from-green-50/80 border-green-200/40' :
        colors.gradientFrom === 'amber-50' ? 'from-amber-50/80 border-amber-200/40' :
        colors.gradientFrom === 'blue-50' ? 'from-blue-50/80 border-blue-200/40' :
        colors.gradientFrom === 'purple-50' ? 'from-purple-50/80 border-purple-200/40' :
        colors.gradientFrom === 'indigo-50' ? 'from-indigo-50/80 border-indigo-200/40' :
        'from-gray-50/80 border-gray-200/40'
      ),
      
      badgeInner: cn(
        "px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5 font-medium text-white bg-gradient-to-r",
        colors.primary === 'green-600' ? 'from-green-600 to-emerald-500' :
        colors.primary === 'amber-600' ? 'from-amber-600 to-amber-500' :
        colors.primary === 'blue-600' ? 'from-blue-600 to-blue-500' :
        colors.primary === 'purple-600' ? 'from-purple-600 to-purple-500' :
        colors.primary === 'indigo-600' ? 'from-indigo-600 to-violet-500' :
        'from-gray-600 to-gray-500'
      ),
      
      contentContainer: cn(
        "bg-gradient-to-br rounded-xl border shadow-sm p-3 overflow-hidden max-w-3xl mx-auto",
        colors.gradientFrom === 'green-50' ? 'from-green-50/70 to-white border-green-200/40' :
        colors.gradientFrom === 'amber-50' ? 'from-amber-50/70 to-white border-amber-200/40' :
        colors.gradientFrom === 'blue-50' ? 'from-blue-50/70 to-white border-blue-200/40' :
        colors.gradientFrom === 'purple-50' ? 'from-purple-50/70 to-white border-purple-200/40' :
        colors.gradientFrom === 'indigo-50' ? 'from-indigo-50/70 to-white border-indigo-200/40' :
        'from-gray-50/70 to-white border-gray-200/40'
      ),
      
      accordionBorder: cn(
        colors.border === 'green-200' ? 'border-green-100/70' :
        colors.border === 'amber-200' ? 'border-amber-200/70' :
        colors.border === 'blue-200' ? 'border-blue-200/70' :
        colors.border === 'purple-200' ? 'border-purple-200/70' :
        colors.border === 'indigo-200' ? 'border-indigo-200/70' :
        'border-gray-200/70'
      ),
      
      accordionTrigger: cn(
        "text-left font-medium text-gray-900 hover:bg-opacity-10",
        colors.primary === 'green-600' ? 'hover:text-green-700 hover:bg-green-50' :
        colors.primary === 'amber-600' ? 'hover:text-amber-700 hover:bg-amber-50' :
        colors.primary === 'blue-600' ? 'hover:text-blue-700 hover:bg-blue-50' :
        colors.primary === 'purple-600' ? 'hover:text-purple-700 hover:bg-purple-50' :
        colors.primary === 'indigo-600' ? 'hover:text-indigo-700 hover:bg-indigo-50' :
        'hover:text-gray-700 hover:bg-gray-50'
      ),
      
      accordionItemExpanded: cn(
        "bg-opacity-60",
        colors.gradientFrom === 'green-50' ? 'bg-green-50' :
        colors.gradientFrom === 'amber-50' ? 'bg-amber-50' :
        colors.gradientFrom === 'blue-50' ? 'bg-blue-50' :
        colors.gradientFrom === 'purple-50' ? 'bg-purple-50' :
        colors.gradientFrom === 'indigo-50' ? 'bg-indigo-50' :
        'bg-gray-50'
      ),
      
      accordionContent: cn(
        "bg-opacity-30",
        colors.gradientFrom === 'green-50' ? 'bg-green-50' :
        colors.gradientFrom === 'amber-50' ? 'bg-amber-50' :
        colors.gradientFrom === 'blue-50' ? 'bg-blue-50' :
        colors.gradientFrom === 'purple-50' ? 'bg-purple-50' :
        colors.gradientFrom === 'indigo-50' ? 'bg-indigo-50' :
        'bg-gray-50'
      ),
      
      aiChatContainer: cn(
        "rounded-lg p-5 border",
        colors.gradientFrom === 'green-50' ? 'bg-green-50/70 border-green-100' :
        colors.gradientFrom === 'amber-50' ? 'bg-amber-50/70 border-amber-100' :
        colors.gradientFrom === 'blue-50' ? 'bg-blue-50/70 border-blue-100' :
        colors.gradientFrom === 'purple-50' ? 'bg-purple-50/70 border-purple-100' :
        colors.gradientFrom === 'indigo-50' ? 'bg-indigo-50/70 border-indigo-100' :
        'bg-gray-50/70 border-gray-100'
      ),
      
      aiIconBackground: cn(
        "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-md",
        colors.primary === 'green-600' ? 'bg-green-600' :
        colors.primary === 'amber-600' ? 'bg-amber-600' :
        colors.primary === 'blue-600' ? 'bg-blue-600' :
        colors.primary === 'purple-600' ? 'bg-purple-600' :
        colors.primary === 'indigo-600' ? 'bg-indigo-600' :
        'bg-gray-600'
      ),
      
      aiButton: cn(
        "hover:bg-opacity-90 text-white text-xs",
        colors.primary === 'green-600' ? 'bg-green-600 hover:bg-green-700' :
        colors.primary === 'amber-600' ? 'bg-amber-600 hover:bg-amber-700' :
        colors.primary === 'blue-600' ? 'bg-blue-600 hover:bg-blue-700' :
        colors.primary === 'purple-600' ? 'bg-purple-600 hover:bg-purple-700' :
        colors.primary === 'indigo-600' ? 'bg-indigo-600 hover:bg-indigo-700' :
        'bg-gray-600 hover:bg-gray-700'
      ),
      
      aiTypingCursor: cn(
        "inline-block w-1 h-3 ml-0.5 animate-pulse",
        colors.primary === 'green-600' ? 'bg-green-600' :
        colors.primary === 'amber-600' ? 'bg-amber-600' :
        colors.primary === 'blue-600' ? 'bg-blue-600' :
        colors.primary === 'purple-600' ? 'bg-purple-600' :
        colors.primary === 'indigo-600' ? 'bg-indigo-600' :
        'bg-gray-600'
      ),
      
      aiInputFocus: cn(
        "focus:ring-1 focus:ring-opacity-30",
        colors.primary === 'green-600' ? 'focus:ring-green-600' :
        colors.primary === 'amber-600' ? 'focus:ring-amber-600' :
        colors.primary === 'blue-600' ? 'focus:ring-blue-600' :
        colors.primary === 'purple-600' ? 'focus:ring-purple-600' :
        colors.primary === 'indigo-600' ? 'focus:ring-indigo-600' :
        'focus:ring-gray-600'
      ),
      
      aiModalIcon: cn(
        colors.primary === 'green-600' ? 'text-green-600' :
        colors.primary === 'amber-600' ? 'text-amber-600' :
        colors.primary === 'blue-600' ? 'text-blue-600' :
        colors.primary === 'purple-600' ? 'text-purple-600' :
        colors.primary === 'indigo-600' ? 'text-indigo-600' :
        'text-gray-600'
      )
    };
  };
  
  const classes = getClasses();
  
  // Conditional rendering for accordion based on type
  const renderAccordion = () => {
    if (accordionType === 'multiple') {
      return (
        <Accordion 
          type="multiple" 
          value={expandedFaqs} 
          onValueChange={setExpandedFaqs}
          className="rounded-lg border border-gray-100 shadow-sm overflow-hidden bg-white/50"
        >
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className={cn(
                "border-b last:border-0",
                classes.accordionBorder,
                expandedFaqs.includes(`item-${index}`) ? classes.accordionItemExpanded : ""
              )}
            >
              <AccordionTrigger 
                className={cn(
                  "px-4 py-3 text-sm",
                  classes.accordionTrigger
                )}
              >
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className={cn("px-4 py-3 text-xs text-gray-700", classes.accordionContent)}>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      );
    } else {
      return (
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className={classes.accordionBorder}>
              <AccordionTrigger className={cn("text-sm py-4", classes.accordionTrigger)}>
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-sm">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      );
    }
  };
  
  // Render AI chat feature
  const renderAiChat = () => {
    if (!showAiChat) return null;
    
    return (
      <div className={cn("mt-6", classes.aiChatContainer)}>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className={classes.aiIconBackground}>
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-base font-bold text-gray-900 mb-1">{aiChatTitle}</h3>
            <p className="text-gray-600 text-xs mb-3">
              {aiChatDescription}
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className={classes.aiButton}>
                  {aiChatBtnText}
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-base">
                    <Bot className={`h-4 w-4 ${classes.aiModalIcon}`} />
                    <span>{aiChatTitle}</span>
                  </DialogTitle>
                </DialogHeader>
                <div className="bg-gray-50 p-3 rounded-md my-4 max-h-[200px] overflow-y-auto text-sm">
                  {aiResponse ? (
                    <div className="text-gray-800">
                      {aiResponse}
                      {isAiTyping && <span className={classes.aiTypingCursor} />}
                    </div>
                  ) : (
                    <div className="text-gray-500 italic">
                      Ask about which CBD product might be right for your needs...
                    </div>
                  )}
                </div>
                <form onSubmit={handleAskExpert} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={userQuestion}
                    onChange={(e) => setUserQuestion(e.target.value)}
                    placeholder="Type your question..."
                    className={cn("flex-1 border border-gray-300 rounded-md px-3 py-1.5 text-xs focus:outline-none h-8", classes.aiInputFocus)}
                    disabled={isAiTyping}
                  />
                  <Button 
                    type="submit"
                    size="sm"
                    className={classes.aiButton}
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
    );
  };
  
  return (
    <section 
      className={cn(classes.section, className)}
      id={`${theme.name.toLowerCase().replace(/[&\s]+/g, '-')}-faq`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={classes.bgDecorationPrimary}></div>
        <div className={classes.bgDecorationAccent}></div>
      </div>
      
      <Container className="relative z-10">
        <div className={classes.cardBorder}>
          <div className="text-center mb-6">
            <div className={classes.badgeOuter}>
              <div className={classes.badgeInner}>
                <HelpCircle className="h-3.5 w-3.5" />
                <span>FAQ</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-3 mb-2">{sectionTitle}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-4 text-sm md:text-base leading-relaxed">
              {sectionDescription}
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className={classes.contentContainer}>
              {renderAccordion()}
            </div>
            
            {renderAiChat()}
          </div>
        </div>
      </Container>
    </section>
  )
} 