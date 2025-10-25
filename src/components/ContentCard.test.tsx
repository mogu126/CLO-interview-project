import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ContentCard from './ContentCard';
import type { ContentItem, PricingOption } from '../types';

const mockItem: ContentItem = {
  id: '1',
  title: 'Test Item',
  creator: 'Test Creator',
  imagePath: 'test-image.jpg',
  pricingOption: 0 as PricingOption,
  price: 29.99,
};

describe('ContentCard', () => {
  it('renders item information correctly', () => {
    render(<ContentCard item={mockItem} />);
    
    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('by Test Creator')).toBeInTheDocument();
    expect(screen.getByAltText('Test Item')).toBeInTheDocument();
  });

  it('displays correct pricing for paid items', () => {
    render(<ContentCard item={mockItem} />);
    expect(screen.getByText('$29.99')).toBeInTheDocument();
  });

  it('displays FREE for free items', () => {
    const freeItem = { ...mockItem, pricingOption: 1 as PricingOption };
    render(<ContentCard item={freeItem} />);
    expect(screen.getByText('FREE')).toBeInTheDocument();
  });

  it('displays View Only for view-only items', () => {
    const viewOnlyItem = { ...mockItem, pricingOption: 2 as PricingOption };
    render(<ContentCard item={viewOnlyItem} />);
    expect(screen.getByText('View Only')).toBeInTheDocument();
  });
});