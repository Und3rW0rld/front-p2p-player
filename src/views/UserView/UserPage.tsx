import "./userPage.css"
import BannerMockImg from '../../assets/img/userPageBannerMock.gif'
import UserProfMockImg from '../../assets/img/userProfilePicMock.jpg'
import EditButtonSVG from "../../assets/icons/edit-pwd.svg"

var userName:string = "YOUR_USERNAME";
var userDescription = "Me gusta el pop polaco"

const UserPage = () => {

    return (
        <>
        <div className = "user-page-container">
            <div className="user-profile-container">
                <div className="user-profile-left">
                    <img src = {EditButtonSVG}/>
                <div className = "user-data">
                    <img src= {UserProfMockImg} alt = "Profile picture"/>
                    <h2 className="user-name"> {userName}</h2>
                    <h3 className="user-description">{userDescription}</h3>
                </div>
                </div>
                <div className="user-profile-right">
                    <img src= {BannerMockImg} alt = "Banner"/>
                </div>
            </div>
        </div>
        </>
    )
}

export default UserPage