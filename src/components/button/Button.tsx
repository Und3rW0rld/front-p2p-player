import SearchIcon from "../../assets/icons/search-icon.svg";
import "./button.css";

interface ButtonProps {
    label: string;
    onClick: () => void;
    type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ label, onClick, type = "button" }) => {
    return (
        <button className="custom-button" type={type} onClick={onClick}>
            <img src={SearchIcon} alt="search icon" className="button-icon" />
            {label}
        </button>
    );
};

export default Button;
