/**
 * Hook Template
 * 
 * This serves as a standard template for creating custom React hooks
 * following best practices for TypeScript, error handling, and performance.
 */

import { useState, useCallback, useEffect, useMemo } from 'react'

// Define hook parameters interface
interface UseTemplateHookParams {
  initialValue?: string
  delay?: number
  enabled?: boolean
}

// Define hook return type
interface UseTemplateHookResult {
  value: string
  data: any[] | null
  isLoading: boolean
  error: Error | null
  setValue: (newValue: string) => void
  refetch: () => Promise<void>
}

/**
 * useTemplateHook - A template for creating custom hooks
 * 
 * @example
 * ```tsx
 * const { value, isLoading, error, setValue } = useTemplateHook({
 *   initialValue: 'initial', 
 *   delay: 500
 * });
 * ```
 */
export function useTemplateHook({
  initialValue = '',
  delay = 300,
  enabled = true,
}: UseTemplateHookParams = {}): UseTemplateHookResult {
  // State definitions
  const [value, setValue] = useState<string>(initialValue)
  const [data, setData] = useState<any[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  // Memoize complex objects or computations
  const processedValue = useMemo(() => {
    return value.trim().toLowerCase()
  }, [value])

  // Data fetching implementation
  const fetchData = useCallback(async () => {
    if (!enabled || !processedValue) return
    
    try {
      setIsLoading(true)
      setError(null)
      
      // Simulated API call - replace with actual implementation
      const result = await new Promise<any[]>((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.9) {
            reject(new Error('Random failure for demonstration'))
          } else {
            resolve([{ id: 1, name: `Result for: ${processedValue}` }])
          }
        }, delay)
      })
      
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'))
      setData(null)
    } finally {
      setIsLoading(false)
    }
  }, [processedValue, delay, enabled])

  // Effect to trigger data fetching when dependencies change
  useEffect(() => {
    // Debounce the API call
    const timeoutId = setTimeout(() => {
      if (enabled && processedValue) {
        fetchData()
      }
    }, delay)
    
    // Cleanup timeout on dependency change
    return () => clearTimeout(timeoutId)
  }, [fetchData, processedValue, delay, enabled])

  // Return the hook's API
  return {
    value,
    data,
    isLoading,
    error,
    setValue,
    refetch: fetchData,
  }
} 