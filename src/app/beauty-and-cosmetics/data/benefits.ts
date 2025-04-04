import { type Benefit } from '@/components/features/shared/benefits-grid'
import { type BenefitItem } from '@/components/shared/category/CategoryBenefits'

export const beautyBenefits: Benefit[] = [
  {
    title: "Antioxidant Protection",
    description: "CBD's powerful antioxidant properties protect skin cells from free radical damage and environmental stressors, reducing visible signs of aging.",
    icon: "shield",
    stat: "96% satisfaction",
    timeToEffect: "2-4 weeks"
  },
  {
    title: "Anti-Inflammatory Effects",
    description: "Reduces redness, puffiness, and skin irritation, making CBD products excellent for sensitive skin and conditions like eczema and rosacea.",
    icon: "heart",
    stat: "94% satisfaction",
    timeToEffect: "1-2 weeks"
  },
  {
    title: "Oil Regulation",
    description: "Helps normalize sebum production, reducing excessive oiliness while maintaining proper skin hydration, ideal for acne-prone skin.",
    icon: "droplet",
    stat: "92% satisfaction",
    timeToEffect: "2-3 weeks"
  },
  {
    title: "UV Protection Support",
    description: "Enhances the skin's natural defense against UV damage when used alongside sunscreen, helping prevent photoaging and sunspots.",
    icon: "sun",
    stat: "91% satisfaction",
    timeToEffect: "3-4 weeks"
  },
  {
    title: "Gentle Yet Effective",
    description: "Provides powerful skincare benefits without harsh chemicals, making it suitable for all skin types including the most sensitive.",
    icon: "feather",
    stat: "95% satisfaction",
    timeToEffect: "1-3 weeks"
  },
  {
    title: "Enhanced Absorption",
    description: "Our CBD beauty formulations are designed for optimal penetration, delivering active ingredients deep into skin layers for maximum efficacy.",
    icon: "trending-up",
    stat: "93% satisfaction",
    timeToEffect: "2-3 weeks"
  }
]

// Compatibility with CategoryBenefits component which uses BenefitItem interface
export const beautyBenefitItems: BenefitItem[] = [
  {
    title: "Antioxidant Protection",
    description: "CBD's powerful antioxidant properties protect skin cells from free radical damage and environmental stressors, reducing visible signs of aging.",
    iconName: "shield",
    stats: {
      satisfaction: "96%",
      timeToEffect: "2-4 weeks"
    }
  },
  {
    title: "Anti-Inflammatory Effects",
    description: "Reduces redness, puffiness, and skin irritation, making CBD products excellent for sensitive skin and conditions like eczema and rosacea.",
    iconName: "heart",
    stats: {
      satisfaction: "94%",
      timeToEffect: "1-2 weeks"
    }
  },
  {
    title: "Oil Regulation",
    description: "Helps normalize sebum production, reducing excessive oiliness while maintaining proper skin hydration, ideal for acne-prone skin.",
    iconName: "droplet",
    stats: {
      satisfaction: "92%",
      timeToEffect: "2-3 weeks"
    }
  },
  {
    title: "UV Protection Support",
    description: "Enhances the skin's natural defense against UV damage when used alongside sunscreen, helping prevent photoaging and sunspots.",
    iconName: "sun",
    stats: {
      satisfaction: "91%",
      timeToEffect: "3-4 weeks"
    }
  },
  {
    title: "Gentle Yet Effective",
    description: "Provides powerful skincare benefits without harsh chemicals, making it suitable for all skin types including the most sensitive.",
    iconName: "feather",
    stats: {
      satisfaction: "95%",
      timeToEffect: "1-3 weeks"
    }
  },
  {
    title: "Enhanced Absorption",
    description: "Our CBD beauty formulations are designed for optimal penetration, delivering active ingredients deep into skin layers for maximum efficacy.",
    iconName: "trending-up",
    stats: {
      satisfaction: "93%",
      timeToEffect: "2-3 weeks"
    }
  }
] 