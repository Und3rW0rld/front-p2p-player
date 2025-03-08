import { createContext, useState, useEffect } from "react";
import { authService } from "../api/authService";
import { getUserById } from "../api/userService";
import { User } from "../types";

interface AuthContextType {
  user: any;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser)); // ✅ Asegura que user se cargue correctamente
      } catch (error) {
        console.error("Error al parsear usuario:", error);
        localStorage.removeItem("user"); // Si el JSON es inválido, lo eliminamos
      }
    }
  }, []);

  const login = async (username: string, password: string) => {
    console.log("🔹 AuthContext.login llamado con:", { username, password });

    try {
      const data = await authService.login({ username, password });

      if (!data?.id) {
        console.error("❌ El backend no devolvió un ID de usuario:", data);
        return;
      }

      console.log("🔹 Datos recibidos en login:", data);

      // Guardar ID en el localStorage de forma temporal (en caso de fallo en getUserById)
      localStorage.setItem("user", JSON.stringify({ id: data.id }));

      // Intentar obtener más datos del usuario
      const fetchedUser = await getUserById(data.id);
      
      if (fetchedUser) {
        const userData = { ...fetchedUser, id: data.id };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        console.warn("⚠️ No se pudo obtener información completa del usuario.");
      }

        } catch (error) {
      console.error("❌ Error en el login:", error);
        }
      };

  const logout = () => {
    console.log("🔹 AuthContext.logout ha sido llamado");
    authService.logout();
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // ✅ Elimina también el token al hacer logout
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
