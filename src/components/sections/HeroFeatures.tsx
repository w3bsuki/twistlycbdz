import React from 'react';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { ShoppingBag, BookOpen, MessageSquare } from 'lucide-react';

// Update interface to match the enhanced FeatureCard component
interface FeatureCardData {
  icon: React.ReactNode;
  title: string;
  description?: string;
  link: { text: string; href: string };
  theme?: {
    gradient: string;
    accent: string;
    border: string;
    text: string;
    textLight: string;
  };
}

interface HeroFeaturesProps {
  features?: FeatureCardData[];
}

// Predefined themes for each card to match category highlights style
const themes = {
  shop: {
    gradient: "from-blue-50 via-blue-100/80 to-blue-50/40",
    accent: "bg-blue-600",
    border: "border-blue-200",
    text: "text-blue-800",
    textLight: "text-blue-600",
  },
  learn: {
    gradient: "from-green-50 via-green-100/80 to-green-50/40",
    accent: "bg-green-600",
    border: "border-green-200",
    text: "text-green-800",
    textLight: "text-green-600",
  },
  consult: {
    gradient: "from-purple-50 via-purple-100/80 to-purple-50/40",
    accent: "bg-purple-600",
    border: "border-purple-200",
    text: "text-purple-800",
    textLight: "text-purple-600",
  }
};

// Default features if none provided
const defaultFeatures: FeatureCardData[] = [
  {
    icon: <ShoppingBag />,
    title: "Shop Products",
    description: "Browse our curated CBD collections",
    link: { text: "Explore Shop", href: "/shop" },
    theme: themes.shop
  },
  {
    icon: <BookOpen />,
    title: "Learn About CBD",
    description: "Discover benefits and usage guides",
    link: { text: "Read Articles", href: "/learn" },
    theme: themes.learn
  },
  {
    icon: <MessageSquare />,
    title: "AI Consultation",
    description: "Get personalized recommendations",
    link: { text: "Chat with Dr. Twistly", href: "#ai-section" },
    theme: themes.consult
  },
];

export function HeroFeatures({ features = defaultFeatures }: HeroFeaturesProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          link={feature.link}
          theme={feature.theme}
        />
      ))}
    </div>
  );
} 