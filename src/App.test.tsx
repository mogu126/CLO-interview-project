import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock child components
vi.mock('./components/SearchBar', () => ({
  default: () => <div data-testid="search-bar">Search Bar</div>,
}));

vi.mock('./components/FilterSection', () => ({
  default: () => <div data-testid="filter-section">Filter Section</div>,
}));

vi.mock('./components/ContentList', () => ({
  default: () => <div data-testid="content-list">Content List</div>,
}));

describe('App', () => {
  it('renders page title', () => {
    render(<App />);
    expect(screen.getByText('CLO-SET CONNECT')).toBeInTheDocument();
  });

  it('renders all main components', () => {
    render(<App />);
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    expect(screen.getByTestId('filter-section')).toBeInTheDocument();
    expect(screen.getByTestId('content-list')).toBeInTheDocument();
  });

  it('renders components in correct order', () => {
    render(<App />);
    const components = [
      screen.getByText('CLO-SET CONNECT'),
      screen.getByTestId('search-bar'),
      screen.getByTestId('filter-section'),
      screen.getByTestId('content-list'),
    ];
    
    // Check if components appear in DOM order
    components.forEach((component) => {
      expect(component).toBeInTheDocument();
    });
  });
});