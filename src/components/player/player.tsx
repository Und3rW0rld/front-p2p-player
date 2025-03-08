import React, { useState } from "react";
import EditSquare from "../../assets/icons/edit-square.svg";
import './player.css';

interface PlayerProps {

}

const Player: React.FC<PlayerProps> = () => {

  const [isPlaying, setPlaying] = useState(false);
  const [isMuted, setMuted] = useState(false);

  const shuffle = () => {
    console.log('shuffle!')
  }

  const previousSong = () => {
    console.log('previous song!')
  }

  const nextSong = () => {
    console.log('next song!')
  }


  const play = () => {
    setPlaying(!isPlaying)
  }

  const mute = () => {
    setMuted(!isMuted);
  }


  const replay = () => {
    
  }


  return (
    <>
      <div className="player-wrapper">
        <div className="player">
          <div className="actions">
            <img src="/src/assets/img/userProfilePicMock.jpg" alt="Profile image" className="profile-image" />
            <img src="/src/assets/icons/shuffle.svg" alt="Shuffle" className="shuffle" onClick={shuffle} />
            <img src="/src/assets/icons/next.svg" alt="Previous" className="previous" onClick={previousSong}/>
            {
              !isPlaying
               ? <img src="/src/assets/icons/play.svg" alt="Play" className="play" onClick={play} />
               : <img src="/src/assets/icons/pause.svg" alt="Play" className="play" onClick={play} />
            }
            <img src="/src/assets/icons/next.svg" alt="Next" className="next" onClick={nextSong} />
            <img src="/src/assets/icons/replay.svg" alt="Next" className="replay" onClick={replay} />
            {
              !isMuted
               ? <img src="/src/assets/icons/speaker.svg" alt="Next" className="speaker" onClick={mute} />
               : <img src="/src/assets/icons/speaker-muted.svg" alt="Next" className="speaker" onClick={mute} />
            }
          </div>
          <div className="progress">
            <div className="progress-line">
              <div className="current-progress" style={{width: '80%'}}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Player;
