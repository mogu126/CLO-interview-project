import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProvider } from '../test/test-utils';
import FilterSection from './FilterSection';

describe('FilterSection', () => {
  const mockState = {
    content: {
      selectedPricing: [],
      filteredItems: [],
      allItems: [],
      currentPage: 1,
      totalItems: 0,
      isLoading: false,
      searchKeyword: '',
      sortBy: 'title',
      priceRange: { min: 0, max: 999 },
    },
  };

  it('renders pricing options', () => {
    renderWithProvider(<FilterSection />, { initialState: mockState });
    expect(screen.getByText('Paid')).toBeInTheDocument();
    expect(screen.getByText('Free')).toBeInTheDocument();
    expect(screen.getByText('View Only')).toBeInTheDocument();
  });

  it('renders reset button', () => {
    renderWithProvider(<FilterSection />, { initialState: mockState });
    expect(screen.getByText('RESET')).toBeInTheDocument();
  });

  it('shows selected pricing options as checked', () => {
    const stateWithSelection = {
      ...mockState,
      content: { ...mockState.content, selectedPricing: [0, 1] },
    };
    renderWithProvider(<FilterSection />, { initialState: stateWithSelection });
    
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).toBeChecked(); // Paid
    expect(checkboxes[1]).toBeChecked(); // Free
    expect(checkboxes[2]).not.toBeChecked(); // View Only
  });

  it('handles pricing option selection', () => {
    const { store } = renderWithProvider(<FilterSection />, { initialState: mockState });
    
    const paidCheckbox = screen.getByRole('checkbox', { name: /paid/i });
    fireEvent.click(paidCheckbox);
    
    const state = store.getState();
    expect(state.content.selectedPricing).toContain(0);
  });

  it('handles reset button click', () => {
    const stateWithFilters = {
      ...mockState,
      content: { 
        ...mockState.content, 
        selectedPricing: [0, 1],
        searchKeyword: 'test'
      },
    };
    const { store } = renderWithProvider(<FilterSection />, { initialState: stateWithFilters });
    
    const resetButton = screen.getByText('RESET');
    fireEvent.click(resetButton);
    
    const state = store.getState();
    expect(state.content.selectedPricing).toEqual([]);
    expect(state.content.searchKeyword).toBe('');
  });

  it('disables pricing slider when Free or View Only is selected', () => {
    const stateWithFree = {
      ...mockState,
      content: { ...mockState.content, selectedPricing: [1] },
    };
    renderWithProvider(<FilterSection />, { initialState: stateWithFree });
    
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0]).toBeDisabled();
    expect(sliders[1]).toBeDisabled();
  });

  it('enables pricing slider when only Paid is selected', () => {
    const stateWithPaid = {
      ...mockState,
      content: { ...mockState.content, selectedPricing: [0] },
    };
    renderWithProvider(<FilterSection />, { initialState: stateWithPaid });
    
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0]).not.toBeDisabled();
    expect(sliders[1]).not.toBeDisabled();
  });

  it('resets price range when Free or View Only is selected', () => {
    const { store } = renderWithProvider(<FilterSection />, { initialState: mockState });
    
    const freeCheckbox = screen.getByRole('checkbox', { name: /free/i });
    fireEvent.click(freeCheckbox);
    
    const state = store.getState();
    expect(state.content.priceRange).toEqual({ min: 0, max: 999 });
  });
});