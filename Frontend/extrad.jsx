## AuthContext.jsx

```jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API_URL from "../apiConfig";

const AuthContext = createContext();

axios.defaults.withCredentials = true;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const login = async (formData) => {
    try {
      const res = await axios.post(`${API_URL}/api/v1/auth/login`, formData);
      const { user } = res.data;

      updateUser(user);
      toast.success("Welcome back! Login successful.");
      navigate("/");

      return { success: true, data: res.data };
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Login failed";
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  const signup = async (formData) => {
    try {
      const res = await axios.post(`${API_URL}/api/v1/auth/signup`, formData);
      const { user } = res.data;

      updateUser(user);
      toast.success("Account created successfully!");
      navigate("/");

      return { success: true, data: res.data };
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Signup failed";
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  const logoutUser = async () => {
    try {
      await axios.post(`${API_URL}/api/v1/auth/logoutuser`);
      toast.info("Logged out successfully.");
      navigate("/");
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.removeItem("user");
      setUser(null);
      setUserProfile(null);
    }
  };

  const profile = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/v1/profile/me`);
      setUserProfile(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const value = {
    user,
    setUser: updateUser,
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
```

