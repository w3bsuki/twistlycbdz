import { colors, typography, spacing, breakpoints } from './src/lib/design-tokens';
import tailwindcssAnimate from 'tailwindcss-animate';
import tailwindcssAspectRatio from '@tailwindcss/aspect-ratio';
import tailwindcssTypography from '@tailwindcss/typography';
import tailwindcssForms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2'
      },
      backgroundImage: {
        'dot-black': 'radial-gradient(rgba(0, 0, 0, 0.2) 1px, transparent 1px)',
        'dot-white': 'radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      backgroundSize: {
        dot: '16px 16px'
      },
      colors,
      borderColor: {
        DEFAULT: 'hsl(var(--border))'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        mono: 'var(--font-mono)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        'appear': {
          '0%': { 
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'appear-zoom': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'appear': 'appear 0.5s ease-out forwards',
        'appear-zoom': 'appear-zoom 0.5s ease-out forwards'
      },
      spacing,
      fontSize: typography.sizes,
      fontWeight: typography.weights,
      lineHeight: typography.lineHeights,
      screens: breakpoints,
    }
  },
  plugins: [
    tailwindcssAnimate,
    tailwindcssAspectRatio,
    tailwindcssTypography,
    tailwindcssForms,
  ],
}
