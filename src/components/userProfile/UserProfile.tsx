import "./userProfile.css"

import { useNavigate } from "react-router-dom";

import EditButtonSVG from "../../assets/icons/edit-pwd.svg"

interface UserProfileProps {
    name: string;
    description: string;
    image: string;
    banner: string;
}

const UserProfile = ({name, description, image, banner}: UserProfileProps) => {
    const navigate = useNavigate();
    return (
    <>
    <div className="user-profile-container">
        <div className="user-profile-left">
            <img src = {EditButtonSVG} className="edit-icon" onClick={() => navigate("/settings")}/>
            <div className = "user-data">
                <img src= {image} alt = "Profile picture"/>
                <h2 className="user-name"> {name} </h2>
                <h3 className="user-description"> {description} </h3>
            </div>
            {/* Para que la imagen quede centrada se añade un icono invisible, no borrar :)*/}
            <div className="edit-icon"></div>
        </div>
        <div className="user-profile-right">
            <img src= {banner} alt = "Banner"/>
        </div>
    </div>
    </>)
}

export default UserProfile