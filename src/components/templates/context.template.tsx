/**
 * Context Template
 * 
 * This serves as a standard template for creating React Context providers
 * following best practices for TypeScript, error handling, and performance.
 */

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
  useCallback
} from 'react'

// Define the context state interface
interface ContextState {
  value: string
  data: any[]
  isLoading: boolean
  error: Error | null
}

// Define the context actions interface
interface ContextActions {
  setValue: (newValue: string) => void
  fetchData: () => Promise<void>
  clearError: () => void
}

// Combine state and actions for the full context value
interface ContextTemplateValue extends ContextState, ContextActions {}

// Create the context with a default value
const ContextTemplate = createContext<ContextTemplateValue | undefined>(undefined)

// Provider props interface
interface ContextTemplateProviderProps {
  children: ReactNode
  initialValue?: string
}

/**
 * Context provider component
 */
export function ContextTemplateProvider({
  children,
  initialValue = '',
}: ContextTemplateProviderProps) {
  // State definitions
  const [value, setValue] = useState<string>(initialValue)
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  // Action implementations
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      // Replace with actual data fetching logic
      const result = await new Promise<any[]>((resolve) => {
        setTimeout(() => resolve([{ id: 1, name: 'Item 1' }]), 1000)
      })
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'))
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Use memoization to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      // State
      value,
      data,
      isLoading,
      error,
      // Actions
      setValue,
      fetchData,
      clearError,
    }),
    [value, data, isLoading, error, fetchData, clearError]
  )

  return (
    <ContextTemplate.Provider value={contextValue}>
      {children}
    </ContextTemplate.Provider>
  )
}

/**
 * Custom hook to use the context
 */
export function useContextTemplate(): ContextTemplateValue {
  const context = useContext(ContextTemplate)
  if (context === undefined) {
    throw new Error('useContextTemplate must be used within a ContextTemplateProvider')
  }
  return context
}

// Optional: Export selectors for performance optimization
export function useContextTemplateValue(): string {
  const context = useContext(ContextTemplate)
  if (context === undefined) {
    throw new Error('useContextTemplateValue must be used within a ContextTemplateProvider')
  }
  return context.value
}

export function useContextTemplateIsLoading(): boolean {
  const context = useContext(ContextTemplate)
  if (context === undefined) {
    throw new Error('useContextTemplateIsLoading must be used within a ContextTemplateProvider')
  }
  return context.isLoading
} 