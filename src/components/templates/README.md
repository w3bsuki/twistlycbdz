# Component Templates

This directory contains standardized templates for creating various code artifacts in the Twistly CBD project. These templates ensure consistency across the codebase and follow best practices for React, TypeScript, and performance optimization.

## Available Templates

### Component Template (`component.template.tsx`)

Use this template when creating new UI components. It demonstrates:
- Proper TypeScript prop interface definition with JSDoc comments
- Component structure with default props
- CSS class composition with the `cn` utility
- Variant handling for different component styles

### Context Template (`context.template.tsx`)

Use this template when creating new React Context providers. It demonstrates:
- Proper context creation with TypeScript typing
- State and actions separation
- Error handling patterns
- Performance optimization with `useMemo` and `useCallback`
- Custom hooks for consuming the context

### Hook Template (`hook.template.ts`)

Use this template when creating custom React hooks. It demonstrates:
- Proper TypeScript interface definitions for params and return types
- State management patterns
- Async operation handling with loading and error states
- Debouncing and cleanup
- Memoization for performance

### Index Template (`index.template.ts`)

Use this template for creating index files in component directories. It demonstrates:
- Clean export patterns
- Type exports
- Compound component exports

## Usage Guidelines

1. **Copy the appropriate template** for your new code artifact
2. **Rename the file** according to our naming conventions:
   - Components: `kebab-case.tsx`
   - Hooks: `use-kebab-case.ts`
   - Contexts: `kebab-case-context.tsx`
3. **Rename the component/hook/context** in the file to match your new artifact
4. **Implement your specific logic** while following the patterns in the template
5. **Document your component** with JSDoc comments
6. **Create appropriate tests** following our testing patterns

## Best Practices

- Always use TypeScript interfaces for component props
- Provide default values for optional props
- Use proper error handling for async operations
- Apply performance optimizations like memoization when appropriate
- Follow accessibility best practices
- Document your component with usage examples

## Example

```tsx
// Button.tsx (created from component.template.tsx)
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

export interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick?: () => void
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={cn(
        'button-base',
        {
          'button-primary': variant === 'primary',
          'button-secondary': variant === 'secondary',
          'button-outline': variant === 'outline',
          'button-sm': size === 'sm',
          'button-md': size === 'md',
          'button-lg': size === 'lg',
        }
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
``` 