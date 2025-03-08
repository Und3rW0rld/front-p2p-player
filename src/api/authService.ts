import api from "./apiService";

export const authService = {
  register: async (userData: { username: string; email: string; password: string }) => {
    const response = await api.post("/register", userData);
    return response.data;
  },

  login: async (credentials: { username: string; password: string }) => {
    const response = await api.post("/login", credentials);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
  },
};
