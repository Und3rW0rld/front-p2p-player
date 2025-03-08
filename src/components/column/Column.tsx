import SongComponent from "../song/Song";
import "./column.css";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove
} from "@dnd-kit/sortable";

import { FC } from "react";
import { Song } from "../../types";
import { useFileContext } from "../../providers/FileProvider";

import {
  DndContext,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";

interface ColumnProps {
  songs: Song[];
  onDragEnd?: (event: any) => void;
}

const Column: FC<ColumnProps> = ({ songs, onDragEnd }) => {
  const { setSongList } = useFileContext();

  // ✅ Add Drag-and-Drop Sensors
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = songs.findIndex(song => song.id === active.id);
    const newIndex = songs.findIndex(song => song.id === over.id);

    const newOrder = arrayMove(songs, oldIndex, newIndex);
    
    // Update the local songs order
    if (onDragEnd) {
      onDragEnd(event);
    } 
    // Also update the global song list to keep everything in sync
    setSongList(newOrder);
  };

  return (
    <div className="column">
      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
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
              <th></th>
              
            </tr>
          </thead>
          <tbody>
            <SortableContext items={songs.map(song => song.id)} strategy={verticalListSortingStrategy}>
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
      </DndContext>
    </div>
  );
};

export default Column;