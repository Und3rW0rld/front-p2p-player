import Song from "../song/Song";
import "./column.css";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { FC } from "react";

interface Song {
  id: string;
  image: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
}

interface ColumnProps {
  songs: Song[];
}

const Column: FC<ColumnProps> = ({ songs }) => {
  return (
    <div className="column">
      <SortableContext items={songs} strategy={verticalListSortingStrategy}>
        {songs.map((song) => (
          <Song
            key={song.id}
            id={song.id}
            image={song.image || ""}
            title={song.title || "song title"}
            artist={song.artist || "song artist"}
            album={song.album || "song album"}
            duration={song.duration || "0:00"}
          />
        ))}
      </SortableContext>
    </div>
  );
};

export default Column;
