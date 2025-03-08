import { memo, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import PlaySong from "../PlaySong/PlaySong";
import { uploadSong } from "../../api/songApi";
import { useFileContext } from "../../providers/FileProvider"; 

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
  const { files } = useFileContext();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  const handlePostSong = async () => {
    setIsPosting(true);

    try {
        console.log("Uploading song with ID:", id);

        // ✅ Step 1: Get the file from FileProvider
        const file = files.get(id);
        if (!file) {
            alert("File not found for this song.");
            setIsPosting(false);
            return;
        }
        console.log("Uploading file:", file.name);

        // ✅ Step 2: Upload the file
        const fileUrl = await uploadSong(file);
        console.log("File uploaded successfully! URL:", fileUrl);

        alert(`File uploaded successfully! Check the console for the URL.`);
    } catch (error: any) {
        console.error("File upload failed:", error);
        alert(`File upload failed: ${error?.message || "Unknown error"}`);

        if (error?.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
        }
    } finally {
        setIsPosting(false);
    }
};
  return (
    <tr ref={setNodeRef} style={style}>
      <td {...attributes} {...listeners} style={{ cursor: "grab" }}>⠿</td>
      <td><PlaySong songPath={id} /></td>
      <td><img src={image} alt={name} className="song-image" /></td>
      <td>{name}</td>
      <td>{author}</td>
      <td>{album}</td>
      <td>{duration}</td>
      <td>
        <button onClick={handlePostSong} disabled={isPosting}>
          {isPosting ? "Posting..." : "Post"}
        </button>
      </td>
    </tr>
  );
};

export default memo(SongComponent);