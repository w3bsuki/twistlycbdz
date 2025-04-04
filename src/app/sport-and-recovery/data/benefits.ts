import { type Benefit } from '@/components/features/shared/benefits-grid'
import { type BenefitItem } from '@/components/shared/category/CategoryBenefits'

export const sportBenefits: Benefit[] = [
  {
    title: "Faster Recovery",
    description: "CBD may help reduce exercise-induced inflammation and promote faster recovery between training sessions.",
    icon: "rotate-ccw",
    stat: "95% satisfaction",
    timeToEffect: "30-60 min"
  },
  {
    title: "Reduced Inflammation",
    description: "Research suggests CBD has anti-inflammatory properties that may help manage pain and soreness after intense workouts.",
    icon: "activity",
    stat: "92% satisfaction",
    timeToEffect: "45-90 min"
  },
  {
    title: "Better Sleep",
    description: "CBD may improve sleep quality, which is essential for muscle recovery and athletic performance.",
    icon: "clock",
    stat: "89% satisfaction",
    timeToEffect: "60-120 min"
  },
  {
    title: "Improved Performance",
    description: "By promoting relaxation without sedation, CBD may help optimize your mental state for training and competition.",
    icon: "zap",
    stat: "87% satisfaction",
    timeToEffect: "30-60 min"
  },
  {
    title: "Reduced Exercise Stress",
    description: "CBD interacts with your endocannabinoid system to help manage the physical stress response from intense training.",
    icon: "timer",
    stat: "90% satisfaction",
    timeToEffect: "15-45 min"
  },
  {
    title: "Enhanced Endurance",
    description: "Some athletes report improved endurance and reduced exercise fatigue when incorporating CBD into their routine.",
    icon: "flame",
    stat: "85% satisfaction",
    timeToEffect: "30-90 min"
  }
]

// Compatibility with CategoryBenefits component which uses BenefitItem interface
export const sportBenefitItems: BenefitItem[] = [
  {
    title: "Faster Recovery",
    description: "CBD may help reduce exercise-induced inflammation and promote faster recovery between training sessions.",
    iconName: "rotate-ccw",
    stats: {
      satisfaction: "95%",
      timeToEffect: "30-60 min"
    }
  },
  {
    title: "Reduced Inflammation",
    description: "Research suggests CBD has anti-inflammatory properties that may help manage pain and soreness after intense workouts.",
    iconName: "activity",
    stats: {
      satisfaction: "92%",
      timeToEffect: "45-90 min"
    }
  },
  {
    title: "Better Sleep",
    description: "CBD may improve sleep quality, which is essential for muscle recovery and athletic performance.",
    iconName: "clock",
    stats: {
      satisfaction: "89%",
      timeToEffect: "60-120 min"
    }
  },
  {
    title: "Improved Performance",
    description: "By promoting relaxation without sedation, CBD may help optimize your mental state for training and competition.",
    iconName: "zap",
    stats: {
      satisfaction: "87%",
      timeToEffect: "30-60 min"
    }
  },
  {
    title: "Reduced Exercise Stress",
    description: "CBD interacts with your endocannabinoid system to help manage the physical stress response from intense training.",
    iconName: "timer",
    stats: {
      satisfaction: "90%",
      timeToEffect: "15-45 min"
    }
  },
  {
    title: "Enhanced Endurance",
    description: "Some athletes report improved endurance and reduced exercise fatigue when incorporating CBD into their routine.",
    iconName: "flame",
    stats: {
      satisfaction: "85%",
      timeToEffect: "30-90 min"
    }
  }
] 