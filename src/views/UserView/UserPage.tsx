import "./userPage.css"
import BannerMockImg from '../../assets/img/userPageBannerMock.gif'
import UserProfMockImg from '../../assets/img/userProfilePicMock.jpg'
import EditButtonSVG from "../../assets/icons/edit-pwd.svg"
import songs from "../../assets/mocks/songs.json";
import topSongs from "../../assets/mocks/userTopSongs.json";

import TopSongs from "../../components/topSongs/TopSongs.tsx"; 
import UserPlaylists from "../../components/userPlaylists/UserPlaylists.tsx"; 
import SongTable from "../../components/songTable/SongTable.tsx";
import UserProfile from "../../components/userProfile/UserProfile.tsx";
import { User } from "../../types.ts";

const UserPage = () => {
    const user = JSON.parse(localStorage.getItem("user") || "null") as User;

    const userName = user.username;
    const userImg = user.imageUrl ? user.imageUrl : UserProfMockImg;
    const userBanner = user.bannerUrl ? user.bannerUrl : BannerMockImg;


    return (
        <>
        <div className = "user-page-container">
            <UserProfile name={userName} 
                description={""} 
                image={userImg}
                banner={userBanner}/>

            {/* <div className="top-songs-container">
                <h1 >
                    {userName} TOP 3 SONGS
                    <img src = {EditButtonSVG} className="edit-icon"/>
                </h1>
                <TopSongs topSongs={topSongs}/>
            </div> */}

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