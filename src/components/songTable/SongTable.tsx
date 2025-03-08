import { useState } from "react";
import "./SongTable.css";
import { Song } from "../../types"; // Asegúrate de importar la interfaz correcta

interface SongTableProps {
  songs: Song[]; // Ahora `songs` es un array de canciones en lugar de un objeto indexado
  onSongSelect?: (songId: string) => void;
}

const SongTable = ({ songs, onSongSelect }: SongTableProps) => {
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);

  const songClickHandler = (songId: string) => {
    setCurrentPlaying(songId);
    if (onSongSelect) {
      onSongSelect(songId);
    }
  };

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
          {songs.map((song) => (
            <tr
              key={song.id}
              className={currentPlaying === song.id ? "playing" : ""}
              onClick={() => songClickHandler(song.id)}
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
                    <img src={song.image} alt={song.title || "Song"} />
                  </div>
                  <span className="song-name">{song.title || "Unknown Title"}</span>
                </div>
              </td>
              <td className="artist-column">{song.artist || "Unknown Artist"}</td>
              <td className="album-column">{song.album || "Unknown Album"}</td>
              <td className="duration-column">{song.duration || "--:--"}</td>
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
