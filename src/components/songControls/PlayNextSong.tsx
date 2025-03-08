import "./songControls.css"

import React from "react";
import { useFileContext } from "../../providers/FileProvider";
import NextIcon from "../../assets/icons/next.svg";

const NextSongButton: React.FC = () => {
    const { playNextSong,  currentSong , songList} = useFileContext();

    
    
    const handleNextSong = () => {
        if (songList.length === 0) {
            console.warn("No songs available to play.");
            return;
        }
        playNextSong(); // Pass the song list to play the next track
    };

    return (
        <div className="next-button control-icon">
            <img 
                src={NextIcon} 
                alt="Next Song" 
                onClick={handleNextSong} 
                style={{ opacity: currentSong ? 1 : 0.5, cursor: currentSong ? "pointer" : "not-allowed" }}
            />
        </div>
    );
};

export default NextSongButton;
