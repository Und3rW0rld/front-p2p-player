import Input from "../../components/input/Input";
import LoginImg from "../../assets/img/login-img.png";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="login-container">
        <div className="glow-effect effect-one-login"></div>
        <div className="login-img">
          <img src={LoginImg} alt="" />
        </div>
        <div className="form-container">
          <div className="login-form">
            <h2 className="login-title">LOGIN</h2>
            <Input
              label="Username"
              placeholder="Enter your username"
              is_password={false}
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              is_password={true}
            />
            <input className="login-button" type="button" value="ENTER" />
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
    </>
  );
};

export default Login;
