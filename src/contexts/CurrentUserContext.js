import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router";
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const history = useHistory();

  const fetchCurrentUser = async () => {
    try {
      const { data } = await axiosRes.get("dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      console.error("Failed to fetch current user:", err);
      setCurrentUser(null); // Optionally set to null if there's an error
    } finally {
      setLoading(false); // End loading state
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const handleTokenRefresh = async (config) => {
    try {
      await axios.post("/dj-rest-auth/token/refresh/");
    } catch (err) {
      setCurrentUser((prevCurrentUser) => {
        if (prevCurrentUser) {
          history.push("/signin");
        }
        return null;
      });
      removeTokenTimestamp();
    }
    return config;
  };

  useEffect(() => {
    const requestInterceptor = axiosReq.interceptors.request.use(
      async (config) => {
        if (shouldRefreshToken()) {
          await handleTokenRefresh(config);
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    const responseInterceptor = axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          await handleTokenRefresh(err.config);
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      axiosReq.interceptors.request.eject(requestInterceptor);
      axiosRes.interceptors.response.eject(responseInterceptor);
    };
  }, [history]);

  if (loading) return <p>Loading...</p>; // Optional loading indicator

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
