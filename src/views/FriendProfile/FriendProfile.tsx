import "./friendProfile.css"

import BannerMockImg from '../../assets/img/friendBannerMock.gif'
import UserProfMockImg from '../../assets/img/friendProfilePickMock.jpg'

import songs from "../../assets/mocks/songs.json";

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
        </>
    )
}

export default FriendProfilePage