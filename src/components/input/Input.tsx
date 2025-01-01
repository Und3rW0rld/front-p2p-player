import './input.css'


interface InputProps {
  label: string;
  placeholder: string;
  is_password: boolean;
}

const Input = ({ label, placeholder, is_password }: InputProps) => {

  const id = label.replace(/\s+/g, '-').toLowerCase();
  
  return (
    <>
    
    <label htmlFor={id}>{label}</label>
    <input
      type={is_password ? 'password' : 'text'}
      id={id}
      placeholder={placeholder}
    />
    </>
  )
}

export default Input