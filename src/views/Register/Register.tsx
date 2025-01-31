import "./register.css";
import LoginImg from "../../assets/img/login-img.png";
import Input from "../../components/input/Input";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="register-container">
      <div className="glow-effect effect-one-register"></div>
      <div className="glow-effect effect-two-register"></div>

      <div className="register-img">
        <img src={LoginImg} alt="" />
      </div>

      <div className="form-container">
        <div className="register-form">
          <h2 className="register-title">REGISTER</h2>
          <Input
            label="Username"
            placeholder="Enter your username"
            is_password={false}
          />
          <Input
            label="Email address"
            placeholder="Enter your email address"
            is_password={false}
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            is_password={true}
          />
          <input className="register-button" type="button" value="REGISTER" />
          <div className="change-form-btns">
            <input
              type="button"
              value="Login"
              onClick={() => navigate("/login")}
            />
            <input type="button" value="Register" className="active-btn" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
