const baseURL = "https://api-backend-project-3eba949b1615.herokuapp.com/"

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, (req,res,ctx) => {
        return res(ctx.json({
            pk: 82,
            username: "Rudge",
            email: "",
            first_name: "",
            last_name: "",
            profile_id: 88
            })
        );
    }),
    rest.post(`${baseURL}dj-rest-auth/user/`, (req,res,ctx) => {
        return res(ctx.status(200))
    }),
]