import { rest } from 'msw';

describe('FollowButton', () => {
  // Existing tests...

  test('displays error message when follow request fails', async () => {
    server.use(
      rest.post('https://api-backend-project-3eba949b1615.herokuapp.com/profiles/:username/follow/', (req, res, ctx) => {
        return res(ctx.status(500)); // Simulating server error
      })
    );

    render(
      <Router>
        <FollowButton profileId={1} username="testuser" />
      </Router>
    );

    const followButton = await screen.findByText('Follow');
    fireEvent.click(followButton);

    // Assert that an error message appears
    expect(await screen.findByText('Failed to follow user')).toBeInTheDocument(); // Replace with your error message
  });

  test('shows loading state while follow request is pending', async () => {
    server.use(
      rest.post('https://api-backend-project-3eba949b1615.herokuapp.com/profiles/:username/follow/', (req, res, ctx) => {
        return res(ctx.delay(200), ctx.json({ message: 'Followed' })); // Simulate network delay
      })
    );

    render(
      <Router>
        <FollowButton profileId={1} username="testuser" />
      </Router>
    );

    const followButton = await screen.findByText('Follow');
    fireEvent.click(followButton);

    // Assert that loading state appears
    expect(await screen.findByText('Loading...')).toBeInTheDocument(); // Replace with your loading message
  });
});
