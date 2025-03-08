import api from "./apiService";

export const authService = {
  register: async (userData: { username: string; email: string; password: string }) => {
    const response = await api.post("/register", userData);
    return response.data;
  },

  login: async (credentials: { username: string; password: string }) => {
    console.log("📡 Enviando solicitud de login con:", credentials);
  
    try {
      const response = await api.post("/login", credentials);
  
      console.log("✅ Respuesta recibida de la API:", response);
  
      return response.data;
    } catch (error) {
      console.error("🔴 Error en authService.login():", error);
      throw error; // Relanzamos el error para que el componente lo maneje
    }
  },

  logout: () => {
    localStorage.removeItem("token");
  },
};
