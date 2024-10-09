// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { render, screen } from '@testing-library/react';
import YourComponent from './YourComponent'; // Replace with your actual component

// Define your handlers for the mocked API
const handlers = [
  rest.get('/api/your-endpoint', (req, res, ctx) => {
    return res(ctx.json({ message: 'Hello World' }));
  }),
  // You can add more handlers for different endpoints or error cases
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders greeting from API when data is fetched', async () => {
  render(<YourComponent />); // Render your component

  const greeting = await screen.findByText(/hello world/i); // Adjust based on your component's expected output
  expect(greeting).toBeInTheDocument(); // Assert that it’s in the document
});

test('renders error message when API call fails', async () => {
  server.use(
    rest.get('/api/your-endpoint', (req, res, ctx) => {
      return res(ctx.status(500), ctx.json({ error: 'Internal Server Error' }));
    })
  );

  render(<YourComponent />);

  const errorMessage = await screen.findByText(/error/i); // Adjust based on your component's expected output
  expect(errorMessage).toBeInTheDocument();
});
