import "./register.css";
import LoginImg from "../../assets/img/login-img.png";
import Input from "../../components/input/Input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { authService } from "../../api/authService";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Manejar el registro
  const handleRegister = async () => {
    setError(null);
    setLoading(true);

    try {
      await authService.register(form);
      navigate("/login");
    } catch (err) {
      setError("Error en el registro. Verifica los datos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="glow-effect effect-one-register"></div>
      <div className="glow-effect effect-two-register"></div>

      <div className="register-img">
        <img src={LoginImg} alt="Register" />
      </div>

      <div className="form-container">
        <div className="register-form">
          <h2 className="register-title">REGISTER</h2>
          <Input label="Username" placeholder="Enter your username" name="username" is_password={false} onChange={handleChange} />
          <Input label="Email address" placeholder="Enter your email address" name="email" is_password={false} onChange={handleChange} />
          <Input label="Password" placeholder="Enter your password" name="password" is_password={true} onChange={handleChange} />

          {error && <p className="error-message">{error}</p>}

          <input className="register-button" type="button" value={loading ? "Registering..." : "REGISTER"} onClick={handleRegister} disabled={loading} />

          <div className="change-form-btns">
            <input type="button" value="Login" onClick={() => navigate("/login")} />
            <input type="button" value="Register" className="active-btn" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
