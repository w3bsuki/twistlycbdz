import { type Benefit } from '@/components/features/shared/benefits-grid'
import { type BenefitItem } from '@/components/shared/category/CategoryBenefits'

export const hybridBenefits: Benefit[] = [
  {
    title: "Cognitive Enhancement",
    description: "Functional mushrooms like Lion's Mane combined with CBD support brain health and cognitive function.",
    icon: "brain",
    stat: "94% satisfaction",
    timeToEffect: "30-60 min"
  },
  {
    title: "Immune System Support",
    description: "Medicinal mushrooms provide powerful immune system support, complemented by CBD's anti-inflammatory properties.",
    icon: "shield",
    stat: "92% satisfaction",
    timeToEffect: "45-90 min"
  },
  {
    title: "Adaptogenic Balance",
    description: "Mushroom and CBD combinations help the body adapt to stress and maintain homeostasis.",
    icon: "leaf",
    stat: "89% satisfaction",
    timeToEffect: "15-45 min"
  },
  {
    title: "Enhanced Recovery",
    description: "The combination promotes faster recovery and reduced inflammation after physical exertion.",
    icon: "activity",
    stat: "87% satisfaction",
    timeToEffect: "30-60 min"
  },
  {
    title: "Synergistic Effect",
    description: "The entourage effect of combining mushrooms with CBD creates more powerful benefits than either alone.",
    icon: "sparkles",
    stat: "91% satisfaction",
    timeToEffect: "30-90 min"
  },
  {
    title: "Stress Reduction",
    description: "Both compounds work together to calm the nervous system and reduce the impact of daily stressors.",
    icon: "heart",
    stat: "95% satisfaction",
    timeToEffect: "20-50 min"
  }
]

// Compatibility with CategoryBenefits component which uses BenefitItem interface
export const hybridBenefitItems: BenefitItem[] = [
  {
    title: "Cognitive Enhancement",
    description: "Functional mushrooms like Lion's Mane combined with CBD support brain health and cognitive function.",
    iconName: "brain",
    stats: {
      satisfaction: "94%",
      timeToEffect: "30-60 min"
    }
  },
  {
    title: "Immune System Support",
    description: "Medicinal mushrooms provide powerful immune system support, complemented by CBD's anti-inflammatory properties.",
    iconName: "shield",
    stats: {
      satisfaction: "92%",
      timeToEffect: "45-90 min"
    }
  },
  {
    title: "Adaptogenic Balance",
    description: "Mushroom and CBD combinations help the body adapt to stress and maintain homeostasis.",
    iconName: "leaf",
    stats: {
      satisfaction: "89%",
      timeToEffect: "15-45 min"
    }
  },
  {
    title: "Enhanced Recovery",
    description: "The combination promotes faster recovery and reduced inflammation after physical exertion.",
    iconName: "activity",
    stats: {
      satisfaction: "87%",
      timeToEffect: "30-60 min"
    }
  },
  {
    title: "Synergistic Effect",
    description: "The entourage effect of combining mushrooms with CBD creates more powerful benefits than either alone.",
    iconName: "sparkles",
    stats: {
      satisfaction: "91%",
      timeToEffect: "30-90 min"
    }
  },
  {
    title: "Stress Reduction",
    description: "Both compounds work together to calm the nervous system and reduce the impact of daily stressors.",
    iconName: "heart",
    stats: {
      satisfaction: "95%",
      timeToEffect: "20-50 min"
    }
  }
] 