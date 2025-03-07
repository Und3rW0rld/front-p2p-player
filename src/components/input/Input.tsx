import './input.css'
import HidePwd from "../../assets/icons/hide-pwd.svg"
import ShowPwd from "../../assets/icons/show-pwd.svg"
import React, { useState } from 'react';

interface InputProps {
  label: string;
  placeholder: string;
  is_password: boolean;
  inputNativeProps?: React.InputHTMLAttributes<HTMLInputElement>;

}

const Input = ({ label, placeholder, is_password }: InputProps) => {

  const id = label.replace(/\s+/g, '-').toLowerCase() + Math.random().toString(36).substring(7);

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPwd = () => {
    setShowPassword(!showPassword);
    document.getElementById(id)?.setAttribute('type', showPassword ? 'password' : 'text');
  }


  return (
    <>
      <div className='input-container'>
        <label htmlFor={id}>{label}</label>
        <div className='input'>
          <input
            type={is_password ? 'password' : 'text'}
            id={id}
            placeholder={placeholder}
          />{
            is_password && <img onClick={handleShowPwd} draggable="false" className='icon' src={showPassword ? ShowPwd : HidePwd} alt="Hide password" />
          }

        </div>

      </div>
    </>
  )
}

export default Input