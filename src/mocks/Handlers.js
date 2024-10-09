import { rest } from 'msw';

const baseURL = "https://api-backend-project-3eba949b1615.herokuapp.com/";

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
        return res(ctx.json({
            pk: 82,
            username: "Rudge",
            email: "",
            first_name: "",
            last_name: "",
            profile_id: 88
        }));
    }),
    rest.post(`${baseURL}dj-rest-auth/login/`, (req, res, ctx) => {
        const { username, password } = req.body;
        // Simulate a successful login
        if (username === 'testuser' && password === 'password123') {
            return res(ctx.json({ key: 'some-fake-key' }));
        } else {
            // Simulate a login failure
            return res(ctx.status(401), ctx.json({ error: 'Invalid credentials' }));
        }
    }),
    rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
        return res(ctx.status(200));
    }),
    rest.get(`${baseURL}profiles/:username/is_following/`, (req, res, ctx) => {
        const { username } = req.params;
        // Adjust the response based on the username
        if (username === 'testuser') {
            return res(ctx.json({ is_following: false }));
        } else {
            return res(ctx.json({ is_following: true }));
        }
    }),
    rest.post(`${baseURL}profiles/:username/follow/`, (req, res, ctx) => {
        return res(ctx.status(201));
    }),
    rest.delete(`${baseURL}profiles/:username/unfollow/`, (req, res, ctx) => {
        return res(ctx.status(204));
    }),
    rest.get(`${baseURL}profiles/:username/`, (req, res, ctx) => {
        const { username } = req.params;
        return res(ctx.json({
            username: username,
            full_name: "Test User",
            bio: "This is a test user profile.",
            location: "Test Location",
            profile_image: "https://example.com/profile.jpg"
        }));
    }),
    rest.get(`${baseURL}profiles/:username/follower_count/`, (req, res, ctx) => {
        return res(ctx.json({ follower_count: 100 }));
    }),
    rest.get(`${baseURL}profiles/:username/following_count/`, (req, res, ctx) => {
        return res(ctx.json({ following_count: 50 }));
    }),
];
