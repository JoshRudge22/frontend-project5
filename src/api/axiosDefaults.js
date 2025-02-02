import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL || "https://joshapp-backend-efcd8c73d793.herokuapp.com/";
axios.defaults.withCredentials = true;

axios.defaults.headers.post["Content-Type"] = "application/json";

const axiosReq = axios.create({
  headers: {
    "Content-Type": "multipart/form-data",
  },
});


const axiosRes = axios.create();


axiosRes.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized - Attempting token refresh");

      try {
        await axios.post("dj-rest-auth/token/refresh/", {}, { withCredentials: true });
        return axios(error.config);
      } catch (refreshError) {
        console.error("Refresh token failed - Redirecting to login");
      }
    }

    return Promise.reject(error);
  }
);

export { axiosReq, axiosRes };