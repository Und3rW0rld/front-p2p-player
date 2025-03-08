import { useState, useEffect } from "react";
import { useFileContext } from "../../providers/FileProvider";

import Playlist from "../../components/playlist/Playlist";
import Expand from "../../assets/icons/polygon.svg";
import "./main-page.css";
import playlists from "../../assets/mocks/playlist.json";
import AddPlaylist from "../../assets/icons/add-playlists.svg";
import SearchBar from "../../components/search-bar/SearchBar";
import StoriesBar from "../../components/storiesBar/StoriesBar";
import {Song} from "../../types";
import Column from "../../components/column/Column";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Upload from "../../assets/icons/upload.svg";
import FriendsButton from '../../components/friendsButton/FriendsButton';

import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Player from "../../components/player/player";


const Main: React.FC = () => {
  const [expand, setExpand] = useState(true);

  const {files, metadata, onDirectorySelection, isProcessing} = useFileContext();
  const fileEntries = Array.from(files.entries());

  const [songs, setSongs] = useState<Song[]>([]);

// Update songs when files or metadata change
useEffect(() => {


  const updatedSongs: Song[] = fileEntries.map(([path, file]) => {
    const fileMetadata = metadata.get(path); // Retrieve metadata using the path as key

 

    return {
      _id: path, // Use file path as a unique ID
      title: fileMetadata?.title || "Unknown Title",
      artist: fileMetadata?.artist || "Unknown Artist",
      image: fileMetadata?.image || "https://picsum.photos/200/200", // Default placeholder image
      album: fileMetadata?.album || "Unknown Album",
      duration: fileMetadata?.duration
        ? `${Math.floor(fileMetadata.duration / 60)}:${Math.floor(fileMetadata.duration % 60)
          .toString()
          .padStart(2, "0")}`
          : "0:00", // Convert seconds to mm:ss
    };
  });


  setSongs(updatedSongs);
}, [files, metadata]);
  const getSongPos = (id: number): number => {
    return songs.findIndex((song: Song) => song._id === id.toString());
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id === over.id) return;

    setSongs((songs) => {
      const originalPost = getSongPos(active.id);
      const newPost = getSongPos(over.id);

      return arrayMove(songs, originalPost, newPost);
    });
  };

  const sensor = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
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
        <div className="songs-container">
          <div className="header-songs">
            <h3 className="main-title">YOUR SONGS</h3>
            <img src = {Upload} onClick={(onDirectorySelection)}/>
          </div>
          <div className="song-list">
          
            <DndContext
              sensors={sensor}
              onDragEnd={handleDragEnd}
              collisionDetection={closestCorners}
            >
              <Column songs={songs} />
            </DndContext>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
