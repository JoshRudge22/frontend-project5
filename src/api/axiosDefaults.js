import axios from "axios";

axios.defaults.baseURL = "https://joshapp-backend-efcd8c73d793.herokuapp.com";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create({
  headers: { "Content-Type": "multipart/form-data" },
});

export const axiosRes = axios.create();

axiosRes.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized - Attempting token refresh");
      try {
        const refreshResponse = await axios.post("/dj-rest-auth/token/refresh/", {}, { withCredentials: true });
        if (refreshResponse.data.access) {
          return axios(error.config);
        }
      } catch (refreshError) {
        console.error("Refresh token failed - Redirecting to login");
        window.location.href = "/signin";
      }
    }
    return Promise.reject(error);
  }
);