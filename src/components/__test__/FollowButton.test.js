import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import FollowButton from '../follow/FollowButton';
import { setupServer } from 'msw/node';
import { handlers } from '../../mocks/Handlers';
import '@testing-library/jest-dom';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('FollowButton', () => {
  test('renders FollowButton component and shows "Follow" initially', async () => {
    render(
      <Router>
        <FollowButton profileId={1} username="testuser" />
      </Router>
    );

    expect(await screen.findByText('Follow')).toBeInTheDocument();
  });

  test('renders "Unfollow" if already following', async () => {
    server.use(
      rest.get('https://api-backend-project-3eba949b1615.herokuapp.com/profiles/:username/is_following/', (req, res, ctx) => {
        return res(ctx.json({ is_following: true }));
      })
    );

    render(
      <Router>
        <FollowButton profileId={1} username="testuser" />
      </Router>
    );

    expect(await screen.findByText('Unfollow')).toBeInTheDocument();
  });

  test('toggles follow/unfollow state on button click', async () => {
    render(
      <Router>
        <FollowButton profileId={1} username="testuser" />
      </Router>
    );

    const followButton = await screen.findByText('Follow');
    expect(followButton).toBeInTheDocument();

    fireEvent.click(followButton);

    await waitFor(() => expect(screen.getByText('Unfollow')).toBeInTheDocument());

    const unfollowButton = screen.getByText('Unfollow');
    fireEvent.click(unfollowButton);

    await waitFor(() => expect(screen.getByText('Follow')).toBeInTheDocument());
  });
});