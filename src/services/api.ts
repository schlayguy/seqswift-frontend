import axios from "axios";

const api = axios.create({
  baseURL: "", // empty = same domain (Vercel)
  withCredentials: true,
});

// Fake successful register/login for demo
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.config.url.includes("/auth/register") || error.config.url.includes("/auth/login")) {
      // Fake success so the app doesn’t crash
      return Promise.resolve({
        data: { success: true, user: { email: "demo@seqswift.com" } }
      });
    }
    return Promise.reject(error);
  }
);

export default api;
