import { useContext, useEffect } from "react";
import { UserContext } from "../Context/useContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Utils/axiosInstance";
import { API_PATHS } from "../Utils/apiPaths";

export const useUserAuth = () => {
  const { user, updateUser, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return;

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      updateUser(JSON.parse(storedUser));
      return;
    }

    let isMounted = true;
    const fetchUserInfo = async () => {
      try {
        axiosInstance.defaults.withCredentials = true; // Enable cookies if using them
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);

        if (isMounted && response.data) {
          updateUser(response.data);
          localStorage.setItem("user", JSON.stringify(response.data)); // Persist user info
        }
      } catch (error) {
        console.log("Failed to fetch user info:", error);
        if (isMounted) {
          clearUser();
          localStorage.removeItem("user");
          navigate("/login");
        }
      }
    };

    fetchUserInfo();
    return () => {
      isMounted = false;
    };
  }, [user, updateUser, clearUser, navigate]);
};
