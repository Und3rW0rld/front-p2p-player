import "./topSongs.css";
import img from "../../assets/img/BaileInolvidable.jpg"
interface Song {
  name: string;
  img: string;
  title: string;
  author: string;
}

interface TopSongsProps {
  topSongs: Song[]; // Expecting an array, not a string
}

const TopSongs = ({ topSongs }: TopSongsProps) => {
  return (
    <div className="top-container">
      {topSongs.map((song, index) => (
        <div key={index} className="top-item">
          <h2>{song.name}</h2>
          {/* v  Esto deberá ser cambiado para recibir las Urls del back una vez sea implementado  */}
          <img src={`/assets/img/${song.img}`} alt={song.title} /> 
          <p className="song-title">{song.title}</p>
          <p className="song-author">{song.author}</p>
        </div>
      ))}
    </div>
  );
};

export default TopSongs;
