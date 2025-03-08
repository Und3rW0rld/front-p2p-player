import { memo, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import PlaySong from "../PlaySong/PlaySong";
import { postSong } from "../../api/songApi";
import { useFileContext } from "../../providers/FileProvider"; // Import the hook directly

interface SongProps {
  id: string;
  image: string;
  name: string;
  author: string;
  album: string;
  duration: string;
  asTableRow?: boolean;
  fileSize?: string;
}

const SongComponent: React.FC<SongProps> = ({ id, image, name, author, album, duration, fileSize }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const [isPosting, setIsPosting] = useState(false);
  const { files } = useFileContext(); // Use the hook correctly to get files

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  const handlePostSong = async () => {
    setIsPosting(true);

    try {
        // Get the file using the id
        const file = files.get(id);
        
        // Prepare song object
        const songData = { 
            id, 
            title: name, 
            artist: author, 
            album, 
            duration, 
            image,
            fileSize 
        };
        
        // Call postSong with the song data and file (if available)
        await postSong(songData, file || null);
        alert(`Posted song: ${name}`);
    } catch (error) {
        console.error("Failed to post song:", error);
        alert("Failed to post the song.");
    } finally {
        setIsPosting(false);
    }
  };

  return (
    <tr ref={setNodeRef} style={style}>
      <td {...attributes} {...listeners} style={{ cursor: "grab" }}>⠿</td> {/* Drag handle */}

      <td><PlaySong songPath={id} /></td>
      <td><img src={image} alt={name} className="song-image" /></td>
      <td>{name}</td>
      <td>{author}</td>
      <td>{album}</td>
      <td>{duration}</td>

      {/* Post Button Column */}
      <td>
        <button onClick={handlePostSong} disabled={isPosting}>
          {isPosting ? "Posting..." : "Post"}
        </button>
      </td>
    </tr>
  );
};

export default memo(SongComponent);