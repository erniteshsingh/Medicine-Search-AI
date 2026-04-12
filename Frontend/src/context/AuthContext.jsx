import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const API_BASE_URL = "http://localhost:5000/api/v1";

axios.defaults.withCredentials = true;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (formData) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, formData);
      const { user } = res.data;
      console.log(user);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      return { success: true, data: res.data };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || "Login failed",
      };
    }
  };

  const signup = async (formData) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/signup`, formData);
      const { user } = res.data;
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      return { success: true, data: res.data };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || "Signup failed",
      };
    }
  };

  const logoutUser = async () => {
    try {
      await axios.post(`${API_BASE_URL}/auth/logout`);
    } catch (err) {
      console.error("Logout failed at server", err);
    } finally {
      localStorage.removeItem("user");
      setUser(null);
      setUserProfile(null);
    }
  };

  const profile = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/users/me`);
      setUserProfile(res.data);
    } catch (err) {
      console.error("Profile fetch failed", err);
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    login,
    signup,
    logoutUser,
    profile,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
