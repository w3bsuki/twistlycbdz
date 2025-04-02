'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, ShieldCheck, Bot, Search, 
  Sparkles, SendHorizontal, ShoppingCart,
  CheckCircle, X, ChevronRight, Zap, 
  Brain, Moon, Heart, MessageSquare, Star, Activity
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/ui/container'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface AiChatHeroProps {
  themeColor?: string;
  accentColor?: string;
  lightColor?: string;
  borderColor?: string;
  title?: string;
  subtitle?: string;
}

export function AiChatHero({ 
  themeColor = 'green',
  accentColor = 'green',
  lightColor = 'green',
  borderColor = 'green',
  title = 'Your Wellness Guide',
  subtitle = 'Ask Dr. Twistly about CBD products for your health and wellness needs'
}: AiChatHeroProps) {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);

  const suggestions = [
    "What CBD products help with anxiety?",
    "Best options for chronic pain relief",
    "Help me sleep better at night",
    "Products for inflammation reduction",
    "CBD for stress management"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsTyping(e.target.value.length > 0);
    setShowSuggestions(e.target.value.length > 0);
    setActiveSuggestion(-1);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
    setIsTyping(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) return;
    
    // Arrow down
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestion(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    }
    // Arrow up
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestion(prev => 
        prev > 0 ? prev - 1 : prev
      );
    }
    // Enter
    else if (e.key === 'Enter' && activeSuggestion >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[activeSuggestion]);
    }
    // Escape
    else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Show thinking state
    setIsThinking(true);
    setShowSuggestions(false);
    
    // Simulate AI thinking
    setTimeout(() => {
      // Here you would typically connect to your agent backend
      console.log('Submitted query:', inputValue);
      // Clear input and reset states after "processing"
      setInputValue('');
      setIsTyping(false);
      setIsThinking(false);
      // You could also redirect to a chat interface or open a chat modal
    }, 2000);
  };

  const clearInput = () => {
    setInputValue('');
    setIsTyping(false);
    setShowSuggestions(false);
  };

  return (
    <div className={`bg-${lightColor}-100/70 to-white rounded-lg border-2 border-${borderColor}-300/70 shadow-md p-4 w-full`}>
      {/* AI Assistant Card */}
      <Card className={`relative bg-white border border-${borderColor}-200 shadow-sm overflow-hidden w-full ring-1 ring-${borderColor}-100`}>
        <div className={`absolute top-0 right-0 w-32 h-32 bg-${lightColor}-100 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl opacity-80 pointer-events-none`}></div>
        <div className={`absolute bottom-0 left-0 w-28 h-28 bg-${lightColor}-100 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl opacity-60 pointer-events-none`}></div>
        
        <CardHeader className={`bg-gradient-to-r from-${accentColor}-600 to-${accentColor}-500 p-3.5 pb-3 flex flex-row items-center gap-3 relative overflow-hidden`}>
          <div className="relative flex items-center gap-2.5 z-10">
            <div className="relative w-12 h-12 rounded-full bg-white/30 flex items-center justify-center border-2 border-white/40 ring-2 ring-green-600/20">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/images/2.png"
                  alt="Dr. Twistly"
                  width={40}
                  height={40}
                  className="object-contain drop-shadow-sm"
                />
              </motion.div>
              <motion.div 
                className={`absolute bottom-0 right-0 h-3 w-3 rounded-full bg-${lightColor}-300 border-2 border-white`}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-white text-lg">Dr. Twistly</h3>
                <Badge className="bg-white/20 hover:bg-white/30 text-white border-none text-xs h-5 px-1.5">
                  AI
                </Badge>
              </div>
              <p className="text-xs text-white/80">Wellness & CBD Specialist</p>
            </div>
          </div>
          
          <div className="ml-auto hidden md:flex items-center gap-1.5 bg-white/15 text-white/90 text-xs rounded-full px-2.5 py-1 border border-white/10">
            <span className={`inline-flex h-2 w-2 rounded-full bg-${lightColor}-300 animate-pulse`}></span>
            <span>Online Now</span>
          </div>
        </CardHeader>
        
        <div className={`px-4 py-2.5 bg-gradient-to-r from-${lightColor}-50 to-${lightColor}-100/30 border-b border-${borderColor}-200 flex items-center justify-between`}>
          <div className={`flex items-center gap-2 text-xs text-${themeColor}-700`}>
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Trusted CBD Recommendations</span>
          </div>
          <Badge variant="outline" className={`bg-white text-${themeColor}-600 hover:bg-${lightColor}-50 text-xs px-1.5 h-5 font-normal border-${borderColor}-200 shadow-sm`}>
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" /> 4.9/5
          </Badge>
        </div>
        
        <CardContent className={`p-3.5 pt-2.5 bg-gradient-to-b from-white to-${lightColor}-50/30`}>
          <div className="flex flex-col space-y-2 max-h-[150px] overflow-y-auto scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-transparent pr-1">
            {/* AI Message */}
            <motion.div 
              className={`bg-gradient-to-br from-${lightColor}-50 to-${lightColor}-50/50 rounded-lg p-3 border-2 border-${borderColor}-200/70 relative w-full shadow-sm`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`absolute top-0 left-5 w-3 h-3 bg-${lightColor}-50 border-t-2 border-l-2 border-${borderColor}-200/70 transform -translate-y-1/2 rotate-45`}></div>
              <div className="w-full">
                <div className={`font-medium text-sm text-${themeColor}-800 w-full whitespace-nowrap overflow-hidden text-ellipsis`}>Hi, I am Dr. Twistly, your CBD and Wellness Guide. How can I help you today? 😊</div>
                <div className="flex justify-end w-full">
                  <span className={`text-xs text-${themeColor}-600/60 mt-1`}>Just now</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-3">
            {[
              {topic: 'Sleep', desc: 'Trouble sleeping?', icon: <Moon className="h-3.5 w-3.5" />},
              {topic: 'Stress', desc: 'Feeling anxious?', icon: <Brain className="h-3.5 w-3.5" />},
              {topic: 'Pain', desc: 'Joint discomfort?', icon: <Activity className="h-3.5 w-3.5" />},
              {topic: 'Anxiety', desc: 'Need calm?', icon: <Heart className="h-3.5 w-3.5" />}
            ].map((item, i) => (
              <Button 
                key={i}
                variant="outline" 
                className={`border-${borderColor}-200 bg-white/80 text-${themeColor}-700 hover:bg-${lightColor}-50 hover:border-${borderColor}-300 h-auto py-2 flex-col items-start justify-start font-normal shadow-sm`}
                onClick={() => handleSuggestionClick(`CBD for ${item.topic.toLowerCase()} relief`)}
              >
                <div className="flex items-center w-full">
                  <div className={`h-7 w-7 rounded-full bg-gradient-to-br from-${lightColor}-100 to-${lightColor}-50 border border-${borderColor}-200 flex items-center justify-center mr-2 shadow-sm`}>
                    {item.icon}
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-medium text-xs">{item.topic}</span>
                    <span className="text-xs text-gray-500 truncate">{item.desc}</span>
                  </div>
                </div>
              </Button>
            ))}
          </div>
          
          {/* Input Form */}
          <form onSubmit={handleSubmit} className="mt-3 relative">
            <div className="relative">
              <Input
                placeholder="Ask about CBD wellness products..."
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className={`py-5 pl-4 pr-14 text-sm border-${borderColor}-200 bg-white focus-visible:ring-${accentColor}-500 focus-visible:ring-offset-${accentColor}-200 focus-visible:border-${accentColor}-300 shadow-sm`}
                disabled={isThinking}
              />
              
              {isTyping && !isThinking && (
                <button 
                  type="button"
                  onClick={clearInput}
                  className={`absolute right-12 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white text-${themeColor}-600 hover:bg-${lightColor}-50`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
              
              <button 
                type="submit"
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full ${isTyping ? `bg-${accentColor}-600 hover:bg-${accentColor}-700 text-white` : `bg-${lightColor}-100 text-${themeColor}-600`} transition-colors`}
                disabled={!isTyping || isThinking}
              >
                {isThinking ? (
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <SendHorizontal className="h-4 w-4" />
                )}
              </button>
            </div>
            
            {/* Search Suggestions */}
            <AnimatePresence>
              {showSuggestions && (
                <motion.div 
                  className={`absolute left-0 right-0 mt-1 rounded-md border border-${borderColor}-200 bg-white shadow-lg overflow-hidden z-10`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                >
                  <ul className="py-1 text-sm">
                    {suggestions.map((suggestion, index) => (
                      <li 
                        key={index}
                        className={`px-3 py-2 cursor-pointer flex items-center gap-2 ${
                          activeSuggestion === index ? `bg-${lightColor}-50 text-${themeColor}-700` : 'hover:bg-gray-50'
                        }`}
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <Search className="h-3.5 w-3.5 text-gray-400" />
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 