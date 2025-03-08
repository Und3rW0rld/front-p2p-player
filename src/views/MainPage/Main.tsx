import { useState, useEffect } from "react";
import { useFileContext } from "../../providers/FileProvider";

import Playlist from "../../components/playlist/Playlist";
import Expand from "../../assets/icons/polygon.svg";
import "./main-page.css";
import playlists from "../../assets/mocks/playlist.json";
import AddPlaylist from "../../assets/icons/add-playlists.svg";
import SearchBar from "../../components/search-bar/SearchBar";
import StoriesBar from "../../components/storiesBar/StoriesBar";
import { Song } from "../../types";
import Column from "../../components/column/Column";
import { arrayMove } from "@dnd-kit/sortable";
import Upload from "../../assets/icons/upload.svg";
import FriendsButton from '../../components/friendsButton/FriendsButton';

import Player from "../../components/player/player";
import {
  closestCorners,
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

const Main: React.FC = () => {
  const [expand, setExpand] = useState(true);

  const { files, metadata, onDirectorySelection, isProcessing, setSongList } = useFileContext();
  const fileEntries = Array.from(files.entries());

  const [songs, setSongs] = useState<Song[]>([]);

  // Update songs when files or metadata change
  useEffect(() => {
    const updatedSongs: Song[] = fileEntries.map(([path, file]) => {
      const fileMetadata = metadata.get(path);

      return {
        id: path,
        title: fileMetadata?.title || "Unknown Title",
        artist: fileMetadata?.artist || "Unknown Artist",
        image: fileMetadata?.image || "https://picsum.photos/200/200",
        album: fileMetadata?.album || "Unknown Album",
        duration: fileMetadata?.duration
          ? `${Math.floor(fileMetadata.duration / 60)}:${Math.floor(fileMetadata.duration % 60)
            .toString()
            .padStart(2, "0")}`
          : "0:00",
      };
    });

    setSongs(updatedSongs);
    
    // Also update the global song list
    if (updatedSongs.length > 0) {
      setSongList(updatedSongs);
    }
  }, [files, metadata, setSongList]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!active || !over || active.id === over.id) return;

    setSongs((prevSongs) => {
      const oldIndex = prevSongs.findIndex(song => song.id === active.id);
      const newIndex = prevSongs.findIndex(song => song.id === over.id);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        return arrayMove(prevSongs, oldIndex, newIndex);
      }
      return prevSongs;
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor)
  );

  return (
    <>
      <StoriesBar />
      <Player />
      <FriendsButton />
      <div className="main-page-container">
        <div className="main-page-header">
          <div className="left">
            <h3 className="main-title" onClick={() => setExpand(!expand)}>
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
        <div className="songs-container">
          <div className="header-songs">
            <h3 className="main-title">YOUR SONGS</h3>
            <img src={Upload} alt="Upload" onClick={onDirectorySelection}/>
          </div>
          <div className="song-list">
            {songs.length > 0 ? (
              <Column songs={songs} onDragEnd={handleDragEnd} />
            ) : (
              <p>No songs found. Click the upload button to add songs.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;