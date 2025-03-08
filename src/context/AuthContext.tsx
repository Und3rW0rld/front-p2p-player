import { createContext, useState, useEffect } from "react";
import { authService } from "../api/authService";

interface AuthContextType {
  user: any;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // ✅ Ahora cargamos correctamente el usuario
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const data = await authService.login({ username, password });

      // ✅ Guardamos el token y el usuario en localStorage correctamente
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
    } catch (error) {
      console.error("Error en el login:", error);
    }
  };

  const logout = () => {
    authService.logout();
    localStorage.removeItem("user"); // ✅ Eliminamos también el usuario del localStorage
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
