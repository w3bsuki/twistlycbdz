import { Brain, Activity, Zap, Heart, Moon, Flame, Bed } from 'lucide-react';

export interface Condition {
  id: string;
  name: string;
  iconName: string;
  description: string;
  dosage: string;
  products: Array<{ id: string; name: string; type: string } | string>;
  keyBenefits: string[];
  adminTips: string[];
}

export const commonConditions: Condition[] = [
  {
    id: 'anxiety',
    name: 'Anxiety Relief',
    iconName: 'brain',
    description: 
      'CBD interacts with serotonin receptors in the brain, potentially helping to regulate mood and promote a sense of calm. It may reduce symptoms associated with various anxiety disorders without the intoxicating effects of THC.',
    dosage: 
      'Start with a low dose (10-15mg) once or twice daily. Gradually increase every few days until desired effects are noticed. Consistency is key. Consult with a healthcare professional for personalized advice.',
    products: [
      { id: 'calm-drops', name: 'Calm CBD Oil Drops (500mg)', type: 'Oil' },
      { id: 'anxiety-gummies', name: 'Chewable Anxiety Relief Gummies', type: 'Gummies' },
      { id: 'relax-capsules', name: 'Relax & Unwind Capsules', type: 'Capsules' },
    ],
    keyBenefits: [
      'Promotes relaxation and calmness',
      'May reduce feelings of unease and worry',
      'Supports overall mood regulation',
      'Non-intoxicating formula'
    ],
    adminTips: [
      'Take sublingually (under the tongue) for faster absorption.',
      'Combine with mindfulness techniques for enhanced effects.',
      'Allow several weeks of consistent use for full benefits.'
    ]
  },
  {
    id: 'pain',
    name: 'Pain Management',
    iconName: 'activity',
    description:
      'CBD may influence pain pathways and interact with receptors involved in inflammation. Studies suggest it can be beneficial for managing chronic pain, arthritis discomfort, and exercise-induced soreness.',
    dosage:
      'For localized pain, topical creams can be applied directly. For systemic relief, start with 15-25mg orally, increasing as needed. Higher doses may be required for significant chronic pain.',
    products: [
      { id: 'pain-relief-balm', name: 'Soothing CBD Pain Relief Balm', type: 'Topical' },
      { id: 'extra-strength-oil', name: 'Extra Strength CBD Oil (1500mg)', type: 'Oil' },
      { id: 'joint-support-caps', name: 'Joint Support Capsules', type: 'Capsules' },
    ],
    keyBenefits: [
      'Helps manage chronic pain symptoms',
      'Reduces inflammation associated with pain',
      'Supports joint health and mobility',
      'Provides localized relief with topicals'
    ],
    adminTips: [
      'Apply topicals liberally to the affected area.',
      'Combine oral CBD with topicals for comprehensive relief.',
      'Consider full-spectrum products for the entourage effect.'
    ]
  },
  {
    id: 'stress',
    name: 'Stress Reduction',
    iconName: 'zap',
    description:
      "By interacting with the endocannabinoid system, CBD can help the body manage stress responses more effectively. It promotes balance and resilience, potentially reducing the impact of daily stressors.",
    dosage:
      'A daily dose of 10-20mg can help maintain balance. Use as needed during particularly stressful periods. Effects are often subtle and build over time with consistent use.',
    products: [
      { id: 'daily-zen-oil', name: 'Daily Zen CBD Oil (750mg)', type: 'Oil' },
      { id: 'stress-less-gummies', name: 'Stress Less Gummies', type: 'Gummies' },
      'Full Spectrum CBD Tincture', // Example of string product
    ],
     keyBenefits: [
      'Helps regulate the body\'s stress response',
      'Promotes a sense of calm during stressful situations',
      'Supports mental clarity and focus under pressure',
      'Aids in achieving overall systemic balance'
    ],
    adminTips: [
      'Incorporate into your daily wellness routine.',
      'Use before anticipated stressful events.',
      'Keep a journal to track effects on stress levels.'
    ]
  },
  {
    id: 'sleep',
    name: 'Sleep Support',
    iconName: 'moon',
    description:
      "CBD may help regulate sleep cycles by addressing underlying issues like anxiety or pain that interfere with rest. Some research suggests it can improve both sleep duration and quality.",
    dosage:
      'Take 15-30mg about 30-60 minutes before bedtime. Start low and adjust based on results. Consider products specifically formulated with other sleep aids like melatonin or CBN for enhanced effect.',
    products: [
      { id: 'sleep-well-oil', name: 'Sleep Well CBD + CBN Oil', type: 'Oil' },
      { id: 'night-time-gummies', name: 'Night Time Gummies with Melatonin', type: 'Gummies' },
      { id: 'deep-sleep-caps', name: 'Deep Sleep Capsules', type: 'Capsules' },
    ],
    keyBenefits: [
      'May improve sleep quality and duration',
      'Helps calm the mind before bed',
      'Addresses factors like pain or anxiety that disrupt sleep',
      'Promotes a more regular sleep-wake cycle'
    ],
    adminTips: [
      'Establish a consistent bedtime routine.',
      'Avoid screens and caffeine before bed.',
      'Experiment with timing to find what works best.'
    ]
  },
  {
    id: 'inflammation',
    name: 'Inflammation Control',
    iconName: 'flame',
    description:
      "CBD exhibits anti-inflammatory properties by interacting with ECS receptors and influencing inflammatory pathways. It may help manage systemic inflammation related to various conditions.",
    dosage:
      'Doses for inflammation can vary widely. General wellness doses (15-25mg) may suffice, but higher doses might be needed for specific inflammatory conditions. Consistency is important.',
    products: [
      { id: 'full-spectrum-1000', name: 'Full Spectrum CBD Oil (1000mg)', type: 'Oil' },
      { id: 'inflammation-support', name: 'Inflammation Support Capsules', type: 'Capsules' },
      { id: 'recovery-balm', name: 'Recovery CBD Balm (High Potency)', type: 'Topical' },
    ],
    keyBenefits: [
      'Possesses natural anti-inflammatory properties',
      'May help reduce systemic inflammation',
      'Supports recovery from exercise-induced inflammation',
      'Complements other inflammation management strategies'
    ],
    adminTips: [
      'Combine with an anti-inflammatory diet for best results.',
      'Use topicals for localized inflammation.',
      'Consider full-spectrum products for broad effects.'
    ]
  },
  // Placeholder for original items if they existed and need manual merging
  // Example:
  // {
  //   id: 'alzheimers', // Assuming this was an original ID
  //   name: 'Alzheimer\'s Support', // Original name?
  //   iconName: 'brain', // Original icon?
  //   description: 'Original description here...',
  //   dosage: 'Original dosage info here...',
  //   products: [ /* Original products */ ],
  //   keyBenefits: [ /* Add relevant benefits */ ],
  //   adminTips: [ /* Add relevant tips */ ],
  // },
]; 