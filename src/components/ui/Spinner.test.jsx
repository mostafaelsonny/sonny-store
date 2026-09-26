import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Spinner from './Spinner';

describe('Spinner Component', () => {
  it('renders with default message', () => {
    render(<Spinner />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders with custom message', () => {
    render(<Spinner message="Custom Loading" />);
    expect(screen.getByText('Custom Loading')).toBeInTheDocument();
  });

  it('applies fullScreen classes when fullScreen prop is true', () => {
    const { container } = render(<Spinner fullScreen={true} />);
    const spinnerDiv = container.firstChild;
    expect(spinnerDiv).toHaveClass('min-h-[70vh]');
  });
});
