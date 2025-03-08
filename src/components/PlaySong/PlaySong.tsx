import "./playSong.css"

import React, { useState, useEffect} from "react";
import { useFileContext } from "../../providers/FileProvider";
import Play from "../../assets/icons/polygon.svg";

interface SongPlayProps {
  songPath: string;
}

const PlaySong: React.FC<SongPlayProps> = ({ songPath }) => {
  const { files, currentSong, setCurrentSong} = useFileContext();
  const [objectUrl, setObjectUrl] = useState<string | null>(null);


  const playFile = (path: string) => {
    console.log("Attempting to play:", path);

    const file = files.get(path);
    if (!file) {
      console.error("File not found in context:", path);
      return;
    }

    setCurrentSong(path); // Set the song in global state (FileProvider will handle playback)
  };
  

  

  return (
    <div className="play-song">
      <img 
      src={Play}
      onClick={(e) => {
        e.stopPropagation(); // Prevents drag-and-drop from hijacking the click
        playFile(songPath);
      }}
      style={{ opacity: currentSong === songPath ? 1 : 0.5 }} // Highlight current song
    />

    </div>
  );
};

export default PlaySong;
