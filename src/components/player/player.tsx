import "./player.css";
import React, { useState } from "react";


import UserProfilePic from "../../assets/img/userProfilePicMock.jpg";
import ShuffleIcon from "../../assets/icons/shuffle.svg";
import PreviousIcon from "../../assets/icons/next.svg"; 
import PlayIcon from "../../assets/icons/play.svg";
import PauseIcon from "../../assets/icons/pause.svg";
import NextIcon from "../../assets/icons/next.svg";
import ReplayIcon from "../../assets/icons/replay.svg";
import SpeakerIcon from "../../assets/icons/speaker.svg";
import SpeakerMutedIcon from "../../assets/icons/speaker-muted.svg";

import PlayCurrentSong from "../songControls/PlayCurrentSong";
import StopCurrentSong from "../songControls/StopCurrentSong";

import { useFileContext } from "../../providers/FileProvider";

interface PlayerProps {}

const Player: React.FC<PlayerProps> = () => {
  const { isSongPlaying} = useFileContext();
  const [isPlaying, setPlaying] = useState(false);
  const [isMuted, setMuted] = useState(false);

  const shuffle = () => {
    console.log("shuffle!");
  };

  const previousSong = () => {
    console.log("previous song!");
  };

  const nextSong = () => {
    console.log("next song!");
  };

  const play = () => {
    setPlaying(!isPlaying);
  };

  const mute = () => {
    setMuted(!isMuted);
  };

  const replay = () => {
    console.log("replay!");
  };

  return (
    <div className="player-wrapper">
      <div className="player">
        <div className="actions">
          <img src={UserProfilePic} alt="Profile image" className="profile-image" />
          <img src={ShuffleIcon} alt="Shuffle" className="shuffle" onClick={shuffle} />
          <img src={PreviousIcon} alt="Previous" className="previous" onClick={previousSong} />
          {isSongPlaying ? (
            <StopCurrentSong/>
          ) : (
            <PlayCurrentSong/>
          )}
          <img src={NextIcon} alt="Next" className="next" onClick={nextSong} />
          <img src={ReplayIcon} alt="Replay" className="replay" onClick={replay} />
          {isMuted ? (
            <img src={SpeakerMutedIcon} alt="Muted" className="speaker" onClick={mute} />
          ) : (
            <img src={SpeakerIcon} alt="Unmuted" className="speaker" onClick={mute} />
          )}
        </div>
        <div className="progress">
          <div className="progress-line">
            <div className="current-progress" style={{ width: "80%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
