import React from 'react'
import { 
  FileText, 
  Download,
  CheckCircle,
  FlaskRound,
  Calendar,
  ArrowUpRight,
  Info,
} from 'lucide-react'
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Lab Test Results Mock Data
const labResults = [
  {
    id: "cbd-tincture-1000",
    name: "CBD Tincture 1000mg",
    date: "February 15, 2023",
    batch: "BT2023-02-15-1",
    results: {
      cbd: "1020mg (102.0%)",
      thc: "<0.3%",
      pesticides: "None Detected",
      metals: "None Detected",
      microbials: "None Detected"
    },
    labName: "GreenLeaf Analytics",
    reportUrl: "#"
  },
  {
    id: "cbd-topical-cooling",
    name: "CBD Cooling Relief Gel",
    date: "March 24, 2023",
    batch: "CG2023-03-24-1",
    results: {
      cbd: "525mg (105.0%)",
      thc: "<0.3%",
      pesticides: "None Detected",
      metals: "None Detected",
      microbials: "None Detected"
    },
    labName: "PureCannabis Testing",
    reportUrl: "#"
  },
  {
    id: "cbd-gummies-300",
    name: "CBD Gummies 300mg",
    date: "April 10, 2023",
    batch: "GUM2023-04-10-1",
    results: {
      cbd: "306mg (102.0%)",
      thc: "<0.3%",
      pesticides: "None Detected",
      metals: "None Detected",
      microbials: "None Detected"
    },
    labName: "GreenLeaf Analytics",
    reportUrl: "#"
  },
  {
    id: "cbd-pet-tincture",
    name: "CBD Pet Tincture 500mg",
    date: "May 5, 2023",
    batch: "PT2023-05-05-1",
    results: {
      cbd: "507mg (101.4%)",
      thc: "<0.3%",
      pesticides: "None Detected",
      metals: "None Detected",
      microbials: "None Detected"
    },
    labName: "PureCannabis Testing",
    reportUrl: "#"
  },
  {
    id: "cbd-softgels-750",
    name: "CBD Softgels 750mg",
    date: "June 18, 2023",
    batch: "SG2023-06-18-1",
    results: {
      cbd: "762mg (101.6%)",
      thc: "<0.3%",
      pesticides: "None Detected",
      metals: "None Detected",
      microbials: "None Detected"
    },
    labName: "CannaSafe Labs",
    reportUrl: "#"
  },
  {
    id: "cbd-sleep-tincture",
    name: "CBD Sleep Formula",
    date: "July 7, 2023",
    batch: "ST2023-07-07-1",
    results: {
      cbd: "815mg (101.9%)",
      thc: "<0.3%",
      pesticides: "None Detected",
      metals: "None Detected",
      microbials: "None Detected"
    },
    labName: "GreenLeaf Analytics",
    reportUrl: "#"
  }
]

export default function LabResultsPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">Transparency</Badge>
        <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
          Lab Test Results
        </h1>
        <p className="text-xl text-gray-600">
          We test all our products with third-party labs to ensure quality, potency, and safety.
        </p>
      </div>

      {/* Info Card */}
      <Card className="mb-12 border-green-100 bg-green-50/50">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Info className="h-6 w-6 text-green-700" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">About Our Testing</h3>
              <p className="text-gray-700 mb-4">
                At Twistly CBD, we believe in complete transparency. Every batch of our products undergoes rigorous testing by independent, third-party laboratories. These tests verify cannabinoid content and ensure the absence of harmful contaminants like pesticides, heavy metals, and microbials.
              </p>
              <p className="text-gray-700">
                Each product comes with a QR code that links directly to its lab results, allowing you to verify the quality of your specific batch.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lab Results Accordion */}
      <div className="max-w-4xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {labResults.map((result) => (
            <AccordionItem 
              key={result.id} 
              value={result.id}
              className="border border-green-100 rounded-lg mb-4 px-6 py-2 data-[state=open]:bg-green-50/50"
            >
              <AccordionTrigger className="hover:no-underline">
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center p-3 bg-green-100 rounded-full">
                      <FlaskRound className="h-5 w-5 text-green-700" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-green-800">{result.name}</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{result.date}</span>
                        </div>
                        <span>•</span>
                        <span>Batch: {result.batch}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                    Verified
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <div className="pl-16 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-green-100">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-green-800 text-base">Cannabinoid Content</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">CBD:</span>
                            <span className="text-sm font-medium">{result.results.cbd}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">THC:</span>
                            <span className="text-sm font-medium">{result.results.thc}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-green-100">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-green-800 text-base">Safety Testing</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Pesticides:</span>
                            <div className="flex items-center gap-1 text-green-700">
                              <CheckCircle className="h-4 w-4" />
                              <span className="text-sm font-medium">{result.results.pesticides}</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Heavy Metals:</span>
                            <div className="flex items-center gap-1 text-green-700">
                              <CheckCircle className="h-4 w-4" />
                              <span className="text-sm font-medium">{result.results.metals}</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Microbials:</span>
                            <div className="flex items-center gap-1 text-green-700">
                              <CheckCircle className="h-4 w-4" />
                              <span className="text-sm font-medium">{result.results.microbials}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-gray-500" />
                      <span className="text-sm text-gray-700">Testing by: {result.labName}</span>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm" className="text-green-700 border-green-200 hover:bg-green-50">
                        <ArrowUpRight className="mr-2 h-4 w-4" />
                        View Full Report
                      </Button>
                      <Button variant="outline" size="sm" className="text-green-700 border-green-200 hover:bg-green-50">
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      
      {/* Contact Section */}
      <div className="mt-20 bg-green-50 rounded-2xl p-8 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-green-800 mb-4">Need More Information?</h2>
        <p className="text-gray-600 mb-6">
          If you have questions about our testing procedures or want to learn more about a specific product's results, our team is here to help.
        </p>
        <Button className="bg-green-700 hover:bg-green-800 text-white">
          Contact Our Team
        </Button>
      </div>
    </div>
  )
} 