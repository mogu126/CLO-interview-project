import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { fetchContentList } from '../../services/contentService';
import type { ContentItem, FilterState, PricingOption, SortOption } from '../../types';


const initialState: FilterState & { allItems: ContentItem[]; filteredItems: ContentItem[] } = {
  allItems: [], // all fetched data
  filteredItems: [], // data after applying filters and search
  selectedPricing: [], // selected pricing options
  searchKeyword: '', // search keyword
  currentPage: 1, // current page for pagination
  totalItems: 0, // total items count
  isLoading: false,
  sortBy: 'name' as SortOption, // default sort by name
};


export const fetchContents = createAsyncThunk(
  'content/fetchContents',
  async (page: number, { getState }) => {
    const state = getState() as { content: typeof initialState };
    const { allItems } = state.content;
    

    if (state.content.totalItems > 0 && allItems.length >= state.content.totalItems) {
      return { items: [], total: state.content.totalItems };
    }

    return fetchContentList(page);
  }
);


const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    // update list based on selected pricing options
    setSelectedPricing: (state, action: PayloadAction<PricingOption[]>) => {
      state.selectedPricing = action.payload;
      state.currentPage = 1; // reset current page
      const filtered = applyFilters(state.allItems, action.payload, state.searchKeyword);
      state.filteredItems = applySorting(filtered, state.sortBy);
    },
    // update list based on search keyword
    setSearchKeyword: (state, action: PayloadAction<string>) => {
    
      state.searchKeyword = action.payload;
      state.currentPage = 1; // reset current page
      const filtered = applyFilters(state.allItems, state.selectedPricing, action.payload);
      state.filteredItems = applySorting(filtered, state.sortBy);
    },
    // set sort option
    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
      const filtered = applyFilters(state.allItems, state.selectedPricing, state.searchKeyword);
      state.filteredItems = applySorting(filtered, action.payload);
    },
    // reset all filters
    resetFilters: (state) => {
      state.selectedPricing = [];
      state.searchKeyword = '';
      state.currentPage = 1;
      state.sortBy = 'name';
      state.filteredItems = applySorting(state.allItems, 'name');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContents.fulfilled, (state, action) => {
        if (action.payload.items.length > 0) {
          state.allItems = [...state.allItems, ...action.payload.items];
          state.currentPage += 1;
        }
        state.totalItems = action.payload.total;
        state.isLoading = false;
        // apply current filters and search
        const filtered = applyFilters(state.allItems, state.selectedPricing, state.searchKeyword);
        state.filteredItems = applySorting(filtered, state.sortBy);
      })
      .addCase(fetchContents.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

/**
 * local helper to apply filters and search
 * @param items original items
 * @param selectedPricing selected pricing options
 * @param keyword search keyword
 * @returns filtered items
 */
const applyFilters = (
  items: ContentItem[],
  selectedPricing: PricingOption[],
  keyword: string
): ContentItem[] => {
  let result = [...items];

  // 1. filter by pricing option
  if (selectedPricing.length > 0) {
   
    result = result.filter((item) => {
      const matches = selectedPricing.includes(item.pricingOption);
     
      return matches;
    });

  }

  // 2. keyword search
  if (keyword.trim()) {
    const lowerKeyword = keyword.toLowerCase().trim();
    result = result.filter(
      (item) =>
        item.creator.toLowerCase().includes(lowerKeyword) ||
        item.title.toLowerCase().includes(lowerKeyword)
    );
    
  }

  return result;
};

/**
 * Apply sorting to items
 */
const applySorting = (items: ContentItem[], sortBy: SortOption): ContentItem[] => {
  const result = [...items];
  
  switch (sortBy) {
    case 'name':
      return result.sort((a, b) => a.title.localeCompare(b.title));
    case 'price-high':
      return result.sort((a, b) => {
        // ViewOnly items always go to the end
        if (a.pricingOption === 2 && b.pricingOption !== 2) return 1;
        if (b.pricingOption === 2 && a.pricingOption !== 2) return -1;
        // Free items go to the end (but before ViewOnly)
        if (a.pricingOption === 1 && b.pricingOption !== 1) return 1;
        if (b.pricingOption === 1 && a.pricingOption !== 1) return -1;
        // Both same type, sort by price
        return (b.price || 0) - (a.price || 0);
      });
    case 'price-low':
      return result.sort((a, b) => {
        // ViewOnly items always go to the end
        if (a.pricingOption === 2 && b.pricingOption !== 2) return 1;
        if (b.pricingOption === 2 && a.pricingOption !== 2) return -1;
        // Free items go to the front (but ViewOnly still at end)
        if (a.pricingOption === 1 && b.pricingOption !== 1) return -1;
        if (b.pricingOption === 1 && a.pricingOption !== 1) return 1;
        // Both same type, sort by price
        return (a.price || 0) - (b.price || 0);
      });
    default:
      return result;
  }
};

export const { setSelectedPricing, setSearchKeyword, resetFilters, setSortBy } = contentSlice.actions;


export default contentSlice.reducer;