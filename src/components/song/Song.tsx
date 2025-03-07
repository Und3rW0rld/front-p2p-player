import { memo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import PlaySong from "../PlaySong/PlaySong";

interface SongProps {
  id: string;
  image: string;
  name: string;
  author: string;
  album: string;
  duration: string;
  asTableRow?: boolean; // Differentiates between table row and default layout
}

const SongComponent: React.FC<SongProps> = ({ id, image, name, author, album, duration, asTableRow }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
      id,
      disabled: false
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (asTableRow) {
    return (
      <tr ref={setNodeRef} style={style}>
  {/* Drag Handle Column */}
  <td {...attributes} {...listeners} style={{ cursor: "grab" }}>
    ⠿ {/* Unicode for drag handle icon */}
  </td>
  
  {/* Play Button Column */}
  <td>
    <PlaySong songPath={id} />
  </td>

  {/* Image Column */}
  <td>
    <img src={image} alt={name} className="song-image" />
  </td>

  {/* Song Details Columns */}
  <td>{name}</td>
  <td>{author}</td>
  <td>{album}</td>
  <td>{duration}</td>
</tr>

    );
  }

  // Default: Render as a normal list item (if needed elsewhere)
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <p>{name} - {author}</p>
    </div>
  );
};

export default memo(SongComponent);
