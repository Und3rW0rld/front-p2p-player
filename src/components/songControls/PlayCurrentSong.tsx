import React from "react";
import { useFileContext } from "../../providers/FileProvider";
import PlayIcon from "../../assets/icons/play.svg";


const PlayCurrentSong: React.FC = () => {
    const { playCurrentSong, currentSong } = useFileContext();

    return (
        <div className="play-button control-icon">
            <img 
                src={PlayIcon} 
                alt="Play" 
                onClick={playCurrentSong} 
                style={{ opacity: currentSong ? 1 : 0.5, cursor: currentSong ? "pointer" : "not-allowed" }}
            />
        </div>
    );
};

export default PlayCurrentSong;