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


  return (
    <div className="column">
      <table className="draggable-song-table">
        <thead>
          <tr>
            <th></th>
            <th>Play</th>
            <th>Image</th>
            <th>Title</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          <SortableContext items={songs} strategy={verticalListSortingStrategy}>
            {songs.map((song) => (
              <SongComponent
                key={song.id}

                id={song.id}
                image={song.image || ""}
                name={song.title || "Unknown Title"}
                author={song.artist || "Unknown Artist"}
                album={song.album || "Unknown Album"}
                duration={song.duration || "0:00"}
                asTableRow={true} 
              />
            ))}
          </SortableContext>
        </tbody>

      </table>
    </div>
  );
};

export default Column;
