import "./friendProfile.css"

import BannerMockImg from '../../assets/img/friendBannerMock.gif'
import UserProfMockImg from '../../assets/img/friendProfilePickMock.jpg'
import EditButtonSVG from "../../assets/icons/edit-pwd.svg"

import songs from "../../assets/mocks/songs.json";
import topSongs from "../../assets/mocks/friendTopSongs.json";


import TopSongs from "../../components/topSongs/TopSongs.tsx"; 
import SongTable from "../../components/songTable/SongTable.tsx";
import UserProfile from "../../components/userProfile/UserProfile.tsx";


var userName:string = "FRIEND'S_USERNAME";
var userDescription = "Me gusta el pop polaco"

const FriendProfilePage = () => {
    return(
        <>
        <div className="friends-page-container">
            
            <UserProfile name={userName} 
            description={userDescription} 
            image={UserProfMockImg}
            banner={BannerMockImg}/>
            
        </div>

        <div className="top-songs-container">
                <h1 >
                    {userName} TOP 3 SONGS
                    <img src = {EditButtonSVG} className="edit-icon"/>
                </h1>
                <TopSongs topSongs={topSongs}/>
            </div>

        </>
    )
}

export default FriendProfilePage