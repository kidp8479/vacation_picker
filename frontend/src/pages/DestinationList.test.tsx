import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DestinationList from './DestinationList';

describe('DestinationList', () => {
  it('renders the page heading', () => {
    render(<DestinationList />);
    expect(
      screen.getByRole('heading', { name: /destination list/i }),
    ).toBeInTheDocument();
  });
});
