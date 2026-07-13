import axios from "axios";

const API = axios.create({
  baseURL: "https://huraira23mughal.pythonanywhere.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auto-refresh token on 401
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = localStorage.getItem("refresh_token");

      if (refresh) {
        try {
          const res = await axios.post("https://huraira23mughal.pythonanywhere.com/api/auth/refresh/", {
            refresh,
          });
          const newAccess = res.data.access;
          localStorage.setItem("access_token", newAccess);
          if (res.data.refresh) {
            localStorage.setItem("refresh_token", res.data.refresh);
          }
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
          return API(originalRequest);
        } catch (refreshError) {
          // Refresh failed — clear tokens and redirect to login
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("user");
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token — redirect
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default API;