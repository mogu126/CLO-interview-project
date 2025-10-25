
export type PricingOption = 0 | 1 | 2; // 0: PAID, 1: FREE, 2: VIEW_ONLY

export interface ContentItem {
  id: string;
  imagePath: string; 
  creator: string; 
  title: string; 
  pricingOption: PricingOption; 
  price?: number; 
  createdAt?: string; 
}


export const PRICING_LABELS = {
  0: 'PAID',
  1: 'FREE', 
  2: 'VIEW_ONLY'
} as const;

// 排序选项
export type SortOption = 'name' | 'price-high' | 'price-low';

export interface FilterState {
  selectedPricing: PricingOption[]; 
  searchKeyword: string; 
  currentPage: number; 
  totalItems: number; 
  isLoading: boolean;
  sortBy: SortOption;
}