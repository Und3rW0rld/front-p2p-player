import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import UserProfMockImg from "../../assets/img/userProfilePicMock.jpg";
import "./settingsView.css";

const SettingView = () => {
    const handleSaveUsername = () => {
        console.log("Saved username");
    };

    const handleSavePassword = () => {
        console.log("Saved password");
    }

    const handleSaveAll = () => {
        console.log("Saved all");
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
                    <img src={UserProfMockImg} alt="Profile" className="profile-image" />
                    <div className="change-image-overlay">+</div>
                </div>
            </div>

            <div className="settings-section">
                <h2>Edit your username</h2>
                <div className="input-group">
                    <Input label="Username" placeholder="Enter your new username" is_password={false} />
                    <Button label="Save" onClick={handleSaveUsername} />
                </div>
            </div>

            <div className="settings-section">
                <h2>Edit your password</h2>
                <div className="input-group">
                    <Input label="New Password" placeholder="Enter your new password" is_password={true} />
                    <Button label="Save" onClick={handleSavePassword} />
                </div>
                <div className="input-group">
                    <Input label="Old Password" placeholder="Enter your old password" is_password={true} />
                </div>
            </div>

            <div className="save-all-container">
                <Button label="Save All" onClick={handleSaveAll} />
            </div>
        </div>
    );
};

export default SettingView;
