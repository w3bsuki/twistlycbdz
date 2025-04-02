/**
 * Debounce Hook
 * 
 * A custom hook that debounces a value to prevent excessive re-renders
 * and API calls. Useful for search inputs and other frequently changing values.
 */

import { useState, useEffect } from 'react'

/**
 * useDebounce - Delays updating a value until the specified delay has passed.
 * 
 * @param value The value to debounce
 * @param delay The delay in milliseconds
 * @returns The debounced value
 * 
 * @example
 * ```tsx
 * const [searchTerm, setSearchTerm] = useState('')
 * const debouncedSearchTerm = useDebounce(searchTerm, 500)
 * 
 * // Only fetch when debouncedSearchTerm changes, not on every keystroke
 * useEffect(() => {
 *   if (debouncedSearchTerm) {
 *     fetchSearchResults(debouncedSearchTerm)
 *   }
 * }, [debouncedSearchTerm])
 * ```
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  // State to hold the debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Update the debounced value after the specified delay
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Clean up the timeout if the value changes before the delay has passed
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
} 