import axios from "axios";

// Set up the base URL and default headers
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL || 'https://joshapp-backend-efcd8c73d793.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

// Create an Axios instance for requests
const axiosReq = axios.create();

// Add a request interceptor
axiosReq.interceptors.request.use(
  (config) => {
    // You can add authentication tokens or any other modifications here
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

// Create an Axios instance for responses
const axiosRes = axios.create();

// Add a response interceptor
axiosRes.interceptors.response.use(
  (response) => {
    // Return the response data directly
    return response.data;
  },
  (error) => {
    // Handle common response errors here
    if (error.response) {
      if (error.response.status === 401) {
        // Handle unauthorized error (e.g., redirect to login)
        console.error("Unauthorized access - Redirecting to login");
      } else {
        console.error("An error occurred:", error.response.status, error.response.data);
      }
    }
    return Promise.reject(error);
  }
);

// Export both Axios instances for use in your application
export { axiosReq, axiosRes };
