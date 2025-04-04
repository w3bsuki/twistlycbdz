'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Heart, 
  Moon, 
  Brain, 
  Activity, 
  Leaf, 
  Shield, 
  Clock, 
  Zap, 
  Timer, 
  Flame, 
  Sparkles,
  ChevronRight
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { cn } from '@/lib/utils'
import { CategoryTheme } from './CategoryHero'
import Link from 'next/link'

// Icon mapping function
const getIconByName = (iconName: string, className?: string) => {
  switch (iconName.toLowerCase()) {
    case 'heart':
      return <Heart className={className} aria-hidden="true" />;
    case 'moon':
      return <Moon className={className} aria-hidden="true" />;
    case 'brain':
      return <Brain className={className} aria-hidden="true" />;
    case 'activity':
      return <Activity className={className} aria-hidden="true" />;
    case 'leaf':
      return <Leaf className={className} aria-hidden="true" />;
    case 'shield':
      return <Shield className={className} aria-hidden="true" />;
    case 'clock':
      return <Clock className={className} aria-hidden="true" />;
    case 'zap':
      return <Zap className={className} aria-hidden="true" />;
    case 'timer':
      return <Timer className={className} aria-hidden="true" />;
    case 'flame':
      return <Flame className={className} aria-hidden="true" />;
    default:
      return <Heart className={className} aria-hidden="true" />;
  }
};

export interface BenefitItem {
  title: string;
  description: string;
  iconName: string;
  stats: {
    satisfaction: string;
    timeToEffect: string;
  }
}

export interface CategoryBenefitsProps {
  theme: CategoryTheme;
  sectionTitle: string;
  sectionDescription: string;
  benefits: BenefitItem[];
  ctaText: string;
  ctaLink: string;
  className?: string;
}

export function CategoryBenefits({
  theme,
  sectionTitle,
  sectionDescription,
  benefits,
  ctaText,
  ctaLink,
  className
}: CategoryBenefitsProps) {
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
      
      benefitContainer: cn(
        "bg-gradient-to-br rounded-lg border border-opacity-40 h-full shadow-sm p-2 flex",
      ),
      
      benefitContainerStyle: {
        backgroundImage: 
          colors.primary === 'green-600' ? 'linear-gradient(to bottom right, rgba(220, 252, 231, 0.5), rgba(255, 255, 255, 0.95))' :
          colors.primary === 'amber-600' ? 'linear-gradient(to bottom right, rgba(254, 243, 199, 0.5), rgba(255, 255, 255, 0.95))' :
          colors.primary === 'blue-600' ? 'linear-gradient(to bottom right, rgba(219, 234, 254, 0.5), rgba(255, 255, 255, 0.95))' :
          colors.primary === 'purple-600' ? 'linear-gradient(to bottom right, rgba(237, 233, 254, 0.5), rgba(255, 255, 255, 0.95))' :
          colors.primary === 'indigo-600' ? 'linear-gradient(to bottom right, rgba(224, 231, 255, 0.5), rgba(255, 255, 255, 0.95))' :
          'linear-gradient(to bottom right, rgba(243, 244, 246, 0.5), rgba(255, 255, 255, 0.95))',
        borderColor: 
          colors.primary === 'green-600' ? 'rgba(134, 239, 172, 0.4)' :
          colors.primary === 'amber-600' ? 'rgba(252, 211, 77, 0.4)' :
          colors.primary === 'blue-600' ? 'rgba(147, 197, 253, 0.4)' :
          colors.primary === 'purple-600' ? 'rgba(196, 181, 253, 0.4)' :
          colors.primary === 'indigo-600' ? 'rgba(165, 180, 252, 0.4)' :
          'rgba(209, 213, 219, 0.4)'
      },
      
      benefitCardStyle: {
        background: 
          colors.primary === 'green-600' ? 'linear-gradient(to bottom right, white, #ecfdf5)' :
          colors.primary === 'amber-600' ? 'linear-gradient(to bottom right, white, #fef9ec)' :
          colors.primary === 'blue-600' ? 'linear-gradient(to bottom right, white, #eff6ff)' :
          colors.primary === 'purple-600' ? 'linear-gradient(to bottom right, white, #f5f3ff)' :
          colors.primary === 'indigo-600' ? 'linear-gradient(to bottom right, white, #eef2ff)' :
          'linear-gradient(to bottom right, white, #f9fafb)'
      },
      
      benefitCard: cn(
        "h-full rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 w-full flex flex-col border-l-[3px]",
        colors.border === 'green-200' ? 'border-green-200' :
        colors.border === 'amber-200' ? 'border-amber-200' :
        colors.border === 'blue-200' ? 'border-blue-200' :
        colors.border === 'purple-200' ? 'border-purple-200' :
        colors.border === 'indigo-200' ? 'border-indigo-200' :
        'border-gray-200'
      ),
      
      iconBackground: cn(
        "h-9 w-9 rounded-full flex items-center justify-center shrink-0 shadow-sm",
        colors.gradientFrom === 'green-50' ? 'bg-green-50' :
        colors.gradientFrom === 'amber-50' ? 'bg-amber-50' :
        colors.gradientFrom === 'blue-50' ? 'bg-blue-50' :
        colors.gradientFrom === 'purple-50' ? 'bg-purple-50' :
        colors.gradientFrom === 'indigo-50' ? 'bg-indigo-50' :
        'bg-gray-50'
      ),
      
      iconColor: cn(
        "h-4.5 w-4.5",
        colors.primary === 'green-600' ? 'text-green-500' :
        colors.primary === 'amber-600' ? 'text-amber-500' :
        colors.primary === 'blue-600' ? 'text-blue-500' :
        colors.primary === 'purple-600' ? 'text-purple-500' :
        colors.primary === 'indigo-600' ? 'text-indigo-500' :
        'text-gray-500'
      ),
      
      statHighlight: cn(
        "font-medium",
        colors.primary === 'green-600' ? 'text-green-500' :
        colors.primary === 'amber-600' ? 'text-amber-500' :
        colors.primary === 'blue-600' ? 'text-blue-500' :
        colors.primary === 'purple-600' ? 'text-purple-500' :
        colors.primary === 'indigo-600' ? 'text-indigo-500' :
        'text-gray-500'
      ),
      
      divider: cn(
        "h-px w-full bg-gradient-to-r my-1.5",
        colors.border === 'green-200' ? 'from-green-200/40 via-green-100 to-green-200/40' :
        colors.border === 'amber-200' ? 'from-amber-200/40 via-amber-100 to-amber-200/40' :
        colors.border === 'blue-200' ? 'from-blue-200/40 via-blue-100 to-blue-200/40' :
        colors.border === 'purple-200' ? 'from-purple-200/40 via-purple-100 to-purple-200/40' :
        colors.border === 'indigo-200' ? 'from-indigo-200/40 via-indigo-100 to-indigo-200/40' :
        'from-gray-200/40 via-gray-100 to-gray-200/40'
      ),
      
      buttonText: cn(
        "w-full justify-between px-1 py-1 hover:bg-opacity-10 text-xs",
        colors.primary === 'green-600' ? 'text-green-500 hover:bg-green-50' :
        colors.primary === 'amber-600' ? 'text-amber-500 hover:bg-amber-50' :
        colors.primary === 'blue-600' ? 'text-blue-500 hover:bg-blue-50' :
        colors.primary === 'purple-600' ? 'text-purple-500 hover:bg-purple-50' :
        colors.primary === 'indigo-600' ? 'text-indigo-500 hover:bg-indigo-50' :
        'text-gray-500 hover:bg-gray-50'
      ),
      
      ctaContainer: cn(
        "flex justify-center mt-4 pt-3 border-t",
        colors.border === 'green-200' ? 'border-green-100' :
        colors.border === 'amber-200' ? 'border-amber-100' :
        colors.border === 'blue-200' ? 'border-blue-100' :
        colors.border === 'purple-200' ? 'border-purple-100' :
        colors.border === 'indigo-200' ? 'border-indigo-100' :
        'border-gray-100'
      ),
      
      ctaWrapper: cn(
        "bg-gradient-to-br to-white rounded-full shadow-sm p-1 px-2 border",
        colors.gradientFrom === 'green-50' ? 'from-green-50/80 border-green-200/40' :
        colors.gradientFrom === 'amber-50' ? 'from-amber-50/80 border-amber-200/40' :
        colors.gradientFrom === 'blue-50' ? 'from-blue-50/80 border-blue-200/40' :
        colors.gradientFrom === 'purple-50' ? 'from-purple-50/80 border-purple-200/40' :
        colors.gradientFrom === 'indigo-50' ? 'from-indigo-50/80 border-indigo-200/40' :
        'from-gray-50/80 border-gray-200/40'
      ),
      
      ctaButton: cn(
        "rounded-full px-2.5 py-1.5 text-xs whitespace-nowrap",
        colors.border === 'green-200' ? 'border-green-200/80 text-green-700 hover:bg-green-50 hover:text-green-800' :
        colors.border === 'amber-200' ? 'border-amber-200/80 text-amber-700 hover:bg-amber-50 hover:text-amber-800' :
        colors.border === 'blue-200' ? 'border-blue-200/80 text-blue-700 hover:bg-blue-50 hover:text-blue-800' :
        colors.border === 'purple-200' ? 'border-purple-200/80 text-purple-700 hover:bg-purple-50 hover:text-purple-800' :
        colors.border === 'indigo-200' ? 'border-indigo-200/80 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800' :
        'border-gray-200/80 text-gray-700 hover:bg-gray-50 hover:text-gray-800'
      )
    };
  };
  
  const classes = getClasses();
  const sectionId = `${theme.name.toLowerCase().replace(/[&\s]+/g, '-')}-benefits`;
  
  return (
    <section 
      className={cn(classes.section, className)}
      id={sectionId}
      aria-labelledby={`${sectionId}-heading`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className={classes.bgDecorationPrimary}></div>
        <div className={classes.bgDecorationAccent}></div>
      </div>
      
      <Container className="relative z-10">
        <div className={classes.cardBorder}>
          <div className="text-center mb-4">
            <div className={classes.badgeOuter}>
              <div className={classes.badgeInner}>
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{theme.name} Benefits</span>
              </div>
            </div>
            <h2 id={`${sectionId}-heading`} className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-3 mb-2">{sectionTitle}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-4 text-sm md:text-base leading-relaxed">
              {sectionDescription}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="h-full"
              >
                {/* Outer container with gradient and border */}
                <div 
                  className={classes.benefitContainer}
                  style={classes.benefitContainerStyle}
                >
                  <Card 
                    className={classes.benefitCard}
                    style={classes.benefitCardStyle}
                  >
                    <CardContent className="p-3 flex flex-col h-full">
                      <div className="flex items-start gap-2.5 mb-2">
                        <div className={classes.iconBackground} aria-hidden="true">
                          {getIconByName(benefit.iconName, classes.iconColor)}
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-bold text-gray-900 mb-0.5">{benefit.title}</h3>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-500">
                              <span className={classes.statHighlight}>{benefit.stats.satisfaction}</span> satisfaction
                            </span>
                            <span className="mx-1 text-gray-300" aria-hidden="true">•</span>
                            <span className="text-xs text-gray-500">
                              <span className={classes.statHighlight}>{benefit.stats.timeToEffect}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-xs mb-2 flex-grow h-[4rem] overflow-hidden">{benefit.description}</p>
                      
                      <div className="mt-auto">
                        <div className={classes.divider} aria-hidden="true"></div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={classes.buttonText}
                          asChild
                        >
                          <Link 
                            href="#featured-products" 
                            className="flex items-center" 
                            aria-label={`View products related to ${benefit.title}`}
                          >
                            View related products
                            <ChevronRight className="h-3 w-3 ml-1" aria-hidden="true" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
          
          <div className={classes.ctaContainer}>
            <div className={classes.ctaWrapper}>
              <Button 
                variant="outline" 
                size="sm"
                className={classes.ctaButton}
                asChild
              >
                <Link 
                  href={ctaLink} 
                  className="flex items-center" 
                  aria-label={ctaText}
                >
                  {ctaText}
                  <ChevronRight className="h-3 w-3 ml-1" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
} 