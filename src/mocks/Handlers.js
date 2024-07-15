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
        return res(ctx.json({
            key: 'some-fake-key'
        }));
    }),
    rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
        return res(ctx.status(200));
    }),
    rest.get(`${baseURL}profiles/:username/is_following/`, (req, res, ctx) => {
        const { username } = req.params;
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
];