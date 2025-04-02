'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowRight, Heart, Activity, Bot, Beaker, CheckCircle, Brain, Zap, Moon, Flame, Shield, Pill, Droplet
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Container } from '@/components/ui/container'
import { commonConditions } from '../data/conditions'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ConditionsTabsProps {
  pageTheme: {
    colors: {
      primary: string;
      accent?: string;
      border?: string;
      borderHover?: string;
      background?: string;
    }
    gradients?: {
      button?: string;
      section?: string;
    }
  }
}

// Function to get the icon component based on the icon name
const getIconByName = (iconName: string, props?: React.ComponentProps<typeof Brain>) => {
  const defaultProps = { className: "h-5 w-5", ...props };
  switch (iconName) {
    case 'brain': return <Brain {...defaultProps} />;
    case 'activity': return <Activity {...defaultProps} />;
    case 'zap': return <Zap {...defaultProps} />;
    case 'heart': return <Heart {...defaultProps} />;
    case 'moon': return <Moon {...defaultProps} />;
    case 'flame': return <Flame {...defaultProps} />;
    default: return <Activity {...defaultProps} />;
  }
};

const getProductIcon = (type: string | undefined) => {
  switch (type?.toLowerCase()) {
    case 'oil':
    case 'tincture':
      return <Droplet className="h-4 w-4 text-blue-600" />;
    case 'capsules':
      return <Pill className="h-4 w-4 text-purple-600" />;
    case 'gummies':
      return <Heart className="h-4 w-4 text-pink-600" />;
    case 'topical':
    case 'balm':
      return <Zap className="h-4 w-4 text-orange-600" />;
    default:
      return <Beaker className="h-4 w-4 text-gray-600" />;
  }
};

export function ConditionsTabs({ pageTheme }: ConditionsTabsProps) {
  return (
    <section className="py-6 relative overflow-hidden bg-gradient-to-b from-green-50 to-white">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-10 w-60 h-60 bg-green-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-emerald-50 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-xl shadow-md p-4 overflow-hidden">
          <div className="text-center mb-4">
            <div className="inline-flex bg-gradient-to-br from-green-50/80 to-white rounded-full border border-green-200/40 shadow-sm p-1">
              <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5 font-medium">
                <Activity className="h-3.5 w-3.5" />
                <span>Common Conditions</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3 mb-2">
              Targeted Support with CBD
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-4 text-sm">
              Explore how CBD may help manage common health conditions. Find guidance and recommended products below.
            </p>
          </div>
          
          {/* Tabs */} 
          {commonConditions && commonConditions.length > 0 ? (
            <Tabs defaultValue={commonConditions[0].id} className="w-full">
              {/* Tabs List */}
              <div className="overflow-x-auto pb-2 mb-4 scrollbar-thin scrollbar-thumb-green-300/80 scrollbar-track-green-100/50 scrollbar-thumb-rounded-full">
                <TabsList className="h-auto p-1.5 bg-green-50 rounded-lg border border-green-200/50 shadow-sm w-max mx-auto flex space-x-1.5">
                  {commonConditions.map((condition) => (
                    <TabsTrigger
                      key={condition.id} 
                      value={condition.id}
                      className="flex-shrink-0 rounded-md px-4 py-2 transition-all duration-200 text-slate-600 data-[state=inactive]:opacity-90
                      hover:bg-green-100 hover:text-green-800 
                      data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:shadow-md"
                    >
                      <div className="flex items-center whitespace-nowrap justify-center gap-2">
                        {getIconByName(condition.iconName, { className: 'h-4 w-4'})} 
                        <span className="font-medium text-sm">{condition.name}</span>
                      </div>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {commonConditions.map((condition) => (
                <TabsContent 
                  key={condition.id} 
                  value={condition.id}
                  className="focus:outline-none mt-0 p-1 bg-gradient-to-br from-green-50/70 to-white rounded-lg border border-green-200/40 shadow-sm overflow-hidden"
                  tabIndex={-1}
                >
                  {/* Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
                    {/* Column 1: Overview & Benefits */}
                    <div className="lg:col-span-1 space-y-4">
                      {/* Title */}
                      <div className="flex items-center gap-3 mb-3 pb-3 border-b border-green-100">
                        <div className="p-2.5 rounded-full shadow-sm bg-gradient-to-br from-green-50 to-green-100 text-green-600 border border-green-200/50">
                          {getIconByName(condition.iconName, { className: 'h-5 w-5'})} 
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">{condition.name}</h3>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2 text-sm">Overview</h4>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {condition.description}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2 text-sm">
                          <Shield className="h-4 w-4 text-green-600" />
                          <span>Key Benefits</span>
                        </h4>
                        <ul className="space-y-1.5 list-inside">
                          {condition.keyBenefits && condition.keyBenefits.map((benefit, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                              <CheckCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-green-500" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Column 2: Recommendations */}
                    <div className="lg:col-span-1 space-y-4">
                      <div className="mb-3 pb-3 border-b border-green-100">
                        <h4 className="font-medium text-gray-700 text-sm">Recommended Products</h4>
                      </div>
                      {condition.products && condition.products.map((product, i) => {
                        // Handle both object and string product formats
                        const productObj = typeof product === 'string' 
                          ? { id: `product-${i}`, name: product, type: 'Other' } 
                          : product;
                        
                        return (
                          <div key={i} className="flex items-start gap-2.5 bg-white p-2 rounded-lg border border-green-100 hover:border-green-200 transition-colors duration-200 shadow-sm">
                            <div className="rounded-md bg-green-50 p-1.5 flex-shrink-0">
                              {getProductIcon(productObj.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="text-sm font-medium text-gray-800 mb-0.5">{productObj.name}</h5>
                              <div className="flex gap-1.5 mb-1">
                                <Badge variant="outline" className="bg-green-50 border-green-100 text-green-700 text-[10px] px-1.5 py-0 h-4">
                                  {productObj.type}
                                </Badge>
                              </div>
                              <Button
                                size="sm" 
                                variant="link" 
                                className="p-0 h-auto text-xs text-green-700 hover:text-green-800 mt-1"
                                asChild
                              >
                                <Link href={`/shop/${productObj.id}`}>
                                  View Details
                                  <ArrowRight className="w-3 h-3 ml-1.5" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Column 3: Usage & Research */}
                    <div className="lg:col-span-1 space-y-4">
                      <div className="mb-3 pb-3 border-b border-green-100">
                        <h4 className="font-medium text-gray-700 text-sm">Usage Guidelines</h4>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-green-100 shadow-sm mb-4">
                        <h5 className="text-sm font-medium text-gray-800 mb-1.5">Suggested Usage</h5>
                        <p className="text-xs text-gray-600 mb-2">{condition.dosage}</p>
                        <div className="mt-2 pt-2 border-t border-green-50">
                          <h6 className="text-xs font-medium text-gray-700 mb-1.5">Dosage Tips</h6>
                          <ul className="space-y-1 list-inside">
                            {condition.adminTips && condition.adminTips.map((tip, i) => (
                              <li key={i} className="flex items-start gap-2 text-[10px] text-gray-600">
                                <CheckCircle className="h-3 w-3 mt-px flex-shrink-0 text-green-500" />
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-green-50 to-white rounded-lg border border-green-100 p-3">
                        <h5 className="text-xs font-medium text-gray-700 mb-1 flex items-center gap-1.5">
                          <Beaker className="h-3.5 w-3.5 text-green-600" />
                          Research Insight
                        </h5>
                        <p className="text-[10px] text-gray-600">
                          Recent studies suggest CBD may have therapeutic potential for {condition.name.toLowerCase()}. While research is ongoing, many users report positive results.
                        </p>
                        <div className="mt-2 pt-2 border-t border-green-50 flex justify-end">
                          <Button
                            size="sm" 
                            variant="link" 
                            className="p-0 h-auto text-[10px] text-green-700 hover:text-green-800"
                            asChild
                          >
                            <Link href="/blog/cbd-research">
                              Read Research
                              <ArrowRight className="w-2.5 h-2.5 ml-1" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <div className="text-center p-6 bg-green-50/50 rounded-lg border border-green-200">
              <p className="text-gray-600">Loading condition information...</p>
            </div>
          )}
          
          <div className="border-t border-green-100 mt-4 pt-4 flex justify-center">
            <Button
              variant="outline"
              size="sm"
              className="border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800 rounded-full px-4 text-xs group"
              asChild
            >
              <Link href="/learn/cbd-conditions">
                Learn more about CBD for specific conditions
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
} 