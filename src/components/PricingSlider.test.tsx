import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProvider } from '../test/test-utils';
import PricingSlider from './PricingSlider';

describe('PricingSlider', () => {
  const mockState = {
    content: {
      priceRange: { min: 0, max: 999 },
      selectedPricing: [],
      filteredItems: [],
      allItems: [],
      currentPage: 1,
      totalItems: 0,
      isLoading: false,
      searchKeyword: '',
      sortBy: 'title',
    },
  };

  it('renders price labels', () => {
    renderWithProvider(<PricingSlider disabled={false} />, { initialState: mockState });
    expect(screen.getByText('$0')).toBeInTheDocument();
    expect(screen.getByText('$999')).toBeInTheDocument();
  });

  it('renders two range sliders', () => {
    renderWithProvider(<PricingSlider disabled={false} />, { initialState: mockState });
    const sliders = screen.getAllByRole('slider');
    expect(sliders).toHaveLength(2);
  });

  it('disables sliders when disabled prop is true', () => {
    renderWithProvider(<PricingSlider disabled={true} />, { initialState: mockState });
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0]).toBeDisabled();
    expect(sliders[1]).toBeDisabled();
  });

  it('enables sliders when disabled prop is false', () => {
    renderWithProvider(<PricingSlider disabled={false} />, { initialState: mockState });
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0]).not.toBeDisabled();
    expect(sliders[1]).not.toBeDisabled();
  });

  it('updates price range when slider values change', () => {
    const { store } = renderWithProvider(<PricingSlider disabled={false} />, { initialState: mockState });
    const sliders = screen.getAllByRole('slider');
    
    fireEvent.change(sliders[0], { target: { value: '100' } });
    
    const state = store.getState();
    expect(state.content.priceRange.min).toBe(100);
  });

  it('displays current price range values', () => {
    const stateWithRange = {
      ...mockState,
      content: { ...mockState.content, priceRange: { min: 50, max: 500 } },
    };
    renderWithProvider(<PricingSlider disabled={false} />, { initialState: stateWithRange });
    expect(screen.getByText('$50')).toBeInTheDocument();
    expect(screen.getByText('$500')).toBeInTheDocument();
  });
});