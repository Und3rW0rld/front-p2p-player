import { memo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SongProps {
  id: string;
  index: string;
  image: string;
  name: string;
  author: string;
  album: string;
  duration: string;
  asTableRow?: boolean; // Differentiates between table row and default layout
}

const SongComponent: React.FC<SongProps> = ({ id, image, name, author, album, duration, asTableRow }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (asTableRow) {
    return (
      <tr ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <td>
          <img src={image} alt={name} className="song-image" />
        </td>
   
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
