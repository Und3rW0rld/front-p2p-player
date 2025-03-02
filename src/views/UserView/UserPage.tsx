import "./userPage.css"
import BannerMockImg from '../../assets/img/userPageBannerMock.gif'
import UserProfMockImg from '../../assets/img/userProfilePicMock.jpg'
import EditButtonSVG from "../../assets/icons/edit-pwd.svg"
import songs from "../../assets/mocks/songs.json";

import TopSongs from "../../components/topSongs/TopSongs.tsx"; 
import UserPlaylists from "../../components/userPlaylists/UserPlaylists.tsx"; 
import SongTable from "../../components/songTable/SongTable.tsx";

var userName:string = "YOUR_USERNAME";
var userDescription = "Me gusta el pop polaco"

const UserPage = () => {
    return (
        <>
        <div className = "user-page-container">
            <div className="user-profile-container">
                <div className="user-profile-left">
                    <img src = {EditButtonSVG} className="edit-icon"/>
                    <div className = "user-data">
                        <img src= {UserProfMockImg} alt = "Profile picture"/>
                        <h2 className="user-name"> {userName}</h2>
                        <h3 className="user-description">{userDescription}</h3>
                    </div>
                    <div className="edit-icon"></div>
                </div>
                <div className="user-profile-right">
                    <img src= {BannerMockImg} alt = "Banner"/>
                </div>
            </div>
            <div className="top-songs-container">
                <h1 >
                    {userName} TOP 3 SONGS
                    <img src = {EditButtonSVG} className="edit-icon"/>
                </h1>
                <TopSongs />
            </div>

            <div className="user-playlists-container">
                <UserPlaylists userName={userName}/>
            </div>

            <div className="user-songs">
                <h1>
                    {userName} SONGS
                    
                </h1>
                <SongTable songs={songs} />
            </div>
        </div>
        </>
    )
}

export default UserPage