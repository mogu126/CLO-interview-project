import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import SortDropdown from './SortDropdown';
import { renderWithProvider } from '../test/test-utils';

describe('SortDropdown', () => {
  it('renders with default sort option', () => {
    renderWithProvider(<SortDropdown />);
    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByText('Item Name')).toBeInTheDocument();
  });

  it('opens dropdown when clicked', () => {
    renderWithProvider(<SortDropdown />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(screen.getByText('Higher Price')).toBeInTheDocument();
    expect(screen.getByText('Lower Price')).toBeInTheDocument();
  });

  it('changes sort option when item is clicked', () => {
    const { store } = renderWithProvider(<SortDropdown />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    const higherPriceOption = screen.getByText('Higher Price');
    fireEvent.click(higherPriceOption);
    
    expect(store.getState().content.sortBy).toBe('price-high');
  });
});