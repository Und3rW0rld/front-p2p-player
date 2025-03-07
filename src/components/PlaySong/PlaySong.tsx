import "./playSong.css"

import React, { useState, useEffect} from "react";
import { useFileContext } from "../../providers/FileProvider";
import Play from "../../assets/icons/polygon.svg";

interface SongPlayProps {
  songPath: string;
}

const PlaySong: React.FC<SongPlayProps> = ({ songPath }) => {
  const { files, currentSong, setCurrentSong, audioRef} = useFileContext();
  const [objectUrl, setObjectUrl] = useState<string | null>(null);


  const playFile = (path: string) => {
    console.log("Attempting to play:", path);
  
    const file = files.get(path);
    if (!file) {
      console.error("File not found in context:", path);
      return;
    }

    console.log("File found:", file);

    if (audioRef.current) {
      const newObjectUrl = URL.createObjectURL(file);
      audioRef.current.src = newObjectUrl;
      audioRef.current.load();
      audioRef.current.volume = 1;
      audioRef.current.play()
        .then(() => console.log("Playback started"))
        .catch(error => console.error("Error playing audio:", error));

      setCurrentSong(path); // Update global state
    } else {
      console.error("Audio element not found");
    }
  };
  

  // Cleanup object URL when component unmounts or song changes
  useEffect(() => {
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [objectUrl]);

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
      <audio ref={audioRef} />
    </div>
  );
};

export default PlaySong;
