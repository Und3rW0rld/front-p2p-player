import "./userPlaylists.css";
import Playlist from "../../../components/playlist/Playlist";
import Expand from "../../../assets/icons/polygon.svg";
import playlists from "../../../assets/mocks/playlist.json";
import { useState } from "react";

interface UserProfileProps {
    userName: string;
  }
const CAROUSEL_SIZE = 4;
const CAROUSEl_MOVEMENT = 1;



const UserPlaylists = ({ userName}: UserProfileProps) => {
    const [startIndex, setStartIndex] = useState(0);
    const [expand, setExpand] = useState(true);

    const playlistArray = Object.values(playlists); 
    const totalPlaylists = playlistArray.length;

    const handleNext = () => {
        setStartIndex((prevIndex) =>
          prevIndex + CAROUSEl_MOVEMENT >= totalPlaylists ? 0 : prevIndex + CAROUSEl_MOVEMENT
        );
      };
      const handlePrev = () => {
        setStartIndex((prevIndex) =>
          prevIndex - CAROUSEl_MOVEMENT < 0 ? totalPlaylists - CAROUSEl_MOVEMENT : prevIndex - CAROUSEl_MOVEMENT
        );
      };

    return(
        <>

        <div className="playlists-component">
            <div className="title-div">
            <h1 className="main-title" onClick={() => setExpand(!expand)}>
              {/* Girar el icono si expand es false*/}
              <img
                src={Expand}
                alt=""
                style={{ transform: expand ? "rotate(180deg)" : "" }}
              />
                <pre>  {userName} PLAYLISTS</pre>

            </h1>
            </div>
            <div className="carousel">
                <div className="prev arrow" onClick={() => handlePrev()}>
                    <img
                        src={Expand}
                        alt=""
                    />
                </div>

                <div className="playlists-carousel">
                    {playlistArray
                    .slice(startIndex, startIndex + CAROUSEL_SIZE)
                    .map((playlist, index) => (
                        <Playlist
                          key={startIndex + index}
                          expanded={expand} 
                          image={playlist.image}
                          name={playlist.name}
                          songCount={playlist.songCount}
                        />
                      ))}
                </div>

                <div className="next arrow" onClick={() => handleNext()}>
                <img
                        src={Expand}
                        alt=""
                    />
                </div>
            </div>
        </div>
        </>
    )
};
export default UserPlaylists;