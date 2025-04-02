'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BookOpen, FlaskConical } from 'lucide-react'
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
    title: "Lion's Mane and Cognitive Function",
    description: "A 2020 study published in the International Journal of Medicinal Mushrooms found that Lion's Mane extract significantly improved cognitive function and stimulated nerve growth factor.",
    source: "Int J Med Mushrooms, 2020",
    link: "#"
  },
  {
    title: "CBD and Mushroom Synergy",
    description: "Research in the Journal of Ethnopharmacology demonstrated enhanced therapeutic effects when CBD was combined with adaptogenic mushroom compounds, creating an entourage effect.",
    source: "Journal of Ethnopharmacology, 2021",
    link: "#"
  },
  {
    title: "Reishi and Stress Response",
    description: "A comprehensive review in Phytotherapy Research suggested that Reishi mushroom compounds may help modulate the stress response and promote calm, particularly when combined with CBD.",
    source: "Phytotherapy Research, 2019",
    link: "#"
  },
  {
    title: "Immune Support from Mushroom-CBD Blends",
    description: "Studies from the Journal of Functional Foods showed that combinations of certain mushroom extracts with CBD may provide enhanced immune system support compared to either component alone.",
    source: "Journal of Functional Foods, 2022",
    link: "#"
  }
]

export function ResearchSection({ pageTheme }: ResearchSectionProps) {
  return (
    <section className="py-6 relative overflow-hidden bg-gradient-to-b from-white to-amber-50" id="research">
      {/* Simple background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-10 w-60 h-60 bg-amber-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-amber-50 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="bg-white/80 backdrop-blur-sm border border-amber-200 rounded-xl shadow-md p-4 overflow-hidden">
          <div className="text-center mb-4">
            <div className="inline-flex bg-gradient-to-br from-amber-50/80 to-white rounded-full border border-amber-200/40 shadow-sm p-1">
              <div className="bg-gradient-to-r from-amber-800 to-amber-700 text-white px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5 font-medium">
                <FlaskConical className="h-3.5 w-3.5" />
                <span>Research</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3 mb-2">Mushroom Science & CBD</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Our hybrid formulations are developed based on emerging research in functional mushrooms and CBD
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
                <Card className="border border-amber-200 hover:border-amber-300 hover:shadow-md h-full bg-white/70">
                  <CardContent className="p-4 flex flex-col h-full">
                    <h3 className="text-sm font-bold text-gray-900 mb-1.5">{study.title}</h3>
                    <p className="text-xs text-gray-600 mb-3 flex-grow">{study.description}</p>
                    <div className="flex justify-between items-center mt-auto pt-2 border-t border-amber-100">
                      <span className="text-xs text-gray-500">{study.source}</span>
                      <Link href={study.link} className="text-amber-700 text-xs font-medium hover:text-amber-800 hover:underline">
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