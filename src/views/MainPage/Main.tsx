import Playlist from "../../components/playlist/Playlist";
import "./main-page.css";
import playlists from "../../assets/mocks/playlist.json";
const Main = () => {
  return (
    <>
      <div className="main-page-container">
        <div className="playlists-container">
          {Object.values(playlists).map((playlist, index) => (
            <Playlist
              key={index}
              expanded={true}
              image={playlist.image}
              name={playlist.name}
              songCount={playlist.songCount}
            />
          ))}
        </div>
        {Object.values(playlists).map((playlist, index) => (
          <Playlist
            key={index}
            expanded={false}
            image={playlist.image}
            name={playlist.name}
            songCount={playlist.songCount}
          />
        ))}
      </div>
    </>
  );
};

export default Main;
