/**
 * Local Storage Hook
 * 
 * A custom hook that provides a state-like interface for localStorage values.
 * Handles serialization/deserialization and provides a consistent API.
 */

import { useState, useEffect, useCallback } from 'react'

/**
 * useLocalStorage - A hook to persist state in localStorage
 * 
 * @param key The localStorage key to use
 * @param initialValue The default value to use if no value exists in localStorage
 * @returns A stateful value and a function to update it, similar to useState
 * 
 * @example
 * ```tsx
 * // Using with a primitive value
 * const [theme, setTheme] = useLocalStorage('theme', 'light')
 * 
 * // Using with an object
 * const [user, setUser] = useLocalStorage('user', { name: '', email: '' })
 * 
 * // Usage is identical to useState
 * setTheme('dark')
 * setUser(prev => ({ ...prev, name: 'John' }))
 * ```
 */
export function useLocalStorage<T>(
  key: string, 
  initialValue: T
): [T, (value: T | ((prevValue: T) => T)) => void] {
  // Get from localStorage then parse stored json or return initialValue
  const readValue = useCallback((): T => {
    // Prevent build error "window is undefined" but keep working
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  }, [initialValue, key])

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(readValue)

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage
  const setValue = useCallback((value: T | ((prevValue: T) => T)) => {
    // Prevent build error "window is undefined" but keep working
    if (typeof window === 'undefined') {
      console.warn(
        `Tried setting localStorage key "${key}" even though environment is not a client`
      )
      return
    }

    try {
      // Allow value to be a function so we have the same API as useState
      const newValue = value instanceof Function ? value(storedValue) : value

      // Save to localStorage
      window.localStorage.setItem(key, JSON.stringify(newValue))

      // Save state
      setStoredValue(newValue)
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  // Listen for changes to this localStorage key in other windows/tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        setStoredValue(JSON.parse(e.newValue))
      }
    }

    // Add listener for window storage events
    window.addEventListener('storage', handleStorageChange)
    
    // Clean up
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [key])

  return [storedValue, setValue]
} 