import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Todolist TS title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Todolist TS/i);
  expect(linkElement).toBeInTheDocument();
});
