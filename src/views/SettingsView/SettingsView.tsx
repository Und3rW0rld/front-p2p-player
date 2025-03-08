import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // 🔥 Importa useNavigate
import { AuthContext } from "../../context/AuthContext";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import UserProfMockImg from "../../assets/img/userProfilePicMock.jpg";
import "./settingsView.css";

const SettingView = () => {
    const authContext = useContext(AuthContext);
    const logout = authContext?.logout;
    const navigate = useNavigate(); // 🔥 Hook para navegar entre páginas

    const [username, setUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");

    const handleLogout = () => {
        if (logout) {
            logout(); // Llamamos la función logout
            navigate("/login"); // 🔥 Redirigimos al usuario al login
        }
    };

    return (
        <div className="settings-container">
            <div className="settings-header">
                <div>
                    <h1>Profile Settings</h1>
                    <p>
                        In this section you can edit your profile information, change your
                        username and password. Also, you can change your profile image.
                    </p>
                </div>
                <div className="profile-image-container">
                    <img src={UserProfMockImg} alt="Profile" className="profile-image" />
                    <div className="change-image-overlay">+</div>
                </div>
            </div>

            {/* Username Section */}
            <div className="settings-section">
                <h2>Edit your username</h2>
                <div className="input-group">
                    <Input
                        label="Username"
                        placeholder="Enter your new username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        is_password={false}
                    />
                    <Button label="Save" onClick={() => console.log("Saved username:", username)} />
                </div>
            </div>

            {/* Password Section */}
            <div className="settings-section">
                <h2>Edit your password</h2>
                <div className="input-group">
                    <Input
                        label="New Password"
                        placeholder="Enter your new password"
                        is_password={true}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Button label="Save" onClick={() => console.log("Saved password")} />
                </div>
                <div className="input-group">
                    <Input
                        label="Old Password"
                        placeholder="Enter your old password"
                        is_password={true}
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>
            </div>

            <div className="buton-container">
            {/* Save All & Logout Buttons */}
                <div className="save-all-container">
                    <Button label="Save All" onClick={() => console.log("Saved all settings")} />
                </div>

                <div className="logout-container">
                    <Button label="Logout" onClick={handleLogout} />
                </div>
            </div>
        </div>
    );
};

export default SettingView;
