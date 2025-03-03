import Playlist from "../../components/playlist/Playlist";
import Expand from "../../assets/icons/polygon.svg";
import "./main-page.css";
import playlists from "../../assets/mocks/playlist.json";
import AddPlaylist from "../../assets/icons/add-playlists.svg";
import { useState } from "react";
import SearchBar from "../../components/search-bar/SearchBar";
import StoriesBar from "../../components/storiesBar/StoriesBar";

import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Column from "../../components/column/Column";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Upload from "../../assets/icons/upload.svg";
const Main = () => {
  const [expand, setExpand] = useState(true);

  const [songs, setSongs] = useState([
    {
      id: "1",
      title: "Song 1",
      artist: "Artist 1",
      image: "https://picsum.photos/200/200",
      album: "Album 1",
      duration: "3:00",
    },
    {
      id: "2",
      title: "Song 2",
      artist: "Artist 2",
      image: "https://picsum.photos/200/200",
      album: "Album 2",
      duration: "3:00",
    },
    {
      id: "3",
      title: "Song 3",
      artist: "Artist 3",
      image: "https://picsum.photos/200/200",
      album: "Album 3",
      duration: "3:00",
    },
  ]);

  interface Song {
    id: string;
    title: string;
    artist: string;
    image: string;
  }

  const getSongPos = (id: number): number => {
    return songs.findIndex((song: Song) => song.id === id.toString());
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
            <img src={Upload} alt="" />
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
