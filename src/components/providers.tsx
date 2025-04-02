/**
 * Application Providers
 * 
 * This component wraps the application with all necessary context providers:
 * - ThemeProvider: Handles light/dark mode theming
 * - PreferencesProvider: Manages user preferences
 * - CartProvider: Manages the shopping cart state
 * - QueryClientProvider: Manages React Query state and caching
 * - Toaster: Provides toast notifications
 * 
 * Additional providers should be added here as the application grows.
 */

"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { CartProvider } from "@/context/cart-context";
import { PreferencesProvider } from "@/context/preferences-context";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

interface ProvidersProps {
  /** The application UI to be wrapped with providers */
  children: ReactNode;
}

/**
 * Providers component that wraps the application with context providers
 * 
 * @example
 * ```tsx
 * <Providers>
 *   <App />
 * </Providers>
 * ```
 */
export function Providers({ children }: ProvidersProps) {
  // Create a client
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider 
        attribute="class" 
        defaultTheme="light" 
        forcedTheme="light"
        enableSystem={false}
        disableTransitionOnChange
      >
        <PreferencesProvider>
          <CartProvider>
            {children}
            <Toaster />
          </CartProvider>
        </PreferencesProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
} 