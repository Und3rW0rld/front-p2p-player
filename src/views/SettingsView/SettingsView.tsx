import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import UserProfMockImg from "../../assets/img/userProfilePicMock.jpg";
import { uploadUserImage, updateUser} from "../../api/userService";
import "./settingsView.css";
import { User } from "../../types";

const SettingView = () => {
    const user = JSON.parse(localStorage.getItem("user") || "null") as User;
    console.log("User:", user);

    const authContext = useContext(AuthContext);
    const logout = authContext?.logout;
    const navigate = useNavigate();

    const [isUploading, setIsUploading] = useState(false);
    const [profileImage, setProfileImage] = useState(user.imageUrl || UserProfMockImg);
    const [username, setUsername] = useState(user.username || "");
    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");

    const handleLogout = () => {
        if (logout) {
            logout(); // Llamamos la función logout
            navigate("/login"); // 🔥 Redirigimos al usuario al login
        }
    };

    const handleProfileImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        console.log("Selected file:", file);
        if (!file) return;

        setIsUploading(true);
        try {
            const uploadedImageUrl = await uploadUserImage(file);
            setProfileImage(uploadedImageUrl);
            const updatedUser = { ...user, imageUrl: uploadedImageUrl };
            await updateUser(user.id, updatedUser);
            
            console.log("Image uploaded successfully:", uploadedImageUrl);
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleSaveUsername = () => {
        const updatedUser = { ...user, username: username };
        updateUser(user.id, updatedUser)
            .then(() => {
            console.log("Username updated successfully:", username);
            })
            .catch((error) => {
            console.error("Error updating username:", error);
            });
    }
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
                    <img src={profileImage} alt="Profile" className="profile-image" />
                    <div className="change-image-overlay">+</div>
                    <input
                        type="file"
                        accept="image/*"
                        className="change-image-input"
                        onChange={handleProfileImageChange}
                        disabled={isUploading}
                    />
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
                    <Button label="Save" onClick={handleSaveUsername} />
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
