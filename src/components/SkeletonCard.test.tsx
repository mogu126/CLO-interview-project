import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import SkeletonCard from './SkeletonCard';

describe('SkeletonCard', () => {
  it('renders skeleton container', () => {
    render(<SkeletonCard />);
    const container = document.querySelector('div');
    expect(container).toBeInTheDocument();
  });

  it('renders skeleton image placeholder', () => {
    const { container } = render(<SkeletonCard />);
    const skeletonImage = container.querySelector('div > div:first-child');
    expect(skeletonImage).not.toBeNull();
  });

  it('renders skeleton content lines', () => {
    const { container } = render(<SkeletonCard />);
    const skeletonContainer = container.querySelector('div');
    const skeletonContent = skeletonContainer?.querySelector('div:last-child');
    const skeletonLines = skeletonContent?.querySelectorAll('div');
    expect(skeletonLines).toHaveLength(3);
  });

  it('applies pulse animation styles', () => {
    const { container } = render(<SkeletonCard />);
    const skeletonImage = container.querySelector('div > div:first-child');
    if (skeletonImage) {
      expect(skeletonImage).toHaveStyle('animation: pulse 1.5s infinite');
    } else {
      expect(skeletonImage).not.toBeNull();
    }
  });
});