import React from "react";
import "./playlist.css";
import EditSquare from "../../assets/icons/edit-square.svg";

interface PlaylistProps {
  expanded: boolean;
  image: string;
  name: string;
  songCount: number;
}

const Playlist: React.FC<PlaylistProps> = ({
  expanded,
  image,
  name,
  songCount,
}) => {
  return (
    <>
      <div className={`playlist-container ${expanded ? "expanded" : ""}`}>
        <div className="playlist-img">
          <img src={image} alt="" />
        </div>
        <div className="playlist-info">
          <h4>{name}</h4>
          <div className="bottom-info">
            <p>Songs: {songCount}</p>
            <img src={EditSquare} alt="Edit icon" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Playlist;
