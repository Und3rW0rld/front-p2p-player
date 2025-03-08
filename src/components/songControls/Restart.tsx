import "./songControls.css"
import React from "react";
import { useFileContext } from "../../providers/FileProvider";

import ReplayIcon from "../../assets/icons/replay.svg";

const RestartButton: React.FC = () => {
    const { restartCurrentSong, currentSong} = useFileContext();
    
    const handleRestartSong = () => {
        
        restartCurrentSong();
    };

    return (
        <div className="restart-button control-icon">
            <img 
                src={ReplayIcon} 
                alt="Restart Song" 
                onClick={handleRestartSong} 
                style={{ opacity: currentSong ? 1 : 0.5, cursor: currentSong ? "pointer" : "not-allowed" }}
            />
        </div>
    );
}

export default RestartButton;