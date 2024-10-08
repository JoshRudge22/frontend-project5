import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import NavBar from "../NavBar";
import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { handlers } from '../../mocks/handlers';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const MockCurrentUserProvider = ({ children, currentUser }) => (
  <CurrentUserProvider value={currentUser}>{children}</CurrentUserProvider>
);

test("renders NavBar", () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );

  const signInLink = screen.getByRole("link", { name: "Sign in" });
  expect(signInLink).toBeInTheDocument();
});

test("renders link to the user profile for a logged in user", async () => {
  const mockUser = { username: "testuser", id: 1 }; // Mock user object
  render(
    <Router>
      <MockCurrentUserProvider currentUser={mockUser}>
        <NavBar />
      </MockCurrentUserProvider>
    </Router>
  );

  const profileAvatar = await screen.findByText("Profile");
  expect(profileAvatar).toBeInTheDocument();
});

test("renders Sign in and Sign up buttons again on log out", async () => {
  const mockUser = { username: "testuser", id: 1 };
  render(
    <Router>
      <MockCurrentUserProvider currentUser={mockUser}>
        <NavBar />
      </MockCurrentUserProvider>
    </Router>
  );

  const signOutLink = await screen.findByRole("link", { name: "Sign out" });
  fireEvent.click(signOutLink);

  const signInLink = await screen.findByRole("link", { name: "Sign in" });
  const signUpLink = await screen.findByRole("link", { name: "Sign up" });

  expect(signInLink).toBeInTheDocument();
  expect(signUpLink).toBeInTheDocument();
});

// Add additional tests for error handling, loading states, etc.
