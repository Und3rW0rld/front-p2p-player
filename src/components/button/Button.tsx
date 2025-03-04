import SearchIcon from "../../assets/icons/search-icon.svg";
import "./button.css";

interface ButtonProps {
    label: string;
    onClick: () => void;
    type?: "button" | "submit" | "reset";
    icon?: string;
    isActivated?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, type = "button", icon = SearchIcon, isActivated = true }) => {
    return (
        <button className={`custom-button ${!isActivated ? "disabled" : ""}`} type={type} onClick={onClick}>
            <img src={icon} alt="search icon" className="button-icon" />
            {label}
        </button>
    );
};

export default Button;
