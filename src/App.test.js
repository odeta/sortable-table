import React from 'react'
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders search input', () => {
  render(<App />);
  const inputEl = screen.getByPlaceholderText(/search here/i);
  expect(inputEl).toBeInTheDocument();
});
