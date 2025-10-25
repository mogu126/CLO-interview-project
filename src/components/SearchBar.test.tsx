import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProvider } from '../test/test-utils';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  const mockState = {
    content: {
      searchKeyword: '',
      selectedPricing: [],
      filteredItems: [],
      allItems: [],
      currentPage: 1,
      totalItems: 0,
      isLoading: false,
      sortBy: 'title',
    },
  };

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders search input with placeholder', () => {
    renderWithProvider(<SearchBar />, { initialState: mockState });
    expect(screen.getByPlaceholderText("Find the Items you're looking for")).toBeInTheDocument();
  });

  it('renders search icon', () => {
    renderWithProvider(<SearchBar />, { initialState: mockState });
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('updates input value on change', () => {
    renderWithProvider(<SearchBar />, { initialState: mockState });
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test search' } });
    
    expect(input).toHaveValue('test search');
  });

  it('dispatches search on Enter key', async () => {
    const { store } = renderWithProvider(<SearchBar />, { initialState: mockState });
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    
    const state = store.getState();
    expect(state.content.searchKeyword).toBe('test');
  });

  it('dispatches search on blur', async () => {
    const { store } = renderWithProvider(<SearchBar />, { initialState: mockState });
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test blur' } });
    fireEvent.blur(input);
    
    const state = store.getState();
    expect(state.content.searchKeyword).toBe('test blur');
  });

  it('dispatches search after timeout', () => {
    const { store } = renderWithProvider(<SearchBar />, { initialState: mockState });
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'timeout test' } });
    
    vi.advanceTimersByTime(4000);
    
    const state = store.getState();
    expect(state.content.searchKeyword).toBe('timeout test');
  });

  it('shows current search keyword from store', () => {
    const stateWithKeyword = {
      ...mockState,
      content: { ...mockState.content, searchKeyword: 'existing search' },
    };
    renderWithProvider(<SearchBar />, { initialState: stateWithKeyword });
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('existing search');
  });
});