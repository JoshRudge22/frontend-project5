import axios from "axios";

axios.defaults.baseURL = 'https://api-backend-project-3eba949b1615.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true

export const axiosReq = axios.create();
export const axiosRes = axios.create();