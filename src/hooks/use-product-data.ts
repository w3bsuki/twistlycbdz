/**
 * Product Data Hook
 * 
 * Custom hook for fetching and managing product data with support for
 * filtering, sorting, and caching using React Query.
 */

import { useState, useCallback, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Product } from '@/lib/products'

// Filter options for products
export type ProductFilter = {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  search?: string;
  inStock?: boolean;
}

// Sort options for products
export type ProductSortOption = 'newest' | 'price-asc' | 'price-desc' | 'best-selling' | 'featured';

interface UseProductDataParams {
  initialFilters?: ProductFilter;
  initialSort?: ProductSortOption;
  limit?: number;
  category?: string;
  featured?: boolean;
}

// Hook return type
interface UseProductDataResult {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
  filters: ProductFilter;
  sortOption: ProductSortOption;
  updateFilters: (newFilters: Partial<ProductFilter>) => void;
  setSortOption: (sort: ProductSortOption) => void;
  resetFilters: () => void;
  refetch: () => Promise<void>;
  hasMore: boolean;
  loadMore: () => void;
}

/**
 * Fetches products from the API with the given parameters
 */
const fetchProducts = async (
  page: number,
  limit: number,
  filters: ProductFilter,
  sortOption: ProductSortOption,
  featured: boolean
): Promise<{ products: Product[]; hasMore: boolean }> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sort: sortOption,
    ...(filters.category && { category: filters.category }),
    ...(filters.minPrice && { minPrice: filters.minPrice.toString() }),
    ...(filters.maxPrice && { maxPrice: filters.maxPrice.toString() }),
    ...(filters.search && { search: filters.search }),
    ...(filters.inStock !== undefined && { inStock: filters.inStock.toString() }),
    ...(featured && { featured: 'true' }),
  });

  const response = await fetch(`/api/products?${params}`);
  if (!response.ok) {
    throw new Error(`Error fetching products: ${response.statusText}`);
  }
  return response.json();
};

/**
 * useProductData - Custom hook for fetching and managing product data
 * 
 * @example
 * ```tsx
 * const { 
 *   products, 
 *   isLoading, 
 *   filters, 
 *   updateFilters 
 * } = useProductData({
 *   category: 'wellness',
 *   initialSort: 'price-asc'
 * });
 * ```
 */
export function useProductData({
  initialFilters = {},
  initialSort = 'newest',
  limit = 12,
  category,
  featured = false,
}: UseProductDataParams = {}): UseProductDataResult {
  // Merge category from params into initial filters
  const mergedInitialFilters = useMemo(() => ({
    ...initialFilters,
    ...(category ? { category } : {})
  }), [initialFilters, category]);

  // State definitions
  const [filters, setFilters] = useState<ProductFilter>(mergedInitialFilters);
  const [sortOption, setSortOption] = useState<ProductSortOption>(initialSort);
  const [page, setPage] = useState<number>(1);

  // React Query hook for fetching products
  const {
    data,
    isLoading,
    error,
    refetch: queryRefetch
  } = useQuery({
    queryKey: ['products', page, limit, filters, sortOption, featured],
    queryFn: () => fetchProducts(page, limit, filters, sortOption, featured),
    keepPreviousData: true,
  });

  // Update filters while preserving existing ones
  const updateFilters = useCallback((newFilters: Partial<ProductFilter>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPage(1); // Reset pagination when filters change
  }, []);

  // Reset filters to initial state
  const resetFilters = useCallback(() => {
    setFilters(mergedInitialFilters);
    setPage(1);
  }, [mergedInitialFilters]);

  // Load more products
  const loadMore = useCallback(() => {
    if (data?.hasMore && !isLoading) {
      setPage(prev => prev + 1);
    }
  }, [data?.hasMore, isLoading]);

  // Refetch wrapper that returns a promise
  const refetch = async () => {
    await queryRefetch();
  };

  return {
    products: data?.products ?? [],
    isLoading,
    error: error as Error | null,
    filters,
    sortOption,
    updateFilters,
    setSortOption,
    resetFilters,
    refetch,
    hasMore: data?.hasMore ?? false,
    loadMore,
  };
} 