import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import { authService } from "../../api/authService"; // Importamos authService
import LoginImg from "../../assets/img/login-img.png";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();

  // Estado del formulario
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Estado de carga y errores
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Manejo de cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Manejo del login con la API
  const handleLogin = async () => {
    setError(null);
    setLoading(true);

    try {
      const data = await authService.login(formData); // Usamos authService
      localStorage.setItem("token", data.token); // Guardamos el token

      console.log("Login exitoso:", data);
      
      navigate("/main"); // Redirigir al usuario después del login
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="glow-effect effect-one-login"></div>
      <div className="login-img">
        <img src={LoginImg} alt="Login" />
      </div>
      <div className="form-container">
        <div className="login-form">
          <h2 className="login-title">LOGIN</h2>
          {error && <p className="error-message">{error}</p>} {/* Mostrar error si existe */}
          <Input
            label="Username"
            placeholder="Enter your username"
            is_password={false}
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            is_password={true}
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            className="login-button"
            type="button"
            value={loading ? "Loading..." : "ENTER"}
            onClick={handleLogin}
            disabled={loading}
          />
          <div className="change-form-btns">
            <input type="button" value="Login" className="active-btn" />
            <input
              type="button"
              value="Register"
              onClick={() => navigate("/register")}
            />
          </div>
        </div>
      </div>
      <div className="glow-effect effect-two-login"></div>
    </div>
  );
};

export default Login;
