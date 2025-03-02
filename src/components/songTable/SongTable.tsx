import { useState } from "react";
import "./SongTable.css";

interface Song {
  name: string;
  author: string;
  image: string;
  album: string;
  duration: string;
}

interface SongsData {
  [id: string]: Song;
}

interface SongTableProps {
  songs: SongsData;
}

const SongTable = ({ songs }: SongTableProps) => {
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  
  const songsArray = Object.entries(songs).map(([id, song]) => ({
    id,
    ...song
  }));

  return (
    <div className="song-table-container">
     
      
      <table className="song-table">
        <thead>
          <tr>
            <th className="handle-column"></th>
            <th className="song-column">TITLE</th>
            <th className="artist-column">ARTIST</th>
            <th className="album-column">ALBUM</th>
            <th className="duration-column">DURATION</th>
            <th className="options-column"></th>
          </tr>
        </thead>
        <tbody>
          {songsArray.map((song) => (
            <tr 
              key={song.id} 
              className={currentPlaying === song.id ? "playing" : ""}
              onClick={() => setCurrentPlaying(song.id)}
            >
              <td className="handle-column">
                <div className="drag-handle">
                  <div className="handle-line"></div>
                  <div className="handle-line"></div>
                </div>
              </td>
              <td className="song-column">
                <div className="song-info">
                  <div className="song-image">
                    <img src={song.image} alt={song.name} />
                  </div>
                  <span className="song-name">{song.name}</span>
                </div>
              </td>
              <td className="artist-column">{song.author}</td>
              <td className="album-column">{song.album}</td>
              <td className="duration-column">{song.duration}</td>
              <td className="options-column">
                <button className="more-options">⋮</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SongTable;