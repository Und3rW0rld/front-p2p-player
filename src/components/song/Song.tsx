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
  fileSize?: string
}

const SongComponent: React.FC<SongProps> = ({ id, image, name, author, album, duration, fileSize}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
      id,
      disabled: false
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  
  return (
    <tr ref={setNodeRef} style={style}>
      {/* Drag Handle Column */}
      <td {...attributes} {...listeners} style={{ cursor: "grab" }}>
        ⠿ {/* Unicode for drag handle icon */}
      </td>
  

      <td>
        <PlaySong songPath={id} />
      </td>


      <td>
        <img src={image} alt={name} className="song-image" />
      </td>

      <td>{name}</td>
      <td>{author}</td>
      <td>{album}</td>
      <td>{duration}</td>
      <td></td>
      
    </tr>

  );
  

 
};

export default memo(SongComponent);
