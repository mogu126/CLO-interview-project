import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProvider } from '../test/test-utils';
import ContentList from './ContentList';

// Mock InfiniteScroll component
vi.mock('react-infinite-scroll-component', () => ({
  default: ({ children, loader, endMessage }: any) => (
    <div data-testid="infinite-scroll">
      {children}
      {loader}
      {endMessage}
    </div>
  ),
}));

// Mock child components
vi.mock('./ContentCard', () => ({
  default: ({ item }: any) => <div data-testid="content-card">{item.title}</div>,
}));

vi.mock('./SortDropdown', () => ({
  default: () => <div data-testid="sort-dropdown">Sort</div>,
}));

vi.mock('./SkeletonCard', () => ({
  default: () => <div data-testid="skeleton-card">Loading...</div>,
}));

describe('ContentList', () => {
  const mockState = {
    content: {
      filteredItems: [],
      allItems: [],
      currentPage: 1,
      totalItems: 0,
      isLoading: false,
      searchKeyword: '',
      selectedPricing: [],
      sortBy: 'title',
    },
  };

  it('renders sort dropdown', () => {
    renderWithProvider(<ContentList />, { initialState: mockState });
    expect(screen.getByTestId('sort-dropdown')).toBeInTheDocument();
  });

  it('shows skeleton cards when loading', () => {
    const loadingState = {
      ...mockState,
      content: { ...mockState.content, isLoading: true },
    };
    renderWithProvider(<ContentList />, { initialState: loadingState });
    expect(screen.getAllByTestId('skeleton-card')).toHaveLength(12);
  });

  it('shows empty grid when no filtered items', () => {
    const emptyState = {
      ...mockState,
      content: { 
        ...mockState.content, 
        allItems: [{ id: '1', title: 'Item', creator: 'Test', imagePath: 'test.jpg', pricingOption: 0 }], 
        filteredItems: [], 
        isLoading: false 
      },
    };
    renderWithProvider(<ContentList />, { initialState: emptyState });
    expect(screen.getByTestId('infinite-scroll')).toBeInTheDocument();
    expect(screen.queryByTestId('content-card')).not.toBeInTheDocument();
  });

  it('renders content cards when items exist', () => {
    const withItemsState = {
      ...mockState,
      content: {
        ...mockState.content,
        filteredItems: [{ id: 1, title: 'Test Item' }],
        allItems: [{ id: 1, title: 'Test Item' }],
      },
    };
    renderWithProvider(<ContentList />, { initialState: withItemsState });
    expect(screen.getByTestId('content-card')).toBeInTheDocument();
  });
});