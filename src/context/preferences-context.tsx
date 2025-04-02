/**
 * Preferences Context
 * 
 * Provides global user preferences state management for the Twistly CBD store.
 * Handles theme preferences, product view mode, notification settings, etc.
 */

"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
  useCallback,
  useEffect
} from 'react'

// Product view mode - grid or list
export type ProductViewMode = 'grid' | 'list';

// Currency display preference
export type CurrencyPreference = 'USD' | 'EUR' | 'GBP';

// Notification preferences
export interface NotificationPreferences {
  orderUpdates: boolean;
  promotions: boolean;
  newsletter: boolean;
  productRestock: boolean;
}

// Define the preferences state interface
interface PreferencesState {
  theme: 'light' | 'dark' | 'system';
  productViewMode: ProductViewMode;
  currency: CurrencyPreference;
  notifications: NotificationPreferences;
  showRecentlyViewed: boolean;
  isLoading: boolean;
  error: Error | null;
}

// Define the preferences actions interface
interface PreferencesActions {
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setProductViewMode: (mode: ProductViewMode) => void;
  setCurrency: (currency: CurrencyPreference) => void;
  updateNotificationPreferences: (preferences: Partial<NotificationPreferences>) => void;
  toggleRecentlyViewed: () => void;
  resetPreferences: () => void;
}

// Combine state and actions for the full context value
interface PreferencesContextValue extends PreferencesState, PreferencesActions {}

// Default notification preferences
const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  orderUpdates: true,
  promotions: false,
  newsletter: false,
  productRestock: false,
}

// Default preferences
const DEFAULT_PREFERENCES: PreferencesState = {
  theme: 'system',
  productViewMode: 'grid',
  currency: 'USD',
  notifications: DEFAULT_NOTIFICATION_PREFERENCES,
  showRecentlyViewed: true,
  isLoading: false,
  error: null,
}

// Create the context with a default value
const PreferencesContext = createContext<PreferencesContextValue | undefined>(undefined)

// Provider props interface
interface PreferencesProviderProps {
  children: ReactNode;
}

/**
 * Preferences provider component that manages the user preferences state
 */
export function PreferencesProvider({ children }: PreferencesProviderProps) {
  // State definitions
  const [preferences, setPreferences] = useState<PreferencesState>(DEFAULT_PREFERENCES)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  // Load preferences from localStorage on initial render
  useEffect(() => {
    try {
      setIsLoading(true)
      const savedPreferences = localStorage.getItem('twistly-preferences')
      if (savedPreferences) {
        setPreferences(prev => ({
          ...prev,
          ...JSON.parse(savedPreferences)
        }))
      }
    } catch (err) {
      console.error('Failed to load preferences from localStorage:', err)
      setError(err instanceof Error ? err : new Error('Unknown error loading preferences'))
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('twistly-preferences', JSON.stringify({
        theme: preferences.theme,
        productViewMode: preferences.productViewMode,
        currency: preferences.currency,
        notifications: preferences.notifications,
        showRecentlyViewed: preferences.showRecentlyViewed,
      }))
    } catch (err) {
      console.error('Failed to save preferences to localStorage:', err)
    }
  }, [preferences])

  // Preferences actions implementation
  const setTheme = useCallback((theme: 'light' | 'dark' | 'system') => {
    setPreferences(prev => ({ ...prev, theme }))
  }, [])

  const setProductViewMode = useCallback((productViewMode: ProductViewMode) => {
    setPreferences(prev => ({ ...prev, productViewMode }))
  }, [])

  const setCurrency = useCallback((currency: CurrencyPreference) => {
    setPreferences(prev => ({ ...prev, currency }))
  }, [])

  const updateNotificationPreferences = useCallback((updates: Partial<NotificationPreferences>) => {
    setPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        ...updates,
      }
    }))
  }, [])

  const toggleRecentlyViewed = useCallback(() => {
    setPreferences(prev => ({
      ...prev,
      showRecentlyViewed: !prev.showRecentlyViewed
    }))
  }, [])

  const resetPreferences = useCallback(() => {
    setPreferences(DEFAULT_PREFERENCES)
  }, [])

  // Use memoization to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      // State
      ...preferences,
      isLoading,
      error,
      // Actions
      setTheme,
      setProductViewMode,
      setCurrency,
      updateNotificationPreferences,
      toggleRecentlyViewed,
      resetPreferences,
    }),
    [
      preferences, isLoading, error,
      setTheme, setProductViewMode, setCurrency,
      updateNotificationPreferences, toggleRecentlyViewed, resetPreferences
    ]
  )

  return (
    <PreferencesContext.Provider value={contextValue}>
      {children}
    </PreferencesContext.Provider>
  )
}

/**
 * Custom hook to use the preferences context
 * 
 * @example
 * ```tsx
 * const { theme, setTheme } = usePreferences();
 * ```
 */
export function usePreferences(): PreferencesContextValue {
  const context = useContext(PreferencesContext)
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider')
  }
  return context
}

// Selector hooks for performance optimization
export function useTheme(): ['light' | 'dark' | 'system', (theme: 'light' | 'dark' | 'system') => void] {
  const context = useContext(PreferencesContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a PreferencesProvider')
  }
  return [context.theme, context.setTheme]
}

export function useProductViewMode(): [ProductViewMode, (mode: ProductViewMode) => void] {
  const context = useContext(PreferencesContext)
  if (context === undefined) {
    throw new Error('useProductViewMode must be used within a PreferencesProvider')
  }
  return [context.productViewMode, context.setProductViewMode]
}

export function useCurrency(): [CurrencyPreference, (currency: CurrencyPreference) => void] {
  const context = useContext(PreferencesContext)
  if (context === undefined) {
    throw new Error('useCurrency must be used within a PreferencesProvider')
  }
  return [context.currency, context.setCurrency]
} 