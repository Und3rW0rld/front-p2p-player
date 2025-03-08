import "./songControls.css"

import React from "react";
import { useFileContext } from "../../providers/FileProvider";
import StopIcon from "../../assets/icons/pause.svg";

const StopCurrentSong: React.FC = () => {
    const { stopCurrentSong, currentSong } = useFileContext();

    return (
        <div className="stop-button control-icon">
            <img 
                src={StopIcon} 
                alt="Stop" 
                onClick={stopCurrentSong} 
                style={{ opacity: currentSong ? 1 : 0.5, cursor: currentSong ? "pointer" : "not-allowed" }}
            />
        </div>    
    );
};

export default StopCurrentSong;
