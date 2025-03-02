import "./topSongs.css";
import Song1Img from "../../../assets/img/DuvetBoa.jpg";
import Song2Img from "../../../assets/img/BaileInolvidable.jpg";
import Song3Img from "../../../assets/img/LostKitten.jpg";

const TopSongs = () => {
  var songs = [
    { name: "TOP 2", img: Song2Img, title: "Baile Inolvidable", author: "Bad Bunny" },
    { name: "TOP 1", img: Song1Img, title: "Duvet", author: "Boa" },
    { name: "TOP 3", img: Song3Img, title: "Lost Kitten", author: "Metric" },
  ];

  return (
    <>
    <div className="top-container">
      {songs.map((song, index) => (
        <div key={index} className="top-item">
          <h2>{song.name}</h2>
          <img src={song.img} alt={song.title} />
          <p className="song-title">{song.title}</p>
          <p className="song-author">{song.author}</p>
        </div>
      ))}
    </div>
    </>
  );
};

export default TopSongs;
