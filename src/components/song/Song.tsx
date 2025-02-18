import "./song.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CoolIcons from "../../assets/icons/coolicon.svg";
import More from "../../assets/icons/more.svg";

interface SongProps {
  id: string;
  image: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
}

const Song: React.FC<SongProps> = ({
  id,
  image,
  title,
  artist,
  album,
  duration,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div
      className="song"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <div className="song-name">
        <p>{id}</p>
        <img src={image} alt={title} />
        <h3>{title}</h3>
      </div>
      <div className="artist-name">
        <p>{artist}</p>
      </div>

      <div className="album-name">
        <p>{album}</p>
      </div>
      <div className="duration">
        <p>{duration}</p>
        <img src={CoolIcons} alt="" />
        <img src={More} alt="" />
      </div>
    </div>
  );
};

export default Song;
