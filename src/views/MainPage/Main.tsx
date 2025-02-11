import Playlist from "../../components/playlist/Playlist";
import Expand from "../../assets/icons/polygon.svg";
import "./main-page.css";
import playlists from "../../assets/mocks/playlist.json";
import AddPlaylist from "../../assets/icons/add-playlists.svg";
import { useState } from "react";
import SearchBar from "../../components/search-bar/SearchBar";
const Main = () => {
  const [expand, setExpand] = useState(true);

  return (
    <>
      <div className="main-page-container">
        <div className="main-page-header">
          <div className="left">
            <h3 className="main-title" onClick={() => setExpand(!expand)}>
              {/* Girar el icono si expand es false*/}
              <img
                src={Expand}
                alt=""
                style={{ transform: expand ? "" : "rotate(180deg)" }}
              />{" "}
              YOUR PLAYLISTS
            </h3>
            <img src={AddPlaylist} alt="" />
          </div>
          <div className="right">
            <SearchBar placeholder="Local Search" />
          </div>
        </div>
        <div className="playlists-container">
          {Object.values(playlists).map((playlist, index) => (
            <Playlist
              key={index}
              expanded={expand}
              image={playlist.image}
              name={playlist.name}
              songCount={playlist.songCount}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Main;
