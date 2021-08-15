import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders proper header', () => {
  render(<App />);
  const heading = screen.getByText(/Vaccine stats/i);
  expect(heading).toBeInTheDocument();
});
