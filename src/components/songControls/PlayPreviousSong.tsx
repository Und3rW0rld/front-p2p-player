import "./songControls.css"
import React from "react";
import { useFileContext } from "../../providers/FileProvider";

import PreviousIcon from "../../assets/icons/next.svg"; 


const PreviousSongButton: React.FC = () => {
    const { playPreviousSong, currentSong , songList} = useFileContext();

    
    
    const handlePreviousSong = () => {
        if (songList.length === 0) {
            console.warn("No songs available to play.");
            return;
        }
        playPreviousSong(); // Pass the song list to play the Previous track
    };

    return (
        <div className="previous-button control-icon">
            <img 
                src={PreviousIcon} 
                alt="Previous Song" 
                onClick={handlePreviousSong} 
                style={{ opacity: currentSong ? 1 : 0.5, cursor: currentSong ? "pointer" : "not-allowed" }}
            />
        </div>
    );
};

export default PreviousSongButton;
