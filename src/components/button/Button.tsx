import SearchIcon from "../../assets/icons/search-icon.svg";
import UploadIcon from "../../assets/icons/upload.svg";
import "./button.css";

interface ButtonProps {
    label: string;
    onClick: () => void;
    type?: "button" | "submit" | "reset";
    icon?: "search" | "upload";
    isActivated?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, type = "button", isActivated = true, icon }) => {
    const selectedIcon = icon === "search" ? SearchIcon : icon === "upload" ? UploadIcon : null;
    return (
        <button className={`custom-button ${!isActivated ? "disabled" : ""}`} type={type} onClick={onClick}>
            {selectedIcon && <img src={selectedIcon} alt={`${icon} icon`} className="button-icon" />}
            {label}
        </button>
    );
};

export default Button;
