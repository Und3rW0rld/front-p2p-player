import "./player.css";
import React, { useState } from "react";



import ShuffleIcon from "../../assets/icons/shuffle.svg";





import PlayCurrentSong from "../songControls/PlayCurrentSong";
import StopCurrentSong from "../songControls/StopCurrentSong";
import PlayNextSong from "../songControls/PlayNextSong";
import PlayPreviousSong from "../songControls/PlayPreviousSong";
import Restart from "../songControls/Restart.tsx";
import Mute from "../songControls/Mute.tsx"

import { useFileContext } from "../../providers/FileProvider";

interface PlayerProps {}

const Player: React.FC<PlayerProps> = () => {
  const { isSongPlaying, currentSong, metadata} = useFileContext();
  const [isMuted, setMuted] = useState(false);

  const shuffle = () => {
    console.log("shuffle!");
  };

  

  const mute = () => {
    setMuted(!isMuted);
  };

  const currentSongMetadata = currentSong ? metadata.get(currentSong) : null;
  const currentSongImage = currentSongMetadata?.image || "https://cdn-icons-png.flaticon.com/512/44/44091.png"; // Default placeholder

  return (
    <div className="player-wrapper">
      <div className="player">
        <div className="actions">
          <img src={currentSongImage} alt="Song Cover" className="profile-image" />
          
          <PlayPreviousSong/>
          {isSongPlaying ? (
            <StopCurrentSong/>
          ) : (
            <PlayCurrentSong/>
          )}
          <PlayNextSong/>
          <Restart/>
          <Mute/>
        </div>
        
      </div>
    </div>
  );
};

export default Player;
