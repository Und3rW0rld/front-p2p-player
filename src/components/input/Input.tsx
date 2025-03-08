import "./input.css";
import HidePwd from "../../assets/icons/hide-pwd.svg";
import ShowPwd from "../../assets/icons/show-pwd.svg";
import React, { useState } from "react";

interface InputProps {
  label: string;
  placeholder: string;
  is_password: boolean;
  name?: string; // Nueva prop para identificar el input
  value?: string; // Valor del input desde el estado del formulario
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Manejador de eventos
}

const Input = ({ label, placeholder, is_password, name, value, onChange }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="input-container">
      <label htmlFor={name}>{label}</label>
      <div className="input">
        <input
          type={is_password && !showPassword ? "password" : "text"}
          id={name}
          name={name} // Se usa para identificar el campo en el estado
          placeholder={placeholder}
          value={value} // Se enlaza con el estado del formulario
          onChange={onChange} // Se ejecuta al escribir en el input
        />
        {is_password && (
          <img
            onClick={() => setShowPassword(!showPassword)}
            draggable="false"
            className="icon"
            src={showPassword ? ShowPwd : HidePwd}
            alt="Toggle password visibility"
          />
        )}
      </div>
    </div>
  );
};

export default Input;
