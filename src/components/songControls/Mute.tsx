import "./songControls.css"
import React, { useState } from "react";
import { useFileContext } from "../../providers/FileProvider";
import SpeakerIcon from "../../assets/icons/speaker.svg";

import SpeakerMutedIcon from "../../assets/icons/speaker-muted.svg";

const MuteButton: React.FC = () => {
    const { mutePlayingSong, isMuted } = useFileContext();

    
    const handleMuteSong = () => {
        
        mutePlayingSong();
    };

    return (
        <div className="mute-button control-icon">
            <img 
                src={isMuted ? SpeakerMutedIcon : SpeakerIcon} 
                alt={isMuted ? "Muted" : "Unmuted"} 
                className="speaker" 
                onClick={mutePlayingSong} 
            />

        </div>
    );
}

export default MuteButton;