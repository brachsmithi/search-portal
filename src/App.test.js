import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const header = screen.getByText(/Program Search Portal/i);
  expect(header).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Title Search")).toBeInTheDocument();
  expect(screen.getByText("Search results will appear here")).toBeInTheDocument();
});
