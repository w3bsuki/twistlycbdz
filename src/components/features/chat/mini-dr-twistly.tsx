"use client"

import React from 'react'
import { ArrowRight } from 'lucide-react'

interface MiniDrTwistlyProps {
  className?: string
}

export function MiniDrTwistly({ className }: MiniDrTwistlyProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Open the full Dr. Twistly dialog
    const drTwistlyButton = document.querySelector('[data-dr-twistly-trigger]') as HTMLButtonElement;
    if (drTwistlyButton) drTwistlyButton.click();
  };

  return (
    <div className="max-w-xl mx-auto bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full shadow-sm p-2 flex items-center justify-center">
          <img 
            src="/images/4.png" 
            alt="Dr. Twistly" 
            className="w-8 h-8 object-contain"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold mb-0.5">Need help finding the right CBD product?</h3>
          <p className="text-[10px] text-gray-600 mb-2">Ask Dr. Twistly and get personalized recommendations instantly</p>
          <form className="flex gap-1.5" onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="What can help with sleep issues?" 
              className="flex-1 px-2.5 py-1 text-xs rounded-full border border-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <button 
              type="submit" 
              className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1 transition-colors shadow-sm"
            >
              Ask <ArrowRight className="h-3 w-3" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
} 