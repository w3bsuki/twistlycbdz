# Page Revamp Plan

## 1. Component Structure
- Separate each page into distinct components:
  - HeroSection
  - BenefitsSection 
  - FeaturedProducts
  - ConditionsTabs (adapt for specific use cases)
  - TestimonialsSection
  - CtaSection

## 2. Design Standards

### Container Style
- Use consistent backdrop containers:
  ```
  bg-white/80 backdrop-blur-sm border border-[theme]-200 rounded-xl shadow-md p-4
  ```
- Apply gradient backgrounds:
  ```
  bg-gradient-to-b from-[theme]-50 to-white
  ```
- Add subtle background decorations:
  ```
  absolute rounded-full opacity-20 blur-3xl
  ```

### Component Headers
- Badge-style section headers with icons
- Standardized title and subtitle formatting
- Compact spacing (mb-4, mt-3, etc.)

### Card Elements
- Uniform card heights within sections
- Consistent internal padding (p-3)
- Standardized text heights (h-[4rem] for descriptions)
- Visible separators with gradient styling

## 3. Spacing Guidelines
- Section padding: py-6
- Container padding: p-4
- Card element spacing: gap-3
- Internal margins: mb-4, mt-3, etc.
- Reduce vertical spacing between sections

## 4. Typography Standards
- Headers: text-2xl md:text-3xl lg:text-4xl font-bold
- Subheaders: text-sm font-bold
- Description text: text-xs
- Button text: text-xs

## 5. Implementation Approach

1. **Audit Current Pages**
   - Review each page structure
   - Identify inconsistencies with the health/wellness page

2. **Component Refactoring**
   - Refactor each section following health/wellness patterns
   - Adapt container styles to theme colors

3. **Theme Adaptation**
   - Sport: Adapt to blue/energy theme
   - Beauty: Adapt to pink/purple theme
   - Hybrid: Adapt to amber/green theme
   - Pet: Adapt to blue/teal theme

4. **Content Optimization**
   - Standardize card sizes
   - Ensure consistent text lengths
   - Maintain visual hierarchy

5. **Final Review**
   - Check for layout consistency across breakpoints
   - Verify all hover states and interactions
   - Ensure theme-appropriate styling

## 6. Color Theme Options

### Sport Theme
- Primary: blue-600
- Secondary: cyan-500
- Background: from-blue-50 to-white
- Accent: amber-400
- Border: border-blue-200

### Beauty Theme
- Primary: pink-600
- Secondary: purple-500
- Background: from-pink-50 to-white
- Accent: violet-400
- Border: border-pink-200

### Hybrid Theme
- Primary: amber-600
- Secondary: green-500
- Background: from-amber-50 to-white
- Accent: emerald-400
- Border: border-amber-200

### Pet Theme
- Primary: teal-600
- Secondary: blue-500
- Background: from-teal-50 to-white
- Accent: orange-400
- Border: border-teal-200 