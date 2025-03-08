import { useStories } from "../../context/StoriesContext";
import { Story } from "../../types";
import songs from "../../assets/mocks/songs.json";
import "./StoryViewer.css";

interface StoryViewerProps {
    story: Story;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ story }) => {
    const { users } = useStories();

    // Buscar el usuario usando `_id`
    const user = users.find((u) => u._id === story.idUser) || {
        userName: "Usuario desconocido",
        image: "/assets/img/default-user.jpg",
    };

    // Buscar la canción usando `_id`
    const song = story.idSong
        ? songs.find((s) => s._id === story.idSong) || { 
            title: "Canción desconocida", 
            artist: "Artista desconocido",
            album: "Álbum desconocido",
            image: "/assets/img/default-song.jpg"
        }
        : null;

    return (
        <div className="story-viewer-container">
            <div className="story-viewer">
                <img src={story.image || "/assets/img/default-story.jpg"} alt="Story" className="story-image" />
                <div className="story-info">
                    <img src={user.image} alt={user.userName} className="user-avatar" />
                    <div>
                        <p className="user-name">{user.userName}</p>
                    </div>
                </div>
                {song && (
                    <div className="story-music">
                        <img src={song.image} alt={song.title} className="song-story-image" />
                        <div className="song-info">
                            <p className="song-title">{song.title}</p>
                            <p className="song-artist">{song.artist}</p>
                            <p className="song-album">{song.album}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StoryViewer;
