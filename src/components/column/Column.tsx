import SongComponent from "../song/Song";
import "./column.css";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { FC } from "react";
import { Song } from "../../types";

interface ColumnProps {
  songs: Song[];
}

const Column: FC<ColumnProps> = ({ songs }) => {
  console.log("Songs received in Column:", songs);

  return (
    <div className="column">
      <table className="song-table">
        <thead>
          <tr>
            <th>Image</th>
        
            <th>Title</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          <SortableContext items={songs} strategy={verticalListSortingStrategy}>
            {songs.map((song, index) => (
              <SongComponent
                key={song.id}
                index={song.index}
                id={song.id}
                image={song.image || ""}
                name={song.title || "Unknown Title"}
                author={song.artist || "Unknown Artist"}
                album={song.album || "Unknown Album"}
                duration={song.duration || "0:00"}
                asTableRow={true} // Ensures it renders as a <tr>
              />
            ))}
          </SortableContext>
        </tbody>
      </table>
    </div>
  );
};

export default Column;
