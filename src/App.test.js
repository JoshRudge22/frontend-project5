import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />); // Render the App component

  const linkElement = screen.getByText(/learn react/i); // Search for the text
  expect(linkElement).toBeInTheDocument(); // Assert that the text is present in the document
});
