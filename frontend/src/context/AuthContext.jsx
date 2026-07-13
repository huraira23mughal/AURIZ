import { createContext, useState, useEffect, useContext } from "react";
import API from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync token validation on load
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          const res = await API.get("auth/me/");
          setUser(res.data.user);
          setProfile(res.data.profile);
        } catch (err) {
          console.error("Session initialization failed:", err);
          logout();
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const res = await API.post("auth/login/", { username, password });
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      
      // Fetch user detail
      const meRes = await API.get("auth/me/");
      setUser(meRes.data.user);
      setProfile(meRes.data.profile);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      return {
        success: false,
        error: err.response?.data?.detail || "Invalid credentials. Please try again.",
      };
    }
  };

  const register = async (username, email, password, password2) => {
    setLoading(true);
    try {
      const res = await API.post("auth/register/", {
        username,
        email,
        password,
        password2,
      });
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      setUser(res.data.user);
      setProfile(res.data.profile);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      return {
        success: false,
        error: err.response?.data || { detail: "Registration failed." },
      };
    }
  };

  const logout = async () => {
    const refresh = localStorage.getItem("refresh_token");
    if (refresh) {
      try {
        await API.post("auth/logout/", { refresh });
      } catch (err) {
        console.error("Logout request failed:", err);
      }
    }
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    setProfile(null);
    setLoading(false);
  };

  const reloadProfile = async () => {
    try {
      const res = await API.get("auth/me/");
      setProfile(res.data.profile);
    } catch (err) {
      console.error("Failed to reload profile", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        login,
        register,
        logout,
        reloadProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
