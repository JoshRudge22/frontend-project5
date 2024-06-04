import axios from "axios";

axios.defaults.baseURL = 'https://api-backend-project-3eba949b1615.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();


export const getFollowers = async () => {
  return await axiosReq.get('followers/');
};

export const followUser = async (userId) => {
  return await axiosReq.post('followers/', { user: userId });
};

export const unfollowUser = async (followId) => {
  return await axiosReq.delete(`followers/${followId}/`);
};