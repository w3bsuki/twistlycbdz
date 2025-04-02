'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/ui/container'

interface ResearchSectionProps {
  pageTheme: {
    colors: {
      primary: string;
      accent: string;
      border: string;
      borderHover: string;
      background: string;
    }
  }
}

// Research and studies data
const researchStudies = [
  {
    title: "CBD and Exercise-Induced Inflammation",
    description: "A 2020 study published in Sports Medicine found that CBD may help reduce inflammatory markers after intense exercise, potentially accelerating recovery times.",
    source: "Sports Medicine, 2020",
    link: "#"
  },
  {
    title: "CBD for Sports Recovery",
    description: "Research in the International Journal of Sports Physiology and Performance demonstrated CBD's potential to enhance recovery metrics in athletes following high-intensity training.",
    source: "Int J Sports Physiol Perform, 2021",
    link: "#"
  },
  {
    title: "CBD and Athletic Performance",
    description: "A comprehensive review in Frontiers in Physiology suggested that CBD may help manage exercise-induced inflammation without negatively impacting athletic performance.",
    source: "Frontiers in Physiology, 2020",
    link: "#"
  },
  {
    title: "CBD for Sports-Related Pain",
    description: "Studies from the Journal of Pain Research showed that topical CBD application may help manage localized pain associated with sports injuries and intense training.",
    source: "Journal of Pain Research, 2019",
    link: "#"
  }
]

export function ResearchSection({ pageTheme }: ResearchSectionProps) {
  return (
    <section className="py-6 relative overflow-hidden bg-gradient-to-b from-white to-blue-50" id="research">
      {/* Simple background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-10 w-60 h-60 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-cyan-50 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-xl shadow-md p-4 overflow-hidden">
          <div className="text-center mb-4">
            <div className="inline-flex bg-gradient-to-br from-blue-50/80 to-white rounded-full border border-blue-200/40 shadow-sm p-1">
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5 font-medium">
                <BookOpen className="h-3.5 w-3.5" />
                <span>Research</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3 mb-2">Sports Science & CBD</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Our products are developed based on the latest scientific research on CBD for athletes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {researchStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`border ${pageTheme.colors.border} ${pageTheme.colors.borderHover} hover:shadow-md h-full bg-white/70`}>
                  <CardContent className="p-4 flex flex-col h-full">
                    <h3 className="text-sm font-bold text-gray-900 mb-1.5">{study.title}</h3>
                    <p className="text-xs text-gray-600 mb-3 flex-grow">{study.description}</p>
                    <div className="flex justify-between items-center mt-auto pt-2 border-t border-blue-100">
                      <span className="text-xs text-gray-500">{study.source}</span>
                      <Link href={study.link} className="text-blue-600 text-xs font-medium hover:text-blue-700 hover:underline">
                        Read More
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
} 