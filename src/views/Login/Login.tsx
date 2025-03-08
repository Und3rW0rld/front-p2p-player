import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; // ✅ Importar el contexto
import Input from "../../components/input/Input";
import LoginImg from "../../assets/img/login-img.png";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext); // ✅ Acceder al contexto

  if (!authContext) {
    console.error("❌ Error: AuthContext es null. Verifica que `AuthProvider` está envolviendo tu app.");
    return null;
  }

  const { login } = authContext; // ✅ Obtener la función login

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    if (!login) {
      console.error("❌ Error: `login` no está definido en `AuthContext`.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      console.log("📢 Llamando a login con:", formData);
      await login(formData.username, formData.password); // ✅ Llamar a login del contexto
      navigate("/main"); // ✅ Redirigir al usuario
    } catch (err: any) {
      console.error("❌ Error en el login:", err);
      setError(err.message || "Error al iniciar sesión");
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
          {error && <p className="error-message">{error}</p>}
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
            <input type="button" value="Register" onClick={() => navigate("/register")} />
          </div>
        </div>
      </div>
      <div className="glow-effect effect-two-login"></div>
    </div>
  );
};

export default Login;
