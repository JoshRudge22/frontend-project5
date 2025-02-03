import axios from "axios";

axios.defaults.baseURL = "https://joshapp-backend-efcd8c73d793.herokuapp.com";
axios.defaults.withCredentials = true;

// Axios instance for requests
const axiosReq = axios.create({
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Axios instance for responses (handling token refresh)
const axiosRes = axios.create();

// Prevent multiple refresh attempts
let isRefreshing = false;

// Response Interceptor for handling expired tokens
axiosRes.interceptors.response.use(
  (response) => response, // Return successful response as is
  async (error) => {
    const originalRequest = error.config;

    // Only refresh token if it's a 401 error and we haven't tried refreshing yet
    if (error.response?.status === 401 && !originalRequest._retry && !isRefreshing) {
      console.warn("Unauthorized - Attempting token refresh");

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshResponse = await axios.post(
          "/dj-rest-auth/token/refresh/", 
          {}, 
          { withCredentials: true } // Ensure cookies are sent
        );

        if (refreshResponse.data.access) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${refreshResponse.data.access}`;
          originalRequest.headers["Authorization"] = `Bearer ${refreshResponse.data.access}`;
          isRefreshing = false;
          return axios(originalRequest); // Retry the original request
        }
      } catch (refreshError) {
        console.error("Refresh token failed - Logging out");
        localStorage.removeItem("user"); // Clear stored user data
        window.location.href = "/signin"; // Redirect to login
      }
    }

    isRefreshing = false;
    return Promise.reject(error);
  }
);

export { axiosReq, axiosRes };